(function () {
    angular.module("default", ["ngRoute", "laydate", "uploader", "kindeditor", "dateTool"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            // 账户流水
            .when("/default", {
                controller: 'default',
                templateUrl: '/content/ngtmpl/default/default.html'
            })          
            .otherwise({ "redirectTo": "/default" });
    }])
    .controller("default", ["$scope", "$http", function (scope, http) {
        scope.AliPay = true;
        scope.WechatPay = false;

        scope.isShow = false;
        scope.imgsrc = "";
        scope.code_url = "";
        scope.data = {};
        scope.amount = 200;
        scope.getmerchatdetails = function () {
            http.post("/finance/MerchantDetails")
            .success(function (data) {
                scope.data = data;
            })
        };
        scope.getmerchatdetails();


        //region消费明细
        scope.DateRange = new Date().addDays(0);
        scope.searchTypeId = "-1";
        scope.searchDescription = "";
        scope.minAmount = "";
        scope.maxAmount = "";
        scope.pageSize = 10;
        scope.list = [];

        var types = {
            1: "充值",
            2: "扣钱",
            3: "系统充值",
            4: "系统扣钱",
        };
        scope.Types = types;
        scope.type = function (typeId) {
            return types[typeId];
        };

        scope.datetime = function (timespan, format) {
            return timespan.formatDateTime(timespan, format);
        }

        scope.getlist = function (scope, page) {
            var minAmount;
            if (isNaN(scope.minAmount)) {
                minAmount = 0;
            }
            else {
                minAmount = Number(scope.minAmount);
            }
            var maxAmount;
            if (isNaN(scope.maxAmount)) {
                maxAmount = 0;
            }
            else {
                maxAmount = Number(scope.maxAmount);
            }
            http.post("/finance/AccountLogList", { dateRange: scope.DateRange,accountLogTypeId:-1, accountTypeId: scope.searchTypeId, description: scope.searchDescription, minAmount: minAmount, maxAmount: maxAmount, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.AccountLogs;
                scope.pager.init(data.TotalRecordCount);
            })
        }

        // scope.pages = scope.pager.pages;

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
            }, scope.pageSize, 1);
        }

        scope.searchDateChange = function (num) {
            if (num == 0) {
                scope.DateRange = new Date().addDays(0);
            }
            else {
                scope.DateRange = new Date().addDays(num) + "~" + new Date().addDays(0);
            }
            scope.search();
        }
        scope.search();
        //endregion



        scope.setalipay = function () {
            scope.AliPay = true;
            scope.WechatPay = false;
        }
        scope.setwechatpay = function () {
            scope.AliPay = false;
            scope.WechatPay = true;
        }

        scope.TopUpId = 0;
        //微信支付
        scope.rechargewechatpay = function () {
            http.post("/finance/MerchantTopUpByWechat", { amount: scope.amount })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    //微信扫码支付
                    scope.isShow = true;
                    scope.TopUpId = data.Data[0]
                    scope.code_url = data.Data[1];
                    scope.imgsrc = "/finance/GetQRCodeImg?code_url= +" + scope.code_url;
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        };

        scope.isNotified = false;
        scope.SelectTopUpStatusId = function () {
            if (scope.WechatPay == true && scope.TopUpId == 0 && scope.isNotified == false) {
                http.post("/finance/SelectTopUpById", { topUpId: scope.TopUpId })
                .success(function (data) {
                    if (scope.isNotified == false) {
                        if (data.CodeStatus == "200") {
                            scope.isNotified = true;
                        }
                    }
                })
            }
        };
        setInterval(scope.SelectTopUpStatusId, 100000);
        //支付宝支付
        scope.rechargealipay = function () {
            http.post("/finance/MerchantTopUpByAli", { amount: scope.amount })
            .success(function (data) {
                if (data.CodeStatus != "200") {
                    alert(data.ErrorMessage);
                }
                $("#divhtml").html(data);
            })
        };

    }])

})();