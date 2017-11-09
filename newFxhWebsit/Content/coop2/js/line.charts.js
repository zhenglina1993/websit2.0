$(function () {
    function lineChart(series,xd) {
        $('#line').highcharts($.extend(true, {}, defaults, {series: series}, {
            title: {
                text: '消费明细'
            },
            xAxis: {
                categories: xd,
                labels: {
                    step: 2
                }
            },
            yAxis: {
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            tooltip: {
                style:{
                    width:150
                },
                headerFormat: '<div style="width:130px"><span style="font-size: 10px">{point.key}</span><br />',
                pointFormat: '<div style="float:left;">{series.name}</div> <div style="float:right;">{point.y}</div><div style="clear: both"></div> </div>'
            }
        }));
    }

    //初始化 注意如果开始时没有数据可以设置null.如[null,1,2]
    lineChart([
        {
			color:'#fb9456',
            name: '消费明细',
            data: [null, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 29, 1, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 29]
        }
    ],['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']);

    //动态更新数据
    $('#linebutton').on('click', function () {
        lineChart([
            {
				color:'#fb9456',
                name: '消费明细',
                data: [1, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 29, 1, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 29]
            }
        ],['10-08', '10-09', '10-10', '10-11', '10-12', '10-13', '10-14'])
    });
});