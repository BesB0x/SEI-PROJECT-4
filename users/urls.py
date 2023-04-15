from django.urls import path
from .views import RegisterView,LoginView, UsersListView
urlpatterns = [
    path('', UsersListView.as_view()),
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view())
]