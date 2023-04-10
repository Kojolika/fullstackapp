from flask_restful import Resource, reqparse
import requests
from accuWeatherApiData import apiKey

API_KEY = apiKey.Key.retrieve()

parser = reqparse.RequestParser()
parser.add_argument('country')
parser.add_argument('province')
parser.add_argument('city')
parser.add_argument('api_location_key')

class GetLocationKey(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            country = data['country']    
            province = data['province']
            city = data['city']


        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code

            return { 'message': 'Something went wrong' }, status_code