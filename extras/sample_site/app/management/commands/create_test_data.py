from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from app.models import Author

class Command(BaseCommand):
    """Creates test Author and Book data

    """ 
    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        self.help = self.__doc__

    def handle(self, *args, **options):
        Author.objects.create(name='Bob Bobbly', description='bob stuff',
            rating="A")
        Author.objects.create(name='Fred Freddy', description='fred stuff',
            rating="B")
