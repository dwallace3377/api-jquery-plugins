/*jslint sloppy: true */
/*global config: false, describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false, jQuery: false */

var config = {
    apiId: '1vd9o4427lyi0ccb2uem',
    version: 1
};

describe('Drug search input field', function () {
    beforeEach(function () {
        $('body').append('<input type="text" id="drug-search">');
        $('#drug-search').drugSearch({
            apiId: config.apiId,
            apiSecret: config.apiSecret,
            version: 1
        });
    });

    afterEach(function () {
        var element = $('#drug-search');
        element.drugSearch('destroy');
        element.remove();
    });

    it('suggests drugs based on user input', function () {

        var input = 'nexium';

        runs(function () {
            var press;
            $('#drug-search').select2('open');
            press = jQuery.Event("keypress");
            press.ctrlKey = false;
            press.which = 40;
            $('.select2-input').trigger(press);
        });

        waitsFor(function () {
            return $('.select2-results li').length > 0;
        }, 'autocomplete to return results', 2000);

        runs(function () {
            $('.select2-results li:first').trigger('click');
            expect($('#drug-search').val()).not.toBe(input);
        });
    });
});
