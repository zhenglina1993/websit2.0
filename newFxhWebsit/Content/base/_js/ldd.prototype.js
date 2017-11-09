Array.prototype.where = function (where) {
    /// <summary>
    /// 数组条件查询
    /// </summary>
    /// <param name="where">where条件function，返回boolean</param>
    var result = [];
    for (var i = 0; i < this.length; i++) {
        if (where(this[i])) {
            result.push(this[i])
        }
    }
    return result;

}

Array.prototype.select = function (select) {
    /// <summary>
    /// 重组数组
    /// </summary>
    /// <param name="select">select重组function，返回支持所有类型</param>
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(select(this[i]));
    }
    return result;

}

Array.prototype.indexOf = function (item) {
    /// <summary>
    /// 查找对象索引
    /// </summary>
    /// <param name="item">对象</param>
    for (var i = 0; i < this.length; i++) {
        if (this[i] === item) {
            return i;
        }
    }
    return -1;

}

Array.prototype.remove = function (item) {
    /// <summary>
    /// 移除数组中指定对象
    /// 
    /// 源对象中删除，并返回一个新数组对象
    /// </summary>
    /// <param name="item">删除的对象</param>
    for (var i = 0; i < this.length; i++) {
        if (this[i] === item) {
            this.splice(i, 1);
            break;
        }
    }
    return this;

}

/**
 * 清空数据
 */
Array.prototype.clear = function () {
    this.splice(0, this.length);
    return this;
}

Array.prototype.first = function () {
    /// <summary>
    /// 获取第一个对象
    /// </summary>
    if (this.length > 0) {
        return this[0];
    }
    else {
        return null;
    }
}

Array.prototype.last = function () {
    /// <summary>
    /// 获取最后一个对象
    /// </summary>
    return this[this.length - 1];
}

Array.prototype.forEach = function (each) {
    /// <summary>
    /// foreach循环
    /// </summary>
    /// <param name="each">循环回调</param>
    for (var i = 0; i < this.length; i++) {
        each(this[i]);
    }
    return this;
}

Array.prototype.pushArray = function (arr) {
    /// <summary>
    /// push数组
    /// </summary>
    /// <param name="arr"></param>
    for (var i = 0; i < arr.length; i++) {
        this.push(arr[i]);
    }
    return this;
}

Array.prototype.insert = function (index, item) {
    /// <summary>
    /// 指定索引处添加元素
    /// </summary>
    /// <param name="index">索引</param>
    /// <param name="item">元素</param>
    this.splice(index, 0, item);
    return this;
};

Array.prototype.has = function (item) {
    /// <summary>
    /// 是否包含值
    /// </summary>
    /// <param name="item"></param>

    for (var i = 0; i < this.length; i++) {
        if (this[i] == item) {
            return true;
        }
    }
    return false;
}

String.prototype.lTrim = function (s) {
    s = (s ? s : "\\s");                            //没有传入参数的，默认去空格
    s = ("(" + s + ")");
    var reg_lTrim = new RegExp("^" + s + "*", "g");     //拼正则
    return this.replace(reg_lTrim, "");
};

String.prototype.rTrim = function (s) {
    s = (s ? s : "\\s");
    s = ("(" + s + ")");
    var reg_rTrim = new RegExp(s + "*$", "g");
    return this.replace(reg_rTrim, "");
};

String.prototype.trim = function (s) {
    s = (s ? s : "\\s");
    s = ("(" + s + ")");
    var reg_trim = new RegExp("(^" + s + "*)|(" + s + "*$)", "g");
    return this.replace(reg_trim, "");
};

String.prototype.format = function (args) {
    /// <summary>
    /// 格式化字符串
    /// </summary>
    /// <param name="args"></param>
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

Date.prototype.format = function (format) {
    /// <summary>
    /// 时间格式化
    /// </summary>
    /// <param name="format"></param>
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

String.prototype.EncodeURI = function () {
    return encodeURI(this);
}

/**
 * /new Date(1000)/日期转换
 * @return {Date}
 */
String.prototype.toDate = function () {
    var re = /-?\d+/;
    var m = re.exec(this);
    var d = new Date(parseInt(m[0]));
    return d;
}

String.prototype.toDateFormat = function (format) {
    var re = /-?\d+/;
    var m = re.exec(this);
    var d = new Date(parseInt(m[0]));
    if(d.getYear() == -1899){
        return "";
    }
    else
    {
        return d.format(format);
    }
    
}

String.prototype.formatDateTime = function (timespan, format) {
    var re = /-?\d+/;
    var m = re.exec(timespan);
    var d = new Date(parseInt(m[0]));
    var datetime = d.format(format);
    return datetime;
}

Date.prototype.addDays = function (addDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var y = dd.getYear() + 1900;
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}
