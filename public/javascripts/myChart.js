/**
 * Created by peng on 2016/9/30.
 */
var jiaoshouArr = new Array();//教授
var fujiaoshouArr = new Array();//副教授
var jiangshiArr = new Array();//讲师
var zhujiaoArr = new Array();//助教
var wpjArr = new Array();//未评级
var mycategories = new Array();//图表分组
var lastJysMc = "";//最后一个教研室的名称，用来判断什么时间绘制图表
$(document).ready(function () {
    //获取教研室名称，并开始绘图
    getJysMc();
    getGender("%");
    getCsny("%");
    getZgxw("%");
    getDslx("%");
    getDq("%");
    getJxxg("%");
});

/* 各职称教师个数表 开始*/

//获取教研室名称
function getJysMc(){
    mycategories = [
        '所有教师'
    ];
    getDataByJys("%");//所有教师
    $.ajax({
        type: "get",
        url: '/jysService/getList',
        cache: true,
        success: function (msg) {
            var result = msg.aaData;
            for(var i = 0;i<result.length;i++){
                lastJysMc = result[result.length-1].JYSMC;
                mycategories.push(result[i].JYSMC);
                getDataByJys(result[i].JYSMC);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//由教研室名称进行绘图
function getDataByJys(jysmc){
    $.ajax({
        type: "get",
        url: '/chart/getListByJys',
        data:{JYSMC:jysmc},
        cache: true,
        success: function (msg) {
            var jiaoshou = 0, fujiaoshou = 0, jiangshi = 0, zhujiao = 0, wpj = 0;
            for (var i = 0; i < msg.data.length; i++) {
                var zyjszc = msg.data[i].专业技术职称;
                switch (zyjszc){
                    case '教授':
                        jiaoshou += msg.data[i].人数;
                        break;
                    case '副教授':
                        fujiaoshou += msg.data[i].人数;
                        break;
                    case '讲师':
                        jiangshi += msg.data[i].人数;
                        break;
                    case '助教':
                        zhujiao += msg.data[i].人数;
                        break;
                    case '其他正高级':
                        jiaoshou += msg.data[i].人数;
                        break;
                    case '其他副高级':
                        fujiaoshou += msg.data[i].人数;
                        break;
                    case '其他中级':
                        jiangshi += msg.data[i].人数;
                        break;
                    case '其他初级':
                        zhujiao += msg.data[i].人数;
                        break;
                    case '未评级':
                        wpj += msg.data[i].人数;
                        break;
                }
            }
            //将各类的人数放到各类数组中
            jiaoshouArr.push(jiaoshou);
            fujiaoshouArr.push(fujiaoshou);
            jiangshiArr.push(jiangshi);
            zhujiaoArr.push(zhujiao);
            wpjArr.push(wpj);
            if(jysmc === lastJysMc){
                painting();
                //清空数据
                jiaoshouArr = [];
                fujiaoshouArr = [];
                jiangshiArr = [];
                zhujiaoArr = [];
                wpjArr = [];
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
//绘图
function painting(){
    $('#container').highcharts({
        chart: {
            type: 'column',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: '各专业职称教师统计表'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: mycategories
        },
        yAxis: {
            min: 0,
            title: {
                text: '数目 (个)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '教授（包括其他正高级）',
            data: jiaoshouArr
        }, {
            name: '副教授（包括其他副高级）',
            data: fujiaoshouArr
        }, {
            name: '讲师（包括其他中级）',
            data: jiangshiArr
        }, {
            name: '助教（包括其他初级）',
            data: zhujiaoArr
        }, {
            name: '未评级',
            data: wpjArr

        }]
    });
}

/* 各职称教师个数表 结束 */

/* 教师男女比例统计表 开始 */

//ajax获取教师性别信息
function getGender(jysmc) {
    var chart = new Highcharts.Chart(options);
    $.ajax({
        type: "get",
        url: '/chart/getListByJysForGender',
        data:{JYSMC:jysmc},
        cache: true,
        success: function (data) {
            chart.series[0].setData(eval(forData(data.data)));
            //alert(data.data[0].人数);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//教师性别数据处理
function forData(data) {
    var sum1 = 0;               //性别为男的教师人数
    var sum2 = 0;               //性别为女的教师人数
    var sum3 = 0;               //教师总人数
    var dataStr = "";           //数据字符串
    for(var i = 0;i<data.length;i++){
        switch (data[i].性别){
            case '男':
                sum1 += data[i].人数;
                break;
            case '女':
                sum2 += data[i].人数;
                break;
        }
        sum3 += data[i].人数;
    }
    var temp1 = (sum1 / sum3) * 100;                //性别为男的教师在总教师中占的比例
    var temp2 = (sum2 / sum3) * 100;                //性别为男的教师在总教师中占的比例
    dataStr = "[{name:'男 "+sum1+"人 ',y:"+temp1+",sliced: true,selected: true},['女 "+sum2+"人 ',"+temp2+"]]";
    return dataStr;
}
//定义图表配置
var options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'genderChart'//div的ID
    },
    title: {
        text: '教师男女统计表'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
        enabled: true // 禁用版权信息
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        type: 'pie',
        name: '所占比例：',
        data: []
    }]
};

/* 教师男女比例统计表 结束 */

/* 教师年龄比例统计表 开始 */

//ajax获取教师出生年月信息
function getCsny(jysmc) {
    var chart = new Highcharts.Chart(options2);
    $.ajax({
        type: "get",
        url: '/chart/getListByJysForCsny',
        data:{JYSMC:jysmc},
        cache: true,
        success: function (data) {
            chart.series[0].setData(eval(forDataCsny(data.data)));
            //alert(data.data[0].人数);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//教师出生年月数据处理
function forDataCsny(data) {
    var sum1 = 0;               //30岁以下的教师人数
    var sum2 = 0;               //30-39岁的教师人数
    var sum3 = 0;               //40-49岁的教师人数
    var sum4 = 0;               //50-59岁的教师人数
    var sum5 = 0;               //大于等于60岁的教师人数
    var sum6 = 0;               //教师总人数
    var dataStr = "";           //数据字符串
    var now = getNow();

    for(var i = 0;i<data.length;i++){
        var csny = data[i].出生年月;
        var age = parseFloat(now-csny);
        if(age < 30){
           sum1 += data[i].人数;
        }else if(30 <= age && age < 39){
            sum2 += data[i].人数;
        }else if(40 <= age && age < 49){
            sum3 += data[i].人数;
        }else if(50 <= age && age < 59){
            sum4 += data[i].人数;
        }else if(60 <= age){
            sum5 += data[i].人数;
        }
        sum6 += data[i].人数;
    }
    var temp1 = (sum1 / sum6) * 100;                //30岁以下的教师在总教师中占的比例
    var temp2 = (sum2 / sum6) * 100;                //30-39岁的教师在总教师中占的比例
    var temp3 = (sum3 / sum6) * 100;                //40-49岁的教师在总教师中占的比例
    var temp4 = (sum4 / sum6) * 100;                //50-59岁的教师在总教师中占的比例
    var temp5 = (sum5 / sum6) * 100;                //大于等于60岁的教师在总教师中占的比例
    dataStr = "[{name:'30岁以下 "+sum1+"人 ',y:"+temp1+",sliced: true,selected: true},['30-39岁 "+sum2+"人 ',"+temp2+"],['40-49岁 "+sum3+"人 ',"+temp3+"],['50-59岁 "+sum4+"人 ',"+temp4+"],['60岁及60岁以上 "+sum5+"人 ',"+temp5+"]]";
    return dataStr;
}
//获取当前时间的年月
function getNow(){
    var myDate = new Date();
    myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    var now = "";
    if(myDate.getMonth() >= 9){
        now = myDate.getFullYear()+"."+(myDate.getMonth()+1);
    }else{
        now = myDate.getFullYear()+".0"+(myDate.getMonth()+1);
    }
    return now;
}
//定义图表配置
var options2 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'ageChart'//div的ID
    },
    title: {
        text: '教师年龄统计表'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
        enabled: true // 禁用版权信息
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        type: 'pie',
        name: '所占比例：',
        data: []
    }]
};

/* 教师年龄比例统计表 结束 */

/* 教师学位比例统计表 开始 */

//ajax获取教师最高学位信息
function getZgxw(jysmc) {
    var chart = new Highcharts.Chart(options3);
    $.ajax({
        type: "get",
        url: '/chart/getListByJysForZgxw',
        data:{JYSMC:jysmc},
        cache: true,
        success: function (data) {
            chart.series[0].setData(eval(forDataXw(data.data)));
            //alert(data.data[0].人数);
        },
        error: function (e) {
            console.log(e);
        }
    });
}
//教师出生年月数据处理
function forDataXw(data) {
    var sum1 = 0;               //博士的教师人数
    var sum2 = 0;               //硕士的教师人数
    var sum3 = 0;               //学士的教师人数
    var sum4 = 0;               //无学位的教师人数
    var sum5 = 0;               //教师总人数
    var dataStr = "";           //数据字符串

    for(var i = 0;i<data.length;i++){
        var zgxw = data[i].学位;

        switch (zgxw){
            case '博士':
                sum1 += data[i].人数;
                break;
            case '硕士':
                sum2 += data[i].人数;
                break;
            case '学士':
                sum3 += data[i].人数;
                break;
            case '无学位':
                sum4 += data[i].人数;
                break;
        }
        sum5 += data[i].人数;
    }
    var temp1 = (sum1 / sum5) * 100;                //博士的教师在总教师中占的比例
    var temp2 = (sum2 / sum5) * 100;                //硕士的教师在总教师中占的比例
    var temp3 = (sum3 / sum5) * 100;                //学士的教师在总教师中占的比例
    var temp4 = (sum4 / sum5) * 100;                //无学位的教师在总教师中占的比例
    dataStr = "[{name:'博士 "+sum1+"人 ',y:"+temp1+",sliced: true,selected: true},['硕士 "+sum2+"人 ',"+temp2+"],['学士 "+sum3+"人 ',"+temp3+"],['无学位 "+sum4+"人 ',"+temp4+"]]";
    return dataStr;
}

//定义图表配置
var options3 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'xwChart'//div的ID
    },
    title: {
        text: '教师最高学位统计表'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
        enabled: true // 禁用版权信息
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        type: 'pie',
        name: '所占比例：',
        data: []
    }]
};
/* 教师学位比例统计表 结束 */

/* 教师导师类型比例统计表 开始 */

//ajax获取教师最高学位信息
function getDslx(jysmc) {
    var chart = new Highcharts.Chart(options4);
    $.ajax({
        type: "get",
        url: '/chart/getListByJysForDslx',
        data:{JYSMC:jysmc},
        cache: true,
        success: function (data) {
            chart.series[0].setData(eval(forDataDslx(data.data)));
            //alert(data.data[0].人数);
        },
        error: function (e) {
            console.log(e);
        }
    });
}
//教师出生年月数据处理
function forDataDslx(data) {
    var sum1 = 0;               //博士,硕士导师的教师人数
    var sum2 = 0;               //博士导师的教师人数
    var sum3 = 0;               //硕士导师的教师人数
    var sum4 = 0;               //无导师的教师人数
    var sum5 = 0;               //教师总人数
    var dataStr = "";           //数据字符串

    for(var i = 0;i<data.length;i++){
        var dslx = data[i].导师类型;

        switch (dslx){
            case '博士、硕士导师':
                sum1 += data[i].人数;
                break;
            case '博士导师':
                sum2 += data[i].人数;
                break;
            case '硕士导师':
                sum3 += data[i].人数;
                break;
            case '无':
                sum4 += data[i].人数;
                break;
        }
        sum5 += data[i].人数;
    }
    var temp1 = (sum1 / sum5) * 100;                //博士、硕士导师的教师在总教师中占的比例
    var temp2 = (sum2 / sum5) * 100;                //博士导师的教师在总教师中占的比例
    var temp3 = (sum3 / sum5) * 100;                //硕士导师的教师在总教师中占的比例
    var temp4 = (sum4 / sum5) * 100;                //无导师的教师在总教师中占的比例
    dataStr = "[{name:'博士、硕士导师 "+sum1+"人 ',y:"+temp1+",sliced: true,selected: true},['博士导师 "+sum2+"人 ',"+temp2+"],['硕士导师 "+sum3+"人 ',"+temp3+"],['无 "+sum4+"人 ',"+temp4+"]]";
    return dataStr;
}

//定义图表配置
var options4 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'dslxChart'//div的ID
    },
    title: {
        text: '教师导师类型统计表'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
        enabled: true // 禁用版权信息
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        type: 'pie',
        name: '所占比例：',
        data: []
    }]
};

/* 教师导师类型比例统计表 结束 */

/* 教师地区比例统计表 开始 */

//ajax获取教师地区信息
function getDq(jysmc) {
    var chart = new Highcharts.Chart(options5);
    $.ajax({
        type: "get",
        url: '/chart/getListByJysForDq',
        data:{JYSMC:jysmc},
        cache: true,
        success: function (data) {
            chart.series[0].setData(eval(forDataDq(data.data)));
            //alert(data.data[0].人数);
        },
        error: function (e) {
            console.log(e);
        }
    });
}
//教师出生年月数据处理
function forDataDq(data) {
    var sum1 = 0;               //博士,硕士导师的教师人数
    var sum2 = 0;               //博士导师的教师人数
    var sum3 = 0;               //教师总人数
    var dataStr = "";           //数据字符串

    for(var i = 0;i<data.length;i++){
        var dq = data[i].地区;

        switch (dq){
            case '境内':
                sum1 += data[i].人数;
                break;
            case '境外（国外及港澳台）':
                sum2 += data[i].人数;
                break;
        }
        sum3 += data[i].人数;
    }
    var temp1 = (sum1 / sum3) * 100;                //博士、硕士导师的教师在总教师中占的比例
    var temp2 = (sum2 / sum3) * 100;                //博士导师的教师在总教师中占的比例
    dataStr = "[{name:'境内 "+sum1+"人 ',y:"+temp1+",sliced: true,selected: true},['境外（国外及港澳台） "+sum2+"人 ',"+temp2+"]]";
    return dataStr;
}

//定义图表配置
var options5 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'dqChart'//div的ID
    },
    title: {
        text: '教师地区统计表'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
        enabled: true // 禁用版权信息
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        type: 'pie',
        name: '所占比例：',
        data: []
    }]
};

/* 教师地区比例统计表 结束 */

/* 教师教学效果比例统计表 开始 */

//ajax获取教师最高学位信息
function getJxxg(jysmc) {
    var chart = new Highcharts.Chart(options6);
    $.ajax({
        type: "get",
        url: '/chart/getListByJysForJxxg',
        data:{JYSMC:jysmc},
        cache: true,
        success: function (data) {
            chart.series[0].setData(eval(forDataJxxg(data.data)));
            //alert(data.data[0].人数);
        },
        error: function (e) {
            console.log(e);
        }
    });
}
//教师出生年月数据处理
function forDataJxxg(data) {
    var sum1 = 0;               //优秀的教师人数
    var sum2 = 0;               //良好的教师人数
    var sum3 = 0;               //一般的教师人数
    var sum4 = 0;               //差的教师人数
    var sum5 = 0;               //教师总人数
    var dataStr = "";           //数据字符串

    for(var i = 0;i<data.length;i++){
        var jxxg = data[i].教学效果;

        switch (jxxg){
            case '优秀':
                sum1 += data[i].人数;
                break;
            case '良好':
                sum2 += data[i].人数;
                break;
            case '一般':
                sum3 += data[i].人数;
                break;
            case '差':
                sum4 += data[i].人数;
                break;
        }
        sum5 += data[i].人数;
    }
    var temp1 = (sum1 / sum5) * 100;                //优秀的教师在总教师中占的比例
    var temp2 = (sum2 / sum5) * 100;                //良好的教师在总教师中占的比例
    var temp3 = (sum3 / sum5) * 100;                //一般的教师在总教师中占的比例
    var temp4 = (sum4 / sum5) * 100;                //差的教师在总教师中占的比例
    dataStr = "[{name:'优秀 "+sum1+"人 ',y:"+temp1+",sliced: true,selected: true},['良好 "+sum2+"人 ',"+temp2+"],['一般 "+sum3+"人 ',"+temp3+"],['差 "+sum4+"人 ',"+temp4+"]]";
    return dataStr;
}

//定义图表配置
var options6 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'jxxgChart'//div的ID
    },
    title: {
        text: '教师教学效果统计表'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
        enabled: true // 禁用版权信息
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorColor: '#000000',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        type: 'pie',
        name: '所占比例：',
        data: []
    }]
};


/* 教师教学效果比例统计表 结束 */