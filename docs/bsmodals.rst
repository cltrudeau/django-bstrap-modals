Django Bootstrap Modals 4
=========================

This library wraps some Bootstrap 4 Modal dialog boxes as templates and
provides some simple Javascript to help render them.

Setup
-----

Javascript helper functions are provided, to use them you will need to source
them into your HTML page.

.. code-block:: html

    <script src="static/bsmodals/bsmodals/js"></script>

Four different dialog boxes are provided, one of which needs to be extended to
use, the others are self contained. 

Alert Dialog
------------

The alert dialog provides a simple pop-up with a button to clear it. It is
used by including the ``alert`` template:

.. code-block:: django

    {% include "bsmodals/alert.html" %}

You can use the Javascript helper function to show the dialog

.. js:function:: bsmodals_alert(title, msg)

    :param string title: Dialog box title
    :param string msg: Message contained in the dialog box

Example:

.. code-block:: javascript

    bsmodals_alert('Warning!', 'Will Robinson, you are in Danger!');


Error Dialog
------------

The error dialog provides a simple pop-up with a button to clear it. It is
used by including the ``error`` template:

.. code-block:: django

    {% include "bsmodals/error.html" %}

You can use the Javascript helper function to show the dialog

.. js:function:: bsmodals_error(msg)

    :param string msg: Message contained in the dialog box

Example:

.. code-block:: javascript

    bsmodals_error('The sky is falling!');


Confirm Dialog
--------------

The confirm dialog provides a pop-up with a "Yes" and "No" button. Use it by
including the ``confirm`` template:

.. code-block:: django

    {% include "bsmodals/confirm.html" %}

You can use the Javascript helper function to show the dialog

.. js:function:: bsmodals_confirm(title, msg, callback)

    :param string title: Title for the dialog
    :param string msg: Message contained in the dialog box
    :param callback: Callback function that takes a boolean, receives
        "true" if the user pressed "Yes" and "false" if they pressed "No"

Example:

.. code-block:: javascript

    bsmodals_confirm('Delete World', 
        'Are you sure you want to delete the world', function(result) {
            if(result) {
                console.debug('User is despondent');
            }
            else {
                console.debug('Thankfully they said No');
            }
        });


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
        <button id="mydialog-action" type="button" class="btn btn-primary" 
            >Close</button>
    {% endblock footer %}

Inside of your HTML, include your newly written dialog using the ``with``
parameter of the ``include`` tag to set the dialog's id.

.. code-block:: django

    {% include "mydialog" with bsmodals_dialog_id="mydialog" %}

Once your template is in place you can use the Javascript helper function to
quickly fill in parts of the dialog.

.. js:function:: bsmodals_dialog(dialog_id, text_items, value_items)

    :param string dialog_id: 
        The id to use for your custom dialog, the helper function will search
        for this id to populate items in the dialog
    :param array text_items:
        An array of arrays that specifies which ids to search for and call
        ``.text()`` on. This allows you to quickly populate paragraphs, 
        textareas or any other HTML with children
    :param array value_items:
        An array of arrays that specifies which ids to search for and call 
        ``.val()`` on. This allows you to quickly populate input tags inside
        of the dialog box.

Don't forget to set any event handlers on buttons you may put in the footer.

Example:

.. code-block:: javascript

    bsmodals_dialog('mydialog',
        [ ['#mydialog-title', 'Replacement Title'] ],
        [ ['#name', 'Joe Smith' ]);

    $('#mydialog-action').click(function() {
        console.debug('Somebody used MyDialog!');
    });


Extra Parameters
----------------

Additional parameters can be set to change dialog behaviour. These parameters
are set using the ``with`` parameter of the ``include`` tag.

not_centered
    By default all dialogs have the ``modal-dialog-centered`` Bootstrap class 
    attribute which drops the dialog in the centre of the screen. Setting this
    value to ``False`` will remove the class attribute and the dialog will
    appear at the top.

hide_cancel (Generic dialogs only)
    Setting ``hide_cancel`` to ``True`` will prevent the ``X`` appearing in
    the top corner of the dialog box that closes the dialog.


Examples
--------

An example web-site is available with the source code:

Source: https://github.com/cltrudeau/django-bstrap-modals/tree/master/extras/sample_site

