function bsmodals_error(msg) {
    // displays the error modal box with the given message
    var modal = $('#bsmodals-error');
    modal.find('#bsmodals-error-body').text(msg);
    modal.modal();
}


function bsmodals_alert(title, msg) {
    // displays the alert modal box with the given title and message
    var modal = $('#bsmodals-alert');
    modal.find('#bsmodals-alert-title').text(title);
    modal.find('#bsmodals-alert-body').text(msg);

    modal.modal();
}


function bsmodals_confirm(title, msg, callback) {
    // displays the confirm modal box with the given title and message
    var modal = $('#bsmodals-confirm');
    modal.find('#bsmodals-confirm-title').text(title);
    modal.find('#bsmodals-confirm-body').text(msg);

    // register call backs on Yes/No buttons
    var button = modal.find('#bsmodals-confirm-yes')
    button.click(function() {
        callback(true);
        modal.modal('hide');
    });
    button = modal.find('#bsmodals-confirm-no')
    button.click(function() {
        callback(false);
        modal.modal('hide');
    });

    // show dialog
    modal.modal();
}


function bsmodals_dialog(modal_id, text, values) {
    var modal = $('#' + modal_id);

    text.forEach(function(element) {
        modal.find(element[0]).text(element[1]);
    });

    values.forEach(function(element) {
        modal.find(element[0]).val(element[1]);
    });

    modal.modal();
}
