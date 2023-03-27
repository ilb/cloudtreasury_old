import requests as req
from bs4 import BeautifulSoup
import re

class tableToQuerry:
    def __init__(self) -> None:
        self.url = 'https://ilb.github.io/stockvaluation/securities.xhtml'
        self.resp_text = None
        self.rows = None
        self.soup = None

    def send_req(self):
        resp_res = req.get(self.url)
        resp_res.encoding = 'utf-8'
        resp_text = resp_res.text
        self.soup = BeautifulSoup(resp_text, 'html.parser')
        return resp_text

    def tag_finder(self, tag):
        return self.soup.find_all(tag)

    def get_and_normalize_tds(self):

        tds = self.tag_finder('td')

        index = 1
        array_for_stock = []
        new_array = []
        for row in tds:
            
            row = str(row).replace('<td></td>', 'NULL').replace('<p>', '').replace('</p>', '').replace('</td>', '').replace('<td class="float">', '').replace('<td>', '').replace('\n', '').replace('<p style="font-size:11pt;"', '').replace('</p>', '')
            
            if (index == 1 or index == 3 and row != 'NULL'):
                array_for_stock.append("'" + row + "'")
            else:
                array_for_stock.append(row)

            if index % 3 == 0:
                new_array.append(array_for_stock)
                array_for_stock = []  
                index = 1
                continue           


            index += 1
        self.rows = new_array
        return new_array

    def dict_to_cols(self, data: list):
        mysql_rows = []


        for row in data:
            string = ''
            index = 1
            
            if (index == 1):
                string += "("

            for column in row:

                    

                if (index % 3 == 0):
                    string += str(column) + ')'
                else:
                    string += str(column) + ', '



                index += 1
            mysql_rows.append(string) 

                
        return mysql_rows
    
    @staticmethod
    def cols_to_sql(cols):
        string = ''
        index = 0
        for i in cols:

            string += i + ', '
            index += 1
        mysql = f'INSERT INTO "Stocks" (ticker, value, isin) VALUES ${string}'
        return mysql

tb = tableToQuerry()
tb.send_req()
tbs = tb.get_and_normalize_tds()
mysql_cols = tb.dict_to_cols(tbs)
mysql = tb.cols_to_sql(mysql_cols)