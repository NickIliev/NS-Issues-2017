"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable = require("data/observable").Observable;
var observable_array_1 = require("data/observable-array");
var chart_1 = require("nativescript-telerik-ui-pro/chart");
var fetchModule = require("fetch");
var LabelModule = require("ui/label");
var grid_layout_1 = require("ui/layouts/grid-layout");
var http = require("http");
var pageData = new Observable();
var appSettings = require("application-settings");
var page;
var chart, allScoreChart, quantityActivityChart, scorePracticeChart, quantityPracticeChart;
var dataChart;
//appSettings.setString("TokenId", "1472A392-5003-475D-BDCF-4684BD30BD1A");
//appSettings.setString("StudentId", "70F6DC64-997C-4EFD-97D4-88BEE27831B6");
var baseUrl = appSettings.getString("baseUrl");
var studentId = appSettings.getString("StudentId");
var tokenId = appSettings.getString("TokenId");
var deviceId = appSettings.getString("DeviceId");
var linePalette = [];
linePalette.push('#d675d6');
linePalette.push('#b0bdb3');
linePalette.push('#003b65');
linePalette.push('#2bc5cc');
linePalette.push('#a25b58');
linePalette.push('#006699');
linePalette.push('#44094d');
linePalette.push('#ffff99');
var tmpLegendActivity = [];
var tmpLegendPractice = [];
function pageLoaded(args) {
    page = args.object;
    //alert(baseUrl);
    //// get chart element in page
    allScoreChart = page.getViewById('allScoreChart');
    //// activity chart
    chart = page.getViewById('cartesianChart');
    quantityActivityChart = page.getViewById('quantityActivityChart');
    //// practice chart
    scorePracticeChart = page.getViewById('scorePracticeChart');
    quantityPracticeChart = page.getViewById('quantityPracticeChart');
    ////loadChart();
    //load personal data
    getStudentDetail();
    //load data chart all score
    getAllScoreData();
    // load quantity activity chart
    getQuantityActivityData();
    // load score practice chart
    getScorePracticeData();
    // load quantity practice chart
    getQuantityPracticeData();
    //load chart data
    getScoreActivityData();
    page.bindingContext = pageData;
}
exports.pageLoaded = pageLoaded;
function getStudentDetail() {
    fetchModule.fetch(baseUrl + "/WebServices/MaxonetService.asmx/GetMaxonetParentReport", {
        method: "POST",
        headers: { 'Accept': 'application/json', "Content-Type": "application/json" },
        body: JSON.stringify({
            token: tokenId, deviceId: deviceId
        }),
        async: false
    }).then(function (response) {
        var str = JSON.stringify(response);
        var obj = JSON.parse(str);
        var str2 = JSON.parse(obj._bodyInit);
        var s = JSON.parse(str2.d);
        //alert(data.StudentName);
        //for (var i = 0; i < s.Subjects.length; i++) {
        //    var row = (i + 1);
        //    var lblSubject = page.getViewById("lblSubject" + row);
        //    lblSubject.text = s.Subjects[i].Name;
        //    var lblSubjectScore = page.getViewById("lblSubjectScore" + row);
        //    lblSubjectScore.text = s.Subjects[i].Result;
        //    var lblScoreTxt = page.getViewById("lblScoreTxt" + row);
        //    lblScoreTxt.visibility = "visible";
        //}
        var lblPercentResult = page.getViewById("PercentResult");
        lblPercentResult.text = "��ṹ����������� �Դ�� ������ " + s.TotalResult + "%";
        var lblStudentName = page.getViewById("lblStudentName");
        lblStudentName.text = s.StudentName;
        var lblNumberOfTimes = page.getViewById("lblNumberOfTimes");
        lblNumberOfTimes.text = s.NumberOfTimes;
        var lblTotalTime = page.getViewById("lblTotalTime");
        lblTotalTime.text = s.TotalTime;
        var lblWorkings = page.getViewById("lblWorkings");
        lblWorkings.text = s.Workings;
        var lblRecommend = page.getViewById("lblRecommend");
        lblRecommend.text = s.Recommend;
        /// Quantity
        var lblActivityQuantity = page.getViewById("lblActivityQuantity");
        lblActivityQuantity.text = s.ActivitiesQuantityPercentTxt;
        var lblPracticeQuantity = page.getViewById("lblPracticeQuantity");
        lblPracticeQuantity.text = s.PracticesQuantityPercentTxt;
        // show score activity
        var lblNoActivity = page.getViewById("lblNoActivity");
        if (s.ActivitiesQuiz.length == 0) {
            lblNoActivity.visibility = "visible";
        }
        else {
            for (var i = 0; i < s.ActivitiesQuiz.length; i++) {
                var row = (i + 1);
                var lblSubject = page.getViewById("lblSubjectActivity" + row);
                lblSubject.text = s.ActivitiesQuiz[i].Name + " " + s.ActivitiesQuiz[i].Percent + "%";
                lblSubject.visibility = "visible";
            }
            lblNoActivity.visibility = "collapsed";
        }
        // show score practice
        var lblNoPractice = page.getViewById("lblNoPractice");
        if (s.PracticesQuiz.length == 0) {
            lblNoPractice.visibility = "visible";
        }
        else {
            for (var i = 0; i < s.PracticesQuiz.length; i++) {
                var row = (i + 1);
                var lblSubject = page.getViewById("lblSubjectPractice" + row);
                lblSubject.text = s.PracticesQuiz[i].Name + " " + s.PracticesQuiz[i].Percent + "%";
                lblSubject.visibility = "visible";
            }
            lblNoPractice.visibility = "collapsed";
        }
    }, function (error) {
        alert(error);
    });
}
function getAllScoreData() {
    fetchModule.fetch(baseUrl + "/WebServices/MaxonetService.asmx/GetAllScoreData", {
        method: "POST",
        async: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: studentId })
    }).then(function (response) {
        var str = JSON.stringify(response);
        var obj = JSON.parse(str);
        var str2 = JSON.parse(obj._bodyInit);
        var data = JSON.parse(str2.d);
        dataChart = new observable_array_1.ObservableArray();
        var barSeries = new chart_1.BarSeries();
        barSeries.items = data;
        barSeries.categoryProperty = "subjectName";
        barSeries.valueProperty = "score";
        barSeries.showLabels = true;
        var pointLabelStyle = new chart_1.PointLabelStyle();
        pointLabelStyle.textFormat = "%.0f";
        pointLabelStyle.textSize = 14;
        barSeries.labelStyle = pointLabelStyle;
        dataChart.push(barSeries);
        allScoreChart.series = dataChart;
    }, function (error) {
        alert(error);
        console.log(JSON.stringify(error));
    });
}
function getQuantityActivityData() {
    fetchModule.fetch(baseUrl + "/WebServices/MaxonetService.asmx/GetQuantityActivityChartData", {
        method: "POST",
        async: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: studentId })
    }).then(function (response) {
        var str = JSON.stringify(response);
        var obj = JSON.parse(str);
        var str2 = JSON.parse(obj._bodyInit);
        var data = JSON.parse(str2.d);
        //alert(JSON.stringify(data));
        dataChart = new observable_array_1.ObservableArray();
        var barSeries = new chart_1.BarSeries();
        barSeries.items = data;
        barSeries.categoryProperty = "subjectName";
        barSeries.valueProperty = "amount";
        barSeries.showLabels = true;
        var pointLabelStyle = new chart_1.PointLabelStyle();
        pointLabelStyle.textFormat = "%.0f";
        pointLabelStyle.textSize = 14;
        barSeries.labelStyle = pointLabelStyle;
        dataChart.push(barSeries);
        quantityActivityChart.series = dataChart;
    }, function (error) {
        alert(error);
        console.log(JSON.stringify(error));
    });
}
function getQuantityPracticeData() {
    fetchModule.fetch(baseUrl + "/WebServices/MaxonetService.asmx/GetQuantityPracticeChartData", {
        method: "POST",
        async: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: studentId })
    }).then(function (response) {
        var str = JSON.stringify(response);
        var obj = JSON.parse(str);
        var str2 = JSON.parse(obj._bodyInit);
        var data = JSON.parse(str2.d);
        dataChart = new observable_array_1.ObservableArray();
        var barSeries = new chart_1.BarSeries();
        barSeries.items = data;
        barSeries.categoryProperty = "subjectName";
        barSeries.valueProperty = "amount";
        barSeries.showLabels = true;
        var pointLabelStyle = new chart_1.PointLabelStyle();
        pointLabelStyle.textFormat = "%.0f";
        pointLabelStyle.textSize = 14;
        barSeries.labelStyle = pointLabelStyle;
        dataChart.push(barSeries);
        quantityPracticeChart.series = dataChart;
    }, function (error) {
        alert(error);
        console.log(JSON.stringify(error));
    });
}
exports.getRequest = function () {
    //alert(1);
    //fetchModule.fetch("http://192.168.60.129:18615/WebServices/MaxonetService.asmx/GetActivityChartData", {
    //    method: "GET"
    //})
    //    .then(function (response) {
    //        alert({ title: "GET Response", message: JSON.stringify(response), okButtonText: "Close" });
    //    }, function (error) {
    //        console.log(JSON.stringify(error));
    //    });
    //alert(2);
    quantityActivityChart = page.getViewById('quantityActivityChart');
    var newseries = new observable_array_1.ObservableArray();
    chart.series = newseries;
};
exports.Refresh1 = function (args) {
    getAllScoreData();
};
exports.Refresh2 = function (args) {
    getScoreActivityData();
    getQuantityActivityData();
};
exports.Refresh3 = function (args) {
    getScorePracticeData();
    getQuantityPracticeData();
};
exports.postRequest = function (args) {
    //getChartData();
    //alert(1);
    var fullscreen = args.object.text.indexOf("(full-screen)") !== -1;
    page.showModal("modal-page", "context", function closeCallback(subjects, startDate, endDate) {
        if (subjects == "") {
            alert('��ͧ���͡���ҧ���� 1 �ԪҤ��');
            return 0;
        }
        else {
            //alert(subjects + '   ' + startDate + '   ' + endDate);
            //alert(subjects.toString());
            if (subjects != undefined) {
                var content = JSON.stringify({ studentId: studentId, subjects: subjects.toString(), startDate: startDate, endDate: endDate });
                getScoreActivityChartWithFilter(content);
            }
        }
    }, fullscreen);
};
// �͹������ filter ˹�Ҵ٤�ṹ�ͧ�֡��
exports.practicePostRequest = function (args) {
    var fullscreen = args.object.text.indexOf("(full-screen)") !== -1;
    page.showModal("modal-page", "context", function closeCallback(subjects, startDate, endDate) {
        if (subjects == "") {
            alert('��ͧ���͡���ҧ���� 1 �ԪҤ��');
            return 0;
        }
        else {
            if (subjects != undefined) {
                var content = JSON.stringify({ studentId: studentId, subjects: subjects.toString(), startDate: startDate, endDate: endDate });
                getScorePracticeChartWithFilter(content);
            }
        }
        //alert(2);
    }, fullscreen);
};
function getScoreActivityData() {
    fetchModule.fetch(baseUrl + "/WebServices/MaxonetService.asmx/GetScoreActivityChartData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        async: false,
        body: JSON.stringify({ studentId: studentId })
    })
        .then(function (response) {
        //alert({ title: "POST Response", message: JSON.stringify(response), okButtonText: "Close" });
        var str = JSON.stringify(response);
        var obj = JSON.parse(str);
        var str2 = JSON.parse(obj._bodyInit);
        var subject = JSON.parse(str2.d);
        //dataChart = new ObservableArray();
        //var legendLayout = page.getViewById('legendLayout');
        //for (var i = 0; i < subject.length; i++) {
        //    var gridLayout = new GridLayout();
        //    gridLayout.width = 15;
        //    gridLayout.height = 15;
        //    gridLayout.backgroundColor = linePalette[i];
        //    gridLayout.className = 'gridLegend';
        //    legendLayout.addChild(gridLayout);
        //    var label = new LabelModule.Label();
        //    label.text = subject[i].SubjectName;
        //    label.className = 'lblLegend';
        //    //alert(linePalette[i]);
        //    label.color = linePalette[i];
        //    legendLayout.addChild(label);
        //    tmpLegendActivity.push({ g: gridLayout, l: label });
        //    var newSeries = new LineSeries();
        //    newSeries.seriesName = "t" + i;
        //    newSeries.legendTitle = subject[i].SubjectName;
        //    newSeries.items = subject[i].Scores;
        //    newSeries.categoryProperty = "day";
        //    newSeries.valueProperty = "score";
        //    //newSeries.showLabels = "true";
        //    var pointLabelStyle = new PointLabelStyle();
        //    pointLabelStyle.textFormat = "%.0f";
        //    pointLabelStyle.textSize = 14;
        //    newSeries.labelStyle = pointLabelStyle;           
        //    dataChart.push(newSeries);
        //}
        //alert(JSON.stringify(subject));
        chart.series = reloadActivityChart(subject);
    }, function (error) {
        alert(error);
        console.log(JSON.stringify(error));
    });
}
function getScorePracticeData() {
    fetchModule.fetch(baseUrl + "/WebServices/MaxonetService.asmx/GetScorePracticeChartData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        async: false,
        body: JSON.stringify({ studentId: studentId })
    })
        .then(function (response) {
        //alert({ title: "POST Response", message: JSON.stringify(response), okButtonText: "Close" });
        var str = JSON.stringify(response);
        var obj = JSON.parse(str);
        var str2 = JSON.parse(obj._bodyInit);
        var subject = JSON.parse(str2.d);
        //var legendLayout2 = page.getViewById('legendLayout2');
        //dataChart = new ObservableArray();
        //for (var i = 0; i < subject.length; i++) {
        //    var gridLayout = new GridLayout();
        //    gridLayout.width = 15;
        //    gridLayout.height = 15;
        //    gridLayout.backgroundColor = linePalette[i];
        //    gridLayout.className = 'gridLegend';
        //    legendLayout2.addChild(gridLayout);
        //    var label = new LabelModule.Label();
        //    label.text = subject[i].SubjectName;
        //    label.className = 'lblLegend';
        //    label.color = linePalette[i];
        //    legendLayout2.addChild(label);
        //    var newSeries = new LineSeries();
        //    newSeries.seriesName = "t" + i;
        //    newSeries.legendTitle = subject[i].SubjectName;
        //    newSeries.items = subject[i].Scores;
        //    newSeries.categoryProperty = "day";
        //    newSeries.valueProperty = "score";
        //    var pointLabelStyle = new PointLabelStyle();
        //    pointLabelStyle.textFormat = "%.0f";
        //    pointLabelStyle.textSize = 14;
        //    newSeries.labelStyle = pointLabelStyle;
        //    dataChart.push(newSeries);
        //}
        scorePracticeChart.series = reloadPracticeChart(subject);
    }, function (error) {
        alert(error);
        console.log(JSON.stringify(error));
    });
}
function getScoreActivityChartWithFilter(content) {
    http.request({
        url: baseUrl + "/WebServices/MaxOnetService.asmx/GetScoreActivityByFilter",
        method: "POST",
        async: false,
        headers: { "Content-Type": "application/json" },
        content: content
    }).then(function (response) {
        var result = JSON.stringify(response);
        var r = response.content.toJSON();
        var subject = JSON.parse(r.d);
        //dataChart = new ObservableArray();
        //var legendLayout = page.getViewById('legendLayout');
        //for (var i = 0; i < tmpLegendActivity.length; i++) {
        //    legendLayout.removeChild(tmpLegendActivity[i].g);
        //    legendLayout.removeChild(tmpLegendActivity[i].l);
        //}
        //for (var i = 0; i < subject.length; i++) {
        //    var gridLayout = new GridLayout();
        //    gridLayout.width = 15;
        //    gridLayout.height = 15;
        //    gridLayout.backgroundColor = linePalette[i];
        //    gridLayout.className = 'gridLegend';
        //    legendLayout.addChild(gridLayout);
        //    var label = new LabelModule.Label();
        //    label.text = subject[i].SubjectName;
        //    label.className = 'lblLegend';
        //    //alert(linePalette[i]);
        //    label.color = linePalette[i];
        //    legendLayout.addChild(label);
        //    var newSeries = new LineSeries();
        //    newSeries.seriesName = "t" + i;
        //    newSeries.legendTitle = subject[i].SubjectName;
        //    newSeries.items = subject[i].Scores;
        //    newSeries.categoryProperty = "day";
        //    newSeries.valueProperty = "score";
        //    //newSeries.showLabels = "true";
        //    var pointLabelStyle = new PointLabelStyle();
        //    pointLabelStyle.textFormat = "%.0f";
        //    pointLabelStyle.textSize = 14;
        //    newSeries.labelStyle = pointLabelStyle;
        //    dataChart.push(newSeries);
        //}
        chart.series = reloadActivityChart(subject);
    });
}
// function �ʴ����㹡�ҿ��ṹ�֡����ѧ�ҡ���͡�������
function getScorePracticeChartWithFilter(content) {
    http.request({
        url: baseUrl + "/WebServices/MaxOnetService.asmx/GetScorePracticeByFilter",
        method: "POST",
        async: false,
        headers: { "Content-Type": "application/json" },
        content: content
    }).then(function (response) {
        var result = JSON.stringify(response);
        var r = response.content.toJSON();
        var subject = JSON.parse(r.d);
        scorePracticeChart.series = reloadPracticeChart(subject);
    });
}
//for (var key in subject) {
//    console.log(' name=' + key + ' value=' + obj[key]);
//}
//var allPropertyNames = Object.keys(subject);
//for (var j = 0; j < allPropertyNames.length; j++) {
//    var name = allPropertyNames[j];
//    var value = subject[name];
//    // Do something
//    console.log(subject[0].length);
//}           
//function postRequestFromServer(url, content) {
//    var data;
//    http.request({
//        url: url,
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        content: content
//    }).then(function (response) {
//        var result = JSON.stringify(response);
//        var r = response.content.toJSON();
//        var s = JSON.parse(r.d);
//        data = JSON.parse(r.d);
//        //alert(s);
//        console.log(data);
//        return s;
//        //s.jso
//        //alert(result);
//        //return result;
//    });
//    alert(data);
//    return data;
//}
function reloadActivityChart(subject) {
    var legendLayout = page.getViewById('legendLayout');
    //console.log('tmpLegendActivity = ' + tmpLegendActivity.length);
    // clear ���� array ����� �����Ԫ����
    for (var i = 0; i < tmpLegendActivity.length; i++) {
        legendLayout.removeChild(tmpLegendActivity[i].g);
        legendLayout.removeChild(tmpLegendActivity[i].l);
    }
    tmpLegendActivity = [];
    var result = new observable_array_1.ObservableArray();
    for (var i = 0; i < subject.length; i++) {
        //var gridLayout = new GridLayout();
        //gridLayout.width = 15;
        //gridLayout.height = 15;
        //gridLayout.backgroundColor = linePalette[i];
        //gridLayout.className = 'gridLegend';      
        //var label = new LabelModule.Label();
        //label.text = subject[i].SubjectName;
        //label.className = 'lblLegend';
        //label.color = linePalette[i];
        var color = linePalette[i];
        var subjectName = subject[i].SubjectName;
        var gridLayout = newGridLayout(color);
        var label = newLabel(subjectName, color);
        legendLayout.addChild(gridLayout);
        legendLayout.addChild(label);
        tmpLegendActivity.push({ g: gridLayout, l: label });
        for (var j = 0; j < subject[i].Scores.length; j++) {
            //var today = new Date();
            //var yesterday = new Date();
            //yesterday.setDate(today.getDate() + (j + 1));
            //subject[i].Scores[j].day = yesterday;
            var value = subject[i].Scores[j].day;
            var arrValue = value.split('-');
            //console.log("before ===> " + parseInt(arrValue[2]) + ", " + parseInt(arrValue[1]) + ", " + parseInt(arrValue[0]));
            var newDate = new Date(parseInt(arrValue[0]), parseInt(arrValue[1]) - 1, parseInt(arrValue[2]));
            //console.log(value);
            //console.log("===> " + newDate);
            subject[i].Scores[j].day = newDate;
        }
        var newSeries = new chart_1.LineSeries();
        newSeries.seriesName = "t" + i;
        newSeries.legendTitle = subjectName;
        //console.log(JSON.stringify(subject[i].Scores));
        newSeries.items = subject[i].Scores;
        newSeries.categoryProperty = "day";
        newSeries.valueProperty = "score";
        var pointLabelStyle = new chart_1.PointLabelStyle();
        pointLabelStyle.textFormat = "%.0f";
        pointLabelStyle.textSize = 14;
        newSeries.labelStyle = pointLabelStyle;
        result.push(newSeries);
    }
    return result;
}
function reloadPracticeChart(subject) {
    var legendLayout2 = page.getViewById('legendLayout2');
    // clear ���� array ����� �����Ԫ����
    for (var i = 0; i < tmpLegendPractice.length; i++) {
        legendLayout2.removeChild(tmpLegendPractice[i].g);
        legendLayout2.removeChild(tmpLegendPractice[i].l);
    }
    tmpLegendPractice = [];
    var result = new observable_array_1.ObservableArray();
    for (var i = 0; i < subject.length; i++) {
        var color = linePalette[i];
        var subjectName = subject[i].SubjectName;
        var gridLayout = newGridLayout(color);
        var label = newLabel(subjectName, color);
        legendLayout2.addChild(gridLayout);
        legendLayout2.addChild(label);
        tmpLegendPractice.push({ g: gridLayout, l: label });
        // chang string to date format
        for (var j = 0; j < subject[i].Scores.length; j++) {
            var value = subject[i].Scores[j].day;
            var arrValue = value.split('-');
            var newDate = new Date(parseInt(arrValue[0]), parseInt(arrValue[1]) - 1, parseInt(arrValue[2]));
            subject[i].Scores[j].day = newDate;
        }
        var newSeries = new chart_1.LineSeries();
        newSeries.seriesName = "t" + i;
        newSeries.legendTitle = subjectName;
        //console.log(JSON.stringify(subject[i].Scores));
        newSeries.items = subject[i].Scores;
        newSeries.categoryProperty = "day";
        newSeries.valueProperty = "score";
        var pointLabelStyle = new chart_1.PointLabelStyle();
        pointLabelStyle.textFormat = "%.0f";
        pointLabelStyle.textSize = 14;
        newSeries.labelStyle = pointLabelStyle;
        result.push(newSeries);
    }
    return result;
}
// function ���ҧ GridLayout Ŵ�����¹ code ��ӫ�͹
function newGridLayout(backgroundColor) {
    var gridLayout = new grid_layout_1.GridLayout();
    gridLayout.width = 15;
    gridLayout.height = 15;
    gridLayout.backgroundColor = backgroundColor;
    gridLayout.className = 'gridLegend';
    return gridLayout;
}
// function ���ҧ Label Ŵ�����¹ code ��ӫ�͹
function newLabel(subjectName, lineColor) {
    var label = new LabelModule.Label();
    label.text = subjectName;
    label.className = 'lblLegend';
    label.color = lineColor;
    return label;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ3ZELDBEQUFxRDtBQUVyRCwyREFBaUs7QUFDakssSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLHNDQUF3QztBQUN4QyxzREFBa0Q7QUFDbEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCLElBQUksUUFBUSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFDaEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFJLENBQUM7QUFDVCxJQUFJLEtBQUssRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLENBQUM7QUFDM0YsSUFBSSxTQUFTLENBQUM7QUFFZCwyRUFBMkU7QUFDM0UsNkVBQTZFO0FBRTdFLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0MsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuRCxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFakQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUIsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QixXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxD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LEVBQUUsQ0FBQztJQUN0QixVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUN2QixVQUFVLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUM3QyxVQUFVLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUNwQyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFDRCx5Q0FBeUM7QUFDekMsa0JBQWtCLFdBQVcsRUFBRSxTQUFTO0lBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BDLEtBQUssQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0lBQ3pCLEtBQUssQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO0lBQzlCLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYnNlcnZhYmxlID0gcmVxdWlyZShcImRhdGEvb2JzZXJ2YWJsZVwiKTtcbnZhciBPYnNlcnZhYmxlID0gcmVxdWlyZShcImRhdGEvb2JzZXJ2YWJsZVwiKS5PYnNlcnZhYmxlO1xuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIlxuaW1wb3J0IHBhZ2VzID0gcmVxdWlyZShcInVpL3BhZ2VcIik7XG5pbXBvcnQgeyBSYWRDYXJ0ZXNpYW5DaGFydCwgTGluZVNlcmllcywgQmFyU2VyaWVzLCBQb2ludExhYmVsU3R5bGUsIENoYXJ0TGVnZW5kUG9zaXRpb24sIFJhZExlZ2VuZFZpZXcsIENhcnRlc2lhbkF4aXMgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vY2hhcnQnO1xudmFyIGZldGNoTW9kdWxlID0gcmVxdWlyZShcImZldGNoXCIpO1xuaW1wb3J0ICogYXMgTGFiZWxNb2R1bGUgZnJvbSBcInVpL2xhYmVsXCI7XG5pbXBvcnQge0dyaWRMYXlvdXR9IGZyb20gXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG52YXIgcGFnZURhdGEgPSBuZXcgT2JzZXJ2YWJsZSgpO1xudmFyIGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG5sZXQgcGFnZTtcbmxldCBjaGFydCwgYWxsU2NvcmVDaGFydCwgcXVhbnRpdHlBY3Rpdml0eUNoYXJ0LCBzY29yZVByYWN0aWNlQ2hhcnQsIHF1YW50aXR5UHJhY3RpY2VDaGFydDtcbmxldCBkYXRhQ2hhcnQ7XG5cbi8vYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiVG9rZW5JZFwiLCBcIjE0NzJBMzkyLTUwMDMtNDc1RC1CRENGLTQ2ODRCRDMwQkQxQVwiKTtcbi8vYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiU3R1ZGVudElkXCIsIFwiNzBGNkRDNjQtOTk3Qy00RUZELTk3RDQtODhCRUUyNzgzMUI2XCIpO1xuXG52YXIgYmFzZVVybCA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcImJhc2VVcmxcIik7XG52YXIgc3R1ZGVudElkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwiU3R1ZGVudElkXCIpO1xudmFyIHRva2VuSWQgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJUb2tlbklkXCIpO1xudmFyIGRldmljZUlkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwiRGV2aWNlSWRcIik7XG5cbnZhciBsaW5lUGFsZXR0ZSA9IFtdO1xubGluZVBhbGV0dGUucHVzaCgnI2Q2NzVkNicpO1xubGluZVBhbGV0dGUucHVzaCgnI2IwYmRiMycpO1xubGluZVBhbGV0dGUucHVzaCgnIzAwM2I2NScpO1xubGluZVBhbGV0dGUucHVzaCgnIzJiYzVjYycpO1xubGluZVBhbGV0dGUucHVzaCgnI2EyNWI1OCcpO1xubGluZVBhbGV0dGUucHVzaCgnIzAwNjY5OScpO1xubGluZVBhbGV0dGUucHVzaCgnIzQ0MDk0ZCcpO1xubGluZVBhbGV0dGUucHVzaCgnI2ZmZmY5OScpO1xuXG52YXIgdG1wTGVnZW5kQWN0aXZpdHkgPSBbXTtcbnZhciB0bXBMZWdlbmRQcmFjdGljZSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFnZUxvYWRlZChhcmdzOiBvYnNlcnZhYmxlLkV2ZW50RGF0YSkge1xuICAgIHBhZ2UgPSA8cGFnZXMuUGFnZT5hcmdzLm9iamVjdDtcbiAgICAvL2FsZXJ0KGJhc2VVcmwpO1xuICAgIC8vLy8gZ2V0IGNoYXJ0IGVsZW1lbnQgaW4gcGFnZVxuICAgIGFsbFNjb3JlQ2hhcnQgPSA8UmFkQ2FydGVzaWFuQ2hhcnQ+cGFnZS5nZXRWaWV3QnlJZCgnYWxsU2NvcmVDaGFydCcpO1xuICAgIC8vLy8gYWN0aXZpdHkgY2hhcnRcbiAgICBjaGFydCA9IDxSYWRDYXJ0ZXNpYW5DaGFydD5wYWdlLmdldFZpZXdCeUlkKCdjYXJ0ZXNpYW5DaGFydCcpO1xuICAgIHF1YW50aXR5QWN0aXZpdHlDaGFydCA9IDxSYWRDYXJ0ZXNpYW5DaGFydD5wYWdlLmdldFZpZXdCeUlkKCdxdWFudGl0eUFjdGl2aXR5Q2hhcnQnKTtcbiAgICAvLy8vIHByYWN0aWNlIGNoYXJ0XG4gICAgc2NvcmVQcmFjdGljZUNoYXJ0ID0gPFJhZENhcnRlc2lhbkNoYXJ0PnBhZ2UuZ2V0Vmlld0J5SWQoJ3Njb3JlUHJhY3RpY2VDaGFydCcpO1xuICAgIHF1YW50aXR5UHJhY3RpY2VDaGFydCA9IDxSYWRDYXJ0ZXNpYW5DaGFydD5wYWdlLmdldFZpZXdCeUlkKCdxdWFudGl0eVByYWN0aWNlQ2hhcnQnKTtcbiAgICAvLy8vbG9hZENoYXJ0KCk7XG5cbiAgICAvL2xvYWQgcGVyc29uYWwgZGF0YVxuICAgIGdldFN0dWRlbnREZXRhaWwoKTtcblxuICAgIC8vbG9hZCBkYXRhIGNoYXJ0IGFsbCBzY29yZVxuICAgIGdldEFsbFNjb3JlRGF0YSgpO1xuXG4gICAgLy8gbG9hZCBxdWFudGl0eSBhY3Rpdml0eSBjaGFydFxuICAgIGdldFF1YW50aXR5QWN0aXZpdHlEYXRhKCk7XG5cbiAgICAvLyBsb2FkIHNjb3JlIHByYWN0aWNlIGNoYXJ0XG4gICAgZ2V0U2NvcmVQcmFjdGljZURhdGEoKTtcbiAgICAvLyBsb2FkIHF1YW50aXR5IHByYWN0aWNlIGNoYXJ0XG4gICAgZ2V0UXVhbnRpdHlQcmFjdGljZURhdGEoKTtcblxuICAgIC8vbG9hZCBjaGFydCBkYXRhXG4gICAgZ2V0U2NvcmVBY3Rpdml0eURhdGEoKTtcblxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBwYWdlRGF0YTtcbn1cblxuZnVuY3Rpb24gZ2V0U3R1ZGVudERldGFpbCgpIHsgICBcbiAgICBmZXRjaE1vZHVsZS5mZXRjaChiYXNlVXJsICsgXCIvV2ViU2VydmljZXMvTWF4b25ldFNlcnZpY2UuYXNteC9HZXRNYXhvbmV0UGFyZW50UmVwb3J0XCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogeyAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICB0b2tlbjogdG9rZW5JZCwgZGV2aWNlSWQ6IGRldmljZUlkXG4gICAgICAgIH0pLFxuICAgICAgICBhc3luYzogZmFsc2VcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpO1xuICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICB2YXIgc3RyMiA9IEpTT04ucGFyc2Uob2JqLl9ib2R5SW5pdCk7XG4gICAgICAgIHZhciBzID0gSlNPTi5wYXJzZShzdHIyLmQpO1xuXG4gICAgICAgIC8vYWxlcnQoZGF0YS5TdHVkZW50TmFtZSk7XG5cbiAgICAgICAgLy9mb3IgKHZhciBpID0gMDsgaSA8IHMuU3ViamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgdmFyIHJvdyA9IChpICsgMSk7XG4gICAgICAgIC8vICAgIHZhciBsYmxTdWJqZWN0ID0gcGFnZS5nZXRWaWV3QnlJZChcImxibFN1YmplY3RcIiArIHJvdyk7XG4gICAgICAgIC8vICAgIGxibFN1YmplY3QudGV4dCA9IHMuU3ViamVjdHNbaV0uTmFtZTtcbiAgICAgICAgLy8gICAgdmFyIGxibFN1YmplY3RTY29yZSA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJsYmxTdWJqZWN0U2NvcmVcIiArIHJvdyk7XG4gICAgICAgIC8vICAgIGxibFN1YmplY3RTY29yZS50ZXh0ID0gcy5TdWJqZWN0c1tpXS5SZXN1bHQ7XG4gICAgICAgIC8vICAgIHZhciBsYmxTY29yZVR4dCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJsYmxTY29yZVR4dFwiICsgcm93KTtcbiAgICAgICAgLy8gICAgbGJsU2NvcmVUeHQudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAvL31cblxuICAgICAgICB2YXIgbGJsUGVyY2VudFJlc3VsdCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJQZXJjZW50UmVzdWx0XCIpO1xuICAgICAgICBsYmxQZXJjZW50UmVzdWx0LnRleHQgPSBcIu+/ve+/veG5ue+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73UtO+/ve+/vSDvv73vv73vv73vv73vv73vv70gXCIgKyBzLlRvdGFsUmVzdWx0ICsgXCIlXCI7XG4gICAgICAgIHZhciBsYmxTdHVkZW50TmFtZSA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJsYmxTdHVkZW50TmFtZVwiKTtcbiAgICAgICAgbGJsU3R1ZGVudE5hbWUudGV4dCA9IHMuU3R1ZGVudE5hbWU7XG5cbiAgICAgICAgdmFyIGxibE51bWJlck9mVGltZXMgPSBwYWdlLmdldFZpZXdCeUlkKFwibGJsTnVtYmVyT2ZUaW1lc1wiKTtcbiAgICAgICAgbGJsTnVtYmVyT2ZUaW1lcy50ZXh0ID0gcy5OdW1iZXJPZlRpbWVzO1xuICAgICAgICB2YXIgbGJsVG90YWxUaW1lID0gcGFnZS5nZXRWaWV3QnlJZChcImxibFRvdGFsVGltZVwiKTtcbiAgICAgICAgbGJsVG90YWxUaW1lLnRleHQgPSBzLlRvdGFsVGltZTtcbiAgICAgICAgdmFyIGxibFdvcmtpbmdzID0gcGFnZS5nZXRWaWV3QnlJZChcImxibFdvcmtpbmdzXCIpO1xuICAgICAgICBsYmxXb3JraW5ncy50ZXh0ID0gcy5Xb3JraW5ncztcbiAgICAgICAgdmFyIGxibFJlY29tbWVuZCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJsYmxSZWNvbW1lbmRcIik7XG4gICAgICAgIGxibFJlY29tbWVuZC50ZXh0ID0gcy5SZWNvbW1lbmQ7XG5cbiAgICAgICAgLy8vIFF1YW50aXR5XG4gICAgICAgIHZhciBsYmxBY3Rpdml0eVF1YW50aXR5ID0gcGFnZS5nZXRWaWV3QnlJZChcImxibEFjdGl2aXR5UXVhbnRpdHlcIik7XG4gICAgICAgIGxibEFjdGl2aXR5UXVhbnRpdHkudGV4dCA9IHMuQWN0aXZpdGllc1F1YW50aXR5UGVyY2VudFR4dDtcbiAgICAgICAgdmFyIGxibFByYWN0aWNlUXVhbnRpdHkgPSBwYWdlLmdldFZpZXdCeUlkKFwibGJsUHJhY3RpY2VRdWFudGl0eVwiKTtcbiAgICAgICAgbGJsUHJhY3RpY2VRdWFudGl0eS50ZXh0ID0gcy5QcmFjdGljZXNRdWFudGl0eVBlcmNlbnRUeHQ7XG5cbiAgICAgICAgLy8gc2hvdyBzY29yZSBhY3Rpdml0eVxuICAgICAgICB2YXIgbGJsTm9BY3Rpdml0eSA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJsYmxOb0FjdGl2aXR5XCIpO1xuICAgICAgICBpZiAocy5BY3Rpdml0aWVzUXVpei5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgbGJsTm9BY3Rpdml0eS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuQWN0aXZpdGllc1F1aXoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gKGkgKyAxKTtcbiAgICAgICAgICAgICAgICB2YXIgbGJsU3ViamVjdCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJsYmxTdWJqZWN0QWN0aXZpdHlcIiArIHJvdyk7XG4gICAgICAgICAgICAgICAgbGJsU3ViamVjdC50ZXh0ID0gcy5BY3Rpdml0aWVzUXVpeltpXS5OYW1lICsgXCIgXCIgKyBzLkFjdGl2aXRpZXNRdWl6W2ldLlBlcmNlbnQgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICBsYmxTdWJqZWN0LnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxibE5vQWN0aXZpdHkudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VkXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaG93IHNjb3JlIHByYWN0aWNlXG4gICAgICAgIHZhciBsYmxOb1ByYWN0aWNlID0gcGFnZS5nZXRWaWV3QnlJZChcImxibE5vUHJhY3RpY2VcIik7XG4gICAgICAgIGlmIChzLlByYWN0aWNlc1F1aXoubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGxibE5vUHJhY3RpY2UudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLlByYWN0aWNlc1F1aXoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gKGkgKyAxKTtcbiAgICAgICAgICAgICAgICB2YXIgbGJsU3ViamVjdCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJsYmxTdWJqZWN0UHJhY3RpY2VcIiArIHJvdyk7XG4gICAgICAgICAgICAgICAgbGJsU3ViamVjdC50ZXh0ID0gcy5QcmFjdGljZXNRdWl6W2ldLk5hbWUgKyBcIiBcIiArIHMuUHJhY3RpY2VzUXVpeltpXS5QZXJjZW50ICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgbGJsU3ViamVjdC52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYmxOb1ByYWN0aWNlLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlZFwiO1xuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsU2NvcmVEYXRhKCkge1xuICAgIGZldGNoTW9kdWxlLmZldGNoKGJhc2VVcmwgKyBcIi9XZWJTZXJ2aWNlcy9NYXhvbmV0U2VydmljZS5hc214L0dldEFsbFNjb3JlRGF0YVwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgc3R1ZGVudElkOiBzdHVkZW50SWQgfSlcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpO1xuICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICB2YXIgc3RyMiA9IEpTT04ucGFyc2Uob2JqLl9ib2R5SW5pdCk7XG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShzdHIyLmQpO1xuXG4gICAgICAgIGRhdGFDaGFydCA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoKTtcbiAgICAgICAgdmFyIGJhclNlcmllcyA9IG5ldyBCYXJTZXJpZXMoKTtcbiAgICAgICAgYmFyU2VyaWVzLml0ZW1zID0gZGF0YTtcbiAgICAgICAgYmFyU2VyaWVzLmNhdGVnb3J5UHJvcGVydHkgPSBcInN1YmplY3ROYW1lXCI7XG4gICAgICAgIGJhclNlcmllcy52YWx1ZVByb3BlcnR5ID0gXCJzY29yZVwiO1xuICAgICAgICBiYXJTZXJpZXMuc2hvd0xhYmVscyA9IHRydWU7XG4gICAgICAgIHZhciBwb2ludExhYmVsU3R5bGUgPSBuZXcgUG9pbnRMYWJlbFN0eWxlKCk7XG4gICAgICAgIHBvaW50TGFiZWxTdHlsZS50ZXh0Rm9ybWF0ID0gXCIlLjBmXCI7XG4gICAgICAgIHBvaW50TGFiZWxTdHlsZS50ZXh0U2l6ZSA9IDE0O1xuICAgICAgICBiYXJTZXJpZXMubGFiZWxTdHlsZSA9IHBvaW50TGFiZWxTdHlsZTtcbiAgICAgICAgZGF0YUNoYXJ0LnB1c2goYmFyU2VyaWVzKTtcblxuICAgICAgICBhbGxTY29yZUNoYXJ0LnNlcmllcyA9IGRhdGFDaGFydDtcblxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gZ2V0UXVhbnRpdHlBY3Rpdml0eURhdGEoKSB7XG5cbiAgICBmZXRjaE1vZHVsZS5mZXRjaChiYXNlVXJsICsgXCIvV2ViU2VydmljZXMvTWF4b25ldFNlcnZpY2UuYXNteC9HZXRRdWFudGl0eUFjdGl2aXR5Q2hhcnREYXRhXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzdHVkZW50SWQ6IHN0dWRlbnRJZCB9KVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgIHZhciBzdHIyID0gSlNPTi5wYXJzZShvYmouX2JvZHlJbml0KTtcbiAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHN0cjIuZCk7XG4gICAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICBkYXRhQ2hhcnQgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgICAgIHZhciBiYXJTZXJpZXMgPSBuZXcgQmFyU2VyaWVzKCk7XG4gICAgICAgIGJhclNlcmllcy5pdGVtcyA9IGRhdGE7XG4gICAgICAgIGJhclNlcmllcy5jYXRlZ29yeVByb3BlcnR5ID0gXCJzdWJqZWN0TmFtZVwiO1xuICAgICAgICBiYXJTZXJpZXMudmFsdWVQcm9wZXJ0eSA9IFwiYW1vdW50XCI7XG4gICAgICAgIGJhclNlcmllcy5zaG93TGFiZWxzID0gdHJ1ZTtcblxuICAgICAgICB2YXIgcG9pbnRMYWJlbFN0eWxlID0gbmV3IFBvaW50TGFiZWxTdHlsZSgpO1xuICAgICAgICBwb2ludExhYmVsU3R5bGUudGV4dEZvcm1hdCA9IFwiJS4wZlwiO1xuICAgICAgICBwb2ludExhYmVsU3R5bGUudGV4dFNpemUgPSAxNDtcbiAgICAgICAgYmFyU2VyaWVzLmxhYmVsU3R5bGUgPSBwb2ludExhYmVsU3R5bGU7XG5cbiAgICAgICAgZGF0YUNoYXJ0LnB1c2goYmFyU2VyaWVzKTtcblxuICAgICAgICBxdWFudGl0eUFjdGl2aXR5Q2hhcnQuc2VyaWVzID0gZGF0YUNoYXJ0O1xuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgfSk7XG5cblxufVxuXG5mdW5jdGlvbiBnZXRRdWFudGl0eVByYWN0aWNlRGF0YSgpIHtcbiAgICBmZXRjaE1vZHVsZS5mZXRjaChiYXNlVXJsICsgXCIvV2ViU2VydmljZXMvTWF4b25ldFNlcnZpY2UuYXNteC9HZXRRdWFudGl0eVByYWN0aWNlQ2hhcnREYXRhXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzdHVkZW50SWQ6IHN0dWRlbnRJZCB9KVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgIHZhciBzdHIyID0gSlNPTi5wYXJzZShvYmouX2JvZHlJbml0KTtcbiAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHN0cjIuZCk7XG5cbiAgICAgICAgZGF0YUNoYXJ0ID0gbmV3IE9ic2VydmFibGVBcnJheSgpO1xuICAgICAgICB2YXIgYmFyU2VyaWVzID0gbmV3IEJhclNlcmllcygpO1xuICAgICAgICBiYXJTZXJpZXMuaXRlbXMgPSBkYXRhO1xuICAgICAgICBiYXJTZXJpZXMuY2F0ZWdvcnlQcm9wZXJ0eSA9IFwic3ViamVjdE5hbWVcIjtcbiAgICAgICAgYmFyU2VyaWVzLnZhbHVlUHJvcGVydHkgPSBcImFtb3VudFwiO1xuICAgICAgICBiYXJTZXJpZXMuc2hvd0xhYmVscyA9IHRydWU7XG5cbiAgICAgICAgdmFyIHBvaW50TGFiZWxTdHlsZSA9IG5ldyBQb2ludExhYmVsU3R5bGUoKTtcbiAgICAgICAgcG9pbnRMYWJlbFN0eWxlLnRleHRGb3JtYXQgPSBcIiUuMGZcIjtcbiAgICAgICAgcG9pbnRMYWJlbFN0eWxlLnRleHRTaXplID0gMTQ7XG4gICAgICAgIGJhclNlcmllcy5sYWJlbFN0eWxlID0gcG9pbnRMYWJlbFN0eWxlO1xuXG4gICAgICAgIGRhdGFDaGFydC5wdXNoKGJhclNlcmllcyk7XG5cbiAgICAgICAgcXVhbnRpdHlQcmFjdGljZUNoYXJ0LnNlcmllcyA9IGRhdGFDaGFydDtcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH0pO1xufVxuXG5leHBvcnRzLmdldFJlcXVlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy9hbGVydCgxKTtcbiAgICAvL2ZldGNoTW9kdWxlLmZldGNoKFwiaHR0cDovLzE5Mi4xNjguNjAuMTI5OjE4NjE1L1dlYlNlcnZpY2VzL01heG9uZXRTZXJ2aWNlLmFzbXgvR2V0QWN0aXZpdHlDaGFydERhdGFcIiwge1xuICAgIC8vICAgIG1ldGhvZDogXCJHRVRcIlxuICAgIC8vfSlcbiAgICAvLyAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAvLyAgICAgICAgYWxlcnQoeyB0aXRsZTogXCJHRVQgUmVzcG9uc2VcIiwgbWVzc2FnZTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpLCBva0J1dHRvblRleHQ6IFwiQ2xvc2VcIiB9KTtcbiAgICAvLyAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAvLyAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAvLyAgICB9KTtcbiAgICAvL2FsZXJ0KDIpO1xuXG5cbiAgICBxdWFudGl0eUFjdGl2aXR5Q2hhcnQgPSA8UmFkQ2FydGVzaWFuQ2hhcnQ+cGFnZS5nZXRWaWV3QnlJZCgncXVhbnRpdHlBY3Rpdml0eUNoYXJ0Jyk7XG4gICAgdmFyIG5ld3NlcmllcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoKTtcblxuICAgIGNoYXJ0LnNlcmllcyA9IG5ld3Nlcmllcztcbn07XG5cbmV4cG9ydHMuUmVmcmVzaDEgPSBmdW5jdGlvbiAoYXJnczogb2JzZXJ2YWJsZS5FdmVudERhdGEpIHtcbiAgICBnZXRBbGxTY29yZURhdGEoKTtcbn07XG5leHBvcnRzLlJlZnJlc2gyID0gZnVuY3Rpb24gKGFyZ3M6IG9ic2VydmFibGUuRXZlbnREYXRhKSB7XG4gICAgZ2V0U2NvcmVBY3Rpdml0eURhdGEoKTtcbiAgICBnZXRRdWFudGl0eUFjdGl2aXR5RGF0YSgpO1xufTtcbmV4cG9ydHMuUmVmcmVzaDMgPSBmdW5jdGlvbiAoYXJnczogb2JzZXJ2YWJsZS5FdmVudERhdGEpIHtcbiAgICBnZXRTY29yZVByYWN0aWNlRGF0YSgpOyAgICBcbiAgICBnZXRRdWFudGl0eVByYWN0aWNlRGF0YSgpO1xufTtcblxuZXhwb3J0cy5wb3N0UmVxdWVzdCA9IGZ1bmN0aW9uIChhcmdzOiBvYnNlcnZhYmxlLkV2ZW50RGF0YSkge1xuICAgIC8vZ2V0Q2hhcnREYXRhKCk7XG4gICAgLy9hbGVydCgxKTtcbiAgICB2YXIgZnVsbHNjcmVlbiA9ICg8YW55PmFyZ3Mub2JqZWN0KS50ZXh0LmluZGV4T2YoXCIoZnVsbC1zY3JlZW4pXCIpICE9PSAtMTtcbiAgICBwYWdlLnNob3dNb2RhbChcIm1vZGFsLXBhZ2VcIiwgXCJjb250ZXh0XCIsIGZ1bmN0aW9uIGNsb3NlQ2FsbGJhY2soc3ViamVjdHMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgICAgICBpZiAoc3ViamVjdHMgPT0gXCJcIikge1xuICAgICAgICAgICAgYWxlcnQoJ++/ve+/vc2n77+977+977+9zaHvv73vv73vv73Sp++/ve+/ve+/ve+/vSAxIO+/vdSq0qTvv73vv70nKTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9hbGVydChzdWJqZWN0cyArICcgICAnICsgc3RhcnREYXRlICsgJyAgICcgKyBlbmREYXRlKTtcbiAgICAgICAgICAgIC8vYWxlcnQoc3ViamVjdHMudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBpZiAoc3ViamVjdHMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7IHN0dWRlbnRJZDogc3R1ZGVudElkLCBzdWJqZWN0czogc3ViamVjdHMudG9TdHJpbmcoKSwgc3RhcnREYXRlOiBzdGFydERhdGUsIGVuZERhdGU6IGVuZERhdGUgfSk7XG4gICAgICAgICAgICAgICAgZ2V0U2NvcmVBY3Rpdml0eUNoYXJ0V2l0aEZpbHRlcihjb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSwgZnVsbHNjcmVlbik7XG59XG5cbi8vIO+/vc2577+977+977+977+977+977+9IGZpbHRlciDLue+/vdK02aTvv73hubnvv73Np++/vdah77+977+9XG5leHBvcnRzLnByYWN0aWNlUG9zdFJlcXVlc3QgPSBmdW5jdGlvbiAoYXJnczogb2JzZXJ2YWJsZS5FdmVudERhdGEpIHtcbiAgICB2YXIgZnVsbHNjcmVlbiA9ICg8YW55PmFyZ3Mub2JqZWN0KS50ZXh0LmluZGV4T2YoXCIoZnVsbC1zY3JlZW4pXCIpICE9PSAtMTtcbiAgICBwYWdlLnNob3dNb2RhbChcIm1vZGFsLXBhZ2VcIiwgXCJjb250ZXh0XCIsIGZ1bmN0aW9uIGNsb3NlQ2FsbGJhY2soc3ViamVjdHMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgICAgICBpZiAoc3ViamVjdHMgPT0gXCJcIikge1xuICAgICAgICAgICAgYWxlcnQoJ++/ve+/vc2n77+977+977+9zaHvv73vv73vv73Sp++/ve+/ve+/ve+/vSAxIO+/vdSq0qTvv73vv70nKTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHN1YmplY3RzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoeyBzdHVkZW50SWQ6IHN0dWRlbnRJZCwgc3ViamVjdHM6IHN1YmplY3RzLnRvU3RyaW5nKCksIHN0YXJ0RGF0ZTogc3RhcnREYXRlLCBlbmREYXRlOiBlbmREYXRlIH0pO1xuICAgICAgICAgICAgICAgIGdldFNjb3JlUHJhY3RpY2VDaGFydFdpdGhGaWx0ZXIoY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9hbGVydCgyKTtcbiAgICB9LCBmdWxsc2NyZWVuKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NvcmVBY3Rpdml0eURhdGEoKSB7XG4gICAgZmV0Y2hNb2R1bGUuZmV0Y2goYmFzZVVybCArIFwiL1dlYlNlcnZpY2VzL01heG9uZXRTZXJ2aWNlLmFzbXgvR2V0U2NvcmVBY3Rpdml0eUNoYXJ0RGF0YVwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHN0dWRlbnRJZDogc3R1ZGVudElkIH0pXG4gICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvL2FsZXJ0KHsgdGl0bGU6IFwiUE9TVCBSZXNwb25zZVwiLCBtZXNzYWdlOiBKU09OLnN0cmluZ2lmeShyZXNwb25zZSksIG9rQnV0dG9uVGV4dDogXCJDbG9zZVwiIH0pO1xuICAgICAgICAgICAgdmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgICAgICB2YXIgc3RyMiA9IEpTT04ucGFyc2Uob2JqLl9ib2R5SW5pdCk7XG4gICAgICAgICAgICB2YXIgc3ViamVjdCA9IEpTT04ucGFyc2Uoc3RyMi5kKTtcblxuICAgICAgICAgICAgLy9kYXRhQ2hhcnQgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICAgICAgICAgIC8vdmFyIGxlZ2VuZExheW91dCA9IHBhZ2UuZ2V0Vmlld0J5SWQoJ2xlZ2VuZExheW91dCcpO1xuXG4gICAgICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgc3ViamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gICAgdmFyIGdyaWRMYXlvdXQgPSBuZXcgR3JpZExheW91dCgpO1xuICAgICAgICAgICAgLy8gICAgZ3JpZExheW91dC53aWR0aCA9IDE1O1xuICAgICAgICAgICAgLy8gICAgZ3JpZExheW91dC5oZWlnaHQgPSAxNTtcbiAgICAgICAgICAgIC8vICAgIGdyaWRMYXlvdXQuYmFja2dyb3VuZENvbG9yID0gbGluZVBhbGV0dGVbaV07XG4gICAgICAgICAgICAvLyAgICBncmlkTGF5b3V0LmNsYXNzTmFtZSA9ICdncmlkTGVnZW5kJztcbiAgICAgICAgICAgIC8vICAgIGxlZ2VuZExheW91dC5hZGRDaGlsZChncmlkTGF5b3V0KTtcblxuICAgICAgICAgICAgLy8gICAgdmFyIGxhYmVsID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XG4gICAgICAgICAgICAvLyAgICBsYWJlbC50ZXh0ID0gc3ViamVjdFtpXS5TdWJqZWN0TmFtZTtcbiAgICAgICAgICAgIC8vICAgIGxhYmVsLmNsYXNzTmFtZSA9ICdsYmxMZWdlbmQnO1xuICAgICAgICAgICAgLy8gICAgLy9hbGVydChsaW5lUGFsZXR0ZVtpXSk7XG4gICAgICAgICAgICAvLyAgICBsYWJlbC5jb2xvciA9IGxpbmVQYWxldHRlW2ldO1xuICAgICAgICAgICAgLy8gICAgbGVnZW5kTGF5b3V0LmFkZENoaWxkKGxhYmVsKTtcblxuICAgICAgICAgICAgLy8gICAgdG1wTGVnZW5kQWN0aXZpdHkucHVzaCh7IGc6IGdyaWRMYXlvdXQsIGw6IGxhYmVsIH0pO1xuXG4gICAgICAgICAgICAvLyAgICB2YXIgbmV3U2VyaWVzID0gbmV3IExpbmVTZXJpZXMoKTtcbiAgICAgICAgICAgIC8vICAgIG5ld1Nlcmllcy5zZXJpZXNOYW1lID0gXCJ0XCIgKyBpO1xuICAgICAgICAgICAgLy8gICAgbmV3U2VyaWVzLmxlZ2VuZFRpdGxlID0gc3ViamVjdFtpXS5TdWJqZWN0TmFtZTtcblxuICAgICAgICAgICAgLy8gICAgbmV3U2VyaWVzLml0ZW1zID0gc3ViamVjdFtpXS5TY29yZXM7XG4gICAgICAgICAgICAvLyAgICBuZXdTZXJpZXMuY2F0ZWdvcnlQcm9wZXJ0eSA9IFwiZGF5XCI7XG4gICAgICAgICAgICAvLyAgICBuZXdTZXJpZXMudmFsdWVQcm9wZXJ0eSA9IFwic2NvcmVcIjtcblxuICAgICAgICAgICAgLy8gICAgLy9uZXdTZXJpZXMuc2hvd0xhYmVscyA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgLy8gICAgdmFyIHBvaW50TGFiZWxTdHlsZSA9IG5ldyBQb2ludExhYmVsU3R5bGUoKTtcbiAgICAgICAgICAgIC8vICAgIHBvaW50TGFiZWxTdHlsZS50ZXh0Rm9ybWF0ID0gXCIlLjBmXCI7XG4gICAgICAgICAgICAvLyAgICBwb2ludExhYmVsU3R5bGUudGV4dFNpemUgPSAxNDtcbiAgICAgICAgICAgIC8vICAgIG5ld1Nlcmllcy5sYWJlbFN0eWxlID0gcG9pbnRMYWJlbFN0eWxlOyAgICAgICAgICAgXG5cbiAgICAgICAgICAgIC8vICAgIGRhdGFDaGFydC5wdXNoKG5ld1Nlcmllcyk7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vYWxlcnQoSlNPTi5zdHJpbmdpZnkoc3ViamVjdCkpO1xuICAgICAgICAgICAgY2hhcnQuc2VyaWVzID0gcmVsb2FkQWN0aXZpdHlDaGFydChzdWJqZWN0KTtcblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGdldFNjb3JlUHJhY3RpY2VEYXRhKCkge1xuICAgIGZldGNoTW9kdWxlLmZldGNoKGJhc2VVcmwgKyBcIi9XZWJTZXJ2aWNlcy9NYXhvbmV0U2VydmljZS5hc214L0dldFNjb3JlUHJhY3RpY2VDaGFydERhdGFcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzdHVkZW50SWQ6IHN0dWRlbnRJZCB9KVxuICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgLy9hbGVydCh7IHRpdGxlOiBcIlBPU1QgUmVzcG9uc2VcIiwgbWVzc2FnZTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpLCBva0J1dHRvblRleHQ6IFwiQ2xvc2VcIiB9KTtcbiAgICAgICAgICAgIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICAgICAgdmFyIHN0cjIgPSBKU09OLnBhcnNlKG9iai5fYm9keUluaXQpO1xuICAgICAgICAgICAgdmFyIHN1YmplY3QgPSBKU09OLnBhcnNlKHN0cjIuZCk7XG5cbiAgICAgICAgICAgIC8vdmFyIGxlZ2VuZExheW91dDIgPSBwYWdlLmdldFZpZXdCeUlkKCdsZWdlbmRMYXlvdXQyJyk7XG4gICAgICAgICAgICAvL2RhdGFDaGFydCA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoKTtcblxuICAgICAgICAgICAgLy9mb3IgKHZhciBpID0gMDsgaSA8IHN1YmplY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vICAgIHZhciBncmlkTGF5b3V0ID0gbmV3IEdyaWRMYXlvdXQoKTtcbiAgICAgICAgICAgIC8vICAgIGdyaWRMYXlvdXQud2lkdGggPSAxNTtcbiAgICAgICAgICAgIC8vICAgIGdyaWRMYXlvdXQuaGVpZ2h0ID0gMTU7XG4gICAgICAgICAgICAvLyAgICBncmlkTGF5b3V0LmJhY2tncm91bmRDb2xvciA9IGxpbmVQYWxldHRlW2ldO1xuICAgICAgICAgICAgLy8gICAgZ3JpZExheW91dC5jbGFzc05hbWUgPSAnZ3JpZExlZ2VuZCc7XG4gICAgICAgICAgICAvLyAgICBsZWdlbmRMYXlvdXQyLmFkZENoaWxkKGdyaWRMYXlvdXQpO1xuXG4gICAgICAgICAgICAvLyAgICB2YXIgbGFiZWwgPSBuZXcgTGFiZWxNb2R1bGUuTGFiZWwoKTtcbiAgICAgICAgICAgIC8vICAgIGxhYmVsLnRleHQgPSBzdWJqZWN0W2ldLlN1YmplY3ROYW1lO1xuICAgICAgICAgICAgLy8gICAgbGFiZWwuY2xhc3NOYW1lID0gJ2xibExlZ2VuZCc7XG4gICAgICAgICAgICAvLyAgICBsYWJlbC5jb2xvciA9IGxpbmVQYWxldHRlW2ldO1xuICAgICAgICAgICAgLy8gICAgbGVnZW5kTGF5b3V0Mi5hZGRDaGlsZChsYWJlbCk7XG5cbiAgICAgICAgICAgIC8vICAgIHZhciBuZXdTZXJpZXMgPSBuZXcgTGluZVNlcmllcygpO1xuICAgICAgICAgICAgLy8gICAgbmV3U2VyaWVzLnNlcmllc05hbWUgPSBcInRcIiArIGk7XG4gICAgICAgICAgICAvLyAgICBuZXdTZXJpZXMubGVnZW5kVGl0bGUgPSBzdWJqZWN0W2ldLlN1YmplY3ROYW1lO1xuXG4gICAgICAgICAgICAvLyAgICBuZXdTZXJpZXMuaXRlbXMgPSBzdWJqZWN0W2ldLlNjb3JlcztcbiAgICAgICAgICAgIC8vICAgIG5ld1Nlcmllcy5jYXRlZ29yeVByb3BlcnR5ID0gXCJkYXlcIjtcbiAgICAgICAgICAgIC8vICAgIG5ld1Nlcmllcy52YWx1ZVByb3BlcnR5ID0gXCJzY29yZVwiO1xuXG4gICAgICAgICAgICAvLyAgICB2YXIgcG9pbnRMYWJlbFN0eWxlID0gbmV3IFBvaW50TGFiZWxTdHlsZSgpO1xuICAgICAgICAgICAgLy8gICAgcG9pbnRMYWJlbFN0eWxlLnRleHRGb3JtYXQgPSBcIiUuMGZcIjtcbiAgICAgICAgICAgIC8vICAgIHBvaW50TGFiZWxTdHlsZS50ZXh0U2l6ZSA9IDE0O1xuXG4gICAgICAgICAgICAvLyAgICBuZXdTZXJpZXMubGFiZWxTdHlsZSA9IHBvaW50TGFiZWxTdHlsZTtcblxuICAgICAgICAgICAgLy8gICAgZGF0YUNoYXJ0LnB1c2gobmV3U2VyaWVzKTtcbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICBzY29yZVByYWN0aWNlQ2hhcnQuc2VyaWVzID0gcmVsb2FkUHJhY3RpY2VDaGFydChzdWJqZWN0KTtcblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRTY29yZUFjdGl2aXR5Q2hhcnRXaXRoRmlsdGVyKGNvbnRlbnQpIHtcbiAgICBodHRwLnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGJhc2VVcmwgKyBcIi9XZWJTZXJ2aWNlcy9NYXhPbmV0U2VydmljZS5hc214L0dldFNjb3JlQWN0aXZpdHlCeUZpbHRlclwiLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgY29udGVudDogY29udGVudFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgIHZhciByID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKTtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBKU09OLnBhcnNlKHIuZCk7XG5cbiAgICAgICAgLy9kYXRhQ2hhcnQgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICAgICAgLy92YXIgbGVnZW5kTGF5b3V0ID0gcGFnZS5nZXRWaWV3QnlJZCgnbGVnZW5kTGF5b3V0Jyk7XG4gICAgICAgIC8vZm9yICh2YXIgaSA9IDA7IGkgPCB0bXBMZWdlbmRBY3Rpdml0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICBsZWdlbmRMYXlvdXQucmVtb3ZlQ2hpbGQodG1wTGVnZW5kQWN0aXZpdHlbaV0uZyk7XG4gICAgICAgIC8vICAgIGxlZ2VuZExheW91dC5yZW1vdmVDaGlsZCh0bXBMZWdlbmRBY3Rpdml0eVtpXS5sKTtcbiAgICAgICAgLy99XG5cbiAgICAgICAgLy9mb3IgKHZhciBpID0gMDsgaSA8IHN1YmplY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgdmFyIGdyaWRMYXlvdXQgPSBuZXcgR3JpZExheW91dCgpO1xuICAgICAgICAvLyAgICBncmlkTGF5b3V0LndpZHRoID0gMTU7XG4gICAgICAgIC8vICAgIGdyaWRMYXlvdXQuaGVpZ2h0ID0gMTU7XG4gICAgICAgIC8vICAgIGdyaWRMYXlvdXQuYmFja2dyb3VuZENvbG9yID0gbGluZVBhbGV0dGVbaV07XG4gICAgICAgIC8vICAgIGdyaWRMYXlvdXQuY2xhc3NOYW1lID0gJ2dyaWRMZWdlbmQnO1xuICAgICAgICAvLyAgICBsZWdlbmRMYXlvdXQuYWRkQ2hpbGQoZ3JpZExheW91dCk7XG5cbiAgICAgICAgLy8gICAgdmFyIGxhYmVsID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XG4gICAgICAgIC8vICAgIGxhYmVsLnRleHQgPSBzdWJqZWN0W2ldLlN1YmplY3ROYW1lO1xuICAgICAgICAvLyAgICBsYWJlbC5jbGFzc05hbWUgPSAnbGJsTGVnZW5kJztcbiAgICAgICAgLy8gICAgLy9hbGVydChsaW5lUGFsZXR0ZVtpXSk7XG4gICAgICAgIC8vICAgIGxhYmVsLmNvbG9yID0gbGluZVBhbGV0dGVbaV07XG4gICAgICAgIC8vICAgIGxlZ2VuZExheW91dC5hZGRDaGlsZChsYWJlbCk7XG5cbiAgICAgICAgLy8gICAgdmFyIG5ld1NlcmllcyA9IG5ldyBMaW5lU2VyaWVzKCk7XG4gICAgICAgIC8vICAgIG5ld1Nlcmllcy5zZXJpZXNOYW1lID0gXCJ0XCIgKyBpO1xuICAgICAgICAvLyAgICBuZXdTZXJpZXMubGVnZW5kVGl0bGUgPSBzdWJqZWN0W2ldLlN1YmplY3ROYW1lO1xuXG4gICAgICAgIC8vICAgIG5ld1Nlcmllcy5pdGVtcyA9IHN1YmplY3RbaV0uU2NvcmVzO1xuICAgICAgICAvLyAgICBuZXdTZXJpZXMuY2F0ZWdvcnlQcm9wZXJ0eSA9IFwiZGF5XCI7XG4gICAgICAgIC8vICAgIG5ld1Nlcmllcy52YWx1ZVByb3BlcnR5ID0gXCJzY29yZVwiO1xuXG4gICAgICAgIC8vICAgIC8vbmV3U2VyaWVzLnNob3dMYWJlbHMgPSBcInRydWVcIjtcbiAgICAgICAgLy8gICAgdmFyIHBvaW50TGFiZWxTdHlsZSA9IG5ldyBQb2ludExhYmVsU3R5bGUoKTtcbiAgICAgICAgLy8gICAgcG9pbnRMYWJlbFN0eWxlLnRleHRGb3JtYXQgPSBcIiUuMGZcIjtcbiAgICAgICAgLy8gICAgcG9pbnRMYWJlbFN0eWxlLnRleHRTaXplID0gMTQ7XG5cbiAgICAgICAgLy8gICAgbmV3U2VyaWVzLmxhYmVsU3R5bGUgPSBwb2ludExhYmVsU3R5bGU7XG5cbiAgICAgICAgLy8gICAgZGF0YUNoYXJ0LnB1c2gobmV3U2VyaWVzKTtcbiAgICAgICAgLy99XG5cbiAgICAgICAgY2hhcnQuc2VyaWVzID0gcmVsb2FkQWN0aXZpdHlDaGFydChzdWJqZWN0KTtcbiAgICB9KTtcbn1cblxuLy8gZnVuY3Rpb24g77+9yrTvv73vv73vv73vv73juaHvv73Sv++/ve+/veG5ue+/vdah77+977+977+977+90afvv73Soe+/ve+/ve+/vc2h77+977+977+977+977+977+977+9XG5mdW5jdGlvbiBnZXRTY29yZVByYWN0aWNlQ2hhcnRXaXRoRmlsdGVyKGNvbnRlbnQpIHtcbiAgICBodHRwLnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGJhc2VVcmwgKyBcIi9XZWJTZXJ2aWNlcy9NYXhPbmV0U2VydmljZS5hc214L0dldFNjb3JlUHJhY3RpY2VCeUZpbHRlclwiLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgY29udGVudDogY29udGVudFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgIHZhciByID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKTtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBKU09OLnBhcnNlKHIuZCk7XG4gICAgICAgIHNjb3JlUHJhY3RpY2VDaGFydC5zZXJpZXMgPSByZWxvYWRQcmFjdGljZUNoYXJ0KHN1YmplY3QpO1xuICAgIH0pO1xufVxuXG4vL2ZvciAodmFyIGtleSBpbiBzdWJqZWN0KSB7XG4vLyAgICBjb25zb2xlLmxvZygnIG5hbWU9JyArIGtleSArICcgdmFsdWU9JyArIG9ialtrZXldKTtcbi8vfVxuXG4vL3ZhciBhbGxQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmtleXMoc3ViamVjdCk7XG4vL2ZvciAodmFyIGogPSAwOyBqIDwgYWxsUHJvcGVydHlOYW1lcy5sZW5ndGg7IGorKykge1xuLy8gICAgdmFyIG5hbWUgPSBhbGxQcm9wZXJ0eU5hbWVzW2pdO1xuLy8gICAgdmFyIHZhbHVlID0gc3ViamVjdFtuYW1lXTtcbi8vICAgIC8vIERvIHNvbWV0aGluZ1xuLy8gICAgY29uc29sZS5sb2coc3ViamVjdFswXS5sZW5ndGgpO1xuLy99ICAgICAgICAgICBcblxuLy9mdW5jdGlvbiBwb3N0UmVxdWVzdEZyb21TZXJ2ZXIodXJsLCBjb250ZW50KSB7XG4vLyAgICB2YXIgZGF0YTtcbi8vICAgIGh0dHAucmVxdWVzdCh7XG4vLyAgICAgICAgdXJsOiB1cmwsXG4vLyAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbi8vICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4vLyAgICAgICAgY29udGVudDogY29udGVudFxuLy8gICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpO1xuLy8gICAgICAgIHZhciByID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKTtcbi8vICAgICAgICB2YXIgcyA9IEpTT04ucGFyc2Uoci5kKTtcbi8vICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShyLmQpO1xuLy8gICAgICAgIC8vYWxlcnQocyk7XG4vLyAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgcmV0dXJuIHM7XG4vLyAgICAgICAgLy9zLmpzb1xuLy8gICAgICAgIC8vYWxlcnQocmVzdWx0KTtcbi8vICAgICAgICAvL3JldHVybiByZXN1bHQ7XG4vLyAgICB9KTtcbi8vICAgIGFsZXJ0KGRhdGEpO1xuLy8gICAgcmV0dXJuIGRhdGE7XG4vL31cblxuXG5mdW5jdGlvbiByZWxvYWRBY3Rpdml0eUNoYXJ0KHN1YmplY3QpIHtcbiAgICB2YXIgbGVnZW5kTGF5b3V0ID0gcGFnZS5nZXRWaWV3QnlJZCgnbGVnZW5kTGF5b3V0Jyk7XG4gICAgLy9jb25zb2xlLmxvZygndG1wTGVnZW5kQWN0aXZpdHkgPSAnICsgdG1wTGVnZW5kQWN0aXZpdHkubGVuZ3RoKTtcbiAgICAvLyBjbGVhciDvv73vv73vv73vv70gYXJyYXkg77+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/vdSq77+977+977+977+9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0bXBMZWdlbmRBY3Rpdml0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZWdlbmRMYXlvdXQucmVtb3ZlQ2hpbGQodG1wTGVnZW5kQWN0aXZpdHlbaV0uZyk7XG4gICAgICAgIGxlZ2VuZExheW91dC5yZW1vdmVDaGlsZCh0bXBMZWdlbmRBY3Rpdml0eVtpXS5sKTtcbiAgICB9XG4gICAgdG1wTGVnZW5kQWN0aXZpdHkgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9ic2VydmFibGVBcnJheSgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ViamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvL3ZhciBncmlkTGF5b3V0ID0gbmV3IEdyaWRMYXlvdXQoKTtcbiAgICAgICAgLy9ncmlkTGF5b3V0LndpZHRoID0gMTU7XG4gICAgICAgIC8vZ3JpZExheW91dC5oZWlnaHQgPSAxNTtcbiAgICAgICAgLy9ncmlkTGF5b3V0LmJhY2tncm91bmRDb2xvciA9IGxpbmVQYWxldHRlW2ldO1xuICAgICAgICAvL2dyaWRMYXlvdXQuY2xhc3NOYW1lID0gJ2dyaWRMZWdlbmQnOyAgICAgIFxuICAgICAgICAvL3ZhciBsYWJlbCA9IG5ldyBMYWJlbE1vZHVsZS5MYWJlbCgpO1xuICAgICAgICAvL2xhYmVsLnRleHQgPSBzdWJqZWN0W2ldLlN1YmplY3ROYW1lO1xuICAgICAgICAvL2xhYmVsLmNsYXNzTmFtZSA9ICdsYmxMZWdlbmQnO1xuICAgICAgICAvL2xhYmVsLmNvbG9yID0gbGluZVBhbGV0dGVbaV07XG4gICAgICAgIHZhciBjb2xvciA9IGxpbmVQYWxldHRlW2ldO1xuICAgICAgICB2YXIgc3ViamVjdE5hbWUgPSBzdWJqZWN0W2ldLlN1YmplY3ROYW1lO1xuICAgICAgICB2YXIgZ3JpZExheW91dCA9IG5ld0dyaWRMYXlvdXQoY29sb3IpO1xuICAgICAgICB2YXIgbGFiZWwgPSBuZXdMYWJlbChzdWJqZWN0TmFtZSwgY29sb3IpO1xuICAgICAgICBsZWdlbmRMYXlvdXQuYWRkQ2hpbGQoZ3JpZExheW91dCk7XG4gICAgICAgIGxlZ2VuZExheW91dC5hZGRDaGlsZChsYWJlbCk7XG4gICAgICAgIHRtcExlZ2VuZEFjdGl2aXR5LnB1c2goeyBnOiBncmlkTGF5b3V0LCBsOiBsYWJlbCB9KTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN1YmplY3RbaV0uU2NvcmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvL3ZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAvL3ZhciB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgLy95ZXN0ZXJkYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyAoaiArIDEpKTtcbiAgICAgICAgICAgIC8vc3ViamVjdFtpXS5TY29yZXNbal0uZGF5ID0geWVzdGVyZGF5O1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gc3ViamVjdFtpXS5TY29yZXNbal0uZGF5O1xuICAgICAgICAgICAgdmFyIGFyclZhbHVlID0gdmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJiZWZvcmUgPT09PiBcIiArIHBhcnNlSW50KGFyclZhbHVlWzJdKSArIFwiLCBcIiArIHBhcnNlSW50KGFyclZhbHVlWzFdKSArIFwiLCBcIiArIHBhcnNlSW50KGFyclZhbHVlWzBdKSk7XG4gICAgICAgICAgICB2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KGFyclZhbHVlWzBdKSwgcGFyc2VJbnQoYXJyVmFsdWVbMV0pIC0gMSwgcGFyc2VJbnQoYXJyVmFsdWVbMl0pKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIj09PT4gXCIgKyBuZXdEYXRlKTtcbiAgICAgICAgICAgIHN1YmplY3RbaV0uU2NvcmVzW2pdLmRheSA9IG5ld0RhdGU7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIHZhciBuZXdTZXJpZXMgPSBuZXcgTGluZVNlcmllcygpO1xuICAgICAgICBuZXdTZXJpZXMuc2VyaWVzTmFtZSA9IFwidFwiICsgaTtcbiAgICAgICAgbmV3U2VyaWVzLmxlZ2VuZFRpdGxlID0gc3ViamVjdE5hbWU7XG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoc3ViamVjdFtpXS5TY29yZXMpKTtcbiAgICAgICAgbmV3U2VyaWVzLml0ZW1zID0gc3ViamVjdFtpXS5TY29yZXM7XG4gICAgICAgIG5ld1Nlcmllcy5jYXRlZ29yeVByb3BlcnR5ID0gXCJkYXlcIjtcbiAgICAgICAgbmV3U2VyaWVzLnZhbHVlUHJvcGVydHkgPSBcInNjb3JlXCI7XG5cbiAgICAgICAgdmFyIHBvaW50TGFiZWxTdHlsZSA9IG5ldyBQb2ludExhYmVsU3R5bGUoKTtcbiAgICAgICAgcG9pbnRMYWJlbFN0eWxlLnRleHRGb3JtYXQgPSBcIiUuMGZcIjtcbiAgICAgICAgcG9pbnRMYWJlbFN0eWxlLnRleHRTaXplID0gMTQ7XG5cbiAgICAgICAgbmV3U2VyaWVzLmxhYmVsU3R5bGUgPSBwb2ludExhYmVsU3R5bGU7XG5cbiAgICAgICAgcmVzdWx0LnB1c2gobmV3U2VyaWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gcmVsb2FkUHJhY3RpY2VDaGFydChzdWJqZWN0KSB7XG4gICAgdmFyIGxlZ2VuZExheW91dDIgPSBwYWdlLmdldFZpZXdCeUlkKCdsZWdlbmRMYXlvdXQyJyk7XG4gICAgLy8gY2xlYXIg77+977+977+977+9IGFycmF5IO+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73Uqu+/ve+/ve+/ve+/vVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG1wTGVnZW5kUHJhY3RpY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGVnZW5kTGF5b3V0Mi5yZW1vdmVDaGlsZCh0bXBMZWdlbmRQcmFjdGljZVtpXS5nKTtcbiAgICAgICAgbGVnZW5kTGF5b3V0Mi5yZW1vdmVDaGlsZCh0bXBMZWdlbmRQcmFjdGljZVtpXS5sKTtcbiAgICB9XG4gICAgdG1wTGVnZW5kUHJhY3RpY2UgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9ic2VydmFibGVBcnJheSgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ViamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY29sb3IgPSBsaW5lUGFsZXR0ZVtpXTtcbiAgICAgICAgdmFyIHN1YmplY3ROYW1lID0gc3ViamVjdFtpXS5TdWJqZWN0TmFtZTtcbiAgICAgICAgdmFyIGdyaWRMYXlvdXQgPSBuZXdHcmlkTGF5b3V0KGNvbG9yKTtcbiAgICAgICAgdmFyIGxhYmVsID0gbmV3TGFiZWwoc3ViamVjdE5hbWUsIGNvbG9yKTtcbiAgICAgICAgbGVnZW5kTGF5b3V0Mi5hZGRDaGlsZChncmlkTGF5b3V0KTtcbiAgICAgICAgbGVnZW5kTGF5b3V0Mi5hZGRDaGlsZChsYWJlbCk7XG4gICAgICAgIHRtcExlZ2VuZFByYWN0aWNlLnB1c2goeyBnOiBncmlkTGF5b3V0LCBsOiBsYWJlbCB9KTtcblxuICAgICAgICAvLyBjaGFuZyBzdHJpbmcgdG8gZGF0ZSBmb3JtYXRcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdWJqZWN0W2ldLlNjb3Jlcy5sZW5ndGg7IGorKykgeyAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBzdWJqZWN0W2ldLlNjb3Jlc1tqXS5kYXk7XG4gICAgICAgICAgICB2YXIgYXJyVmFsdWUgPSB2YWx1ZS5zcGxpdCgnLScpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG5ld0RhdGUgPSBuZXcgRGF0ZShwYXJzZUludChhcnJWYWx1ZVswXSksIHBhcnNlSW50KGFyclZhbHVlWzFdKSAtIDEsIHBhcnNlSW50KGFyclZhbHVlWzJdKSk7ICAgICAgIFxuICAgICAgICAgICAgc3ViamVjdFtpXS5TY29yZXNbal0uZGF5ID0gbmV3RGF0ZTtcbiAgICAgICAgfSAgXG5cbiAgICAgICAgdmFyIG5ld1NlcmllcyA9IG5ldyBMaW5lU2VyaWVzKCk7XG4gICAgICAgIG5ld1Nlcmllcy5zZXJpZXNOYW1lID0gXCJ0XCIgKyBpO1xuICAgICAgICBuZXdTZXJpZXMubGVnZW5kVGl0bGUgPSBzdWJqZWN0TmFtZTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShzdWJqZWN0W2ldLlNjb3JlcykpO1xuICAgICAgICBuZXdTZXJpZXMuaXRlbXMgPSBzdWJqZWN0W2ldLlNjb3JlcztcbiAgICAgICAgbmV3U2VyaWVzLmNhdGVnb3J5UHJvcGVydHkgPSBcImRheVwiO1xuICAgICAgICBuZXdTZXJpZXMudmFsdWVQcm9wZXJ0eSA9IFwic2NvcmVcIjtcblxuICAgICAgICB2YXIgcG9pbnRMYWJlbFN0eWxlID0gbmV3IFBvaW50TGFiZWxTdHlsZSgpO1xuICAgICAgICBwb2ludExhYmVsU3R5bGUudGV4dEZvcm1hdCA9IFwiJS4wZlwiO1xuICAgICAgICBwb2ludExhYmVsU3R5bGUudGV4dFNpemUgPSAxNDtcblxuICAgICAgICBuZXdTZXJpZXMubGFiZWxTdHlsZSA9IHBvaW50TGFiZWxTdHlsZTtcblxuICAgICAgICByZXN1bHQucHVzaChuZXdTZXJpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBmdW5jdGlvbiDvv73vv73vv73SpyBHcmlkTGF5b3V0IMW077+977+977+977+977+9wrkgY29kZSDvv73vv73Tq++/vc25XG5mdW5jdGlvbiBuZXdHcmlkTGF5b3V0KGJhY2tncm91bmRDb2xvcikge1xuICAgIHZhciBncmlkTGF5b3V0ID0gbmV3IEdyaWRMYXlvdXQoKTtcbiAgICBncmlkTGF5b3V0LndpZHRoID0gMTU7XG4gICAgZ3JpZExheW91dC5oZWlnaHQgPSAxNTtcbiAgICBncmlkTGF5b3V0LmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcbiAgICBncmlkTGF5b3V0LmNsYXNzTmFtZSA9ICdncmlkTGVnZW5kJztcbiAgICByZXR1cm4gZ3JpZExheW91dDtcbn1cbi8vIGZ1bmN0aW9uIO+/ve+/ve+/vdKnIExhYmVsIMW077+977+977+977+977+9wrkgY29kZSDvv73vv73Tq++/vc25XG5mdW5jdGlvbiBuZXdMYWJlbChzdWJqZWN0TmFtZSwgbGluZUNvbG9yKSB7XG4gICAgdmFyIGxhYmVsID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XG4gICAgbGFiZWwudGV4dCA9IHN1YmplY3ROYW1lO1xuICAgIGxhYmVsLmNsYXNzTmFtZSA9ICdsYmxMZWdlbmQnO1xuICAgIGxhYmVsLmNvbG9yID0gbGluZUNvbG9yO1xuICAgIHJldHVybiBsYWJlbDtcbn0iXX0=