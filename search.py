#!/usr/bin/env python
import sys
from ShortGame import shortgame
import os.path
import urllib.parse
import requests
import json
from bs4 import BeautifulSoup
import re

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
        g = shortgame(re.sub(r'[^A-Za-z0-9 ]+', '', f.text.replace(':',' ')),f["href"], re.sub(r'\W+','',r.text), year)
        refined_org.append(g)

for item in refined_org:
    if(item.isBoardGame()):
        refined.append(item)

out = {}
out["games"] = []

for item in range(len(refined)):
    out["games"].append(refined[item].outputJson())

print(out)