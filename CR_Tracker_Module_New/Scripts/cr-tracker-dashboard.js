//------------------Pie Chart------------------------
//am4core.ready(function () {

//    // Themes begin
//    am4core.useTheme(am4themes_animated);
//    // Themes end

//    var chart1 = am4core.create("chartdiv1", am4charts.PieChart3D);
//    chart1.hiddenState.properties.opacity = 0; // this creates initial fade-in

//    chart1.data = [
//      {
//          country: "New",
//          litres: 165.8
//      },
//      {
//          country: "UAT",
//          litres: 139.9
//      },
//      {
//          country: "Completed",
//          litres: 128.3
//      },
//      {
//          country: "Working",
//          litres: 120
//      }

//    ];

//    chart1.innerRadius = am4core.percent(40);
//    chart1.depth = 120;

//    chart1.legend = new am4charts.Legend();

//    var series = chart1.series.push(new am4charts.PieSeries3D());
//    series.dataFields.value = "litres";
//    series.dataFields.depthValue = "litres";
//    series.dataFields.category = "country";
//    series.slices.template.cornerRadius = 6;
//    series.colors.step = 16;
    
//    series.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
//    series.slices.template.events.on("hit", (event) => {
//        var clickedStatus = $.trim(event.target.dataItem._dataContext.country);
//        Get_CR_Tracker_Table_Details_By_Filter(clickedStatus);
//        alert(clickedStatus);
//        //Pie_Chart_Click_Event_Common(event)
//        //console.log(event.target.dataItem._dataContext);
//    });


//    //function Pie_Chart_Click_Event_Common(event) {
//    //    console.log(event.target.dataItem._dataContext.country);
//    //    console.log(event.target.dataItem._dataContext.litres);
//    //}
   
//});

//document ready
$(document).ready(function () {
    CharHelper.LoadPieChart();
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

var CharHelper = {
    LoadPieChart: function () {
        var data = ChartManager.Get_Chart_Data();
        am4core.ready(function () {
            am4core.useTheme(am4themes_animated);
            var chart1 = am4core.create("chartdiv1", am4charts.PieChart3D);
            chart1.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart1.data = data;

            chart1.innerRadius = am4core.percent(40);
            chart1.depth = 120;
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
                Get_CR_Tracker_Table_Details_By_Filter(clickedStatus);
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



//------------------Bar Chart------------------------
am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
          category: "Jan",
          value1: 1,
          value2: 5,
          value3: 3,
          value4: 3
      },
      {
          category: "Feb",
          value1: 2,
          value2: 5,
          value3: 3,
          value4: 2
      },
      {
          category: "Mar",
          value1: 3,
          value2: 5,
          value3: 4,
          value4: 6
      },
      {
          category: "Apr",
          value1: 4,
          value2: 5,
          value3: 6,
          value4: 4
      },
      {
          category: "May",
          value1: 3,
          value2: 5,
          value3: 4,
          value4: 2
      },
      {
          category: "Jun",
          value1: 2,
          value2: 13,
          value3: 1,
          value4: 7
      }
    ];

    chart.colors.step = 16;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
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
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value1";
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
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "value2";
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
    series3.dataFields.categoryX = "category";
    series3.dataFields.valueY = "value3";
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
    series4.dataFields.categoryX = "category";
    series4.dataFields.valueY = "value2";
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
        alert("Clicked on " + ev.target.dataItem.categoryX + ": " + ev.target.dataItem.valueY + " Status: "+ status);
    }
});

$(document).on('click', '.cr-tracker-id', function () {
    var cr_tracker_id = $.trim($(this).attr('resource'));
    $('#cr_status_details').modal('show');
    //alert(cr_tracker_id);
})

$(document).on('click', '.cr-count-dashboard', function () {
    //$('.cr-count-dashboard').removeClass('selected-card-color');
    //$(this).addClass('selected-card-color');
    var text = $.trim($(this).find('.info-box-text').text());
    Get_CR_Tracker_Table_Details_By_Filter(text);
})


function Get_CR_Tracker_Table_Details_By_Filter(clicked_status) {
    $('.cr-count-dashboard').removeClass('selected-card-color');
    $.trim(clicked_status).toLowerCase() != "all cr module" && $.trim(clicked_status).toLowerCase() != "new" ? $('.cr-' + clicked_status.toLowerCase() + '-clicked').addClass('selected-card-color') : $('.cr-all-cr-module-clicked').addClass('selected-card-color');
    $.ajax({
        url: "/CR_Tracker/CR_Details_DataTableP",
        type: "POST",
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify({ status: $.trim(clicked_status) }),
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



