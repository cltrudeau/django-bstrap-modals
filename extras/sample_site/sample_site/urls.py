from django.urls import path
from app.views import test

urlpatterns = [
    path('', test),
]
