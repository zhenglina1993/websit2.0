$(function() {
    /*----------城市数据-----------*/
    function cityChart(series) {
        $('#city').highcharts($.extend(true,{},defaults,{series: series},{
            chart: {
                type: 'bar'
            },
            xAxis:{
                categories:['广东', '江苏', '北京', '浙江', '福建', '河南', '湖北', '四川', '山东', '辽宁'],
                tickWidth:0,
                lineWidth:0
            },
            title: {
                style:{
                    "display":"none"
                }
            },
            yAxis: {
                gridLineWidth: 0,
                labels:{
                    enabled:false
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size: 10px">{point.key}</span>:',
                pointFormat: '{point.y}'
            },
            legend: {
                enabled:false
            }
        }));
    }

    cityChart([{
        color:'#45b765',
        data: [1, 6, 9, 14, 18, 21, 25, 26, 23, 18]
    }]);

    //动态更新数据
    $('#citybutton').on('click',function () {
        cityChart([{
            color:'#45b765',
            data: [1, 6, 9, 14, 18, 21, 25, 26, 23, 28]
        }])
    });
});