# Generated by Django 3.1 on 2020-09-04 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0014_remove_blogmodel_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogmodel',
            name='creator',
            field=models.CharField(default=' ', max_length=100),
        ),
    ]
