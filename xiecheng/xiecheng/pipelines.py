import pymongo
from scrapy.conf import settings

from xiecheng.items import SightItem, HotelItem, TraficcItem, FoodsItem, ShoppingItem


class XiechengPipeline(object):
    def process_item(self, item, spider):
        return item

class PyMOngoLianJiaPipeline():
    def __init__(self):
        self.MONGODB_HOST = settings['MONGODB_HOST']
        self.MONGODB_PORT = settings['MONGODB_PORT']
        self.MONGODB_DB = settings['MONGODB_DB']
        conn = pymongo.MongoClient(host=self.MONGODB_HOST, port=self.MONGODB_PORT)
        db = conn[self.MONGODB_DB]
        self.collections = db[settings['MONGODB_COLLECTION']]

    def process_item(self, item, spider):
        if isinstance(item,SightItem):
            self.collections.insert(dict(item))
        if isinstance(item,HotelItem):
            self.collections.insert(dict(item))
        if isinstance(item, TraficcItem):
            self.collections.insert(dict(item))
        if isinstance(item, FoodsItem):
            self.collections.insert(dict(item))
        if isinstance(item, ShoppingItem):
            self.collections.insert(dict(item))
        return item


