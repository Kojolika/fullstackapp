import json

unprocessed_world_data = 'countries_states_cities.json'

file = open (unprocessed_world_data, "rb")
json_data = json.load(file)
file.close

processed_locations = []
for country_data in json_data:
    country = {}
    country['name'] = country_data['name']
    country['iso2'] = country_data['iso2']

    states = []
    for state_data in country_data['states']:
        state = {}
        state['name'] = state_data['name']
        state['state_code'] = state_data['state_code']
        states.append(state)

        cities=[]
        for city_data in state_data['cities']:
            city={}
            city['name'] = city_data['name']
            cities.append(city)
        
        state['cities'] = cities
    
    country['states'] = states
    processed_locations.append(country)

new_file = open('processed_locations.json', 'w')
json.dump(processed_locations, new_file, indent=1)
new_file.close()

processed_locations_1 = []

for country_data in json_data:
    country = country_data['name']

    for state_data in country_data['states']:
        state = state_data['name']

        for city_data in state_data['cities']:
            city = city_data['name']
            city_entry = {
                "label": city + ', ' + state + ', ' + country,
                "value":{
                    "city": city,
                    "state": state,
                    "country": country
                }
            }
            processed_locations_1.append(city_entry)     

    
new_file_1 = open('proccessed_for_select_locations.json','w')
json.dump(processed_locations_1, new_file_1, indent=1)
new_file_1.close()
