from scrapy import Spider, Selector, Request
from xiecheng.items import FoodsItem
class Food(Spider):
    name = 'food'
    url='http://you.ctrip.com/restaurantlist/chengdu104'
    start_urls = {
        'http://you.ctrip.com/restaurantlist/chengdu104.html',
    }
    #获取美食分页
    def parse(self, response):
        sel = Selector(response)
        numpage = sel.xpath('//div[@class="ttd_pager cf"]/div/span/b/text()').extract()[0]
        for page in range(int(numpage) + 1):
            yield Request(self.url + '/s0-p' + str(page)+'.html' ,
                          callback=self.food_parse)
    # 获取美食信息
    def food_parse(self, response):
        sel = Selector(response)
        item = FoodsItem()
        food_list = sel.xpath('//div[@class="list_mod2"]')
        for food in food_list:
            item['img'] = food.xpath('./div[2]/a/img/@data-imgurl').extract()[0]
            item['name'] = food.xpath('./div[3]/dl/dt/a/@title').extract()[0]
            item['href'] = food.xpath('./div[3]/dl/dt/a/@href').extract()[0]
            item['place'] = food.xpath('./div[3]/dl/dd[1]/text()').extract()[0]
            info = food.xpath('./div[3]/dl/dd[2]/text()').extract()[0]
            price1 = food.xpath('./div[3]/dl/dd[2]/span/text()').extract()[0]
            item['price'] = info + price1
            item['rate']=food.xpath('./div[3]/ul/li[1]/a/strong/text()').extract()[0]
            yield item
