import config
import psycopg2

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
