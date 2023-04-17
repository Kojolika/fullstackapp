from flask_restful import Resource, reqparse
import requests
from accuWeatherApiData import apiKey

API_KEY = apiKey.Key.retrieve()

parser = reqparse.RequestParser()
parser.add_argument('country',type=dict,  help = 'This field cannot be blank', required = True)
parser.add_argument('province',type=dict,  help = 'This field cannot be blank', required = True)
parser.add_argument('city',type=dict,  help = 'This field cannot be blank', required = True)


class GetLocationKey(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            country_code = data['country']['iso2']
            state_code = data['province']['state_code']
            city = data['city']['name']
            
            url = 'http://dataservice.accuweather.com/locations/v1/cities/' + country_code + '/' + state_code + '/search?apikey=' + API_KEY + '&q=' + city
            response = requests.get(url)
            response.raise_for_status()
            json_response = response.json()
            for location in json_response:
                if(location['AdministrativeArea']['EnglishName'] == data['province']['name'] and location['Country']['EnglishName'] == data['country']['name']):
                    return location

            return {'Message': "Can't find city key"},400
 

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code

            if(status_code == 503):
                 return { 'message': e.response.json()['Message'] }, status_code

            return { 'message': 'Something went wrong' }, status_code

forecast_parser = reqparse.RequestParser()
forecast_parser.add_argument('location_key',  help = 'This field cannot be blank', required = True)

class GetDailyForecast(Resource):
    def post(self):
        try:
            data = forecast_parser.parse_args()
            location_key = data['location_key']

            url = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/' + location_key + '?apikey=' + API_KEY

            response = requests.get(url)
            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code

            if(status_code == 503):
                 return { 'message': e.response.json()['Message'] }, status_code

            return { 'message': 'Something went wrong' }, status_code

class GetDailyForecast5Days(Resource):
    def post(self):
        try:   
            data = forecast_parser.parse_args()
            location_key = data['location_key']

            url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + location_key + '?apikey=' + API_KEY

            response = requests.get(url)
            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code

            if(status_code == 503):
                return { 'message': e.response.json()['Message'] }, status_code

            return { 'message': 'Something went wrong' }, status_code
        
class GetHourlyForecast12Hours (Resource):
    def post(self):
        try:
            data = forecast_parser.parse_args()
            location_key = data['location_key']

            url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + location_key + '?apikey=' + API_KEY

            response = requests.get(url)
            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code

            if(status_code == 503):
                return { 'message': e.response.json()['Message'] }, status_code

            return { 'message': 'Something went wrong' }, status_code