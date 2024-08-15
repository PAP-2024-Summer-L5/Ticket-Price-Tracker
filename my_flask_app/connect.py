import requests
import json

API_KEY = 'ATw9QKARBdcfpEAvauJQc5Gd3V5v7gPz'
DISCOVERY = 'https://app.ticketmaster.com/discovery/v2/'

def search_events(artist=None, stateCode=None, countryCode=None):
    endpoint = 'events.json'
    params = {
        'apikey': API_KEY,
        'keyword': artist,
        'stateCode': stateCode,
        'countryCode': countryCode,
        'locale': 'en-us'
    }
    
    response =  requests.get(DISCOVERY + endpoint, params)
    print(response.status_code)
    

    return response.json()

# # Save JSON data to a file
# with open('events_data.json', 'w') as file:
#         json.dump(data, file, indent=4)  # indent=4 for pretty printing

# Event search
# data = search_events('Gingerroot')
# # Retrieving ID    
# events = data['_embedded']['events']
# print(id)
