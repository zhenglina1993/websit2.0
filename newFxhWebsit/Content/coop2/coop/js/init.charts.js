/**
 * Created by Administrator on 2014/9/23.
 */
var defaults = {
    lang:{
        //设置highcharts的全局常量的中文值，如月份、星期、按钮文字等
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        resetZoom: '查看全图',
        resetZoomTitle: '查看全图',
        downloadPNG: '下载PNG',
        downloadJPEG: '下载JPEG',
        downloadPDF: '下载PDF',
        downloadSVG: '下载SVG',
        printChart: '打印图表',
        contextButtonTitle:'操作',
        loading: '数据加载中，请稍候...'
    },
    //副标题
    /*subtitle: {
     text: '趋势图'
     },*/
    credits: {
        enabled:false,//隐藏highcharts.com右下角图标
        href: 'http://www.wzz.cn',
        text: 'www.wzz.cn'
    },
    xAxis: {
        gridLineWidth: 0,
        tickInterval:1,
        tickmarkPlacement:'on'
    },
    exporting: {
        enabled:false
    },
    yAxis: {
        title: {
            enabled:false//去掉左边title
        },
        min:0//最小值
        //minTickInterval:100//值增长区间
    },
    plotOptions: {
        line: {
            marker: {
                enabled:false
            }
        },
        bar: {
            dataLabels: {
                enabled: true
                //color:'#ff0000',
                //style: { fontWeight: 'bold' },
            }
        },
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: '60%',
            dataLabels: {
                enabled: false
                /*color: '#000000',
                 connectorColor: '#000000',
                 formatter: function () {
                 return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                 }*/
            },
            showInLegend: true
        }
    },
    tooltip: {
        borderColor: '#666',
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        useHTML: true,
        crosshairs: {
            color: '#7ac943',
            dashStyle: 'shortdot'
        },
        shared: true
    },
    legend: {
        itemStyle:{
            fontWeight:'none'
        }
    }
};