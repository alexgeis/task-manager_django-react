from django.contrib import admin

# Register your models here.
from .models import Task

# create a class for the admin-model integration


class TaskAdmin(admin.ModelAdmin):

    # add the fields of the model here
    list_display = ("title", "description", "completed")


# register the model class and the Admin model class
# using the register() method of admin.site class
admin.site.register(Task, TaskAdmin)
