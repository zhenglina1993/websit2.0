(function () {
    myapp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when("/agencylist/:isAll", {
            controller: 'agencylist',
            templateUrl: '/content/ngtmpl/agency/agency_list.html?v=20170920'
        })
        .when("/enterpriselist", {
            controller: 'enterpriselist',
            templateUrl: '/content/ngtmpl/agency/Enterprise_list.html?v=20170921'
        })
        .when("/agencydetail/:agencyId", {
            controller: "agencydetail",
            templateUrl: '/content/ngtmpl/agency/AgencyDetail.html?v=20170828'
        })
        .when("/agencyactivecodelist", {
            controller: "agencyactivecodelist",
            templateUrl: '/content/ngtmpl/membertool/agencyactivecode_list.html?v=20170828'
        })
        .when("/agencyaccountlog", {
            controller: "agencyaccountlog",
            templateUrl: '/content/ngtmpl/agency/AgencyCountlog.html?v=20170828'
        })
        .when("/agencytemplatelist", {
            controller: "agencytemplatelist",
            templateUrl: '/content/ngtmpl/agency/agencytemplate_list.html?v=20170828'
        })
        .when("/agencymateriallist", {
            controller: "agencymateriallist",
            templateUrl: '/content/ngtmpl/agency/agencymaterial_list.html?v=20170828'
        })
        .when("/EnterpriseDetail/:agencyId", {//企业推广数据
            controller: "EnterpriseDetail",
            templateUrl: '/content/ngtmpl/agency/EnterpriseDetail.html'
        })
        .when("/advdown", {
            controller: "advdown",
            templateUrl: '/content/ngtmpl/advert/advdown.html'
        })
        //企业闹钟
        .when("/agency_clock", {
            controller: "agency_clock",
            templateUrl: '/content/ngtmpl/agency/agency_clock.html'
        })
        .when("/ep_home_page/:agencyId", {
            controller: "ep_home_page",
            templateUrl: '/content/ngtmpl/compelect/ep_homepage.html'
        })
        .when("/updateEpconditiom/:advert_id/:agency_id", {
            controller: "updateEpconditiom",
            templateUrl: '/content/ngtmpl/compelect/ep_conditiom.html?v=20170908.1'
        })
        .when("/ep_advert_detail/:advert_id", {
            controller: "ep_advert_detail",
            templateUrl: '/content/ngtmpl/compelect/ep_advert_detail.html'
        })
        .when("/ep_setting", {
            controller: "ep_setting",
            templateUrl: '/content/ngtmpl/compelect/ep_setting.html'
        })
        .when("/ep_advert_data/:agency_id/:advert_id", {
            controller: "ep_advert_data",
            templateUrl: '/content/ngtmpl/compelect/ep_advert_data.html'
        })
        .when("/ep_advert_data_list/:advert_id/:agency_id", {
            controller: "ep_advert_data_list",
            templateUrl: '/content/ngtmpl/compelect/ep_advert_data_list.html'
        })
            //添加/修改互推
               .when("/updateEpadvert/:advert_id/:agency_id", {
                   controller: "updateEpadvert",
                   templateUrl: '/content/ngtmpl/compelect/updateEp_advert.html'
               })
        .when("/advisorytelephone", {
            controller: "advisorytelephone",
            templateUrl: '/content/ngtmpl/sysconfig/advisory_telephone.html'
        })
        .when("/shareprofits", {
            controller: "shareprofits",
            templateUrl: '/content/ngtmpl/agency/share_profits.html?v=20170921'
        })
        .when("/postbar", {
            controller: "postbar",
            templateUrl: '/content/ngtmpl/sysconfig/postbar.html'
        })
        .when("/plate_category", {
            controller: "plate_category",
            templateUrl: '/content/ngtmpl/sysconfig/plate_category.html'
        })
        .when("/plate_list", {
            controller: "plate_list",
            templateUrl: '/content/ngtmpl/sysconfig/plate_list.html'
        })
    }])
    .controller("plate_list", ["$scope", "$http", "$routeParams", "Upload", function (scope, http, route, Upload) {
        scope.list = [];
        scope.category_list = [];
        scope.isShow = false;
        scope.category_id = "-1";
        

        scope.GetCategoryList = function () {
            http.post("/Handlers/Sysconfighandler.ashx", { method: "GetPostPlatCategory" })
            .success(function (data) {
                scope.category_list = data.list;
            })
        }
        scope.CatName = function (id) {
            return scope.category_list.where(function (o) { return o.Id == id })[0].Name
        };

        scope.GetList = function () {
            http.post("/Handlers/Sysconfighandler.ashx", { method: "GetPostPlatName" })
            .success(function (data) {
                scope.list = data.list;
            })
        }
        scope.changecat = function (cat_id) {
            console.log(cat_id);
            http.post("/Handlers/Sysconfighandler.ashx", { cat_id :cat_id,  method: "GetPostPlatNameByCat" })
            .success(function (data) {
                scope.list = data.list;
            })
        }

        scope.add_cat_id = "-1";
        scope.add_plate_name = "";

        scope.AddPlat = function() {
            if (scope.add_cat_id == "-1") {
                alert("请选择版块类别");
                return;
            }
            if (scope.add_plate_name=="") {
                alert("版块名称不能为空");
                return;
            }
            if (scope.imgpath == "") {
                alert("请选择图片");
                return;
            }
            http.post("/Handlers/Sysconfighandler.ashx", { category_id: scope.add_cat_id, plate_name: scope.add_plate_name, imgpath: scope.imgpath, method: "AddPlate" })
            .success(function(data) {
                if (data.success) {
                    alert("添加成功");
                    scope.close();
                } else {
                    alert("新增失败");
                    scope.close();
                }
            })
        }
        scope.imgpath = "";
        scope.uploadImg =function(file) {
            if (file != undefined) {
                if (scope.errorFile != null) {
                    if (scope.errorFile.$error == "maxSize") {
                        alert("图片大小不能超过10MB");
                        return;
                    }
                }
                file.upload = Upload.upload({
                    url: '/Handlers/Sysconfighandler.ashx',
                    data: {
                        method: "UploadPic", folder: "category", file: file
                    }
                }).success(function (data) {
                    console.log(data);
                    if (data.success) {
                        scope.imgpath = data.imgpath;
                    } else {
                        alert(data.errorMsg);
                        scope.close();
                    }
                })
            }
        }
        scope.clearImg =function() {
            scope.imapath = "";
        }

        scope.search = function () {
            scope.GetCategoryList();
            scope.GetList();
        }
        scope.search();
        scope.open = function () {
            scope.isShow = true;
        }
        scope.close = function () {
            scope.isShow = false;
        }
    }])
    .controller("plate_category", ["$scope", "$http", function (scope, http) {

        scope.isShow = false;
        scope.add_plat_cat = "";

        //获取版块分类列表
        scope.GetList = function () {
            http.post("/Handlers/Sysconfighandler.ashx", { method: "GetPostPlatCategory" })
            .success(function (data) {
                console.log(data.list);
                scope.category_list = data.list;
            })
        }

        //添加版块分类
        scope.AddPlatCat = function () {
            if (scope.add_plat_cat=="") {
                alert("版块类别名称不能为空！");
                return;
            }
            http.post("/Handlers/Sysconfighandler.ashx", { plate_category: scope.add_plat_cat, method: "AddPlateCategory" })
            .success(function(data) {
                if (data.success) {
                    alert("添加成功");
                    scope.close();
                    scope.search();
                } else {
                    alert("新增失败"+data.successMsg);
                    scope.close();
                }
            })
        }
        
        scope.search = function () {
            scope.GetList();
        }

        scope.search();

        scope.open = function () {
            scope.isShow = true;
        }
        scope.close = function () {
            scope.isShow = false;
        }
    }])
    .controller("postbar", ["$scope", "$http", function (scope, http) {
        scope.isOpen = false;
        scope.isEdit = false;
        scope.list = [];
        scope.pageSize = 20;
        scope.count = 0;
        scope.getlist = function (scope, page) {
            http.post("/Handlers/Sysconfighandler.ashx", { page: page, method: "GetPostList" })
            .success(function (data) {
                scope.list = data.list;
                scope.pager.init(data.count);
                scope.count = data.count;
            })
            console.log(scope.list);
            console.log(scope.isOpen);
        }
        scope.state = [{ Id: 0, Name: "普通" }, { Id: 1, Name: "精华" }, { Id: 2, Name: "置顶" }];
        scope.states = function (id) {
            return scope.state.where(function (o) { return o.Id == id })[0].Name
        };
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
            }, scope.pageSize, 1);
        }
        scope.search();

        scope.ToTop = function (id, state) {
            http.post("/Handlers/Sysconfighandler.ashx", { id: id, state: state, method: "EditPostState" })
            .success(function (data) {
                if (data.success) {
                    alert("操作成功！");
                } else {
                    alert("操作失败！");
                }
                scope.search();
            })
        }
        scope.DeletePost = function (id) {
            http.post("/Handlers/Sysconfighandler.ashx", { post_id: id, method: "DeletePost" })
            .success(function (data) {
                if (data.success) {
                    alert(data.successMsg);
                    scope.search();
                } else {
                    alert(data.successMsg);
                    console.log(data.successMsg);
                }
            })
        }
    }])

    //分润商管理
    .controller("shareprofits", ["$scope", "$http", "$routeParams", "Upload", function (scope, http, route, Upload) {
        //scope.IsAll = 1;
        //var agencySearch = service.Get('agencySearch');
        //console.log(agencySearch);
        var agencySearch = localStorage.getItem('agencySearch');
        if (agencySearch != undefined && agencySearch != null) {
            agencySearch = JSON.parse(agencySearch);

            scope.keyWord = agencySearch.keyWord;
            scope.parent_keyword = agencySearch.parent_keyword;
            scope.agencyLevelId = agencySearch.agencyLevelId;
            scope.agencyTypeId = agencySearch.agencyTypeId;
            scope.statusId = agencySearch.status;
            scope.TprovinceAreaId = agencySearch.provinceAreaId;
            scope.TcityAreaId = agencySearch.cityAreaId;
        } else {
            scope.agencyLevelId = "-1";
            scope.agencyTypeId = "-1";
            scope.statusId = -1;
            scope.keyWord = "";
            scope.parent_keyword = "";
            scope.TcityAreaId = "-1";
            scope.TprovinceAreaId = "0";
        }

        localStorage.removeItem('agencySearch');//清除local存储

        scope.DateRange = "";
        scope.AgencyId = 0;
        scope.agencyName = "";
        scope.pageSize = 20;
        scope.count = 0;
        scope.list = [];
        scope.provinceAreaId = "-1";
        scope.cityAreaId = "-1";
        scope.provinceAreas = {};
        scope.cityAreas = {};
        scope.Statuss = [{ Id: -1, Name: "状态" }, { Id: 1, Name: "正常" }, { Id: 2, Name: "取消资格" }];
        scope.Spreads = [{ Id: 1, Name: "是" }, { Id: 0, Name: "否" }];
        scope.childAgency = {};
        scope.childAgency.ChildAgencyLevelId = 0;
        scope.agencyTypes = [{ Id: 0, Name: "请选择", Level: 0 }, { Id: 1, Name: "一级", Level: 2 }, { Id: 2, Name: "二级", Level: 2 }, { Id: 3, Name: "三级", Level: 2 }];
        scope.AgencyTypes = [{ Id: 0, Name: "请选择", Level: 0 }, { Id: 1, Name: "一级", Level: 2 }, { Id: 2, Name: "二级", Level: 2 }, { Id: 3, Name: "三级", Level: 2 }];
        scope.childAgency.ChildAgencyTypeId = 0;

        scope.EpCategoryLeverOneIds = {};
        scope.EpCategoryIdOne = "-1";
        scope.EpCategoryLeverTwoIds = {};
        scope.EpCategoryIdTwo = "-1";

        scope.getlevelId = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetLoginLevel" })
            .success(function (data) {
                scope.levelId = data.levelId;
                if (scope.levelId == -1) {
                    scope.AgencyLevels = [{ Id: -1, Name: "请选择合作商级别" }, { Id: 1, Name: "城市合伙人", Level: 1 }, { Id: 2, Name: "合作商", Level: 2 }];//, { Id: 0, Name: "企业号", Level: 0 }
                    scope.TAgencyLevels = { 1: "城市合伙人", 2: "合作商" };//, 0: "企业号"
                } else if (scope.levelId == 1) {
                    scope.AgencyLevels = [{ Id: -1, Name: "请选择合作商级别" }, { Id: 2, Name: "合作商", Level: 2 }];//, { Id: 0, Name: "企业号", Level: 0 }
                    scope.TAgencyLevels = { 2: "合作商" };//, 0: "企业号"
                }
                //else {
                //    scope.AgencyLevels = [{ Id: 0, Name: "企业号", Level: 0 }];
                //    scope.TAgencyLevels = { 0: "企业号" };
                //}
            })
        }


        scope.getlevelId();
        var agencyTypes = { 1: "一级", 2: "二级", 3: "三级", };
        scope.orderlist = [
            { id: 0, name: "默认排序" },
            { id: 1, name: "联系人" },
            { id: 2, name: "公司名称" },
            { id: 3, name: "手机号码" },
            { id: 4, name: "上级代理" },
            { id: 5, name: "城市" },
            { id: 6, name: "激活码数量" },
            { id: 7, name: "类型" },
            { id: 8, name: "开通时间" },
        ];
        scope.orderindex = 0;
        scope.TAgencyTypes = agencyTypes;

        scope.levelchage = function () {
            scope.AgencyTypes = scope.agencyTypes.where(function (o) {
                return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            });
            scope.childAgency.ChildAgencyTypeId = 0;
        }
        scope.level = function (id) {
            return scope.AgencyLevels.where(function (o) { return o.Id == id })[0].Name;
        }
        scope.type = function (id) {
            if (id == 0) {
                return "";
            }
            if (id == -99) {
                return "";
            }
            return scope.agencyTypes.where(function (o) { return o.Id == id })[0].Name;
        }

        scope.getlist = function (scope, page) {
            var params = { IsAll: 1, keyWord: scope.keyWord, parent_keyword: scope.parent_keyword, agencyLevelId: scope.agencyLevelId, agencyTypeId: scope.agencyTypeId, status: scope.statusId, createDt: scope.DateRange, pageIndex: page, pageSize: scope.pageSize, provinceAreaId: scope.TprovinceAreaId, cityAreaId: scope.TcityAreaId, orderindex: scope.orderindex, EpCategoryId: scope.EpCategoryIdTwo, method: "GetShareAgencyList" };

            http.post("/Handlers/Membertoolhandler.ashx", params)
              .success(function (data) {
                  localStorage.setItem('agencySearch', JSON.stringify(params));

                  scope.list = data.Agencylist;
                  scope.count = data.count;
                  scope.pager.init(data.count);
                  scope.getProvinceArea();
                  scope.GetEpCategoryIds();
              })
        }
        //console.log(service.Get('agencySearch'));

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
            }, scope.pageSize, 1);
        }

        scope.search = function (pageindex) {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
            }, scope.pageSize, pageindex);
        }

        scope.agencyLevelsearch = function () {
            if (scope.agencyLevelId == 0 || scope.agencyLevelId == 1) {
                scope.search();
            }
        }

        //一级行业分类获取二级分类
        //scope.GetCategorylevelTwo = function () {
        //    http.post("/Handlers/Membertoolhandler.ashx", { EpCategoryIdOne: scope.EpCategoryIdOne, method: GetCategorylevelTwo })
        //}

        scope.search();

        scope.isShow = false;
        scope.isEdit = false;
        scope.StatusId = 1;
        scope.open = function () {
            scope.CategoryIdOne = "-1";
            scope.CategoryIdTwo = "-1";
            scope.isShow = true;
            scope.isEdit = false;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.Company = "";
            scope.Contact = "";
            scope.Address = "";
            //scope.Remark = "";
            //scope.IsSpread = 1;
            scope.year = myDate.getFullYear();
            scope.month = myDate.getMonth() + 1;
            scope.day = myDate.getDate();
            scope.sale = 1;
            scope.childAgency.ChildAgencyLevelId = -1;
            scope.AgencyTypes = scope.agencyTypes.where(function (o) {
                return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            });
            scope.childAgency.ChildAgencyTypeId = 0;
            scope.Total = 0;//激活码数量
            scope.card_p = ""; scope.filecard_p = "";
            scope.card_s = ""; scope.filecard_s = "";
            scope.license = ""; scope.filelicense = "";
            scope.other = ""; scope.fileother = "";
            scope.email = "";
            scope.disabled = false;
        }
        scope.openEdit = function (item) {
            scope.getProvinceArea();
            scope.provinceAreaId = item.provinceid.toString();
            scope.getCityArea();
            scope.cityAreaId = item.cityid.toString();
            scope.isShow = true;
            scope.isEdit = true;
            scope.AgencyId = item.agencyId;
            scope.AgencyName = item.agencyName;
            scope.MobilePhone = item.mobile;
            scope.StatusId = item.status;
            scope.Company = item.company;
            scope.Contact = item.contact;
            scope.Address = item.address;
            scope.sale = item.sale;
            if (item.task_timelimit == "") {
                scope.task_timelimit = myDate;
            } else {
                scope.task_timelimit = item.task_timelimit;
            }
            scope.year = scope.task_timelimit.substring(0, 4);
            scope.month = scope.task_timelimit.substring(5, 7);
            scope.day = scope.task_timelimit.substring(8, 10);
            scope.paid_amount = item.paid_amount;
            scope.coo_amount = item.coo_amount;
            scope.share_percent = item.share_percent;
            scope.childAgency.ChildAgencyLevelId = item.agencyLevelId;
            //scope.AgencyTypes = scope.agencyTypes.where(function (o) {
            //    return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            //});
            scope.CategoryIdOne = item.parent_id ? (item.parent_id.toString() == "0" ? "-1" : item.parent_id.toString()) : "-1";
            scope.GetCategoryIds(scope.CategoryIdOne);
            scope.CategoryIdTwo = item.parent_id ? (item.category_id.toString() == "0" ? "-1" : item.category_id.toString()) : "-1";
            scope.childAgency.ChildAgencyTypeId = item.agencyTypeId;
            scope.disabled = false;
        }
        scope.close = function () {
            scope.isShow = false;
            scope.isEdit = false;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.StatusId = 1;
            scope.Company = "";
            scope.Contact = "";
            scope.Address = "";
            scope.sale = 1;
            scope.year = "";
            scope.month = "";
            scope.day = "";
            scope.paid_amount = "";
            scope.coo_amount = "";
            scope.share_percent = "";
            scope.childAgency.ChildAgencyLevelId = "-1";
            scope.AgencyTypes = scope.agencyTypes;
            scope.childAgency.ChildAgencyTypeId = 0;
            scope.task_timelimit == "";
            scope.Total = 0;
            scope.card_p = ""; scope.filecard_p = "";
            scope.card_s = ""; scope.filecard_s = "";
            scope.license = ""; scope.filelicense = "";
            scope.other = ""; scope.fileother = "";
            scope.email = "";
            scope.disabled = false;
            scope.isOpenAddActiveCode = false;
            scope.CategoryIdOne = "-1";
            scope.CategoryIdTwo = "-1";
            scope.isRecharge = false;
            scope.addRecharge = 0;
        }

        //获取行业分类信息代理商
        scope.GetEpCategoryIds = function (CatLevel) {
            if (CatLevel > 0) {
                scope.EpCategoryIdTwo = "-1";
                scope.CategoryIdTwo = "-1";
                scope.EpCategoryLeverTwoIds = {};
            } else {
                //scope.EpCategoryIdTwo = "-1";
            }

            http.post("/Handlers/Membertoolhandler.ashx", { Level: CatLevel, method: "GetEpCategoryIds" })
            .success(function (data) {
                for (var i = 0; i < data.EpCategorylist.length; i++) {
                    if (data.EpCategorylist[i].cid == 0) {
                        //scope.EpCategoryIds[data.EpCategorylist[i].cid] = "所有";
                        continue;
                    }
                    if (CatLevel == 0 || CatLevel == -1 || CatLevel == null) {
                        scope.EpCategoryLeverOneIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    } else {
                        scope.EpCategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    }
                }
            })
        }

        scope.CategoryIdOne = "-1";
        scope.CategoryIdTwo = "-1";
        scope.CategoryLeverTwoIds = {};
        scope.GetCategoryIds = function (CatLevel) {
            if (CatLevel > 0) {
                scope.CategoryIdTwo = "-1";
                scope.CategoryLeverTwoIds = {};
            } else {
                scope.CategoryIdTwo = "-1";
            }
            http.post("/Handlers/Membertoolhandler.ashx", { Level: CatLevel, method: "GetEpCategoryIds" })
            .success(function (data) {
                for (var i = 0; i < data.EpCategorylist.length; i++) {
                    if (data.EpCategorylist[i].cid == 0) {
                        //scope.EpCategoryIds[data.EpCategorylist[i].cid] = "所有";
                        continue;
                    }
                    if (CatLevel == 0 || CatLevel == -1 || CatLevel == null) {
                        scope.CategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    } else {
                        scope.CategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    }
                }
            })
        }

        scope.getProvinceArea = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
            .success(function (data) {
                for (var i = 0; i < data.Arealist.length; i++) {
                    if (data.Arealist[i].areaId == 0) {
                        //scope.provinceAreas[data.Arealist[i].areaId] = "全国";
                        continue;
                    }
                    scope.provinceAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                }
            })
        }

        scope.getCityArea = function () {
            scope.cityAreas = {};
            if (scope.provinceAreaId != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.provinceAreaId, method: "GetArea" })
                .success(function (data) {
                    for (var i = 0; i < data.Arealist.length; i++) {
                        scope.cityAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                    }
                })
            }
        }
        scope.getTCityArea = function () {
            if (scope.TprovinceAreaId != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.TprovinceAreaId, method: "GetArea" })
                .success(function (data) {
                    scope.cityAreas = {
                    };
                    scope.TcityAreaId = "-1";
                    if (data.Arealist.length > 0) {
                        for (var i = 0; i < data.Arealist.length; i++) {
                            scope.cityAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                        }
                    }
                })
            }
        }
        scope.getChildCityAreas = function () {
            scope.getCityArea();
        }

        var mobilereg = /(^1[3|4|5|7|8][0-9]{9}$)/; ///^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        var emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;


        //分润信息绑定
        var myDate = new Date();
        scope.share_percent = "";
        
        scope.year = myDate.getFullYear();
        scope.month = myDate.getMonth()+1;
        scope.day = myDate.getDate();
        scope.task_timelimit = "";
        scope.paid_amount = "";
        scope.coo_amount = "";
        ///添加分润商
        scope.saveAgency = function () {
            if (scope.childAgency.ChildAgencyLevelId == 2) {
                scope.childAgency.ChildAgencyTypeId = 0;
            }
            //if (scope.childAgency.ChildAgencyLevelId == -1) {
            //    alert("请选择合作商级别！");
            //    return;
            //}
                if (scope.childAgency.ChildAgencyLevelId== -1) {
                    alert("请选择合作商类型！");
                    return;
                }
                if (!mobilereg.test(scope.MobilePhone)) {
                    alert("请输入正确的手机号码！");
                    return;
                }
                if (scope.provinceAreaId == -1 && scope.levelId == -1 && !scope.isEdit) {
                    alert("请选择地区！");
                    return;
                }
                if (scope.cityAreaId == -1 && scope.levelId == -1 && !scope.isEdit) {
                    alert("请选择城市！");
                    return;
                }
                if (scope.CategoryIdTwo == -1 || scope.CategoryIdTwo == 0) {
                    alert("请选择行业");
                    return;
                }
                if (scope.Company == "") {
                    alert("请输入公司名称！");
                    return;
                }
                if (scope.Address == "") {
                    alert("请输入地址！");
                    return;
                }
                if (scope.isOpenAddActiveCode) {
                    if (scope.Total <= 0) {
                        alert("请输入激活码数量");
                        return;
                    }
                    if (scope.Total > 200) {
                        alert("激活码一次只能生成200个以内")
                        return;
                    }
                }
            var params;
            //更新信息
            if (scope.AgencyId > 0) {
                scope.disabled = true;
                scope.task_timelimit = scope.year + "-" + scope.month + "-" + scope.day;
                params = {
                    agencyId: scope.AgencyId, agencyName: scope.AgencyName, mobile: scope.MobilePhone, status: scope.StatusId,
                    company: scope.Company, address: scope.Address,//, contact: scope.Contact
                    agencyLevelId:scope.childAgency.ChildAgencyLevelId, agencyTypeId: scope.childAgency.ChildAgencyTypeId,
                    provinceAreaId: scope.provinceAreaId, cityId: scope.cityAreaId, sale: scope.sale, total: scope.Total, category_id: scope.CategoryIdTwo, is_share: 1, share_percent: scope.share_percent, task_timelimit: scope.task_timelimit, paid_amount: scope.paid_amount, coo_amount: scope.coo_amount, method: "UpdateAgency"
                };
                console.log(params);
                if (confirm("请确认是否提交填写内容？")) {
                    http.post("/Handlers/Membertoolhandler.ashx", params)
                    .success(function (data) {
                        if (data.success == true) {
                            alert("保存成功");
                            scope.close();
                            scope.search(scope.pager.page);
                            scope.disabled = false;
                        }
                        else {
                            alert(data.errorMsg);
                            scope.disabled = false;
                        }
                    })
                } else {
                    scope.disabled = false;
                }
            }
            else if (scope.AgencyId == 0) {
                //添加信息
                if (scope.levelId == -1) {
                    scope.disabled = true;
                    scope.task_timelimit = scope.year + "-" + scope.month + "-" + scope.day;
                    params = {
                        agencyId: scope.AgencyId, agencyName: scope.AgencyName, mobile: scope.MobilePhone, status: scope.StatusId,
                        company: scope.Company, address: scope.Address,//, contact: scope.Contact
                        agencyLevelId:scope.childAgency.ChildAgencyLevelId, agencyTypeId: scope.childAgency.ChildAgencyTypeId,
                        provinceAreaId: scope.provinceAreaId, cityId: scope.cityAreaId, sale: scope.sale, total: scope.Total, category_id: scope.CategoryIdTwo,
                        is_share: 1, share_percent: scope.share_percent, task_timelimit: scope.task_timelimit,paid_amount:scope.paid_amount,coo_amount:scope.coo_amount, method: "UpdateAgency"
                    };
                    if (confirm("请确认是否提交填写内容？")) {
                        http.post("/Handlers/Membertoolhandler.ashx", params)
                        .success(function (data) {
                            if (data.success == true) {
                                alert("保存成功");
                                scope.close();
                                scope.search(scope.pager.page);
                                scope.disabled = false;
                            }
                            else {
                                alert(data.errorMsg);
                                scope.disabled = false;
                            }
                        })
                    } else {
                        scope.disabled = false;
                    }
                } else {
                    scope.disabled = false;
                }
            }
        }

        scope.isSplit = false;
        scope.openSplit = function (item) {
            scope.isSplit = true;
            scope.mobilePhone = item.mobile;
            scope.currencyTotal = 0;
            scope.regionTotal = 0;
            scope.SplitCompany = item.company;
            //scope.areaType = "-1";
        }
        scope.closeSplit = function () {
            scope.isSplit = false;
            scope.mobilePhone = "";
            scope.currencyTotal = 0;
            scope.regionTotal = 0;
            //scope.areaType = "-1";
            scope.SplitCompany = "";
        }

        //分配激活码
        scope.splitActiveCode = function () {
            if (scope.mobilePhone == "") {
                alert("请输入代理商手机");
                return;
            }
            if (scope.currencyTotal == 0 && scope.regionTotal == 0) {
                alert("请输入全国或者区域激活码数量");
                return;
            }
            //if (scope.areaType == "-1") {
            //    alert("请输入激活码性质");
            //    return;
            //}
            if (confirm("此次分配数量：全国" + scope.currencyTotal + "个，区域" + scope.regionTotal + "个，请再次确认！")) {
                http.post("/Handlers/Membertoolhandler.ashx", { mobile: scope.mobilePhone, currencyTotal: scope.currencyTotal, regionTotal: scope.regionTotal, method: "SplitActiveCode" })//areaType: scope.areaType,
                .success(function (data) {
                    if (data.success) {
                        if (scope.currencyTotal > 0 && scope.regionTotal > 0) {
                            if (data.currencysuccess && data.regionsuccess) {
                                alert("添加成功");
                                scope.search();
                                scope.closeSplit();
                            }
                        } else if (scope.currencyTotal > 0) {
                            if (data.currencysuccess) {
                                alert("全国激活码分配成功");
                                scope.search();
                                scope.closeSplit();
                            } else {
                                alert(data.currencyerrorMsg);
                            }
                        } else if (scope.regionTotal > 0) {
                            if (data.regionsuccess) {
                                alert("区域激活码分配成功");
                                scope.search();
                                scope.closeSplit();
                            } else {
                                alert(data.regionerrorMsg);
                            }
                        }

                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        scope.resetPassword = function (agencyId) {
            if (agencyId > 0) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId: agencyId, method: "ResetPassword" })
                .success(function (data) {
                    if (data.success) {
                        alert("重置密码成功");
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("代理商不存在");
            }
        }

        //添加备注
        scope.isAddRemark = false;
        scope.isOpenAddRemark = function (agencyId) {
            scope.isAddRemark = true;
            scope.addRemarkagencyId = agencyId;
            scope.Reamrk = "";
        }
        scope.closeAddRemark = function () {
            scope.isAddRemark = false;
            scope.addRemarkagencyId = 0;
            scope.Reamrk = "";
        }

        scope.addRemark = function () {
            if (scope.addRemarkagencyId > 0) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId: scope.addRemarkagencyId, remark: scope.Reamrk, method: "AddRemark" })
                .success(function (data) {
                    if (data.success) {
                        alert("添加备注成功");
                        scope.closeAddRemark();
                        scope.search(scope.pager.page);
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("代理商不存在");
            }
        }
        //充值余额
        scope.isRecharge = false;
        scope.NowRecharge = 0;
        scope.isOpenRecharge = function (item) {
            console.log(item);
            scope.isRecharge = true;
            scope.addRechargeagencyId = item.agencyId;
            scope.NowRecharge = item.promotion_balance;
            scope.addRecharge = 0;
            //console.log(scope.NowRecharge);
        }
        scope.ToAddRecharge = function () {
            //console.log(scope.NowRecharge);
            if (scope.addRecharge > 0) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId: scope.addRechargeagencyId, addRecharge: scope.addRecharge, method: "AddRecharge" })
                .success(function (data) {
                    if (data.success) {
                        alert("充值成功");
                        scope.close();
                        scope.search(scope.pager.page);
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("请输入正确金额");
            }
        };

        scope.ToDetail = function (agencyId) {
            window.location.href = "/MemberTool/Index.aspx#/agencydetail/" + agencyId;
        }
        scope.ToAddAdvert = function (agencyId) {
            window.location.href = "/Add/AddAdvert.aspx?childAgencyId=" + agencyId;
        }

        //scope.isPartnerAddEnterpriseUser = false;
        //scope.isOpenPartnerAddEnterpriseUser = function (childAgencyId) {
        //    scope.memberlogin = "";
        //    scope.TchildAgencyId = childAgencyId;
        //    scope.isPartnerAddEnterpriseUser = true;
        //}
        //scope.closePartnerAddEnterpriseUser = function () {
        //    scope.isAddEnterpriseUser = false;
        //    scope.memberlogin = "";
        //    scope.TchildAgencyId = 0;
        //}

        //scope.PartnerAddEnterpriseUser = function () {
        //    if (confirm("此操作影响重大，请确认是否执行！")) {
        //        if (scope.memberlogin == "") {
        //            alert("请输入用户手机号码");
        //            return;
        //        }
        //        http.post("/Handlers/Membertoolhandler.ashx", { childAgencyId: scope.TchildAgencyId, login: scope.memberlogin, method: "PartnerAddEnterpriseUser" })
        //        .success(function (data) {
        //            if (data.success) {
        //                alert("绑定成功");
        //                scope.closeAddEnterpriseUser();
        //            } else {
        //                alert(data.errorMsg);
        //            }
        //        })
        //    }
        //}

        //添加激活码
        scope.isOpenAddActiveCode = false;
        scope.openAddActiveCode = function () {
            scope.isOpenAddActiveCode = true;
            scope.Total = 0;
        }
        //用户文章
        scope.ToMemberarticlelist = function (agencyId) {
            window.location.href = "/Member/Index.aspx#/memberarticlelist/" + agencyId + "/0";
        }
        //上传图片
        scope.uploadImg = function (file, filetype) {
            if (file != undefined) {
                if (scope.errorFile != null) {
                    if (scope.errorFile.$error == "maxSize") {
                        alert("图片大小不能超过10MB");
                        return;
                    }
                }
                file.upload = Upload.upload({
                    url: '/Handlers/Membertoolhandler.ashx',
                    data: {
                        method: "UploadPic", folder: "eq", file: file
                    }
                }).success(function (data) {
                    switch (filetype) {
                        case 'card_p':
                            scope.card_p = data.imgpath;
                            return;
                        case 'card_s':
                            scope.card_s = data.imgpath;
                            return;
                        case 'license':
                            scope.license = data.imgpath;
                            return;
                        case 'other':
                            scope.other = data.imgpath;
                            return;
                        default:
                            return;
                    }
                })
            }
        }

        //清理图片
        scope.clearImg = function (imgtype) {
            switch (imgtype) {
                case 'card_p':
                    scope.card_p = "";
                    scope.filecard_p = "";
                    return;
                case 'card_p':
                    scope.card_s = "";
                    scope.filecard_s = "";
                    return;
                case 'license':
                    scope.license = "";
                    scope.filelicense = "";
                    return;
                case 'other':
                    scope.other = "";
                    scope.fileother = "";
                    return;
                default:
                    return;
            }
        }


        //删除代理商
        scope.delAgency = function (item) {
            if (confirm("此操作不可逆，请谨慎操作。是否删除该合作商？")) {
                http.post("/admin.asmx/DelAgency", { agency_id: item.agencyId })
                .success(function (data) {
                    if (data.success) {
                        alert("操作成功");
                        scope.list.splice(scope.list.indexOf(item), 1);
                    }
                    else {
                        alert(data.errorMsg);
                    }
                });
            }
        }
    }])
    /*代理商列表*/
    .controller("agencylist", ["$scope", "$http", "$routeParams", "Upload", function (scope, http, route, Upload) {
        //scope.IsAll = 1;
        //var agencySearch = service.Get('agencySearch');
        //console.log(agencySearch);
        var agencySearch = localStorage.getItem('agencySearch');
        if (agencySearch != undefined && agencySearch != null) {
            agencySearch = JSON.parse(agencySearch);

            scope.keyWord = agencySearch.keyWord;
            scope.parent_keyword = agencySearch.parent_keyword;
            scope.agencyLevelId = agencySearch.agencyLevelId;
            scope.agencyTypeId = agencySearch.agencyTypeId;
            scope.statusId = agencySearch.status;
            scope.TprovinceAreaId = agencySearch.provinceAreaId;
            scope.TcityAreaId = agencySearch.cityAreaId;
        } else {
            scope.agencyLevelId = "-1";
            scope.agencyTypeId = "-1";
            scope.statusId = -1;
            scope.keyWord = "";
            scope.parent_keyword = "";
            scope.TcityAreaId = "-1";
            scope.TprovinceAreaId = "0";
        }

        localStorage.removeItem('agencySearch');//清除local存储

        scope.DateRange = "";
        scope.AgencyId = 0;
        scope.agencyName = "";
        scope.pageSize = 20;
        scope.count = 0;
        scope.list = [];
        scope.provinceAreaId = "-1";
        scope.cityAreaId = "-1";
        scope.provinceAreas = {};
        scope.cityAreas = {};
        scope.Statuss = [{ Id: -1, Name: "状态" }, { Id: 1, Name: "正常" }, { Id: 2, Name: "取消资格" }];
        scope.Spreads = [{ Id: 1, Name: "是" }, { Id: 0, Name: "否" }];
        scope.childAgency = {};
        scope.childAgency.ChildAgencyLevelId = 0;
        scope.agencyTypes = [{ Id: 0, Name: "请选择", Level: 0 }, { Id: 1, Name: "一级", Level: 2 }, { Id: 2, Name: "二级", Level: 2 }, { Id: 3, Name: "三级", Level: 2 }];
        scope.AgencyTypes = [{ Id: 0, Name: "请选择", Level: 0 }, { Id: 1, Name: "一级", Level: 2 }, { Id: 2, Name: "二级", Level: 2 }, { Id: 3, Name: "三级", Level: 2 }];
        scope.childAgency.ChildAgencyTypeId = 0;

        scope.EpCategoryLeverOneIds = {};
        scope.EpCategoryIdOne = "-1";
        scope.EpCategoryLeverTwoIds = {};
        scope.EpCategoryIdTwo = "-1";

        scope.getlevelId = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetLoginLevel" })
            .success(function (data) {
                scope.levelId = data.levelId;
                if (scope.levelId == -1) {
                    scope.AgencyLevels = [{ Id: -1, Name: "请选择合作商级别" }, { Id: 1, Name: "城市合伙人", Level: 1 }, { Id: 2, Name: "合作商", Level: 2 }];//, { Id: 0, Name: "企业号", Level: 0 }
                    scope.TAgencyLevels = { 1: "城市合伙人", 2: "合作商" };//, 0: "企业号"
                } else if (scope.levelId == 1) {
                    scope.AgencyLevels = [{ Id: -1, Name: "请选择合作商级别" }, { Id: 2, Name: "合作商", Level: 2 }];//, { Id: 0, Name: "企业号", Level: 0 }
                    scope.TAgencyLevels = { 2: "合作商" };//, 0: "企业号"
                }
                //else {
                //    scope.AgencyLevels = [{ Id: 0, Name: "企业号", Level: 0 }];
                //    scope.TAgencyLevels = { 0: "企业号" };
                //}
            })
        }
        

        scope.getlevelId();
        var agencyTypes = { 1: "一级", 2: "二级", 3: "三级", };
        scope.orderlist = [
            { id: 0, name: "默认排序" },
            { id: 1, name: "联系人" },
            { id: 2, name: "公司名称" },
            { id: 3, name: "手机号码" },
            { id: 4, name: "上级代理" },
            { id: 5, name: "城市" },
            { id: 6, name: "激活码数量" },
            { id: 7, name: "类型" },
            { id: 8, name: "开通时间" },
        ];
        scope.orderindex=0;
        scope.TAgencyTypes = agencyTypes;

        scope.levelchage = function () {
            scope.AgencyTypes = scope.agencyTypes.where(function (o) {
                return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            });
            scope.childAgency.ChildAgencyTypeId = 0;
        }
        scope.level = function (id) {
            return scope.AgencyLevels.where(function (o) { return o.Id == id })[0].Name;
        }
        scope.type = function (id) {
            if (id == 0) {
                return "";
            }
            if (id == -99) {
                return "";
            }
            return scope.agencyTypes.where(function (o) { return o.Id == id })[0].Name;
        }

        scope.getlist = function (scope, page) {
            var params = { IsAll: 1, keyWord: scope.keyWord, parent_keyword: scope.parent_keyword, agencyLevelId: scope.agencyLevelId, agencyTypeId: scope.agencyTypeId, status: scope.statusId, createDt: scope.DateRange, pageIndex: page, pageSize: scope.pageSize, provinceAreaId: scope.TprovinceAreaId, cityAreaId: scope.TcityAreaId, orderindex: scope.orderindex, EpCategoryId: scope.EpCategoryIdTwo, method: "GetAgencyList" };
            http.post("/Handlers/Membertoolhandler.ashx", params)
              .success(function (data) {
                  scope.ExportHref = '/admin.asmx/ExportAgencyList?searchparams=' + JSON.stringify(params);
                  localStorage.setItem('agencySearch', JSON.stringify(params));

                  scope.list = data.Agencylist;
                  scope.count = data.count;
                  scope.pager.init(data.count);
                  scope.getProvinceArea();
                  scope.GetEpCategoryIds();
              })
        }
        //console.log(service.Get('agencySearch'));
        
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
            }, scope.pageSize, 1);
        }

        scope.search = function (pageindex) {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
            }, scope.pageSize,pageindex);
        }

        scope.agencyLevelsearch = function () {
            if (scope.agencyLevelId == 0 || scope.agencyLevelId == 1) {
                scope.search();
            }
        }

        //一级行业分类获取二级分类
        //scope.GetCategorylevelTwo = function () {
        //    http.post("/Handlers/Membertoolhandler.ashx", { EpCategoryIdOne: scope.EpCategoryIdOne, method: GetCategorylevelTwo })
        //}

        scope.search();

        scope.isShow = false;
        scope.isEdit = false;
        scope.StatusId = 1;
        scope.open = function () {
            scope.CategoryIdOne ="-1";
            scope.CategoryIdTwo = "-1";
            scope.isShow = true;
            scope.isEdit = false;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.Company = "";
            scope.Contact = "";
            scope.Address = "";
            //scope.Remark = "";
            //scope.IsSpread = 1;
            scope.sale = 1;
            scope.childAgency.ChildAgencyLevelId = -1;
            scope.AgencyTypes = scope.agencyTypes.where(function (o) {
                return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            });
            scope.childAgency.ChildAgencyTypeId = 0;
            scope.Total = 0;//激活码数量
            scope.card_p = ""; scope.filecard_p = "";
            scope.card_s = ""; scope.filecard_s = "";
            scope.license = ""; scope.filelicense = "";
            scope.other = ""; scope.fileother = "";
            scope.email = "";
            scope.disabled = false;
        }
        scope.openEdit = function (item) {
            scope.getProvinceArea();
            scope.provinceAreaId = item.provinceid.toString();
            scope.getCityArea();
            scope.cityAreaId = item.cityid.toString();
            scope.isShow = true;
            scope.isEdit = true;
            scope.AgencyId = item.agencyId;
            scope.AgencyName = item.agencyName;
            scope.MobilePhone = item.mobile;
            scope.StatusId = item.status;
            scope.Company = item.company;
            scope.Contact = item.contact;
            scope.Address = item.address;
            scope.sale = item.sale;
            scope.childAgency.ChildAgencyLevelId = item.agencyLevelId;
            scope.AgencyTypes = scope.agencyTypes.where(function (o) {
                return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            });
            scope.CategoryIdOne = item.parent_id ? (item.parent_id.toString() == "0" ? "-1" : item.parent_id.toString()) : "-1";
            scope.GetCategoryIds(scope.CategoryIdOne);
            scope.CategoryIdTwo = item.parent_id ? (item.category_id.toString() == "0" ? "-1" : item.category_id.toString()) : "-1";
            //scope.childAgency.ChildAgencyTypeId = item.agencyTypeId;
            scope.disabled = false;
        }
        scope.close = function () {
            scope.isShow = false;
            scope.isEdit = false;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.StatusId = 1;
            scope.Company = "";
            scope.Contact = "";
            scope.Address = "";
            scope.sale = 1;
            scope.childAgency.ChildAgencyLevelId = -1;
            scope.AgencyTypes = scope.agencyTypes;
            scope.childAgency.ChildAgencyTypeId = 0;
            scope.Total = 0;
            scope.card_p = ""; scope.filecard_p = "";
            scope.card_s = ""; scope.filecard_s = "";
            scope.license = ""; scope.filelicense = "";
            scope.other = ""; scope.fileother = "";
            scope.email = "";
            scope.disabled = false;
            scope.isOpenAddActiveCode = false;
            scope.CategoryIdOne = "-1";
            scope.CategoryIdTwo = "-1";
            scope.isRecharge = false;
            scope.addRecharge = 0;
        }

        //获取行业分类信息代理商
        scope.GetEpCategoryIds = function (CatLevel) {
            if (CatLevel > 0) {
                scope.EpCategoryIdTwo = "-1";
                scope.CategoryIdTwo="-1";
                scope.EpCategoryLeverTwoIds = {};
            } else {
                //scope.EpCategoryIdTwo = "-1";
            }
           
            http.post("/Handlers/Membertoolhandler.ashx", { Level: CatLevel, method: "GetEpCategoryIds" })
            .success(function (data) {
                for (var i = 0; i < data.EpCategorylist.length; i++) {
                    if (data.EpCategorylist[i].cid == 0) {
                        //scope.EpCategoryIds[data.EpCategorylist[i].cid] = "所有";
                        continue;
                    }
                    if (CatLevel == 0 || CatLevel == -1 || CatLevel == null) {
                        scope.EpCategoryLeverOneIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    } else {
                        scope.EpCategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    }
                }
            })
        }

        scope.CategoryIdOne = "-1";
        scope.CategoryIdTwo = "-1";
        scope.CategoryLeverTwoIds = {};
        scope.GetCategoryIds = function (CatLevel) {
            if (CatLevel > 0) {
                scope.CategoryIdTwo = "-1";
                scope.CategoryLeverTwoIds = {};
            } else {
                scope.CategoryIdTwo = "-1";
            }
            http.post("/Handlers/Membertoolhandler.ashx", { Level: CatLevel, method: "GetEpCategoryIds" })
            .success(function (data) {
                for (var i = 0; i < data.EpCategorylist.length; i++) {
                    if (data.EpCategorylist[i].cid == 0) {
                        //scope.EpCategoryIds[data.EpCategorylist[i].cid] = "所有";
                        continue;
                    }
                    if (CatLevel == 0 || CatLevel == -1 || CatLevel == null) {
                        scope.CategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    } else {
                        scope.CategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    }
                }
            })
        }

        scope.getProvinceArea = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
            .success(function (data) {
                for (var i = 0; i < data.Arealist.length; i++) {
                    if (data.Arealist[i].areaId == 0) {
                        //scope.provinceAreas[data.Arealist[i].areaId] = "全国";
                        continue;
                    }
                    scope.provinceAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                }
            })
        }

        scope.getCityArea = function () {
            scope.cityAreas = {};
            if (scope.provinceAreaId != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.provinceAreaId, method: "GetArea" })
                .success(function (data) {
                    for (var i = 0; i < data.Arealist.length; i++) {
                        scope.cityAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                    }
                })
            }
        }
        scope.getTCityArea = function () {
            if (scope.TprovinceAreaId != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.TprovinceAreaId, method: "GetArea" })
                .success(function (data) {
                    scope.cityAreas = {
                    };
                    scope.TcityAreaId = "-1";
                    if (data.Arealist.length > 0) {
                        for (var i = 0; i < data.Arealist.length; i++) {
                            scope.cityAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                        }
                    }
                })
            }
        }
        scope.getChildCityAreas = function () {
            scope.getCityArea();
        }

        var mobilereg = /(^1[3|4|5|7|8][0-9]{9}$)/; ///^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        var emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

        ///添加代理商
        scope.saveAgency = function () {
            //if (scope.childAgency.ChildAgencyLevelId == 2) {
            //    scope.childAgency.ChildAgencyTypeId = 0;
            //}
            if (scope.childAgency.ChildAgencyLevelId == -1) {
                alert("请选择合作商级别！");
                return;
            }
            //if (scope.childAgency.ChildAgencyLevelId == 2 && scope.childAgency.ChildAgencyTypeId == 0) {
            //    alert("请选择合作商类型！");
            //    return;
            //}
            if (!mobilereg.test(scope.MobilePhone)) {
                alert("请输入正确的手机号码！");
                return;
            }
            if (scope.provinceAreaId == -1 && scope.levelId == -1 && !scope.isEdit) {
                alert("请选择地区！");
                return;
            }
            if (scope.cityAreaId == -1 && scope.levelId == -1 && !scope.isEdit) {
                alert("请选择城市！");
                return;
            }
            if (scope.CategoryIdTwo == -1 || scope.CategoryIdTwo == 0) {
                alert("请选择行业");
                return;
            }
            if (scope.Company == "") {
                alert("请输入公司名称！");
                return;
            }
            //if (scope.Contact == "") {
            //    alert("请输入联系方式！");
            //    return;
            //}
            if (scope.Address == "") {
                alert("请输入地址！");
                return;
            }
            if (scope.isOpenAddActiveCode) {
                if (scope.Total <= 0) {
                    alert("请输入激活码数量");
                    return;
                }
                if (scope.Total > 200) {
                    alert("激活码一次只能生成200个以内")
                    return;
                }
            }
            var params;
            if (scope.AgencyId > 0) {
                scope.disabled = true;
                params = {
                    agencyId: scope.AgencyId, agencyName: scope.AgencyName, mobile: scope.MobilePhone, status: scope.StatusId,
                    company: scope.Company, address: scope.Address,//, contact: scope.Contact
                    agencyLevelId: scope.childAgency.ChildAgencyLevelId, agencyTypeId: scope.childAgency.ChildAgencyTypeId,//取消合作商等级
                    provinceAreaId: scope.provinceAreaId, cityId: scope.cityAreaId, sale: scope.sale, total: scope.Total,category_id: scope.CategoryIdTwo, method: "UpdateAgency"
                };
                if (confirm("请确认是否提交填写内容？")) {
                    http.post("/Handlers/Membertoolhandler.ashx", params)
                    .success(function (data) {
                        if (data.success == true) {
                            alert("保存成功");
                            scope.close();
                            scope.search(scope.pager.page);
                            scope.disabled = false;
                        }
                        else {
                            alert(data.errorMsg);
                            scope.disabled = false;
                        }
                    })
                } else {
                    scope.disabled = false;
                }
            }
            else if (scope.AgencyId == 0) {
                if (scope.levelId == -1) {
                    scope.disabled = true;
                    params = {
                        agencyId: scope.AgencyId, agencyName: scope.AgencyName, mobile: scope.MobilePhone, status: scope.StatusId,
                        company: scope.Company, address: scope.Address,//, contact: scope.Contact
                        agencyLevelId: scope.childAgency.ChildAgencyLevelId, agencyTypeId: scope.childAgency.ChildAgencyTypeId,
                        provinceAreaId: scope.provinceAreaId, cityId: scope.cityAreaId, sale: scope.sale, total: scope.Total,category_id: scope.CategoryIdTwo, method: "UpdateAgency"
                    };
                    if (confirm("请确认是否提交填写内容？")) {
                        http.post("/Handlers/Membertoolhandler.ashx", params)
                        .success(function (data) {
                            if (data.success == true) {
                                alert("保存成功");
                                scope.close();
                                scope.search(scope.pager.page);
                                scope.disabled = false;
                            }
                            else {
                                alert(data.errorMsg);
                                scope.disabled = false;
                            }
                        })
                    } else {
                        scope.disabled = false;
                    }
                } else {
                    if (scope.card_p == "") {
                        alert("请上传身份证正面");
                        return;
                    }
                    if (scope.card_s == "") {
                        alert("请上传身份证反面");
                        return;
                    }
                    if (scope.license == "") {
                        alert("请上传营业执照");
                        return;
                    }
                    if (scope.email == "") {
                        alert("请输入通知邮箱");
                        return;
                    }
                    if (!emailreg.test(scope.email)) {
                        alert("请输入正确的邮箱");
                        return;
                    }
                    scope.disabled = true;
                    params = {
                        agencyName: scope.AgencyName, mobile: scope.MobilePhone,
                        company: scope.Company, address: scope.Address,//, contact: scope.Contact
                        agencyLevelId: scope.childAgency.ChildAgencyLevelId, agencyTypeId: scope.childAgency.ChildAgencyTypeId,
                        provinceAreaId: scope.provinceAreaId, cityAreaId: scope.cityAreaId, sale: scope.sale, total: scope.Total,
                        card_p: scope.card_p, card_s: scope.card_s, license: scope.license, other: scope.other, email: scope.email, categoryid: scope.CategoryIdTwo
                    };
                    if (confirm("请确认是否提交填写内容？")) {
                        http.post("/admin.asmx/AddAgencyForCat", params)
                        .success(function (data) {
                            if (data.success == true) {
                                alert("保存成功");
                                scope.close();
                                scope.search(scope.pager.page);
                                scope.disabled = false;
                            }
                            else {
                                alert(data.errorMsg);
                                scope.disabled = false;
                            }
                        })
                    } else {
                        scope.disabled = false;
                    }
                }
            }
        }

        scope.isSplit = false;
        scope.openSplit = function (item) {
            scope.isSplit = true;
            scope.mobilePhone = item.mobile;
            scope.currencyTotal = 0;
            scope.regionTotal = 0;
            scope.SplitCompany = item.company;
            //scope.areaType = "-1";
        }
        scope.closeSplit = function () {
            scope.isSplit = false;
            scope.mobilePhone = "";
            scope.currencyTotal = 0;
            scope.regionTotal = 0;
            //scope.areaType = "-1";
            scope.SplitCompany = "";
        }

        //分配激活码
        scope.splitActiveCode = function () {
            if (scope.mobilePhone == "") {
                alert("请输入代理商手机");
                return;
            }
            if (scope.currencyTotal == 0 && scope.regionTotal == 0) {
                alert("请输入全国或者区域激活码数量");
                return;
            }
            //if (scope.areaType == "-1") {
            //    alert("请输入激活码性质");
            //    return;
            //}
            if (confirm("此次分配数量：全国" + scope.currencyTotal + "个，区域" + scope.regionTotal + "个，请再次确认！")) {
                http.post("/Handlers/Membertoolhandler.ashx", { mobile: scope.mobilePhone, currencyTotal: scope.currencyTotal, regionTotal: scope.regionTotal, method: "SplitActiveCode" })//areaType: scope.areaType,
                .success(function (data) {
                    if (data.success) {
                        if (scope.currencyTotal > 0 && scope.regionTotal > 0) {
                            if (data.currencysuccess && data.regionsuccess) {
                                alert("添加成功");
                                scope.search();
                                scope.closeSplit();
                            }
                        } else if (scope.currencyTotal > 0) {
                            if (data.currencysuccess) {
                                alert("全国激活码分配成功");
                                scope.search();
                                scope.closeSplit();
                            } else {
                                alert(data.currencyerrorMsg);
                            }
                        } else if (scope.regionTotal > 0) {
                            if (data.regionsuccess) {
                                alert("区域激活码分配成功");
                                scope.search();
                                scope.closeSplit();
                            } else {
                                alert(data.regionerrorMsg);
                            }
                        }

                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        scope.resetPassword = function (agencyId) {
            if (agencyId > 0) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId: agencyId, method: "ResetPassword" })
                .success(function (data) {
                    if (data.success) {
                        alert("重置密码成功");
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("代理商不存在");
            }
        }

        //添加备注
        scope.isAddRemark = false;
        scope.isOpenAddRemark = function (agencyId) {
            scope.isAddRemark = true;
            scope.addRemarkagencyId = agencyId;
            scope.Reamrk = "";
        }
        scope.closeAddRemark = function () {
            scope.isAddRemark = false;
            scope.addRemarkagencyId = 0;
            scope.Reamrk = "";
        }

        scope.addRemark = function () {
            if (scope.addRemarkagencyId > 0) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId: scope.addRemarkagencyId, remark: scope.Reamrk, method: "AddRemark" })
                .success(function (data) {
                    if (data.success) {
                        alert("添加备注成功");
                        scope.closeAddRemark();
                        scope.search(scope.pager.page);
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("代理商不存在");
            }
        }
        //降级合伙人
        scope.DownPartner = function (item) {
            console.log(item)
            if (confirm("该操作不可逆，确认降级该合伙人？(旗下代理将归置总后台)")) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId:item.agencyId,method:"DownPartner"})
                .success(function (data) {
                    if (data.success) {
                        alert(data.errorMsg);
                        scope.search(scope.pager.page);
                    }else{
                        alert(data.errorMsg);
                    }
                })
            }
        }


        //充值余额
        scope.isRecharge = false;
        scope.NowRecharge = 0;
        scope.isOpenRecharge = function (item) {
            console.log(item);
            scope.isRecharge = true;
            scope.addRechargeagencyId = item.agencyId;
            scope.NowRecharge = item.promotion_balance;
            scope.addRecharge = 0;
            //console.log(scope.NowRecharge);
        }
        scope.ToAddRecharge = function () {
            //console.log(scope.NowRecharge);
            if (scope.addRecharge > 0) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId: scope.addRechargeagencyId, addRecharge: scope.addRecharge, method: "AddRecharge" })
                .success(function (data) {
                    if (data.success) {
                        alert("充值成功");
                        scope.close();
                        scope.search(scope.pager.page);
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("请输入正确金额");
            }
        };

        scope.ToDetail = function (agencyId) {
            window.location.href = "/MemberTool/Index.aspx#/agencydetail/" + agencyId;
        }
        scope.ToAddAdvert = function (agencyId) {
            window.location.href = "/Add/AddAdvert.aspx?childAgencyId=" + agencyId;
        }

        //scope.isPartnerAddEnterpriseUser = false;
        //scope.isOpenPartnerAddEnterpriseUser = function (childAgencyId) {
        //    scope.memberlogin = "";
        //    scope.TchildAgencyId = childAgencyId;
        //    scope.isPartnerAddEnterpriseUser = true;
        //}
        //scope.closePartnerAddEnterpriseUser = function () {
        //    scope.isAddEnterpriseUser = false;
        //    scope.memberlogin = "";
        //    scope.TchildAgencyId = 0;
        //}

        //scope.PartnerAddEnterpriseUser = function () {
        //    if (confirm("此操作影响重大，请确认是否执行！")) {
        //        if (scope.memberlogin == "") {
        //            alert("请输入用户手机号码");
        //            return;
        //        }
        //        http.post("/Handlers/Membertoolhandler.ashx", { childAgencyId: scope.TchildAgencyId, login: scope.memberlogin, method: "PartnerAddEnterpriseUser" })
        //        .success(function (data) {
        //            if (data.success) {
        //                alert("绑定成功");
        //                scope.closeAddEnterpriseUser();
        //            } else {
        //                alert(data.errorMsg);
        //            }
        //        })
        //    }
        //}

        //添加激活码
        scope.isOpenAddActiveCode = false;
        scope.openAddActiveCode = function () {
            scope.isOpenAddActiveCode = true;
            scope.Total = 0;
        }
        //用户文章
        scope.ToMemberarticlelist = function (agencyId) {
            window.location.href = "/Member/Index.aspx#/memberarticlelist/" + agencyId + "/0";
        }
        //上传图片
        scope.uploadImg = function (file, filetype) {
            if (file != undefined) {
                if (scope.errorFile != null) {
                    if (scope.errorFile.$error == "maxSize") {
                        alert("图片大小不能超过10MB");
                        return;
                    }
                }
                file.upload = Upload.upload({
                    url: '/Handlers/Membertoolhandler.ashx',
                    data: {
                        method: "UploadPic", folder: "eq", file: file
                    }
                }).success(function (data) {
                    switch (filetype) {
                        case 'card_p':
                            scope.card_p = data.imgpath;
                            return;
                        case 'card_s':
                            scope.card_s = data.imgpath;
                            return;
                        case 'license':
                            scope.license = data.imgpath;
                            return;
                        case 'other':
                            scope.other = data.imgpath;
                            return;
                        default:
                            return;
                    }
                })
            }
        }

        //清理图片
        scope.clearImg = function (imgtype) {
            switch (imgtype) {
                case 'card_p':
                    scope.card_p = "";
                    scope.filecard_p = "";
                    return;
                case 'card_p':
                    scope.card_s = "";
                    scope.filecard_s = "";
                    return;
                case 'license':
                    scope.license = "";
                    scope.filelicense = "";
                    return;
                case 'other':
                    scope.other = "";
                    scope.fileother = "";
                    return;
                default:
                    return;
            }
        }


        //删除代理商
        scope.delAgency = function (item) {
            if (confirm("此操作不可逆，请谨慎操作。是否删除该合作商？")) {
                http.post("/admin.asmx/DelAgency", { agency_id: item.agencyId })
                .success(function (data) {
                    if (data.success) {
                        alert("操作成功");
                        scope.list.splice(scope.list.indexOf(item), 1);
                    }
                    else {
                        alert(data.errorMsg);
                    }
                });
            }
        }

        scope.locking = function (item) {
            if (confirm("此操作将冻结该合作商及旗下所有？")) {
                http.post("/admin.asmx/locking", { agency_id: item.agencyId })
                .success(function (data) {
                    if (data.success) {
                        alert("操作成功");
                        scope.list.splice(scope.list.indexOf(item), 1);
                    }
                    else {
                        alert(data.errorMsg);
                    }
                });
            }
        }
    }])
    /*企业版列表*/
    .controller("enterpriselist", ["$scope", "$http", "$routeParams", "Upload", function (scope, http, route, Upload) {

        //var enterpriseSearch = service.Get('enterpriseSearch');
        var enterpriseSearch = localStorage.getItem('enterpriseSearch');

        if (enterpriseSearch != undefined && enterpriseSearch != null) {
            enterpriseSearch = JSON.parse(enterpriseSearch);

            scope.TprovinceAreaId = enterpriseSearch.provinceAreaId;
            scope.TcityAreaId = enterpriseSearch.cityAreaId;
            scope.keyWord = enterpriseSearch.keyWord;
            scope.parent_keyword = enterpriseSearch.parent_keyword;
        } else {
            scope.keyWord = "";
            scope.parent_keyword = "";
            scope.TprovinceAreaId = "0";
            scope.TcityAreaId = "-1";
        }
        localStorage.removeItem('enterpriseSearch');

        scope.agencyLevelId = "-1";
        scope.agencyTypeId = "-1";
        scope.DateRange = "";
        scope.AgencyId = 0;
        scope.agencyName = "";
        scope.pageSize = 20;
        scope.count = 0;
        scope.list = [];
        scope.statusId = -1;
        scope.provinceAreaId = "-1";
        scope.cityAreaId = "-1";
        scope.provinceAreas = {};
        scope.cityAreas = {};
        scope.EpCategoryLeverOneIds = {};
        scope.Statuss = [{ Id: -1, Name: "状态" }, { Id: 1, Name: "正常" }, { Id: 2, Name: "取消资格" }];
        scope.Spreads = [{ Id: 1, Name: "是" }, { Id: 0, Name: "否" }];
        scope.AgencyLevels = [{ Id: 0, Name: "企业号", Level: 0 }];
        scope.TAgencyLevels = { 0: "企业号" };

        scope.CategoryIdOne = -1;
        scope.CategoryIdTwo = -1;

        scope.EpCategoryLeverOneIds = {};
        scope.EpCategoryIdOne = "-1";
        scope.EpCategoryLeverTwoIds = {};
        scope.EpCategoryIdTwo = "-1";

        //1-联系人，2-公司名称，3-手机号码，4-上级代理，5-城市，6-激活码数量,7-类型，8-开通时间
        scope.orderlist = [
            { id: 0, name: "默认排序" },
            { id: 1, name: "联系人" },
            { id: 2, name: "公司名称" },
            { id: 3, name: "手机号码" },
            { id: 4, name: "上级代理" },
            { id: 5, name: "城市" },
            { id: 9, name: "行业" },
            { id: 6, name: "激活码数量" },
            { id: 7, name: "类型" },
            { id: 8, name: "开通时间" },
        ];
        scope.orderindex = 0;
        scope.childAgency = {};
        scope.childAgency.ChildAgencyLevelId = 0;
        //scope.agencyTypes = [{ Id: 0, Name: "请选择", Level: 0 }, { Id: 1, Name: "一级", Level: 2 }, { Id: 2, Name: "二级", Level: 2 }, { Id: 3, Name: "三级", Level: 2 }];
        scope.AgencyTypes = [{ Id: 0, Name: "请选择", Level: 0 }, { Id: 1, Name: "一级", Level: 2 }, { Id: 2, Name: "二级", Level: 2 }, { Id: 3, Name: "三级", Level: 2 }];
        scope.childAgency.ChildAgencyTypeId = 0;

        scope.order = function () {
            scope.search();
        }
        scope.getlevelId = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetLoginLevel" })
            .success(function (data) {
                scope.levelId = data.levelId;
                if (scope.levelId == -1) {
                    scope.AgencyLevels = [{ Id: 2, Name: "合作商", Level: 2 }, { Id: 0, Name: "企业号", Level: 0 }];//
                    scope.TAgencyLevels = { 1: "城市合伙人", 2: "合作商", 0: "企业号" };
                }
            })
        }

        scope.getlevelId();
        //var agencyTypes = {
        //    1: "一级",
        //    2: "二级",
        //    3: "三级",
        //};
        //scope.TAgencyTypes = agencyTypes;

        scope.levelchage = function () {
            scope.AgencyTypes = scope.AgencyTypes.where(function (o) {
                return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            });
            scope.childAgency.ChildAgencyTypeId = 0;
        }
        scope.level = function (id) {
            return scope.AgencyLevels.where(function (o) { return o.Id == id })[0].Name;
        }
        scope.type = function (id) {
            if (id == 0) {
                return "";
            }
            if (id == -99) {
                return "";
            }
            return scope.AgencyTypes.where(function (o) { return o.Id == id })[0].Name;
        }

        scope.getlist = function (scope, page) {
            var params = { IsAll: 0, keyWord: scope.keyWord, parent_keyword: scope.parent_keyword, agencyLevelId: scope.agencyLevelId, agencyTypeId: scope.agencyTypeId, status: scope.statusId, createDt: scope.DateRange, pageIndex: page, pageSize: scope.pageSize, provinceAreaId: scope.TprovinceAreaId, cityAreaId: scope.TcityAreaId, orderindex: scope.orderindex, EpCategoryId: scope.EpCategoryIdTwo, method: "GetAgencyList" };
            http.post("/Handlers/Membertoolhandler.ashx", params)
            .success(function (data) {
                scope.ExportHref = '/admin.asmx/ExportAgencyList?searchparams=' + JSON.stringify(params);
                localStorage.setItem('enterpriseSearch', JSON.stringify(params));
                scope.list = data.Agencylist;
                scope.count = data.count;
                scope.pager.init(data.count);
                scope.getProvinceArea();
                scope.GetEpCategoryIds();
            })
        }
        
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
            }, scope.pageSize, 1);
        }
        scope.search = function (pageindex) {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
                }, scope.pageSize, pageindex);
        }
        //获取行业分类信息企业版
        scope.GetEpCategoryIds = function (CatLevel) {
            if (CatLevel > 0) {
                scope.EpCategoryLeverTwoIds = {};
            } 
            http.post("/Handlers/Membertoolhandler.ashx", { Level: CatLevel, method: "GetEpCategoryIds" })
            .success(function (data) {
                for (var i = 0; i < data.EpCategorylist.length; i++) {
                    if (data.EpCategorylist[i].cid == 0) {
                        //scope.EpCategoryIds[data.EpCategorylist[i].cid] = "所有";
                        continue;
                    }
                    if (CatLevel == 0 || CatLevel == -1 || CatLevel == null) {
                        scope.EpCategoryLeverOneIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    } else {
                        scope.EpCategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    }
                }
            })
        }
        
        scope.CategoryLeverTwoIds = {};
        scope.GetCategoryIds = function (CatLevel) {
            if (CatLevel > 0) {
                scope.CategoryIdTwo = "-1";
                scope.editCategoryIdTwo = "-1";
                scope.CategoryLeverTwoIds = {};
            } else {
                scope.CategoryIdTwo = "-1";
                scope.editCategoryIdTwo = "-1";
            }
            http.post("/Handlers/Membertoolhandler.ashx", { Level: CatLevel, method: "GetEpCategoryIds" })
            .success(function (data) {
                for (var i = 0; i < data.EpCategorylist.length; i++) {
                    if (data.EpCategorylist[i].cid == 0) {
                        //scope.EpCategoryIds[data.EpCategorylist[i].cid] = "所有";
                        continue;
                    }
                    if (CatLevel == 0 || CatLevel == -1 || CatLevel == null) {
                        scope.CategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    } else {
                        scope.CategoryLeverTwoIds[data.EpCategorylist[i].cid] = data.EpCategorylist[i].cname;
                    }
                }
            })
        }

        //scope.agencyLevelsearch = function () {
        //    if (scope.agencyLevelId == 0 || scope.agencyLevelId == 1) {
        //        scope.search();
        //    }
        //}

        scope.search();

        scope.isShow = false;
        scope.isEdit = false;
        scope.StatusId = 1;
        scope.open = function () {
            scope.isShow = true;
            scope.isEdit = false;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.Company = "";
            scope.Contact = "";
            scope.Address = "";
            scope.editCategoryIdOne = "-1";
            scope.editCategoryIdTwo = "-1";
            //scope.Remark = "";
            //scope.IsSpread = 1;
            scope.sale = 1;
            scope.childAgency.ChildAgencyLevelId = 0;
            scope.AgencyTypes = scope.AgencyTypes.where(function (o) {
                return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            });
            scope.childAgency.ChildAgencyTypeId = 0;
            scope.Total = 0;
            scope.card_p = ""; scope.filecard_p = "";
            scope.card_s = ""; scope.filecard_s = "";
            scope.license = ""; scope.filelicense = "";
            scope.other = ""; scope.fileother = "";
            scope.email = "";
            scope.disabled = false;
        }
        scope.openEdit = function (item) {
            scope.getProvinceArea();
            scope.provinceAreaId = item.provinceid = "" ? -1 : item.provinceid.toString();
            scope.getCityArea();
            scope.cityAreaId = item.cityid = "" ? -1 : item.cityid.toString();
            scope.isShow = true;
            scope.isEdit = true; 
            scope.editCategoryIdOne = item.parent_id ? (item.parent_id.toString()=="0"? "-1": item.parent_id.toString()) : "-1";
            scope.GetCategoryIds(scope.editCategoryIdOne);
            scope.editCategoryIdTwo = item.parent_id ? (item.category_id.toString() == "0" ? "-1" : item.category_id.toString()) : "-1";
            scope.AgencyId = item.agencyId;
            scope.AgencyName = item.agencyName;
            scope.MobilePhone = item.mobile;
            scope.StatusId = item.status;
            scope.Company = item.company;
            scope.Contact = item.contact;
            scope.Address = item.address;
            scope.sale = item.sale;
            scope.childAgency.ChildAgencyLevelId = item.agencyLevelId;
            scope.AgencyTypes = scope.AgencyTypes.where(function (o) {
                return o.Level == scope.childAgency.ChildAgencyLevelId || o.Level == 0
            });
            scope.childAgency.ChildAgencyTypeId = item.agencyTypeId;
            scope.disabled = false;
        }
        scope.close = function () {
            scope.isShow = false;
            scope.isEdit = false;
            scope.AgencyId = 0;
            scope.AgencyName = "";
            scope.MobilePhone = "";
            scope.StatusId = 1;
            scope.Company = "";
            scope.Contact = "";
            scope.Address = "";
            scope.sale = 1;
            scope.editCategoryIdOne = "-1";
            scope.editCategoryIdTwo = "-1";
            scope.childAgency.ChildAgencyLevelId = 0;
            scope.AgencyTypes = scope.AgencyTypes;
            scope.childAgency.ChildAgencyTypeId = 0;
            scope.Total = 0;
            scope.card_p = ""; scope.filecard_p = "";
            scope.card_s = ""; scope.filecard_s = "";
            scope.license = ""; scope.filelicense = "";
            scope.other = ""; scope.fileother = "";
            scope.email = "";
            scope.disabled = false;
            scope.isOpenAddActiveCode = false;
        }

        scope.getProvinceArea = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
            .success(function (data) {
                for (var i = 0; i < data.Arealist.length; i++) {
                    if (data.Arealist[i].areaId == 0) {
                        //scope.provinceAreas[data.Arealist[i].areaId] = "全国";
                        continue;
                    }
                    scope.provinceAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                }
            })
        }

        scope.getCityArea = function () {
            scope.cityAreas = {
            };
            if (scope.provinceAreaId != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.provinceAreaId, method: "GetArea" })
                .success(function (data) {
                    for (var i = 0; i < data.Arealist.length; i++) {
                        scope.cityAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                    }
                })
            }
        }

        scope.getTCityArea = function () {
            if (scope.TprovinceAreaId != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.TprovinceAreaId, method: "GetArea" })
                .success(function (data) {
                    scope.cityAreas = {
                    };
                    scope.TcityAreaId = "-1";
                    if (data.Arealist.length > 0) {
                        for (var i = 0; i < data.Arealist.length; i++) {
                            scope.cityAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                        }
                    }
                })
            }
        }

        scope.getChildCityAreas = function () {
            scope.getCityArea();
        }

        var mobilereg = /(^1[3|4|5|7|8][0-9]{9}$)/;
        var emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

        ////添加企业版
        scope.saveAgency = function () {
            //if (scope.childAgency.ChildAgencyLevelId == 2) {
            //    scope.childAgency.ChildAgencyTypeId = 0;
            //}
            if (scope.childAgency.ChildAgencyLevelId == 2 && scope.childAgency.ChildAgencyTypeId == 0) {
                alert("请选择合作商类型！");
                return;
            }
            if (scope.editCategoryIdTwo == -1) {
                alert("请选择行业！");
                return;
            }
            if (!mobilereg.test(scope.MobilePhone)) {
                alert("请输入正确的手机号码！");
                return;
            }
            if (scope.provinceAreaId == -1 && scope.levelId == -1 && !scope.isEdit) {
                alert("请选择地区！");
                return;
            }
            if (scope.cityAreaId == -1 && scope.levelId == -1 && !scope.isEdit) {
                alert("请选择城市！");
                return;
            }
            if (scope.Company == "") {
                alert("请输入公司名称！");
                return;
            }
            //else if (scope.Contact == "") {
            //    alert("请输入联系方式！");
            //    return;
            //}
            if (scope.Address == "") {
                alert("请输入地址！");
                return;
            }
            if (scope.isOpenAddActiveCode) {
                if (scope.Total <= 0) {
                    alert("请输入激活码数量");
                    return;
                }
                if (scope.Total > 200) {
                    alert("激活码一次只能生成200个以内")
                    return;
                }
            }
            var params;
            if (scope.AgencyId > 0) {
                scope.disabled = true;
                params = {
                    agencyId: scope.AgencyId, agencyName: scope.AgencyName, mobile: scope.MobilePhone, status: scope.StatusId,
                    company: scope.Company, address: scope.Address,//, contact: scope.Contact
                    agencyLevelId: scope.childAgency.ChildAgencyLevelId, agencyTypeId: scope.childAgency.ChildAgencyTypeId,
                    provinceAreaId: scope.provinceAreaId, cityId: scope.cityAreaId, sale: scope.sale, total: scope.Total, category_id: scope.editCategoryIdTwo, method: "UpdateAgency"
                };
                if (confirm("请确认是否提交填写内容？")) {
                    http.post("/Handlers/Membertoolhandler.ashx", params)
                    .success(function (data) {
                        if (data.success == true) {
                            alert("保存成功");
                            scope.close();
                            scope.search(scope.pager.page);
                            scope.disabled = false;
                        }
                        else {
                            alert(data.errorMsg);
                            scope.disabled = false;
                        }
                    })
                } else {
                    scope.disabled = false;
                }
            }
            else if (scope.AgencyId == 0) {
                if (scope.levelId == -1) {
                    scope.disabled = true;
                    params = {
                        agencyId: scope.AgencyId, agencyName: scope.AgencyName, mobile: scope.MobilePhone, status: scope.StatusId,
                        company: scope.Company, address: scope.Address,//, contact: scope.Contact
                        agencyLevelId: scope.childAgency.ChildAgencyLevelId, agencyTypeId: scope.childAgency.ChildAgencyTypeId,
                        provinceAreaId: scope.provinceAreaId, cityId: scope.cityAreaId, sale: scope.sale, total: scope.Total,category_id: scope.editCategoryIdTwo, method: "UpdateAgency"
                    };
                    if (confirm("请确认是否提交填写内容？")) {
                        http.post("/Handlers/Membertoolhandler.ashx", params)
                        .success(function (data) {
                            if (data.success == true) {
                                alert("保存成功");
                                scope.close();
                                scope.search(scope.pager.page);
                                scope.disabled = false;
                            }
                            else {
                                alert(data.errorMsg);
                                scope.disabled = false;
                            }
                        })
                    } else {
                        scope.disabled = false;
                    }
                } else {
                    if (scope.card_p == "") {
                        alert("请上传身份证正面");
                        return;
                    }
                    if (scope.card_s == "") {
                        alert("请上传身份证反面");
                        return;
                    }
                    if (scope.license == "") {
                        alert("请上传营业执照");
                        return;
                    }
                    if (scope.email == "") {
                        alert("请输入通知邮箱");
                        return;
                    }
                    if (!emailreg.test(scope.email)) {
                        alert("请输入正确的邮箱");
                        return;
                    }
                    //scope.disabled = true;
                    params = {
                        agencyName: scope.AgencyName, mobile: scope.MobilePhone,
                        company: scope.Company, address: scope.Address,//, contact: scope.Contact
                        agencyLevelId: scope.childAgency.ChildAgencyLevelId, agencyTypeId: scope.childAgency.ChildAgencyTypeId,
                        provinceAreaId: scope.provinceAreaId, cityAreaId: scope.cityAreaId, sale: scope.sale, total: scope.Total,
                        card_p: scope.card_p, card_s: scope.card_s, license: scope.license, other: scope.other, email: scope.email, categoryid: scope.editCategoryIdTwo
                    };
                    if (confirm("请确认是否提交填写内容？")) {
                        http.post("/admin.asmx/AddAgencyForCat", params)
                        .success(function (data) {
                            if (data.success == true) {
                                alert("保存成功");
                                scope.close();
                                scope.search(scope.pager.page);
                                scope.disabled = false;
                            }
                            else {
                                alert(data.errorMsg);
                                scope.disabled = false;
                            }
                        })
                    } else {
                        scope.disabled = false;
                    }
                }
            }
        }

        scope.isSplit = false;
        scope.openSplit = function (item) {
            scope.isSplit = true;
            scope.mobilePhone = item.mobile;
            scope.currencyTotal = 0;
            scope.regionTotal = 0;
            scope.SplitCompany = item.company;
            //scope.areaType = "-1";
        }
        scope.closeSplit = function () {
            scope.isSplit = false;
            scope.mobilePhone = "";
            scope.currencyTotal = 0;
            scope.regionTotal = 0;
            //scope.areaType = "-1";
            scope.SplitCompany = "";
        }

        scope.splitActiveCode = function () {
            if (scope.mobilePhone == "") {
                alert("请输入代理商手机");
                return;
            }
            if (scope.currencyTotal == 0 && scope.regionTotal == 0) {
                alert("请输入全国或者区域激活码数量");
                return;
            }
            //if (scope.areaType == "-1") {
            //    alert("请输入激活码性质");
            //    return;
            //}
            if (confirm("此次分配数量：全国" + scope.currencyTotal + "个，区域" + scope.regionTotal + "个，请再次确认！")) {
                http.post("/Handlers/Membertoolhandler.ashx", { mobile: scope.mobilePhone, currencyTotal: scope.currencyTotal, regionTotal: scope.regionTotal, method: "SplitActiveCode" })//areaType: scope.areaType,
                .success(function (data) {
                    if (data.success) {
                        if (scope.currencyTotal > 0 && scope.regionTotal > 0) {
                            if (data.currencysuccess && data.regionsuccess) {
                                alert("添加成功");
                                scope.search(scope.pager.page);
                                scope.closeSplit();
                            }
                        } else if (scope.currencyTotal > 0) {
                            if (data.currencysuccess) {
                                alert("全国激活码分配成功");
                                scope.search(scope.pager.page);
                                scope.closeSplit();
                            } else {
                                alert(data.currencyerrorMsg);
                            }
                        } else if (scope.regionTotal > 0) {
                            if (data.regionsuccess) {
                                alert("区域激活码分配成功");
                                scope.search(scope.pager.page);
                                scope.closeSplit();
                            } else {
                                alert(data.regionerrorMsg);
                            }
                        }

                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        scope.resetPassword = function (agencyId) {
            if (agencyId > 0) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId: agencyId, method: "ResetPassword" })
                .success(function (data) {
                    if (data.success) {
                        alert("重置密码成功");
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("代理商不存在");
            }
        }

        //添加备注
        scope.isAddRemark = false;
        scope.isOpenAddRemark = function (agencyId) {
            scope.isAddRemark = true;
            scope.addRemarkagencyId = agencyId;
            scope.Reamrk = "";
        }
        scope.closeAddRemark = function () {
            scope.isAddRemark = false;
            scope.addRemarkagencyId = 0;
            scope.Reamrk = "";
        }

        scope.addRemark = function () {
            if (scope.addRemarkagencyId > 0) {
                http.post("/Handlers/Membertoolhandler.ashx", { agencyId: scope.addRemarkagencyId, remark: scope.Reamrk, method: "AddRemark" })
                .success(function (data) {
                    if (data.success) {
                        alert("添加备注成功");
                        scope.closeAddRemark();
                        scope.search(scope.pager.page);
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                alert("代理商不存在");
            }
        }

        //详情
        scope.ToDetail = function (agencyId) {
            window.location.href = "/MemberTool/Index.aspx#/agencydetail/" + agencyId;
        }
        //推广数据
        scope.ToEnterpriseDetail = function (agencyId) {
            window.location.href = "/Member/Index.aspx#/EnterpriseDetail/" + agencyId;
        }
        //用户文章
        scope.ToMemberarticlelist = function (agencyId) {
            window.location.href = "/Member/Index.aspx#/memberarticlelist/" + agencyId + "/0";
        }
        scope.ToAddAdvert = function (agencyId) {
            window.location.href = "/Add/AddAdvert.aspx?childAgencyId=" + agencyId;
        }

        //城市合伙人合并企业版
        scope.isPartnerAddEnterpriseUser = false;
        scope.isOpenPartnerAddEnterpriseUser = function (childAgencyId) {
            scope.memberlogin = "";
            scope.TchildAgencyId = childAgencyId;
            scope.isAddEnterpriseUser = true;
        }
        scope.closePartnerAddEnterpriseUser = function () {
            scope.isAddEnterpriseUser = false;
            scope.memberlogin = "";
            scope.TchildAgencyId = 0;
        }

        scope.PartnerAddEnterpriseUser = function () {
            if (confirm("此操作影响重大，请确认是否执行！")) {
                if (scope.memberlogin == "") {
                    alert("请输入用户手机号码");
                    return;
                }
                http.post("/Handlers/Membertoolhandler.ashx", { childAgencyId: scope.TchildAgencyId, login: scope.memberlogin, method: "PartnerAddEnterpriseUser" })
                .success(function (data) {
                    if (data.success) {
                        alert("绑定成功");
                        scope.closeAddEnterpriseUser();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        //添加企业版账户
        scope.isAddEnterpriseUser = false;
        scope.isOpenAddEnterpriseUser = function () {
            scope.enterpriseUsermobile = "";
            scope.pwd = "";
            scope.confimpwd = "";
            scope.isAddEnterpriseUser = true;
        }
        scope.isCloseEnterpriseUser = function () {
            scope.isAddEnterpriseUser = false;
            scope.enterpriseUsermobile = "";
            scope.pwd = "";
            scope.confimpwd = "";
        }
        scope.AddEnterpriseUser = function () {

        }

        //添加激活码
        scope.isOpenAddActiveCode = false;
        scope.openAddActiveCode = function () {
            scope.isOpenAddActiveCode = true;
            scope.Total = 0;
        }

        //导入企业账户
        scope.isImport = false;
        scope.isOpenImport = function (agencyId) {
            scope.isImport = true;
            scope.importfile = "";
            scope.importAgencyId = agencyId;
        }
        scope.closeImport = function () {
            scope.isImport = false;
            scope.importfile = "";
            scope.importAgencyId = 0;
        }
        scope.ImportEnterpriseUser = function (file) {
            if (file == undefined) {
                alert("请选择Execl文件！");
                return;
            }
            if (confirm("是否确认导入？")) {
                file.upload = Upload.upload({
                    //url: '/Handlers/Membertoolhandler.ashx',
                    //data: { method: "AdminImportEnterpriseUser", file: file, childagencyId: scope.importAgencyId }
                    url: '/admin.asmx/ImportEnterpriseUser',
                    data: {
                        file: file, childagencyId: scope.importAgencyId
                    }
                }).success(function (data) {
                    scope.success = data.success;
                    if (data.success) {
                        scope.successMsg = data.successMsg;
                        scope.errorCount = data.errorCount
                        scope.downloadhref = data.downloadhref;
                    } else {
                        alert(data.errorMsg)
                    }
                })
            }
        }

        //上传图片
        scope.uploadImg = function (file, filetype) {
            if (file != undefined) {
                if (scope.errorFile != null) {
                    if (scope.errorFile.$error == "maxSize") {
                        alert("图片大小不能超过10MB");
                        return;
                    }
                }
                file.upload = Upload.upload({
                    url: '/Handlers/Membertoolhandler.ashx',
                    data: {
                        method: "UploadPic", folder: "eq", file: file
                    }
                }).success(function (data) {
                    switch (filetype) {
                        case 'card_p':
                            scope.card_p = data.imgpath;
                            return;
                        case 'card_s':
                            scope.card_s = data.imgpath;
                            return;
                        case 'license':
                            scope.license = data.imgpath;
                            return;
                        case 'other':
                            scope.other = data.imgpath;
                            return;
                        default:
                            return;
                    }
                })
            }
        }

        //清理图片
        scope.clearImg = function (imgtype) {
            switch (imgtype) {
                case 'card_p':
                    scope.card_p = "";
                    scope.filecard_p = "";
                    return;
                case 'card_p':
                    scope.card_s = "";
                    scope.filecard_s = "";
                    return;
                case 'license':
                    scope.license = "";
                    scope.filelicense = "";
                    return;
                case 'other':
                    scope.other = "";
                    scope.fileother = "";
                    return;
                default:
                    return;
            }
        }


        //删除代理商
        scope.delAgency = function (item) {
            if (confirm("此操作不可逆，请谨慎操作。是否删除该合作商？")) {
                http.post("/admin.asmx/DelAgency", { agency_id: item.agencyId })
                .success(function (data) {
                    if (data.success) {
                        alert("操作成功");
                        scope.list.splice(scope.list.indexOf(item), 1);
                    }
                    else {
                        alert(data.errorMsg);
                    }
                });
            }
        }
    }])
    .controller("agencyactivecodelist", ["$scope", "$http", function (scope, http) {

        scope.pageSize = 20;
        scope.list = [];
        scope.memberMobile = "";

        scope.getlist = function (page) {
            http.post("/Handlers/Membertoolhandler.ashx", { memberMobile: scope.memberMobile, pageIndex: page, pageSize: scope.pageSize, method: "GetActiveCode" })
            .success(function (data) {
                scope.list = data.ActiveCodelist;
                scope.count = data.count;
                scope.pager.init(data.count);
            })
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.search();
    }])
    /*代理商详情*/
    .controller("agencydetail", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.childAgencyId = route.agencyId;

        if (scope.childAgencyId > 0) {
            http.post("/Handlers/Agencyhandler.ashx", { childAgencyId: scope.childAgencyId, method: "GetAgencyDetail" })
            .success(function (data) {
                if (data.success) {
                    scope.agencylist = data.agencylist;
                    scope.enterpriselist = data.enterpriselist;
                    //scope.childAgencyLevelId = data.childAgencyLevelId;
                    //scope.childAllActiveCount = data.childAllActiveCount;//总数
                    //scope.childAlreadyused = data.childAlreadyused;//已使用
                    //scope.childNotused = data.childNotused;

                    //scope.advertAllMoney = data.advertAllMoney;//总消耗
                    //scope.balance = data.balance;
                    //scope.advertDayMoney = data.advertDayMoney;

                    scope.Data = JSON.parse(data.Data);

                    scope.agencyMessage = JSON.parse(data.agencyMessage);
                }
                else {
                    alert(data.errorMsg);
                }
            })
        } else {
            alert("代理商不存在");
        }
    }])
    /*代理商流水*/
    .controller("agencyaccountlog", ["$scope", "$http", function (scope, http) {
        scope.pageSize = 20;
        scope.list = [];
        scope.memberMobile = "";

        scope.getlist = function (page) {
            http.post("/Handlers/Agencyhandler.ashx", { pageIndex: page, pageSize: scope.pageSize, method: "GetAgencyCountlog" })
            .success(function (data) {
                scope.list = data.accountLog;
                scope.count = data.count;
                scope.pager.init(data.count);
                scope.balance = data.balance;
                scope.moneyIn = data.moneyIn;
                scope.moneyOut = data.moneyOut;
                scope.date = data.date;
            })
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.search();

        scope.isShow = false;
        scope.open = function (type) {
            scope.Money = "";
            scope.isShow = true;
            scope.Type = type;
        }
        scope.close = function () {
            scope.isShow = false;
            scope.Money = "";
        }

        scope.UpdateAccount = function () {
            if (scope.Money == "") {
                alert("请输入金额");
                return;
            }
            http.post("/Handlers/Agencyhandler.ashx", { type: scope.Type, money: scope.Money, channel: "", method: "UpdateAgencyAccount" })
            .success(function (data) {
                if (data.success) {
                    alert("提交成功");
                    scope.close();
                    scope.search();
                } else {
                    alert("提交失败");
                }
            })
        }
    }])
    /*企业模板列表*/
    .controller("agencytemplatelist", ["$scope", "$http", "Upload", "$timeout", function (scope, http, Upload, timeout) {

        scope.toplist = [];
        scope.bottomlist = [];

        scope.advertname = "";
        scope.advertTypeId = "0";
        scope.advertposition = "0";
        scope.is_carousel = "1";

        scope.pic = "";
        scope.href = "";
        scope.des = "";
        scope.name = "";
        scope.mobile = "";
        scope.QQ = "";
        scope.productname = "";
        scope.price = 0;
        scope.ownername = "";
        scope.dt_action = 1;//大图广告点击动作
        scope.advertTypes = {
            0: "请选择推广类型",
            1: "通栏推广",
            2: "图文推广",
            3: "名片推广",
            4: "二维码推广",
            5: "QQ推广",
            6: "店铺推广",
            8: "大图推广"
            //,7: "视频贴片"
        }
        scope.advertpositions = {
            0: "请选择模板类型",
            1: "底部推广",
            2: "顶部推广"
        }
        scope.carousel = {
            0: "否",
            1: "是"
        }

        scope.positionschange = function () {
            if (scope.advertposition == "2") {
                scope.advertTypeId = "0";
                scope.advertTypes = {
                    0: "请选择推广类型",
                    1: "通栏推广",
                }
            } else {
                scope.advertTypeId = "0";
                scope.advertTypes = {
                    0: "请选择推广类型",
                    1: "通栏推广",
                    2: "图文推广",
                    3: "名片推广",
                    4: "二维码推广",
                    5: "QQ推广",
                    6: "店铺推广",
                    8: "大图推广"
                    //, 7: "视频贴片"
                }
            }
        }

        scope.getlist = function () {
            http.post("/Handlers/Adverthandler.ashx", { method: "GetAgencyTemplatelist" })
            .success(function (data) {
                scope.toplist = data.toplist;
                scope.bottomlist = data.bottomlist;
                scope.is_force_top = data.isforce_top == 1 ? true : false;
                scope.is_force_bottom = data.isforce_bottom == 1 ? true : false;
                scope.is_force = data.isforce;
            })
        }

        scope.getlist();

        scope.setPicUrl = function (url) {
            scope.pic = url;
        }

        scope.isShow = false;
        scope.open = function () {
            scope.isShow = true;
            scope.advertname = "";
            scope.advertTypeId = "0";
            scope.advertposition = "0";
            scope.is_carousel = "1";
            scope.advertId = 0;

            scope.dt_action = 1;
            scope.href = "";
            scope.des = "";
            scope.name = "";
            scope.mobile = "";
            scope.address = "";
            scope.QQ = "";
            scope.productname = "";
            scope.price = 0;
            scope.ownername = "";
            scope.file = "";
            scope.productfile = "";
            scope.ownerfile = "";
            scope.imgpath = "";
            scope.imgpathproduct = "";
            scope.imgpathowner = "";
            scope.errorFile = null;
        }
        scope.close = function () {
            scope.isShow = false;
            scope.advertname = "";
            scope.advertTypeId = "0";
            scope.advertposition = "0";
            scope.is_carousel = "1";
            scope.advertId = 0;

            scope.dt_action = 1;
            scope.href = "";
            scope.des = "";
            scope.name = "";
            scope.mobile = "";
            scope.address = "";
            scope.QQ = "";
            scope.productname = "";
            scope.price = 0;
            scope.ownername = "";
            scope.file = "";
            scope.productfile = "";
            scope.ownerfile = "";
            scope.imgpath = "";
            scope.imgpathproduct = "";
            scope.imgpathowner = "";
            scope.errorFile = null;
        }
        scope.openEdit = function (advert_id) {
            http.post("/Handlers/Adverthandler.ashx", { method: "GetAgencytemplateModel", advert_id: advert_id })
            .success(function (data) {
                var model = JSON.parse(data.advert_model);
                var advert_detail = JSON.parse(model.advert_detail);
                scope.isShow = true;
                scope.advertId = model.advert_id;
                scope.advertname = model.advert_name;
                scope.advertposition = model.advert_position;
                scope.advertTypeId = model.advert_type_id.toString();
                if (model.advert_type_id == 1) {
                    scope.imgpath = advert_detail.pic;
                    scope.href = advert_detail.href;
                }
                else if (model.advert_type_id == 2) {
                    scope.imgpath = advert_detail.pic;
                    scope.name = advert_detail.name;
                    scope.des = advert_detail.des;
                    scope.href = advert_detail.href;
                }
                else if (model.advert_type_id == 3) {
                    scope.imgpath = advert_detail.pic;
                    scope.name = advert_detail.name;
                    scope.mobile = advert_detail.mobile;
                    scope.address = advert_detail.address;
                }
                else if (model.advert_type_id == 4) {
                    scope.imgpath = advert_detail.pic;
                    scope.des = advert_detail.des;
                    scope.name = advert_detail.name;
                }
                else if (model.advert_type_id == 5) {
                    scope.name = advert_detail.name;
                    scope.QQ = advert_detail.QQ;
                    scope.imgpath = advert_detail.pic;
                    scope.des = advert_detail.des;
                }
                else if (model.advert_type_id == 6) {
                    scope.productname = advert_detail.product_info.name;
                    scope.price = advert_detail.product_info.price;
                    scope.imgpathproduct = advert_detail.product_info.pic;
                    scope.href = advert_detail.product_info.href;
                    scope.ownername = advert_detail.owner_info.name;
                    scope.imgpathowner = advert_detail.owner_info.pic;
                    scope.mobile = advert_detail.owner_info.mobile;
                } else if (model.advert_type_id == 7) {
                    scope.imgpath = advert_detail.pic;
                    scope.href = advert_detail.href;
                }
                else if (model.advert_type_id == 8) {
                    // scope.name = advert_detail.name;
                    scope.dt_action = advert_detail.action;
                    scope.href = advert_detail.href;
                    scope.imgpath = advert_detail.pic;
                }
                scope.file = "";
                scope.productfile = "";
                scope.ownerfile = "";
                scope.errorFile = null;
            })
        }
        //scope.Edit = function (item) {
        //    scope.advertname = item.advert_name;
        //    scope.advertTypeId = item.advert_type_id;
        //    scope.advertposition = item.advert_position;
        //    scope.is_carousel = item.is_carousel;


        //}

        //添加企业模板
        scope.AddAgencyTemplate = function () {
            var parame = {};
            if (scope.advertposition == "0") {
                alert("请选择模板类型！");
                return;
            }
            if (scope.advertTypeId == "0") {
                alert("请选择推广类型！");
                return;
            }
            if (scope.advertTypeId == "6") {
                if (scope.imgpathproduct == "") {
                    alert("请选择产品图片！");
                    return;
                }
                if (scope.imgpathowner == "") {
                    alert("请选择店主头像！");
                    return;
                }
            } else if (scope.advertTypeId == "1" || scope.advertTypeId == "2") {
                if (scope.imgpath == "") {
                    alert("请选择推广图片！");
                    return;
                }
            } else if (scope.advertTypeId == "3") {
                if (scope.imgpath == "") {
                    alert("请选择头像！");
                    return;
                }
            } else if (scope.advertTypeId == "4") {
                if (scope.imgpath == "") {
                    alert("请选择二维码！");
                    return;
                }
            } else if (scope.advertTypeId == "5") {
                if (scope.imgpath == "") {
                    alert("请选择QQ头像！");
                    return;
                }
            }
            else if (scope.advertTypeId == "8") {
                if (scope.imgpath == "") {
                    alert("请选择大图图片");
                    return;
                }
            }
            else if (scope.advertTypeId == "7") {
                if (scope.imgpath == "") {
                    alert("请选择贴片图片");
                    return;
                }
            }
            switch (scope.advertTypeId) {
                case "1"://通栏广告
                    if (scope.href == "") {
                        alert("请输入链接地址！");
                        return;
                    };
                    parame = {
                        AdvertTypeId: scope.advertTypeId,
                        advertId: scope.advertId, AdvertPosition: scope.advertposition, iscarousel: scope.is_carousel, advertname: scope.advertname, href: scope.href, method: "AddAgencyTemplate"
                    };
                    break;
                case "2"://图文
                    if (scope.name == "") {
                        alert("请输入产品或服务名称！");
                        return;
                    }
                    if (scope.des == "") {
                        alert("请输入描述！");
                        return;
                    }
                    if (scope.href == "") {
                        alert("请输入链接地址！");
                        return;
                    }
                    parame = {
                        AdvertTypeId: scope.advertTypeId, advertId: scope.advertId, AdvertPosition: scope.advertposition, iscarousel: scope.is_carousel, advertname: scope.advertname, name: scope.name, des: scope.des, href: scope.href, method: "AddAgencyTemplate"
                    };
                    break;
                case "3"://名片
                    if (scope.name == "") {
                        alert("请输入姓名！");
                        return;
                    }
                    if (scope.mobile == "") {
                        alert("请输入手机号码！");
                        return;
                    }
                    if (scope.address == "") {
                        alert("请输入联系地址！");
                        return;
                    }
                    parame = {
                        AdvertTypeId: scope.advertTypeId, advertId: scope.advertId, AdvertPosition: scope.advertposition, iscarousel: scope.is_carousel, advertname: scope.advertname, name: scope.name, mobile: scope.mobile, address: scope.address, method: "AddAgencyTemplate"
                    };
                    break;
                case "4"://二维码
                    if (scope.name == "") {
                        alert("请输入二维码名称！");
                        return;
                    }
                    if (scope.des == "") {
                        alert("请输入二维码介绍！");
                        return;
                    }
                    parame = {
                        AdvertTypeId: scope.advertTypeId, advertId: scope.advertId, AdvertPosition: scope.advertposition, iscarousel: scope.is_carousel, advertname: scope.advertname, name: scope.name, des: scope.des, method: "AddAgencyTemplate"
                    };
                    break;
                case "5"://QQ
                    if (scope.name == "") {
                        alert("请输入QQ昵称！");
                        return;
                    }
                    if (scope.QQ == "") {
                        alert("请输入QQ号码！");
                        return;
                    }
                    if (scope.des == "") {
                        alert("请输入QQ介绍！");
                        return;
                    }
                    parame = {
                        AdvertTypeId: scope.advertTypeId, advertId: scope.advertId, AdvertPosition: scope.advertposition, iscarousel: scope.is_carousel, advertname: scope.advertname, name: scope.name, QQ: scope.QQ, des: scope.des, method: "AddAgencyTemplate"
                    };
                    break;
                case "6"://店铺
                    if (scope.productname == "") {
                        alert("请输入产品名称！");
                        return;
                    }
                    if (scope.price == 0) {
                        alert("请输入产品价格！");
                        return;
                    }
                    if (scope.href == "") {
                        alert("请输入产品链接！");
                        return;
                    }
                    if (scope.ownername == "") {
                        alert("请输入店铺或公司名称！");
                        return;
                    }
                    if (scope.mobile == "") {
                        alert("请输入联系电话！");
                        return;
                    }
                    parame = {
                        AdvertTypeId: scope.advertTypeId, advertId: scope.advertId, AdvertPosition: scope.advertposition, iscarousel: scope.is_carousel, advertname: scope.advertname, productname: scope.productname, productpic: scope.productpic, href: scope.href, ownername: scope.ownername, ownerpic: scope.ownerpic, mobile: scope.mobile, price: scope.price, method: "AddAgencyTemplate"
                    };
                    break;
                case "8"://大图广告
                    if (scope.href == "") {
                        alert("请输入" + (scope.dt_action == 1 ? "链接地址" : scope.dt_action == 2 ? "电话" : scope.dt_action == 3 ? "QQ" : ""));
                        return;
                    }
                    parame = {
                        AdvertTypeId: scope.advertTypeId, advertId: scope.advertId, AdvertPosition: scope.advertposition, iscarousel: scope.is_carousel, advertname: scope.advertname, name: scope.name, action: scope.dt_action, href: scope.href, method: "AddAgencyTemplate"
                    };
                    break;
                case "7"://视频贴片
                    if (scope.href == "") {
                        alert("请输入产品链接！");
                        return;
                    }
                    parame = {
                        AdvertTypeId: scope.advertTypeId,
                        advertId: scope.advertId, AdvertPosition: scope.advertposition, iscarousel: scope.is_carousel, advertname: scope.advertname, href: scope.href, method: "AddAgencyTemplate"
                    };
                    break;
                default:
                    return;
            }
            if (scope.advertTypeId == "6") {
                parame["productpic"] = scope.imgpathproduct;
                parame["ownerpic"] = scope.imgpathowner;
            } else {
                parame["pic"] = scope.imgpath;
            }
            http.post("/Handlers/Adverthandler.ashx", parame)
            .success(function (data) {
                if (data.success) {
                    alert("添加成功！");
                    scope.getlist();
                    scope.close();
                } else {
                    alert(data.errorMsg);
                }
            })
        }

        //上传图片
        scope.uploadImg = function (file, filetype) {
            if (scope.errorFile != null) {
                if (scope.errorFile.$error == "maxWidth") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "minWidth") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "maxHeight") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "minHeight") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "maxSize") {
                    alert("图片大小不能超过5MB");
                    return;
                }
            }
            if (file != undefined) {
                file.upload = Upload.upload({
                    url: '/Handlers/Membertoolhandler.ashx',
                    data: {
                        method: "UploadPic", folder: "ad", file: file
                    }
                }).success(function (data) {
                    switch (filetype) {
                        case 0:
                            scope.imgpath = data.imgpath;
                            return;
                        case 1:
                            scope.imgpathproduct = data.imgpath;
                            return;
                        case 2:
                            scope.imgpathowner = data.imgpath;
                            return;
                        default:
                            scope.imgpath = data.imgpath;
                            return;
                    }
                })
            }
        }

        scope.clearImg = function (filetype) {
            switch (filetype) {
                case 0:
                    scope.imgpath = "";
                    return;
                case 1:
                    scope.imgpathproduct = "";
                    return;
                case 2:
                    scope.imgpathowner = "";
                    return;
                default:
                    scope.imgpath = "";
                    return;
            }
        }
        //启用|禁用 广告模板   item:模板对象  type:1开启 0禁用
        scope.UpdateStatus = function (item, type) {
            var advertId = item.advert_id;
            if (item.advert_type_id == 8 && type == 1) {//大图广告 开启时 需要把其它广告都禁用
                if (!confirm("大图广告模板开启时，其它底部模板全部自动禁用，开启其它模板时，该模板同样会自动禁用。您确认要开启当前模板吗？"))
                    return;
            }
            if (advertId > 0) {
                http.post("/Handlers/Adverthandler.ashx", { advertId: advertId, status: type, method: "UpdateTemplateStatus" })
                .success(function (data) {
                    if (data.success) {
                        scope.getlist();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            } else {
                return;
            }
        }
        scope.DeleteTemplate = function (advertId) {
            if (confirm("删除无法恢复，确认删除？")) {
                if (advertId > 0) {
                    http.post("/Handlers/Adverthandler.ashx", { advertId: advertId, method: "DeleteAgencyTemplate" })
                    .success(function (data) {
                        if (data.success) {
                            scope.getlist();
                        } else {
                            alert(data.errorMsg);
                        }
                    })
                } else {
                    return;
                }
            }
        }
        scope.checkboxChange = function (forcetype) {
            var force;
            if (forcetype == 'bottom') {
                force = scope.is_force_bottom ? 0 : 1;
            } else if (forcetype == 'top') {
                force = scope.is_force_top ? 0 : 1;
            } else if (forcetype == 'all') {
                force = scope.is_force ? 0 : 1;
            }
            http.post("/Handlers/Adverthandler.ashx", { forcetype: forcetype, is_force: force, method: "UpdateAgencyForce" })
            .success(function (data) {
                if (data.success) {
                    if (forcetype == 'bottom') {
                        scope.is_force_bottom = !scope.is_force_bottom;
                    } else if (forcetype == 'top') {
                        scope.is_force_top = !scope.is_force_top;
                    } else if (forcetype == 'all') {
                        scope.is_force = !scope.is_force;
                    }
                } else {
                    alert(data.errorMsg);
                }
            })
        }
        scope.UpdateTemplateOrdernum = function (templateId, sort) {
            http.post("/Handlers/Adverthandler.ashx", { templateId: templateId, sort: sort, method: "UpdateTemplateOrdernum" })
                .success(function (data) {
                    if (data.success) {
                        alert("更新成功");
                        scope.getlist();
                    } else {
                        alert(data.errorMsg);
                    }
                })
        }
    }])
    /*企业素材列表*/
    .controller("agencymateriallist", ["$scope", "$http", "Upload", "$timeout", function (scope, http, Upload, timeout) {
        scope.list = [];

        scope.getlist = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetAgencyMaterialList" })
            .success(function (data) {
                scope.list = data.list;
            })
        }

        scope.getlist();

        scope.DeleteAgencyMaterial = function (materialId) {
            if (confirm("删除无法恢复，确认删除？")) {
                http.post("/Handlers/Membertoolhandler.ashx", { method: "DeleteAgencyMaterial", materialId: materialId })
                .success(function (data) {
                    if (data.success) {
                        alert("删除成功");
                        scope.getlist();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        scope.isShow = false;
        scope.open = function () {
            scope.isShow = true;
            scope.file = "";
            scope.errorFile = null;
        }
        scope.close = function () {
            scope.isShow = false;
            scope.file = "";
            scope.errorFile = null;
        }


        scope.AddAgenctMaterial = function (file) {
            if (scope.errorFile != null) {
                if (scope.errorFile.$error == "maxWidth") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "minWidth") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "maxHeight") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "minHeight") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "maxSize") {
                    alert("图片大小不能超过5MB");
                    return;
                }
            }
            file.upload = Upload.upload({
                url: '/Handlers/Membertoolhandler.ashx',
                data: {
                    method: "UploadPic", folder: "material", file: file
                }
            }).success(function (data) {
                if (data.success) {
                    http.post("/Handlers/Membertoolhandler.ashx", { method: "AddAgencyMaterial", materialUrl: data.imgpath })
                    .success(function (data) {
                        if (data.success) {
                            alert("素材添加成功！");
                            scope.getlist();
                            scope.close();
                        } else {
                            alert(data.errorMsg);
                        }
                    })
                } else {
                    alert("图片上传失败！");
                }
            });
        }
    }])
    /*企业推广数据*/
    .controller("EnterpriseDetail", ["$scope", "$http", "$routeParams", function (scope, http, route) {

        var total = {};
        var click = {};
        var trans = {};
        var look = {};
        scope.list = [];
        scope.agencyId = route.agencyId;

        scope.GetDetail = function () {
            http.post("/Handlers/Agencyhandler.ashx", { method: "GetEnterpriseDetail", agencyId: scope.agencyId })
            .success(function (data) {
                if (data.success) {
                    scope.EnterpriseDetail = JSON.parse(data.EnterpriseDetail);
                    scope.GetLineChart("month");
                } else {
                    alert(data.errorMsg);
                }
            })
        }
        scope.GetDetail();

        scope.dateRange = "";
        scope.screenType = "month";
        scope.Load = false;
        scope.GetLineChart = function (screenType) {
            http.post("/Handlers/Agencyhandler.ashx", { method: "GetLineChart", agencyId: scope.agencyId, dateRange: scope.dateRange, screenType: screenType })
            .success(function (data) {
                if (data.success) {
                    scope.Load = true;
                    total["name"] = "总篇数";
                    total["datapoints"] = data.total;
                    click["name"] = "点击数";
                    click["datapoints"] = data.click;
                    trans["name"] = "转发数";
                    trans["datapoints"] = data.trans;
                    look["name"] = "曝光数";
                    look["datapoints"] = data.look;
                    scope.multiple = [total, click, trans, look];
                    scope.MemberArticleDetailList = JSON.parse(data.MemberArticleDetailList);
                } else {
                    alert(data.errorMsg);
                    scope.Load = false;
                }
            })
        }
    }])
    /*广告语*/
    .controller("advdown", ["$scope", "$http", function (scope, http) {
        scope.getAdvertlang = function () {
            http.post("/admin.asmx/PartnerTopAdvertlang", {})
            .success(function (data) {
                scope.title = data.title;
                scope.des = data.des;
            })
        }
        scope.getAdvertlang();

        scope.updateAdvertlang = function () {
            http.post("/admin.asmx/UpdatePartnerTopAdvertlang", { title: scope.title, des: scope.des })
            .success(function (data) {
                if (data.success) {
                    alert("更新成功");
                    scope.getAdvertlang();
                } else {
                    alert(data.errorMsg);
                }
            })
        }
    }])
     /*企业闹钟*/
    .controller("agency_clock", ["$scope", "$http", function (scope, http) {
        scope.get_clock = function () {
            http.post("/admin.asmx/GetEnterpriseClock", {})
            .success(function (data) {
                if (data.Have) {
                    scope.h_key = data.clock.Hour.toString();
                    scope.m_key = data.clock.Minute.toString();
                    scope.w_key = data.clock.Week.toString();
                    scope.status = data.clock.Status;
                }
            })
        }

        scope.status_change = function (status) {
            scope.status = status;
        }

        scope.Initialize = function () {
            scope.hours = {};
            scope.minutes = {};
            scope.h_key = "8";
            scope.m_key = "0";
            scope.w_key = "1";
            scope.status = false;
            for (var h = 0; h < 24; h++) {
                var h_val;
                if (h.toString().length <= 1) {
                    h_val = "0" + h + "时";
                } else {
                    h_val = h + "时";
                }
                scope.hours[h] = h_val;
            }
            for (var m = 0; m < 60; m += 5) {
                var m_val;
                if (m.toString().length <= 1) {
                    m_val = "0" + m + "分";
                } else {
                    m_val = m + "分"
                }
                scope.minutes[m] = m_val;
            }
            scope.get_clock();
        }
        //初始化
        scope.Initialize();

        scope.update_task = function () {
            if (confirm("是否确认提交？")) {
                http.post("/admin.asmx/UpdateEnterpriseClock", { hour: scope.h_key, minute: scope.m_key, week: scope.w_key, status: scope.status ? 1 : 0 })
                .success(function (data) {
                    if (data.success) {
                        alert("更新成功");
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
    }])
    /*互推添加广告*/
    .controller("updateEpadvert", ["$scope", "$http", "$routeParams", "Upload", function (scope, http, route, Upload) {
        scope.advert_id = route.advert_id;
        scope.agency_id = route.agency_id;
        scope.empty = function () {
            scope.type_id = "-1";
            scope.xx_title = "";
            scope.xx_href = "";

            scope.mp_title = "";
            scope.mp_detail = "";
            scope.mp_tel = "";

            scope.qrcode_title = "";
            scope.qrcode_detail = "";

            scope.advert_detail = "";
        }
        scope.empty();
        //获取ep广告
        scope.GetEp_advert = function () {
            http.post("/admin.asmx/GetEp_advertById", { advert_id: scope.advert_id })
            .success(function (data) {
                var ep = JSON.parse(data.ep);
                var ep_d = JSON.parse(ep.advert_detail);
                scope.type_id = ep.advert_type_id.toString();
                if (scope.type_id == "1") {
                    scope.xx_imgpath = ep_d.pic;
                    scope.xx_title = ep_d.title;
                    scope.xx_href = ep_d.href;
                }
                if (scope.type_id == "2") {
                    scope.mp_imgpath = ep_d.pic;
                    scope.mp_title = ep_d.title;
                    scope.mp_detail = ep_d.detail;
                    scope.mp_tel = ep_d.tel;
                }
                if (scope.type_id == "3") {
                    scope.qrcode_imgpath = ep_d.pic;
                    scope.qrcode_title = ep_d.title;
                    scope.qrcode_detail = ep_d.detail;
                }
                scope.advert_detail = "";
            })
        }
        if (scope.advert_id > 0) {
            scope.GetEp_advert();
        } else {
            scope.empty();
        }

        scope.updateEp_advert = function (file) {
            if (scope.errorFile != null) {
                if (scope.errorFile.$error == "maxWidth") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "minWidth") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "maxHeight") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "minHeight") {
                    alert("请选择相应尺寸图片");
                    return;
                }
                if (scope.errorFile.$error == "maxSize") {
                    alert("图片大小不能超过5MB");
                    return;
                }
            }
            switch (scope.type_id) {
                case "-1":
                    alert("请选择广告类型");
                    return;
                case "1":
                    if (file == null) {
                        alert("请上传广告图片");
                        return;
                    }
                    if (scope.xx_href == "") {
                        alert("请输入链接地址");
                        return;
                    }
                    if (scope.xx_title == "") {
                        alert("请输入标题");
                        return;
                    }
                    if (scope.xx_href.indexOf("http://") < 0 && scope.xx_href.indexOf("https://") < 0) {
                        scope.xx_href = "http://" + scope.xx_href;
                    }
                    scope.advert_detail = "{\"title\":\"" + scope.xx_title + "\", \"href\": \"" + scope.xx_href + "\"";
                    break;
                case "2":
                    if (file == null) {
                        alert("请上传广告图片");
                        return;
                    }
                    if (scope.mp_title == "") {
                        alert("请输入名称");
                        return;
                    }
                    if (scope.mp_detail == "") {
                        alert("请输入简介");
                        return;
                    }
                    if (scope.mp_tel == "") {
                        alert("请输入联系方式");
                        return;
                    }
                    scope.advert_detail = "{\"title\":\"" + scope.mp_title + "\",\"detail\":\"" + scope.mp_detail + "\",\"tel\": \"" + scope.mp_tel + "\"";
                    break;
                case "3":
                    if (file == null) {
                        alert("请上传二维码");
                        return;
                    } if (scope.qrcode_title == "") {
                        alert("请输入标题");
                        return;
                    }
                    if (scope.qrcode_detail == "") {
                        alert("请输入二维码简介");
                        return;
                    }
                    scope.advert_detail = "{\"title\":\"" + scope.qrcode_title + "\",\"detail\":\"" + scope.qrcode_detail + "\"";
                    break;
            }
            
            
            file.upload = Upload.upload({
                url: '/Handlers/Membertoolhandler.ashx',
                data: {
                    method: "UploadPic", folder: "ep", file: file
                }
            }).success(function (data) {
                scope.advert_detail += ",\"pic\": \"" + data.imgpath + "\"}";
                if (data.success == false) {
                    alert(data.errorMsg);
                } else {
                    http.post("/admin.asmx/UpdateEp_advert", { agency_id: scope.agency_id, advert_id: scope.advert_id, type_id: scope.type_id, advert_detail: scope.advert_detail })
                    .success(function (data) {
                        if (data.success) {
                            alert("添加成功");
                            if (scope.advert_id > 0) {
                                scope.GetEp_advert();
                            } else {
                                scope.empty();
                            }
                        } else {
                            alert(data.errorMsg);
                        }
                    })
                }

                //switch (scope.type_id) {
                //    case 1:
                //        scope.xx_imgpath = data.imgpath;
                //        return;
                //    case 2:
                //        scope.mp_imgpath = data.imgpath;
                //        return;
                //    case 3:
                //        scope.qrcode_imgpath = data.imgpath;
                //        return;
                //    default:
                //        return;
                //}
            })
        }
        //上传图片
        scope.uploadImg = function (file, filetype) {
            
        }
        //清理图片
        scope.clearImg = function (imgtype) {
            switch (imgtype) {
                case 1:
                    scope.xx_imgpath = "";
                    scope.xx_file = "";
                    return;
                case 2:
                    scope.mp_imgpath = "";
                    scope.mp_file = "";
                    return;
                case 3:
                    scope.qrcode_imgpath = "";
                    scope.qrcode_file = "";
                    return;
                default:
                    return;
            }
        }

    }])
    /*互推设置*/
    .controller("updateEpconditiom", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.advert_id = route.advert_id;
        scope.agency_id = route.agency_id;
        scope.ep_categorys = {};
        scope.ep_relations = {};
        scope.provinces = {};
        scope.citys = {};
        scope.provinceAreas = {};
        scope.cityAreas = {};
        scope.ep_category_id = "-1";
        scope.ep_agency_id = "-1";
        scope.ep_agency_name = "";
        scope.provinceId = "0";
        scope.cityId = "-1";
        scope.provinceAreaId = "0";
        scope.cityAreaId = "-1";
        scope.ep_relation = [];
        scope.ep_region = [];
        scope.ep_category = [];
        scope.first_ep_category = [];
        scope.ep_allcategory = [];
        scope.EpCategoryLeverTwo = [];
        scope.math_ep_categorys = [];
        //获取推荐的互推行业列表
        scope.GetEP_Cat_List = function () {
            http.post("/admin.asmx/GetEP_Cat_List", { agency_id: scope.agency_id })
            .success(function (data) {
                for (var i = 0; i < data.c_list.length; i++) {
                    scope.math_ep_categorys[i] = data.c_list[i];
                }
            })
        }

        scope.GetEP_Cat_List();

        //互推行业获取互推行业
        scope.getepcategorys = function () {
            http.post("/admin.asmx/GetEp_category", { parent_id: 0 })
            .success(function (data) {
                //scope.ep_allcategory = data.c_list;
                if (data.c_list.length > 0) {
                    for (var i = 0; i < data.c_list.length; i++) {
                        scope.ep_categorys[data.c_list[i].c_id] = data.c_list[i].c_name;
                    }
                }
            })
        }
        scope.getepcategorystwo = function () {
            http.post("/admin.asmx/GetEp_twocategory", { id: 0 })
            .success(function(data) {
                if (data.c_list.length > 0) {
                    for (var i = 0; i < data.c_list.length; i++) {
                        scope.EpCategoryLeverTwo[i] = data.c_list[i];
                        var category_json = "{\"large_c_id\": \"" + scope.EpCategoryLeverTwo[i].c_id + "\",\"large_c_name\":\"" +scope.EpCategoryLeverTwo[i].c_name + "\", \"small_c_id\": \"\",\"small_c_name\":\"\" }";
                        scope.ep_allcategory.push(JSON.parse(category_json));
                    }
                }
            })
        }
        scope.getepcategorystwo();
        //互推公司获取互推企业
        scope.geteprelations = function () {
            http.post("/admin.asmx/GetEp_relation", { advert_id: scope.advert_id })
            .success(function (data) {
                if (data.c_list.length > 0) {
                    for (var i = 0; i < data.c_list.length; i++) {
                        var relation_json = "{\"ep_agency_id\": \"" + data.c_list[i].ep_agency_id + "\", \"ep_agency_name\": \"" + data.c_list[i].ep_agency_name + "\" }";
                        scope.ep_relation.push(JSON.parse(relation_json));
                    }
                }
            })
        }
        //互推公司获取省
        scope.getProvince = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
            .success(function (data) {
                for (var i = 0; i < data.Arealist.length; i++) {
                    scope.provinces[data.Arealist[i].areaId] = data.Arealist[i].areaName
                }
                scope.provinces[0] = "请选择省份";
            })
        }
        //互推公司获取市
        scope.getCityByProvince = function () {
            scope.cityId = "-1";
            scope.ep_relation_id = "-1";
            if (scope.provinceId != "0") {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.provinceId, method: "GetArea" })
                .success(function (data) {
                    scope.citys = {};
                    if (data.Arealist.length > 0) {
                        for (var i = 0; i < data.Arealist.length; i++) {
                            scope.citys[data.Arealist[i].areaId] = data.Arealist[i].areaName
                        }
                    }
                })
            }
        }
        //互推公司根据所在地区获取的企业
        scope.GetEp_CompanyByEPCity = function () {
            http.post("/admin.asmx/GetEp_CompanyByEPCity",{agency_id:scope.agency_id})
            .success(function (data) {
                scope.ep_relations = {};
                if (data.c_list.length > 0) {
                    scope.LocalCompany = data.c_list;
                    for (var i = 0; i < data.c_list.length; i++) {
                        if (data.c_list[i].ep_company_name == "") {
                            scope.ep_relations[data.c_list[i].ep_agency_id]= data.c_list[i].ep_agency_name
                        }
                        else {
                            scope.ep_relations[data.c_list[i].ep_agency_id] = data.c_list[i].ep_company_name;
                        }
                    }
                }
                scope.CityCompanys = Object.keys(scope.ep_relations).length;
            })
        }
        scope.GetEp_CompanyByEPCity();
        //互推公司根据省市获取下拉框的企业
        scope.getCompanyByCity = function () {
            scope.ep_agency_id = "-1";
            if (scope.provinceId == "0") {
                alert("请选择省份");
                return;
            } else {
                http.post("/admin.asmx/GetEp_CompanyByCity", { province_id: scope.provinceId, city_id: scope.cityId })
                .success(function (data) {
                    scope.ep_relations = {};
                    if (data.c_list.length > 0) {
                        for (var i = 0; i < data.c_list.length; i++) {
                            if (data.c_list[i].ep_company_name == "")
                                scope.ep_relations[data.c_list[i].ep_agency_id] = data.c_list[i].ep_agency_name
                            else
                                scope.ep_relations[data.c_list[i].ep_agency_id] = data.c_list[i].ep_company_name
                        }
                    }
                })
            }
        }
        scope.PushSelect = function (Company) {
            //var Company = $("#datalist").val();
            for (var i = 0; i < scope.LocalCompany.length; i++) {
                if(scope.LocalCompany[i]['ep_company_name'] == Company)
                scope.ep_agency_id = scope.LocalCompany[i]['ep_agency_id']
            }
            scope.pushRelationJson();
            scope.ep_agency_id = -1;
            $("#datalist").val("");
        }

        scope.keyword = "";
        scope.changkeyword = function () {
            scope.ep_relations = {};
            if (scope.keyword.trim()!="") {
                for (var i = 0; i < scope.LocalCompany.length; i++) {
                    if (scope.LocalCompany[i]['ep_company_name'].indexOf(scope.keyword)>=0) {
                        scope.ep_relations[scope.LocalCompany[i].ep_agency_id] = scope.LocalCompany[i].ep_company_name;
                    }
                }
            } else {
                for (var i = 0; i < scope.LocalCompany.length; i++) {
                    scope.ep_relations[scope.LocalCompany[i].ep_agency_id] = scope.LocalCompany[i].ep_company_name;
                }
            }
        };
        //互推地区获取省
        scope.getProvinceArea = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
            .success(function (data) {
                for (var i = 0; i < data.Arealist.length; i++) {
                    scope.provinceAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                }
                scope.provinceAreas[0] = "请选择省份";
            })
        }
        //互推地区获取市
        scope.getCityArea = function () {
            scope.cityAreaId = "-1";
            if (scope.provinceAreaId != "0") {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.provinceAreaId, method: "GetArea" })
                .success(function (data) {
                    scope.cityAreas = {};
                    if (data.Arealist.length > 0) {
                        for (var i = 0; i < data.Arealist.length; i++) {
                            scope.cityAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                        }
                    }
                })
            }
        }

        scope.getepcategorys();
        scope.geteprelations();
        scope.getProvince();
        scope.getProvinceArea();

        ////互推地区获取互推地区
        //scope.getepArea = function () {
        //    http.post("/admin.asmx/GetEp_Area", { advert_id: scope.advert_id })
        //    .success(function (data) {
        //        if (data.c_list.length > 0) {
        //            for (var i = 0; i < data.c_list.length; i++) {
        //                var region_json = "{\"province_id\": \"" + data.c_list[i].ep_Area_id1 + "\",\"province_name\":\"" + scope.provinceAreas[data.c_list[i].ep_Area_id1] + "\", \"city_id\": \"" + data.c_list[i].ep_Area_id2 + "\",\"city_name\":\"" + scope.cityAreas[data.c_list[i].ep_Area_id2] + "\" }";
        //                scope.ep_region.push(JSON.parse(region_json));
        //            }
        //        }
        //    })
        //}
        //scope.getepArea();
        //默认地区显示企业
        scope.pushOrDeleteRelationJson = function (item, a_or_d) {
            if (a_or_d) {
                if (scope.JudgeJson(3, item)) {
                    return;
                }
                var relation_json = "{\"ep_agency_id\": \"" + item + "\", \"ep_agency_name\": \"" +scope.ep_relations[item]+ "\" }";
                scope.ep_relation.push(JSON.parse(relation_json));
            } else {
                scope.deleteJson(3, item);
            }
        }


        //添加互推公司
        scope.pushRelationJson = function () {
            //if (scope.provinceId == "0") {
            //    alert("请选择省份");
            //    return;
            //}
            //if (scope.cityId == "-1") {
            //    alert("请选择城市");
            //    return;
            //}
            if (scope.ep_agency_id == "-1") {
                alert("请选择公司");
                return;
            }
            if (scope.ep_relation.length >= 20) {
                alert("最多只能选择20家互推公司");
                return;
            }
            if (scope.JudgeJson(3, scope.ep_agency_id)) {
                return;
            }
            var relation_json = "{\"ep_agency_id\": \"" + scope.ep_agency_id + "\", \"ep_agency_name\": \"" + scope.ep_relations[scope.ep_agency_id] + "\" }";
            scope.ep_relation.push(JSON.parse(relation_json));
        }
        //添加互推地区
        scope.pushRegionJson = function () {
            if (scope.provinceAreaId == "0") {
                alert("请选择省份");
                return;
            }
            if (scope.cityAreaId == "-1") {
                alert("请选择城市");
                return;
            }
            if (scope.ep_region.length >= 3) {
                alert("最多只能选择3个地区");
                return;
            }
            if (scope.JudgeJson(1, scope.cityAreaId)) {
                return;
            }
            var region_json = "{\"province_id\": \"" + scope.provinceAreaId + "\",\"province_name\":\"" + scope.provinceAreas[scope.provinceAreaId] + "\", \"city_id\": \"" + scope.cityAreaId + "\",\"city_name\":\"" + scope.cityAreas[scope.cityAreaId] + "\" }";
            scope.ep_region.push(JSON.parse(region_json));
        }
        //添加互推行业 
        scope.pushOrDeleteCategoryJson = function (item, a_or_d) {
            if (a_or_d) {
                if (scope.JudgeJson(2, item.c_id)) {
                    return;
                }
                var category_json = "{\"large_c_id\": \"" + item.c_id + "\",\"large_c_name\":\"" +item.c_name + "\", \"small_c_id\": \"\",\"small_c_name\":\"\" }";
                scope.ep_category.push(JSON.parse(category_json));
            } else {
                scope.deleteJson(2, item.c_id);
            }
        }
        //推荐互推一级行业选择
        scope.pushOrDeleteFirstCategoryJson = function (item, a_or_d) {
            scope.ep_category_id = item.c_id.toString();
            if (a_or_d) {
                var category_json = "{\"large_c_id\": \"" + item.c_id + "\",\"large_c_name\":\"" + item.c_name + "\", \"small_c_id\": \"\",\"small_c_name\":\"\" }";
                scope.first_ep_category.push(JSON.parse(category_json));
            } else {
                scope.deleteJson(4, item.c_id);
            }
            for (var i = 0; i < scope.EpCategoryLeverTwo.length; i++) {
                if (item.c_id == scope.EpCategoryLeverTwo[i].parent_id) {
                    var category_json = "{\"large_c_id\": \"" + scope.EpCategoryLeverTwo[i].c_id + "\",\"large_c_name\":\"" + scope.EpCategoryLeverTwo[i].c_name + "\", \"small_c_id\": \"\",\"small_c_name\":\"\" }";
                    if (a_or_d) {
                        scope.ep_category.push(JSON.parse(category_json));
                    } else {
                        scope.deleteJson(2, scope.EpCategoryLeverTwo[i].c_id);
                    }
                }
            }
        }
        //互推行业全选按钮
        scope.pushSelectAll = function () {
            scope.ep_category.splice(0, scope.ep_category.length);
            for (var i = 0; i < scope.EpCategoryLeverTwo.length; i++) {
                var category_json = "{\"large_c_id\": \"" + scope.EpCategoryLeverTwo[i].c_id + "\",\"large_c_name\":\"" + scope.EpCategoryLeverTwo[i].c_name + "\", \"small_c_id\": \"\",\"small_c_name\":\"\" }";
                scope.ep_category.push(JSON.parse(category_json));
            }
        }
        //互推行业反选按钮
        scope.pushAntiElection = function () {
            var antiselect = [];
            var jsoncategory = [];
            if (scope.ep_category.length == scope.EpCategoryLeverTwo.length) {
                scope.ep_category.splice(0, scope.ep_category.length);
            } else {
                antiselect = scope.EpCategoryLeverTwo;
                for (var i = 0; i < antiselect.length; i++) {
                    var category_json = "{\"large_c_id\": \"" + antiselect[i].c_id + "\",\"large_c_name\":\"" + antiselect[i].c_name + "\", \"small_c_id\": \"\",\"small_c_name\":\"\" }";
                    jsoncategory.push(JSON.parse(category_json));
                }
                for (var i = 0; i < scope.ep_category.length; i++) {
                    for (var k in jsoncategory) {
                        if (isObjectValueEqual(jsoncategory[k], scope.ep_category[i]))
                            jsoncategory.splice(k, 1);
                    }
                }

                scope.ep_category = [];
                scope.ep_category = jsoncategory;
            }
        }

        //判断两个对象是否相等
        function isObjectValueEqual(a, b) {
            if (typeof a == 'number' && typeof b == 'number') {
                return a == b
            }

            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);
            if (aProps.length != bProps.length) {
                return false;
            }
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if (Object.prototype.toString(a[propName]) == '[Object Object]' || Object.prototype.toString(b[propName]) == '[Object Object]') {
                    isObjectValueEqual(a[propName], b[propName])
                }
                if (a[propName] !== b[propName]) {
                    return false;
                }
            }
            return true;

        }

        //开始互推
        scope.UpdateEp_condition = function () {
            var isall = true;
            if (scope.ep_allcategory.length == scope.ep_category.length)
                for (var i = 0; i < scope.ep_allcategory.length; i++) {
                    if (!isObjectValueEqual(scope.ep_category[i], scope.ep_allcategory[i])) {
                        isall = false;
                    }
                }
            else isall = false;
            if (isall) {
                scope.ep_category = [];
            }
            //if (isObjectValueEqual(scope.ep_category, scope.ep_allcategory)) {
            //    //scope.ep_category = [];
            //    alert("1keyi")
            //}
            if (confirm("若要使用新模板，当前正在互推的模板将会停止，请确认是否提交？")) {
                if (isObjectValueEqual(scope.ep_category, scope.ep_allcategory)) {
                scope.ep_category =[];
                }
                http.post("/admin.asmx/UpdateEp_condition", { agency_id: scope.agency_id, advert_id: scope.advert_id, ep_region: JSON.stringify(scope.ep_region), ep_category: JSON.stringify(scope.ep_category), ep_relation: JSON.stringify(scope.ep_relation) })
                .success(function (data) {
                    if (data.success) {
                        alert("添加成功");
                        window.location.href = "/MemberTool/Index.aspx#/ep_home_page/" + scope.agency_id;
                    }
                    else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
        //重置
        scope.reload = function () {
            window.location.reload();
        }

        //type1:地区2:行业3:公司
        scope.JudgeJson = function (type, id) {
            if (type == 1) {
                for (var i = 0; i < scope.ep_region.length; i++) {
                    if (scope.ep_region[i].city_id == id) {
                        return true;
                    }
                }
            }
            if (type == 2) {
                for (var i = 0; i < scope.ep_category.length; i++) {
                    if (scope.ep_category[i].large_c_id == id) {
                        return true;
                    }
                }
            }
            if (type == 3) {
                for (var i = 0; i < scope.ep_relation.length; i++) {
                    if (scope.ep_relation[i].ep_agency_id == id) {
                        return true;
                    }
                }
            }
            if (type == 4) {
                for (var i = 0; i < scope.first_ep_category.length; i++) {
                    if (scope.first_ep_category[i].large_c_id == id) {
                        return true;
                    }
                }
            }
            return false;
        }

        scope.deleteJson = function (type, i) {
            if (type == 1) {
                scope.ep_region.splice(i, 1);
            }
            if (type == 2) {
                for (var c = 0; c < scope.ep_category.length; c++) {
                    if (scope.ep_category[c].large_c_id == i) {
                        scope.ep_category.splice(c, 1);
                    }
                }
            }
            //if (type == 3) {
            //     scope.ep_relation.splice(i, 1);
            //}
            //默认地区显示企业
            if (type == 3) {
                for (var c = 0; c < scope.ep_relation.length; c++) {
                    if (scope.ep_relation[c].ep_agency_id == i) {
                    scope.ep_relation.splice(c, 1);
                    }
                }
            }
            if (type == 4) {
                for (var c = 0; c < scope.first_ep_category.length; c++) {
                    if (scope.first_ep_category[c].large_c_id == i) {
                        scope.first_ep_category.splice(c, 1);
                    }
                }
            }
        }
    }])
        /*企业版后台互推首页*/
    .controller("ep_home_page", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.agency_id = route.agencyId;
        http.post("/admin.asmx/GetEpStateInfo", { agency_id: scope.agency_id })
            .success(function (data) {
                scope.stateInfo = data
            });

        scope.GetEpHome = http.post("/admin.asmx/GetEp_homepage", { agency_id: scope.agency_id })
        .success(function (data) {
            scope.Data = JSON.parse(data.h_data);
        })


        scope.UpdateEp_advert_state = function (advert_id, state) {
            if (confirm("是否确定更新？")) {
                http.post("/admin.asmx/UpdateEp_advertState", { advert_id: advert_id, state: state })
                .success(function (data) {
                    if (data.success) {
                        //scope.GetEpHome();
                        window.location.reload();
                        //alert("更新成功");
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        //删除互推模板 Create By ZFY @ 20170605
        scope.Del_Ep_advert = function (item, agency_id) {
            if (confirm("是否确定删除该模板？")) {
                http.post("/admin.asmx/UpdateEp_advertState", { agency_id: agency_id, advert_id: item.advert_id, state: 2 })
                .success(function (data) {
                    scope.Data.advertlist.splice(scope.Data.advertlist.indexOf(item), 1)
                });
            }
        }

        scope.ToUpdateEp_Advert = function (advert_id, agency_id) {
            window.location.href = "/MemberTool/Index.aspx#/updateEpadvert/" + advert_id + "/" + agency_id;
        }
        scope.ToEp_conditiom = function (advert_id) {
            window.location.href = "/MemberTool/Index.aspx#/updateEpconditiom/" + advert_id + "/" + scope.agency_id;
        }
        scope.ToEp_advert_data = function (advert_id) {
            window.location.href = "/MemberTool/Index.aspx#/ep_advert_data/0/" + advert_id;
        }

        scope.ep_categorys = {};
        scope.ep_category_id = "0";
        scope.GetEp_Categroy = function () {
            http.post("/admin.asmx/GetEp_category", { parent_id: 0 })
            .success(function (data) {
                if (data.c_list.length > 0) {
                    for (var i = 0; i < data.c_list.length; i++) {
                        scope.ep_categorys[data.c_list[i].c_id] = data.c_list[i].c_name;
                    }
                }
            })
        }
        scope.GetEp_Categroy();

        scope.UpdateAgency_ep = function () {
            if (scope.ep_category_id == "0") {
                alert("请选择行业");
                return;
            }
            http.post("/admin.asmx/UpdateAgency_ep", { update_type: 1, update_value: scope.ep_category_id })
            .success(function (data) {
                if (data.success) {
                    scope.Data.Is_fill_category = false;
                }
            })
        }
    }])
    .controller("ep_advert_detail", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.advert_id = route.advert_id;

        scope.getadvertby_id = function () {
            http.post("/admin.asmx/GetEp_advertById", { advert_id: scope.advert_id })
            .success(function (data) {
                scope.ep = JSON.parse(data.ep);
                scope.advert_detail = JSON.parse(scope.ep.advert_detail);
            })
        }

        scope.UpdateEp_advert_state = function (advert_id, state) {
            if (confirm("是否确定更新？")) {
                http.post("/admin.asmx/UpdateEp_advertState", { advert_id: advert_id, state: state })
                .success(function (data) {
                    if (data.success) {
                        alert("更新成功");
                        scope.gotoback();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        scope.getadvertby_id();

        scope.gotoback = function () {
            window.location.href = "javascript:history.back(-1);";
        }
    }])
     /*企业版后台功能设置*/
    .controller("ep_setting", ["$scope", "$http", function (scope, http) {

        scope.get_setting = function () {
            http.post("/admin.asmx/Get_setting", {})
            .success(function (data) {
                scope.d = data;
                scope.ep_category_id = data.ep_category_id;
            })
        }
        scope.get_setting();

        scope.UpdateAgency_ep = function (type, value) {
            if (type == 1) {
                if (value == "0") {
                    alert("请选择行业");
                    return;
                }
            }
            http.post("/admin.asmx/UpdateAgency_ep", { update_type: type, update_value: value })
            .success(function (data) {
                if (data.success) {
                    scope.get_setting();
                    if (type == 1) {
                        scope.close();
                    }
                }
            })
        }

        scope.ep_categorys = {};
        scope.isOpen = false;
        scope.open = function () {
            scope.isOpen = true;
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.ep_category_id == scope.d.ep_category_id;
        }
        scope.GetEp_Categroy = function () {
            http.post("/admin.asmx/GetEp_category", { parent_id: 0 })
            .success(function (data) {
                if (data.c_list.length > 0) {
                    for (var i = 0; i < data.c_list.length; i++) {
                        scope.ep_categorys[data.c_list[i].c_id] = data.c_list[i].c_name;
                    }
                }
            })
        }
        scope.GetEp_Categroy();
    }])
    .controller("ep_advert_data", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.agency_id = route.agency_id;
        scope.advert_id = route.advert_id;
        scope.dateRange = "";
        scope.list = [];

        scope.get_table_data = function () {
            for (var i = 0; i < scope.line_section.length; i++) {
                var item = {};
                item["sj"] = scope.line_section[i];
                item["num_look"] = scope.line_num_look_list[i];
                item["num_click"] = scope.line_num_click_list[i];
                scope.list.push(item);
            }
        }

        scope.get_date = function (screenType) {
            http.post("/admin.asmx/GetEp_advert_date", { advert_id: scope.advert_id, agency_id: scope.agency_id, screenType: screenType, dateRange: scope.dateRange })
            .success(function (data) {
                scope.list = [];
                scope.advert_data = data.advert_data;
                scope.line_section = JSON.parse(data.line_section);
                scope.line_num_click_list = JSON.parse(data.line_num_click_list);
                scope.line_num_look_list = JSON.parse(data.line_num_look_list);
                scope.pie_relation_series = JSON.parse(data.pie_relation_series);
                scope.pie_region_series = JSON.parse(data.pie_region_series);

                scope.lineOption = {
                    title: '互推数据统计',                                        //标题
                    xAxis: scope.line_section,        //【必填】x轴数值
                    series: [                                     //【必填】每条线在x轴对应处的值
                        {
                            name: '点击数',
                            data: scope.line_num_click_list
                        },
                        {
                            name: '曝光数',
                            data: scope.line_num_look_list
                        }
                    ],
                    backgroundColor: '#fff',                                 //背景颜色，默认无背景色
                    saveAsImage: false                                          //是否显示“保存为图片”
                };
                scope.relationPieOption = {
                    title: '互推企业',                        //标题
                    series: scope.pie_relation_series
                };
                scope.regionPieOption = {
                    title: '互推地区',
                    series: scope.pie_region_series
                }

                scope.get_table_data();
            })
        }

        http.post("/admin.asmx/GetEpStateInfo", {})
         .success(function (data) {
             scope.stateInfo = data
             if (data.ep_disabled == 0) {
                 scope.get_date('month');
             }
         });
        scope.Toep_advert_data_list = function () {
            window.location.href = "/membertool/Index.aspx#/ep_advert_data_list/" + scope.advert_id + "/" + scope.agency_id;
        }
    }])
    .controller("ep_advert_data_list", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.advert_id = route.advert_id;
        scope.agency_id = route.agency_id;

        scope.list = [];
        scope.pageSize = 20;

        scope.getlist = function (page) {
            http.post("/admin.asmx/GetEp_advert_date_list", { advert_id: scope.advert_id, agency_id: scope.agency_id, pageIndex: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = JSON.parse(data.list);
                scope.count = data.count;
                scope.pager.init(data.count);
            })
        }

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.search();
    }])
    /*咨询电话*/
    .controller("advisorytelephone", ["$scope", "$http", function (scope, http) {
        scope.telephone = "";
        scope.qudao_tel = "";
        scope.buy_tel = "";
        scope.ad_tel = "";
        scope.newtelephone = "";
        scope.newqudao_tel = "";
        scope.newbuy_tel = "";
        scope.newad_tel = "";
        scope.isEdit = false;
        scope.isqdEdit = false;
        scope.isbuyEdit = false;
        scope.isadEdit = false;

        scope.getlevelId = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetLoginLevel" })
            .success(function (data) {
                scope.levelId = data.levelId;
            })
        }

        scope.getlevelId();
        scope.gettelephone = function () {
            http.post("/admin.asmx/GetAdvisoryTelephone")
            .success(function (data) {
                scope.telephone = data.telephone;
                scope.qudao_tel = data.tel_qudao;
                scope.buy_tel = data.tel_buy;
                scope.ad_tel = data.tel_ad;
            })
        }

        scope.gettelephone();

        scope.edit = function (teltype) {
            switch (teltype) {
                case 'tel':
                    scope.isEdit = true;
                    break;
                case 'qudao':
                    scope.isqdEdit = true;
                    break;
                case 'buy':
                    scope.isbuyEdit = true;
                    break;
                case 'ad':
                    scope.isadEdit = true;
                default:
                    scope.isEdit = true;
                    break;
            }
        }

        scope.submit = function (submit_type) {
            var tel;
            switch (submit_type) {
                case 'tel':
                    tel = scope.newtelephone;
                    break;
                case 'qudao':
                    tel = scope.newqudao_tel;
                    break;
                case 'buy':
                    tel = scope.newbuy_tel;
                    break;
                case 'ad':
                    tel = scope.newad_tel;
                default:
                    return;
            }
            http.post("/admin.asmx/UpdateAdvisoryTelephone", { telephone: tel, up_type: submit_type })
            .success(function (data) {
                if (data.success) {
                    switch (submit_type) {
                        case 'tel':
                            scope.telephone = scope.newtelephone;
                            scope.newtelephone = "";
                            scope.isEdit = false;
                            break;
                        case 'qudao':
                            scope.qudao_tel = scope.newqudao_tel;
                            scope.newqudao_tel = "";
                            scope.isqdEdit = false;
                            break;
                        case 'buy':
                            scope.buy_tel = scope.newbuy_tel;
                            scope.newbuy_tel = "";
                            scope.isbuyEdit = false;
                            break;
                        case 'ad':
                            scope.ad_tel = scope.newad_tel;
                            scope.newad_tel = "";
                            scope.isadEdit = false;
                        default:
                            return;
                    }
                    alert("更新成功");
                } else {
                    alert(data.errorMsg);
                }
            })
        }
    }])
})();