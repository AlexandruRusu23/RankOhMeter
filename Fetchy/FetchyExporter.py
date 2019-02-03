"""
FetchyExporter module
"""

import psycopg2
from dbconfig import dbconfig

class FetchyExporter(object):
    '''
    This class is responsible for data transfering to and from WebApp postgresql database.
    '''
    def __init__(self):
        self.__connection = None

    def connect(self):
        """ Connect to the PostgreSQL database server """
        try:
            params = dbconfig()
            print('Connecting to the PostgreSQL database...')
            self.__connection = psycopg2.connect(**params)
            cursor = self.__connection.cursor()
            print('PostgreSQL database version:')
            cursor.execute('SELECT version()')
            db_version = cursor.fetchone()
            print(db_version)
            cursor.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
    
    def disconnect(self):
        if self.__connection is not None:
            self.__connection.close()
            print('Database connection closed.')
    
    def upsert_lol_player_data(self, table_name, player_list):
        '''
        Upsert a lol player
        '''
        insert_command = 'INSERT INTO {table_name}(name, wins, losses, division, points, most_used_champs,\
        kills, deaths, assists, player_rank) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)\
        ON CONFLICT (name) DO UPDATE SET\
        wins=EXCLUDED.wins, losses=EXCLUDED.losses, division=EXCLUDED.division, points=EXCLUDED.points,\
        most_used_champs=EXCLUDED.most_used_champs, kills=EXCLUDED.kills, deaths=EXCLUDED.deaths,\
        assists=EXCLUDED.assists, player_rank=EXCLUDED.player_rank'.format(
            table_name = table_name)
        try:
            cur = self.__connection.cursor()
            cur.execute(insert_command, player_list)
            self.__connection.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print('Insert error: ' + str(error))

if __name__ == '__main__':
    fetchy_exporter = FetchyExporter()
    fetchy_exporter.connect()
    fetchy_exporter.upsert_lol_player_data('lol', ['Yuhu', '124', '0', '23', '123', '34', '299', '0', '233', '1'])
    fetchy_exporter.disconnect()
