from django.urls import path
from .views import AtmosListView, AtmosSingleView
urlpatterns = [
    path('', AtmosListView.as_view()),
    path('<int:pk>/', AtmosSingleView.as_view())
]