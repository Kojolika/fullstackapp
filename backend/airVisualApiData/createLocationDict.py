import apiKey
import requests
import json
import time

API_KEY = apiKey.Key.retrieve()
locations_json = 'locationData.json'


dict = {
    "USA":  [{
        "Michigan": ["Canton", "Dearborn"],
        "New York": ["New York City", "Some other city"]
    }],
    "Canada": [{
        "Ontario": ["Toronto", "Windsor"]
    }]
}


class CreateLocationDict:
    @staticmethod
    def getCountries():
        try:
            url = 'http://api.airvisual.com/v2/countries?key=' + API_KEY
            # submit the request using the session
            response = requests.get(url)

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

    @staticmethod
    def getStates(country):
        try:
            url = 'http://api.airvisual.com/v2/states?country=' + country + '&key=' + API_KEY
            response = requests.get(url)
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

    @staticmethod
    def getCities(country, state):
        try:
            url = 'http://api.airvisual.com/v2/cities?state=' + \
                state + '&country=' + country + '&key=' + API_KEY
            response = requests.get(url)
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

    @staticmethod
    def createDict():
        dict = {}
        countries_response = CreateLocationDict.getCountries()

        sleep_timer_1 = 20
        while not 'data' in countries_response:
            print('Refetching countries in ' + str(sleep_timer_1) + ' seconds')
            time.sleep(sleep_timer_1)
            countries_response = CreateLocationDict.getCountries()
            sleep_timer_1 += 10

        countries = countries_response['data']
        print(countries)

        for item in countries:
            country = item['country']
            print(country)

            states_response = CreateLocationDict.getStates(country)

            sleep_timer_2 = 20
            while not 'data' in states_response:
                print('Refetching states in ' + str(sleep_timer_1) + ' seconds')
                time.sleep(sleep_timer_2)
                states_response = CreateLocationDict.getStates(country)
                sleep_timer_2 += 10

            states = states_response['data']
            print(states)
            states_dict = {}

            for item in states:
                state = item['state']
                print(state)

                response = CreateLocationDict.getCities(country, state)
                print(response)

                sleep_timer_3 = 30
                while type(response) is tuple and response[1] == 429:
                    print('Refetching cities in ' + str(sleep_timer_3) + ' seconds')
                    time.sleep(sleep_timer_3)
                    response = CreateLocationDict.getCities(country, state)
                    print(response)
                    sleep_timer_3 += 10

                cities_formatted = []

                if 'data' in response:
                    cities = response['data']

                    for item in cities:
                        city = item['city']
                        cities_formatted.append(city)

                    print(cities_formatted)

                states_dict[state] = cities_formatted
            dict[country] = states_dict

        return dict

    @staticmethod
    def storeDict(dict):
        with open(locations_json, 'w') as file:
            json.dump(dict, file, indent=1)

    @staticmethod
    def returnDict():
        with open(locations_json) as file:
            locations_dict = json.load(file)
            return locations_dict


new_dict = CreateLocationDict.createDict()
CreateLocationDict.storeDict(new_dict)
