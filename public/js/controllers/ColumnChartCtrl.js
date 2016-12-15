app.controller('ColumnChartController',function($scope) {

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
                },
                {
                    "id": "car",
                    "label": "Машина",
                    "type": "number",
                    "p": {}
                },
                {
                    "id": "desktop",
                    "label": "Проезд",
                    "type": "number",
                    "p": {}
                },
                {
                    "id": "server",
                    "label": "Путешествия",
                    "type": "number",
                    "p": {}
                },
                {
                    "id": "cost",
                    "label": "Еда",
                    "type": "number"
                }
            ],
            "rows": [
                {
                    "c": [
                        {
                            "v": "Январь"
                        },
                        {
                            "v": 10000,
                            "f": "10000 руб."
                        },
                        {
                            "v": 3000,
                            "f": "3000 руб."
                        },
                        {
                            "v": 20000,
                            "f": "20000 руб."
                        },
                        {
                            "v": 15000,
                            "f": "15000 руб."
                        }
                    ]
                },
                {
                    "c": [
                        {
                            "v": "Февраль"
                        },
                        {
                            "v": 10000,
                            "f": "10000 руб."
                        },
                        {
                            "v": 3000,
                            "f": "3000 руб."
                        },
                        {
                            "v": 35000,
                            "f": "35000 руб."
                        },
                        {
                            "v": 15000,
                            "f": "15000 руб."
                        }
                    ]
                },
                {
                    "c": [
                        {
                            "v": "Март"
                        },
                        {
                            "v": 10000,
                            "f": "10000 руб."
                        },
                        {
                            "v": 3000,
                            "f": "3000 руб."
                        },
                        {
                            "v": 50000,
                            "f": "50000 руб."
                        },
                        {
                            "v": 15000,
                            "f": "15000 руб."
                        }
                    ]
                }
            ]
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
/*        "formatters": {
            "date": [
                {
                    "columnNum": 5,
                    "formatType": "long"
                }
            ],
            "number": [
                {
                    "columnNum": 4,
                    "prefix": "$"
                }
            ],
            "bar": [
                {
                    "columnNum": 1,
                    "width": 100
                }
            ],
            "color": [
                {
                    "columnNum": 4,
                    "formats": [
                        {
                            "from": 0,
                            "to": 3,
                            "color": "white",
                            "bgcolor": "red"
                        },
                        {
                            "from": 3,
                            "to": 5,
                            "color": "white",
                            "fromBgColor": "red",
                            "toBgColor": "blue"
                        },
                        {
                            "from": 6,
                            "to": null,
                            "color": "black",
                            "bgcolor": "#33ff33"
                        }
                    ]
                }
            ]/!*,
            "arrow": [
                {
                    "columnNum": 1,
                    "base": 19
                }
            ]*!/
        },*/
        "view": {}
    }

});
