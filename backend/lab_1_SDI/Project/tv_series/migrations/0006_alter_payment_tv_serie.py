# Generated by Django 4.1.7 on 2023-03-22 09:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("tv_series", "0005_alter_payment_actor"),
    ]

    operations = [
        migrations.AlterField(
            model_name="payment",
            name="tv_serie",
            field=models.ForeignKey(
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="tv_series.tvserie",
            ),
        ),
    ]
