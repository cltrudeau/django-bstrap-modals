function bsmodals_error(msg, style="btn-primary") {
    // displays the error modal box with the given message
    var modal = $('#bsmodals-error');
    modal.find('#bsmodals-error-body').text(msg);
    modal.find('#bsmodals-error-close').attr('class', 'btn ' + style);
    modal.modal();
}


function bsmodals_alert(title, msg, style="btn-primary") {
    // displays the alert modal box with the given title and message
    var modal = $('#bsmodals-alert');
    modal.find('#bsmodals-alert-title').text(title);
    modal.find('#bsmodals-alert-body').text(msg);
    modal.find('#bsmodals-alert-close').attr('class', 'btn ' + style);

    modal.modal();
}


function bsmodals_confirm(dialog_id, title, msg, callback, yes_text="Yes",
        yes_style="btn-primary", no_text="No", no_style="btn-secondary") {
    // displays the confirm modal box with the given title and message
    var modal = $('#' + dialog_id);
    modal.find('#' + dialog_id + '-title').text(title);
    modal.find('#' + dialog_id + '-body').text(msg);
    modal.find('#' + dialog_id + '-yes').attr('class', 'btn ' + yes_style);
    modal.find('#' + dialog_id + '-yes').text(yes_text);
    modal.find('#' + dialog_id + '-no').attr('class', 'btn ' + no_style);
    modal.find('#' + dialog_id + '-no').text(no_text);

    // register call backs on Yes/No buttons
    var button = modal.find('#' + dialog_id + '-yes')
    button.click(function() {
        callback(true);
        modal.modal('hide');
    });
    button = modal.find('#' + dialog_id + '-no')
    button.click(function() {
        callback(false);
        modal.modal('hide');
    });

    // show dialog
    modal.modal();
}


function bsmodals_dialog(dialog_id, text, values) {
    var modal = $('#' + dialog_id);

    $.each(text, function(key, value) {
        modal.find('#' + key).text(value);
    });

    $.each(text, function(key, value) {
        modal.find('#' + key).val(value);
    });

    modal.modal();
}


function _bsmodals_form_values(modal) {
    var data = {}
    var name, type;
    modal.find('input').not(':button, :submit, :reset').each(function() {
        name = $(this).attr('name');
        type = $(this).attr('type');

        if( type == 'radio' && $(this).prop('checked') ) {
            data[name] = $(this).val();
        }
        else if( type == 'checkbox' ) {
            data[name] = $(this).prop('checked');
        }
        else {
            data[name] = $(this).val();
        }
    });

    modal.find('select').each(function() {
        name = $(this).attr('name');
        data[name] = $(this).val();
    });

    modal.find('textarea').each(function() {
        name = $(this).attr('name');
        data[name] = $(this).val();
    });

    return data;
}


function bsmodals_form(dialog_id, post_url, callback=undefined, text={}, 
        values={}, clear_on_success=true) {
    var modal = $('#' + dialog_id);

    $.each(text, function(key, value) {
        modal.find('#' + key).text(value);
    });

    $.each(values, function(key, value) {
        modal.find('#' + key).val(value);
    });

    $('#' + dialog_id + '-submit').on('click', (function(e) {
        e.preventDefault();
        var data  = _bsmodals_form_values(modal);

        $.post(post_url, data, function(response) {
            modal.find('.is-invalid').each(function() {
                $(this).removeClass('is-invalid');
            });

            if( response['success'] ) {
                modal.modal('hide');

                if( clear_on_success ) {
                    modal.find('form')[0].reset();
                }

            }
            else {
                var item;
                $.each(response['errors'], function(key, value) {
                    item = modal.find('[name="' + key + '"]').each(function(){
                        // have to do this multiple times because of radio
                        // buttons
                        $(this).addClass('is-invalid');
                        $(this).siblings('.invalid-feedback').text(value);
                    });
                });
            }

            if( callback != undefined ) {
                callback(response);
            }
        }, 'json')
        .fail(function() { 
            console.log("JSON call posting form data failed");
        });
    }));



    modal.modal();
}
