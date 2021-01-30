import sys
import os.path
import xml.etree.ElementTree as ET
import urllib.parse
import requests
import json
from bs4 import BeautifulSoup

# Constants
# ---------
GAMES_JSON = "games.json"

# Class Definitions
# -----------------
class game:
    game_id = ""
    name = ""
    year = ""
    rank = ""
    url = ""
    min_players = 0
    max_players = 0
    min_play_time = 0
    max_play_time = 0
    play_time = 0
    publisher = ""

    def __init__(self,name_in,year_in, rank_in, url_in):
        self.name = name_in
        self.year = year_in
        self.rank = rank_in
        self.url = url_in
        self.game_id = self.getGameId()

    def getGameId(self):
        return self.url.split("/")[2]

    def isBoardGame(self):
        return self.url.split("/")[1] == "boardgame"

    def display(self):
        return f"{self.name} ({self.year}) Rank: {self.rank}"

    def fullDisplay(self):
        return f"{self.name} ({self.year}) Rank: {self.rank} {self.min_players}-{self.max_players}"
    
    def addDetails(self, min_p, max_p, min_play_time_in, max_play_time_in, play_time_in, pub):
        self.min_players = min_p
        self.max_players = max_p
        self.min_play_time = min_play_time_in
        self.max_play_time = max_play_time_in
        self.play_time = play_time_in
        self.publisher = pub

    def outputJson(self):
        return self.__dict__

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
        refined_org.append(game(f.text,y.text.strip("()"),"".join(r.text.split()),f["href"]))

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

selected.addDetails(int(minp.text), int(maxp.text), int(mplayt.text), int(maxplayt.text), int(playt.text), pubb.text)
#print(f"{selected.fullDisplay()}")
#print(f"{selected.outputJson()}")

if selected.getGameId() not in already_collected_games:
    outputobject["games"].append(selected.outputJson())

with open(GAMES_JSON, 'w') as outfile:
    json.dump(outputobject, outfile)
