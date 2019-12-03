import unittest
from normalization import *

whole = {'crimedate': '2019-11-23T00:00:00.000', 
    'crimetime': '03:00:00',
    'crimecode': '6D',
    'location': '1900 HARMAN AVE',
    'description': 'LARCENY FROM AUTO',
    'inside_outside': 'O',
    'weapon': 'NA',
    'post': '831',
    'district': 'SOUTHWEST',
    'neighborhood': 'MORRELL PARK',
    'longitude': '-76.652119229071',
    'latitude': '39.266917609891',
    'premise': 'STREET',
    'total_incidents': '1'} 

inside_outside = InsideOutside()

class InsideOutsideTesting(unittest.TestCase):
    def test_outside(self):
       data = {'inside_outside': 'O'} 
       inside_outside.normalize(data)
       self.assertFalse('inside_outside' in data)
       self.assertTrue('inside' in data)
       self.assertTrue(data['inside'] == False)

    def test_inside(self):
       data = {'inside_outside': 'I'} 
       inside_outside.normalize(data)
       self.assertFalse('inside_outside' in data)
       self.assertTrue('inside' in data)
       self.assertTrue(data['inside'] == True)
       
if __name__ == '__main__':
    unittest.main()