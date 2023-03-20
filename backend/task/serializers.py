# import serializers from the REST framework
from rest_framework import serializers

# import the Task data model
from .models import Task

# create a serializer class
class TaskSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = Task
		fields = ('id', 'title','description','completed')
