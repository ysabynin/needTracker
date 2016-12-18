app.controller('ColumnChartController', function ($scope, $http, $rootScope) {

    $http.get("/api/v1/users/ysabynin/statistics/columnchart")
        .then(function (response) {
            var resData = response.data;
            var rows =  $scope.columnChartObject.data.rows;
            var cols =  $scope.columnChartObject.data.cols;
            var colNames = [];

            var userNeeds = $rootScope.userNeeds;

            for(var k = 0; k < userNeeds.length; k++){
                var object = {"label": userNeeds[k].title, "type": "number"};
                cols.push(object);
                colNames.push(userNeeds[k].title);
            }

            for (var i = 0; i < resData.length; i++) {
                var currentObject = resData[i];
                var currentObjectChildren = currentObject["children"];

                var label = currentObject["_id"].month + " " + currentObject["_id"].year;
                rows.push({"c": [{"v": label}]});

                var tempObject = [];
                for (var k = 0; k < colNames.length; k++){
                    tempObject.push({"sum": 0, "needName": colNames[k]})
                }

                for (var l = 0; l < currentObjectChildren.length; l++){
                    var needName = currentObjectChildren[l].needName;
                    var index = colNames.indexOf(needName);
                    tempObject[index] = {"sum": currentObjectChildren[l].sum, "needName": needName};
                }
                currentObjectChildren = tempObject;

                for (var j = 0; j < currentObjectChildren.length; j++) {
                    var charge = currentObjectChildren[j];
                    var chargeTitle = charge.sum + " руб.";
                    rows[i]["c"].push({"v": charge.sum, "f": chargeTitle});
                }
            }
        });

    $scope.columnChartObject = {
        "type": "ColumnChart",
        "displayed": false,
        "data": {
            "cols": [
                {
                    "id": "month",
                    "label": "Month",
                    "type": "string",
                    "p": {}
                }
            ],
            "rows": []
        },
        "options": {
            "title": "Динамика изменения расходов",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Денежный оборот",
                "gridlines": {
                    "count": 10
                }
            },
            "hAxis": {
                "title": "Месяцы"
            },
            "tooltip": {
                "isHtml": false
            },
            "allowHtml": true
        },
        "view": {}
    }

});
