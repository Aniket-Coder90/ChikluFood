from django.http.response import HttpResponse
from rest_framework.serializers import Serializer
from .serializer import MenuSerializer, OrderSerializer
from .models import Menu, Restaurant, Order
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class MenuList(APIView):

    model = Menu
    serializer_class = MenuSerializer

    def get(self, request, format = None, *args, **kwargs):

        name = kwargs['faltu']

        queryset = Restaurant.objects.filter(name=name)

        if not queryset.exists():

            return Response({"ERROR" : "ERRORINTHASERVER"},status=status.HTTP_400_BAD_REQUEST)

        rest = queryset[0]


        queryset = Menu.objects.filter(restaurant=rest)
        # print(queryset)
        category_data = dict()

        for entry in queryset:

            category_entry = category_data.get(entry.category)
            # print(category_entry)
            category_data[entry.category] = category_entry + [entry] if category_entry else [entry]
            # print(category_data, entry.category)

        # print(category_data)


        data=dict()

        # print(category_data)

        for menu in category_data.values():
            category = menu[0].category
            for item in menu:

                 data_category = data.get(category)
                 data[category] = data_category + [self.serializer_class(item).data] if data_category else [self.serializer_class(item).data]

                # try:
                #     data[category].append(self.serializer_class(item).data)
                # except KeyError:
                #     data[category] = [self.serializer_class(item).data]
            # print(data)
        return Response(data=data, status=status.HTTP_200_OK)

class OrderList(APIView):

    model = Order
    serializer_class = OrderSerializer

    def post(self, request, format= None):

        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():

            return Response({"Error":"Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

        order_id = serializer.data.get("order_id")
        rest_name = serializer.data.get("rest_name")
        rest_table_id = serializer.data.get("rest_table_id")
        order_item = serializer.data.get("order_item")
        order_total = serializer.data.get("order_total")
        order_date_time = serializer.data.get("order_date_time")
        payment_options = serializer.data.get("payment_options")

        new_order = Order(order_id=order_id, rest_name=rest_name, rest_table_id=rest_table_id, order_item=order_item, order_total=order_total, order_date_time=order_date_time, payment_options=payment_options)

        new_order.save()

        return Response({"Success":"Order Recieved"}, status=status.HTTP_200_OK)