from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from psycopg2.extensions import AsIs
import database

app = Flask(__name__)
CORS(app)
api = Api(app)

db = database.get_instance()

class Count(Resource):
  def get(self, attribute):
    if attribute not in ['weapon', 'neighborhood']:
      return {'error': 'Invalid attribute'}

    cur = db.cursor()
    stmt = 'SELECT %s, COUNT(*) FROM crimes WHERE %s IS NOT NULL GROUP BY %s'
    cur.execute(stmt, (AsIs(attribute), AsIs(attribute), AsIs(attribute)))

    results = []
    for row in cur.fetchall():
      results.append({'attribute': row[0], 'count': row[1]})

    return {'count': results}

class Coordinates(Resource):
  def get(self):
    cur = db.cursor()
    cur.execute('SELECT longitude, latitude FROM crimes;')

    results = []
    for row in cur.fetchall():
      results.append({'lng': row[0], 'lat': row[1]})

    return {'positions': results}

api.add_resource(Coordinates, '/coordinates')
api.add_resource(Count, '/count/<string:attribute>')

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)