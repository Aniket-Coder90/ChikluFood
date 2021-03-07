from .models import Menu, QRTable, Restaurant, Order
from rest_framework import serializers

class RestaurantSerializer(serializers.ModelSerializer):

    class Meta:

        model = Restaurant
        fields = ('name','key')

class QRTableSerializer(serializers.ModelSerializer):

    class Meta:

        model = QRTable
        fields = ('link', 'table_id', 'restaurant')

class MenuSerializer(serializers.ModelSerializer):

    class Meta:

        model = Menu
        fields = ('id','item_price', 'restaurant', 'category', 'item', 'item_desc', 'item_image')

class OrderSerializer(serializers.ModelSerializer):

    class Meta:

        model = Order
        fields = ('order_id', 'rest_name', 'rest_table_id', 'order_item', 'order_total', 'order_date_time', 'payment_options')
