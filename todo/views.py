from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import TodoSerializer
from .models import Todo

import os
import logging
from django.http import HttpResponse, Http404
from django.views.generic import View
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import authentication


class TodoList(APIView):
    """
    List all snippets, or create a new snippet.
    # """
    # permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer =  TodoSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save(user=request.user)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    # permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)


    def get_object(self, pk):
        try:
            return Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        todo = self.get_object(pk)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        todo = self.get_object(pk)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        todo = self.get_object(pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class FrontendAppView(View):
#     """
#     Serves the compiled frontend entry point (only works if you have run `yarn
#     build`).
#     """
#     index_file_path = os.path.join(settings.BASE_DIR, 'build', 'index.html')
#
#     def get(self, request):
#         try:
#             with open(self.index_file_path) as f:
#                 return HttpResponse(f.read())
#         except FileNotFoundError:
#             logging.exception('Production build of app not found')
#             return HttpResponse(
#                 """
#                 This URL is only used when you have built the production
#                 version of the app. Visit http://localhost:3000/ instead after
#                 running `yarn start` on the frontend/ directory
#                 """,
#                 status=501,
#             )
