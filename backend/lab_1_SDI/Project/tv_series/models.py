from datetime import datetime

from django.db import models
from rest_framework.exceptions import ValidationError
from dataclasses import dataclass

# Create your models here.
def integer_poz_validator(value):
    if value > 0:
        return value
    else:
        raise ValidationError("This field does not accept negative values. Stay positive! :) .")


def not_current_date(value):
    current_date = datetime.date.today()
    if value.date() <= current_date:
        return value
    else:
        raise ValidationError("That time has already passed!")

def name_is_alphabetic(value):
    if value. isalpha():
        return value
    else:
        raise ValidationError("What kind of parents gave you that name!?")


def capacity_validator(value):
    if value < 30:
        return value
    else:
        raise ValidationError("We cant feed an entire african tribe!")
class Director(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveSmallIntegerField()
    residence = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Actor(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveSmallIntegerField()
    nr_awards =  models.PositiveSmallIntegerField()
    phone_number = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class TvSerie(models.Model):
    title = models.CharField(max_length=100)
    director = models.ForeignKey(Director, on_delete=models.CASCADE, related_name='series')
    year_published = models.PositiveSmallIntegerField()
    nr_seasons = models.PositiveSmallIntegerField()
    cast = models.CharField(max_length=100)
    rating = models.FloatField()

    def __str__(self):
        return self.title

class Payment(models.Model):
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE, blank=True)
    tv_serie = models.ForeignKey(TvSerie, on_delete=models.CASCADE, blank=True)
    salary = models.PositiveSmallIntegerField()
    days_worked = models.PositiveSmallIntegerField()

    def __str__(self):
        return 'Payment for ' + self.actor.name + ' in ' + self.tv_serie.title

@dataclass
class ActorDto:
    id: int
    name: str
    age: int
    nr_awards: int
    phone_number: str
    email: str

@dataclass
class TvSerieDto:

    title: str
    director_name: str
    year_published: int
    nr_seasons: int
    cast: str
    rating: float

@dataclass
class PaymentDto:
    actor_name: str
    tvSerie_name: str
    salary: int
    days_worked: int

