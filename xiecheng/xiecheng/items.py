# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class XiechengItem(scrapy.Item):
    pass


class HotelItem(scrapy.Item):
    hotel_amount = scrapy.Field()
    id = scrapy.Field()
    name = scrapy.Field()
    place = scrapy.Field()
    price = scrapy.Field()
    rate = scrapy.Field()
    href = scrapy.Field()


class SightItem(scrapy.Item):
    img = scrapy.Field()
    name = scrapy.Field()
    place = scrapy.Field()
    level = scrapy.Field()
    rate = scrapy.Field()
    price = scrapy.Field()
    href = scrapy.Field()


class TraficcItem(scrapy.Item):
    style = scrapy.Field()
    name = scrapy.Field()
    href = scrapy.Field()
    desc_info = scrapy.Field()
    desc = scrapy.Field()


class FoodsItem(scrapy.Item):
    img = scrapy.Field()
    name = scrapy.Field()
    place = scrapy.Field()
    rate = scrapy.Field()
    price = scrapy.Field()
    href = scrapy.Field()


class ShoppingItem(scrapy.Item):
    name = scrapy.Field()
    place = scrapy.Field()
    rate = scrapy.Field()
    href = scrapy.Field()
