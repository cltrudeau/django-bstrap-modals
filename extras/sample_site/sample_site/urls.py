from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views import test, ajax_form, AuthorViewSet

router = DefaultRouter()
router.register('authors', AuthorViewSet)

urlpatterns = [
    path('', test),
    path('ajax_form/', ajax_form),
    path('api/', include(router.urls)),
]
