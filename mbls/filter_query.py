import abc
import re
import sys

class Filter(abc.ABC):
    @abc.abstractmethod
    def valid(self, args):
        pass

    @abc.abstractmethod
    def should(self, args):
        pass

    @abc.abstractmethod
    def get_query(self, args):
        pass

'''
class Template(Filter):
    def valid(self, args):
        return

    def should(self, args):
        return

    def get_query(self, args):
        if self.valid(args):
            return
        return ''
'''

class TimeFilter(Filter):
    def should(self, args):
        return 'from' in args and 'to' in args

    def valid(self, args):
        if self.should(args):
            regex = r'[1-9]\d\d\d-\d\d-\d\d'
            return re.match(regex, args['from']) and re.match(regex, args['to'])
        raise Exception

    def get_query(self, args):
        if self.should(args) and self.valid(args):
            return 'crimedate between \'{}\' and \'{}\''.format(args['from'], args['to'])
        raise Exception

class WeaponFilter(Filter):
    def valid(self, args):
        return args['weapon'] in ['FIREARM', 'OTHER', 'KNIFE', 'HANDS', 'FIRE']

    def should(self, args):
        return 'weapon' in args

    def get_query(self, args):
        if self.valid(args):
            return 'weapon = \'{}\''.format(args['weapon'])
        return ''

class PremiseFilter(Filter):
    def valid(self, args):
        return True

    def should(self, args):
        return 'premise' in args

    def get_query(self, args):
        if self.valid(args):
            return "premise = '{}'".format(args['premise'])
        return ''

class DistrictFilter(Filter):
    def valid(self, args):
        return True

    def should(self, args):
        return 'district' in args

    def get_query(self, args):
        if self.valid(args):
            return "district = '{}'".format(args['district'])
        return ''

class NeighborhoodFilter(Filter):
    def valid(self, args):
        return True

    def should(self, args):
        return 'neighborhood' in args

    def get_query(self, args):
        if self.valid(args):
            return "neighborhood = '{}'".format(args['neighborhood'])
        return ''

class DescriptionFilter(Filter):
    def valid(self, args):
        return True

    def should(self, args):
        return 'description' in args

    def get_query(self, args):
        if self.valid(args):
            return "description = '{}'".format(args['description'])
        return ''

filters = []
filters.append(TimeFilter())
filters.append(WeaponFilter())
filters.append(PremiseFilter())
filters.append(DistrictFilter())
filters.append(NeighborhoodFilter())
filters.append(DescriptionFilter())

def build_query(args):
    result = []
    for f in filters:
        if f.should(args):
            result.append(f.get_query(args))
    return ' AND '.join(result)