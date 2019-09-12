from django.urls import path, include
from . import views
from knox import views as knox_views

app_name = 'accounts'

urlpatterns = [
    path('auth/', include('knox.urls')),
    path('auth/register/', views.RegisterUserView.as_view()),
    path('auth/login/', views.LoginUserView.as_view(), name="login"),
    path('auth/user/', views.UserAPI.as_view()),
    path('auth/logout/', knox_views.LogoutView.as_view(), name="logout")
]