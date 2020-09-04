from rest_framework import serializers
from Blog.models import BlogModel

# Diary serializer

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogModel
        fields = '__all__'
