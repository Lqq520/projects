import json
from lxml import etree
from scrapy import  FormRequest
from scrapy.spiders import Spider
from xiecheng.items import HotelItem


class Hotel(Spider):
    name = 'hotel'
    start_xiexheng_urls = 'http://hotels.ctrip.com/Domestic/Tool/AjaxHotelList.aspx'

    def start_requests(self):
        for i in range(1,100):
            #利用FormRequest进行POST请求中的参数传递
            yield FormRequest(url=self.start_xiexheng_urls, formdata={
                'page': 'i',
                'cityPY': 'chengdu',
                'cityCode': '028',
                'cityId': '28',

            }, callback=self.parse_hotel)

    # 获取酒店信息
    def parse_hotel(self, response):
        res = json.loads(response.text)
        item = HotelItem()
        item['hotel_amount'] = res['hotelAmount']
        hotel_html = res['hotelList']
        html = etree.HTML(hotel_html)
        hotel_list = html.xpath('//div[@class="hotel_new_list"]')
        for hotel in hotel_list:
            item['id'] = hotel.xpath('./@id')[0]
            item['name'] = hotel.xpath('./ul/li[2]/h2/a/@title')[0]
            item['href'] = hotel.xpath('./ul/li[2]/h2/a/@href')[0]
            place1 = hotel.xpath('./ul/li[2]/p[1]/a/text()')[0]
            place2 = hotel.xpath('./ul/li[2]/p[1]/a[2]/text()')[0]
            item['place'] = place1 + place2
            item['price'] = hotel.xpath('./ul/li[3]/div[1]/div/div/a/span/text()')[0]
            item['rate'] = hotel.xpath('./ul/li[4]/div[1]/a/span[2]/text()')[0]
            yield item
