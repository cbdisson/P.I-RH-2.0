# Generated by Django 5.2 on 2025-04-09 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rh_app', '0004_beneficiario'),
    ]

    operations = [
        migrations.AddField(
            model_name='funcionario',
            name='estrangeiro',
            field=models.BooleanField(default=False),
        ),
    ]
