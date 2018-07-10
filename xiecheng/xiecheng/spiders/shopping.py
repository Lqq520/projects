from scrapy import Spider, Selector, Request
from xiecheng.items import ShoppingItem

class Shopping(Spider):
    name = 'shopping'
    domin_url='http://you.ctrip.com/shoppinglist/chengdu104'
    start_urls = {
        'http://you.ctrip.com/shoppinglist/chengdu104.html',
    }

    def parse(self,response):
        sel = Selector(response)
        numpage=sel.xpath('//div[@class="ttd_pager cf"]/div/span/b/text()').extract()[0]
        for page in  range(int(numpage)+1):
            yield Request(self.domin_url + '/s0-p' + str(page) + 'html',
                          callback=self.shopping_parse)

    def shopping_parse(self, response):
        sel = Selector(response)
        item = ShoppingItem()
        shopping_list = sel.xpath('//div[@class="list_mod2"]')
        for shopping in shopping_list:
            item['name'] = shopping.xpath('./div[2]/dl/dt/a/text()').extract()[0]
            item['href'] = shopping.xpath('./div[2]/dl/dt/a/@href').extract()[0]
            item['place']=shopping.xpath('./div[2]/dl/dd[1]/text()').extract()[0]
            item['rate'] =shopping.xpath('./div[2]/ul/li[1]/a/strong/text()').extract()[0]
            yield item