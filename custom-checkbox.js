/**
 * Created by Alex Beauchemin
 * Date: 30/05/13
 */

//TODO: Change div for <a> and allow tabbing

;(function ($) {
    $.extend({
        CustomCheckbox: function (el, options) {
            var settings = $.extend({
                exclude: null,
                imagePath: 'assets/images/btn-checkbox.png',
                fontAwesome: false,
                imageHeight: 24,
                imageWidth: 23,
                bgOffset: 0,
                type: 'checkbox' // checkbox or radio
            }, options || {});

            var elements = {};

            var initialize = function () {
                if (!el && settings.type=="checkbox")
                    el = $('input[type="checkbox"]');
                else if(!el && settings.type=="radio")
                    el = $('input[type="radio"]');
                else if (typeof el == "string") {
                    el = $(el);
                }

                $.each(el, function (index, el) {
                    var elCheckbox = $(el),
                        id = elCheckbox.attr('id'),
                        element,
                        excluded = false;

                    //Excludes
                    if (settings.exclude) {
                        $.each(settings.exclude, function (index, excludedEl) {
                            if (elCheckbox[0] == excludedEl[0]) {
                                excluded = true;
                                return;
                            }
                        });

                        if (excluded) {
                            return true;
                        }
                    }

                    elements[id] = {
                        id: id,
                        newField: null,
                        oldField: elCheckbox
                    };

                    element = elements[id];

                    element.oldField.css({'visibility': 'hidden', 'width': 0, 'height': 0, 'margin': 0});
                    var newField = createNewField(elCheckbox);
                    element.newField = $(newField).insertAfter(elCheckbox);

                    if (element.oldField.prop('checked')) {
                        check(element);
                    }

                    addEvents(element);
                });

            };

            var addEvents = function (element) {
                if (element.oldField.prop('disabled')) {
                    element.newField.addClass('disabled');
                    return;
                }

                element.newField.on('click', function () {
                    var el = $(this),
                        field = elements[el.data('link')];

                    if (!el.hasClass('disabled') && !el.hasClass('disabled-checked')) {
                        if (el.hasClass('active') && settings.type != 'radio')
                            uncheck(field);
                        else
                            check(field);
                    }

                    return false;
                });

                var label = element.newField.parent('label');
                if (label.length) {
                    label.on('click', function (event) {
                        event.preventDefault();
                        var el = $(this).find('.custom-checkbox'),
                            id = el.data('link');
                        if (!el.hasClass('disabled') && !el.hasClass('disabled-checked')) {
                            if (el.hasClass('active') && settings.type != 'radio')
                                uncheck(elements[id]);
                            else
                                check(elements[id]);
                        }
                    });
                }
            };

            var check = function (element) {
                if (settings.type == 'radio') {
                    $.each(elements, function (index, radio) {
                        if(element.oldField.attr('name') == radio.oldField.attr('name'))
                            uncheck(radio);
                    });
                }
                element.newField.addClass('active');
                element.oldField.prop({ checked: true }).trigger('change');

                var bgPositionLeft = settings.bgOffset * -1,
                    bgPositionTop;

                if(element.oldField.prop('disabled')){
                    bgPositionTop = settings.imageHeight * -3;
                } else {
                    bgPositionTop = settings.imageHeight * -1;
                }

                if(!settings.fontAwesome) {
                    element.newField.css('backgroundPosition', bgPositionLeft + 'px ' + bgPositionTop + 'px');
                }
                else {
                    if(settings.type == "radio") {
                        element.newField.children('i').removeClass('fa-circle-o').addClass('fa-dot-circle-o');
                    }
                    else {
                        element.newField.children('i').removeClass('fa-square-o').addClass('fa-check-square-o');
                    }
                }
            };

            var createNewField = function (oldField) {
                var id = oldField.attr('id'),
                    tabindex = oldField.attr('tabindex');

                if(tabindex !== null && typeof tabindex !== "undefined") {
                    tabindex = 'tabindex="' + tabindex + '" ';
                }
                else {
                  tabindex = '';
                }

                var disabledPosition = 0;
                if(oldField.prop('disabled')){
                    disabledPosition = settings.imageHeight * -2;

                    if(oldField.prop('checked')) {
                        disabledPosition = settings.imageHeight * -3;
                    }
                }

                var fieldHTML = [
                  '<div ',
                  'class="custom-checkbox" ',
                  'data-link="' + id + '" ',
                  tabindex,
                  'style="',
                  'width: ' + settings.imageWidth + 'px;',
                  'height: ' + settings.imageHeight + 'px;',
                  'background: url(' + settings.imagePath + ') ' + (settings.bgOffset * -1) + 'px ' + disabledPosition + 'px no-repeat;',
                  '"></div>'
                ];

                if(settings.fontAwesome) {

                    var faClass = "fa-square-o";
                    if(settings.type == "radio") {
                      faClass = "fa-circle-o";
                    }

                    fieldHTML = [
                      '<div class="custom-checkbox font-awesome" data-link="' + id + '" ' + tabindex + '>',
                      '<i class="fa ' + faClass + '"></i>',
                      '</div>'
                    ];
                }


                return fieldHTML.join('');
            };

            var uncheck = function (element) {
                element.newField.removeClass('active');
                element.oldField.prop({ checked: false }).trigger('change');
                if(!settings.fontAwesome) {
                    if(element.oldField.prop('disabled')) {
                        element.newField.css('backgroundPosition', (settings.bgOffset * -1) + 'px ' + (settings.imageHeight * -2) +  'px');
                    }
                    else {
                        element.newField.css('backgroundPosition', (settings.bgOffset * -1) + 'px 0');
                    }
                }
                else {
                    if(settings.type == "radio") {
                        element.newField.children('i').removeClass('fa-dot-circle-o').addClass('fa-circle-o');
                    }
                    else {
                        element.newField.children('i').removeClass('fa-check-square-o').addClass('fa-square-o');
                    }

                    if(element.oldField.prop('disabled')) {
                        element.newField.addClass('disabled');
                    }
                }
            };

            initialize();
            return this;
        }
    });
})(jQuery);