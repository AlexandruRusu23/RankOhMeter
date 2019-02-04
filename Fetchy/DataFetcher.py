"""
DataFetcher module
"""

import sys
import re
from contextlib import closing
from bs4 import BeautifulSoup
import time
import threading
import queue
import urllib3
from requests import get
from requests.exceptions import RequestException

class DataFetcher(object):
    def __init__(self):
        pass

    def is_good_response(self, resp):
        """
        Returns True if the response seems to be HTML, False otherwise.
        """
        content_type = resp.headers['Content-Type'].lower()
        return (resp.status_code == 200
                and content_type is not None 
                and content_type.find('html') > -1)

    def simple_get(self, url):
        """
        Attempts to get the content at `url` by making an HTTP GET request.
        If the content-type of response is some kind of HTML/XML, return the
        text content, otherwise return None.
        """
        response = get(url, stream=True)
        try:
            if self.is_good_response(response):
                return response.content
            else:
                return None
        except RequestException as e:
            print('Error during requests to {0} : {1}'.format(url, str(e)))
            return None
