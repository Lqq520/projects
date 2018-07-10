from scrapy import Spider, Selector

from xiecheng.items import TraficcItem


class Traffic(Spider):
    name = 'traffic'
    start_urls = {
        'http://you.ctrip.com/traffic/chengdu104.html',
    }

    def parse(self, response):
        sel = Selector(response)
        item = TraficcItem()
        traffic_info = sel.xpath('//div[@class="detailcon"]')
        for traffic in traffic_info:
            if traffic.xpath('./h2/text()').extract() != []:
                item['style'] = traffic.xpath('./h2/text()').extract()
            if traffic.xpath('./div[1]/ul/li/dl/dt/a/text()').extract() != []:
                item['name'] = traffic.xpath('./div[1]/ul/li/dl/dt/a/text()').extract()
                item['href'] = traffic.xpath('./div[1]/ul/li/dl/dt/a/@href').extract()
            if traffic.xpath('./div/p[2]/text()').extract() != []:
                item['desc_info'] = traffic.xpath('./div/p[2]/text()').extract()
            if traffic.xpath('./div/p/strong/text()').extract() != []:
                item['desc'] = traffic.xpath('./div/p/strong/text()').extract()
            yield item
