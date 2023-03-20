from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets

# import the TaskSerializer from the serializer file
from .serializers import TaskSerializer

# import the Task model from the models file
from .models import Task

# create a class for the Task model viewsets
class TaskView(viewsets.ModelViewSet):

	# create a serializer class and
	# assign it to the TaskSerializer class
	serializer_class = TaskSerializer

	# define a variable and populate it
	# with the Task list objects
	queryset = Task.objects.all()
