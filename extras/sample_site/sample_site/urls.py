from django.urls import path
from app.views import test, ajax_form

urlpatterns = [
    path('', test),
    path('ajax_form/', ajax_form),
]
