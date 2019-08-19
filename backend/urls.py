from django.contrib import admin
from django.urls import path, include, re_path
# from rest_framework import routers
from todo import views
from rest_framework.urlpatterns import format_suffix_patterns

# router = routers.DefaultRouter()
# router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todos/', views.TodoList.as_view()),
    path('api/todos/<int:pk>/', views.TodoDetail.as_view()),
    # path('api/', include(router.urls)),
    re_path(r'^', views.FrontendAppView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)