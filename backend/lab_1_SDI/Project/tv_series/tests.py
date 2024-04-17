from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from .models import *


class FilterTvSerieTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        Director.objects.create(name='John Doe', age=40)
        TvSerie.objects.create(title="Test1", director=Director.objects.first(), year_published=2000, nr_seasons=5, cast="Actor1", rating=5)
        TvSerie.objects.create(title="Test2", director=Director.objects.first(), year_published=2000, nr_seasons=5, cast="Actor2", rating=7)
        TvSerie.objects.create(title="Test3", director=Director.objects.first(), year_published=2000, nr_seasons=5, cast="Actor3", rating=6)

    def test_tv_serie_rating_filter(self):
        url = '/tvseries-filter/6/'
        response = self.client.get(url)


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data, {

            "status": "success",
            "data": [
                {
                    "id": 2,
                    "title": 'Test2',
                    "director": 'John Doe',
                    "year_published": 2000,
                    "nr_seasons": 5,
                    "cast": "Actor2",
                    "rating": 7
                }]

        })

class FilterActorsTestCase(TestCase):
    def setUp(self):
        self.client=APIClient()
        Actor.objects.create(name="Actor1", age=30, nr_awards=25, phone_number='07', email='act1@1.com')
        Actor.objects.create(name="Actor2", age=30, nr_awards=30, phone_number='07', email='act2@1.com')
        Actor.objects.create(name="Actor3", age=30, nr_awards=35, phone_number='07', email='act3@1.com')

    def test_actor_awards_filter(self):
        url = "/actors-filter/30/"
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data, {

            "status": "success",
            "data": [
                {
                    "id": 1,
                    "name": 'Actor1',
                    "age": 30,
                    "nr_awards": 25,
                    "phone_number": '07',
                    "email": "act1@1.com"
                }]

        })