class RestModal {
    constructor(dialog_id) {
        this.dialog_id = dialog_id;

        this.mode = undefined;
        this.url = undefined;
        this.callback = undefined;
        this.modal = $('#' + dialog_id);

        var _this = this;

        $('#' + dialog_id + '-submit').on('click', function(e) {
            e.preventDefault();
            var data = _this._retrieve();

            // reset the error states on the form
            _this.modal.find('.is-invalid').each(function() {
                $(this).removeClass('is-invalid');
            });

            var ajax_type = 'POST';
            if(_this.mode == 'update') {
                ajax_type = 'PUT';
            }

            $.ajax({
                url:_this.url,
                type:ajax_type,
                data:data,
                dataType:"json",
                success: function(response) {
                    _this.modal.modal('hide');
                    _this.callback(response);

                    _this.modal.find('form')[0].reset();
                },
                error: function(response) {
                    _this._set_errors(response.responseJSON);
                },
            });
        });
    }

    _set_errors(errors) {
        var _this = this;
        $.each(errors, function(key, value) {
            _this.modal.find('[name="' + key + '"]').each(function(){
                // have to do this multiple times because of
                // radio buttons
                $(this).addClass('is-invalid');
                $(this).siblings('.invalid-feedback').text(value[0]);
            });
        });
    }

    _populate(data) {
        var _this = this;
        $.each(data, function(key, value) {
            _this.modal.find('[name="' + key + '"]').each(function(){
                if($(this).is('input') || $(this).is('select')) {
                    $(this).val(value);
                }
                else if($(this).is('textarea')) {
                    $(this).text(value);
                }
            });
        });
    }

    _retrieve() {
        var _this = this;
        var data = {}
        var name, type;
        _this.modal.find('input').not(':button, :submit, :reset')
                .each(function() {
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

        _this.modal.find('select').each(function() {
            name = $(this).attr('name');
            data[name] = $(this).val();
        });

        _this.modal.find('textarea').each(function() {
            name = $(this).attr('name');
            data[name] = $(this).val();
        });

        return data;
    }

    _do_modal(url, data, callback) {
        this.url = url;
        this.callback = callback;
        this._populate(data);
        this.modal.modal();
    }

    show_create(url, data, callback=undefined) {
        this.mode = 'create';
        this._do_modal(url, data, callback);
    }

    show_update(url, data, callback=undefined) {
        this.mode = 'update';
        this._do_modal(url, data, callback);
    }
}
