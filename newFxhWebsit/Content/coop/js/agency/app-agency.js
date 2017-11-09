(function () {
    angular.module("agency", ["ngRoute", "laydate", "uploader", "kindeditor", "dateTool"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider       
            // 修改密码
            .when("/changepwd", {
                controller: 'changepwd',
                templateUrl: '/content/ngtmpl/agency/changepwd.html'
            })
            // 编辑推广信息
            .when("/agencyinfo", {
                controller: 'agencyinfo',
                templateUrl: '/content/ngtmpl/agency/agencyinfo.html'
            })
            // 激活码
            .when("/activecodelist", {
                controller: 'activecodelist',
                templateUrl: '/content/ngtmpl/agency/activecodelist.html'
            })
            // 激活码New
            .when("/activecodelistnew/:mobilephone/:splitStatusId/:agencyId", {
                controller: 'activecodelistnew',
                templateUrl: '/content/ngtmpl/agency/activecodelistnew.html'
            })
            // 商户
            .when("/agencylist/:agencyName/:isDelete", {
                controller: 'agencylist',
                templateUrl: '/content/ngtmpl/agency/agencylist.html'
            })
            // 商户
            .when("/higheragencylist/:agencyName/:isDelete", {
                controller: 'higheragencylist',
                templateUrl: '/content/ngtmpl/agency/higheragencylist.html'
            })
            // 商户
            .when("/merchantlist/:merchantname", {
                controller: 'merchantlist',
                templateUrl: '/content/ngtmpl/agency/merchantlist.html'
            })
             // 商户文章
            .when("/merchantarticlelist/:agencyId/:merchantId", {
                controller: 'merchantarticlelist',
                templateUrl: '/content/ngtmpl/agency/merchantarticlelist.html'
            })
            // 商户文章
            .when("/merchantarticlestatistics/:MerchantArticleId", {
                controller: 'merchantarticlestatistics',
                templateUrl: '/content/ngtmpl/agency/merchantarticlestatistics.html'
            })
            // 代理商提现记录
            .when("/agencydrawinglist", {
                controller: 'agencydrawinglist',
                templateUrl: '/content/ngtmpl/agency/agencydrawinglist.html'
            })
            // 代理商账户流水
            .when("/agencyaccountloglist", {
                controller: 'agencyaccountloglist',
                templateUrl: '/content/ngtmpl/agency/agencyaccountloglist.html'
            })
            // 代理商邀请统计
            .when("/agencyinvitestatistics", {
                controller: 'agencyinvitestatistics',
                templateUrl: '/content/ngtmpl/agency/agencyinvitestatistics.html'
            })
            //代理商邀请统计详情
            .when("/agencyinvitestatisticsDetaile", {
                controller: 'agencyinvitestatisticsDetaile',
                templateUrl: '/content/ngtmpl/agency/agencyinvitestatisticsDetaile.html'
            })
             // 代理商（企业号） 上传二维码
            .when("/agencyqrcodelist", {
                controller: 'agencyqrcodelist',
                templateUrl: '/content/ngtmpl/agency/agencyqrcodelist.html'
            })
            // 推广热门文章
            .when("/agencyarticlelist", {
                controller: 'agencyarticlelist',
                templateUrl: '/content/ngtmpl/agency/agencyarticlelist.html'
            })
            .when("/wechatgrouplist", {
                controller: 'wechatgrouplist',
                templateUrl: '/content/ngtmpl/agency/wechatgrouplist.html'
            })
            .when("/addwechatgroup/:wechatgroupid", {
                controller: 'addwechatgroup',
                templateUrl: '/content/ngtmpl/agency/addwechatgroup.html'
            })
            .when("/templetsourcelist", {
                controller: 'templetsourcelist',
                templateUrl: '/content/ngtmpl/agency/templetsourcelist.html'
            })
            .when("/addtempletsource", {
                controller: 'addtempletsource',
                templateUrl: '/content/ngtmpl/agency/addtempletsource.html'
            })
            .otherwise({ "redirectTo": "/activecodelist" });
    }])
     //修改密码
    .controller("changepwd", ["$scope", "$http", function (scope, http) {
        scope.OldPwd = "";
        scope.NewPwd = "";
        scope.ConfirmNewPwd = "";

        scope.changepwd = function () {
            if (scope.NewPwd != scope.ConfirmNewPwd) {
                alert("确认密码与新密码不一致");
                return;
            }
            //$.ajax({
            //    type: "POST",
            //    url: "/agency/changepwd?oldPwd=" + scope.OldPwd + "&newPwd=" + scope.NewPwd,
            //    async: false,
            //    dataType: "json",
            //    success: function (data) {
            //        if (data.CodeStatus == "200") {
            //            window.location.href = "/agency/login";
            //        }
            //        else {
            //            alert(data.ErrorMessage);
            //        }
            //    }
            //});

            http.post("/agency/changepwd", { OldPwd: scope.OldPwd, NewPwd: scope.NewPwd })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    window.parent.location.href = "/agency/login";
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }        

    }])
     //编辑推广信息
    .controller("agencyinfo", ["$scope", "$http", function (scope, http) {
        scope.agencyinfo = {};

        scope.getagencyinfo = function () {
            http.post("/agency/AgencyInfo")
            .success(function (data) {
                scope.agencyinfo = data.Data;
            })
        }

        scope.updateagencyinfo = function () {
            http.post("/agency/UpdateAgencyInfo", scope.agencyinfo)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("修改成功");
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }
        scope.getagencyinfo();


    }])
        //激活码
    .controller("activecodelist", ["$scope", "$http", function (scope, http) {
        scope.DateRange = new Date().addDays(-7);
        scope.statusId = -1;
        scope.activeCode = "";
        scope.mobilePhone = "";
        scope.merchantName = "";
        scope.pageSize = 20;
        scope.list = [];

        scope.Statuss = [{ Id: -1, Name: "使用状态" }, { Id: 1, Name: "未使用" }, { Id: 2, Name: "已使用" }, { Id: 3, Name: "已作废" }]


        scope.datetime = function (timespan, format) {
            if (timespan) {
                return timespan.formatDateTime(timespan, format);
            }
        }

        scope.getlist = function (scope, page) {
            http.post("/agency/ActiveCodeList", { activeCode: scope.activeCode, merchantName: scope.merchantName, dateRange: scope.DateRange, statusId: scope.statusId, mobilePhone: scope.mobilePhone, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.Data.ActivationCodes;
                scope.TotalRecordCount = data.Data.TotalRecordCount;
                scope.pager.init(data.Data.TotalRecordCount);
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

        scope.statusChange = function (item) {
            http.post("/agency/ResetActiveCodeStatus", item)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("修改成功");
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }

        scope.isShow = false;

        scope.open = function () {
            scope.isShow = true;            
        }
        scope.close = function () {
            scope.isShow = false;            
        }
        scope.isEdit = false;
        scope.openEdit = function (item) {
            scope.isEdit = true;
            scope.ActiveCode = item.ActiveCode;
            scope.StatusId = item.StatusId;
            scope.MerchantName = item.MerchantName;
            scope.Remark = item.Remark;
        }
        scope.closeEdit = function () {
            scope.isEdit = false;
            scope.ActiveCode = "";
            scope.StatusId = "";
            scope.MerchantName = "";
            scope.Remark = "";
        }
        scope.updateActiveCode = function () {
            var params = {
                ActiveCode: scope.ActiveCode,
                StatusId: scope.StatusId,
                MerchantName: scope.MerchantName,
                Remark: scope.Remark
            }
            http.post("/agency/updateActiveCode", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("更新成功");
                    scope.closeEdit();
                    scope.search();
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }

    }])
         //激活码
    .controller("activecodelistnew", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.AgencyLevelId = AgencyLevelId;
        scope.DateRange = new Date().addDays(-7);
        scope.statusId = -1;
        scope.searchKey = {};
        scope.searchKey.splitStatusId = scope.AgencyLevelId == '0' ? 0 : Number(route.splitStatusId);
        scope.activeCode = "";
        scope.mobilePhone = route.mobilephone == "0" ? "":route.mobilephone;
        scope.merchantName = "";
        scope.pageSize = 20;
        scope.list = [];
        scope.AgencyId = route.agencyId;

        scope.Statuss = [{ Id: -1, Name: "使用状态" }, { Id: 1, Name: "未使用" }, { Id: 2, Name: "已使用" }, { Id: 3, Name: "已作废" }]
        scope.SplitStatuss = [{ Id: 0, Name: "未分配" }, { Id: 1, Name: "已分配" }]

        scope.datetime = function (timespan, format) {
            if (timespan) {
                return timespan.formatDateTime(timespan, format);
            }
        }

        scope.getlist = function (scope, page) {
            http.post("/agency/ActiveCodeListNew", { activeCode: scope.activeCode, splitStatusId: scope.searchKey.splitStatusId, statusId: scope.statusId, mobilePhone: scope.mobilePhone, currentPage: page, pageSize: scope.pageSize, agencyId: scope.AgencyId })
            .success(function (data) {
                scope.list = data.Data.ActiveCodeList;
                scope.TotalRecordCount = data.Data.TotalRecordCount;
                scope.pager.init(data.Data.TotalRecordCount);
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

       
        scope.isEdit = false;
        scope.openEdit = function (item) {
            scope.isEdit = true;
            scope.ActiveCode = item.ActiveCode;
            scope.StatusId = item.StatusId;
            scope.MerchantName = item.MerchantName;
            scope.Remark = item.Remark;
        }
        scope.closeEdit = function () {
            scope.isEdit = false;
            scope.ActiveCode = "";
            scope.StatusId = "";
            scope.MerchantName = "";
            scope.Remark = "";
        }
        scope.remarkActiveCode = function () {
            var params = {
                ActiveCode: scope.ActiveCode,
                Remark: scope.Remark
            }
            http.post("/agency/RemarkActiveCode", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("更新成功");
                    scope.closeEdit();
                    scope.search();
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }

    }])
        //商户
    .controller("merchantlist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.DateRange = new Date().addDays(-30);
        scope.merchantName = route.merchantname == 0 ? "": route.merchantname;
        scope.pageSize = 20;
        scope.list = [];
        
        scope.datetime = function (timespan, format) {
            return timespan.formatDateTime(timespan, format);
        }

        scope.getlist = function (scope, page) {            
            http.post("/agency/merchantlist", { dateRange: scope.DateRange,merchantName:scope.merchantName, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.Data.ActivationCodes;
                scope.TotalRecordCount = data.Data.TotalRecordCount;
                scope.pager.init(data.Data.TotalRecordCount);
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
        //代理商管理
    .controller("agencylist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.IsDelete = route.isDelete;
        scope.AgencyLevelId = AgencyLevelId;
        scope.AgencyLevels = [{ Id: 2, Name: "代理商" }, { Id: 0, Name: "企业号" }];
        scope.childAgency = {};
        scope.childAgency.ChildAgencyLevelId = 0;
        //scope.AgencyTypes = [{ Id: 0, Name: "请选择" }, { Id: 1, Name: "1万档" }, { Id: 2, Name: "2万档" }, { Id: 3, Name: "3万档" }];
        scope.AgencyTypes = [{ Id: 0, Name: "请选择" }, { Id: 1, Name: "黄金" }, { Id: 2, Name: "铂金" }, { Id: 3, Name: "钻石" }];
        scope.childAgency.ChildAgencyTypeId = 0;

        //scope.$watch(function () { console.info(scope.childAgency.ChildAgencyTypeId); });
        
        scope.DateRange = new Date().addDays(-30);
        scope.agencyName = route.agencyName == 0 ? "" : route.agencyName;
        scope.pageSize = 20;
        scope.list = [];
        scope.Statuss = [{ Id: -1, Name: "状态" }, { Id: 1, Name: "正常" }, { Id: 2, Name: "取消资格" }];
        scope.Spreads = [{ Id: 1, Name: "是" }, { Id: 0, Name: "否" }]
        scope.datetime = function (timespan, format) {
            return timespan.formatDateTime(timespan, format);
        }

        scope.level = function (levelid) {
            return scope.AgencyLevels.where(function (o) { return o.Id == levelid })[0].Name;
        }
        scope.type = function (typeid) {
            var typeName = scope.AgencyTypes.where(function (o) { return o.Id == typeid })[0].Name;
            if (typeName == "请选择") {
                return "";
            }
            return typeName;
        }

        scope.getlist = function (scope, page) {
            http.post("/agency/AgencyStatisticsList", { agencyName: scope.agencyName, IsDelete: scope.IsDelete, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.Data.AgencyStatisticss;
                scope.TotalRecordCount = data.Data.TotalRecordCount;
                scope.pager.init(data.Data.TotalRecordCount);
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


        scope.isShow = false;
        scope.StatusId = 1;
        scope.open = function () {
            scope.isShow = true;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.Remark = "";
            scope.IsSpread = 1;
            scope.childAgency.ChildAgencyLevelId = 0;
            scope.childAgency.ChildAgencyTypeId = 0;
        }
        scope.openEdit = function (item) {
            scope.isShow = true;
            scope.AgencyId = item.AgencyId;
            scope.AgencyName = item.AgencyName;
            scope.MobilePhone = item.MobilePhone;
            scope.StatusId = item.StatusId;
            scope.Remark = item.Remark;
            scope.IsSpread =item.IsSpread;
            scope.childAgency.ChildAgencyLevelId = item.AgencyLevelId;
            scope.childAgency.ChildAgencyTypeId = item.AgencyTypeId;
        }
        scope.close = function () {
            scope.isShow = false;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.StatusId = 1;
            scope.Remark = "";
            scope.IsSpread = 1;
            scope.childAgency.ChildAgencyLevelId = 0;
            scope.childAgency.ChildAgencyTypeId = 0;
        }
        scope.saveAgency = function () {
            if (scope.childAgency.ChildAgencyLevelId == 0)
            {
                scope.childAgency.ChildAgencyTypeId = 0;
            }
            else if (scope.childAgency.ChildAgencyTypeId == 0) {
                alert("请选择类型 几万档？");
                return;
            }
            var params = { AgencyId: scope.AgencyId, AgencyName: scope.AgencyName, MobilePhone: scope.MobilePhone, Remark: scope.Remark, StatusId: scope.StatusId, AgencyLevelId: scope.childAgency.ChildAgencyLevelId, AgencyTypeId: scope.childAgency.ChildAgencyTypeId,IsSpread:scope.IsSpread };
            http.post("/Agency/saveAgency", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("保存成功");
                    scope.close();
                    scope.search();
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }


        scope.isSplit = false;
        scope.openSplit = function (agencyId, agencyname) {
            scope.childAgencyId = agencyId;
            scope.isSplit = true;
            scope.mobilePhone = agencyname;
            scope.activeCount = "";
        }
        
        scope.closeSplit = function () {
            scope.childAgencyId = 0;
            scope.isSplit = false;
            scope.mobilePhone = "";
            scope.activeCount = "";
        }

        scope.splitActiveCode = function () {
            var params = { childAgencyId: scope.childAgencyId, activeCount: scope.activeCount };
            http.post("/Agency/SplitActiveCode", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("保存成功");
                    scope.closeSplit();
                    scope.search();
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }

        scope.resetPwd = function (agencyId) {
            var params = { childAgencyId: agencyId };
            http.post("/Agency/ResetAgencyPwd", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("密码已重置为123456");
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }

        scope.Delete = function (agencyId, isDelete) {
            http.post("/Agency/DeleteAgency", { childAgencyId: agencyId, IsDelete: isDelete }).success(function (data) {
                if (data.CodeStatus == "200") {
                    if (isDelete == 0) {
                        alert("恢复成功");
                    } else {
                        alert("删除成功");
                    }
                    scope.search();
                } else {
                    alert(data.ErrorMessage);
                }
            })
        }

        scope.isRemark = false;
        scope.openRemark = function (agencyId, agencyName, remark, mobilephone, statusId, agencyLevelId,agencyTypeId) {
            scope.isRemark = true;
            scope.AgencyId = agencyId;
            scope.AgencyName = agencyName;
            scope.Remark = remark;
            scope.MobilePhone = mobilephone;
            scope.StatusId = statusId;
            scope.childAgency.ChildAgencyLevelId = agencyLevelId;
            scope.childAgency.ChildAgencyTypeId = agencyTypeId;
        }
        scope.closeRemark = function () {
            scope.isRemark = false;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.StatusId = 1;
            scope.Remark = "";
            scope.childAgency.ChildAgencyLevelId = 0;
            scope.childAgency.ChildAgencyTypeId = 0;
        }
        scope.saveRemark = function () {
            if (scope.childAgency.ChildAgencyLevelId == 0) {
                scope.childAgency.ChildAgencyTypeId = 0;
            }
            var params = { AgencyId: scope.AgencyId, AgencyName: scope.AgencyName, MobilePhone: scope.MobilePhone, Remark: scope.Remark, StatusId: scope.StatusId, AgencyLevelId: scope.childAgency.ChildAgencyLevelId };
            http.post("/Agency/saveAgency", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("保存成功");
                    scope.closeRemark();
                    scope.search();
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }


    }])
        .controller("higheragencylist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
            scope.IsDelete = route.isDelete;
            scope.AgencyLevelId = AgencyLevelId;
            scope.agencyLevel = "-1";
            scope.agencyType = "-1";
            scope.AgencyLevels = [{ Id: 2, Name: "代理商" }, { Id: 0, Name: "企业号" }];
            var agencyLevels = {
                0: "企业号",
                2: "代理商",
            };
            scope.TAgencyLevels = agencyLevels;
            var agencyTypes = {
                1: "黄金",
                2: "铂金",
                3: "钻石",
            };
            scope.TAgencyTypes = agencyTypes;
            scope.childAgency = {};
            scope.childAgency.ChildAgencyLevelId = 0;
            //scope.AgencyTypes = [{ Id: 0, Name: "请选择" }, { Id: 1, Name: "1万档" }, { Id: 2, Name: "2万档" }, { Id: 3, Name: "3万档" }];
            scope.AgencyTypes = [{ Id: 0, Name: "请选择" }, { Id: 1, Name: "黄金" }, { Id: 2, Name: "铂金" }, { Id: 3, Name: "钻石" }];
            scope.childAgency.ChildAgencyTypeId = 0;

            //scope.$watch(function () { console.info(scope.childAgency.ChildAgencyTypeId); });

            scope.DateRange = new Date().addDays(-30);
            scope.agencyName = route.agencyName == 0 ? "" : route.agencyName;
            scope.pageSize = 20;
            scope.list = [];
            scope.Statuss = [{ Id: -1, Name: "状态" }, { Id: 1, Name: "正常" }, { Id: 2, Name: "取消资格" }];
            scope.Spreads = [{ Id: 1, Name: "是" }, { Id: 0, Name: "否" }]
            scope.datetime = function (timespan, format) {
                return timespan.formatDateTime(timespan, format);
            }

            scope.level = function (levelid) {
                return scope.AgencyLevels.where(function (o) { return o.Id == levelid })[0].Name;
            }
            scope.type = function (typeid) {
                var typeName = scope.AgencyTypes.where(function (o) { return o.Id == typeid })[0].Name;
                if (typeName == "请选择") {
                    return "";
                }
                return typeName;
            }

            scope.getlist = function (scope, page) {
                http.post("/agency/HigherAgencyStatisticsList", {
                    agencyName: scope.agencyName, IsDelete: scope.IsDelete, currentPage: page, pageSize: scope.pageSize,
                    agencyLevel: scope.agencyLevel > 0 ? scope.agencyType : scope.agencyLevel
                })
                .success(function (data) {
                    scope.list = data.Data.AgencyStatisticss;
                    scope.TotalRecordCount = data.Data.TotalRecordCount;
                    scope.pager.init(data.Data.TotalRecordCount);
                })
            }

            // scope.pages = scope.pager.pages;

            scope.search = function () {
                scope.pager = new Pager(function (page) {
                    scope.getlist(scope, page);
                }, scope.pageSize, 1);
            }

            scope.agencyLevelsearch = function () {
                if (scope.agencyLevel==0) {
                    scope.search();
                }
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


            scope.isShow = false;
            scope.StatusId = 1;
            scope.open = function () {
                scope.isShow = true;
                scope.AgencyId = 0;
                scope.AgencyName = "";
                scope.MobilePhone = "";
                scope.Remark = "";
                scope.IsSpread = 1;
                scope.childAgency.ChildAgencyLevelId = 0;
                scope.childAgency.ChildAgencyTypeId = 0;
            }
            scope.openEdit = function (item) {
                scope.isShow = true;
                scope.AgencyId = item.AgencyId;
                scope.AgencyName = item.AgencyName;
                scope.MobilePhone = item.MobilePhone;
                scope.StatusId = item.StatusId;
                scope.Remark = item.Remark;
                scope.IsSpread = item.IsSpread;
                scope.childAgency.ChildAgencyLevelId = item.AgencyLevelId;
                scope.childAgency.ChildAgencyTypeId = item.AgencyTypeId;
            }
            scope.close = function () {
                scope.isShow = false;
                scope.AgencyId = 0;
                scope.AgencyName = "";
                scope.MobilePhone = "";
                scope.StatusId = 1;
                scope.Remark = "";
                scope.IsSpread = 1;
                scope.childAgency.ChildAgencyLevelId = 0;
                scope.childAgency.ChildAgencyTypeId = 0;
            }
            scope.saveAgency = function () {
                if (scope.childAgency.ChildAgencyLevelId == 0) {
                    scope.childAgency.ChildAgencyTypeId = 0;
                }
                else if (scope.childAgency.ChildAgencyTypeId == 0) {
                    alert("请选择类型 几万档？");
                    return;
                }
                var params = { AgencyId: scope.AgencyId, AgencyName: scope.AgencyName, MobilePhone: scope.MobilePhone, Remark: scope.Remark, StatusId: scope.StatusId, AgencyLevelId: scope.childAgency.ChildAgencyLevelId, AgencyTypeId: scope.childAgency.ChildAgencyTypeId, IsSpread: scope.IsSpread };
                http.post("/Agency/saveAgency", params)
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        alert("保存成功");
                        scope.close();
                        scope.search();
                    }
                    else {
                        alert(data.ErrorMessage);
                    }
                })
            }


            scope.isSplit = false;
            scope.openSplit = function (agencyId, agencyname) {
                scope.childAgencyId = agencyId;
                scope.isSplit = true;
                scope.mobilePhone = agencyname;
                scope.activeCount = "";
            }

            scope.closeSplit = function () {
                scope.childAgencyId = 0;
                scope.isSplit = false;
                scope.mobilePhone = "";
                scope.activeCount = "";
            }

            scope.splitActiveCode = function () {
                var params = { childAgencyId: scope.childAgencyId, activeCount: scope.activeCount };
                http.post("/Agency/SplitActiveCode", params)
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        alert("保存成功");
                        scope.closeSplit();
                        scope.search();
                    }
                    else {
                        alert(data.ErrorMessage);
                    }
                })
            }

            scope.resetPwd = function (agencyId) {
                var params = { childAgencyId: agencyId };
                http.post("/Agency/ResetAgencyPwd", params)
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        alert("密码已重置为123456");
                    }
                    else {
                        alert(data.ErrorMessage);
                    }
                })
            }

            scope.Delete = function (agencyId,isDelete) {
                http.post("/Agency/DeleteAgency", { childAgencyId: agencyId, IsDelete: isDelete }).success(function (data) {
                    if (data.CodeStatus == "200") {
                        if (isDelete==0) {
                            alert("恢复成功");
                        } else {
                            alert("删除成功");
                        }
                        scope.search();
                    } else {
                        alert(data.ErrorMessage);
                    }
                })
            }

            scope.isRemark = false;
            scope.openRemark = function (agencyId, agencyName, remark, mobilephone, statusId, agencyLevelId, agencyTypeId) {
                scope.isRemark = true;
                scope.AgencyId = agencyId;
                scope.AgencyName = agencyName;
                scope.Remark = remark;
                scope.MobilePhone = mobilephone;
                scope.StatusId = statusId;
                scope.childAgency.ChildAgencyLevelId = agencyLevelId;
                scope.childAgency.ChildAgencyTypeId = agencyTypeId;
            }
            scope.closeRemark = function () {
                scope.isRemark = false;
                scope.AgencyId = 0;
                scope.AgencyName = "";
                scope.MobilePhone = "";
                scope.StatusId = 1;
                scope.Remark = "";
                scope.childAgency.ChildAgencyLevelId = 0;
                scope.childAgency.ChildAgencyTypeId = 0;
            }
            scope.saveRemark = function () {
                if (scope.childAgency.ChildAgencyLevelId == 0) {
                    scope.childAgency.ChildAgencyTypeId = 0;
                }
                var params = { AgencyId: scope.AgencyId, AgencyName: scope.AgencyName, MobilePhone: scope.MobilePhone, Remark: scope.Remark, StatusId: scope.StatusId, AgencyLevelId: scope.childAgency.ChildAgencyLevelId };
                http.post("/Agency/saveAgency", params)
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        alert("保存成功");
                        scope.closeRemark();
                        scope.search();
                    }
                    else {
                        alert(data.ErrorMessage);
                    }
                })
            }


        }])
        //商户文章
     .controller("merchantarticlelist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
         scope.AgencyLevelId = AgencyLevelId;
         scope.DateRange = new Date().addDays(-15);
         scope.merchantId = route.merchantId;
         scope.agencyId = route.agencyId;
         scope.statusId = "-1";
         scope.advertTypeId = "-1";
         scope.keywords = "";
         //scope.isDirect = 1;
         scope.pageSize = 20;
         scope.list = [];
         var statuss = {
             0: "未分享",
             1: "已分享"
         };
         scope.Statuss = statuss;
         scope.status = function (statusId) {
             return statuss[statusId];
         };

         var advertTypes = {
             1: "通栏广告",
             2: "图文广告",
             3: "名片广告",
             4: "二维码广告",
         };
         scope.AdvertTypes = advertTypes;
         scope.type = function (typeId) {
             return advertTypes[typeId];
         };

         var directTypes = {
             1: "是",
             2: "否"        
         };
         scope.DirectTypes = directTypes;


         scope.datetime = function (timespan, format) {
             return timespan.formatDateTime(timespan, format);
         }

         scope.getlist = function (page) {
             http.post("/agency/MerchantArticleList", { dateRange: scope.DateRange, agencyId: scope.agencyId, merchantId: scope.merchantId, statusId: scope.statusId, advertTypeId: scope.advertTypeId, keywords: scope.keywords, currentPage: page, pageSize: scope.pageSize})
             .success(function (data) {
                 scope.list = data.Data.MerchantArticles;
                 scope.TotalRecordCount = data.Data.TotalRecordCount;
                 scope.SumExposeNum = data.Data.SumExposeNum;
                 scope.SumClickNum = data.Data.SumClickNum;
                 scope.SumForwardNum = data.Data.SumForwardNum;
                 scope.SumLikeNum = data.Data.SumLikeNum;
                 scope.pager.init(data.Data.TotalRecordCount);
             })
         }

         scope.search = function () {
             scope.pager = new Pager(function (page) {
                 scope.getlist(page);
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


         scope.isRemark = false;
         scope.openRemark = function (merchantId,merchantName,remark) {
             scope.isRemark = true;
             scope.MerchantId = merchantId;
             scope.MerchantName = merchantName;
             scope.Remark = remark;           
         }
         scope.closeRemark = function () {
             scope.isRemark = false;
             scope.MerchantId = 0;
             scope.MerchantName = "";
             scope.Remark = "";
         }
         scope.saveRemark = function () {
             var params = { MerchantId: scope.MerchantId, Remark: scope.Remark};
             http.post("/Agency/remarkMerchant", params)
             .success(function (data) {
                 if (data.CodeStatus == "200") {
                     alert("保存成功");
                     scope.closeRemark();
                     scope.search();
                 }
                 else {
                     alert(data.ErrorMessage);
                 }
             })
         }

     }])
     //商户文章点击统计数据
     .controller("merchantarticlestatistics", ["$scope", "$http", "$routeParams", function (scope, http, route) {
         scope.MerchantArticleId = route.MerchantArticleId;
         scope.list = [];
         scope.getdetails = function () {
             http.post("/agency/SelectMerchantArticleStatisticsById", { MerchantArticleId: scope.MerchantArticleId })
             .success(function (data) {
                 scope.list = data.Data;
             })
         }
         scope.getdetails();

         

     }])
    //代理商提现记录
    .controller("agencydrawinglist", ["$scope", "$http", function (scope, http) {
        scope.DateRange = new Date().addDays(-7);
        scope.statusId = -1;       
        scope.pageSize = 20;
        scope.list = [];
        //0 = 未处理，1 = 已处理，2 = 处理失败，3已审核{ Id: 3, Name: "已审核" },
        scope.Statuss = [{ Id: -1, Name: "处理状态" }, { Id: 0, Name: "未处理" }, { Id: 1, Name: "已处理" }, { Id: 2, Name: "处理失败" }]
        scope.Status = function (id) {
            return scope.Statuss.where(function (o) { return o.Id == id })[0]["Name"];
        }
        scope.isOpen = false;

        scope.datetime = function (timespan, format) {
            if (timespan) {
                return timespan.formatDateTime(timespan, format);
            }
        }

        scope.getlist = function (scope, page) {
            http.post("/agency/AgencyDrawingList", { dateRange: scope.DateRange, statusId: scope.statusId, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.Data.AgencyDrawings;
                scope.TotalRecordCount = data.Data.TotalRecordCount;
                scope.pager.init(data.Data.TotalRecordCount);
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

        
        //scope.open = function (item) {
        //    scope.isOpen = true;
        //    scope.AgencyDrawingId = item.agencyDrawingId;
        //    scope.Amount = item.Amount;
        //    scope.BankCode = item.BankCode;
        //    scope.BankAccountNo = item.BankAccountNo;
        //    scope.ActualName = item.ActualName;
        //}
        scope.open = function () {
            scope.isOpen = true;
            scope.AgencyDrawingId = 0;
            scope.Amount = 0;
            scope.BankCode = "微信";
            scope.BankAccountNo = "";
            scope.ActualName = "";
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.AgencyDrawingId = 0;
            scope.Amount = 0;
            scope.BankCode = "微信";
            scope.BankAccountNo = "";
            scope.ActualName = "";
        }
        scope.saveAgencyDrawing = function () {
            if(confirm("确定提交？提交后不能修改"))
            {
                http.post("/Agency/AddAgencyDrawing", {Amount:scope.Amount, bankCode: scope.BankCode, bankAccountNo: scope.BankAccountNo, ActualName: scope.ActualName })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        alert("提交成功");
                        scope.close();
                        scope.search();
                    }
                    else {
                        alert(data.ErrorMessage);
                    }
                })
            }            
        }
    }])
     //代理商账户流水
    .controller("agencyaccountloglist", ["$scope", "$http", function (scope, http) {
        scope.DateRange = new Date().addDays(-7);
        scope.pageSize = 20;
        scope.list = [];
        //0 = 未处理，1 = 已处理，2 = 处理失败，3已审核
        scope.AccountTypes = [{ Id: -1, Name: "类别" }, { Id: 1, Name: "充值" }, { Id: 2, Name: "扣款" }, { Id: 3, Name: "系统充值" }, { Id: 4, Name: "系统扣款" }]
        scope.type = function (id) {
            return scope.AccountTypes.where(function (o) { return o.Id == id })[0]["Name"];
        }   
        scope.datetime = function (timespan, format) {
            if (timespan) {
                return timespan.formatDateTime(timespan, format);
            }
        }
        scope.accountTypeId = -1;
        scope.description = "";
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
            http.post("/agency/AgencyAccountLogList", { dateRange: scope.DateRange, AccountTypeId: scope.accountTypeId, Description: scope.description, minAmount: minAmount, maxAmount: maxAmount, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.Data.AgencyAccountLogs;
                scope.TotalRecordCount = data.Data.TotalRecordCount;
                scope.pager.init(data.Data.TotalRecordCount);
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

        .service('agencyinvitestatisticsService', [function () {
            var obj = {
                DateRange: ""
            };
            return obj;
        }])
     //代理商邀请统计
    .controller("agencyinvitestatistics", ["$scope", "$http", 'agencyinvitestatisticsService', function (scope, http, service) {
        scope.DateRange = new Date().addDays(-7);
        scope.pageSize = 20;
        scope.InviteTypes = [];
        scope.list = [];
        scope.searchObj = {};
        scope.searchObj.InviteTypeId = 0;
        scope.searchObj.SearchKey = "";
        scope.getInviteTypes = function () {            
            http.post("/agency/GetAgencyInviteTypes")
            .success(function (data) {
                scope.InviteTypes = data.Data.InviteTypes;               
            })
        }
        scope.getInviteTypes();
        scope.type = function (id) {
            return scope.InviteTypes.where(function (o) { return o.Id == id })[0]["Name"];
        }

        scope.getlist = function () {
            service.DateRange = scope.DateRange;
            http.post("/agency/agencyinvitestatistics", {dateRange: scope.DateRange,agencyId: scope.searchObj.InviteTypeId, searchKey: scope.searchObj.SearchKey })
           .success(function (data) {
               scope.list = data.Data.AgencyInviteStatistics;
           })
        }
        scope.getlist();
        scope.searchDateChange = function (num) {
            if (num == 0) {
                scope.DateRange = new Date().addDays(0);
            }
            else {
                scope.DateRange = new Date().addDays(num) + "~" + new Date().addDays(0);
            }
            scope.getlist();
        }
    }])

    .controller("agencyinvitestatisticsDetaile", ["$scope", "$http", "$routeParams", "agencyinvitestatisticsService", function (scope, http, route, service) {
        scope.list = [];
        scope.agencyId = route.agencyId;
        scope.getlist = function () {
            http.post("/agency/agencyinvitestatisticsDetaile", { agencyId: scope.agencyId, dateRange: service.DateRange })
            .success(function (data) {
                scope.list = data.Data.AgencyInviteStatisticsDetaile;
            });
        }
        scope.getlist();
    }])
     //代理商（企业号） 上传二维码
    .controller("agencyqrcodelist", ["$scope", "$http", function (scope, http) {
        scope.list = [];

        scope.getlist = function () {
            http.post("/agency/AgencyQRCodelist")
            .success(function (data) {
                scope.list = data.Data;                
            })
        }

        scope.getlist();

        scope.setQRCodeUrl = function (url) {
            scope.QRCodeUrl = url;
            scope.$apply();
        }

        scope.isOpen = false;
        scope.open = function () {
            scope.isOpen = true;
            scope.Title = "";
            scope.QRCodeUrl = "";
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.Title = "";
            scope.QRCodeUrl = "";
        }
        scope.save = function () {
            http.post("/Agency/AddAgencyQRCode", { title: scope.Title, qrCodeUrl: scope.QRCodeUrl })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("添加成功");
                    scope.close();
                    scope.getlist();
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }
        scope.delete = function (agencyQRCodeId) {
            http.post("/Agency/DeleteAgencyQRCode", { agencyQRCodeId:agencyQRCodeId })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("删除成功");
                    scope.close();
                    scope.getlist();
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }
        }])
        //文章上传上热门
    .controller("agencyarticlelist", ["$scope", "$http", function (scope, http) {
         scope.BASE_CDN = BASE_CDN;
         scope.DateRange = new Date().addDays(0);
         scope.Categorys = [];
         scope.articleCategoryId = -1;
        
         scope.getCategorys = function () {
             http.post("/agency/GetCategorys")
             .success(function (data) {
                 scope.Categorys = data.Data;
                 scope.Categorys.insert(0, { ArticleCategoryId: -1, CategoryName: "选择分类" });
             })
         }
         scope.getCategorys();
         scope.list = [];
         scope.pageSize = 20;

         scope.title = "";
         scope.getList = function (page) {
             http.post("/agency/AgencyArticleList", { dateRange: scope.DateRange, articleCategoryId: scope.articleCategoryId, title: scope.title, currentpage: page, pageSize: scope.pageSize })
             .success(function (data) {
                 scope.list = data.Data.ArticleMerchants;
                 scope.pager.init(data.Data.TotalRecordCount);
             })
         }

         scope.search = function () {
             scope.pager = new Pager(function (page) {
                 scope.getList(page);
             }, scope.pageSize, 1);
         }
         scope.search();

         scope.searchDateChange = function (num) {
             if (num == 0) {
                 scope.DateRange = new Date().addDays(0);
             }
             else {
                 scope.DateRange = new Date().addDays(num) + "~" + new Date().addDays(0)
             }
             scope.search();
         }

         scope.isShow = false;
         scope.article = {};
         scope.open = function () {
             scope.isShow = true;
             scope.article.SourceUrl = "";
             scope.article.ArticleCategoryId = -1;
             scope.article.Flag = 1;
             scope.article.Remark = "";
         };
         scope.close = function () {
             scope.isShow = false;
             scope.article.SourceUrl = "";
             scope.article.ArticleCategoryId = -1;
             scope.article.Flag = 1;            
             scope.article.Remark = "";
         };
         scope.save = function () {
             scope.article.CategoryName = scope.Categorys.where(function (o) { return o.ArticleCategoryId == scope.article.ArticleCategoryId })[0].CategoryName;
             http.post("/agency/AddArticle", scope.article)
             .success(function (data) {
                 if (data.CodeStatus != "200") {
                     alert(data.ErroMessage);
                 }
                 else {
                     alert("添加成功");
                 }
                 scope.close();
                 scope.pager.refresh();
             })
         }

         scope.categorychange = function (item) {
             http.post("/agency/SetArticleCategory", { articleMerchantId: item.ArticleMerchantId, articleId: item.ArticleId, articleCategoryId: item.ArticleCategoryId })
             .success(function (data) {
                 if (data.CodeStatus != "200") {
                     alert(data.ErroMessage);
                 }
             })
         }

        }])

    //微信群
    .controller("wechatgrouplist", ["$scope", "$http", function (scope, http) {
        scope.BASE_CDN = BASE_CDN;

        scope.Categorys = [{ Id: -1, Name: "选择分类" }, { Id: 1, Name: "电商行业" }, { Id: 2, Name: "服务行业" }, { Id: 3, Name: "其他行业" }, { Id: 4, Name: "微商行业" }];
        scope.Statuss = [{ Id: -1, Name: "状态" }, { Id: 0, Name: "未审核" }, { Id: 1, Name: "通过" }, { Id: 2, Name: "不通过" }, { Id: 3, Name: "删除" }];
        scope.list = [];
        scope.pageSize = 20;
        scope.wechatGroupCategoryId = -1;
        scope.wechatStatusId = -1;
        scope.groupName = "";
        scope.getList = function (page) {
            http.post("/agency/WechatGroupList", { wechatGroupCategoryId: scope.wechatGroupCategoryId,wechatStatusId:scope.wechatStatusId, groupName: scope.groupName, currentpage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.Data.WechatGroups;
                scope.pager.init(data.Data.TotalRecordCount);
            })
        }

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getList(page);
            }, scope.pageSize, 1);
        }
        scope.search();

        scope.datetime = function (timespan, format) {
            if (timespan) {
                return timespan.formatDateTime(timespan, format);
            }
        }

        scope.delete = function (wechatGroupId) {
            http.post("/agency/DeleteWechatGroup", { wechatGroupId: wechatGroupId })
            .success(function (data) {
                if (data.CodeStatus != "200") {
                    alert(data.ErroMessage);
                }
                else {
                    alert("删除成功");
                }
                scope.pager.refresh();
            })
        }
    }])

    //添加微信
    .controller("addwechatgroup", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.BASE_CDN = BASE_CDN;
        scope.Categorys = [{ Id: -1, Name: "选择分类" }, { Id: 1, Name: "电商行业" }, { Id: 2, Name: "服务行业" }, { Id: 3, Name: "其他行业" }, { Id: 4, Name: "微商行业" }];
        scope.WechatGroupId = route.wechatgroupid;

        scope.initConfig = function () {
            if (scope.WechatGroupId == "0") {
                scope.item = {
                    WechatGroupId: scope.WechatGroupId,
                    WechatGroupCategoryId: -1,
                    GroupName: "",
                    Description: "",
                    GroupPic: "",
                    WechatID: "",
                    QRCode: "",
                    OrderNum: 0,
                    Remark:"",
                    GroupSourceId: 1,
                    GroupStatusId: 0,
                };
            }
            else {
                http.post("/agency/selectwechatgroupbyid", { WechatGroupId: scope.WechatGroupId })
               .success(function (data) {
                   if (data.CodeStatus == "200") {
                       scope.item = data.Data;
                   }
                   else {
                       alert(data.ErrorMessage);
                   }
               })
            }
        }
        scope.initConfig();

        scope.setGroupPic = function (url) {
            scope.item.GroupPic = url;
            scope.$apply();
        }
        scope.setQRCode = function (url) {
            scope.item.QRCode = url;
            scope.$apply();
        }
        scope.addwechatgroup = function () {
            http.post("/agency/addwechatgroup", scope.item)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("保存成功");
                    window.location.href = "#/wechatgrouplist";
                }
                else {
                    alert(data.ErrorMessage);
                }

            })
        }

    }])

    //素材
    .controller("templetsourcelist", ["$scope", "$http", function (scope, http) {
        scope.BASE_CDN = BASE_CDN;

        //scope.Categorys = [{ Id: -1, Name: "选择分类" }, { Id: 1, Name: "代理商" }, { Id: 2, Name: "美容化妆" }, { Id: 3, Name: "孕婴用品" }, { Id: 4, Name: "家用电器" }, { Id: 5, Name: "金融服务" }, { Id: 6, Name: "网络服务" }, { Id: 7, Name: "教育培训" }, { Id: 8, Name: "软件游戏" }, { Id: 9, Name: "房地产" }, { Id: 10, Name: "交通运输" }];

        scope.list = [];
        scope.pageSize = 20;
        scope.templetCategoryId = 11;
        scope.title = "";
        scope.getList = function (page) {
            http.post("/agency/TempletSourceList", { templetCategoryId: scope.templetCategoryId, currentpage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.Data.TempletSources;
                scope.pager.init(data.Data.TotalRecordCount);
            })
        }

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getList(page);
            }, scope.pageSize, 1);
        }
        scope.search();


        scope.delete = function (templetSourceId) {
            if(confirm("确定删除？"))
            {
                http.post("/agency/DeleteTempletSource", { templetSourceId: templetSourceId })
                .success(function (data) {
                    if (data.CodeStatus != "200") {
                        alert(data.ErroMessage);
                    }
                    scope.pager.refresh();
                })
            }            
        }

    }])
    //添加素材
    .controller("addtempletsource", ["$scope", "$http", function (scope, http) {
        scope.BASE_CDN = BASE_CDN;
        //scope.Categorys = [{ Id: -1, Name: "选择分类" }, { Id: 1, Name: "代理商" }, { Id: 2, Name: "美容化妆" }, { Id: 3, Name: "孕婴用品" }, { Id: 4, Name: "家用电器" }, { Id: 5, Name: "金融服务" }, { Id: 6, Name: "网络服务" }, { Id: 7, Name: "教育培训" }, { Id: 8, Name: "软件游戏" }, { Id: 9, Name: "房地产" }, { Id: 10, Name: "交通运输" }];
        scope.templetCategoryId = 11;

        scope.setTitlePicUrl = function (url) {
            scope.TempletUrl = url;
            scope.$apply();
        }

        scope.addtempletsource = function () {
            http.post("/agency/addtempletsource", { templetCategoryId: scope.templetCategoryId, templetUrl: scope.TempletUrl })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("保存成功");
                    window.location.href = "#/templetsourcelist";
                }
                else {
                    alert(data.ErrorMessage);
                }

            })
        }

    }])
})();