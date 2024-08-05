import requests
import json

API_KEY = '	ATw9QKARBdcfpEAvauJQc5Gd3V5v7gPz'
BASE_URL = 'https://app.ticketmaster.com/discovery/v2/'

def search_events(artist, stateCode, countryCode):
    endpoint = 'events.json'
    params = {
        'apikey': API_KEY,
        'keyword': artist,
        'stateCode': stateCode,
        'countryCode': countryCode,
        'locale': 'en-us'
    }
    
    response =  requests.get(BASE_URL + endpoint, params)

    print(response.status_code)
    return response.json()

events = search_events('Laufey', 'MD', 'US')
if events:
    print(events)

# Save JSON data to a file
with open('events_data.json', 'w') as file:
    json.dump(events, file, indent=4)  # indent=4 for pretty printing