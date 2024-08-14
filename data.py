import sys
import sqlite3
import json
from visualizer import display

connection = sqlite3.connect("events.db")
sql = connection.cursor()

def initialize(jsonfile):
    event_data = jsonfile

    # Create the table if it doesn't exist
    table = '''
        CREATE TABLE IF NOT EXISTS creation (
            "Event Name" TEXT,
            "Date" TEXT,
            "Time" TEXT,
            "Location" TEXT,
            "Description" TEXT,
            "Cost" REAL
        )
    '''
    sql.execute(table)

    # Insert the new event data
    insert_query = '''
        INSERT INTO creation ("Event Name", "Date", "Time", "Location", "Description", "Cost")
        VALUES (?, ?, ?, ?, ?, ?)
    '''
    sql.execute(insert_query, (
        event_data["eventName"], 
        event_data["date"], 
        event_data["time"], 
        event_data["location"],
        event_data["description"], 
        None  # No cost provided, so set it to None
    ))

    # Display all records
    query = "SELECT * FROM creation"
    link = sql.execute(query)
    display(link)

    connection.commit()
    connection.close()

with open('test.json', 'r') as file:
    data = json.load(file)

initialize(data)
