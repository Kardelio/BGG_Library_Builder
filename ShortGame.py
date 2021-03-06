# Class Definitions
# -----------------
class shortgame:
    id = ""
    url = ""
    name = ""
    rank = ""
    year = ""
    image = ""
    
    def __init__(self,name_in, url_in, rank_in, year_in, image_url_in):
        self.name = name_in
        self.url = url_in
        self.rank = rank_in
        self.year = year_in
        self.image = image_url_in
        self.id = self.getGameId()

    def getGameId(self):
        return self.url.split("/")[2]

    def isBoardGame(self):
        return self.url.split("/")[1] == "boardgame"

    def outputJson(self):
        return self.__dict__