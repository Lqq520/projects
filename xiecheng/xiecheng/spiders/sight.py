from scrapy import Selector, Request, FormRequest
from scrapy.spiders import Spider

from xiecheng.items import SightItem


class Sight(Spider):
    name = 'sight'
    domin_url ='http://you.ctrip.com/sight/chengdu104'
    start_urls = {
         'http://you.ctrip.com/sight/chengdu104.html',
    }
    # 景点分页
    def parse(self, response):
        sel = Selector(response)
        numpage = sel.xpath('//div[@class="ttd_pager cf"]/div/span/b/text()').extract()[0]
        for page in range(int(numpage) + 1):
            yield Request(self.domin_url + '/s0-p' + str(page) + 'html#sightname',
                          callback=self.sight_parse)

    # 分析每个景点的数据
    def sight_parse(self, response):
        sel = Selector(response)
        sight_list = sel.xpath('//div[@class="list_mod2"]')
        for sight in sight_list:
            item = SightItem()
            item['img'] = sight.xpath('./div[1]/a/img/@src').extract()[0]
            item['name'] = sight.xpath('./div[2]/dl/dt/a/text()').extract()[0]
            item['place'] = sight.xpath('./div[2]/dl/dd[1]/text()').extract()[0]
            item['level'] = sight.xpath('./div[2]/dl/dd[2]/text()[1]').extract()[0]
            item['price'] = sight.xpath('./div[2]/dl/dd[2]/span/span/text()').extract()
            item['rate'] = sight.xpath('./div[2]/ul/li[1]/a/strong/text()').extract()[0]
            yield item


