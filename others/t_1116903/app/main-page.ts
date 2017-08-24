import observable = require("data/observable");
var Observable = require("data/observable").Observable;
import {ObservableArray} from "data/observable-array"
import pages = require("ui/page");
import { RadCartesianChart, LineSeries, BarSeries, PointLabelStyle, ChartLegendPosition, RadLegendView, CartesianAxis } from 'nativescript-telerik-ui-pro/chart';
var fetchModule = require("fetch");
import * as LabelModule from "ui/label";
import {GridLayout} from "ui/layouts/grid-layout";
var http = require("http");

var pageData = new Observable();
var appSettings = require("application-settings");

let page;
let chart, allScoreChart, quantityActivityChart, scorePracticeChart, quantityPracticeChart;
let dataChart;

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

export function pageLoaded(args: observable.EventData) {
    page = <pages.Page>args.object;
    //alert(baseUrl);
    //// get chart element in page
    allScoreChart = <RadCartesianChart>page.getViewById('allScoreChart');
    //// activity chart
    chart = <RadCartesianChart>page.getViewById('cartesianChart');
    quantityActivityChart = <RadCartesianChart>page.getViewById('quantityActivityChart');
    //// practice chart
    scorePracticeChart = <RadCartesianChart>page.getViewById('scorePracticeChart');
    quantityPracticeChart = <RadCartesianChart>page.getViewById('quantityPracticeChart');
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
        } else {
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
        } else {
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

        dataChart = new ObservableArray();
        var barSeries = new BarSeries();
        barSeries.items = data;
        barSeries.categoryProperty = "subjectName";
        barSeries.valueProperty = "score";
        barSeries.showLabels = true;
        var pointLabelStyle = new PointLabelStyle();
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
        dataChart = new ObservableArray();
        var barSeries = new BarSeries();
        barSeries.items = data;
        barSeries.categoryProperty = "subjectName";
        barSeries.valueProperty = "amount";
        barSeries.showLabels = true;

        var pointLabelStyle = new PointLabelStyle();
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

        dataChart = new ObservableArray();
        var barSeries = new BarSeries();
        barSeries.items = data;
        barSeries.categoryProperty = "subjectName";
        barSeries.valueProperty = "amount";
        barSeries.showLabels = true;

        var pointLabelStyle = new PointLabelStyle();
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


    quantityActivityChart = <RadCartesianChart>page.getViewById('quantityActivityChart');
    var newseries = new ObservableArray();

    chart.series = newseries;
};

exports.Refresh1 = function (args: observable.EventData) {
    getAllScoreData();
};
exports.Refresh2 = function (args: observable.EventData) {
    getScoreActivityData();
    getQuantityActivityData();
};
exports.Refresh3 = function (args: observable.EventData) {
    getScorePracticeData();    
    getQuantityPracticeData();
};

exports.postRequest = function (args: observable.EventData) {
    //getChartData();
    //alert(1);
    var fullscreen = (<any>args.object).text.indexOf("(full-screen)") !== -1;
    page.showModal("modal-page", "context", function closeCallback(subjects, startDate, endDate) {
        if (subjects == "") {
            alert('��ͧ���͡���ҧ���� 1 �ԪҤ��');
            return 0;
        } else {
            //alert(subjects + '   ' + startDate + '   ' + endDate);
            //alert(subjects.toString());
            if (subjects != undefined) {
                var content = JSON.stringify({ studentId: studentId, subjects: subjects.toString(), startDate: startDate, endDate: endDate });
                getScoreActivityChartWithFilter(content);
            }
        }

    }, fullscreen);
}

// �͹������ filter ˹�Ҵ٤�ṹ�ͧ�֡��
exports.practicePostRequest = function (args: observable.EventData) {
    var fullscreen = (<any>args.object).text.indexOf("(full-screen)") !== -1;
    page.showModal("modal-page", "context", function closeCallback(subjects, startDate, endDate) {
        if (subjects == "") {
            alert('��ͧ���͡���ҧ���� 1 �ԪҤ��');
            return 0;
        } else {
            if (subjects != undefined) {
                var content = JSON.stringify({ studentId: studentId, subjects: subjects.toString(), startDate: startDate, endDate: endDate });
                getScorePracticeChartWithFilter(content);
            }
        }
        //alert(2);
    }, fullscreen);
}

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
    var result = new ObservableArray();
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

        var newSeries = new LineSeries();
        newSeries.seriesName = "t" + i;
        newSeries.legendTitle = subjectName;
        //console.log(JSON.stringify(subject[i].Scores));
        newSeries.items = subject[i].Scores;
        newSeries.categoryProperty = "day";
        newSeries.valueProperty = "score";

        var pointLabelStyle = new PointLabelStyle();
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
    var result = new ObservableArray();
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

        var newSeries = new LineSeries();
        newSeries.seriesName = "t" + i;
        newSeries.legendTitle = subjectName;
        //console.log(JSON.stringify(subject[i].Scores));
        newSeries.items = subject[i].Scores;
        newSeries.categoryProperty = "day";
        newSeries.valueProperty = "score";

        var pointLabelStyle = new PointLabelStyle();
        pointLabelStyle.textFormat = "%.0f";
        pointLabelStyle.textSize = 14;

        newSeries.labelStyle = pointLabelStyle;

        result.push(newSeries);
    }
    return result;
}

// function ���ҧ GridLayout Ŵ�����¹ code ��ӫ�͹
function newGridLayout(backgroundColor) {
    var gridLayout = new GridLayout();
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