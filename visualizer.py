#!/usr/bin/python3

def display(data):
    page = open('tables.html','w')
    html= '''<html><head><title>SQL Table Visualizer</title>
<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
body {
  min-height: 100vh;
  text-align:center;
  color: #ddd;
  margin: 0;
  background-image: url('chinook-L5.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
main {
  margin: 60px 20px;
  width: auto;
  overflow-x: visible;
  padding: 60px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.9);
}
table{
  border-radius: 3px;
  font-family: 'Open Sans', sans-serif;
  font-size:18px;
  background-color:#323131;
  table-layout: fixed;
  margin: 40px auto;
}
td, th{
  padding:18px;
  border-radius: 3px;
  background-color: #3d1607;
  text-align: left;
}
th{
  background-color: #8c3a1b;
}
</style>
</head><body><main>'''
    names = list(map(lambda x: x[0], data.description))
    html += "<table><tbody>"
    html += "<tr>"
    for heading in names:
        html += "<th>"+ heading +"</th>"
    html += "</tr>"
    for row in data:
        html += "<tr>"
        for data in row:
            converted_data = str(data)
            html += "<td>"+ converted_data +"</td>"
        html += "</tr>"
    html += "</tbody></table>"
    html += "</main></body></html>"
    page.write(html)
    page.close()