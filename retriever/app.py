from sodapy import Socrata
import psycopg2

DATASET_PROVIDER = 'data.baltimorecity.gov'
DATASET_IDENTIFIER = 'wsfq-mvij'
DATABASE_HOST = 'database'
DATABASE_PORT = 5432
DATABASE_NAME = 'bcv'
DATABASE_USER = 'postgres'

# Connect to database
db = psycopg2.connect(
    host=DATABASE_HOST,
    port=DATABASE_PORT,
    dbname=DATABASE_NAME,
    user=DATABASE_USER
)
cur = db.cursor()
with open('init.sql', 'r') as f:
    cur.execute(f.read())

soc = Socrata(DATASET_PROVIDER, None)

results = soc.get(DATASET_IDENTIFIER, limit=15)
for result in results:
    if 'latitude' in result and 'longitude' in result:
        cur.execute('INSERT INTO crimes (longitude, latitude) VALUES (%s, %s)', (float(result['longitude']), float(result['latitude'])))
        print('Inserted')
db.commit()