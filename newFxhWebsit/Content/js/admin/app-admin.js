var myapp = angular.module("myapp", ["ngRoute", "angular-echarts", "ngFileUpload", "dateTool", "chart-directive"]);
(function () {
    myapp.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider", "$httpProvider", config1]);

    function config1($provide, $compileProvider, $controllerProvider, $filterProvider, $httpProvider) {
        myapp.controller = $controllerProvider.register;
        myapp.directive = $compileProvider.directive;
        myapp.filter = $filterProvider.register;
        myapp.factory = $provide.factory;
        myapp.provider = $provide.provider;
        myapp.service = $provide.service;
        myapp.constant = $provide.constant;
        myapp.value = $provide.value;
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
    //myapp.service("releaseService", [releaseServiceFn]);
    //function releaseServiceFn() {
    //    var advertId;
    //    this.SetAdvertId = function (data) {
    //        advertId = data;
    //    }
    //    this.GetAdvertId = function () {
    //        return advertId;
    //    }
    //}
    myapp.service("releaseServiceAdvertValue", [releaseServiceAdvertValue]);
    function releaseServiceAdvertValue() {
        var advert;
        this.SetAdvert = function (data) {
            advert = data;
        }
        this.GetAdvert = function () {
            return advert;
        }
    }
    myapp.service("searchService", function () {
        var search = [];
        this.Set = function (key, value) {
            search[key] = value;
            console.log(search);
            console.log("Set");
        };
        this.Get = function (key) {
            console.log(search);
            console.log("Get");
            return search[key];
        }
    })
    myapp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when("/individuationlist", {
            controller: 'individuationlist',
            templateUrl: '/content/ngtmpl/membertool/Individuation_list.html?v=201511261018'
        })
        .when("/articlelist", {
            controller: 'articlelist',
            templateUrl: '/content/ngtmpl/membertool/Article_list.html?v=20170926'
        })
        .when("/activecodelist/:agencyId", {
            controller: 'activecodelist',
            templateUrl: '/content/ngtmpl/membertool/activecode_list.html?v=201512061909'
        })
        .when("/articleauditlist/:isAudit", {
            controller: 'articleauditlist',
            templateUrl: '/content/ngtmpl/membertool/articleAudit_list.html?v=201611031018'
        })
        .when("/advertlist/:isAudit", {
            controller: "advertlist",
            templateUrl: '/content/ngtmpl/advert/advert_list.html?v=2017092001'
        })
        .when("/addadvert", {
            controller: "addadvert",
            templateUrl: '/content/ngtmpl/advert/addadvert.html?v=20170928'
        })
        .when("/editadvert/:advertId", {
            controller: "editadvert",
            templateUrl: '/content/ngtmpl/advert/editadvert.html'
        })
        .when("/advertdetail/:advertId", {
            controller: "advertdetail",
            templateUrl: "/content/ngtmpl/advert/advert_detail.html?v=201611031018",
        })
        .when("/appversion", {
            controller: "appversion",
            templateUrl: "/content/ngtmpl/sysconfig/appversion.html?v=201611031018"
        })
        .when("/pushlist", {
            controller: "pushlist",
            templateUrl: "/content/ngtmpl/sysconfig/push_list.html?v=201611031018"
        })
        .when("/messagelist", {
            controller: "messagelist",
            templateUrl: "/content/ngtmpl/sysconfig/message_list.html?v=201702041600"
        })
        .when("/appversionlist", {
            controller: "appversionlist",
            templateUrl: '/content/ngtmpl/sysconfig/appversion.html?v=201512061909'
        })
        .when("/changepwd", {
            controller: "changepwd",
            templateUrl: '/content/ngtmpl/sysconfig/changepwd.html?v=201512061909'
        })
        .when("/materialCategory", {
            controller: "MaterialCategory",
            templateUrl: '/content/ngtmpl/sysconfig/materialcategory_list.html'
        })
        .when("/material", {
            controller: "Material",
            templateUrl: '/content/ngtmpl/sysconfig/material_list.html'
        })
        .when("/reportlist", {
            controller: "reportlist",
            templateUrl: '/content/ngtmpl/sysconfig/report_list.html'
        })
        .when("/picsubjectlist/:isAudit", {
            controller: "picsubjectlist",
            templateUrl: '/content/ngtmpl/sysconfig/pic_subject_list.html'
        })
        .when("/inducemember", {
            controller: "inducemember",
            templateUrl: '/content/ngtmpl/sysconfig/Induce_member.html'
        })
        .when("/agencyauditlist", {
            controller: "agencyauditlist",
            templateUrl: '/content/ngtmpl/agency/agencyaudit_list.html?v=20170904'
        })
        .when("/videolist/:isAudit", {
            controller: "videolist",
            templateUrl: '/content/ngtmpl/sysconfig/video_list.html'
        })

        .when("/ep_enterprise_detail/:agency_id", {
            controller: "ep_enterprise_detail",
            templateUrl: '/content/ngtmpl/compelect/ep_enterprise_detail.html'
        })
        .when("/ep_relation_list", {
            controller: "ep_relation_list",
            templateUrl: '/content/ngtmpl/compelect/ep_relation_list.html'
        })
        .when("/file_manage", {
            controller: "file_list",
            templateUrl: '/content/ngtmpl/filemange/filemange.html?v=20170915'
        })
        .when("/Article_exposure", {
            controller: "ArticleExposureList",
            templateUrl: '/content/ngtmpl/statistical/Article_exposure.html'
        })
        .when("/EditArticle", {
            controller: "EditArticle",
            templateUrl: '/content/ngtmpl/sysconfig/editarticle.html'
        })
        //.otherwise({ "redirectTo": "/activecodelist/0" })F:\分享汇_WEB\Web\filemange\file_list.html
    }])

    .controller("EditArticle", ["$scope", "$http", function (scope, http) {
        scope.articleurl = "";
        scope.list;
        scope.look_num = 0;
        scope.click_num = 0;
        scope.trans_num = 0;
        scope.search = function () {
            if (scope.articleurl=="") {
                alert("请输入有效链接");
                return;
            }
            http.post("/Handlers/Sysconfighandler.ashx", { articleurl: scope.articleurl, method: "GetArticleData" })
            .success(function (data) {
                if (data.success) {
                    scope.list = data.list;
                    scope.show = true;
                    console.log(scope.list);
                } else {
                    scope.show = false;
                    alert(data.errorMsg);
                }
            })
        }
        scope.saveedit = function () {
            //console.log(scope.list[0]["article_member_id"]);
            
            if (confirm("确认修改该文章？")) {
                http.post("/Handlers/Sysconfighandler.ashx", {
                    article_member_id: scope.list[0]["article_member_id"],
                    look_num: scope.look_num == 0 ? scope.list[0]["look_num"] : scope.look_num,
                    click_num: scope.click_num == 0 ? scope.list[0]["click_num"] : scope.click_num,
                    trans_num: scope.trans_num == 0 ? scope.list[0]["trans_num"] : scope.trans_num,
                    method: "EditArticleData"
                })
                .success(function (data) {
                    if (data.success) {
                        alert("修改成功！");
                        scope.close();
                    } else {
                        alert("保存出错");
                        scope.close();
                    }
                })
            }
        }
        scope.close = function () {
            scope.show = false;
            scope.list = "";
            scope.look_num = 0;
            scope.click_num = 0;
            scope.trans_num = 0;
        }
    }])
    .controller("ArticleExposureList", ["$scope", "$http", function (scope, http) {
        scope.list = [];
        scope.pager = [];
        scope.pageSize = 20;
        scope.getlist = function (page) {
            http.post("/Handlers/Statisticalhandler.ashx", { DateRange: scope.DateRange, keyword: scope.keyword, member_keyword: scope.member_keyword, pageIndex: page, pageSize: scope.pageSize, orderBy: scope.orderBy, agencyId: scope.agencyId, memberId: scope.memberId, method: "GetArticleExposureList" })
            .success(function (data) {
                scope.list = data.list;
                scope.count = data.count;
                scope.pager.init(data.count);
            })
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 0);
        }
        scope.search()

    }])
    //文件列表
    .controller("file_list", ["$scope", "$http", function (scope, http) {
        scope.list = [];
        scope.pager = [];
        scope.count;
        scope.admin = false;
        scope.start = false;
        scope.title = "";
        scope.remark = "";
        scope.pageSize = 10;
        scope.isShow = false;
        scope.sequence = 0;
        scope.Statuss = ["未审核", "拒绝", "通过"];//1拒绝，2通过
        scope.uploadInfo = {
            title: "输入文件名",
            remark: "备注"
        };

        scope.getlist = function (page) {
            http.post("/Handlers/Filemangehandler.ashx", { page: page - 1, pageSize: scope.pageSize, method: "GetList" })
            .success(function (data) {
                scope.count = data.count;
                if (data.admin == "-1") {
                    scope.admin = true;
                }
                scope.list = data.list;
                scope.pager.init(data.count);
            })
        }

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 0);
        }
        scope.confirm = function (id, status) {
            http.post("/Handlers/Filemangehandler.ashx", { id: id, status: status, method: "confirm" })
            .success(function (data) {
                if (data.success) {
                    alert("操作成功");
                } else {
                    alert("操作失败");
                }
                scope.search();
            })
        }

        scope.search();

        scope.upload = function () {
            var str = "";
            $("input:[name='power'][checked]").each(function () {
                str += $(this).val() + ",";
            })
            if (scope.title.length < 1) {
                alert("填写文件名");
                return;
            }
            if (str.length < 1) {
                alert('未选择权限'); return;
            }
            var file;
            file = document.getElementById('fileUpload');
            if (file.files.length < 1) {
                alert("未选择上传文件"); return;
            }
            var fd = new FormData();
            var ot;
            fd.append("uploadFile", file.files[0]);
            fd.append("title", scope.title);
            fd.append("remark", scope.remark);
            fd.append("power", str)
            fd.append("sequence", scope.sequence);
            scope.start = true;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", scope.uploadComplete, false);
            xhr.open("POST", "/Handlers/Filemangehandler.ashx?method=upload");
            xhr.upload.onprogress = progressFunction;
            xhr.upload.onloadstart = function () {//上传开始执行方法
                ot = new Date().getTime();   //设置上传开始时间
                oloaded = 0;//设置上传开始时，以上传的文件大小为0
            };
            xhr.send(fd);
            //进度条
            function progressFunction(evt) {

                var progressBar = document.getElementById("progressBar");
                var percentageDiv = document.getElementById("percentage");
                // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
                if (evt.lengthComputable) {//
                    progressBar.max = evt.total;
                    progressBar.value = evt.loaded;
                    percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
                }

                var time = document.getElementById("time");
                var nt = new Date().getTime();//获取当前时间
                var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
                ot = new Date().getTime(); //重新赋值时间，用于下次计算

                var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b       
                oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算

                //上传速度计算
                var speed = perload / pertime;//单位b/s
                var bspeed = speed;
                var units = 'b/s';//单位名称
                if (speed / 1024 > 1) {
                    speed = speed / 1024;
                    units = 'k/s';
                }
                if (speed / 1024 > 1) {
                    speed = speed / 1024;
                    units = 'M/s';
                }
                speed = speed.toFixed(1);
                //剩余时间
                var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
                time.innerHTML = '，速度：' + speed + units + '，剩余时间：' + resttime + 's';
                if (bspeed == 0)
                    time.innerHTML = '上传已取消';
            }

        }
        scope.uploadComplete = function (evt) {
            var result = eval('(' + evt.target.response + ')')
            if (result.success) {
                alert('上传成功');
                //初始化
                scope.isShow = false;
                scope.start = false;
                scope.title = "";
                scope.remark = "";
                str = "";
                $("input:[name='power']").attr("checked", false);
                var file;
                file = document.getElementById('fileUpload');
                if (file.outerHTML) {
                    file.outerHTML = file.outerHTML;
                } else {
                    file.value = "";
                }
                scope.search();
            }
            else {
                alert(result.successMsg);
            }
        }
        scope.download = function (id) {
            window.location = "/Handlers/Filemangehandler.ashx?id=" + id + "&method=DownLoad"
        }
        scope.delete = function (id) {
            if (confirm("确定要删除该文件？")) {
                http.post("/Handlers/Filemangehandler.ashx", { id: id, method: "delete" })
            .success(function (data) {
                alert(data.successMsg);
                scope.search();
            })
            }
        }
        //编辑文件
        scope.isEditopen = function (item) {
            scope.isEdit = true;
            scope.temp_item = item;
            scope.sequence = item.sequence;
        }
        scope.isEditclose = function () {
            scope.isEdit = false;
            scope.start = false;
            scope.title = "";
            scope.remark = "";
            str = "";
            $("input:[name='power']").attr("checked", false);
        }
        scope.edit = function () {
            if (scope.title.length < 1) {
                scope.title = scope.temp_item.file_name;
            }
            var str = "";
            $("input:[name='temp_power'][checked]").each(function () {
                str += $(this).val() + ",";
            });
            if (str.length < 1) {
                scope.power = "";
            } else {
                scope.power = str;
            }
            if (scope.remark.length < 1) {
                scope.remark = scope.temp_item.remark;
            }
            http.post("/Handlers/Filemangehandler.ashx", { id: scope.temp_item.id, power: scope.power, title: scope.title, remark: scope.remark, sequence: scope.sequence, method: "edit" })
            .success(function (data) {
                alert(data.successMsg);
                //初始化
                scope.isEdit = false;
                scope.start = false;
                scope.title = "";
                scope.remark = "";
                str = "";
                $("input:[name='temp_power']").attr("checked", false);
            })
            scope.search();
        }
        scope.open = function () {
            scope.isShow = true;
        }
        scope.close = function () {
            scope.isShow = false;
        }
    }])

         //栏目管理
    //.controller("individuationlist", ["$scope", "$http", function (scope, http) {
    //    scope.list = [];

    //    scope.GetIndividuationList = function () {
    //        http.post("/Handlers/Membertoolhandler.ashx", { method: "GetIndividuationList" })
    //        .success(function (data) {
    //            scope.list = data.IndividuationList;
    //        })
    //    }

    //    scope.GetIndividuationList();
    //}])
    //新闻列表
    .controller("articlelist", ["$scope", "$http", function (scope, http) {

        scope.list = [];
        scope.keyWord = "";
        scope.DateRange = "";
        scope.pageSize = 20;
        scope.count = 0;
        scope.Cid = "0";
        scope.falg = "0";

        scope.Individuations = {};

        scope.GetIndividuationList = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetIndividuationList" })
            .success(function (data) {
                for (var i = 0; i < data.IndividuationList.length; i++) {
                    scope.Individuations[data.IndividuationList[i].categoryId] = data.IndividuationList[i].categoryName;
                }
            })
        }

        scope.getlist = function (page) {
            http.post("/Handlers/Membertoolhandler.ashx", { Cid: scope.Cid, falg: scope.falg, createDt: scope.DateRange, keyWord: scope.keyWord, pageIndex: page, pageSize: scope.pageSize, method: "GetArticleList" })
            .success(function (data) {
                scope.list = data.Articlelist;
                scope.count = data.count;
                scope.pager.init(data.count);
            }
        )
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.GetIndividuationList();

        scope.search();

        scope.UpdateArticle = function (articleId, value, type) {
            if (confirm("确认作废？")) {
                http.post("/Handlers/Membertoolhandler.ashx", { articleId: articleId, value: value, type: type, method: "UpdateArticle" })
                .success(function (data) {
                    if (data.success) {
                        alert("更新成功");
                        scope.search();
                    }
                    else {
                        alert("更新失败");
                    }
                })
            }
        }
        scope.UpdateArticleTop = function (articleId) {
            if (confirm("确认置顶？")) {
                http.post("/Handlers/Membertoolhandler.ashx", { articleId: articleId, method: "UpdateArticleOrderNum" })
                .success(function (data) {
                    if (data.success) {
                        alert("置顶成功");
                        scope.search();
                    }
                    else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
    }])
    .controller("articleauditlist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.list = [];
        scope.keyWord = "";
        scope.DateRange = "";
        scope.count = 0;
        scope.isAudit = route.isAudit;

        scope.getlist = function (page) {
            http.post("/Handlers/Membertoolhandler.ashx", { createDt: scope.DateRange, keyWord: scope.keyWord, isAudit: scope.isAudit, method: "GetArticleAuditList" })
            .success(function (data) {
                scope.list = data.auditList;
                scope.count = data.count;
                scope.pager.init(data.count);
            }
        )
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.getlevelId = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetLoginLevel" })
            .success(function (data) {
                scope.levelId = data.levelId;
            })
        }

        scope.getlevelId();

        scope.search();

        scope.isOpen = false;
        scope.AuditType = "-1";
        scope.auditId = "-1";
        scope.open = function (auditId) {
            scope.isOpen = true;
            scope.reason = "";
            scope.auditId = auditId;
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.reason = "";
            scope.AuditType = "-1";
            scope.auditId = "-1";
        }

        scope.submitAudit = function (auditId) {
            if (scope.AuditType == "-1") {
                alert("请输入审核状态");
                return;
            }
            if (scope.AuditType == "0" && scope.reason == "") {
                alert("请输入不通过原因");
                return;
            }
            http.post("/Handlers/Membertoolhandler.ashx", { auditId: scope.auditId, auditType: scope.AuditType, reason: scope.reason, method: "UpdateArticleAduit" })
            .success(function (data) {
                if (data.success) {
                    alert("更新成功");
                    scope.search();
                    scope.close();
                } else {
                    alert(data.errorMsg);
                }
            })
        }
    }])
    //激活码列表
    .controller("activecodelist", ["$scope", "$http", "$routeParams", "Upload", "$compile", function (scope, http, route, Upload, $compile) {
        scope.AgencyId = route.agencyId;
        scope.agencyMobile = "";
        scope.memberMobile = "";
        scope.activecode = "";
        scope.company = "";
        scope.childAgencyId = 0;
        scope.DateRange = "";

        scope.statusId = -1;
        scope.activeCode = "";
        scope.mobilePhone = "";
        //scope.merchantName = "";
        scope.pageSize = 20;
        scope.list = [];

        scope.provinceAreas = {};
        scope.cityAreas = {};
        scope.provinceAreaId = "-1";
        scope.TprovinceAreaId = "-1";
        scope.cityAreaId = "0";
        scope.TcityAreaId = "0";

        scope.Statuss = [{ Id: -1, Name: "使用状态" }, { Id: 1, Name: "未使用" }, { Id: 2, Name: "已使用" }, { Id: 3, Name: "已作废" }];
        scope.areaType = "-1";
        scope.status = "-1";

        scope.getlist = function (page) {
            var params = { DateRange: scope.DateRange, activecode: scope.activecode, company: scope.company, status: scope.status, areaType: scope.areaType, agencyId: scope.AgencyId, agencyMobile: scope.agencyMobile, memberMobile: scope.memberMobile, pageIndex: page, pageSize: scope.pageSize, provinceAreaId: scope.TprovinceAreaId, cityAreaId: scope.TcityAreaId, ep_category_id: scope.EpCategoryId, method: "GetActiveCode"}
            http.post("/Handlers/Membertoolhandler.ashx", params)
            .success(function (data) {
                        scope.ExportHref = '/admin.asmx/ExportActiveCode?searchparams=' +JSON.stringify(params);

                        scope.list = data.ActiveCodelist;
                        scope.count = data.count;
                        scope.levelId = data.levelId;
                        scope.pager.init(data.count);
                        scope.getProvinceArea();
            })
        }
        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.search();


        scope.isShow = false;

        scope.open = function () {
            scope.isShow = true;
            scope.MobilePhone = "";
            scope.Total = "";
            scope.disabled = false;
        }
        scope.close = function () {
            scope.isShow = false;
            scope.MobilePhone = "";
            scope.provinceAreaId = "-1";
            scope.Total = "";
            scope.disabled = false;
        }
        //生成激活码
        scope.addActiveCode = function () {
            if (scope.MobilePhone == "") {
                alert("请输入手机号码");
                return;
            }
            if (scope.cityAreaId == "0" && scope.provinceAreaId != "0" && scope.levelId == -1) {
                alert("请选择城市");
                return;
            }
            if (scope.Total == "") {
                alert("请输入生成数量");
                return;
            }
            if (scope.Total > 200) {
                alert("一次只能生成200个激活码");
                return;
            }

            if (confirm("确认是否生成" + scope.Total + "个激活码？")) {
                scope.disabled = true;
                http.post("/Handlers/Membertoolhandler.ashx", { mobile: scope.MobilePhone, areaId: scope.cityAreaId, total: scope.Total, method: "AddActiveCode" })
                .success(function (data) {
                    if (data.success) {
                        alert("添加成功！");
                        scope.disabled = false;
                        scope.search();
                        scope.close();
                    } else {
                        scope.disabled = false;
                        alert(data.errorMsg);
                    }
                })
            } else {
                scope.disabled = false;
            }
        }

        //获取省
        scope.getProvinceArea = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
            .success(function (data) {
                for (var i = 0; i < data.Arealist.length; i++) {
                    if (data.Arealist[i].areaId == 0) {
                        scope.provinceAreas[data.Arealist[i].areaId] = "全国";
                        continue;
                    }
                    scope.provinceAreas[data.Arealist[i].areaId] = data.Arealist[i].areaName
                }
            })
        }

        //获取城市
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
        scope.getTCityArea = function () {
            if (scope.TprovinceAreaId != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.TprovinceAreaId, method: "GetArea" })
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
            scope.getCityArea();
        }
        //作废激活码
        scope.Tovoid = function (activeCodeId) {
            //作废二次确认
            if (confirm("将从你企业中作废此激活码，并且无法找回，确认要作废该激活码？"))
            http.post("/Handlers/Membertoolhandler.ashx", { activeCodeId: activeCodeId, method: "TovoidCode" })
            .success(function (data) {
                if (data.success) {
                    alert("作废成功");
                    scope.search();
                } else {
                    alert(data.errorMsg);
                }
            })
        }

        scope.isAddOrUpdateEnterpriseUser = false;
        scope.isOpenEnterpriseUser = function (item) {
            scope.isAddOrUpdateEnterpriseUser = true;
            scope.EnterpriseUsermobile = "";
            scope.pwd = "";
            scope.confimpwd = "";
            scope.status = item.status.toString();
            scope.id = item.activeCodeId;
        }
        scope.isCloseEnterpriseUser = function () {
            scope.isAddOrUpdateEnterpriseUser = false;
            scope.EnterpriseUsermobile = "";
            scope.pwd = "";
            scope.confimpwd = "";
        }

        //添加绑定帐号
        scope.EnterpriseUser = function () {
            if (scope.EnterpriseUsermobile == "") {
                alert("请输入手机号码");
                return;
            }
            if (scope.pwd == "") {
                alert("请输入密码");
                return;
            }
            if (scope.pwd != scope.confimpwd) {
                alert("请确认两次输入密码是否一致");
                return;
            }
            var method = scope.status == "0" ? "AddEnterpriseUser" : "UpdateEnterpriseUser";

            http.post("/Handlers/Membertoolhandler.ashx", { activecodeId: scope.id, mobile: scope.EnterpriseUsermobile, pwd: scope.pwd, method: method })
            .success(function (data) {
                if (data.success) {
                    alert("添加账户成功");
                    scope.isCloseEnterpriseUser();
                    scope.search();
                } else {
                    alert(data.errorMsg);
                }
            })
        }
        scope.Unbundling = function (activecodeId) {
            if (activecodeId > 0) {
                if (confirm("是否确认解绑？")) {
                    http.post("/Handlers/Membertoolhandler.ashx", { method: "Unbundling", activecodeId: activecodeId })
                    .success(function (data) {
                        if (data.success) {
                            alert("解绑成功");
                            scope.search();
                        } else {
                            alert(data.errorMsg);
                        }
                    })
                }
            } else {
                return;
            }
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

        //导入企业账户
        scope.isImport = false;
        scope.isOpenImport = function () {
            scope.isImport = true;
            scope.importfile = "";
        }
        scope.closeImport = function () {
            scope.isImport = false;
            scope.importfile = "";
        }
        scope.ImportEnterpriseUser = function (file) {
            if (file == undefined) {
                alert("请选择Execl文件！");
                return;
            }
            if (confirm("是否确认导入？")) {
                file.upload = Upload.upload({
                    url: '/Handlers/Membertoolhandler.ashx',
                    data: {
                        method: "ImportEnterpriseUser", file: file
                    }
                    //url: '/admin.asmx/ImportEnterpriseUser',
                    //data: { file: file, childagencyId: 0 }
                }).success(function (data) {
                    scope.success = data.success;
                    if (data.success) {
                        scope.successMsg = data.successMsg;
                        scope.errorCount = data.errorCount
                        scope.downloadhref = data.downloadhref;
                        //if (data.errorCount > 0) {
                        //    //var newTab = window.open('about:blank');
                        //    if (confirm("导入失败数据已生成，是否下载？")) {
                        //        var a = $("<a href='http://www.baidu.com' target='_blank'>Apple</a>").get(0);
                        //        var e = document.createEvent('MouseEvents');
                        //        e.initEvent('click', true, true);
                        //        a.dispatchEvent(e);
                        //        //parent.location.href = "http://www.baidu.com";
                        //    } else {
                        //        newTab.location.href = "http://www.baidu.com";
                        //    }
                        //}
                    } else {
                        alert(data.errorMsg)
                    }
                })
            }
        }

        //批量添加企业账户
        scope.isAddUsers = false;
        scope.openAddUsers = function () {
            scope.isAddUsers = true;
            angular.element(".add").detach();
        }
        scope.closeAddUsers = function () {
            scope.isAddUsers = false;
            angular.element(".add").detach();
        }
        //批量添加企业版用户
        scope.AddCell = function () {
            var code = angular.element("#test")[0].rows.length;

            //$compile(template)(scope);
            var template = "<tr class=\"add\"><td><input type=\"text\"  placeholder=\"输入手机号码\" id=\"mobile" + code + "\"  /></td><td><input type=\"text\" placeholder=\"输入姓名\" id=\"name" + code + "\" /></td></tr>";
            angular.element("#test").append(template);
        }
        scope.SavaEnterpriseUsers = function () {
            var json = "[";
            var table = angular.element("#test")[0];
            for (var i = 1; i < table.rows.length; i++) {
                if (i > 1) {
                    json += ",";
                }
                json += "{\"mobile\":\"" + angular.element("#mobile" + i).val() + "\",\"name\":\"" + angular.element("#name" + i).val() + "\"}"
            }
            json += "]";

            if (confirm("是否确认提交？")) {
                http.post("/Handlers/Membertoolhandler.ashx", { method: "SavaEnterpriseUsers", json: json })
                .success(function (data) {
                    scope.success = data.success;
                    if (data.success) {
                        angular.element(".add").detach();
                        scope.successMsg = data.successMsg;
                        scope.errormobiles = data.errormobiles
                    } else {
                        alert(data.errorMsg)
                    }
                })
            }
        }

        ////导出激活码
        //scope.ExportExcel = function () {
        //    var activecodeSearch = localStorage.getItem('activecodeSearch');
        //    if (activecodeSearch != undefined && activecodeSearch != null) {
        //        http.get('/admin.asmx/ExportActiveCode', { searchparams: activecodeSearch })
        //        .success(function (data) {

        //        })
        //    }
        //}
    }])
    //广告列表
    .controller("advertlist", ["$scope", "$http", "$routeParams", "releaseServiceAdvertValue", function (scope, http, route, releaseServiceAdvertValue) {
        scope.list = [];
        scope.DateRange = "";
        scope.pageSize = 20;
        scope.count = 0;
        scope.ddlCategorys = {};
        scope.ddlProvinces = {};
        scope.ddlCitys = {};
        scope.isAudit = route.isAudit;

        //var advertSearch = service.Get('advertSearch');
        var advertSearch = localStorage.getItem('advertSearch');
        if (advertSearch != undefined && advertSearch != null) {
            advertSearch = JSON.parse(advertSearch);

            scope.keyWord = advertSearch.keyWord;
            scope.ddlCategory = advertSearch.ddlCategory;
            scope.costType = advertSearch.costType;
            scope.SearchadvertType = advertSearch.advertType;
            scope.statu = advertSearch.statu;
            scope.ddlProvince = advertSearch.ddlProvince;
            scope.ddlCity = advertSearch.ddlCity;
        } else {
            scope.keyWord = "";
            scope.costType = "-1";
            scope.SearchadvertType = "-1";
            scope.ddlCategory = "-2";
            scope.ddlProvince = "-1";
            scope.ddlCity = "-1";
            scope.statu = 2;
        }
        localStorage.removeItem('advertSearch');

        scope.GetCategroy = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetCategroy" })
            .success(function (data) {
                for (var i = 0; i < data.clist.length; i++) {
                    scope.ddlCategorys[data.clist[i].cid] = data.clist[i].cname;
                }
            })
        }
        scope.GetCategroy();
        //获取省份
        scope.ddlCategoryChange = function () {
            scope.ddlProvince = "-1";
            if (scope.ddlCategory == 999) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
                .success(function (data) {
                    for (var i = 0; i < data.Arealist.length; i++) {
                        if (data.Arealist[i].areaId == 0) {
                            //scope.provinceAreas[data.Arealist[i].areaId] = "全国";
                            continue;
                        }
                        scope.ddlProvinces[data.Arealist[i].areaId] = data.Arealist[i].areaName
                    }
                })
            }
        }
        //获取城市
        scope.ddlProvinceChange = function () {
            scope.ddlCitys = {
            };
            scope.ddlCity = "-1";
            if (scope.ddlProvince != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.ddlProvince, method: "GetArea" })
                .success(function (data) {
                    for (var i = 0; i < data.Arealist.length; i++) {
                        scope.ddlCitys[data.Arealist[i].category_id] = data.Arealist[i].areaName
                    }
                })
            }
        }

        scope.Types = [{ Id: 1, Name: "开屏" }, { Id: 2, Name: "Banner" }, { Id: 3, Name: "信息流" }];
        //列表审核状态
        scope.States = [{ Id: -1, Name: "请选择状态" }, { Id: 0, Name: "待审核" }, { Id: 1, Name: "被拒绝" }, { Id: 2, Name: "正在投放" }, { Id: 3, Name: "暂停投放" }, { Id: 4, Name: "结束投放" }];
        //筛选审核状态
        scope.SeachStates = [{ Id: -1, Name: "请选择状态" }, { Id: 2, Name: "正在投放" }, { Id: 3, Name: "暂停投放" }, { Id: 4, Name: "结束投放" }];
        scope.type = function (id) {
            return scope.Types.where(function (o) {
                return o.Id == id
            })[0].Name;
        }
        scope.state = function (id) {
            return scope.States.where(function (o) { return o.Id == id })[0].Name
        }
        scope.balance = "";
        scope.getlist = function (page) {
            var params = {
                isAudit: scope.isAudit, createDt: scope.DateRange, keyWord: scope.keyWord, pageIndex: page, pageSize: scope.pageSize, statu: scope.statu, category_id: scope.ddlCategory != 999 ? scope.ddlCategory : scope.ddlCity, costType: scope.costType, advertType: scope.SearchadvertType, method: "GetAdvertList"
            };
            http.post("/Handlers/Adverthandler.ashx", params)
              .success(function (data) {
                  params['ddlProvince'] = scope.ddlProvince;
                  params['ddlCategory'] = scope.ddlCategory;
                  params['ddlCity'] = scope.ddlCity;
                  //service.Set('advertSearch', params);
                  localStorage.setItem('advertSearch', JSON.stringify(params));
                  scope.balance = data.balance;
                  scope.list = data.Advertlist;
                  scope.count = data.count;
                  scope.pager.init(data.count);
              }
            )
        }

        scope.getlevelId = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetLoginLevel" })
            .success(function (data) {
                scope.levelId = data.levelId;
            })
        }

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.search();

        scope.getlevelId();

        //跳转广告详情
        scope.ToDetail = function (advertId) {
            window.location.href = "/Advert/Index.aspx#/advertdetail/" + advertId;
        }

        //审核广告
        scope.AuditType = "-1";
        scope.isShow = false;
        scope.open = function (item) {
            scope.isShow = true;
            scope.AuditType = "-1";
            scope.reason = "";
            scope.advertId = item.advertId;
            scope.title = item.title;
            scope.categoryName = item.categoryName;
            scope.daymoney = item.daymoney;
            scope.money = item.money;
            scope.url = item.advert_url;
            scope.advertType = item.advertType;
            scope.advertTypeId = item.advertTypeId;
            scope.advert_pic = item.advert_pic;
            //if (item.advertType == 3 && item.advert_stream_style != 3) {
            //    scope.advert_pic = item.advert_pic[0];
            //} else if (item.advertType == 3 && item.advert_stream_style == 3) {
            //    for (var i = 0; i < item.advert_pic.length; i++) {
            //        scope.advert_pic = item.advert_pic[0];
            //    }
            //}
        }
        scope.close = function () {
            scope.AuditType = "-1";
            scope.reason = "";
            scope.advertId = 0;
            scope.title = "";
            scope.categoryName = "";
            scope.daymoney = "";
            scope.money = "";
            scope.url = "";
            scope.advert_pic = "";
            scope.advertTypeId = "";
            scope.advertType = "";
            scope.isShow = false;
        }

        scope.AuditAdvert = function () {
            if (scope.AuditType == "-1") {
                alert("请选择审核状态！");
                return;
            }
            if (confirm("是否确认提交？")) {
                http.post("/Handlers/Adverthandler.ashx", { advertId: scope.advertId, auditType: scope.AuditType, reason: scope.reason, method: "AuditAdvert" })
                .success(function (data) {
                    if (data.success) {
                        alert("审核成功");
                        scope.close();
                        scope.search();
                    } else {
                        alert("审核失败");
                    }
                })
            }
        }

        //编辑广告
        scope.EditAdvert = function (item) {
            //releaseServiceAdvertValue.SetAdvert(item);
            window.location.href = "/Advert/Index.aspx#/editadvert/" + item.advertId;
        }

        scope.updateState = function (advert_id, state) {
            if (confirm(state == 4 ? "是否确认结束投放？" : state == 3 ? "是否暂停投放？" : state == 2 ? "是否继续投放？" : "")) {
                http.post("/Handlers/Adverthandler.ashx", { method: "UpdateState", advert_id: advert_id, state: state })
                .success(function (data) {
                    if (data.success) {
                        alert("更新成功");
                        scope.search();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
    }])
    //添加广告
    .controller("addadvert", ["$scope", "$http", "Upload", function (scope, http, Upload) {

        scope.empty = function () {
            scope.txtTitle = "";
            scope.advertType = "-1";
            scope.advertStreamStyle = "-1";
            scope.txtUrl = "";
            scope.file = ""; scope.imgpath = "";
            scope.file1 = ""; scope.imgpath1 = "";
            scope.file2 = ""; scope.imgpath2 = "";
            scope.file3 = ""; scope.imgpath3 = "";
            //多选类别json
            scope.categroysJson = [];
            scope.ddlCategory = "-2";
            scope.ddlProvince = "-1";
            scope.ddlCity = "-1";
            scope.ddlCostType = "-1";
            scope.ddlTimeType = "-1";
            scope.txtMoney = "";
            scope.txtDayMoney = "";
            scope.dateStart = "";
            scope.dateEnd = "";
            scope.addvertchannel = "0";
            scope.is_download = false;
            scope.errorFile = null;
        }

        scope.ddlCategorys = {};
        scope.ddlProvinces = {};
        scope.ddlCitys = {};

        scope.GetCategroy = function () {
            http.post("/Handlers/Membertoolhandler.ashx", { method: "GetCategroy" })
            .success(function (data) {
                for (var i = 0; i < data.clist.length; i++) {
                    scope.ddlCategorys[data.clist[i].cid] = data.clist[i].cname;
                }
            })
        }

        scope.empty();
        scope.GetCategroy();
        scope.txtDays = 0;
        scope.saveAdvert = function () {
            if (scope.txtTitle == "") {
                alert("请输入推广标题");
                return;
            }
            if (scope.advertType == "-1") {
                alert("请选择推广类型");
                return;
            }
            if (scope.advertStreamStyle == "-1" && scope.advertType == "3") {
                alert("请选择信息流推广样式");
                return;
            }
            if (scope.advertStreamStyle != 3) {
                if (scope.imgpath == "" && scope.imgpath == undefined) {
                    alert("请选择图片");
                    return;
                }
            } else {
                if ((scope.imgpath1 == "" && scope.imgpath1 == undefined) || (scope.imgpath2 == "" && scope.imgpath2 == undefined) || (scope.imgpath3 == "" && scope.imgpath3 == undefined)) {
                    alert("请选择图片");
                    return;
                }
            }
            if (scope.txtUrl == "") {
                alert("请输入推广链接");
                return;
            }
            if (scope.ddlCostType == "-1") {
                alert("请选择请选择计费方式");
                return;
            }
            if (scope.advertType == "2" || scope.advertType == "3") {
                if (scope.ddlCategory == -2) {
                    alert("请选择投放栏目");
                    return;
                }
            }
            if (scope.ddlCity == "-1" && scope.ddlCategory == 999) {
                alert("请选择城市栏目");
                return;
            }
            if (scope.addvertchannel == "-1" && scope.advertType == 3) {
                alert("请选择投放范围");
                return;
            }
            //if (scope.ddlTimeType == "-1") {
            //    alert("请选择投放时间");
            //    return;
            //}
            //if (scope.ddlTimeType == "2" && (scope.dateStart == "" || scope.dateEnd == "")) {
            //    alert("请输入投放时间");
            //    return;
            //}

            //  CPD
            if (scope.ddlCostType=="3") {
                if (scope.dateStart == "" ) {
                    alert("请选择投放时间");
                    return;
                }
                if (scope.txtDays == 0) {
                    alert("请选择投放时长");
                    return;
                }
                scope.txtDayMoney = (scope.advertType == 1 ? "2" : "1") * 10000;
                scope.txtMoney = scope.txtDays * scope.txtDayMoney;
            } else {
                if (scope.txtMoney == "" || scope.txtDayMoney == "") {
                    alert("请输入推广预算");
                    return;
                }
            }
            if (scope.advertType == 1) {
                scope.ddlCategory = "0";
            }
            if (confirm("请确认是否提交审核？")) {

                var parame = {
                    method: "AddAdvert", txtTitle: scope.txtTitle, advertType: scope.advertType, advertStreamStyle: scope.advertStreamStyle, txtUrl: scope.txtUrl, ddlCategory: scope.ddlCategory == 999 ? scope.ddlCity : scope.ddlCategory, ddlCostType: scope.ddlCostType, ddlTimeType: scope.ddlTimeType, ddlchannel: scope.addvertchannel, txtMoney: scope.txtMoney, txtDayMoney: scope.txtDayMoney, dateStart: scope.dateStart, dateEnd: scope.dateEnd,txtDays: scope.txtDays
                }//CategoryJson: JSON.stringify(scope.categroysJson)

                if (scope.advertStreamStyle != 3) {
                    parame["file"] = scope.imgpath;
                } else {
                    parame["file1"] = scope.imgpath1;
                    parame["file2"] = scope.imgpath2;
                    parame["file3"] = scope.imgpath3;
                }

                http.post("/Handlers/Adverthandler.ashx", parame)
                .success(function (data) {
                    if (data.success) {
                        alert("提交成功");
                        scope.empty();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        //上传图片
        scope.uploadImg = function (file, filetype) {
            if (file != undefined) {
                if (scope.errorFile != null) {
                    if (scope.errorFile.$error == "maxSize") {
                        alert("图片大小不能超过2MB");
                        return;
                    }
                }
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
                            scope.imgpath1 = data.imgpath;
                            return;
                        case 2:
                            scope.imgpath2 = data.imgpath;
                            return;
                        case 3:
                            scope.imgpath3 = data.imgpath;
                            return;
                        default:
                            scope.imgpath = data.imgpath;
                            return;
                    }
                })
            }
        }

        //清理图片
        scope.clearImg = function (imgtype) {
            switch (imgtype) {
                case 0:
                    scope.imgpath = "";
                    scope.file = "";
                    return;
                case 1:
                    scope.imgpath1 = "";
                    scope.file1 = "";
                    return;
                case 2:
                    scope.imgpath2 = "";
                    scope.file2 = "";
                    return;
                case 3:
                    scope.imgpath3 = "";
                    scope.file3 = "";
                    return;
                default:
                    scope.imgpath = "";
                    scope.file3 = "";
                    return;
            }
        }

        //获取类别
        scope.ddlCategoryChange = function () {
            scope.ddlProvince = "-1";
            if (scope.ddlCategory == 999) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: 0, method: "GetArea" })
                .success(function (data) {
                    for (var i = 0; i < data.Arealist.length; i++) {
                        if (data.Arealist[i].areaId == 0) {
                            //scope.provinceAreas[data.Arealist[i].areaId] = "全国";
                            continue;
                        }
                        scope.ddlProvinces[data.Arealist[i].areaId] = data.Arealist[i].areaName
                    }
                })
            }
            //else if (scope.ddlCategory != -2) {
            //    var cjson = "";
            //    if (scope.ddlCategory == 0) {
            //        cjson = "{\"cid\":\"0\",\"cname\":\"热点\"}";
            //    } else if (scope.ddlCategory == -1) {
            //        cjson = "{\"cid\":\"-1\",\"cname\":\"全国城市\"}";
            //    } else {
            //        cjson = "{\"cid\":\"" + scope.ddlCategory + "\",\"cname\":\"" + scope.ddlCategorys[scope.ddlCategory] + "\"}";
            //    }
            //    cjson = JSON.parse(cjson);
            //    if (!scope.JudgeContain(cjson.cid)) {
            //        scope.categroysJson.push(cjson);
            //    }
            //}
        }
        //获取省份
        scope.ddlProvinceChange = function () {
            scope.ddlCitys = {
            };
            scope.ddlCity = "-1";
            if (scope.ddlProvince != -1) {
                http.post("/Handlers/Membertoolhandler.ashx", { parentId: scope.ddlProvince, method: "GetArea" })
                .success(function (data) {
                    for (var i = 0; i < data.Arealist.length; i++) {
                        scope.ddlCitys[data.Arealist[i].category_id] = data.Arealist[i].areaName
                    }
                })
            }
        }
        //获取城市
        scope.ddlCityChange = function () {
            //if (scope.ddlCity != -1) {
            //    var cjson = "{\"cid\":\"" + scope.ddlCity + "\",\"cname\":\"" + scope.ddlCitys[scope.ddlCity] + "\"}";
            //    cjson = JSON.parse(cjson);
            //    if (!scope.JudgeContain(cjson.cid)) {
            //        scope.categroysJson.push(cjson);
            //    }
            //}
        }
        //判断类别json里是否存在该类别
        scope.JudgeContain = function (cid) {
            for (var i = 0; i < scope.categroysJson.length; i++) {
                if (scope.categroysJson[i].cid == cid) {
                    return true;
                }
            }
            return false;
        }
        scope.is_downloadChange = function () {
            scope.is_download = !scope.is_download;
        }

        //scope.categroys = [];
        //scope.AddMultiselect = function (key, value) {
        //    debugger;
        //    var cjson = "{\"cid\":\"" + key + "\",\"cname\":\"" + value + "\"}";
        //    scope.categroys.push(JSON.parse(cjson));
        //    console.log(scope.categroys);
        //}

        //删除选择的分类
        scope.deleteCategroy = function (i) {
            scope.categroysJson.splice(i, 1);
        }
    }])

    .controller("editadvert", ["$scope", "$http", "Upload", "releaseServiceAdvertValue", "$routeParams", function (scope, http, Upload, releaseServiceAdvertValue, route) {
        //scope.advert = releaseServiceAdvertValue.GetAdvert();

        var advert_id = route.advertId;
        scope.Edit = function (advert_id) {

            http.post("/Handlers/Adverthandler.ashx", { method: "GetAdvertModel", advert_id: advert_id })
            .success(function (data) {
                var model = JSON.parse(data.advert_model);
                scope.txtTitle = model.advert_title;
                scope.advertType = model.advert_type.toString();
                scope.advertStreamStyle = model.advert_stream_style.toString() == "0" ? "-1" : model.advert_stream_style.toString();
                scope.txtUrl = model.advert_url;
                scope.file = "";
                scope.file1 = "";
                scope.file2 = "";
                scope.file3 = "";
                scope.txtMoney = model.advert_money;
                scope.txtDayMoney = model.advert_day_money;
                scope.advert_pic = model.advert_pic;
                scope.advertId = advert_id;
            })
        }

        scope.Edit(advert_id);

        scope.emptyImg = false;
        scope.updateemptyImg = function () {
            scope.emptyImg = true;
            scope.advert_pic = "";
        }

        scope.saveAdvert = function () {
            if (scope.txtTitle == "") {
                alert("请输入推广标题");
                return;
            }
            if (scope.advertType == "-1") {
                alert("请选择推广类型");
                return;
            }
            if (scope.advertStreamStyle == "-1" && scope.advertType == "3") {
                alert("请选择信息流推广样式");
                return;
            }
            if (scope.txtUrl == "") {
                alert("请输入推广链接");
                return;
            }
            if (scope.txtMoney == "" || scope.txtDayMoney == "") {
                alert("请输入推广预算");
                return;
            }
            if (confirm("请确认是否提交审核？")) {

                var parame = {
                    method: "EditAdvert", advertId: scope.advertId, txtTitle: scope.txtTitle, advertType: scope.advertType, advertStreamStyle: scope.advertStreamStyle, txtUrl: scope.txtUrl, txtMoney: scope.txtMoney, txtDayMoney: scope.txtDayMoney
                }
                if (scope.advertStreamStyle != "3") {
                    parame["file"] = scope.imgpath;
                } else {
                    parame["file1"] = scope.imgpath1;
                    parame["file2"] = scope.imgpath2;
                    parame["file3"] = scope.imgpath3;
                }
                http.post("/Handlers/Adverthandler.ashx", parame)
                .success(function (data) {
                    if (data.success) {
                        alert("提交成功");
                        window.location.href = "/Advert/Index.aspx#/advertlist/0";
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
        //上传图片
        scope.uploadImg = function (file, filetype) {
            if (file != undefined) {
                if (scope.errorFile != null) {
                    if (scope.errorFile.$error == "maxSize") {
                        alert("图片大小不能超过2MB");
                        return;
                    }
                }
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
                            scope.imgpath1 = data.imgpath;
                            return;
                        case 2:
                            scope.imgpath2 = data.imgpath;
                            return;
                        case 3:
                            scope.imgpath3 = data.imgpath;
                            return;
                        default:
                            scope.imgpath = data.imgpath;
                            return;
                    }
                })
            }
        }
        //清理图片
        scope.clearImg = function (imgtype) {
            switch (imgtype) {
                case 0:
                    scope.imgpath = "";
                    scope.file = "";
                    return;
                case 1:
                    scope.imgpath1 = "";
                    scope.file1 = "";
                    return;
                case 2:
                    scope.imgpath2 = "";
                    scope.file2 = "";
                    return;
                case 3:
                    scope.imgpath3 = "";
                    scope.file3 = "";
                    return;
                default:
                    scope.imgpath = "";
                    scope.file3 = "";
                    return;
            }
        }
    }])
    //广告详情
    .controller("advertdetail", ["$scope", "$http", "$routeParams", function (scope, http, route) {

        var pageload = {};
        var firstPaint = {};

        scope.Types = [{ Id: 1, Name: "开屏" }, { Id: 2, Name: "Banner" }, { Id: 3, Name: "信息流" }];
        scope.States = [{ Id: 0, Name: "待审核" }, { Id: 1, Name: "被拒绝" }, { Id: 2, Name: "正在投放" }, { Id: 3, Name: "暂停投放" }, { Id: 4, Name: "结束投放" }];

        scope.type = function (id) {
            return scope.Types.where(function (o) {
                return o.Id == id
            })[0].Name;
        }
        scope.state = function (id) {
            return scope.States.where(function (o) { return o.Id == id })[0].Name
        }

        //scope.DateRange = new Date().toDateString();

        scope.GetCostType = function () {
            http.post("/Handlers/Adverthandler.ashx", { advertId: route.advertId, method: "GetCostType" })
            .success(function (data) {
                scope.costType = data.costType.toString();
                scope.GetAdvertDetail('month');
            })
        }

        scope.GetCostType();

        scope.costTypeChange = function () {
            scope.GetAdvertDetail(scope.screenType);
        }

        scope.dateRange = "";
        scope.screenType = "month";
        scope.GetAdvertDetail = function (screenType) {
            if (scope.costType == 1) {
                http.post("/Handlers/Adverthandler.ashx", { advertId: route.advertId, costType: "CPM", dateRange: scope.dateRange, screenType: screenType, method: "GetAdvertDetail" })
                .success(function (data) {
                    scope.success = true;
                    pageload["name"] = "PV",
                    pageload["datapoints"] = data.cpmlist;
                    scope.list = data.cpmlist;
                    if (data.costType == 1) {
                        scope.single = false;
                        scope.double = true;
                        firstPaint["name"] = "花费（元）",
                        firstPaint["datapoints"] = data.pricelist;
                        scope.multiple = [pageload, firstPaint];
                        for (var i = 0; i < scope.list.length; i++) {
                            scope.list[i]["price"] = data.pricelist[i]["y"];
                        }
                    }
                    else {
                        scope.double = false;
                        scope.single = true;
                        scope.single = [pageload];
                    }
                    scope.title = data.adverttitle;
                    scope.categoryname = data.categoryname;
                    scope.adverttype = data.adverttype;
                    scope.advertmoneycpm = data.advertmoneycpm;
                    scope.advertmoneycpc = data.advertmoneycpc;
                    scope.advertstate = data.advertstate;
                })
            }
            else {
                http.post("/Handlers/Adverthandler.ashx", { advertId: route.advertId, screenType: screenType, costType: "CPC", dateRange: scope.dateRange, method: "GetAdvertDetail" })
                .success(function (data) {
                    scope.success = true;
                    pageload["name"] = "点击量",
                    pageload["datapoints"] = data.cpclist;
                    scope.list = data.cpclist;
                    if (data.costType == 2) {
                        scope.single = false;
                        scope.double = true;
                        firstPaint["name"] = "花费（元）",
                        firstPaint["datapoints"] = data.pricelist;
                        scope.multiple = [pageload, firstPaint];
                        for (var i = 0; i < scope.list.count; i++) {
                            scope.list[i]["price"] = data.pricelist[i]["y"];
                        }
                    }
                    else {
                        scope.double = false;
                        scope.single = true;
                        scope.single = [pageload];
                    }
                    scope.title = data.adverttitle;
                    scope.categoryname = data.categoryname;
                    scope.adverttype = data.adverttype;
                    scope.advertmoneycpm = data.advertmoneycpm;
                    scope.advertmoneycpc = data.advertmoneycpc;
                    scope.advertstate = data.advertstate;
                    scope.advert_time_end = data.advert_time_end;
                    scope.advert_time_start = data.advert_time_start;
                })
            }
            scope.config = {
                title: '推广流水统计',
                debug: true,
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
            };
        }

        scope.Export = function () {

        }
    }])
    //app版本
    .controller("appversionlist", ["$scope", "$http", function (scope, http) {
        scope.list = [];
        scope.appUrl = "";
        scope.version = "";
        scope.pageSize = 20;
        scope.count = 0;

        scope.appType = -1;
        scope.isNeedUpgrad = 0;
        scope.isForced = 0;
        scope.appTypes = [{ Id: -1, Name: "请选择" }, { Id: 1, Name: "IOS" }, { Id: 2, Name: "Android" }];

        scope.isNeedUpgrads = [{ Id: 0, Name: "不需要" }, { Id: 1, Name: "需要" }];

        scope.isForceds = [{ Id: 0, Name: "不强制" }, { Id: 1, Name: "强制" }];

        scope.apptype = function (id) {
            return scope.appTypes.where(function (o) {
                return o.Id == id
            })[0].Name;
        }
        scope.needUpgrad = function (id) {
            return scope.isNeedUpgrads.where(function (o) { return o.Id == id })[0].Name
        }
        scope.forced = function (id) {
            return scope.isForceds.where(function (o) { return o.Id == id })[0].Name
        }

        scope.getlist = function (page) {
            http.post("/Handlers/Sysconfighandler.ashx", { pageIndex: page, pageSize: scope.pageSize, method: "Getapplist" })
            .success(function (data) {
                scope.list = data.applist;
                scope.count = data.count;
                scope.pager.init(data.count);
            }
        )
        }

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.search();

        scope.isOpen = false;
        scope.open = function () {
            scope.isOpen = true;
            scope.appId = 0;
            scope.appType = -1;
            scope.isNeedUpgrad = 0;
            scope.isForced = 0;
            scope.Url = "";
            scope.version = "";
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.appType = -1;
            scope.isNeedUpgrad = 0;
            scope.isForced = 0;
            scope.Url = "";
            scope.version = "";
        }
        scope.edit = function (item) {
            scope.isOpen = true;
            scope.appId = item.appId;
            scope.appType = item.appType;
            scope.isNeedUpgrad = item.isneedupgrad;
            scope.isForced = item.isforced;
            scope.Url = item.url;
            scope.version = item.version;
        }

        scope.AddOrUpdateVersion = function () {
            if (scope.appType == -1) {
                alert("请选择App类型");
                return;
            }
            if (scope.version == "") {
                alert("请输入版本号");
                return;
            }
            if (scope.Url == "") {
                alert("请输入下载链接");
                return;
            }
            http.post("/Handlers/Sysconfighandler.ashx", { appId: scope.appId, appType: scope.appType, version: scope.version, url: scope.Url, isneedupgrad: scope.isNeedUpgrad, isforced: scope.isForced, method: "UpdateOrAddAppversion" })
            .success(function (data) {
                if (data.success) {
                    alert("更新版本成功");
                    scope.close();
                    scope.search();
                }
                else {
                    alert("更新版本失败");
                }
            })
        }
    }])
    //推送列表
    .controller("pushlist", ["$scope", "$http", function (scope, http) {
        scope.list = [];
        scope.pageSize = 20;

        scope.pushMemberTypes = [{ Id: 0, Name: "单个用户" }, { Id: 1, Name: "All" }, { Id: 2, Name: "IOS" }, { Id: 3, Name: "Android" }];
        scope.pushTypes = [{ Id: -1, Name: "请选择推送类型" }, { Id: 0, Name: "文章" }, { Id: 1, Name: "通知" }];
        scope.statuss = [{ Id: 0, Name: "未推送" }, { Id: 1, Name: "已推送" }, { Id: 2, Name: "推送失败" }];

        scope.memberlist = function (id) {
            return scope.pushMemberTypes.where(function (o) { return o.Id == id })[0].Name
        };
        scope.type = function (id) {
            return scope.pushTypes.where(function (o) { return o.Id == id })[0].Name
        };
        scope.status = function (id) {
            return scope.statuss.where(function (o) { return o.Id == id })[0].Name
        };

        scope.getlist = function (page) {
            http.post("/admin.asmx/Getpushlist", { pageIndex: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.pushlist;
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

        scope.isOpen = false;
        scope.open = function () {
            scope.isOpen = true;
            scope.pushMemberType = 1;
            scope.pushType = -1;
            scope.Title = "";
            scope.Content = "";
            scope.mobile = "";
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.pushMemberType = 1;
            scope.pushType = -1;
            scope.Title = "";
            scope.Content = "";
            scope.mobile = "";
        }
        scope.openEdit = function (item) {
            scope.isOpen = true;
            scope.pushMemberType = item.pushMemberType;
            scope.pushType = item.pushType;
            scope.Title = item.title;
            scope.Content = item.content;
            scope.mobile = item.mobile;
        }

        //添加推送
        scope.AddPush = function () {
            if (scope.pushType == -1) {
                alert("请选择推送类型");
                return;
            }
            if (scope.pushMemberType == 0 && scope.mobile == "") {
                alert("请输入手机号码");
                return;
            }
            if (scope.Title == "" || scope.Content == "") {
                alert("请输入标题或内容");
                return;
            }
            http.post("/admin.asmx/AddPush", { pushType: scope.pushType, pushMemberType: scope.pushMemberType, mobile: scope.mobile, title: scope.Title, content: scope.Content })
            .success(function (data) {
                if (data.success) {
                    alert("添加成功");
                    scope.close();
                    scope.search();
                }
                else {
                    alert(data.errorMsg);
                }
            })
        }
        //删除推送
        scope.DeletePush = function (pushId) {
            if (confirm("此删除无法恢复，请确认是否删除？")) {
                http.post("/admin.asmx/DeletePush", { pushId: pushId })
                .success(function (data) {
                    if (data.success) {
                        alert("删除成功");
                        scope.search();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
        //再次推送
        scope.AgainPush = function (push_id) {
            if (confirm("是否确认再次推送？")) {
                http.post("/admin.asmx/AgainPush", { push_id: push_id })
                .success(function (data) {
                    if (data.success) {
                        alert("再次推送成功");
                        scope.search();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
    }])
    //站内信（App）
    .controller("messagelist", ["$scope", "$http", function (scope, http) {
        scope.list = [];
        scope.pageSize = 20;

        scope.deviceTypes = [{ Id: 0, Name: "全部" }, { Id: 1, Name: "IOS" }, { Id: 2, Name: "Android" }];
        scope.receiveTypes = [{ Id: 1, Name: "单个用户" }, { Id: 0, Name: "全部" }];
        scope.deviceType = function (id) {
            return scope.deviceTypes.where(function (o) { return o.Id == id })[0].Name
        }

        scope.getlist = function (page) {
            http.post("/Handlers/Sysconfighandler.ashx", { pageIndex: page, pageSize: scope.pageSize, method: "GetMessagelist" })
            .success(function (data) {
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

        scope.search();

        scope.isOpen = false;
        scope.open = function () {
            scope.isOpen = true;
            scope.receiveType = 0;
            scope.deviceType = 0;
            scope.Title = "";
            scope.Content = "";
            scope.mobile = "";
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.receiveType = 0;
            scope.deviceType = 0;
            scope.Title = "";
            scope.Content = "";
            scope.mobile = "";
        }

        scope.AddMessage = function () {
            if (confirm("是否确认添加消息？")) {
                http.post("/Handlers/Sysconfighandler.ashx", { title: scope.Title, content: scope.Content, mobile: scope.mobile, receiveType: scope.receiveType, deviceType: scope.deviceType, method: AddMessage })
                .success(function (data) {
                    if (data.success) {
                        alert("添加成功");
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
    }])
    //举报管理
    .controller("reportlist", ["$scope", "$http", function (scope, http) {
        scope.list = [];
        scope.pageSize = 20;

        scope.getlist = function (page) {
            http.post("/Handlers/Sysconfighandler.ashx", { pageIndex: page, pageSize: scope.pageSize, method: "ReportList" })
            .success(function (data) {
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

        scope.search();

        scope.status = [{ Id: -1, Name: "请选择处理结果" }, { Id: 1, Name: "删除文章" }, { Id: 2, Name: "忽略" }];

        scope.isReport = false;
        scope.openReport = function (report_id) {
            scope.report_id = report_id;
            scope.isReport = true;
            scope.statu = -1;
        }
        scope.closeReport = function () {
            scope.report_id = 0;
            scope.isReport = false;
            scope.statu = -1;
        }
        scope.SubmitReport = function () {
            if (scope.report_id == 0) {
                return;
            }
            if (scope.statu == "-1") {
                alert("请选择处理状态");
                return;
            }
            if (confirm("是否确认提交举报结果？")) {
                http.post("/Handlers/Sysconfighandler.ashx", { report_id: scope.report_id, statu: scope.statu, method: "UpdateReportStatu" })
                .success(function (data) {
                    if (data.success) {
                        alert("提交成功");
                        scope.closeReport();
                        scope.search();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
    }])
    //修改密码
    .controller("changepwd", ["$scope", "$http", function (scope, http) {
        scope.OldPwd = "";
        scope.NewPwd = "";
        scope.ConfirmNewPwd = "";

        scope.changepwd = function () {
            if (scope.OldPwd == "") {
                alert("请输入旧密码");
                return;
            }
            if (scope.NewPwd == "") {
                alert("请输入新密码");
                return;
            }
            if (scope.NewPwd != scope.ConfirmNewPwd) {
                alert("请确认两次输入密码是否一致");
                return;
            }
            http.post("/Handlers/Sysconfighandler.ashx", { oldpwd: scope.OldPwd, newpwd: scope.NewPwd, method: "changepwd" })
            .success(function (data) {
                if (data.success) {
                    alert("更新成功");
                    scope.OldPwd = "";
                    scope.NewPwd = "";
                    scope.ConfirmNewPwd = "";
                } else {
                    alert(data.errorMsg);
                }
            })
        }
    }])
    //通用素材类别
    .controller("MaterialCategory", ["$scope", "$http", function (scope, http) {
        scope.list = [];

        scope.getlist = function () {
            http.post("/Handlers/Sysconfighandler.ashx", { method: "GetMaterialCategorylist" })
            .success(function (data) {
                scope.list = data.list;
            })
        }

        scope.getlist();

        scope.isOpen = false;
        scope.open = function () {
            scope.isOpen = true;
            scope.category_name = "";
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.category_name = "";
        }

        scope.AddCategory = function () {
            if (scope.category_name == "") {
                alert("请输入类别名称！");
                return;
            }
            http.post("/Handlers/Sysconfighandler.ashx", { method: "AddMaterialCategory", category_name: scope.category_name })
            .success(function (data) {
                if (data.success) {
                    alert("添加成功");
                    scope.getlist();
                    scope.close();
                } else {
                    alert(data.errorMsg);
                }
            })
        }

        scope.delete = function (cid) {
            if (confirm("删除无法恢复，是否确定？")) {
                http.post("/admin.asmx/DeletePubMaterialCategory", {
                    cid: cid
                })
            }
        }
    }])
    .controller("Material", ["$scope", "$http", "Upload", function (scope, http, Upload) {
        scope.list = [];
        scope.category_id = "-1";

        scope.getlist = function () {
            http.post("/Handlers/Sysconfighandler.ashx", { method: "GetMateriallist", category_id: scope.category_id })
            .success(function (data) {
                scope.list = data.list;
            })
        }

        scope.categoryIds = {
        };

        scope.GetMaterialCategroy = function () {
            http.post("/Handlers/Sysconfighandler.ashx", { method: "GetMaterialCategorylist" })
            .success(function (data) {
                scope.categoryIds = {
                };
                for (var i = 0; i < data.list.length; i++) {
                    scope.categoryIds[data.list[i].category_id] = data.list[i].category_name;
                }
            })
        }
        //加载类别
        scope.GetMaterialCategroy();
        scope.getlist();

        scope.DeleteMaterial = function (materialId) {
            if (confirm("删除无法恢复，确认删除？")) {
                http.post("/Handlers/Sysconfighandler.ashx", { method: "DeleteMaterial", materialId: materialId })
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
            scope.material_id = 0;
            scope.isShow = true;
            scope.file = "";
            scope.imgpath = "";
            scope.categoryId = "-1";
        }
        scope.close = function () {
            scope.material_id = 0;
            scope.isShow = false;
            scope.file = "";
            scope.imgpath = "";
            scope.categoryId = "-1";
        }
        //更新素材
        scope.openEdit = function (item) {
            scope.material_id = item.material_id;
            scope.isShow = true;
            scope.file = "";
            scope.imgpath = item.material_url;
            scope.categoryId = item.category_id.toString();
        }

        scope.AddMaterial = function (file) {
            if (scope.categoryId == "-1") {
                alert("请选择类别！");
                return;
            }
            http.post("/Handlers/Sysconfighandler.ashx", { method: "AddMaterial", material_id: scope.material_id, category_id: scope.categoryId, material_url: scope.imgpath })
            .success(function (data) {
                if (data.success) {
                    if (scope.material_id == 0) {
                        alert("素材添加成功！");
                    }
                    else {
                        alert("素材更新成功！");
                    }
                    scope.getlist();
                    scope.close();
                } else {
                    alert(data.errorMsg);
                }
            })
        }

        scope.uploadImg = function (file) {
            if (file != undefined) {
                file.upload = Upload.upload({
                    url: '/Handlers/Membertoolhandler.ashx',
                    data: {
                        method: "UploadPic", folder: "material", file: file
                    }
                }).success(function (data) {
                    if (data.success) {
                        scope.imgpath = data.imgpath;
                    } else {
                        alert("图片上传失败！");
                    }
                })
            }
        }

        scope.clearImg = function () {
            scope.imgpath = "";
        }
    }])
    //相册管理
    .controller("picsubjectlist", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.list = [];
        scope.piclist = [];
        scope.pageSize = 20;
        scope.isAudit = route.isAudit;
        scope.category_id = "1";
        scope.state = "0";
        scope.keyWord = "";
        scope.dateRange = "";

        scope.getlist = function (page) {
            //http.post("/Handlers/Sysconfighandler.ashx", { pageIndex: page, pageSize: scope.pageSize, method: "PicSubjectList" })
            http.post("/admin.asmx/PicSubjectList", { pageIndex: page, pageSize: scope.pageSize, isAudit: scope.isAudit, category_id: scope.category_id, state: scope.state, keyword: scope.keyWord, dateRange: scope.dateRange })
            .success(function (data) {
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

        scope.search();

        scope.Delete = function (id) {
            http.post("/admin.asmx/UpdatePicSubjectState", { subject_id: id, state: 1 })
            .success(function (data) {
                if (data.success) {
                    alert("删除成功");
                    scope.search();
                } else {
                    alert(data.errorMsg);
                }
            })
        }

        //审核相册
        scope.isShowAudit = false;
        scope.OpenAuditPicSubject = function (id) {
            if (id > 0) {
                http.post("/admin.asmx/GetPicBySubject", { subject_id: id })
                .success(function (data) {
                    if (data.success) {
                        scope.piclist = JSON.parse(data.piclist);
                    } else {
                        alert(data.errorMsg)
                    }
                })
            }
            scope.AuditType = "-1";
            scope.subject_id = id;
            scope.isShowAudit = true;
        }

        scope.closeAudit = function () {
            scope.isShowAudit = false;
            scope.piclist = [];
            scope.subject_id = 0;
            scope.AuditType = "-1";
        }

        scope.submitAudit = function () {
            if (scope.AuditType == "-1") {
                alert("请选择审核状态");
                return;
            }
            if (scope.subject_id <= 0) {
                return;
            }
            if (confirm("是否确认提交审核内容？")) {
                http.post("/admin.asmx/UpdatePicSubjectState", { subject_id: scope.subject_id, state: scope.AuditType })
                .success(function (data) {
                    if (data.success) {
                        alert("更新成功");
                        scope.closeAudit();
                        scope.search();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
    }])
    //视频管理
    .controller("videolist", ["$scope", "$http", "$sce", "$routeParams", function (scope, http, sce, route) {
        scope.list = [];
        scope.pageSize = 10;
        scope.keyWord = "";
        scope.dateRange = "";
        scope.state = "0";

        scope.isAudit = route.isAudit;

        scope.getlist = function (page) {
            //http.post("/Handlers/Sysconfighandler.ashx", { pageIndex: page, pageSize: scope.pageSize, method: "PicSubjectList" })
            http.post("/admin.asmx/VideoList", { pageIndex: page, pageSize: scope.pageSize, keyword: scope.keyWord, isAudit: scope.isAudit, state: scope.state, dateRange: scope.dateRange })
            .success(function (data) {
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

        scope.search();

        scope.Delete = function (id) {
            http.post("/admin.asmx/UpdateVideoStateById", { video_id: id, state: 1 })
            .success(function (data) {
                if (data.success) {
                    alert("删除成功");
                    scope.search();
                } else {
                    alert(data.errorMsg);
                }
            })
        }

        scope.trustUrl = function (url) {
            return sce.trustAsResourceUrl(url);
        }
    }])
    //修改用户归属
    .controller("inducemember", ["$scope", "$http", function (scope, http) {
        scope.member_mobile = "";
        scope.agency_mobile = "";

        scope.Induce = function () {
            if (scope.member_mobile == "") {
                alert("请输入用户帐号");
                return;
            }
            if (scope.agency_mobile == "") {
                alert("请输入代理商帐号");
                return;
            }
            if (confirm("请确认是否继续操作")) {
                http.post("/Handlers/Sysconfighandler.ashx", { member_mobile: scope.member_mobile, agency_mobile: scope.agency_mobile, method: "inducemember" })
                .success(function (data) {
                    if (data.success) {
                        alert("修改成功");
                        scope.member_mobile = "";
                        scope.agency_mobile = "";
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
    }])

    //代理商审核
    .controller("agencyauditlist", ["$scope", "$http", function (scope, http) {

        scope.list = [];
        scope.pageSize = 20;
        scope.keyword = "";
        scope.parent_keyword = "";
        scope.status = -1;
        scope.DateRange = "";
        scope.AgencyLevels = [{ Id: -1, Name: "请选择合作商级别" }, { Id: 0, Name: "企业版" }, { Id: 1, Name: "城市合伙人", Level: 1 }, { Id: 2, Name: "合作商", Level: 2 }];
        scope.agencyTypes = [{ Id: 0, Name: "请选择", Level: 0 }, { Id: 1, Name: "一级", Level: 2 }, { Id: 2, Name: "二级", Level: 2 }, { Id: 3, Name: "三级", Level: 2 }];
        scope.Statuss = [{ Id: -1, Name: "状态" }, { Id: 0, Name: "未审核" }, { Id: 1, Name: "拒绝" }, { Id: 2, Name: "通过" }]
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
            http.post("/admin.asmx/GetAuditAgencyList", { DateRange: scope.DateRange, pageIndex: page, pageSize: scope.pageSize, status: scope.status, keyword: scope.keyword, parent_keyword: scope.parent_keyword })
            .success(function (data) {
                scope.list = data.Agencylist;
                scope.count = data.count;
                scope.pager.init(data.count);
            })
        }

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(scope, page);
            }, scope.pageSize, 1);
        }
        scope.search();

        scope.isShow = false;
        scope.openAudit = function (item) {
            scope.agency_transfer_id = item.agency_transfer_id;
            scope.agencyName = item.agencyName;
            scope.company = item.company;
            scope.mobile = item.mobile;
            scope.parentAgency = item.parentAgency;
            scope.city = item.city;
            scope.activeCount = item.activeCount;
            scope.AgencyLevelName = scope.level(item.agencyLevelId) + " " + scope.type(item.agencyTypeId);
            scope.card_p = item.card_p;
            scope.card_s = item.card_s;
            scope.license = item.license;
            scope.other = item.other;

            scope.AuditType = "-1";
            scope.reason = "";

            scope.isShow = true;
        }

        scope.close = function () {
            scope.isShow = false;

            scope.agency_transfer_id = "";
            scope.agencyName = "";
            scope.company = "";
            scope.mobile = "";
            scope.parentAgency = "";
            scope.city = "";
            scope.activeCount = "";
            scope.AgencyLevelName = "";
            scope.card_p = "";
            scope.card_s = "";
            scope.license = "";
            scope.other = "";

            scope.AuditType = "-1";
            scope.reason = "";
        }

        scope.submitAudit = function () {
            if (scope.AuditType == "-1") {
                alert("请选择审核状态");
                return;
            }
            if (scope.auditType == "1") {
                if (scope.reason == "") {
                    alert("请输入审核不通过原因");
                    return;
                }
            }
            http.post("/admin.asmx/AuditAgency", { agency_transfer_id: scope.agency_transfer_id, status: scope.AuditType, reason: scope.reason })
            .success(function (data) {
                if (data.success) {
                    alert("审核成功");
                    scope.close();
                    scope.search();
                } else {
                    alert(data.errorMsg);
                }
            })
        }
    }])

    /*企业互推公司详情（admin）*/
    .controller("ep_enterprise_detail", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.agency_id = route.agency_id;

        scope.get_detail = function () {
            http.post("/admin.asmx/GetEp_enterprise_detail", { agency_id: scope.agency_id })
            .success(function (data) {
                scope.ep = JSON.parse(data.ep);
            })
        }

        scope.get_detail();

        scope.isOpen = false;
        scope.open = function () {
            scope.to_company_name = "";
            scope.to_agency_id = 0;
            scope.isOpen = true;
        }
        scope.close = function () {
            scope.isOpen = false;
            scope.to_company_name = "";
            scope.to_agency_id = 0;
        }
        scope.choice_agency = function (index) {
            scope.to_agency_id = scope.agency_list[index].agency_id;
            scope.to_company_name = scope.agency_list[index].company_name;
            scope.agency_list = {};
        }
        scope.UpdateEp_relation = function () {
            if (scope.to_agency_id == 0) {
                alert("请选择互推企业！");
                return;
            }
            if (confirm("是否确认提交？")) {
                http.post("/admin.asmx/UpdateEp_relation", { form_agency_id: scope.agency_id, to_agency_id: scope.to_agency_id })
                .success(function (data) {
                    if (data.success) {
                        alert("添加成功");
                        scope.get_detail();
                        scope.close();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }
        scope.to_company_change = function () {
            http.post("/admin.asmx/SearchAgency", { keyword: scope.to_company_name })
            .success(function (data) {
                scope.agency_list = data.agency_list;
            })
        }

        //更新互推模板状态
        scope.UpdateEp_advert_state = function (advert_id, state) {
            if (confirm("是否确定更新？")) {
                http.post("/admin.asmx/UpdateEp_advertState", { advert_id: advert_id, state: state })
                .success(function (data) {
                    if (data.success) {
                        window.location.reload();
                        //alert("更新成功");
                        scope.get_detail();
                    } else {
                        alert(data.errorMsg);
                    }
                })
            }
        }

        scope.To_Epadvert_detail = function (advert_id) {
            window.location.href = "/membertool/Index.aspx#/ep_advert_detail/" + advert_id;
        }
    }])
    .controller("ep_relation_list", ["$scope", "$http", function (scope, http) {
        scope.list = [];
        scope.pageSize = 20;
        scope.tj_all = 0;
        scope.tj_open = 0;
        scope.tj_disabled = -1;
        scope.ep_categorys = {};
        scope.CatOne = 0;
        scope.ep_categorytwos = {};
        var relationSearch = localStorage.getItem('relationSearch');
        if (relationSearch != undefined && relationSearch != null) {
            relationSearch = JSON.parse(relationSearch);

            scope.ep_disabled = relationSearch.disabled;
            scope.ep_category_id = relationSearch.category_id;
            scope.scale = relationSearch.scalerange;
            scope.keyword = relationSearch.keyword;
        } else {
            scope.ep_disabled = "0";
            scope.ep_category_id = "-1";
            scope.scale = "-1";
            scope.keyword = "";
        }
        localStorage.removeItem('relationSearch');

        scope.GetEp_category = function () {
            http.post("/admin.asmx/GetEp_category", { parent_id: 0 })
            .success(function (data) {
                if (data.c_list.length > 0) {
                    for (var i = 0; i < data.c_list.length; i++) {
                        scope.ep_categorys[data.c_list[i].c_id] = data.c_list[i].c_name;
                    }
                }
            })
        }
        scope.GetEp_category();
        scope.GetEp_CatTwoLevel = function () {
            scope.ep_categorytwos = {};
            http.post("/admin.asmx/GetEp_twocategory", { id: scope.CatOne })
            .success(function (data) {
                if (data.c_list.length > 0) {
                    for (var i = 0; i < data.c_list.length; i++) {
                        scope.ep_categorytwos[data.c_list[i]['c_id']] = data.c_list[i].c_name;
                    }
                }
            })
        }

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.getlist = function (page) {
            var params = { pageIndex: page, pageSize: scope.pageSize, disabled: scope.ep_disabled, category_id: scope.ep_category_id, scalerange: scope.scale, keyword: scope.keyword };
            http.post("/admin.asmx/GetEp_agency", params)
            .success(function (data) {
                localStorage.setItem('relationSearch', JSON.stringify(params));

                scope.list = data.list;
                scope.count = data.count;
                scope.pager.init(data.count);
                scope.tj_all = data.tj_all;
                scope.tj_open = data.tj_open;
                scope.tj_disabled = data.tj_disabled;
            })
        }
        scope.search();

        scope.ToEp_enterprise_detail = function (agency_id) {
            // window.location.href = "/membertool/Index.aspx#/ep_enterprise_detail/" + agency_id;
            window.location.href = "/membertool/Index.aspx#/ep_home_page/" + agency_id;
        }

        scope.ToEp_enterprise_date = function (agency_id) {
            window.location.href = "/membertool/Index.aspx#/ep_advert_data/" + agency_id + "/0";
        }

        scope.isOpen = false;
        scope.curAgency = null;//当前操作的企业
        //开启/关闭 企业互推   [state:0开启 1关闭]
        scope.SetEp_Disabled = function (item, state) {
            if (item.category_name == null || item.category_name.length < 1) {
                $('#select_ep_cat_two').val(0);
                scope.curAgency = item;
                scope.isOpen = true;
                return;
            }
            if (!confirm("确认执行该操作吗？")) {
                return;
            }
            var params = {
                agency_id: item.agency_id,
                state: state
            };
            http.post("/admin.asmx/UpdateEpDisabled", params)
            .success(function (data) {
                if (data.success) {
                    alert("操作成功");
                    scope.search();
                }
                else {
                    alert(data.errorMsg);
                }
            });
        }

        //设置公司行业 并 开启互推功能
        scope.EnabledEp = function () {
            // console.log("Selected:" + $('#select_ep_cat_two').val());
            // console.log(scope.curAgency);
            if ($('#select_ep_cat_two').val() == 0) {
                alert("未选择行业");
                return;
            }
            var params = {
                agency_id: scope.curAgency.agency_id,
                category_id: $('#select_ep_cat_two').val()
            };
            http.post("/admin.asmx/EnabledEpAndCategory", params)
            .success(function (data) {
                if (data.success) {
                    alert("操作成功");
                    scope.search();
                    scope.close();
                }
                else {
                    alert(data.errorMsg);
                }
            });
        }

        scope.close = function () {
            scope.isOpen = false;
        }
    }])
})();
