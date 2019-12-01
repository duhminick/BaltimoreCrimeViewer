from sodapy import Socrata
import database
import redis
import json
import threading
import config

fetch_limit = 10000 

# Connect to database
db = database.get_instance()

# Connect to redis
redis = redis.Redis(host=config.CACHE_HOST, port=config.CACHE_PORT, db=config.CACHE_DB)

# Connect to dataset provider
soc = Socrata(config.DATASET_PROVIDER, None)

# Add in our schema
with open('init.sql', 'r') as f:
  cur = db.cursor()
  cur.execute(f.read())
  db.commit()

def job():
  global fetch_limit

  # Stats
  stat_inserted = 0
  stat_existing = 0

  results = soc.get(config.DATASET_IDENTIFIER, limit=fetch_limit)

  for result in results:
    # Assure that we have latitude and longitude
    if 'latitude' in result and 'longitude' in result:
      # Convert data into json format, so that it's a string
      serialized = json.dumps(result)

      # Check our cache
      if not redis.exists(serialized):
        database.insert(result)

        redis.set(serialized, 'true')
        stat_inserted += 1
      else:
        stat_existing += 1

  db.commit()
  print('[RETRIEVER] inserted: {}; pre-existing: {}'.format(stat_inserted, stat_existing))

  fetch_limit = 2000
  threading.Timer(config.PERIOD, job).start()

job()