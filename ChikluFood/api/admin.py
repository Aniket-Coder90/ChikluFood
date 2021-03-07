from .models import Menu, QRTable, Restaurant, Order
from django.contrib import admin

# Register your models here.

admin.site.register(Restaurant)
admin.site.register(QRTable)
admin.site.register(Menu)
admin.site.register(Order)