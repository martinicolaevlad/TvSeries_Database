from django.contrib import admin

from Project.tv_series.models import TvSerie, Actor, Payment, Director

# Register your models here.
admin.site.register(TvSerie)
admin.site.register(Actor)
admin.site.register(Payment)
admin.site.register(Director)