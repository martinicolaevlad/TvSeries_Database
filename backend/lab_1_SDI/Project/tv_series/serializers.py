from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import TvSerie, Director, Actor, Payment, PaymentDto


class TvSerieSerializer(serializers.ModelSerializer):



    title = serializers.CharField(max_length=100)
    director = serializers.CharField(max_length=100)
    year_published = serializers.IntegerField()
    nr_seasons = serializers.IntegerField()
    cast = serializers.CharField(max_length=100)
    rating = serializers.FloatField()
    def validate(self, data):
        if data['nr_seasons'] < 0:
            raise ValidationError("seasons can not be negative")
        if data['rating'] < 0:
            raise ValidationError("rating can not be negative")
        return data


    class Meta:
        model = TvSerie
        fields = "__all__"

class TvSerieSerializerId(serializers.ModelSerializer):
    title = serializers.CharField(max_length=100)
    director = Director()
    year_published = serializers.IntegerField()
    nr_seasons = serializers.IntegerField()
    cast = serializers.CharField(max_length=100)
    rating = serializers.FloatField()
    def validate(self, data):
        if data['nr_seasons'] < 0:
            raise ValidationError("seasons can not be negative")
        return data
    # def validate_teacher_id(self, value):
    #     filter = TvSerie.objects.filter(id=value)
    #     if not filter.exists():
    #         raise serializers.ValidationError("TvSerie does not exist")
    #     return value
    class Meta:
        model = TvSerie
        fields = "__all__"
        depth = 1

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = "__all__"

class DirectorSerializer(serializers.ModelSerializer):

    def validate(self, data):
        if data['age'] < 0:
            raise ValidationError("age can not be negative")
        return data
    class Meta:
        model = Director
        fields = "__all__"

class DirectorSerializer2(serializers.ModelSerializer):
    series = TvSerieSerializer(read_only=True)
    class Meta:
        model = Director
        fields = ['name', 'age', 'residence', 'phone_number', 'email', 'series']


class PaymentSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if data['salary'] < 0:
            raise ValidationError("seasons can not be negative")
        return data
    class Meta:
        model = Payment
        fields = ['actor', 'tv_serie', 'salary', 'days_worked']


# class PaymentSerializer2(serializers.ModelSerializer):
#     def validate(self, data):
#         if data['salary'] < 0:
#             raise ValidationError("seasons can not be negative")
#         return data
#     class Meta:
#         model = PaymentDto
#         fields = ['actor_name', 'tvSerie_title', 'salary', 'days_worked']

class StatisticsSerializer(serializers.ModelSerializer):
    avg_stars = serializers.IntegerField(read_only=True)
    # book_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = TvSerie
        fields = ['title', 'director', 'year_published', 'nr_seasons', 'cast', 'rating', 'avg_stars']

class StatisticsSerializer2(serializers.ModelSerializer):
    avg_stars = serializers.IntegerField(read_only=True)


    class Meta:
        model = Payment
        fields = ['actor', 'tv_serie', 'avg_stars']


