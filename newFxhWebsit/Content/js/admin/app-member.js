/*用户管理*/
(function () {

    myapp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when("/memberlist", {
            controller: 'memberlist',
            templateUrl: '/content/ngtmpl/member/member_list.html?v=20151015'
        })
        .when("/memberdetail/:memberId", {
            controller: "memberdetail",
            templateUrl: '/content/ngtmpl/member/memberDetail.html?v=20161205'
        })
        .when("/memberarticlelist/:agencyId/:memberId", {
            controller: "memberarticlelist",
            templateUrl: '/content/ngtmpl/member/memberarticle_list.html?v=20170921'
        })
        .when("/memberarticlelist/:agencyId/:memberId", {
            controller: "memberarticlelist",
            templateUrl: '/content/ngtmpl/member/memberarticle_list.html?v=20170921'
        })
        .when("/house", {
            controller: "houselist",
            templateUrl: '/content/ngtmpl/product/house_list.html'
        })
        
        .when("/car", {
            controller: "carlist",
            templateUrl: '/content/ngtmpl/product/car_list.html'
        })
    }])
    .controller("carlist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.list = [];
        scope.pages = 20;
        scope.count = 0;
        
        scope.provinceAreas = {};
        scope.cityAreas = {};

        //搜索条件
        //省市县
        scope.provinceid = -1;
        scope.cityid = -1;
        scope.areaid = -1;

        scope.type = "0";
        //价格及方式
        scope.maxproce = "";
        scope.minprice = "";

        scope.keyword = "";
        scope.GetCarList = function () {
            var params = {

                method:"GetCarList"
            }
            http.post("/Handlers/Producthandler.ashx", params)
            .success(function(data) {
                scope.list = data.list;
                scope.count = data.count;
            })
        }
        scope.GetCarList();
        scope.search = function() {
            
        }

        scope.TprovinceAreaId = "0";
        scope.TcityAreaId = "-1";
        scope.TAreaId = "-1";
        scope.provinceAreas = [];
        scope.cityAreas = [];
        scope.Areas = [];
        //获取省
        scope.getTProArea = function () {
            http.post("/Handlers/Producthandler.ashx", { pid: 0, method: "GetListForProCityArea" })
            .success(function (data) {
                scope.provinceAreas = data.list;
                //scope.TcityAreaId = "-1";
                //scope.TAreaId = "-1";
            })
        }
        scope.getTProArea();
        //获取市列表
        scope.getTCityArea = function () {
            http.post("/Handlers/Producthandler.ashx", { pid: scope.TprovinceAreaId, method: "GetListForProCityArea" })
            .success(function (data) {
                scope.cityAreas = data.list;
                scope.TcityAreaId = "-1";
                scope.TAreaId = "-1";
            })
        }
        //获取区列表
        scope.getTArea = function () {
            http.post("/Handlers/Producthandler.ashx", { pid: scope.TcityAreaId, method: "GetListForProCityArea" })
            .success(function (data) {
                scope.Areas = data.list;
                scope.TAreaId = "-1";
            })
        }
    }])
    .controller("houselist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.list = [];
        scope.pages = 20;
        scope.count = 0;

        //scope.levelId=user.level.
        scope.provinceAreas = {};
        scope.cityAreas = {};

        //搜索条件
        //省市县
        scope.provinceid = -1;
        scope.cityid = -1;
        scope.areaid = -1;

        scope.type = "0";
        //价格及方式
        scope.maxproce="";
        scope.minprice="";
        scope.paytype = "";
        //房屋信息
        scope.hx="";
        scope.fwlx = "";
        scope.zxcd = "";
        scope.fwmj = "";
        scope.minmj = "";
        scope.maxmj = "";
        scope.fwcx = "";
        scope.lc = "";
        scope.zlc = "";
        scope.fj = "";
        //来源 个人/中介
        scope.sf = "";

        //关键字搜索
        scope.keyword = "";
        scope.addname = "";
        scope.adddescription = "";

        scope.TprovinceAreaId = "0";
        scope.TcityAreaId = "-1";
        scope.TAreaId = "-1";
        scope.provinceAreas = [];
        scope.cityAreas = [];
        scope.Areas = [];
        //获取省
        scope.getTProArea = function () {
            http.post("/Handlers/Producthandler.ashx", { pid: 0, method: "GetListForProCityArea" })
            .success(function (data) {
                scope.provinceAreas = data.list;
                //scope.TcityAreaId = "-1";
                //scope.TAreaId = "-1";
            })
        }
        scope.getTProArea();
        //获取市列表
        scope.getTCityArea = function () {
            http.post("/Handlers/Producthandler.ashx", { pid: scope.TprovinceAreaId, method: "GetListForProCityArea" })
            .success(function (data) {
                scope.cityAreas = data.list;
                scope.TcityAreaId = "-1";
                scope.TAreaId = "-1";
            })
        }
        //获取区列表
        scope.getTArea = function () {
            http.post("/Handlers/Producthandler.ashx", { pid: scope.TcityAreaId, method: "GetListForProCityArea" })
            .success(function (data) {
                scope.Areas = data.list;
                scope.TAreaId = "-1";
            })
        }

        
       
        scope.gethouselist = function (page) {
            var params = {
                ProvinceId: scope.TprovinceAreaId,
                CityId: scope.TcityAreaId,
                AreaId: scope.TAreaId,
                Type: scope.type,
                maxproce: scope.maxproce,
                minprice: scope.minprice,
                minmj: scope.minmj,
                maxmj: scope.maxmj,
                paytype: scope.paytype,
                hx: scope.hx,
                fwlx: scope.fwlx,
                zxcd: scope.zxcd,
                fwcx: scope.fwcx,
                lc: scope.lc,
                zlc: scope.zlc,
                fj: scope.fj,
                sf: scope.sf,
                keyword: scope.keyword,
                method: "GetHouseList"
            };
            http.post("/Handlers/Producthandler.ashx",  params )
            .success(function(data) {
                scope.list = data.list;
                    console.log(data);
            });
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.gethouselist(page);
            }, scope.pageSize, 1);
        }
        scope.search();


        scope.addtype="0";
        scope.addTprovinceAreaId = "0";
        scope.addTcityAreaId = "-1";
        scope.addTAreaId = "-1";
        scope.addpaytype = "";
        scope.addprice="";
        //房屋信息
        scope.addhx = "";
        scope.addfwlx = "";
        scope.addzxcd = "";
        scope.addfwmj = "";
        scope.addminmj = "";
        scope.addmaxmj = "";
        scope.addfwcx = "";
        scope.addlc = "";
        scope.addzlc = "";
        
        scope.addfj = "";
        //来源 个人/中介
        scope.addsf = "";
        scope.addname = "";
        scope.adddescription = "";

        scope.UploadPic = function () {
            var code = angular.element("#imgs")[0];
            //var template = "<img id=\"img" + code + "\" src=\"" + data.src + "\" />";
            //angular.element("#imgs").append(template);
            angular.element("#imgs").append(template);
            //console.log(code);
            //http.post("", {})
            //.success(function (data) {
            //    console.log(data);
            //    var template = "<img id=\"img" + code + "\" src=\""+data.src+"\" />";
            //    angular.element("#imgs").append(template);
            //})
        }
        scope.isadd= false;
        scope.add = function() {
            scope.isadd = true;
        }
        scope.close =function() {
            scope.isadd = false;
        }
        scope.ToStatu = function (houseId, statu) {
            http.post("/Handlers/Producthandler.ashx", { houseId: houseId, statu: statu, method: "ToTop" })
            .success(function(data) {
                if (data.success) {
                    alert("置顶成功");
                }
            })
        }
        
    }])

    /*用户列表*/
    .controller("memberlist", ["$scope", "$http", function (scope, http) {
        scope.list = [];
        scope.pageSize = 20;
        scope.count = 0;
        scope.provinceAreas = {};
        scope.cityAreas = {};
        //var memberSearch = service.Get('memberSearch');
        var memberSearch = localStorage.getItem('memberSearch');
        if (memberSearch != undefined && memberSearch != null) {
            memberSearch = JSON.parse(memberSearch);

            scope.keyword = memberSearch.keyword;
            scope.agency_keyword = memberSearch.agency_keyword;
            //scope.CreateDateRange = memberSearch.CreateDateRange;
            scope.ActiveDateRange = memberSearch.ActiveDateRange;
            scope.isActive = memberSearch.isActive;
            scope.provinceAreaId = memberSearch.provinceAreaId;
            scope.cityAreaId = memberSearch.cityAreaId;
        } else {
            scope.keyword = "";
            scope.agency_keyword = "";
            //scope.CreateDateRange = "";
            scope.ActiveDateRange = "";
            scope.isActive = "-1";
            scope.provinceAreaId = "-1";
            scope.cityAreaId = "0";
        }
        localStorage.removeItem('memberSearch');

        scope.getlevelId = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetLoginLevel" })
            .success(function (data) {
                scope.levelId = data.levelId;
            })
        }

        scope.getmemberlist = function (page) {
            var params = { ActiveDateRange: scope.ActiveDateRange, keyword: scope.keyword, agency_keyword: scope.agency_keyword, pageIndex: page, pageSize: scope.pageSize, isActive: scope.isActive, cityAreaId: scope.cityAreaId, provinceAreaId: scope.provinceAreaId, method: "Getlist" }
            http.post("/Handlers/Memberhandler.ashx", params)
            .success(function (data) {
                //service.Set('memberSearch', params);
                localStorage.setItem('memberSearch', JSON.stringify(params));

                scope.list = data.memberlist;
                scope.count = data.count;
                scope.pager.init(data.count);
                scope.getProvinceArea();
            })
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getmemberlist(page);
            }, scope.pageSize, 1);
        }

        scope.getlevelId();
        scope.search();
        //1解冻 2解绑 4作废 解封
        scope.updateMember = function (memberId, value, type) {
            var tip="";
            if (type==1) {
                tip=value=="1"?"封号后用户将不能登录及使用其它功能，确定封禁该用户？":"确定解封该用户？";
            }
            else if(type==2) {
                tip="是否确认解绑？";
            }
            else if (type==5) {
                tip=value=="1"?"确定禁止该用户上传视频吗？":"确定允许该用户上传视频？";
            }
            //if (confirm(type == "2" ? "是否确认解绑？" : type == "4" ? "是否确认作废？" : value == "1" ? "是否确认冻结？" :value "是否确认解封？")) {
            if (confirm(tip)) {
                http.post("/Handlers/Memberhandler.ashx", { memberId: memberId, value: value, type: type, method: "UpdateMember" })
                .success(function (data) {
                    if (data.success) {
                        alert("操作成功");
                        scope.close();
                        scope.search();
                    }
                    else {
                        alert("操作失败");
                    }
                })
            }
        }

        scope.isOpen = false;
        scope.isOpenChangeMember = false;
        scope.MemberId = 0;
        //type 1 更换手机  2离职更换
        scope.open = function (memberId, type) {
            if (type == 1) {
                scope.isOpen = true;
            }
            else if (type == 2) {
                scope.isOpenChangeMember = true;
            }

            scope.MemberId = memberId;
            scope.MobilePhone = "";
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.isOpenChangeMember = false;
            scope.MemberId = 0;
            scope.MobilePhone = "";
        }
        //更换手机号
        scope.changemobile = function () {
            if (confirm("确认更改？")) {
                http.post("/Handlers/Memberhandler.ashx", { memberId: scope.MemberId, value: scope.MobilePhone, type: 3, method: "UpdateMember" })
                 .success(function (data) {
                     if (data.success) {
                         alert("更新成功");
                         scope.search();
                         scope.close();
                     }
                     else if (data.success == false && data.errorCode == "2001") {
                         if (confirm("账户已存在，是否确认覆盖？")) {
                             http.post("/Handlers/Memberhandler.ashx", { memberId: scope.MemberId, value: scope.MobilePhone, type: 4, method: "UpdateMember" })
                             .success(function (data) {
                                 if (data.success) {
                                     alert("更新成功");
                                     scope.search();
                                     scope.close();
                                 }
                             })
                         }
                     }
                     else {
                         alert("更新失败");
                     }
                 })
            }

        }
        //离职员工更换手机
        scope.changeMemberActiveCode = function () {
            if (!confirm("执行该操作后原员工将不再属于本企业,您确认要执行该操作吗？")) {
                return;
            }

            http.post("/admin.asmx/ChangeMemberActiveCode", { member_id: scope.MemberId, mobile: scope.MobilePhone })
            .success(function (data) {
                if (data.success) {
                    alert("操作成功")
                    scope.search();
                    scope.close();
                }
                else {
                    alert(data.errorMsg);
                }
            });
        }
        //获取省
        scope.getProvinceArea = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
            .success(function (data) {
                for (var i = 0; i < data.Arealist.length; i++) {
                    if (data.Arealist[i].areaId == 0) continue;
                    scope.provinceAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                }
            })
        }

        scope.getCityArea = function () {
            if (scope.provinceAreaId != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.provinceAreaId, method: "GetArea" })
                .success(function (data) {
                    scope.cityAreas = {
                    };
                    if (data.Arealist.length > 0) {
                        for (var i = 0; i < data.Arealist.length; i++) {
                            scope.cityAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                        }
                    }
                })
            }
        }

        scope.getChildCityAreas = function () {
            scope.cityAreaId = "0";
            scope.getCityArea();
        }

        scope.ToDetail = function (memberId) {
            window.location.href = "/Member/Index.aspx#/memberdetail/" + memberId;
        }

        //添加备注
        scope.isAddRemark = false;
        scope.isOpenAddRemark = function (memberId) {
            scope.isAddRemark = true;
            scope.addRemarkmemberId = memberId;
            scope.Reamrk = "";
        }
        scope.closeAddRemark = function () {
            scope.isAddRemark = false;
            scope.addRemarkmemberId = 0;
            scope.Reamrk = "";
        }

        scope.addRemark = function () {
            if (scope.addRemarkmemberId > 0) {
                http.post("/Handlers/Memberhandler.ashx", { memberId: scope.addRemarkmemberId, remark: scope.Reamrk, method: "AddRemark" })
                .success(function (data) {
                    if (data.success) {
                        alert("添加备注成功");
                        scope.closeAddRemark();
                        scope.search();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("用户不存在");
            }
        }
        scope.ToMemberarticlelist = function (memberId) {
            window.location.href = "/Member/Index.aspx#/memberarticlelist/0/" + memberId;
        }
    }])
    /*用户详情*/
    .controller("memberdetail", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.memberId = route.memberId;
        if (scope.memberId > 0) {
            http.post("/Handlers/Memberhandler.ashx", { memberId: scope.memberId, method: "GetMemberDetail" })
            .success(function (data) {
                if (data.success) {
                    scope.memberDetail = JSON.parse(data.memberDetail);
                    scope.className = scope.memberDetail.IsActive ? "col_1" : "col_2";
                } else {
                    alert(data.errorMsg);
                }
            })
        } else {
            alert("用户不存在");
        }
    }])
    /*用户新闻*/
    .controller("memberarticlelist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.list = [];
        scope.pageSize = 20;

        scope.keyword = "";
        scope.member_keyword = "";
        scope.DateRange = "";
        scope.count = 0;
        scope.orderByl = "0";
        scope.orderByc = "0";
        scope.orderByt = "0";
        scope.agencyId = route.agencyId;
        scope.memberId = route.memberId;

        scope.getlist = function (page) {
            http.post("/Handlers/Memberhandler.ashx", { DateRange: scope.DateRange, keyword: scope.keyword, member_keyword: scope.member_keyword, pageIndex: page, pageSize: scope.pageSize, orderBy: scope.orderBy, agencyId: scope.agencyId, memberId: scope.memberId, method: "GetMemberArticleList" })
            .success(function (data) {
                scope.ExportHref = '/admin.asmx/ExportEnterpriseArticle?searchparams=' + JSON.stringify({ DateRange: scope.DateRange, keyword: scope.keyword, member_keyword: scope.member_keyword, pageIndex: page, pageSize: scope.pageSize, orderBy: scope.orderBy, agencyId: scope.agencyId, memberId: scope.memberId, method: "GetMemberArticleList" });
                scope.list = data.list;
                scope.count = data.count;
                scope.pager.init(data.count);
            })
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.changeOrderBy = function () {
            //scope.orderBy = scope.orderByl == 0 ? (scope.orderByc == 0 ? scope.orderByt : scope.orderByc) : scope.orderByl;
            if (scope.orderByl != 0) {
                scope.orderBy = scope.orderByl;
            }
            if (scope.orderByc != 0) {
                scope.orderBy = scope.orderByc;
            }
            if (scope.orderByt != 0) {
                scope.orderBy = scope.orderByt;
            }
            scope.orderByt = "0";
            scope.orderByl = "0";
            scope.orderByc = "0";
            scope.search();
        }

        scope.getlevelId = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetLoginLevel" })
            .success(function (data) {
                scope.levelId = data.levelId;
            })
        }

        scope.getlevelId();

        scope.search();
    }])
})();