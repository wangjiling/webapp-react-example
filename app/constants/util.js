import cookie from 'react-cookie';

export const getUUID = () => {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

export const serialize = ( obj ) => {
    return Object.keys(obj).reduce(function(a,k){
        if (obj[k] != null){
            a.push(k+'='+encodeURIComponent(obj[k]));
        }
        return a
    },[]).join('&')
}

export const formatTime = (d, fmt) => {
    var date = new Date(d);
    var o = {         
    "M+" : date.getMonth()+1, //月份         
    "d+" : date.getDate(), //日         
    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时         
    "H+" : date.getHours(), //小时         
    "m+" : date.getMinutes(), //分         
    "s+" : date.getSeconds(), //秒         
    "q+" : Math.floor((date.getMonth()+3)/3), //季度         
    "S" : date.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }     
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;
}

export const cutText = (str, length) => { //截取字符串
    if(!str) return "";
    var sub_length = length,
        temp1 = str.replace(/[^\x00-\xff]/g, "**"),//匹配双字节字符
        temp2 = temp1.substring(0, sub_length),
        x_length = temp2.split("\*").length - 1,//找出有多少个*
        hanzi_num = x_length / 2;
    sub_length = sub_length - hanzi_num;//实际需要sub的长度是总长度-汉字长度
    var res = str.substring(0, sub_length),
        end = "";
    if (sub_length < str.length) {
        end = res + "...";
    } else {
        end = res;
    }
    return end;
};

export const pad = (num, n) => {
    return new Array(n>(''+num).length?(n-(''+num).length+1):0).join('0')+num;
};

// dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// dateFormat(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
export const dateFormat = function (date, style) {
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(),      //day
        "h+": date.getHours(),     //hour
        "m+": date.getMinutes(),   //minute
        "s+": date.getSeconds(),   //second
        "w+": "天一二三四五六".charAt(date.getDay()),   //week
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(style)) {
        style = style.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(style)) {
            style = style.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return style;
};
/**
 * 将金额进行格式化
 * @param s {string|number} 金额 123 123. 123.0 123.00 123.000
 * @param n {number} 小数位数 默认为2
 */
export const formatMoney = function (s, n) {
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1],
        t = "",
        result;
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    result = t.split("").reverse().join("");
    if (r !== undefined){
        result += ("." + r);
    }
    return result;
}