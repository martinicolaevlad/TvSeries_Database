from dataclasses import asdict

from django.db.models import Avg, Count
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import TvSerie, Director, Actor, Payment, PaymentDto, TvSerieDto
from .serializers import TvSerieSerializer, ActorSerializer, DirectorSerializer, TvSerieSerializerId, PaymentSerializer, \
    StatisticsSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class TvSerieRatingFilter(APIView):
    def get(self, request, rating):
        series = TvSerie.objects.filter(rating__gt=rating)
        serializer = TvSerieSerializer(series, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

class DirectorAgeFilter(APIView):
    def get(self, request, age):
        series = Director.objects.filter(age__gt=age)
        serializer = DirectorSerializer(series, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

class ActorsAwardsFilter(APIView):
    def get(self, request, nr_awards):
        actors = Actor.objects.filter(nr_awards__lt=nr_awards)
        serializer = ActorSerializer(actors, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# def filter_brands(request, nr_awards):
#
#     if request.method=='GET':
#         brands_list=[]
#         brands = Actor.objects.all()
#         for brand in brands:
#             my_model_instance = Actor.objects.get(id=brand.id)
#             my_field_value = my_model_instance.nr_awards
#             if my_field_value > nr_awards:
#                brands_list.append(brand)
#         serializer = ActorSerializer(brands_list, many=True)
#         return Response(serializer.data)

class TvSeriesList(APIView):
    queryset = TvSerie.objects.all()
    serializer_class = TvSerieSerializer

    def get(self, request, id=None):
        if id:
            try:
                serie = TvSerie.objects.get(id=id)
            except TvSerie.DoesNotExist:
                return Response({"status": "error", "message": "TV Series not found."},status=status.HTTP_404_NOT_FOUND)
            serializer = TvSerieSerializerId(serie)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        items = TvSerie.objects.all()

        tv_serieDto = []
        for tvserie in items:
            dto = TvSerieDto(
                title = tvserie.title,
                director_name = tvserie.director.name,
                year_published = tvserie.year_published,
                nr_seasons = tvserie.nr_seasons,
                cast = tvserie.cast,
                rating = tvserie.rating
            )
            tv_serieDto.append(asdict(dto))
        return Response(tv_serieDto)

        # serializer = TvSerieSerializer(items, many=True)
        # return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):

        serializer = TvSerieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        item = TvSerie.objects.get(id=id)
        serializer = TvSerieSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        item = get_object_or_404(TvSerie, id=id)
        item.delete()
        return Response({"status": "success", "data": "Item deleted"}, status=status.HTTP_200_OK)

class DirestorsList(APIView):
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer

    def get(self, request, id=None):
            if id:
                try:
                    director = Director.objects.get(id=id)
                except:
                    return Response({"status": "error", "message": "Director not found."},status=status.HTTP_404_NOT_FOUND)
                serializer_director = DirectorSerializer(director)
                serializer_tv_series = TvSerieSerializer(director.series.all(), many=True)
                serialized_director_data = serializer_director.data
                serialized_director_data['series'] = serializer_tv_series.data

                for i in range(len(serialized_director_data['series'])):
                    del serialized_director_data['series'][i]['director']

                return Response({"status": "success", "data": serialized_director_data}, status=status.HTTP_200_OK)
            items = Director.objects.all()
            serializer = DirectorSerializer(items, many=True)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, id=False):

        if id:
            data = request.data
            datastr = data['data']
            datastr = datastr.split(",")
            for datas in datastr:
                cast = int(datas)
                if TvSerie.objects.get(id=cast):
                    serializers = TvSerie.objects.all()



                    TvSerie.objects.create(title = serializers.get(id=cast).title,
                                           director = Director.objects.get(id=id),
                                           year_published  = serializers.get(id=cast).year_published,
                                           nr_seasons  = serializers.get(id=cast).nr_seasons,
                                           cast  = serializers.get(id=cast).cast,
                                           rating = serializers.get(id=cast).rating)
            return Response('merge')

        serializer = DirectorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        item = Director.objects.get(id=id)
        serializer = DirectorSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        item = get_object_or_404(Director, id=id)
        item.delete()
        return Response({"status": "success", "data": "Item deleted"}, status=status.HTTP_200_OK)


class DirestorsList2(APIView):
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer

    def post(self, request, id=False):

        if id:
            data = request.data
            datastr = data['data']
            datastr = datastr.split(",")
            for datas in datastr:
                cast = int(datas)
                if TvSerie.objects.get(id=cast):
                    serializers = TvSerie.objects.all()

                    # TvSerie.objects.create(title = serializers.get(id=cast).title,
                    #                        director = Director.objects.get(id=id),
                    #                        year_published  = serializers.get(id=cast).year_published,
                    #                        nr_seasons  = serializers.get(id=cast).nr_seasons,
                    #                        cast  = serializers.get(id=cast).cast,
                    #                        rating = serializers.get(id=cast).rating)

                    item = TvSerie.objects.get(id=cast)
                    serializer = TvSerieSerializer(item, data={"title": serializers.get(id=cast).title,
                                                           "director" : Director.objects.get(id=id),
                                                           "year_published": serializers.get(id=cast).year_published,
                                                           "nr_seasons": serializers.get(id=cast).nr_seasons,
                                                           "cast": serializers.get(id=cast).cast,
                                                           "rating": serializers.get(id=cast).rating}, partial=True)
                if serializer.is_valid():
                    serializer.save()
            return Response('merge')

        serializer = DirectorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ActorsList(APIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer

    def get(self, request, id=None):
        if id:
            try:
                serie = Actor.objects.get(id=id)
            except:
                return Response({"status": "error", "message": "Actor not found."},status=status.HTTP_404_NOT_FOUND)
            serializer = ActorSerializer(serie)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        items = Actor.objects.all()
        serializer = ActorSerializer(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):

        serializer = ActorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        item = Actor.objects.get(id=id)
        serializer = ActorSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        item = get_object_or_404(Actor, id=id)
        item.delete()
        return Response({"status": "success", "data": "Item deleted"}, status=status.HTTP_200_OK)


class PaymentsList(APIView):
    query = Payment.objects.all()
    serializer_class = PaymentSerializer

    def get(self, request, id=None):
        if id:
            try:
                serie = Payment.objects.get(id=id)
            except:
                return Response({"status": "error", "message": "Payment not found."},status=status.HTTP_404_NOT_FOUND)
            serializer = PaymentSerializer(serie)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        items = Payment.objects.all()

        payments_dto = []
        for payment in items:
            dto = PaymentDto(
                actor_name=payment.actor.name,
                tvSerie_name=payment.tv_serie.title,
                salary=payment.salary,
                days_worked=payment.days_worked
            )
            payments_dto.append(asdict(dto))
        # return Response(payments_dto)

        # serializer = PaymentSerializer2(payments_dto, many=True)
        serializer = PaymentSerializer(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):

        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        item = Payment.objects.get(id=id)
        serializer = PaymentSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        item = get_object_or_404(Payment, id=id)
        item.delete()
        return Response({"status": "success", "data": "Item deleted"}, status=status.HTTP_200_OK)

class Statistics(APIView):
    @api_view(['GET'])
    def statistics(request):

        statistics = TvSerie.objects.annotate(
            avg_stars=Avg('director__age'),
        ).order_by('avg_stars')

        serializer = StatisticsSerializer(statistics, many=True)
        return Response(serializer.data)

class ManyStatistics(APIView):


    @api_view(['GET'])
    def many(request):
        if request.method == 'GET':

            # show_nr_awards = []
            #
            # for movie in TvSerie.objects.all():
            #     total_awards = 0
            #     for payment in Payment.objects.all():
            #         if movie.id == payment.tv_serie_id:
            #             total_awards += Actor.objects.get(id=payment.actor_id).nr_awards
            #     show_nr_awards.append([TvSerie.objects.get(id=movie.id), total_awards])

            movie_actor_pair = []

            for payment in Payment.objects.all():
                movie_actor_pair.append([Actor.objects.get(id=payment.actor_id), TvSerie.objects.get(id=payment.tv_serie_id)])

            movie_actor_pair.sort(key=lambda e: e[0].nr_awards, reverse=True)

            movies = []
            for element in movie_actor_pair:
                movies.append(element[1])

            serializer = TvSerieSerializer(movies, many=True)

            return Response({"data": serializer.data})

@api_view(['GET'])
def filter_actors(request,name,format=None):
    if request.method=='GET':
        restaurant_list=[]
        restaurants = Actor.objects.all()
        for restaurant in restaurants:
            my_model_instance = Actor.objects.get(id=restaurant.id)
            my_field_value = my_model_instance.name
            if my_field_value > name:
               restaurant_list.append(restaurant)
        serializer = ActorSerializer(restaurant_list, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def filter_tvseries(request,name,format=None):
    if request.method=='GET':
        restaurant_list=[]
        restaurants = TvSerie.objects.all()
        for restaurant in restaurants:
            my_model_instance = TvSerie.objects.get(id=restaurant.id)
            my_field_value = my_model_instance.name
            if my_field_value > name:
               restaurant_list.append(restaurant)
        serializer = TvSerieSerializer(restaurant_list, many=True)
        return Response(serializer.data)

