from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
import database

app = Flask(__name__)
CORS(app)
api = Api(app)

db = database.get_instance()

class Coordinates(Resource):
  def get(self):
    cur = db.cursor()
    cur.execute('SELECT longitude, latitude FROM crimes;')

    results = []
    for row in cur.fetchall():
      results.append({'lng': row[0], 'lat': row[1]})

    return {'positions': results}

api.add_resource(Coordinates, '/coordinates')

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)