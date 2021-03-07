from django.urls import path
from .views import MenuList,OrderList
from ChikluFood import settings
from django.conf.urls.static import static

urlpatterns = [
    path('menu/<str:faltu>/',MenuList.as_view(), name='menu'),
    path('checkout/',OrderList.as_view(), name='order'),
]