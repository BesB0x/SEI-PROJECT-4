from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/atmospheres/', include('atmospheres.urls')),
    path('api/tags/', include('tags.urls')),
    re_path(r'^.*$', index)
]
