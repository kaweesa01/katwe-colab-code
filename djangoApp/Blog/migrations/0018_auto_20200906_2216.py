# Generated by Django 3.1 on 2020-09-06 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0017_auto_20200906_2151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logomodel',
            name='image',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to='logo/'),
        ),
    ]