function loadGraphVars() {
    div_x = 0;
    div_y = 0;
    graph_x = 0;
    graph_y = 0;
//    isRowFull = false;
    divIndex = 0;
    chartIndex = 0;
    addChartArea();
}

// function createNextDiv() {
//     return '<div id="' + divIndex + '" style="height: 100%; width: 100%;" class="widget-color" ondblclick="graphdbclick(this,id,parent)"></div>'

// }

function addChartArea() {
    addDiv(6, 6, div_x, div_y);
    divIndex++;
    if (divIndex % 2 == 0) {
        div_x = 0;
        div_y += 6;
    }
    else {
        div_x = 6;
    }
}

function generateChartDiv(id) {
    //var loading_div = '<img src="img/loading.gif" style="height: 400px;width: 100%;">';
    var loading_div = '<div style="height:100%; background-color: #272727"><div class="loader"></div></div>';    
    return '<div id="' + id + '" style="height: 100%; width: 100%;" class="widget-color" ondblclick="graphdbclick(this,id,parent)">'+loading_div+'</div>'
}

function addDivtoWidget(div, w, h, x, y, widgetID) {
    var options = {
        float: true
    };
    $('.grid-stack').gridstack(options);

    new function() {
        this.items = [];

        this.grid = $('.grid-stack').data('gridstack');


        this.addNewWidget = function() {

            var node = this.items.pop() || {
                x: x,
                y: y,
                width: w,
                height: h
            };

            this.grid.addWidget($(['<div id="' + widgetID + '" style="display: flex;" onresize="resizeWidget(id)" ondrag="dragWidget()"><div class="grid-stack-item-content widget-background-color">',
                    '<span id="close' + widgetID + '" class="closebtn w3-margin-right"><img src="img/delete.png"></span>',
                    '<span id="settings' + widgetID + '" class="settingsbtn w3-margin-right"><img src="img/settings1.png"></span>',
                    '<span id="live' + widgetID + '" class="livebtn w3-medium w3-margin-right" style="display:none"><div class="spinner"></div></span>',
                    '<div class="w3-widget-content">',
                    div,
                    '</div>',
                    '<div/> <div/> '
                ].join('')),
                node.x, node.y, node.width, node.height);



            $('#close' + widgetID).click(function() {
                //$('#widget'+widgetCount).remove();
                $(this).parent().parent().remove();
                //widgetCount--;
            });

            $('#settings' + widgetID).click(function(id) {
                var widgetID = $(this).attr("id").substring(8);
                openSettingsModal(widgetID);
            });

            
            return false;
        }.bind(this);

        this.addNewWidget();
    };
}

function graphdbclick(graph, id) {
    
    if(graphs[id].chart == null){
        return;
    }

    if(document.getElementById("graphnav").style.display == "none"){    // to focus in
        tempParent = $("#" + id).parent();
        tempGraph = graph;
        tempId = id;
        graphnav_open();
        $("#graphContainer").empty();                                       
        document.getElementById("graphContainer").appendChild(graph);
        graphs[id].chart.render();
    }else{                                                              // To focus out
        tempParent.html(tempGraph);
        graphs[tempId].chart.render();
        document.getElementById("graphnav").style.display = "none";
    }
}

/////////

function addDiv(w, h, x, y) {
    //var div = '<div id="' + divIndex + '" style="height: 100%; width: 100%;" class="widget-color" ondblclick="graphdbclick(this,id,parent)"></div>';

    var options = {
        float: true
    };
    $('.grid-stack').gridstack(options);

    new function() {
        this.items = [];

        this.grid = $('.grid-stack').data('gridstack');


        this.addNewWidget = function() {

            var node = this.items.pop() || {
                x: x,
                y: y,
                width: w,
                height: h
            };

            this.grid.addWidget($(['<div id="' + divIndex + '" style="display: flex;"><div class="grid-stack-item container" onclick="openAddChartModal()"><span class=content><img src="img/add-widget.png"></span>',
                    '<div class="w3-widget-content">',
                    '</div>',
                    '<div/> <div/> '
                ].join('')),
                node.x, node.y, node.width, node.height);       
            return false;
        }.bind(this);

        this.addNewWidget();
    };
    $("#addChartModal").hide();
}

function openSettingsModal(){
    $("#settingsModal").show();
}

function openAddChartModal(){
    $("#addChartModal").show();
}

function addChart() {
    var widgetID = "widget_id";
    var divID = divIndex - 1;
    var div = document.getElementById(divID.toString());
    addDivtoWidget(div, 6, 6, 0, 0, widgetID);
}

function addGraph() {
    var chart_div = document.getElementById((divIndex - 1).toString());
    chart_div.parentNode.removeChild(chart_div)

    var width = 6;
    var widgetID = "widget_" + "linechart" + chartIndex;
    // var div = document.getElementById(chartIndex.toString());
    // if (!div) window.alert("null");
    var div = generateChartDiv(chartIndex);
    addDivtoWidget(div, width, 6, graph_x, graph_y, widgetID);
    
    chartIndex++;
    if (chartIndex % 2 == 0) {
        graph_x = 0;
        graph_y += 6;
    }
    else {
        graph_x = 6;
    }

addChartArea();
}