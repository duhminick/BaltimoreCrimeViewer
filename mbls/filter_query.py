import abc
import re
import sys

class Filter(abc.ABC):
    @abc.abstractmethod
    def valid(self, args):
        pass

    def should(self, args):
        pass

    @abc.abstractmethod
    def get_query(self, args):
        pass

class TimeFilter(Filter):
    def valid(self, args):
        regex = r'[1-9]\d\d\d-\d\d-\d\d'
        return re.match(regex, args['from']) and re.match(regex, args['to'])

    def should(self, args):
        return 'from' in args and 'to' in args

    def get_query(self, args):
        if self.valid(args):
            return 'crimedate between \'{}\' and \'{}\''.format(args['from'], args['to'])
        return ''

class WeaponFilter(Filter):
    def valid(self, args):
        return args['weapon'] in ['FIREARM', 'OTHER', 'KNIFE', 'HANDS', 'FIRE']

    def should(self, args):
        return 'weapon' in args

    def get_query(self, args):
        if self.valid(args):
            return 'weapon = \'{}\''.format(args['weapon'])
        return ''

filters = [TimeFilter(), WeaponFilter()]
def build_query(args):
    result = []
    for f in filters:
        if f.should(args):
            result.append(f.get_query(args))
    return ' AND '.join(result)