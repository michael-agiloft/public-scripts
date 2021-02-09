// ==UserScript==
// @name         EW Support Alterations
// @namespace    https://support.agiloft.com/
// @version      0.3
// @description  Make Alterations to the Assignee dropdown
// @author       Michael Walker
// @match        https://support.agiloft.com/ui/*
// @grant        none
// ==/UserScript==

(function() {
    var $ = top.window.jQuery;

    if ((top.frames && top.frames.length > 0 && top.frames.frameset && top.frames.frameset.frames && top.frames.frameset.frames.main_content) || $('#mainwrapper').hasClass('SIMainContentBG')) {
        var frame;
        if (top.frames && top.frames.length > 0 && top.frames.frameset && top.frames.frameset.frames && top.frames.frameset.frames.main_content) {
            frame = top.frames.frameset.frames.main_content.document;
        } else {
            frame = $('#mainwrapper');
        }


        var header = $('.headerSubtype', frame);
        if (header.length) {
            header = header.html();

            if (header == 'Task' || header == 'Ticket') {
                var row;
                var statusRow;

                if (header == 'Task') {
                    row = $('#lfassignee', frame);
                } else if (header == 'Ticket') {
                    row = $('#lf_1905_full_name', frame);
                }
                statusRow = $('#lfwfstate', frame);

                if (statusRow.length) {
                    statusRow.on('change', function () {
                        if ($('.customSelector', statusRow).length == 0 && statusRow.find('select').length) {
                            var states = '';
                            statusRow.find('select option').each(function () {
                                states += '<button type="button" data-value="' + $(this).val() + '">' + $(this).html() + '</button>';
                            });

                            statusRow
                                .find('select')
                                .parent()
                                .after('<td class="customSelector" style="position: absolute;">'
                                       + '<img id="custom_state_icon" src="/ui/images/prj_13/gif/customicons/master_light_orange_red_16_127.png" width="16" height="16" style="border:none;">'
                                       + '<div id="custom_state_selector" style="display: none; z-index:1000; position: relative; top: 0; right: 0;min-height: 20px; padding: 10px; background-color: #f5f5f5; border: 1px solid #e3e3e3; border-radius: 4px; -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05); box-shadow: inset 0 1px 1px rgba(0,0,0,.05);">'
                                       + '<div style="margin: 0; padding: 0;">'
                                       + states
                                       + '</div></div></td>');

                            statusRow.find('.customSelector button').each(function () {
                                $(this).css('display', 'block')
                                    .css('padding', '10px 15px')
                                    .css('width', '100%')
                                    .css('margin-bottom', '-1px')
                                    .css('margin-top', '-1px')
                                    .css('background-color', '#fff')
                                    .css('border', '1px solid #ddd');
                            });

                            statusRow.on('mouseover', '#custom_state_selector button', function () {
                                $(this).css('background-color', '#f5f5f5');
                            });
                            statusRow.on('mouseout', '#custom_state_selector button', function () {
                                $(this).css('background-color', '#fff');
                            });
                            statusRow.on('mouseover', function () {
                                $('#custom_state_selector', frame).css('display', '');
                            });
                            statusRow.on('mouseout', function () {
                                $('#custom_state_selector', frame).css('display', 'none');
                            });

                            statusRow.on('click', '#custom_state_selector button', function () {
                                $('select', statusRow).val($(this).data('value')).trigger('onchange');
                            });
                        }
                    }).change();
                }

                if (row.length) {
                    row.on('change', function () {
                        if ($('.customSelector', row).length == 0 && row.find('select').length) {
                            var buttons = '';
                            if (header == 'Task') {
                                buttons = '<button type="button" data-value="441:1">IT Team</button>'
                                    + '<button type="button" data-value="5005:0">David</button>'
                                    + '<button type="button" data-value="5327:0">Jack</button>'
                                    + '<button type="button" data-value="9932:0">Michael</button>'
                                    + '<button type="button" data-value="14361:0">Nathan</button>'
                                    + '<button type="button" data-value="5801:0">Stephen</button>'
                                    + '<button type="button" data-value="389:1">Support Team</button>';
                            } else if (header == 'Ticket') {
                                buttons = '<button type="button" data-value="441:0">IT Team</button>'
                                    + '<button type="button" data-value="5005:1">David</button>'
                                    + '<button type="button" data-value="5327:1">Jack</button>'
                                    + '<button type="button" data-value="9932:1">Michael</button>'
                                    + '<button type="button" data-value="14361:1">Nathan</button>'
                                    + '<button type="button" data-value="5801:1">Stephen</button>'
                                    + '<button type="button" data-value="389:0">Support Team</button>';
                            }

                            row
                                .find('select')
                                .parent()
                                .after('<td class="customSelector" style="position: absolute;">'
                                       + '<img id="custom_team_icon" src="/ui/images/prj_13/gif/customicons/master_light_orange_red_16_127.png" width="16" height="16" style="border:none;">'
                                       + '<div id="custom_team_selector" style="display: none; z-index: 1000; position: relative; top: 0; right: 0;min-height: 20px; padding: 10px; background-color: #f5f5f5; border: 1px solid #e3e3e3; border-radius: 4px; -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05); box-shadow: inset 0 1px 1px rgba(0,0,0,.05);">'
                                       + '<div style="margin: 0; padding: 0;">'
                                       + buttons
                                       + '</div></div></td>');

                            row.find('.customSelector button').each(function () {
                                $(this).css('display', 'block')
                                    .css('padding', '10px 15px')
                                    .css('width', '100%')
                                    .css('margin-bottom', '-1px')
                                    .css('margin-top', '-1px')
                                    .css('background-color', '#fff')
                                    .css('border', '1px solid #ddd');
                            });

                            row.on('mouseover', '#custom_team_selector button', function () {
                                $(this).css('background-color', '#f5f5f5');
                            });
                            row.on('mouseout', '#custom_team_selector button', function () {
                                $(this).css('background-color', '#fff');
                            });
                            row.on('mouseover', function () {
                                $('#custom_team_selector', frame).css('display', '');
                            });
                            row.on('mouseout', function () {
                                $('#custom_team_selector', frame).css('display', 'none');
                            });

                            row.on('click', '#custom_team_selector button', function () {
                                $('select', row).val($(this).data('value')).trigger('onchange');
                            });
                        }
                    }).change();
                }
            }
        }
    }
   })();
