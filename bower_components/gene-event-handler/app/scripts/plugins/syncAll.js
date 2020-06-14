/**
 * 同步多欄位內容
 */
'use strict';

;(function(gee, $) {
    gee.hook('syncAll', function (me){
        var f = me.data('ta') ? $('#'+ me.data('ta')) : me.closest('form'),
            s = me.data('source') ? $('#'+ me.data('source')) : me.closest('form'),
            prefix = me.data('prefix');

        f.find('input[name|=\''+ prefix +'\']').each(function(){
            var n = $(this).attr('name').replace(prefix+'-', ''),
                v = s.find('input[name=\''+ n +'\']').val()
            $(this).val(v);
        });
    });
}(gee, jQuery));
