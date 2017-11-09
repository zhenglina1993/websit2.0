(function () {
    angular.module("laydate",[])
    .directive("laydate", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                $(element).click(function () {
                    laydate({
                        choose: function (dates) {
                            scope[attrs.ngModel] = dates;
                        }
                    });
                })
            }
        };
    });
})();