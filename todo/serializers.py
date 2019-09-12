from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed', 'deadline', 'crucial')

    def create(self , validated_data):
        return Todo.objects.create(**validated_data)

