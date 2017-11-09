(function () {
    angular.module("finance", ["ngRoute", "laydate", "uploader", "kindeditor", "dateTool"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            // 账户流水
            .when("/accountloglist", {
                controller: 'accountloglist',
                templateUrl: '/content/ngtmpl/finance/accountloglist.html?v=201511252041'
            })
            // 充值记录
            .when("/topuplist", {
                controller: 'topuplist',
                templateUrl: '/content/ngtmpl/finance/topuplist.html'
            })
            //充值
            .when("/rechargepay", {
                controller: 'rechargepay',
                templateUrl: '/content/ngtmpl/finance/recharge_pay.html'
            })
            .otherwise({ "redirectTo": "/accountloglist" });
    }])
    .controller("rechargepay", ["$scope", "$http", function (scope, http) {
        scope.AliPay = true;
        scope.WechatPay = false;

        scope.code_url = "";
        scope.data = {};
        scope.amount = 20;
        scope.getmerchatdetails = function () {
            http.post("/finance/MerchantDetails")
            .success(function (data) {
                scope.data = data;
            })
        };
        scope.getmerchatdetails();

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
            //$.ajaxSetup({
            //    async: false
            //});
            //$.post("/finance/MerchantTopUpByWechat", { amount: scope.amount }, function (data) {
            //    if (data.CodeStatus == "200") {
            //        //微信扫码支付
            //        scope.isShow = true;
            //        scope.TopUpId = data.Data[0]
            //        scope.code_url = data.Data[1];
            //        window.open("/finance/CreateQRCodeImg?code_url= +" + scope.code_url + "&topUpId=" + scope.TopUpId, "_black");
            //    }
            //    else {
            //        alert(data.ErrorMessage);
            //    }
            //    $.ajaxSetup({
            //        async: true
            //    });
            //}, "json");

            var amount;
            if (isNaN(scope.amount)) {
                amount = 0;
            }
            else {
                amount = Number(scope.amount);
            }
            if (scope.data.MerchantId != 1 && amount < 20)
            {
                alert("充值金额不低于20");
                return;
            }

            window.open("/finance/MerchantTopUpByWechat?amount=" + scope.amount);


            //http.post("/finance/MerchantTopUpByWechat", { amount: scope.amount })
            //.success(function (data) {

            //})
        };

        //支付宝支付
        scope.rechargealipay = function () {
            var amount;
            if (isNaN(scope.amount)) {
                amount = 0;
            }
            else {
                amount = Number(scope.amount);
            }
            if (scope.data.MerchantId != 1 && amount < 20) {
                alert("充值金额不低于20");
                return;
            }
            window.open("/finance/MerchantTopUpByAli?amount=" + scope.amount, "_black");
        };

    }])

    .controller("topuplist", ["$scope", "$http", function (scope, http) {
        scope.DateRange = new Date().addDays(-30);
        scope.searchStatus = "-1";
        scope.searchType = "-1";
        scope.pageSize = 20;
        scope.list = [];

        var statuss = {
            1: "未到账",
            2: "已到账",
        };
        scope.Statuss = statuss;
        scope.status = function (statusId) {
            return statuss[statusId];
        };
        var types = {
            1: "微信",
            2: "支付宝",
        };
        scope.Types = types;
        scope.type = function (statusId) {
            return types[statusId];
        };


        scope.datetime = function (timespan, format) {
            return timespan.formatDateTime(timespan, format);
        }

        scope.getlist = function (scope, page) {
            http.post("/finance/TopUpList", { dateRange: scope.DateRange, topUpTypeId: scope.searchType, statusId: scope.searchStatus, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.TopUps;
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


    }])

     .controller("accountloglist", ["$scope", "$http", function (scope, http) {
         scope.DateRange = new Date().addDays(-30);
         scope.searchTypeId = "-1";
         scope.searchAccountTypeId = "-1";
         scope.searchDescription = "";
         scope.minAmount = "";
         scope.maxAmount = "";
         scope.pageSize = 20;
         scope.list = [];
         var accountlogtypes = {
             1: "乐点多",
             2: "分享汇"
         };
         scope.Accountlogtypes = accountlogtypes;
         scope.accountlogtype = function (typeId) {
             return accountlogtypes[typeId];
         };

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
             http.post("/finance/AccountLogList", { dateRange: scope.DateRange,accountLogTypeId:scope.searchAccountTypeId, accountTypeId: scope.searchTypeId, description: scope.searchDescription, minAmount: minAmount, maxAmount: maxAmount, currentPage: page, pageSize: scope.pageSize })
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


     }])
})();