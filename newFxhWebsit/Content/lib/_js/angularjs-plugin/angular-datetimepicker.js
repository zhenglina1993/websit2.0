(function () {
    angular.module("datetimepicker", [])
    
     /**
     * 单日期选择工具
     */
    .directive("datetimepicker", function () {
        return {
            restrict: "A",
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {                              
                element.datetimepicker({
                    i18n:{
                        de:{
                            months:[
                             '1','2','3','4',
                             '5','6','7','8',
                             '9','10','11','12',
                            ],
                            dayOfWeek:[
                             "日", "一", "二", "三", 
                             "四", "五", "六",
                            ]
                        }
                    },
                    value: ngModel.$viewValue ? ngModel.$viewValue : "",
                    lang:'ch',
                    timepicker:true,//时间
                    format:'Y-m-d H:i', //时间格式
                    todayButton: true,    //关闭选择今天按钮
                    onChangeDateTime: function (dp, $input) {
                        ngModel.$setViewValue($input.val());
                    }
                });

                

            }
        };
    });
    
})();