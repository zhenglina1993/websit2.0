/// <reference path="F:\TFS\Ldd.Web\src\Ldd.Web.Cdn\Ldd.Web.Cdn\lib/_js/angularjs/angular.js" />
/// <reference path="F:\TFS\Ldd.Web\src\Ldd.Web.Cdn\Ldd.Web.Cdn\base/_js/ldd.prototype.js" />
(function () {

    var changeCall;

    var ke = new Kalendae({
        attachTo: document.body,
        months: 2,
        mode: 'range',
        format: 'YYYY-M-D',
        rangeDelimiter: '~',
        // selected: selectedDate.split("~"),
        titleFormat: 'YYYY年MMMM',
        subscribe: {
            'change': function (date, action) {
                //console.log(date, action, this.getSelected());

                $('.showDateStart', $showStart).val(this.getSelected());
                if (changeCall) {
                    changeCall(this.getSelected());
                }
                // s[a.dateTool] = this.getSelected();
            }
        }
    });
    var $showStart = $('.showStart');
    var $kalendae = $(ke.container);
    $kalendae.append($showStart);
    $showStart.show();
    $kalendae.hide();

    //确定选择时间（最终时间为$('#reservation').val()已~分割）
    $('.ok_btn', $showStart).on('click', function () {
        $('#reservation').val($('.showDateStart', $showStart).val());
        $kalendae.hide();
    });
    //取消
    $('.back_btn', $showStart).on('click', function () {
        $kalendae.hide();
    });
    //选择全部
    $('.all_btn', $showStart).on('click', function () {
        var old_dates = ke.getSelected().split('~'), i;

        if (old_dates != "") {
            i = old_dates.length;
            while (i--) { ke.removeSelected(old_dates[i], ke.draw); }
        }

        $('#reservation').val('');
        $('.showDateStart', $showStart).val('');
        $kalendae.hide();
    });

    angular.module("dateTool", [])
    /**
     * 日期范围选择工具
     */
    .directive("dateTool", function () {
        return {
            restrict: "A",
            require: '?ngModel',
            link: function (s, e, a, ngModel) {

                $('.all_btn', $showStart).click();

                // 指定UI的更新方式
                if (ngModel) {
                    ngModel.$render = function () {
                        var str = ngModel.$viewValue ? ngModel.$viewValue : "";
                        ke.setSelected(str.split("~"));
                        e.find("input").val(str);
                    };
                }
                else {
                    //var str = s[a.dateTool] ? s[a.dateTool] : new Date().format("yyyy-MM-dd");
                    //ke.setSelected(str.split("~"));
                    ////changeCall(str);
                    //s[a.dateTool] = str;
                    //if (a.dateTool == "") {
                    //    ngModel.$setViewValue(str);
                    //}

                }

                changeCall = function (date) {
                    s[a.dateTool] = date;
                    if (a.dateTool == "") {
                        ngModel.$setViewValue(date);
                    }
                }

                $('#reservation').on('click', function () {
                    if ($kalendae.is(':visible')) {
                        $kalendae.hide();
                    } else {
                        $kalendae.show();
                        $kalendae.css({
                            top: $(this).offset().top + 33,
                            left: $(this).offset().left
                        });

                        var closed = function (e) {
                            if ($(e.target).closest('#reservation').length === 0 && $(e.target).closest($kalendae).length === 0) {
                                if ($kalendae.is(':visible')) {
                                    $kalendae.hide();
                                    $(window).off('click', closed);
                                }
                            }
                        };
                        $(window).on('click', closed);
                    }
                });


            }
        };
    })
    /**
     * 单日期选择工具
     */
    .directive("dateSingle", function () {
        return {
            restrict: "A",
            require: '?ngModel',
            link: function (s, e, a, ngModel) {
                e.kalendae({
                    attachTo: document.body,
                    months: 1,
                    mode: 'single',
                    format: 'YYYY-M-D',
                    titleFormat: 'YYYY年MMMM',
                    subscribe: {
                        'change': function (date, action) {
                            ngModel.$setViewValue(date.format("yyyy-MM-dd"));
                        }
                    }
                });
                // console.info(singleDate);
                ngModel.$render = function () {
                    var str = ngModel.$viewValue ? ngModel.$viewValue : "";
                    e.val(str);
                };

            }
        };
    });

})();