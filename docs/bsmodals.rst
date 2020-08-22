*************************
Django Bootstrap Modals 4
*************************

This library wraps some Bootstrap 4 Modal dialog boxes as templates and
provides some simple Javascript to help render them.

Setup
=====

Javascript helper functions are provided, to use them you will need to source
them into your HTML page.

.. code-block:: html

    <script src="/static/bsmodals/bsmodals/js"></script>

Four different dialog boxes are provided, one of which needs to be extended to
use, the others are self contained. 

Dialogs
=======

Alert Dialog
------------

The alert dialog provides a simple pop-up with a button to clear it. It is
used by including the ``alert`` template:

.. code-block:: django

    {% include "bsmodals/alert.html" %}

You should only include this once. Use the the Javascript helper function to
show the dialog with different content.

.. js:function:: bsmodals_alert(title, msg, [style])

    :param string title: Dialog box title
    :param string msg: Message contained in the dialog box
    :param string style: Optional style parameter for the button, if not
        given, defaults to "btn-primary"

Example:

.. code-block:: javascript

    bsmodals_alert('Warning!', 'Will Robinson, you are in Danger!');


Error Dialog
------------

The error dialog provides a simple pop-up with a button to clear it. It is
used by including the ``error`` template:

.. code-block:: django

    {% include "bsmodals/error.html" %}

You should only include this once. Use the the Javascript helper function to
show the dialog with different content.

.. js:function:: bsmodals_error(msg, [style])

    :param string msg: Message contained in the dialog box
    :param string style: Optional style parameter for the button, if not
        given, defaults to "btn-primary"

Example:

.. code-block:: javascript

    bsmodals_error('The sky is falling!', "btn-warning");


Confirm Dialog
--------------

The confirm dialog provides a pop-up with a "Yes" and "No" button. A copy of
this should be included for each dialog you wish to create. Each dialog must
have a unique id number, included using the ``with`` parameter in the
``include`` tag:

.. code-block:: django

    {% include "bsmodals/confirm.html" with dialog_id="my_confirm"%}

You can use the Javascript helper function to show the dialog

.. js:function:: bsmodals_confirm(dialog_id, title, msg, callback, [yes_text="Yes", yes_style="btn-primary", no_text="No", no_style="btn-secondary"])

    :param string dialog_id: Unique ID to give the dialog
    :param string title: Title for the dialog
    :param string msg: Message contained in the dialog box
    :param callback: Callback function that takes a boolean, receives
        "true" if the user pressed "Yes" and "false" if they pressed "No"
    :param string yes_text: Optional text to use instead of "Yes" on the yes button
    :param string yes_style: Optional style for the yes button, defaults to
        "btn-primary"
    :param string no_text: Optional text to use instead of "No" on the no button
    :param string no_style: Optional style for the no button, defaults to
        "btn-primary"

Example:

.. code-block:: javascript

    bsmodals_confirm('my_conf', 'Delete World', 
        'Are you sure you want to delete the world', function(result) {
            if(result) {
                console.debug('User is despondent');
            }
            else {
                console.debug('Thankfully they said No');
            }
        });

Note that due to the optional paramters coming `after` the callback, this
results in the unusual formatting of your code:

.. code-block:: javascript

    bsmodals_confirm('other_conf', 'Chicken Type', 
        'What kind of chicken do you want?', function(result) {
            if(result) {
                console.debug('They said Regular');
            }
            else {
                console.debug('They said Extra-Crispy');
            }
        }, yes_text='Regular', yes_style='btn-dark', no_text='Extra Crispy',
        no_style='btn-danger');


Custom Dialogs
--------------

In addition to the the built-in dialogs, this library provides a way of
quickly creating your own. This is done by creating your own template and
extending the ``generic`` one provided.

.. code-block:: django

    {% extends "bsmodals/generic.html" %}

    {% block title %}
        <h5 id="mydialog-title">Dialog Title</h5>
    {% endblock title %}

    {% block body %}
        <form>
            <div class="form-group">
                <label for="name" class="col-form-label">Name</label>
                <input type="text" class="form-control" id="name">
            </div>
        </form>
    {% endblock body %}
    
    {% block footer %}
        <button id="mydialog-action" type="button" data-dismiss="modal" 
            class="btn btn-primary">Close</button>
    {% endblock footer %}

Inside of your HTML, include your newly written dialog using the ``with``
parameter of the ``include`` tag to set the dialog's id.

.. code-block:: django

    {% include "mydialog" with dialog_id="mydialog" %}

Once your template is in place you can use the Javascript helper function to
quickly fill in parts of the dialog.

.. js:function:: bsmodals_dialog(dialog_id, text, values)

    :param string dialog_id: 
        The id to use for your custom dialog, the helper function will search
        for this id to populate items in the dialog

    :param object text:
        Optional dictionary mapping a CSS selector to text content.  Each
        element within the dialog that matches the selector in a key has
        ``.text(value)`` called on it. This allows you to quickly populate
        paragraphs, textareas or any other HTML with children

    :param object values:
        Optional dictionary mapping a CSS selector to content.  Each element
        within the dialog that matches the selector in a key has
        ``.val(value)`` called on it. This allows you to quickly populate
        input tags inside of the dialog box.

Don't forget to set any event handlers on buttons you may put in the footer.

Example:

.. code-block:: javascript

    bsmodals_dialog('mydialog', {'#mydialog-title':'Replacement Title'},
        {'[name="name"]':'Joe Smith'});

    $('#mydialog-action').click(function() {
        console.debug('Somebody used MyDialog!');
    });


Custom Forms
------------

Similar to the custom dialog mechanism is a custom form one. Forms are
automatically submitted to a URL via an AJAX post. Form elements should use
a ``name`` attribute that matches the expectation of the form field name in
the Django view. If your form includes ``invalid-feedback`` divs, the method
will automatically set their content on any errors in the form.

Sample view:

.. code-block:: python

    from django import forms
    from django.http import JsonResponse
    from bsmodals import handle_form


    class SampleForm:
        name = forms.CharField(required=True)
        age = forms.IntegerField(required=True)


    def ajax_form_view(request):
        form = SampleForm(request.POST)
        result, data = handle_form(form)

        if not result:
            print('Form contained errors! Returning them to the dialog')
            print('  => errors were:', data['errors'])

        return JsonResponse(data)


Corresponding form:

.. code-block:: django

    {% extends 'bsmodals/form.html' %}

    {% block body %}
        <form>
            <div class="form-group">
                <label for="name" class="col-form-label">Name</label>
                <input type="text" class="form-control" name="name">
                <div class="invalid-feedback"></div>
            </div>
            <div class="form-group">
                <label for="age" class="col-form-label">Age</label>
                <input type="text" class="form-control" name="age">
                <div class="invalid-feedback"></div>
            </div>
        </form>
    {% endblock body %}


And the javascript:

.. code-block:: javascript

    bsmodals_form('myform', '/ajax_form_view/', function(response) {
        if( response['success'] ) {
            console.log('Post succeeded. Dialog will now close');
        }
        else {
            // Post failed. The form fields now have "is-invalid" set and any
            // "invalid-feedback" <divs> now have the Django form errors 
            // within them
            console.log('Post had errors');
        }
    });

Once all the code and your template is set up, use the Javascript function to
launch the dialog.

.. js:function:: bsmodals_form(dialog_id, post_url, [callback=undefined, text={}, values={}, clear_on_success=true])

    :param string dialog_id: 
        The id to use for your custom dialog, the helper function will search
        for this id to populate items in the dialog
    :param string post_url:
        URL that the ajax POST is made to for form submission. Expects a JSON
        response, use the ``handle_form()`` helper method to generate it.
    :param function callback:
        Optional function to be called when the server responds to the post.
        Callback takes a parameter containing the JSON response.
    :param object text:
        Optional dictionary mapping a CSS selector to text content.  Each
        element within the dialog that matches the selector in a key has
        ``.text(value)`` called on it. This allows you to quickly populate
        paragraphs, textareas or any other HTML with children

    :param object values:
        Optional dictionary mapping a CSS selector to content.  Each element
        within the dialog that matches the selector in a key has
        ``.val(value)`` called on it. This allows you to quickly populate
        input tags inside of the dialog box.

    :param bool clear_on_success:
        Optional value that when false stops the values in the form being
        cleared after a successful submission. Defaults to true.


The Python ``handle_form()`` helper function can be used to validate the form
and properly construct the JSON needed to be passed back to the form dialog.

.. py:function:: bsmodals.handle_form(form)

    :param form: 
        Form to be processed. Form field names should correspond to the
        ``name`` attributes of the fields in the HTML form.

    :returns:
        Tuple containing a boolean result and a dictionary to pass back via a
        JsonResponse object


Rest Forms
----------

In addition to the form function calls, you can also use the ``RestModal``
object from inside ``/static/bsmodals/restapi.js``. The object uses the same
base ``form.html`` template, but instead of working with a Django view, it is
based on REST API calls. 

.. py:function:: RestModal(dialog_id)

    :param string dialog_id: 
        The id to use for your custom dialog, the class will search
        for this id to populate items in the dialog


.. py:function:: RestModal.show_create(url, data, callback)

    Displays the dialog corresponding to the class and on submission calls the
    REST API POST method on the given URL to create the object. Similar to
    ``bsmodal_form``, errors are displayed using the ``is-invalid`` class
    attribute and corresponding ``invalid-feedback`` classes if present.

    :param url: URL of the REST POST call used to create objects represented
                by the form
    :param data: object whose key/value pairs are used to populate the form.
                 Like ``bsmodal_form``, the keys are used to find matching
                 tags with "name" attributes in the form. The method
                 automatically determines what kind of tag it is in the form
                 to populate it properly.
    :param callback: optional method to call after the POST has succeeded


.. py:function:: RestModal.show_update(url, data, callback)

    Displays the dialog corresponding to the class and on submission calls the
    REST API PUT method on the given URL to update the object in question.
    Note that this URL must be for a single specific object. 

    :param url: URL for the REST API PUT call
    :param data: data used to populate the form, using "name" attributes
                 corresponding to the keys in the object
    :param callback: optional method to call on success


Extra Parameters
================

Additional parameters can be set to change dialog behaviour. These parameters
are set using the ``with`` parameter of the ``include`` tag.

not_centered
    By default all dialogs have the ``modal-dialog-centered`` Bootstrap class 
    attribute which drops the dialog in the centre of the screen. Setting this
    value to ``False`` will remove the class attribute and the dialog will
    appear at the top.

no_click_off
    If true, turns off the closing of a dialog when clicking outside of it.
    Bootstrap calls this "static backdrop".

modal_size (Generic and Form dialogs only)
    Alternate bootstrap dialog size specifier. Use things like ``modal-lg``
    or ``modal-xl`` to add sizing info to the dialog.

title (Generic and Form dialogs only)
    Specify the title for the dialogs.

hide_cancel (Generic dialogs only)
    Setting ``hide_cancel`` to ``True`` will prevent the ``X`` appearing in
    the top corner of the dialog box that closes the dialog.


Styling Dialogs
===============

Alert dialogs are ``id="bsmodals-alert"`` and error dialogs 
``id="bsmodals-error"``.

Confirm dialogs have the id passed in when created. The children of the modal
dialog have have the dialog id as a prefix on their ids. The title is
``"{{dialog_id}}-title"`` and the body paragraph is ``"{{dialog_id}}-body"``.
The "yes" and "no" buttons are ``"{{dialog_id}}-yes"`` and
``"{{dialog_id}}-no"``, respetively.

The form and generic dialogs have ``id="{{dialog_id}}-title"`` on the ``<h5>``
used as a title.

Examples
========

An example web-site is available with the source code:

Source: https://github.com/cltrudeau/django-bstrap-modals/tree/master/extras/sample_site

