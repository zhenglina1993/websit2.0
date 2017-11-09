var common = angular.module("common", []);
common.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider", "$httpProvider", config1]);

function config1($provide, $compileProvider, $controllerProvider, $filterProvider, $httpProvider) {
    common.controller = $controllerProvider.register;
    common.directive = $compileProvider.directive;
    common.filter = $filterProvider.register;
    common.factory = $provide.factory;
    common.provider = $provide.provider;
    common.service = $provide.service;
    common.constant = $provide.constant;
    common.value = $provide.value;
    //$httpProvider.interceptors.push("ajaxInterceptor");
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
};
common.controller("articleauditdetail", ["$scope", "$http", "$sce", function (scope, http, sce) {
    function getQueryStringByName(name) {

        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";

        }
        return result[1];

    }
    var id = getQueryStringByName("id");
    scope.GetDetail = function () {
        if (id > 0) {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetArticleAuditDetail", id: id })
            .success(function (data) {
                if (data.success) {
                    scope.title = data.title;
                    scope.content = sce.trustAsHtml(data.content);
                    scope.time = data.time;
                } else {
                    alert(data.errorMsg);
                }
            })
        } else {
            alert("error");
        }
    }
    scope.GetDetail();
}])