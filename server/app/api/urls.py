from django.urls import path
from .views import get_phonebooks, create_phonebooks, phonebook_detail

urlpatterns = [
    path('phonebooks/', get_phonebooks, name='get_phonebooks'),
    path('phonebooks/create', create_phonebooks, name='create_phonebooks'),
    path('phonebooks/<int:pk>', phonebook_detail, name='phonebook_detail')
]