from django.db import models
from django.db.models.enums import Choices
from django.db.models.fields import CharField

# Create your models here.

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    key = models.CharField(max_length=10, unique=True)
    
    def __str__(self):
        return f'{self.name}'

class QRTable(models.Model):
    link = models.CharField(max_length=200)
    table_id = models.IntegerField()
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE)

    def __str__(self):
        return f'Hotel {self.restaurant} : Table Number {self.table_id}'

class Menu(models.Model):
    item_price = models.FloatField()
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE)
    category = models.CharField(max_length=200)
    item = models.CharField(max_length=200)
    item_desc = models.TextField()
    item_image = models.ImageField(upload_to='cafe/images')

    def __str__(self):
        return f'No. {self.id} / Restaurant {self.restaurant} / {self.item}'

class Order(models.Model):
    order_id = models.AutoField
    rest_name = models.CharField(max_length=200)
    rest_table_id = models.IntegerField()
    order_item = CharField(max_length=999999999)
    order_total = models.FloatField()
    order_date_time = models.DateTimeField(auto_now_add=True)
    payment_options = models.CharField(max_length=20, default="------", choices=(("-----", "Select here"), ("online", "online"), ("offline", "offline")))

    def __str__(self):
        return f'{self.rest_table_id}'