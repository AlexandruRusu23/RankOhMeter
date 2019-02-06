"""
LoLFetcher module
"""
import DataFetcher
import FetchyExporter

class LoLFetcher(DataFetcher.DataFetcher):
    '''
    This class is responsible to fetch data for LoL players
    '''
    # https://lolprofile.net/leaderboards
    LEADERBOARD_ROOT_URL = 'https://lolprofile.net/leaderboards'
    PLAYER_ROOT_URL = 'https://lolprofile.net/summoner'
    BR = '/br'
    EUNE = '/eune'
    EUW = '/euw'
    JP = '/jp'
    KR = '/kr'
    LAN = '/lan'
    LAS = '/las'
    NA = '/na'
    OCE = '/oce'
    TR = '/tr'
    RU = '/ru'
    DB_NAME = 'lol'

    DATABASE_INDEX_NAME = 0
    DATABASE_INDEX_WINS = 1
    DATABASE_INDEX_LOSSES = 2
    DATABASE_INDEX_DIVISION = 3
    DATABASE_INDEX_POINTS = 4
    DATABASE_INDEX_MOST_USED_CHAMPS = 5
    DATABASE_INDEX_KILLS = 6
    DATABASE_INDEX_DEATHS = 7
    DATABASE_INDEX_ASSISTS = 8
    DATABASE_INDEX_PLAYER_RANK = 9
    DATABASE_INDEX_MAX_SIZE = 10 #increment this for every new index added

    FETCHER_INDEX_NAME = 1
    FETCHER_INDEX_WINS = 2
    FETCHER_INDEX_LOSSES = 3
    FETCHER_INDEX_DIVISION = 4
    FETCHER_INDEX_POINTS = 5
    FETCHER_INDEX_MOST_USED_CHAMPS = 6
    FETCHER_INDEX_KILLS = 0 #NOT YET SET
    FETCHER_INDEX_DEATHS = 0 #NOT YET SET
    FETCHER_INDEX_ASSISTS = 0 #NOT YET SET
    FETCHER_INDEX_PLAYER_RANK = 0
    FETCHER_INDEX_MAX_SIZE = 10 #increment this for every new index added

    def __init__(self):
        self.__exporter = FetchyExporter.FetchyExporter()
        self.__exporter.connect()

    def get_leaderboard_table_head(self, soup):
        table_head_list = []
        table = soup.find("table",{"class":"table table1 s-c-table lb-table"})
        table_head = table.find('thead')
        rows = table_head.find_all('tr')
        for row in rows:
            cols = row.find_all('td')
            table_head_list = [elem.text.strip() for elem in cols]
        return table_head_list

    def get_current_page_leaderboard(self, soup):
        current_players_list = []
        table = soup.find("table",{"class":"table table1 s-c-table lb-table"})
        table_body = table.find('tbody')
        rows = table_body.find_all('tr')
        for row in rows:
            data_cols = row.find_all('td')
            player_champs = row.find_all('td', class_='mhide ce')
            player_champs = [elem.find_all('a') for elem in player_champs if isinstance(elem.img, type(None)) is False]
            player_champs = [iter.img.get('alt', '') for elem in player_champs for iter in elem]
            data_cols = [elem.text.strip() for elem in data_cols]
            data_cols.append(';'.join(player_champs))
            current_players_list.append([elem for elem in data_cols if elem])
        #[print(item) for item in current_players_list]
        return current_players_list

    def save_leaderboard_to_csv(self, root_url = str(), region = str()):
        full_url = root_url + region + '/' # after / there will be the number of the page appended
        page_number = 0
        exit_loop = False
        header_added = False
        while True:
            raw_html = self.simple_get(full_url + str(page_number))
            soup = DataFetcher.BeautifulSoup(raw_html, 'html.parser')
            current_leaderboard = self.get_current_page_leaderboard(soup)

            if header_added is False:
                csv_header = self.get_leaderboard_table_head(soup)
                with open('output.csv', 'a+') as output_file:
                    for item in csv_header:
                        not_last_index = csv_header.index(item) < len(csv_header) - 1
                        item = item.replace(',', '')
                        output_file.write(str(item))
                        if not_last_index is True:
                            output_file.write(',')
                    output_file.write('\n')
                header_added = True

            #check if we get to the end of leaderboard
            for current_list in current_leaderboard:
                # the list contains only ['No summoners recorded.'] in case the leaderboard is empty
                if len(current_list) <= 1:
                    exit_loop = True

            if exit_loop is True:
                break

            with open('output.csv', 'a+') as output_file:
                for current_list in current_leaderboard:
                    #get rid of extra ',' that may corupt our csv
                    current_list = [item.replace(',', '') for item in current_list]
                    #remove points from Tier
                    current_list[4] = current_list[4].replace(str(current_list[5]), '')

                    for item in current_list:
                        not_last_index = current_list.index(item) < len(current_list) - 1
                        output_file.write(str(item))
                        if not_last_index is True:
                            output_file.write(',')
                    output_file.write('\n')
            print(page_number)
            page_number += 1
    
    def get_player_kda(self, root_url = str(), region = str(), player_name = str()):
        '''
        This method returns player's kda data searching by name
        '''
        try:
            full_url = root_url + region + '/' + player_name
            raw_html = self.simple_get(full_url)
            soup = DataFetcher.BeautifulSoup(raw_html, 'html.parser')
            player_kda = soup.find("div",{"class":"kda tooltip"})
            player_kda_result = player_kda.text.replace('\n','').replace('\t','').split('/')
            return player_kda_result
        except Exception:
            print('Player {player_name} not found on url'.format(player_name = player_name))
            return [-1 for i in range(3)]

    def store_leaderboard_data(self, root_url = str(), region = str()):
        '''
        This method fetches player data from leaderboard and populate 
        the local players data dictionary
        '''
        full_url = root_url + region + '/' # after / there will be the number of the page appended
        page_number = 0
        exit_loop = False
        while True:
            raw_html = self.simple_get(full_url + str(page_number))
            soup = DataFetcher.BeautifulSoup(raw_html, 'html.parser')
            current_leaderboard = self.get_current_page_leaderboard(soup)

            #check if we get to the end of leaderboard
            for current_list in current_leaderboard:
                # the list contains only ['No summoners recorded.'] in case the leaderboard is empty
                if len(current_list) <= 1:
                    exit_loop = True

            if exit_loop is True:
                break

            for current_list in current_leaderboard:
                #get rid of extra ',' that may corupt our csv
                current_list = [item.replace(',', '') for item in current_list]
                #remove points from Division field
                current_list[LoLFetcher.FETCHER_INDEX_DIVISION] = current_list[LoLFetcher.FETCHER_INDEX_DIVISION].replace(str(current_list[LoLFetcher.FETCHER_INDEX_POINTS]), '')
                #remove text from Points field
                current_list[LoLFetcher.FETCHER_INDEX_POINTS] = current_list[LoLFetcher.FETCHER_INDEX_POINTS].split(' ')[0]
                #remove # from player rank
                current_list[LoLFetcher.FETCHER_INDEX_PLAYER_RANK] = current_list[LoLFetcher.FETCHER_INDEX_PLAYER_RANK].replace('#', '')
                player_data_list = ['0' for iter in range(LoLFetcher.FETCHER_INDEX_MAX_SIZE)]
                player_data_list[LoLFetcher.DATABASE_INDEX_NAME] = current_list[LoLFetcher.FETCHER_INDEX_NAME]
                player_data_list[LoLFetcher.DATABASE_INDEX_WINS] = current_list[LoLFetcher.FETCHER_INDEX_WINS]
                player_data_list[LoLFetcher.DATABASE_INDEX_LOSSES] = current_list[LoLFetcher.FETCHER_INDEX_LOSSES]
                player_data_list[LoLFetcher.DATABASE_INDEX_DIVISION] = current_list[LoLFetcher.FETCHER_INDEX_DIVISION]
                player_data_list[LoLFetcher.DATABASE_INDEX_POINTS] = current_list[LoLFetcher.FETCHER_INDEX_POINTS]
                #player_data_list[LoLFetcher.DATABASE_INDEX_MOST_USED_CHAMPS] = current_list[LoLFetcher.FETCHER_INDEX_MOST_USED_CHAMPS]
                player_kda = self.get_player_kda(LoLFetcher.PLAYER_ROOT_URL, LoLFetcher.NA, player_data_list[LoLFetcher.DATABASE_INDEX_NAME])
                player_data_list[LoLFetcher.DATABASE_INDEX_KILLS] = player_kda[0]
                player_data_list[LoLFetcher.DATABASE_INDEX_DEATHS] = player_kda[1]
                player_data_list[LoLFetcher.DATABASE_INDEX_ASSISTS] = player_kda[2]
                player_data_list[LoLFetcher.DATABASE_INDEX_PLAYER_RANK] = current_list[LoLFetcher.FETCHER_INDEX_PLAYER_RANK]
                #print(player_data_list)
                self.__exporter.upsert_lol_player_data(LoLFetcher.DB_NAME, player_data_list)
            
            print(page_number)
            page_number += 1
    
    def fetch_player_data(self):
        '''
        This method fetches all player data, store the results inside a list that
        will be exported into Web App DB.
        '''
        try:
            self.store_leaderboard_data(LoLFetcher.LEADERBOARD_ROOT_URL, LoLFetcher.NA)
            self.__exporter.disconnect()
        except KeyboardInterrupt:
            self.__exporter.disconnect()

if __name__ == '__main__':
    lol_fetcher = LoLFetcher()
    lol_fetcher.fetch_player_data()
