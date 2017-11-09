(function(){
    "use strict"
    myapp.factory("ajaxInterceptor", ["$q", "$httpParamSerializerJQLike", "$rootScope", ajaxInterceptorFn]);
    function ajaxInterceptorFn($q, $httpParamSerializerJQLike, $rootScope) {
        var requestInterceptor = {
            //提交成功 http://foreigntrain.hz.taeapp.com
            request: function (res) {
                var res = angular.copy(res);
                if (res.method == "POST") {
                    $rootScope.token = "IGmGHT6m5SgGA7U69rpvSRL6C5ReseC9";
                    res.url = "http://139.224.186.99:8080" + res.url;
                    // res.url = "http://localhost:8080" + res.url;
                };
                return $q.resolve(res);
            },
            //提交失败
            requestError: function (res) {
                return $q.reject(res);
            },
            //返回成功
            response: function (res) {
                if (res.data.StateCode) {
                    if (res.data.IsSuccess) {
                        return $q.resolve(res);
                    } else {
                        // toaster.pop("error", "", res.Message);
                        if (res.data.NeedLogin) {
                            // toaster.pop("error", "", "访问出错，请重新登录！");
                            // location.href = "http://p4p.0577site.com/goAli.html";
                        }
                        return $q.reject(res);
                    };
                } else {
                    return $q.resolve(res);
                }
            },
            //返回失败
            responseError: function (res) {
                if (res.status === -1) {
                    // toaster.pop("error", "", "网络请求出错，请确定网络正常后，重新开始。");
                }
                if (res.status === 404) {
                    // toaster.pop("error", "", "接口404！");
                }
                //if (res.data.Error_Info === "no online" || res.data.Error_Info === "user not online") {
                //    $rootScope.$broadcast("NotOnline", "");
                //};
                return $q.reject(res);
            }
        };
        return requestInterceptor;
    };
}());