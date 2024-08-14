from django.db import models

class PhoneBook(models.Model):
    phoneName = models.CharField(max_length=144)
    phoneNumber = models.CharField(max_length=20)

    def __str__(self):
        return self.phoneName
