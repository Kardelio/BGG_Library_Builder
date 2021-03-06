# Class Definitions
# -----------------
class game:
    game_id = ""
    name = ""
    year = ""
    rank = ""
    url = ""
    thumbnail = ""

    min_players = 0
    max_players = 0
    min_play_time = 0
    max_play_time = 0
    play_time = 0
    publisher = ""
    image = ""
    description = ""

    def __init__(self,name_in,year_in, rank_in, url_in, thumbnail_in):
        self.name = name_in
        self.year = year_in
        self.rank = rank_in
        self.url = url_in
        self.thumbnail = thumbnail_in
        self.game_id = self.getGameId()

    def getGameId(self):
        return self.url.split("/")[2]

    def isBoardGame(self):
        return self.url.split("/")[1] == "boardgame"

    def display(self):
        return f"{self.name} ({self.year}) Rank: {self.rank}"

    def fullDisplay(self):
        return f"{self.name} ({self.year}) Rank: {self.rank} {self.min_players}-{self.max_players}"
    
    def addDetails(self, min_p, max_p, min_play_time_in, max_play_time_in, play_time_in, pub, image_in, des_in):
        self.min_players = min_p
        self.max_players = max_p
        self.min_play_time = min_play_time_in
        self.max_play_time = max_play_time_in
        self.play_time = play_time_in
        self.publisher = pub
        self.image = image_in
        self.description = des_in

    def outputJson(self):
        return self.__dict__

