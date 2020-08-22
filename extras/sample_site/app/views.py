from django import forms
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets

from app.models import Author, AuthorSerializer

from bsmodals import handle_form

# Create your views here.
def test(request):
    return render(request, 'test.html', {})


class SampleForm(forms.Form):
    name = forms.CharField(required=True)
    number = forms.CharField(required=True)
    message = forms.CharField(required=True)
    check1 = forms.BooleanField(required=True)
    check2 = forms.BooleanField()
    radio1 = forms.ChoiceField(choices=((1, 1), (2, 2)), required=True)
    radio2 = forms.ChoiceField(choices=(('A', 'A'), ('B', 'B')), required=True)


@csrf_exempt
def ajax_form(request):
    form = SampleForm(request.POST)

    ### Uncomment to force all fields to fail
    #data = {
    #    'errors':{
    #        'name':'What is in a name?',
    #        'number':'Bad choice',
    #        'message':'This is also a message',
    #        'check1':'Checked or not, it is an error',
    #        'check2':'Why would you assume this one is different?',
    #        'radio1':'Video killed...',
    #        'radio2':'the radio star',
    #    }
    #}
    
    ### Uncomment to use real form handler
    result, data = handle_form(form)
    print('Handled form:', result, data)

    return JsonResponse(data)


class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()

    def create(self, request):
        #import pudb; pudb.set_trace()
        print('*** data', request.data);

        try:
            response = super().create(request)
            print('   response', response)
        except Exception as e:
            print('!!!', e)
            raise
        return response
