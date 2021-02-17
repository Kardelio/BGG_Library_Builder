#!/usr/bin/env python
import sys
from Game import game
import os.path
import xml.etree.ElementTree as ET
import urllib.parse
import requests
import json

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

def convertJsonToGame(jsonstr):
    name = jsonstr['name']
    year = jsonstr['year']
    rank = jsonstr['rank']
    url = jsonstr['url']
    return game(name, year, rank, url)

b = json.loads(query)
selected = convertJsonToGame(b)

if selected.getGameId() in already_collected_games:
    print("Game already in games list")
    exit(0)

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
outputobject["games"].append(selected.outputJson())

with open(GAMES_JSON, 'w') as outfile:
    json.dump(outputobject, outfile)

print("Game added to list")
