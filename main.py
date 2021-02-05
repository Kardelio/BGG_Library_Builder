#!/usr/bin/env python
import sys
from Game import game
import os.path
import xml.etree.ElementTree as ET
import urllib.parse
import requests
import json
from bs4 import BeautifulSoup

# Constants
# ---------
GAMES_JSON = "games.json"
outputobject = {}
outputobject["games"] = []

already_collected_games = []

if os.path.isfile(GAMES_JSON):
    with open(GAMES_JSON) as json_file:
        data = json.load(json_file)
        for p in data['games']:
            outputobject["games"].append(p)
            already_collected_games.append(p["game_id"])

query = sys.argv[1]
parsed=urllib.parse.quote(query)

URL = f"https://boardgamegeek.com/geeksearch.php?action=search&q={parsed}&objecttype=boardgame"
page = requests.get(URL)
soup = BeautifulSoup(page.content,'html.parser')
rows = soup.find_all('tr')

refined_org=[]
refined=[]

for it in rows:
    ID = it.get("id")
    if ID == "row_":
        f = it.find('a', class_="primary")
        y = it.find('span', class_="smallerfont dull")
        r = it.find('td', class_="collection_rank")
        year = "N/A"
        if y is not None:
            year = y.text.strip("()")
        g = game(f.text,year,"".join(r.text.split()),f["href"])
        refined_org.append(g)

for item in refined_org:
    if(item.isBoardGame()):
        refined.append(item)

for item in range(len(refined)):
    print(f"{item} -> {refined[item].display()}")

option = input("Which option did you mean? [submit number]: ")
selected = refined[int(option)]
print(f"Selected: {selected.name}")

SECOND_URL = f"https://api.geekdo.com/xmlapi/boardgame/{selected.getGameId()}"
detailspage = requests.get(SECOND_URL)
tree = ET.ElementTree(ET.fromstring(detailspage.content))
root = tree.getroot()

first = root.find("boardgame")
yp = first.find("yearpublished")
minp = first.find("minplayers")
maxp = first.find("maxplayers")
playt = first.find("playingtime")
mplayt = first.find("minplaytime")
maxplayt = first.find("maxplaytime")
pubb = first.find("boardgamepublisher")
image = first.find("image")
description = first.find("description")

selected.addDetails(int(minp.text), int(maxp.text), int(mplayt.text), int(maxplayt.text), int(playt.text), pubb.text, image.text, description.text)
#print(f"{selected.fullDisplay()}")
#print(f"{selected.outputJson()}")

if selected.getGameId() not in already_collected_games:
    outputobject["games"].append(selected.outputJson())

with open(GAMES_JSON, 'w') as outfile:
    json.dump(outputobject, outfile)
