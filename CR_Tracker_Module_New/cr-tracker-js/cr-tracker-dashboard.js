//---------------------Pie Chart--------------------------

//document ready
$(document).ready(function () {
    ChartHelper.LoadPieChart();
})

var ChartManager = {
    Get_Chart_Data: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "/CR_Tracker/CR_Pie_Chart_Details";
        ChartManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },

    GetJsonResult: function (serviceUrl, jsonParams, isAsync, isCache, successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            async: isAsync,
            cache: isCache,
            url: serviceUrl,
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            error: errorCallback
        });
    }

};

var ChartHelper = {
    LoadPieChart: function () {
        var data = ChartManager.Get_Chart_Data();
        am4core.ready(function () {
            am4core.useTheme(am4themes_animated);
            var chart1 = am4core.create("chartdiv1", am4charts.PieChart3D);
            chart1.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart1.data = data;

            chart1.innerRadius = am4core.percent(35);
            chart1.depth = 90;
            //chart1.height = 350;
            //chart1.width = 400;

            chart1.legend = new am4charts.Legend();

            var series = chart1.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "CR_Status_Count";
            series.dataFields.depthValue = "CR_Status_Count";
            series.dataFields.category = "CR_Status";
            series.slices.template.cornerRadius = 6;
            series.colors.step = 16;

            series.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.slices.template.events.on("hit", (event) => {
                var clickedStatus = $.trim(event.target.dataItem._dataContext.CR_Status);
                Get_CR_Tracker_Table_Details_By_Filter(clickedStatus, "");
                //alert(clickedStatus);
                //Pie_Chart_Click_Event_Common(event)
                //console.log(event.target.dataItem._dataContext);
            });

            //function Pie_Chart_Click_Event_Common(event) {
            //    console.log(event.target.dataItem._dataContext.country);
            //    console.log(event.target.dataItem._dataContext.litres);
            //}
        });
    }
};


//--------------------------Bar Chart--------------------------
$(document).ready(function () {
    StackBarHelper.LoadBarGraph();
})

var StackBarManager = {
    Get_Bar_Data: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "/CR_Tracker/CR_Stack_Bar_Details";
        ChartManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return obj;
    },

    GetJsonResult: function (serviceUrl, jsonParams, isAsync, isCache, successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            async: isAsync,
            cache: isCache,
            url: serviceUrl,
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            error: errorCallback
        });
    }
}

var StackBarHelper = {
    LoadBarGraph: function () {
        var data = StackBarManager.Get_Bar_Data();
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            var chart = am4core.create("chartdiv2", am4charts.XYChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart.data = data;
            //chart.data = [
            //  {
            //      category: "Jan",
            //      value1: 1,
            //      value2: 5,
            //      value3: 3,
            //      value4: 3
            //  },
            //  {
            //      category: "Feb",
            //      value1: 2,
            //      value2: 5,
            //      value3: 3,
            //      value4: 2
            //  },
            //  {
            //      category: "Mar",
            //      value1: 3,
            //      value2: 5,
            //      value3: 4,
            //      value4: 6
            //  },
            //  {
            //      category: "Apr",
            //      value1: 4,
            //      value2: 5,
            //      value3: 6,
            //      value4: 4
            //  },
            //  {
            //      category: "May",
            //      value1: 3,
            //      value2: 5,
            //      value3: 4,
            //      value4: 2
            //  },
            //  {
            //      category: "Jun",
            //      value1: 2,
            //      value2: 13,
            //      value3: 1,
            //      value4: 7
            //  }
            //];

            console.log(chart.data);
            chart.colors.step = 16;
            chart.padding(30, 30, 10, 30);
            chart.legend = new am4charts.Legend();

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "CR_Months";
            categoryAxis.renderer.grid.template.location = 0;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.max = 100;
            valueAxis.strictMinMax = true;
            valueAxis.calculateTotals = true;
            valueAxis.renderer.minWidth = 50;


            var series1 = chart.series.push(new am4charts.ColumnSeries());
            series1.columns.template.width = am4core.percent(80);
            series1.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
            series1.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series1.name = "New";
            series1.dataFields.categoryX = "CR_Months";
            series1.dataFields.valueY = "Completed_Count";
            series1.dataFields.valueYShow = "totalPercent";
            series1.dataItems.template.locations.categoryX = 0.5;
            series1.stacked = true;
            series1.tooltip.pointerOrientation = "vertical";
            series1.columns.template.events.on("hit", function (ev) { Stack_Bar_Click_Event_Common(ev, 'New'); });

            var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
            bullet1.interactionsEnabled = false;
            bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
            bullet1.label.fill = am4core.color("#ffffff");
            bullet1.locationY = 0.5;

            var series2 = chart.series.push(new am4charts.ColumnSeries());
            series2.columns.template.width = am4core.percent(80);
            series2.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
            series2.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series2.name = "UAT";
            series2.dataFields.categoryX = "CR_Months";
            series2.dataFields.valueY = "UAT_Count";
            series2.dataFields.valueYShow = "totalPercent";
            series2.dataItems.template.locations.categoryX = 0.5;
            series2.stacked = true;
            series2.tooltip.pointerOrientation = "vertical";
            series2.columns.template.events.on("hit", function (ev) { Stack_Bar_Click_Event_Common(ev, 'UAT'); });

            var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
            bullet2.interactionsEnabled = false;
            bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
            bullet2.locationY = 0.5;
            bullet2.label.fill = am4core.color("#ffffff");

            var series3 = chart.series.push(new am4charts.ColumnSeries());
            series3.columns.template.width = am4core.percent(80);
            series3.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
            series3.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series3.name = "Completed";
            series3.dataFields.categoryX = "CR_Months";
            series3.dataFields.valueY = "Pending_Count";
            series3.dataFields.valueYShow = "totalPercent";
            series3.dataItems.template.locations.categoryX = 0.5;
            series3.stacked = true;
            series3.tooltip.pointerOrientation = "vertical";
            series3.columns.template.events.on("hit", function (ev) { Stack_Bar_Click_Event_Common(ev, 'Completed'); });
            var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
            bullet3.interactionsEnabled = false;
            bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
            bullet3.locationY = 0.5;
            bullet3.label.fill = am4core.color("black");

            var series4 = chart.series.push(new am4charts.ColumnSeries());
            series4.columns.template.width = am4core.percent(80);
            series4.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
            series4.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series4.name = "Working";
            series4.dataFields.categoryX = "CR_Months";
            series4.dataFields.valueY = "Other_Count";
            series4.dataFields.valueYShow = "totalPercent";
            series4.dataItems.template.locations.categoryX = 0.5;
            series4.stacked = true;
            series4.tooltip.pointerOrientation = "vertical";
            series4.columns.template.events.on("hit", function (ev) { Stack_Bar_Click_Event_Common(ev, 'Working'); });

            var bullet4 = series4.bullets.push(new am4charts.LabelBullet());
            bullet4.interactionsEnabled = false;
            bullet4.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
            bullet4.locationY = 0.5;
            bullet4.label.fill = am4core.color("#ffffff");


            chart.scrollbarX = new am4core.Scrollbar();

            function Stack_Bar_Click_Event_Common(ev, status) {
                //alert("Clicked on " + ev.target.dataItem.categoryX + ": " + ev.target.dataItem.valueY + " Status: " + status);
                var monthYear =ev.target.dataItem.categoryX;
                Get_CR_Tracker_Table_Details_By_Filter($.trim(status), $.trim(monthYear))
            }
        });

    }
}

//-----------------------------------------------------------------------
//Function
var _months = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
};
function getMonthObject(month) {
    return _months[month];
}

//------------------------Main Dashboard-----------------------------------

$(document).on('click', '.cr-count-dashboard', function () {
    //$('.cr-count-dashboard').removeClass('selected-card-color');
    //$(this).addClass('selected-card-color');
    var text = $.trim($(this).find('.info-box-text').text());
    Get_CR_Tracker_Table_Details_By_Filter(text, "");
})

$(document).on('click', '.btn-clear-status-filter', function () {
    Get_CR_Tracker_Table_Details_By_Filter("All CR Module", "");
})

function Get_CR_Tracker_Table_Details_By_Filter(clicked_status, MonthClicked) {
    $('#lbl_cr_details_alert_msg').text(clicked_status);
    if ($.trim(MonthClicked) != "") {
        $('#lbl_cr_details_alert_msg').text(clicked_status + " Of " + MonthClicked);
        var month = MonthClicked.split('-')[0]; //getting month name
        var year = MonthClicked.split('-')[1]; //getting year
        MonthClicked = getMonthObject(month) + "-20" + year; // convert to 12-2020 date formate
    }
    clicked_status != "All CR Module" ? $('.cr-details-alert-message').show() : $('.cr-details-alert-message').hide();
    $('.cr-count-dashboard').removeClass('selected-card-color');
    $.trim(clicked_status).toLowerCase() != "all cr module" && $.trim(clicked_status).toLowerCase() != "new" ? $('.cr-' + clicked_status.toLowerCase() + '-clicked').addClass('selected-card-color') : $('.cr-all-cr-module-clicked').addClass('selected-card-color');
    $.ajax({
        url: "/CR_Tracker/CR_Details_DataTableP",
        type: "POST",
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify({ status: $.trim(clicked_status), MonthWiseStatus: $.trim(MonthClicked) }),
        async: true,
        beforeSend: function () {
            //$('#cr_detailsP').html('');
            $('.cr-details-table-overlay').show();
        },
        complete: function () {
            $('.cr-details-table-overlay').hide();
        },
        success: function (result) {
            $('#cr_detailsP').html(result);
        }
    })

}


//---------------------------CR Remark--------------------------------
$(document).on('click', '.cr-tracker-id', function () {
    var cr_tracker_id = $.trim($(this).attr('resource'));
    $('#txt_hidden_cr_id').val(cr_tracker_id);
    $('#lbl_Message_To').text(cr_tracker_id);
    $('#txt_cr_remark_details').val('');
    $('.txt-message-reply').slideUp();
    $('#cr_status_details').modal('show');
    Get_CR_Remark_Details_Function(cr_tracker_id);
    //alert(cr_tracker_id);
})

$(document).on('click', '#btn_add_cr_remark', function () {
    $('#txt_cr_remark_details').val('');
    $('#btn_save_cr_remark_details').val('SAVE');
    $('.txt-message-reply').slideDown();
})

$(document).on('click', '.close-reply', function () {
    $('.txt-message-reply').slideUp();
})

$(document).on('click', '#btn_save_cr_remark_details', function () {
    var txt_cr_remark_details = $.trim($('#txt_cr_remark_details').val());
    var btn_action = "SAVE";
    if ($.trim($(this).val()) == "UPDATE") {
        btn_action = "UPDATE";
    }
    var txt_hidden_cr_id = $.trim($('#txt_hidden_cr_id').val());
    var txt_hidden_cr_remark_id = $.trim($('#txt_hidden_cr_remark_id').val());

    if (txt_cr_remark_details == "") {
        alert("Please Enter CR Remark Details !!");
        $('#txt_cr_remark_details').focus();
        return false;
    }

    var data_obj = {
        add_update_action: $.trim(btn_action),
        cr_remark_id: $.trim(txt_hidden_cr_remark_id),
        ref_cr_id: $.trim(txt_hidden_cr_id),
        cr_remark: $.trim(txt_cr_remark_details),
    }
    console.log(data_obj);

    $.ajax({
        url: '/CR_Tracker/Add_Update_CR_Remark_Details',
        type: 'POST',
        datatype: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(data_obj),
        async: true,
        beforeSend: function () {
            //loading
        },
        complete: function () {
            //loading
            Get_CR_Remark_Details_Function(txt_hidden_cr_id);
        },
        success: function (result) {
            $('#txt_cr_remark_details').val('');
            $('.txt-message-reply').slideUp();
            //
        }
    });

})

function Get_CR_Remark_Details_Function(refCR_ID) {

    $.ajax({
        url: '/CR_Tracker/CR_Remark_DetailsP',
        type: 'POST',
        datatype: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify({ ref_cr_id: $.trim(refCR_ID) }),
        async: true,
        beforeSend: function () {
            $('.timeline-overlay').show();
            $('#cr_remark_timeline_details').html('');
        },
        complete: function () {
            //loading
            $('.timeline-overlay').hide();
        },
        success: function (result) {
            $('#cr_remark_timeline_details').html(result);
        }
    });

}

$(document).on('click', '.btn-edit-remark', function () {
    var cr_remark_id = $.trim($(this).attr('resource'));
    $('#txt_hidden_cr_remark_id').val(cr_remark_id);
    $('#btn_save_cr_remark_details').val('UPDATE');
    $('.txt-message-reply').slideDown();
    var txt_hidden_cr_id = $.trim($('#txt_hidden_cr_id').val());

    $.ajax({
        url: '/CR_Tracker/Edit_CR_Remark_Detail_By_ID',
        type: 'POST',
        datatype: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify({ cr_remark_id: $.trim(cr_remark_id) }),
        async: true,
        beforeSend: function () {
            //loading
        },
        complete: function () {
        },
        success: function (result) {
            $('#txt_cr_remark_details').val($.trim(result.data));
            $('.txt-message-reply').slideDown();
        }
    });




})


$(document).on('click', '#btn_dt_search', function () {
    var search_date = $.trim($('#txt_from_to_date_search').val());
    var search_from_date = $.trim($('#txt_hidden_from_dt').val());
    var search_to_date = $.trim($('#txt_hidden_to_dt').val());
    
    if (search_date =="") {
        alert("Please Select Date-Range For Search !!");
        return false;
    }
})


$(document).on('click', '#btn_clear_dt', function () {
    $('#txt_from_to_date_search').val('');
    $('#txt_hidden_from_dt,#txt_hidden_to_dt').val('');
})