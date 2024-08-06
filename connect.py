import requests
import json

API_KEY = 'ATw9QKARBdcfpEAvauJQc5Gd3V5v7gPz'
DISCOVERY = 'https://app.ticketmaster.com/discovery/v2/'

def search_events(artist, stateCode, countryCode):
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

# Event search
data = search_events('Laufey', 'CO', 'US')

# Save JSON data to a file
with open('events_data.json', 'w') as file:
    json.dump(data, file, indent=4)  # indent=4 for pretty printing

# Retrieving ID    
id = data['_embedded']['events'][0]['id']
print(id)
