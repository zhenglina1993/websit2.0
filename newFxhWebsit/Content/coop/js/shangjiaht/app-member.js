(function () {
    angular.module("member", ["ngRoute", "laydate", "uploader", "kindeditor"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/edit", {
                controller: 'editormanage',
                templateUrl: '/content/ngtmpl/editor_manage.html'
            })
            .when("/list", {
                controller: 'jurisdiction',
                templateUrl: '/content/ngtmpl/jurisdiction.html'
            })
            .when("/list/edit/:memberid/:membername", {
                controller: 'editmember',
                templateUrl: '/content/ngtmpl/edit-member.html'
            })
            .otherwise({ "redirectTo": "/edit/:merchantid" });
    }])
    .controller("editormanage", ["$scope", "$http", function (scope, http) {
        scope.MerchantId = "";
        scope.MerchantName = "";
        scope.AreaCode = "";
        scope.Address = "";
        scope.Mobile = "";
        scope.Email = "";
        scope.QQ = "";

        scope.Shengs = [];
        scope.Shis = [];
        scope.Qus = [];
        scope.Sheng = "";
        scope.Shi = "";
        scope.Qu = "";

        scope.getdetails = function () {
            http.post("/member/viewmanager")
            .success(function (data) {
                scope.MerchantId = data.MerchantId;
                scope.MerchantName = data.MerchantName;
                scope.AreaCode = data.AreaCode;
                scope.Address = data.Address;
                scope.Mobile = data.Mobile;
                scope.Email = data.Email;
                scope.QQ = data.QQ;
                scope.Shengs = data.ListSheng;               
                scope.Shis = data.ListShi;
                scope.Qus = data.ListQu;
                scope.Sheng = scope.AreaCode.substring(0, 2) + "0000";
                scope.Shi = scope.AreaCode.substring(0, 4) + "00";
                scope.Qu = scope.AreaCode;
            })
        }
        scope.getdetails();

        scope.editmanager = function () {
            if(confirm("确认保存？"))
            {
                http.post("/member/editmanager", { merchantId: scope.MerchantId, merchantName: scope.MerchantName, areaCode: scope.Qu, address: scope.Address, mobile: scope.Mobile, email: scope.Email, qq: scope.QQ })
                  .success(function (data) {
                      if(data.CodeStatus=="200")
                      {
                          alert("设置成功");
                      }
               })
            }
        }       

        scope.ChangeSheng = function () {
            http.post("/member/getshis", { sheng: scope.Sheng })
               .success(function (data) {
                   scope.Shis = data;
                   scope.Qus = [];

                   scope.Shi = "";
                   scope.Qu = "";
               })
        }

        scope.ChangeShi = function () {          
            http.post("/member/getqus", { shi: scope.Shi })
               .success(function (data) {
                   scope.Qus = data;               
                   scope.Qu = "";
               })
        }

    }])

    .controller("jurisdiction", ["$scope", "$http", function (scope, http) {
       // scope.BASE_CDN = BASE_CDN;

        scope.list = [];

        scope.getlist = function () {
            http.post("/member/memberList")
            .success(function (data) {
                scope.list = data;
            })
        }
        scope.getlist();
        

        

      
    }])

     .controller("editmember", ["$scope", "$http", '$routeParams', function (scope, http,route) {
         scope.MenberId = route.memberid;
         scope.MemberName = route.membername;
         scope.OldPwd = "";
         scope.NewPwd = "";
         scope.ConfirmNewPwd = "";
         //scope.Pwd = route.pwd;
         //scope.Status = route.status;

         //scope.Status = 1;


         scope.EditMember = function () {
             http.post("/member/EditMember", { memberId: scope.MenberId, memberName: scope.MemberName, oldPwd: scope.OldPwd, newPwd: scope.NewPwd, confirmNewPwd: scope.ConfirmNewPwd })
             .success(function (data) {
                 if(data.CodeStatus == "200")
                 {
                     alert("设置成功");
                     window.location.href = "#/list";
                 }
                 else
                 {
                     alert(data.ErrorMessage);
                 }
             })
         }





     }])


})();
