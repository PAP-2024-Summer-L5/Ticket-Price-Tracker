from flask import Flask, request, render_template
from connect import search_events
import json
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('artist.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    artist = data.get('artist')
    state = data.get('state')
    country = data.get('country')
    print(data)
    result = search_events(artist, state, country)
    with open('events_data.json', 'w') as file:
        json.dump(result, file, indent=4)  # indent=4 for pretty printing

    return result

if __name__ == '__main__':
    app.run(debug=True)