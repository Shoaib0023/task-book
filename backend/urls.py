from django.contrib import admin
from django.urls import path, include, re_path
from todo import views
# from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todos/', views.TodoList.as_view()),
    path('api/todos/<int:pk>/', views.TodoDetail.as_view()),
    path('api/', include("accounts.urls", namespace="accounts")) ,
]

# urlpatterns = format_suffix_patterns(urlpatterns)
