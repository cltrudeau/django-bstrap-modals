from django.db import models
from rest_framework import serializers


class Author(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    rating = models.CharField(max_length=2)

    def __str__(self):
        return f'Author({self.name}, {self.id})'


class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ['url', 'id', 'name', 'description', 'rating']
