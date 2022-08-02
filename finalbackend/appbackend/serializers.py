from rest_framework import serializers
from .models import Category, Dish, Orders


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'imageUrl')


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ('id', 'name', 'price', 'description', 'imageUrl',
                  'isGlutenFree', 'isVegeterian', 'category')


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ('id', 'dishes', 'time', 'first_name',
                  'last_name', 'address', 'phone')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['dishes'] = DishSerializer(instance.dishes, many=True).data
        return data
