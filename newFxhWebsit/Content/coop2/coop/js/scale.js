$(function() {
    /*--------scale---------*/
    function scaleInit(v) {
        var c = $('#scale');

        if(v>=0&&v<=1) {
            c.find('div').css('width', c.width() * v).find('span').text(v * 100 + '%');
        }
    }

    scaleInit(0.53);//初始化 参数为比例值

    $('#scalechange').on('input',function() {
        scaleInit(parseInt($(this).val())*0.01)
    });
});
