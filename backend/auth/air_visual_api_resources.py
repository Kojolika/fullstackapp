from flask_restful import Resource, reqparse
from json import loads
import requests
from airVisualApiData import apiKey

API_KEY = apiKey.Key.retrieve()

parser = reqparse.RequestParser()
parser.add_argument('country', type=dict)
parser.add_argument('province', type=dict)
parser.add_argument('city', type=dict)

class GetWeatherDataFromCity(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            country = data['country']['name']
            province = data['province']['name']
            city = data['city']['name']
            
            response = requests.get('http://api.airvisual.com/v2/city?city='+ city + '&state='+ province +'&country=' + country + '&key=' + API_KEY)

            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code

            if (status_code == 400):
                return {'message': 'Bad request. Try a different location.'}, status_code
            
            elif (status_code == 429):
                return {'message': 'Too many requests, try again in a few seconds.'}, status_code
            
            return {
                'message': 'Something went wrong'
            }, status_code

class Countries(Resource):
    def get(self):
        try:
            # submit the request using the session
            response = requests.get('http://api.airvisual.com/v2/countries?key=' + API_KEY)
            print(response.status_code)

            # raise an exception in case of http errors
            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code
            if (status_code == 400):
                return {'message': 'Bad request. Try a different location.'}, status_code
            
            elif (status_code == 429):
                return {'message': 'Too many requests, try again in a few seconds.'}, status_code
            
            return {
                'message': 'Something went wrong'
            }, status_code

class States(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            country = data['country']

            response = requests.get('http://api.airvisual.com/v2/states?country=' + country + '&key=' + API_KEY)
            print(response.status_code)

            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code
            if (status_code == 400):
                return {'message': 'Bad request. Try a different location.'}, status_code
            
            elif (status_code == 429):
                return {'message': 'Too many requests, try again in a few seconds.'}, status_code
            
            return {
                'message': 'Something went wrong'
            }, status_code


class Cities(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            country = data['country']
            province = data['province']

            response = requests.get('http://api.airvisual.com/v2/cities?state=' + province + '&country=' + country + '&key=' + API_KEY)
            print(response.status_code)

            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code
            if (status_code == 400):
                return {'message': 'Bad request. Try a different location.'}, status_code
            
            elif (status_code == 429):
                return {'message': 'Too many requests, try again in a few seconds.'}, status_code
            
            return {
                'message': 'Something went wrong'
            }, status_code
