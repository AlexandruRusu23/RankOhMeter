import sys
import re
import urllib3
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
import time
import threading
import queue
import csv

leaderboard = queue.Queue()

def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None.
    """
    response = get(url, stream=True)
    try:
        if is_good_response(response):
            return response.content
        else:
            return None
    except RequestException as e:
        print('Error during requests to {0} : {1}'.format(url, str(e)))
        return None

def is_good_response(resp):
    """
    Returns True if the response seems to be HTML, False otherwise.
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None 
            and content_type.find('html') > -1)

def get_current_leaderboard(soup):
    current_players_list = []
    table = soup.find("table",{"class":"table table-striped"})
    table_body = table.find('tbody')
    rows = table_body.find_all('tr')
    for row in rows:
        cols = row.find_all('td')
        cols = [elem.text.strip() for elem in cols]
        current_players_list.append([elem for elem in cols if elem])
    return current_players_list

def get_ranged_leaderboard(min_range = 1, max_range = 17759):
    ranged_leaderboard = []
    for iter in range(min_range,max_range):
        raw_html = simple_get('https://www.stormshield.one/pvp?page='+str(iter))
        soup = BeautifulSoup(raw_html, 'html.parser')
        ranged_leaderboard.append(get_current_leaderboard(soup))
        #print("page number: ", iter)
    ranged_leaderboard = [leaderboard.put(player, True, None) for elem in ranged_leaderboard for player in elem]

if __name__ == '__main__':
    threads_list = list()
    timer = time.time()
    nr_threads = 50
    nr_pages_to_scrap = 100
    for iter in range(1,nr_threads + 1):
        current_thread = threading.Thread(target=get_ranged_leaderboard, args=(iter*nr_pages_to_scrap - nr_pages_to_scrap + 1, iter*nr_pages_to_scrap + 1))
        current_thread.start()
        threads_list.append(current_thread)
    
    print("nr threads: ", nr_threads)
    print("nr pages to scrap per thread: ", nr_pages_to_scrap)

    for thread in threads_list:
        thread.join()
    
    print("time to process the range: ", time.time() - timer, " sec.")
    print('Leaderboard size:', leaderboard.qsize())
