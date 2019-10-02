from psycopg2.extensions import AsIs
import config
import psycopg2
import normalization

class DatabaseInstance:
  _instance = None

def get_instance():
  if DatabaseInstance._instance is None:
    DatabaseInstance._instance = psycopg2.connect(
        host=config.DATABASE_HOST,
        port=config.DATABASE_PORT,
        dbname=config.DATABASE_NAME,
        user=config.DATABASE_USER
    )

  return DatabaseInstance._instance

def insert(data):
  db = get_instance()
  cur = db.cursor()

  data = normalization.normalize(data)

  columns = data.keys()
  values = [data[col] for col in columns]

  stmt = 'INSERT INTO crimes (%s) VALUES %s'

  cur.execute(stmt, (AsIs(','.join(columns)), tuple(values)))
  print(cur.mogrify(stmt, (AsIs(','.join(columns)), tuple(values))))