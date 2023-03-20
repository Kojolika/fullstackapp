from flask_restful import Resource, reqparse
import requests

API_KEY = '0e20fded-24a7-457c-a908-9c8f5f74fe29'

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
            # handle any errors here
            return {'Error': 'something went wrong'}, 500

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
            return {
                'Data': [],
                'Message' : 'Some error, probably no country sent in request' 
            }
        
class Cities(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            country = data['country']
            state = data['state']

            response = requests.get('http://api.airvisual.com/v2/cities?state='+ state + '&country=' + country + '&key=' + API_KEY)
            print(response.status_code)

            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            return {
                'Data': [],
                'Message' : 'Some error, probably no country/city sent in request' 
            }
