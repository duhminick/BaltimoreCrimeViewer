import unittest
from filter_query import *

time_filter = TimeFilter()
weapon_filter = WeaponFilter()

'''
This test file can be executed with
python -m unittest test.py
'''

class TimeFilterTesting(unittest.TestCase):
    def test_valid_date(self):
        # Valid date
        args = {'from': '2019-10-21', 'to': '2019-10-22'}
        self.assertTrue(time_filter.should(args))
        self.assertTrue(time_filter.valid(args))
        self.assertEqual(time_filter.get_query(args), "crimedate between '2019-10-21' and '2019-10-22'")

    def test_to_date_before_from_date(self):
        # Invalid date. To date is before from date
        args = {'from': '2019-10-23', 'to': '2019-10-22'}
        self.assertTrue(time_filter.should(args))
        self.assertFalse(time_filter.valid(args))

        # Should not return a query
        self.assertEqual(time_filter.get_query(args), "")

    def test_incomplete_args(self):
        args = {'from': '2019-10-21'}
        self.assertFalse(time_filter.should(args))

        self.assertRaises(Exception, time_filter.valid, args)
        self.assertRaises(Exception, time_filter.get_query, args)

    def test_invalid_date(self):
        args = {'from': '123-123-123', 'to': '123-123-123'}
        self.assertTrue(time_filter.should(args))
        self.assertFalse(time_filter.valid(args))
        self.assertRaises(Exception, time_filter.get_query, args)

class WeaponFilterTesting(unittest.TestCase):
    def test_valid_weapon(self):
        for weapon in ['FIREARM', 'OTHER', 'KNIFE', 'HANDS', 'FIRE']:
            args = {'weapon': weapon}
            self.assertTrue(weapon_filter.valid(args))
            self.assertTrue(weapon_filter.should(args))
            self.assertEqual(weapon_filter.get_query(args), "weapon = '{}'".format(weapon))

if __name__ == '__main__':
    unittest.main()