$(function() {
    /*---------饼型图---------*/
    function pieChart(series) {
        $('#pie').highcharts($.extend(true,{},defaults,{series: series},{
            title: {
                //text: '新增用户'
                style:{
                    display:'none'
                }
            },
            charts:{
                alignTicks:false
            },
            xAxis: {
                labels: {
                    enabled: false
                }
            },
            tooltip: {
                valueSuffix: '%',
                headerFormat: '<span>{point.key}</span>',
                pointFormat: ' {point.y}'
            }
        }));
    }

    //初始化
    pieChart([
        {type: 'pie',name: '性别比例', data: [
            { name: '未知', y: 1.5,color: '#5d9cec' },
            { name: '男', y: 56.2,color: '#62c87f' },
            { name: '女', y: 42.3,color: '#f15755' }
        ]}
    ]);

    //动态更新数据
    $('#piebutton').on('click',function () {
        //var ct = $('#container').highcharts();

        /*for(var i= 0;i<dd.length;i++) {
         ct.series[i].setData(dd[i]);
         }*/
        //$('#container').highcharts().redraw(dd);
        pieChart([
            {type: 'pie',name: '性别比例', data: [
                ['未知', 1.5],
                ['男', 56.2],
                { name: '女', y: 42.3, sliced: true, selected: true }
            ]}
        ])
    });
});