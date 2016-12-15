app.controller('PieChartController',function($scope) {
    $scope.pieChartObject = {};

    $scope.pieChartObject.type = "PieChart";

    $scope.onions = [
        {v: "Проезд"},
        {v: 3000}
    ];

    $scope.pieChartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: "Машина"},
            {v: 10000},
        ]},
        {c: $scope.onions},
        {c: [
            {v: "Путешествия"},
            {v: 50000}
        ]},
        {c: [
            {v: "Еда"},
            {v: 15000},
        ]},
        {c: [
            {v: "Одежда"},
            {v: 10000},
        ]}
    ]};

    $scope.pieChartObject.options = {
        'title': 'Расходы по потребностям(руб.)',
        'pieHole': 0.4
    };
});