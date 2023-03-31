from flask_restful import Resource, reqparse
import requests
from airVisualApiData import apiKey

API_KEY = apiKey.Key.retrieve()

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


parser = reqparse.RequestParser()
parser.add_argument('country')
parser.add_argument('state')


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
            state = data['state']

            response = requests.get('http://api.airvisual.com/v2/cities?state=' + state + '&country=' + country + '&key=' + API_KEY)
            print(response.status_code)

            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code
            if (status_code == 400):
                return {'message': 'Not even data at location. Try a different location.'}, status_code
            
            elif (status_code == 429):
                return {'message': 'Too many requests, try again in a few seconds.'}, status_code
            
            return {
                'message': 'Something went wrong'
            }, status_code
