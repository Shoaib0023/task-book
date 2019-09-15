from django.contrib import admin
from django.urls import path, include, re_path
from todo import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todos/', views.TodoList.as_view()),
    path('api/todos/<int:pk>/', views.TodoDetail.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('api/user/', views.UserAPI.as_view())
]

