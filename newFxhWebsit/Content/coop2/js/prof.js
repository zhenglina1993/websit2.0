$(function () {
    var canvas = $('#prof');
    canvas.css('height', 'auto').html('');//保证画布清空

    //数据
    var prof = [
        {"AttrValue": "未知", "Qv": "91280"},
        {"AttrValue": "建筑，地产", "Qv": "206"},
        {"AttrValue": "医疗生化", "Qv": "450"},
        {"AttrValue": "官员翻译", "Qv": "318"},
        {"AttrValue": "销售客服", "Qv": "6050"},
        {"AttrValue": "物流采购", "Qv": "1017"},
        {"AttrValue": "教育科研", "Qv": "1086"},
        {"AttrValue": "行政高管", "Qv": "647"},
        {"AttrValue": "工程行业", "Qv": "375"},
        {"AttrValue": "媒体艺术", "Qv": "2248"},
        {"AttrValue": "金融保险", "Qv": "572"},
        {"AttrValue": "服务业", "Qv": "1310"},
        {"AttrValue": "电子，网络", "Qv": "18323"}
    ];

    var baseSize = 10000,//总数基数（用于计算百分比）
    //绘制画布
        render = new Highcharts.Renderer(
            canvas[0],
            1000,//画布宽度
            300//画布高度
        ),
    //绘制圆形的位置
        positions = {
            0: [100, 114, 100],
            1: [294, 200, 80],
            2: [780, 80, 70],
            3: [862, 223, 65],
            4: [524, 226, 60],
            5: [673, 234, 45],
            6: [477, 73, 40],
            7: [286, 43, 35],
            8: [608, 111, 35],
            9: [925, 63, 35]
        },
    //绘制颜色值 0-9循环使用
        colors = ['#5D9CEC', '#62C87F', '#F15755', '#FC863F', '#7053B6', '#FFCE55', '#6ED5E6', '#F57BC1', '#DCB186', '#647C9D'],
        titleStyle = {
            color: '#ffffff',
            font: '14px Tahoma,microsoft yahei,"微软雅黑","宋体"'
        },
        sizeStyle = {
            color: '#ffffff',
            font: '12px Tahoma,microsoft yahei,"微软雅黑","宋体"'
        },
        colorIdx = 0,
        total = 0,
        arrProf = [];

    //计算总和并去掉未知行业
    for (var p in prof) {
        var item = prof[p];
        total += parseFloat(item.Qv);
        if (p !== '0' && item.AttrValue !== '未知') {
            arrProf.push(item);
        }
    }

    arrProf.sort(function (a, b) {
        return b.Qv - a.Qv;
    });

    for (var p in arrProf) {
        var item = arrProf[p];
        var percent = Math.round(item.Qv / total * baseSize) / 100 + '%';
        var pos = positions[p];
        var group = render.g().add();
        pos && drawCircle(pos[0], pos[1], pos[2], item.AttrValue, percent, render, group);
    }

    function drawCircle(x, y, r, desc, percent, render, group) {
        var circle = render.circle(x, y, r).attr({
            fill: colors[colorIdx]
        }).add(group);
        colorIdx = colorIdx<9?colorIdx+1:0;
        var t = render.text(desc, x - 26, y).css(titleStyle).add(group);
        render.text(percent, x - 18, y + 18).css(sizeStyle).add(group);
    }
});