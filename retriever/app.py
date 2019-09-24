from sodapy import Socrata
import psycopg2
import redis
import json
import threading

DATASET_PROVIDER = 'data.baltimorecity.gov'
DATASET_IDENTIFIER = 'wsfq-mvij'
DATABASE_HOST = 'database'
DATABASE_PORT = 5432
DATABASE_NAME = 'bcv'
DATABASE_USER = 'postgres'
CACHE_HOST = 'cache'
CACHE_PORT = 6379
CACHE_DB = 0

PERIOD = 60 * 60 # Run every hour

# Connect to database
db = psycopg2.connect(
  host=DATABASE_HOST,
  port=DATABASE_PORT,
  dbname=DATABASE_NAME,
  user=DATABASE_USER
)
cur = db.cursor()

redis = redis.Redis(host=CACHE_HOST, port=CACHE_PORT, db=CACHE_DB)

# Add in our schema
with open('init.sql', 'r') as f:
  cur.execute(f.read())

soc = Socrata(DATASET_PROVIDER, None)

def job():
  results = soc.get(DATASET_IDENTIFIER, limit=5)
  for result in results:
    if 'latitude' in result and 'longitude' in result:
      converted_to_string = json.dumps(result)

      if not redis.exists(converted_to_string):
        cur.execute('INSERT INTO crimes (longitude, latitude) VALUES (%s, %s)', (result['longitude'], result['latitude']))
        redis.set(converted_to_string, 'true')
        print('Inserted:', result['longitude'], result['latitude'])
      else:
        print('Already exists:', result['longitude'], result['latitude'])

  db.commit()

  threading.Timer(PERIOD, job).start()

job()