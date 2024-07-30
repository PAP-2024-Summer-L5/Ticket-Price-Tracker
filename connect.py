import requests

API_KEY = '	ATw9QKARBdcfpEAvauJQc5Gd3V5v7gPz'
BASE_URL = 'https://app.ticketmaster.com/discovery/v2/'

def search_events(keyword):
    endpoint = 'events.json'
    params = {
        'apikey': API_KEY,
        'keyword': keyword,
        'locale': 'en-us'
    }
    
    response =  requests.get(BASE_URL + endpoint, params)

    print(response.status_code)
    return response.json()

events = search_events('Laufey')
if events:
    print(events)