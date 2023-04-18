from django.urls import path
from .views import RegisterView,LoginView, UsersListView, UsersSingleView, UserLibraryView
urlpatterns = [
    path('', UsersListView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('<int:pk>/', UsersSingleView.as_view()),
    path('<int:pk>/user_library/', UserLibraryView.as_view())
]