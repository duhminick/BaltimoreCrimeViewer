from flask import Flask, request
from flask_restful import Resource, Api, abort
from flask_cors import CORS
from psycopg2.extensions import AsIs
from filter_query import build_query as build_filter_query
import database
import sys

app = Flask(__name__)
CORS(app)
api = Api(app)

db = database.get_instance()

def valid_attribute(attribute):
  if attribute not in ['weapon', 'neighborhood', 'district', 'premise', 'inside']:
    abort(400, error='Invalid attribute')

class Count(Resource):
  def get(self, attribute):
    valid_attribute(attribute)

    cur = db.cursor()
    stmt = 'SELECT %s, COUNT(*) FROM crimes WHERE %s IS NOT NULL GROUP BY %s ORDER BY COUNT(*) DESC'
    cur.execute(stmt, (AsIs(attribute), AsIs(attribute), AsIs(attribute)))

    results = []
    for row in cur.fetchall():
      results.append({'attribute': row[0], 'count': row[1]})

    return {'count': results}
  
  def post(self, attribute):
    valid_attribute(attribute)

    if 'filter' not in request.get_json():
      abort(400, error='Need filter argument')

    args = request.get_json()['filter']
    if len(args) > 0:
      filter_query = 'AND ' + build_filter_query(args)
    else:
      filter_query = ''

    cur = db.cursor()
    stmt = 'SELECT %s, COUNT(*) FROM crimes WHERE %s IS NOT NULL %s GROUP BY %s ORDER BY COUNT(*) DESC'
    cur.execute(stmt, (AsIs(attribute), AsIs(attribute), AsIs(filter_query), AsIs(attribute)))

    results = []
    for row in cur.fetchall():
      results.append({'attribute': row[0], 'count': row[1]})

    return {'count': results}

class Coordinates(Resource):
  def get(self):
    cur = db.cursor()
    cur.execute('SELECT longitude, latitude FROM crimes')

    results = []
    for row in cur.fetchall():
      results.append({'lng': row[0], 'lat': row[1]})

    return {'positions': results}
  
  def post(self):
    if 'filter' not in request.get_json():
      abort(400, error='Need filter argument')

    args = request.get_json()['filter']
    if len(args) > 0:
      filter_query = 'WHERE ' + build_filter_query(args)
    else:
      filter_query = ''
    
    cur = db.cursor()
    stmt = 'SELECT longitude, latitude FROM crimes %s'
    cur.execute(stmt, (AsIs(filter_query),))

    results = []
    for row in cur.fetchall():
      results.append({'lng': row[0], 'lat': row[1]})

    return {'positions': results}

api.add_resource(Coordinates, '/coordinates')
api.add_resource(Count, '/count/<string:attribute>')

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)