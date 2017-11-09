$(function() {
    /*---------map---------*/
    function mapChart(series) {
        $('#map').highcharts('Map',{
            title : {
                style:{
                    display:'none'
                }
            },
            credits: {
                enabled:false,//隐藏highcharts.com右下角图标
                href: 'http://www.wzz.cn',
                text: 'www.wzz.cn'
            },
            exporting: {
                enabled:false
            },
            mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            colorAxis: {
                min: 0,
                //tickLength:5,//刻度线高度
                stops: [//区域颜色渐变 第一个数值为百分比
                    [0, '#9cd9af'],
                    [1, '#229342']
                ]
            },
            tooltip: {
                headerFormat: '<span>{point.key}</span>',
                pointFormat: ' : {point.value}'
            },
            legend: {
                symbolHeight:5
            },
            series : [{
                data : series,
                mapData: Highcharts.maps['countries/cn/custom/cn-all-sar-taiwan'],
                joinBy: 'hc-key',
                //name: 'Random data',
                states: {
                    hover: {
                        //鼠标经过区域颜色
                        color: '#5d9cec'
                    }
                },
                dataLabels: {
                    enabled: false
                    //format: '{point.name}'
                }
            }]
        });
    }
    mapChart([
        {
            "hc-key": "cn-sh",
            "value": 0
        },
        {
            "hc-key": "cn-xg",
            "value": 0
        },
        {
            "hc-key": "cn-am",
            "value": 0
        },
        {
            "hc-key": "cn-tw",
            "value": 0
        },
        {
            "hc-key": "cn-zj",
            "value": 1
        },
        {
            "hc-key": "cn-gs",
            "value": 18
        },
        {
            "hc-key": "cn-nx",
            "value": 25
        },
        {
            "hc-key": "cn-sa",
            "value": 26
        },
        {
            "hc-key": "cn-ah",
            "value": 31
        },
        {
            "hc-key": "cn-hu",
            "value": 32
        },
        {
            "hc-key": "cn-gd",
            "value": 47
        },
        {
            "hc-key": "cn-fj",
            "value": 48
        },
        {
            "hc-key": "cn-bj",
            "value": 49
        },
        {
            "hc-key": "cn-hb",
            "value": 50
        },
        {
            "hc-key": "cn-sd",
            "value": 51
        },
        {
            "hc-key": "cn-tj",
            "value": 53
        },
        {
            "hc-key": "cn-js",
            "value": 55
        },
        {
            "hc-key": "cn-ha",
            "value": 56
        },
        {
            "hc-key": "cn-qh",
            "value": 57
        },
        {
            "hc-key": "cn-jl",
            "value": 58
        },
        {
            "hc-key": "cn-xz",
            "value": 59
        },
        {
            "hc-key": "cn-xj",
            "value": 60
        },
        {
            "hc-key": "cn-he",
            "value": 61
        },
        {
            "hc-key": "cn-nm",
            "value": 62
        },
        {
            "hc-key": "cn-hl",
            "value": 63
        },
        {
            "hc-key": "cn-yn",
            "value": 64
        },
        {
            "hc-key": "cn-gx",
            "value": 65
        },
        {
            "hc-key": "cn-ln",
            "value": 66
        },
        {
            "hc-key": "cn-sc",
            "value": 67
        },
        {
            "hc-key": "cn-cq",
            "value": 68
        },
        {
            "hc-key": "cn-gz",
            "value": 69
        },
        {
            "hc-key": "cn-hn",
            "value": 70
        },
        {
            "hc-key": "cn-sx",
            "value": 71
        },
        {
            "hc-key": "cn-jx",
            "value": 72
        }
    ]);
});