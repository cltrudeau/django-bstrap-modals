__version__ = '1.0.0'

def handle_form(form):
    data = {}

    if form.is_valid():
        data = {
            'success':True,
        }
    else:
        data = {
            'success':False,
            'errors':form.errors,
        }

    return (data['success'], data)
