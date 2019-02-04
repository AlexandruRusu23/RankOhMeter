"""
LoLFetcher module
"""
import DataFetcher

class LoLFetcher(DataFetcher.DataFetcher):
    '''
    This class is responsible to fetch data for LoL players
    '''
    # https://lolprofile.net/leaderboards
    ROOT_URL = 'https://lolprofile.net/leaderboards'
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

    def __init__(self):
        pass

    def get_leaderboard_table_head(self, soup):
        table_head_list = []
        table = soup.find("table",{"class":"table table1 s-c-table lb-table"})
        table_head = table.find('thead')
        rows = table_head.find_all('tr')
        for row in rows:
            cols = row.find_all('td')
            table_head_list = [elem.text.strip() for elem in cols]
        return table_head_list

    def get_current_leaderboard(self, soup):
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

    def get_leaderboard(self, root_url = str(), region = str()):
        full_url = root_url + region + '/' # after / there will be the number of the page appended
        page_number = 0
        exit_loop = False
        header_added = False
        while True:
            raw_html = self.simple_get(full_url + str(page_number))
            soup = DataFetcher.BeautifulSoup(raw_html, 'html.parser')
            current_leaderboard = self.get_current_leaderboard(soup)

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

if __name__ == '__main__':
    lol_fetcher = LoLFetcher()
    lol_fetcher.get_leaderboard(LoLFetcher.ROOT_URL, LoLFetcher.NA)
