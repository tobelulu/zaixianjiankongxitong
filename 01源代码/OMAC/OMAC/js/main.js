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
                highlightSelected: false,
                levels: 1,
                data: data,
                onNodeSelected: function (event, data) {
                    if (data.href == "#") {
                        if (data.parentId == undefined)
                        {
                            $('#treeview1').treeview('collapseAll', { silent: true });
                        }
                        if (data.state.expanded) {
                            $('#treeview1').treeview('collapseNode', [data.nodeId, { silent: true, ignoreChildren: false }]);
                        } else {
                            $('#treeview1').treeview('expandNode', [data.nodeId, { levels: 1, silent: true }]);
                        }                       
                    } else {
                        clickTreeMenu(data);
                    }                   
                },
                onNodeUnselected: function (event, data) {
                    if (data.href == "#") {
                        if (data.parentId == undefined) {
                            $('#treeview1').treeview('collapseAll', { silent: true });
                        }
                        if (data.state.expanded) {
                            $('#treeview1').treeview('collapseNode', [data.nodeId, { silent: true, ignoreChildren: false }]);
                        } else {
                            $('#treeview1').treeview('expandNode', [data.nodeId, { levels: 1, silent: true }]);
                        }
                    } else {
                        clickTreeMenu(data);
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
// 点击历史数据tab时
function clickTab2(sid) {
    sid = PrefixInteger(sid, 6);
    var tabid = "tabHistroy" + sid;
    // tab样式的变化
    $("#nav> ul").find("li").removeClass("active_tab");
    $("#nav> ul").find("li").addClass("disactive_tab");
    $("#" + tabid).removeClass("disactive_tab");
    $("#" + tabid).addClass("active_tab");
    // title
    $("#navTitle").html($("#" + tabid).text());
    // 每个tab对应的内容的变化tab-content  
    $(".tab-content").find("li").removeClass("activeLi");
    $(".tab-content").find("li").addClass("disactiveLi");
    $("#liHistroy" + sid).removeClass("disactiveLi");
    $("#liHistroy" + sid).addClass("activeLi");
}
// 点击实时数据tab时
function clickTab3() {
    // tab样式的变化
    $("#nav> ul").find("li").removeClass("active_tab");
    $("#nav> ul").find("li").addClass("disactive_tab");
    $("#tabShishi").removeClass("disactive_tab");
    $("#tabShishi").addClass("active_tab");
    // title
    $("#navTitle").html($("#tabShishi").text());
    // 每个tab对应的内容的变化tab-content  
    $(".tab-content").find("li").removeClass("activeLi");
    $(".tab-content").find("li").addClass("disactiveLi");
    $("#liShishi").removeClass("disactiveLi");
    $("#liShishi" ).addClass("activeLi");
}

// 添加历史数据tab
function setHistoryData(id) {
     var strtab = '<li id="tabHistroy' + id + '" class="tab-2 active_tab" onclick="clickTab2(' + id + ')">历史数据</li>';
    var contentLi = '<li id="liHistroy' + id + '"  class="activeLi" ><iframe src="../MonitorLog/Index?devicecode=' + id + '" frameborder="0" width="100%" height=1200  scrolling="auto"></iframe></li>';
   
    var fid = "";
    $('#nav> ul').find("li").each(function () {
        if ($(this).attr('id') == ("tabHistroy" + id)) {
            fid = "tabHistroy" + id;
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

// 添加实时数据tab
function setShishiData(id, firstFlg) {
    if (firstFlg) {
        var strtab = '<li id="tabShishi" class="tab-2 active_tab" onclick="clickTab3()">实时数据</li>';
        var contentLi = '<li id="liShishi"  class="activeLi" ><iframe id="shishiIframe" src="Manager/BuoyDetail?id=' + id + '" frameborder="0" width="100%" scrolling="auto" onLoad="iframeLoad()"></iframe></li>';

        var fid = "";
        $('#nav> ul').find("li").each(function () {
            if ($(this).attr('id') == ("tabShishi")) {
                fid = "tabShishi";
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
           //
        }
    } else {
        document.getElementById("shishiIframe").src = "Manager/BuoyDetail?id=" + id ;
        clickTab3();
    }
    
}
function iframeLoad() {
    document.getElementById("shishiIframe").height = 0;
    var hh = document.getElementById("shishiIframe").contentWindow.document.documentElement.scrollHeight + 10;
    document.getElementById("shishiIframe").height = hh;
}
function Logout()
{
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "/Manager/Logout",
        success: function (response) {
            window.location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            window.location.reload();
        }
    });
}
function GetTime() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + "年" + month + "月" + strDate + "日"
            + " " + date.getHours() + ":" + date.getMinutes()
            + ":" + date.getSeconds();
    $("#currentTime")[0].innerHTML = currentdate;
}