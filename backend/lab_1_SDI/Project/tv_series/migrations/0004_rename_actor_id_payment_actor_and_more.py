# Generated by Django 4.1.7 on 2023-03-22 09:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tv_series", "0003_rename_rolepayments_payment"),
    ]

    operations = [
        migrations.RenameField(
            model_name="payment",
            old_name="actor_id",
            new_name="actor",
        ),
        migrations.RenameField(
            model_name="payment",
            old_name="TvSerie_id",
            new_name="tv_serie",
        ),
    ]