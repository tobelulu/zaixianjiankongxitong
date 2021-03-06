﻿function GetPartTree(part) {
    $(".naviDiv").find("li").removeClass("activeLi");
    $(".naviDiv").find("li").addClass("disactive");
    $(".naviDiv").find("li").eq(part-1).removeClass("disactive");
    $(".naviDiv").find("li").eq(part-1).addClass("active");
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "/Api/System/GetFunctionTree?part=" + part,
        success: function (result) {
            var data = JSON.parse(result);
            $('#treeview1').treeview({
                showCheckbox: false,
                multiSelect: false,
                levels: 6,
                data: data,
                onNodeChecked: function (event, data) {
                    funList.push(data.id);
                },
                onNodeSelected: function (event, data) {
                    clickTreeMenu(data);
                },
                onNodeUnchecked: function (event, data) {
                    if ($.inArray(data.id, funList) != -1) {
                        funList.remove(data.id);
                    }

                }

            });
        }
    });
   
}
function clickTreeMenu(data) {
    //window.location = "/Manager/Logins?userID=" + result.data[0].F_ACCOUNT

    var strtab = '<li id="tab' + data.id + '" class="tab-2 active_tab" onclick="clickTab(' + data.id + ')">' + data.text + '</li>';
    var contentLi = '<li id="li' + data.id + '"  class="activeLi" ><iframe src="/Manager/' + data.href + '" frameborder="0" width="100%" height=600 scrolling="auto"></iframe></li>';

    var fid = "";
    $('#nav> ul').find("li").each(function () {
        if ($(this).attr('id') == ("tab" + data.id)) {
            fid = "tab" + data.id;
        }
    });
    if ("" === fid) {
        //$("#navTitle").html(data.text);
        $("#nav> ul").find("li").removeClass("active_tab");
        $("#nav> ul").find("li").addClass("disactive_tab");
        $('.tab-content').find("li").removeClass("activeLi");
        $('.tab-content').find("li").addClass("disactiveLi");
        $("#nav> ul").append(strtab);
        $(".tab-content").append(contentLi);
    } else {

    }
}
function clickTab(sid) {
   
    var tabid = "tab" + sid;
    // tab样式的变化
    $("#nav> ul").find("li").removeClass("active_tab");
    $("#nav> ul").find("li").addClass("disactive_tab");
    $("#"+tabid).removeClass("disactive_tab");
    $("#" + tabid).addClass("active_tab");
    // title
    $("#navTitle").html($("#" + tabid).text());
    // 每个tab对应的内容的变化tab-content  
    $(".tab-content").find("li").removeClass("activeLi");
    $(".tab-content").find("li").addClass("disactiveLi");
    $("#li" + sid).removeClass("disactiveLi");
    $("#li" + sid).addClass("activeLi");

}
function setLDT() {
    // 波向图
    var myChart = echarts.init(document.getElementById('leidatu'));
    option = {
        tooltip: {
            trigger: 'axis'
        },
        polar: [
           {
               indicator: [
                   { text: '偏离距离', max: 1000 }
               ],
               center: ['50%', '50%'],
               radius: 90,
               startAngle: 160,
               splitNumber: 4,
               name: {
                   show: false,
                   formatter: '{value}',
                   textStyle: { color: 'red' },

               },
               scale: true,
               type: 'circle',
               axisLine: {            // 坐标轴线
                   show: true,        // 默认显示，属性show控制显示与否
                   lineStyle: {       // 属性lineStyle控制线条样式
                       color: '#82b3de',
                       width: 2,
                       type: 'solid'
                   }
               },
               axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                   show: true,
                   // formatter: null,
                   textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                       color: '#000'
                   }
               },
               splitArea: {
                   show: true,
                   areaStyle: {
                       color: ['rgba(13,146,239,1)', 'rgba(53,165,241,1)', 'rgba(125,194,247,1)', 'rgba(205,232,253,9)']
                   }
               },
               splitLine: {
                   show: true,
                   lineStyle: {
                       width: 2,
                       color: ['rgba(245,245,245,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)', 'rgba(225,225,225,0.7)']
                   }
               }
           }
        ],
        calculable: true,
        series: [
            {
                name: '偏离距离',
                type: 'radar',
                data: [
                    {
                        //symbol: 'image://../img/ok_fb3.png', 
                        symbol: 'emptyCircle',
                        symbolSize: 8,
                        value: 300,
                        name: '偏离距离'
                    }
                ]
            }
        ]
    };
    myChart.setOption(option);
}
function setBXT() {
    // 波向图
    var myChart = echarts.init(document.getElementById('boxiangtu'));
    option = {
        backgroundColor: 'rgba(0,0,0,0)',
       // backgroundImage: '#1b1b1b',
        tooltip: {
            show: false,
            formatter: "{a}  : {c}°"
        },
        series: [
            {
                name: '波向',
                type: 'gauge',
               // center: ['50%', '40%'],    // 默认全局居中
                //radius: '58%',
                startAngle: 90,
                endAngle: -269.999,
                max: 360,
                detail: {
                    show: false,
                    formatter: '90'
                }, //仪表盘显示数据
                axisLine: { //仪表盘轴线样式
                    show: false,
                    lineStyle: {
                        width: 6,
                        show: false
                    }
                },
                splitNumber: 4,       // 分割段数，默认为5
                splitLine: {           // 分隔线
                    show: true,        // 默认显示，属性show控制显示与否,这里设为false将隐藏分割线！！
                    length: 12,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: '#f02d00',
                        width: 0,
                        type: 'solid'
                    }
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#f02d00']],
                        width: 0
                    }
                },
                axisTick: {            // 坐标轴小标记
                    show: false,        // 属性show控制显示与否，默认不显示
                    splitNumber: 5,    // 每份split细分多少段
                    length: 8,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#ffbd2c',
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                    show: false,
                    formatter: function (v) {
                        switch (v + '') {
                            case '0': return '北';
                            case '90': return '东';
                            case '180': return '南';
                            case '270': return '西';
                            default: return '';
                        }
                    },
                    distance: -26,
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        // color: '#333'
                    }
                },
                pointer: {
                    length: '70%',
                    width: 4,
                    color: 'auto'
                },
                data: [{ value: 260, name: '' }]
            }
        ]
    };

    myChart.setOption(option);
}