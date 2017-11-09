/// <reference path="F:\TFS\Ldd.Web\src\Ldd.Web.Cdn\Ldd.Web.Cdn\base/_js/ldd.prototype.js" />
(function () {
    var Occupations = [{ selected: true,value:"不限", name: "不限" }, { value: "互联网",name: "互联网" }, { value: "电商/微商",name: "电商/微商" }, {value: "传媒/营销", name: "传媒/营销" }];
    var Incomes = [{ selected: true, value: "0", name: "不限" }, { value: "1", name: "2000元以下" }, { value: "2", name: "3000-3999" }, { value: "3", name: "4000-4999" }];
    var Birthdays = [{ selected: true, value: "0", name: "不限" }, { selected: false, value: "0-20", name: "20岁以下" }, { selected: false, value: "20-25", name: "20-25" }];
    var Genders = [{ selected: true, value: 0, name: "不限" }, { selected: false, value: 1, name: "男" }, { selected: false, value: 2, name: "女" }];
    var Likes = [{ selected: true, value: "不限", name: "不限" }, { value: "淘宝控", name: "淘宝控" }, { value: "韩剧", name: "韩剧" }, { value: "旅游", name: "旅游" }];

    angular.module("app", ["ngRoute", "laydate", "uploader", "kindeditor", "dateTool", "datetimepicker", "ngSanitize"])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            // 答题推广
            .when("/publishquestion", {
                controller: 'advertquestionpublish',
                templateUrl: '/content/ngtmpl/advertquestionpublish.html'
            })
            // 关注推广
            .when("/publishwechat", {
                controller: 'advertwechatpublish',
                templateUrl: '/content/ngtmpl/advertwechatpublish.html'
            })
            // 朋友圈推广
            .when("/publishmoment", {
                controller: 'advertmomentspublish',
                templateUrl: '/content/ngtmpl/advertising/advertmomentspublish.html'
            })
             // 编辑答题推广
            .when("/editquestion/:advid", {
                controller: 'advertquestionedit',
                templateUrl: '/content/ngtmpl/advertquestionpublish.html'
            })
            // 编辑关注推广
            .when("/editwechat/:advid", {
                controller: 'advertwechatedit',
                templateUrl: '/content/ngtmpl/advertwechatpublish.html'
            })
             // 编辑分享朋友圈推广
            .when("/editmoment/:advid", {
                controller: 'advertmomentedit',
                templateUrl: '/content/ngtmpl/advertising/advertmomentspublish.html'
            })
            //查看答题推广
             .when("/viewquestion/:advid", {
                 controller: 'advertquestionview',
                 templateUrl: '/content/ngtmpl/advertquestionpublish.html'
             })
            //查看关注推广
            .when("/viewwechant/:advid", {
                controller: 'advertwechantview',
                templateUrl: '/content/ngtmpl/advertwechatpublish.html'
            })
            // 查看分享朋友圈推广
            .when("/viewmoment/:advid", {
                controller: 'advertmomentview',
                templateUrl: '/content/ngtmpl/advertising/advertmomentspublish.html'
            })

             .when("/advdescription/:advType/:advertisingId", {
                 controller: 'advdescription',
                 templateUrl: '/content/ngtmpl/advdescription.html'
             })

            .when("/list", {
                controller: 'advertlist',
                templateUrl: '/content/ngtmpl/advert-list.html?v=201512071730'
            })
            .when("/attentionlist/:avid", {
                controller: 'attentionList',
                templateUrl: '/content/ngtmpl/audit_listings.html'
            })
            .when("/showlists/:avid", {
                controller: 'showlists',
                templateUrl: '/content/ngtmpl/show_listings.html'
            })
            .when("/lddusertasklist/:advertisingId", {
                controller: 'lddusertasklist',
                templateUrl: '/content/ngtmpl/lddusertasklist.html'
            })
            .otherwise({ "redirectTo": "/list" });
    }])
    // 答题推广发布
    .controller("advertquestionpublish", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.IsAdd = true;
        scope.isEdit = true;

        scope.minPoint = 0.5;
        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;

        scope.isSetOccupation = false;
        scope.isSetIncome = false;
        scope.isSetBirthday = false;
        scope.isSetGender = false;
        scope.isSetLike = false;

        scope.data = {
            AdvertisingTypeId: 1,
            Title: "",
            TitlePicUrl: BASE_CDN + "/coop/images/nofile_120_120.png",
            Description: "",
            StartTime: "",
            EndTime:"",
            GivenTypeId: 2,
            Questions: [],
            MerchatDesc: {
                RightWords: "",
                WrongWords: "",

                TypeID: 1,
                // APP推广
                AppTitle: "",
                AppTitlePic: BASE_CDN + "/coop/images/nofile_120_120.png",
                AppPic: BASE_CDN + "/coop/images/nofile_120_120.png",
                AppWords: "",
                AppUrl: "",
                // 链接推广
                LinkTitle: "",
                LinkTitlePic: BASE_CDN + "/coop/images/nofile_120_120.png",
                LinkPic: BASE_CDN + "/coop/images/nofile_120_120.png",
                LinkWords: "",
                LinkUrl: "",
                // 微信推广
                WechatTitle: "",
                WechatTitlePic: BASE_CDN + "/coop/images/nofile_120_120.png",
                WechatId: "",
                WechatQRCode: BASE_CDN + "/coop/images/nofile_120_120.png",
                WechatWords: "",
                WechatUrl: ""
            },
            IsLBS: false,
            Lng: "",
            Lat: "",
            Radius: 5,
            PutProvince: "选择省",
            PutCity: "选择市",
            PutArea: "选择区",
            Gender: 0
        };
        scope.selectOccupation = function (occupation) {
            occupation.selected = !occupation.selected;
            if (occupation.selected && occupation.name != "不限") {
                if (!scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetOccupation = true;
                }
                scope.occupations.where(function (o) {
                    return o.name == "不限";
                })[0].selected = false;
            }
            if (occupation.selected && occupation.name == "不限") {
                if (scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetOccupation = false;
                }
                scope.occupations.forEach(function (o) {
                    if (o.name != "不限") {
                        o.selected = false;
                    }
                })
            }
        }
        scope.selectIncome = function (income) {
            income.selected = !income.selected;
            if (income.selected && income.name != "不限") {
                if (!scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetIncome = true;
                }
                scope.incomes.where(function (c) {
                    return c.name == "不限";
                })[0].selected = false;
            }
            if (income.selected && income.name == "不限") {
                if (scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetIncome = false;
                }
                scope.incomes.forEach(function (c) {
                    if (c.name != "不限") {
                        c.selected = false;
                    }
                })
            }
        }
        scope.selectBirthday = function (birthday) {
            birthday.selected = !birthday.selected;
            if (birthday.selected && birthday.name != "不限") {
                if (!scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetBirthday = true;
                }
                scope.birthdays.where(function (b) {
                    return b.name == "不限";
                })[0].selected = false;
            }
            if (birthday.selected && birthday.name == "不限") {
                if (scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetBirthday = false;
                }
                scope.birthdays.forEach(function (b) {
                    if (b.name != "不限") {
                        b.selected = false;
                    }
                })
            }
        }
        scope.selectLike = function (like) {
            like.selected = !like.selected;
            if (like.selected && like.name != "不限") {
                if (!scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetLike = true;
                }
                scope.likes.where(function (l) {
                    return l.name == "不限";
                })[0].selected = false;
            }
            if (like.selected && like.name == "不限") {
                if (scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetLike = false;
                }
                scope.likes.forEach(function (l) {
                    if (l.name != "不限") {
                        l.selected = false;
                    }
                })
            }
        }
        scope.selectGender = function (gender) {
            if (!gender.selected) {
                gender.selected = !gender.selected;
                if (gender.name != "不限") {
                    if (!scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                    }
                }
                if (gender.name == "不限") {
                    if (scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                        scope.isSetGender = false;
                    }
                }
                scope.genders = scope.genders.forEach(function (g) {
                    if (g.value != gender.value) {
                        g.selected = false;
                    }
                });
            }
        }
        scope.$watch("data.PutProvince", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue == "选择省") {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetProvince = false;
                }
                else if (oldValue == "选择省") {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetProvince = true;
                }
            }
        })
        scope.$watch("data.IsLBS", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                }
                else {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                }
            }
        })

        scope.ReturnToMap = function () {
            if (scope.data.PutArea != "选择区") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity + scope.data.PutArea)
            }
            else if (scope.data.PutCity != "选择市") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity)
            }
            else if (scope.data.PutProvince != "选择省") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince)
            }
            else {
                window.open('/advertising/baidumap?key=杭州')
            }

        }
        window.setPosition = function (x, y) {
            //alert(x);
            scope.data.Lng = x;

            scope.data.Lat = y;
            scope.$apply();
        }

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            getCity();
        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];

        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, {
                        Code: "", Name: "选择省"
                    });
                }

            });
        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, {
                            Code: "", Name: "选择市"
                        });
                    }

                });

            }
            else {
                scope.citys = [{
                    Code: "", Name: "选择市"
                }];
            }
            scope.areas = [{
                Code: "", Name: "选择区"
            }];
            scope.data.PutCity = "选择市";
            scope.data.PutArea = "选择区";
        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, {
                            Code: "", Name: "选择区"
                        });
                    }

                });
            }
            else {
                scope.areas = [{
                    Code: "", Name: "选择区"
                }];
            }
            scope.data.PutArea = "选择区";
        }

        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }
        iniPageInfo();


        scope.setDescription = function (desc) {
            scope.data.Description = desc;
        }

        scope.setTitlePicUrl = function (url) {
            scope.data.TitlePicUrl = url;
            scope.$apply();
        }

        scope.setAppTitlePic = function (url) {
            scope.data.MerchatDesc.AppTitlePic = url;
            scope.$apply();
        }
        scope.setAppPic = function (url) {
            scope.data.MerchatDesc.AppPic = url;
            scope.$apply();
        }

        scope.setLinkTitlePic = function (url) {
            scope.data.MerchatDesc.LinkTitlePic = url;
            scope.$apply();
        }
        scope.setLinkPic = function (url) {
            scope.data.MerchatDesc.LinkPic = url;
            scope.$apply();
        }

        scope.setWechatTitlePic = function (url) {
            scope.data.MerchatDesc.WechatTitlePic = url;
            scope.$apply();
        }
        scope.setWechatQRCode = function (url) {
            scope.data.MerchatDesc.WechatQRCode = url;
            scope.$apply();
        }

        // 答题后推广
        scope.expands = [
            { key: 1, value: "关注公众号" },
            { key: 2, value: "APP下载" },
            { key: 3, value: "链接推广" }
        ];
        // 题目类型
        scope.questionTypes = [
            { key: 1, value: "单选" },
            { key: 2, value: "多选" }
        ];

        /**
         * 添加题目
         */
        scope.addQuestion = function () {
            scope.data.Questions.push(new questionModel(scope.data.Questions.length,
                "", 1, [], "", 10));

        }

        scope.ReturnToView = function () {
            if (!scope.data.Point || scope.data.Point < scope.minPoint) {
                alert("请设置单价，最低 " + scope.minPoint + " 元");
                return;
            }
            scope.data.Questions.forEach(function (q) {
                q.Options = {};
                q.quesOptions.forEach(function (v) {
                    q.Options[v.key] = v.value;
                });

                q.Answer = q.quesOptions.where(function (o) {
                    return o.isanswer;
                }).select(function (o) {
                    return o.key;
                }).join(",");
            });
            http.post("/advertising/regpublish", { model: scope.data, isPublish: true })
            .success(function (data) {
                if (data.CodeStatus != "200") {
                    alert(data.ErrorMessage);
                }
                else {
                    scope.IsAdd = false;
                }

            });
        }
        scope.ReturnToAdd = function () {
            scope.IsAdd = true;
        }

        /**
         * 保存推广
         */
        scope.saveAdvert = function () {
            
            scope.data.Questions.forEach(function (q) {
                q.Options = {};
                q.quesOptions.forEach(function (v) {
                    q.Options[v.key] = v.value;
                });

                q.Answer = q.quesOptions.where(function (o) {
                    return o.isanswer;
                }).select(function (o) {
                    return o.key;
                }).join(",");
            });

            scope.data.Occupation = scope.occupations.where(function (o) { return o.selected; }).select(function (o) { return o.name; }).join(",");
            scope.data.Income = scope.incomes.where(function (i) { return i.selected; }).select(function (i) { return i.value; }).join(",");
            scope.data.BirthDay = scope.birthdays.where(function (b) { return b.selected; }).select(function (b) { return b.value; }).join(",");
            scope.data.Gender = scope.genders.where(function (g) { return g.selected; }).select(function (g) { return g.value; }).join(",");
            scope.data.Likes = scope.likes.where(function (l) { return l.selected; }).select(function (l) { return l.name; }).join(",");
            http.post("/advertising/publish", scope.data)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("添加成功");
                    window.location.href = "/advertising";
                }
                else {
                    alert(data.ErrorMessage);
                }
            });

        }

        /**
         * 选项模型
         * @param key 选项号 A/B/C/D
         * @param value 选项内容
         */
        function optionModel(key, value) {
            this.key = key;
            this.value = value;
            this.isanswer = false;
        }

        /**
         * 问题模型
         * @param ordernumber
         * @param title
         * @param type
         * @param options
         * @param answer
         * @param point
         */
        function questionModel(ordernumber, title, type, options, answer, point) {

            this.OrderNumber = ordernumber;
            this.Title = title;
            this.Type = type;
            this.Options = {},
            this.quesOptions = [];
            this.Answer = answer;
            this.Point = point;
            /**
             * 添加选项
             */
            this.addOption = function () {
                this.quesOptions.push(new optionModel(String.fromCharCode(65 + this.quesOptions.length), ""));
            }
            /**
             * 移除选项
             * @param option
             */
            this.removeOption = function (option) {
                this.quesOptions.remove(option);
                for (var i = 0; i < this.quesOptions.length; i++) {
                    this.quesOptions[i].key = String.fromCharCode(65 + i)
                }
            }
            /**
             * 选择选项
             * @param option
             */
            this.clickOption = function (option) {
                if (this.Type == 1) {
                    // 单选
                    this.quesOptions.forEach(function (o) {
                        if (o == option) {
                            o.isanswer = true;
                        }
                        else {
                            o.isanswer = false;
                        }
                    })
                }
                else {
                    // 多选
                    option.isanswer = !option.isanswer;

                }
            }
        }

        scope.addQuestion();
        scope.data.Questions.forEach(function (v) {
            v.addOption();
            v.addOption();
        });

    }])
    // 关注推广发布
    .controller("advertwechatpublish", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.IsAdd = true;
        scope.isEdit = true;

        scope.minPoint = 0.5;
        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;

        scope.isSetOccupation = false;
        scope.isSetIncome = false;
        scope.isSetBirthday = false;
        scope.isSetGender = false;
        scope.isSetLike = false;
        scope.calculateTypeIds = [{ Id: -1, Name: "选择计费方式" }, { Id: 1, Name: "按截图计费" }, { Id: 2, Name: "按点击计费" }, { Id: 3, Name: "自由分享" }]
       
        scope.data = {
            AdvertisingTypeId: 5,
            Title: "",
            TitlePicUrl: BASE_CDN + "/coop/images/nofile_120_120.png",
            Description: "",
            StartTime: "",
            EndTime: "",
            // 公众号二维码
            KeyWords: BASE_CDN + "/coop/images/nofile_120_120.png",
            // 公众号ID
            KeyWords1: "",
            // 任务规则
            TaskRule: "",
            // 关注积分
            //Point: 0.5,
            CalculateTypeId: 1,
            IsLBS: false,
            Lng: "",
            Lat: "",
            Radius: 5,
            PutProvince: "选择省",
            PutCity: "选择市",
            PutArea: "选择区",
            Gender: 0

        };
        
        scope.selectOccupation = function (occupation) {
            occupation.selected = !occupation.selected;
            if (occupation.selected && occupation.name != "不限") {
                if (!scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetOccupation = true;
                }
                scope.occupations.where(function (o) {
                    return o.name == "不限";
                })[0].selected = false;
            }
            if (occupation.selected && occupation.name == "不限") {
                if (scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetOccupation = false;
                }
                scope.occupations.forEach(function (o) {
                    if (o.name != "不限") {
                        o.selected = false;
                    }
                })
            }
        }
        scope.selectIncome = function (income) {
            income.selected = !income.selected;
            if (income.selected && income.name != "不限") {
                if (!scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetIncome = true;
                }
                scope.incomes.where(function (c) {
                    return c.name == "不限";
                })[0].selected = false;
            }
            if (income.selected && income.name == "不限") {
                if (scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetIncome = false;
                }
                scope.incomes.forEach(function (c) {
                    if (c.name != "不限") {
                        c.selected = false;
                    }
                })
            }
        }
        scope.selectBirthday = function (birthday) {
            birthday.selected = !birthday.selected;
            if (birthday.selected && birthday.name != "不限") {
                if (!scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetBirthday = true;
                }
                scope.birthdays.where(function (b) {
                    return b.name == "不限";
                })[0].selected = false;
            }
            if (birthday.selected && birthday.name == "不限") {
                if (scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetBirthday = false;
                }
                scope.birthdays.forEach(function (b) {
                    if (b.name != "不限") {
                        b.selected = false;
                    }
                })
            }
        }
        scope.selectLike = function (like) {
            like.selected = !like.selected;
            if (like.selected && like.name != "不限") {
                if (!scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetLike = true;
                }
                scope.likes.where(function (l) {
                    return l.name == "不限";
                })[0].selected = false;
            }
            if (like.selected && like.name == "不限") {
                if (scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetLike = false;
                }
                scope.likes.forEach(function (l) {
                    if (l.name != "不限") {
                        l.selected = false;
                    }
                })
            }
        }
        scope.selectGender = function (gender) {
            if (!gender.selected) {
                gender.selected = !gender.selected;
                if (gender.name != "不限") {
                    if (!scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                    }
                }
                if (gender.name == "不限") {
                    if (scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                        scope.isSetGender = false;
                    }
                }
                scope.genders = scope.genders.forEach(function (g) {
                    if (g.value != gender.value) {
                        g.selected = false;
                    }
                });
            }
        }
        scope.$watch("data.PutProvince", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue == "选择省") {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetProvince = false;
                }
                else if (oldValue == "选择省") {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetProvince = true;
                }
            }
        })
        scope.$watch("data.IsLBS", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                }
                else {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                }
            }
        })

        scope.ReturnToMap = function () {
            if (scope.data.PutArea != "选择区") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity + scope.data.PutArea)
            }
            else if (scope.data.PutCity != "选择市") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity)
            }
            else if (scope.data.PutProvince != "选择省") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince)
            }
            else {
                window.open('/advertising/baidumap?key=杭州')
            }

        }
        window.setPosition = function (x, y) {
            //alert(x);
            scope.data.Lng = x;

            scope.data.Lat = y;
            scope.$apply();
        }

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            getCity();
        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];

        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, {
                        Code: "", Name: "选择省"
                    });
                }

            });
        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, {
                            Code: "", Name: "选择市"
                        });
                    }

                });

            }
            else {
                scope.citys = [{
                    Code: "", Name: "选择市"
                }];
            }
            scope.areas = [{
                Code: "", Name: "选择区"
            }];
            scope.data.PutCity = "选择市";
            scope.data.PutArea = "选择区";
        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, {
                            Code: "", Name: "选择区"
                        });
                    }

                });
            }
            else {
                scope.areas = [{
                    Code: "", Name: "选择区"
                }];
            }
            scope.data.PutArea = "选择区";
        }

        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }
        iniPageInfo();



        scope.setTitlePicUrl = function (url) {
            scope.data.TitlePicUrl = url;
            scope.$apply();
        }
        // 设置微信二维码
        scope.setWechatQRCode = function (desc) {
            scope.data.KeyWords = desc;
            scope.$apply();
        }
        // 微信公众号描述
        scope.setDescription = function (desc) {
            scope.data.Description = desc;
        }
        // 要求描述
        scope.setTaskRule = function (desc) {
            scope.data.TaskRule = desc;
            }

        scope.ReturnToView = function () {
            if (!scope.data.Point || scope.data.Point < scope.minPoint) {
                alert("请设置单价，最低 " + scope.minPoint + " 元");
                return;
            }

            http.post("/advertising/regpublish", { model: scope.data, isPublish: true })
            .success(function (data) {
                if (data.CodeStatus != "200") {
                    alert(data.ErrorMessage);
                }
                else {
                    scope.IsAdd = false;
                }

            });
        }
        scope.ReturnToAdd = function () {
            scope.IsAdd = true;
        }
        /**
         * 保存推广
         */
        scope.saveAdvert = function () {
            scope.data.Occupation = scope.occupations.where(function (o) { return o.selected; }).select(function (o) { return o.name; }).join(",");
            scope.data.Income = scope.incomes.where(function (i) { return i.selected; }).select(function (i) { return i.value; }).join(",");
            scope.data.BirthDay = scope.birthdays.where(function (b) { return b.selected; }).select(function (b) { return b.value; }).join(",");
            scope.data.Gender = scope.genders.where(function (g) { return g.selected; }).select(function (g) { return g.value; }).join(",");
            scope.data.Likes = scope.likes.where(function (l) { return l.selected; }).select(function (l) { return l.name; }).join(",");
            http.post("/advertising/publish", scope.data)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("添加成功");
                    window.location.href = "/advertising";
                }
                else {
                    alert(data.ErrorMessage);
                }
            });

        }

    }])
    // 分享朋友圈推广发布
    .controller("advertmomentspublish", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.IsAdd = true;
        scope.isEdit = true;

        scope.minPoint = 0.5;
        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;

        scope.isSetOccupation = false;
        scope.isSetIncome = false;
        scope.isSetBirthday = false;
        scope.isSetGender = false;
        scope.isSetLike = false;
        scope.calculateTypeIds = [{ Id: -1, Name: "选择计费方式" }, { Id: 1, Name: "按截图计费" }, { Id: 2, Name: "按点击计费" }, { Id: 3, Name: "自由分享" }]

        scope.data = {
            AdvertisingTypeId: 8,
            Title: "",
            TitlePicUrl: BASE_CDN + "/coop/images/nofile_120_120.png",
            // 公众号二维码
            KeyWords: BASE_CDN + "/coop/images/nofile_120_120.png",
            // 任务规则
            TaskRule: "",
            //分享信息
            ShareDesc: {
                ShareTypeId: 1,
                ShareContent: "",
                ShareUrl: ""
            },

            StartTime: "",
            EndTime: "",
            CalculateTypeId: -1,
            Gender: 0,
            PutProvince: "选择省",
            PutCity: "选择市",
            PutArea: "选择区",
            IsLBS: false,
            Lng: "",
            Lat: "",
            Radius: 5
        };
        scope.selectOccupation = function (occupation) {
            occupation.selected = !occupation.selected;
            if (occupation.selected && occupation.name != "不限") {
                if (!scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetOccupation = true;
                }
                scope.occupations.where(function (o) {
                    return o.name == "不限";
                })[0].selected = false;
            }
            if (occupation.selected && occupation.name == "不限") {
                if (scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetOccupation = false;
                }
                scope.occupations.forEach(function (o) {
                    if (o.name != "不限") {
                        o.selected = false;
                    }
                })
            }
        }
        scope.selectIncome = function (income) {
            income.selected = !income.selected;
            if (income.selected && income.name != "不限") {
                if (!scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetIncome = true;
                }
                scope.incomes.where(function (c) {
                    return c.name == "不限";
                })[0].selected = false;
            }
            if (income.selected && income.name == "不限") {
                if (scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetIncome = false;
                }
                scope.incomes.forEach(function (c) {
                    if (c.name != "不限") {
                        c.selected = false;
                    }
                })
            }
        }
        scope.selectBirthday = function (birthday) {
            birthday.selected = !birthday.selected;
            if (birthday.selected && birthday.name != "不限") {
                if (!scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetBirthday = true;
                }
                scope.birthdays.where(function (b) {
                    return b.name == "不限";
                })[0].selected = false;
            }
            if (birthday.selected && birthday.name == "不限") {
                if (scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetBirthday = false;
                }
                scope.birthdays.forEach(function (b) {
                    if (b.name != "不限") {
                        b.selected = false;
                    }
                })
            }
        }
        scope.selectLike = function (like) {
            like.selected = !like.selected;
            if (like.selected && like.name != "不限") {
                if (!scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetLike = true;
                }
                scope.likes.where(function (l) {
                    return l.name == "不限";
                })[0].selected = false;
            }
            if (like.selected && like.name == "不限") {
                if (scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetLike = false;
                }
                scope.likes.forEach(function (l) {
                    if (l.name != "不限") {
                        l.selected = false;
                    }
                })
            }
        }
        scope.selectGender = function (gender) {
            if (!gender.selected) {
                gender.selected = !gender.selected;
                if (gender.name != "不限") {
                    if (!scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                    }
                }
                if (gender.name == "不限") {
                    if (scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                        scope.isSetGender = false;
                    }
                }
                scope.genders = scope.genders.forEach(function (g) {
                    if (g.value != gender.value) {
                        g.selected = false;
                    }
                });
            }
        }        
        scope.$watch("data.PutProvince", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue == "选择省") {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetProvince = false;
                }
                else if (oldValue == "选择省") {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetProvince = true;
                }
            }
        })
        scope.$watch("data.IsLBS", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                }
                else {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                }
            }
        })

        scope.ReturnToMap = function () {
            if (scope.data.PutArea != "选择区") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity + scope.data.PutArea)
            }
            else if (scope.data.PutCity != "选择市") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity)
            }
            else if (scope.data.PutProvince != "选择省") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince)
            }
            else {
                window.open('/advertising/baidumap?key=杭州')
            }

        }
        window.setPosition = function (x, y) {
            //alert(x);
            scope.data.Lng = x;

            scope.data.Lat = y;
            scope.$apply();
        }

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            getCity();
        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];

        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, {
                        Code: "", Name: "选择省"
                    });
                }

            });
        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, {
                            Code: "", Name: "选择市"
                        });
                    }

                });

            }
            else {
                scope.citys = [{
                    Code: "", Name: "选择市"
                }];
            }
            scope.areas = [{
                Code: "", Name: "选择区"
            }];
            scope.data.PutCity = "选择市";
            scope.data.PutArea = "选择区";
        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, {
                            Code: "", Name: "选择区"
                        });
                    }

                });
            }
            else {
                scope.areas = [{
                    Code: "", Name: "选择区"
                }];
            }
            scope.data.PutArea = "选择区";
        }

        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }
        iniPageInfo();

        // 题目类型
        scope.shareTypes = [{key: 1, value: "自定义内容"},{key: 2, value: "URL链接"}];

        scope.setTitlePicUrl = function (url) {
            scope.data.TitlePicUrl = url;
            scope.$apply();
        }
        // 设置微信二维码
        scope.setWechatQRCode = function (desc) {
            scope.data.KeyWords = desc;
            scope.$apply();
        }
        // 分享自定义内容
        scope.setContent = function (desc) {
            scope.data.ShareDesc.ShareContent = desc;
        }
        scope.setTaskRule = function (desc) {
            scope.data.TaskRule = desc;
        }

        scope.ReturnToView = function () {
            if (!scope.data.Point || scope.data.Point < scope.minPoint)
            {
                alert("请设置单价，最低 " + scope.minPoint + " 元");
                return;
            }
            http.post("/advertising/regpublish", { model: scope.data, isPublish: true })
            .success(function (data) {
                if (data.CodeStatus != "200") {
                    alert(data.ErrorMessage);
                }
                else {
                    scope.IsAdd = false;
                }

            });
        }
        scope.ReturnToAdd = function () {
            scope.IsAdd = true;
        }
        /**
         * 保存推广
         */
        scope.saveAdvert = function () {
            scope.data.Occupation = scope.occupations.where(function (o) { return o.selected; }).select(function (o) { return o.name; }).join(",");
            scope.data.Income = scope.incomes.where(function (i) { return i.selected; }).select(function (i) { return i.value; }).join(",");
            scope.data.BirthDay = scope.birthdays.where(function (b) { return b.selected; }).select(function (b) { return b.value; }).join(",");
            scope.data.Gender = scope.genders.where(function (g) { return g.selected; }).select(function (g) { return g.value; }).join(",");
            scope.data.Likes = scope.likes.where(function (l) { return l.selected; }).select(function (l) { return l.name; }).join(",");
            http.post("/advertising/publish", scope.data)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("添加成功");
                    window.location.href = "/advertising";
                }
                else {
                    alert(data.ErrorMessage);
                }
            });

        }

    }])

    // 编辑答题推广
    .controller("advertquestionedit", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.isFirstInit = true;
        scope.IsAdd = true;
        scope.isEdit = true;

        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;


        scope.advid = route.advid;
        scope.data = {};
        scope.minPoint = 0.5;

        scope.isSetOccupation = false;
        scope.isSetIncome = false;
        scope.isSetBirthday = false;
        scope.isSetGender = false;
        scope.isSetLike = false;

        scope.data.Gender = 0;
        scope.data.IsLBS = false;
        scope.data.PutProvince = "选择省";
        scope.data.PutCity = "选择市";
        scope.data.PutArea = "选择区";

        var Questions = [];
        var quesOptions = [];
        scope.getadvdetails = function () {
            //scope.data.Gender = 0;
            http.post("/advertising/AdvDetailsCommon", { advertisingId: scope.advid })
            .success(function (data) {
                scope.data = data;               
                var answer = data.Questions[0].Answer;
                var obj = data.Questions[0].Options;
                jQuery.each(obj, function (key, val) {
                    if (answer.indexOf(key) == 0) {
                        quesOptions.push(new optionModel(key, val, true))
                    }
                    else {
                        quesOptions.push(new optionModel(key, val, false))
                    }
                });

                Questions.push(new questionModel(data.Questions[0].OrderNumber, data.Questions[0].Content, data.Questions[0].Type, quesOptions, data.Questions[0].Answer, data.Questions[0].Point))
                scope.data.Questions = Questions;
                scope.data.StartTime = scope.data.StartTime.toDateFormat("yyyy-MM-dd hh:mm");
                scope.data.EndTime = scope.data.EndTime.toDateFormat("yyyy-MM-dd hh:mm");
                iniPageInfo();
                iniConfig();


            })
        }
        scope.getadvdetails();

        scope.selectOccupation = function (occupation) {
            occupation.selected = !occupation.selected;
            if (occupation.selected && occupation.name != "不限") {
                if (!scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetOccupation = true;
                }
                scope.occupations.where(function (o) {
                    return o.name == "不限";
                })[0].selected = false;
            }
            if (occupation.selected && occupation.name == "不限") {
                if (scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetOccupation = false;
                }
                scope.occupations.forEach(function (o) {
                    if (o.name != "不限") {
                        o.selected = false;
                    }
                })
            }
        }
        scope.selectIncome = function (income) {
            income.selected = !income.selected;
            if (income.selected && income.name != "不限") {
                if (!scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetIncome = true;
                }
                scope.incomes.where(function (c) {
                    return c.name == "不限";
                })[0].selected = false;
            }
            if (income.selected && income.name == "不限") {
                if (scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetIncome = false;
                }
                scope.incomes.forEach(function (c) {
                    if (c.name != "不限") {
                        c.selected = false;
                    }
                })
            }
        }
        scope.selectBirthday = function (birthday) {
            birthday.selected = !birthday.selected;
            if (birthday.selected && birthday.name != "不限") {
                if (!scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetBirthday = true;
                }
                scope.birthdays.where(function (b) {
                    return b.name == "不限";
                })[0].selected = false;
            }
            if (birthday.selected && birthday.name == "不限") {
                if (scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetBirthday = false;
                }
                scope.birthdays.forEach(function (b) {
                    if (b.name != "不限") {
                        b.selected = false;
                    }
                })
            }
        }
        scope.selectLike = function (like) {
            like.selected = !like.selected;
            if (like.selected && like.name != "不限") {
                if (!scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetLike = true;
                }
                scope.likes.where(function (l) {
                    return l.name == "不限";
                })[0].selected = false;
            }
            if (like.selected && like.name == "不限") {
                if (scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetLike = false;
                }
                scope.likes.forEach(function (l) {
                    if (l.name != "不限") {
                        l.selected = false;
                    }
                })
            }
        }
        scope.selectGender = function (gender) {
            if (!gender.selected) {
                gender.selected = !gender.selected;
                if (gender.name != "不限") {
                    if (!scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                    }
                }
                if (gender.name == "不限") {
                    if (scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                        scope.isSetGender = false;
                    }
                }
                scope.genders = scope.genders.forEach(function (g) {
                    if (g.value != gender.value) {
                        g.selected = false;
                    }
                });
            }
        }
        scope.$watch("data.PutProvince", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue == "选择省") {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetProvince = false;
                }
                else if (oldValue == "选择省") {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetProvince = true;
                }
            }
        })
        scope.$watch("data.IsLBS", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                }
                else {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                }
            }
        })

        scope.ReturnToMap = function () {
            if (scope.data.PutArea != "选择区") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity + scope.data.PutArea)
            }
            else if (scope.data.PutCity != "选择市") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity)
            }
            else if (scope.data.PutProvince != "选择省") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince)
            }
            else {
                window.open('/advertising/baidumap?key=杭州')
            }

        }
        window.setPosition = function (x, y) {
            //alert(x);
            scope.data.Lng = x;

            scope.data.Lat = y;
            scope.$apply();
        }

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            if (!scope.isFirstInit) {
                scope.data.PutCity = "选择市";
                scope.data.PutArea = "选择区";
            }
            getCity();

        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];
        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, { Code: "", Name: "选择省" });
                    scope.prochange();
                }


            });

        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, { Code: "", Name: "选择市" });
                        scope.citychange();
                    }

                });
            }
            else {
                scope.citys = [{ Code: "", Name: "选择市" }];
            }

        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, { Code: "", Name: "选择区" });
                    }

                });
            }
            else {
                scope.areas = [{ Code: "", Name: "选择区" }];
            }
            if (scope.isFirstInit) {
                scope.isFirstInit = false;
            }
        }

        // 初始化配置
        function iniConfig() {
            if (scope.data.Occupation != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetOccupation = true;
                scope.occupations.forEach(function (o) {
                    if (o.name == "不限") {
                        o.selected = false;
                    }
                });
                var selectOccupation = scope.data.Occupation.split(',');
                selectOccupation.forEach(function (so) {
                    scope.occupations.forEach(function (o) {
                        if (o.name == so) {
                            o.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Income != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetIncome = true;
                scope.incomes.forEach(function (i) {
                    if (i.name == "不限") {
                        i.selected = false;
                    }
                });
                var selectIncome = scope.data.Income.split(',');
                selectIncome.forEach(function (si) {
                    scope.incomes.forEach(function (i) {
                        if (i.value == si) {
                            i.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Birthday != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetBirthday = true;
                scope.birthdays.forEach(function (b) {
                    if (b.name == "不限") {
                        b.selected = false;
                    }
                });
                var selectBirthday = scope.data.Birthday.split(',');
                selectBirthday.forEach(function (sb) {
                    scope.birthdays.forEach(function (b) {
                        if (b.value == sb) {
                            b.selected = true;
                        }
                    });
                })
            }

            scope.genders.forEach(function (b) {
                if (b.value == scope.data.Gender) {
                    b.selected = true;
                    if (b.value != 0) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                        scope.genders.forEach(function (g) {
                            if (g.name == "不限") {
                                g.selected = false;
                            }
                        });
                    }
                }
            });

            if (scope.data.Likes != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetLike = true;
                scope.likes.forEach(function (l) {
                    if (l.name == "不限") {
                        l.selected = false;
                    }
                });
                var selectLikes = scope.data.Likes.split(',');
                selectLikes.forEach(function (sl) {
                    scope.likes.forEach(function (l) {
                        if (l.value == sl) {
                            l.selected = true;
                        }
                    });
                })
            }

        }
        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }

        scope.setDescription = function (desc) {
            if (desc) {
                scope.data.Description = desc;
            }
            else {
                return scope.data.Description;
            }
        }

        scope.setTitlePicUrl = function (url) {
            scope.data.TitlePicUrl = url;
            scope.$apply();
        }

        scope.setAppTitlePic = function (url) {
            scope.data.MerchatDesc.AppTitlePic = url;
            scope.$apply();
        }
        scope.setAppPic = function (url) {
            scope.data.MerchatDesc.AppPic = url;
            scope.$apply();
        }

        scope.setLinkTitlePic = function (url) {
            scope.data.MerchatDesc.LinkTitlePic = url;
            scope.$apply();
        }
        scope.setLinkPic = function (url) {
            scope.data.MerchatDesc.LinkPic = url;
            scope.$apply();
        }

        scope.setWechatTitlePic = function (url) {
            scope.data.MerchatDesc.WechatTitlePic = url;
            scope.$apply();
        }
        scope.setWechatQRCode = function (url) {
            scope.data.MerchatDesc.WechatQRCode = url;
            scope.$apply();
        }

        // 答题后推广
        scope.expands = [
        { key: 1, value: "关注公众号" },
        {
            key: 2, value: "APP下载"
        },
        {
            key: 3, value: "链接推广"
        }
        ];
        // 题目类型
        scope.questionTypes = [
        { key: 1, value: "单选" },
        {
            key: 2, value: "多选"
        }
        ];

        ///**
        // * 添加题目
        // */
        //scope.addQuestion = function () {
        //    scope.Questions.push(new questionModel(scope.data.Questions.length,
        //        "", 1, [], "", 10));
        //}

        scope.ReturnToView = function () {
            if (!scope.data.Point || scope.data.Point < scope.minPoint) {
                alert("请设置单价，最低 " + scope.minPoint + " 元");
                return;
            }
            scope.data.Questions.forEach(function (q) {
                q.Options = {};
                q.quesOptions.forEach(function (v) {
                    q.Options[v.key] = v.value;
                });

                q.Answer = q.quesOptions.where(function (o) {
                    return o.isanswer;
                }).select(function (o) {
                    return o.key;
                }).join(",");
            });

            http.post("/advertising/regpublish", { model: scope.data, isPublish: false })
            .success(function (data) {
                if (data.CodeStatus != "200") {
                    alert(data.ErrorMessage);
                }
                else {
                    scope.IsAdd = false;
                }

            });
        }
        scope.ReturnToAdd = function () {
            scope.IsAdd = true;
        }

        /**
         * 保存推广
         */
        scope.saveAdvert = function () {

            scope.data.Questions.forEach(function (q) {
                q.Options = {};
                q.quesOptions.forEach(function (v) {
                    q.Options[v.key] = v.value;
                });

                q.Answer = q.quesOptions.where(function (o) {
                    return o.isanswer;
                }).select(function (o) {
                    return o.key;
                }).join(",");
            });
            scope.data.Occupation = scope.occupations.where(function (o) { return o.selected; }).select(function (o) { return o.name; }).join(",");
            scope.data.Income = scope.incomes.where(function (i) { return i.selected; }).select(function (i) { return i.value; }).join(",");
            scope.data.Birthday = scope.birthdays.where(function (b) { return b.selected; }).select(function (b) { return b.value; }).join(",");
            scope.data.Gender = scope.genders.where(function (g) { return g.selected; }).select(function (g) { return g.value; }).join(",");
            scope.data.Likes = scope.likes.where(function (l) { return l.selected; }).select(function (l) { return l.name; }).join(",");
            var params = {
                model: scope.data,
                advid: scope.advid
            }
            http.post("/advertising/update", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("修改成功");
                    window.location.href = "/advertising";
                }
                else {
                    alert(data.ErrorMessage);
                }
            });

        }

        /**
         * 选项模型
         * @param key 选项号 A/B/C/D
         * @param value 选项内容
         */
        function optionModel(key, value, isanswer) {
            this.key = key;
            this.value = value;
            this.isanswer = isanswer;
        }

        /**
         * 问题模型
         * @param ordernumber
         * @param title
         * @param type
         * @param options
         * @param answer
         * @param point
         */
        function questionModel(ordernumber, title, type, options, answer, point) {

            this.OrderNumber = ordernumber;
            this.Title = title;
            this.Type = type;
            this.Options = {},
            this.quesOptions = options;
            this.Answer = answer;
            this.Point = point;
            /**
             * 添加选项
             */
            this.addOption = function () {
                this.quesOptions.push(new optionModel(String.fromCharCode(65 + this.quesOptions.length), ""));
            }
            /**
             * 移除选项
             * @param option
             */
            this.removeOption = function (option) {
                this.quesOptions.remove(option);
                for (var i = 0; i < this.quesOptions.length; i++) {
                    this.quesOptions[i].key = String.fromCharCode(65 + i)
                }
            }
            /**
             * 选择选项
             * @param option
             */
            this.clickOption = function (option) {
                if (this.Type == 1) {
                    // 单选
                    this.quesOptions.forEach(function (o) {
                        if (o == option) {
                            o.isanswer = true;
                        }
                        else {
                            o.isanswer = false;
                        }
                    })
                }
                else {
                    // 多选
                    option.isanswer = !option.isanswer;

                }
            }
        }

        //scope.addQuestion();

    }])
    // 编辑关注推广
    .controller("advertwechatedit", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.isFirstInit = true;
        scope.IsAdd = true;
        scope.isEdit = true;

        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;
        scope.calculateTypeIds = [{ Id: -1, Name: "选择计费方式" }, { Id: 1, Name: "按截图计费" }, { Id: 2, Name: "按点击计费" }, { Id: 3, Name: "自由分享" }]

        scope.advid = route.advid;
        scope.data = {};
        scope.minPoint = 0.5;

        scope.isSetOccupation = false;
        scope.isSetIncome = false;
        scope.isSetBirthday = false;
        scope.isSetGender = false;
        scope.isSetLike = false;

        scope.data.Gender = 0;
        scope.data.IsLBS = false;
        scope.data.PutProvince = "选择省";
        scope.data.PutCity = "选择市";
        scope.data.PutArea = "选择区";

        scope.getadvdetails = function () {
            //scope.data.Gender = 0;
            http.post("/advertising/AdvDetailsCommon", { advertisingId: scope.advid })
            .success(function (data) {
                scope.data = data;
                //scope.data.DateRange = [data.StartTime, data.EndTime].join('~').trim('~');
                scope.data.StartTime = scope.data.StartTime.toDateFormat("yyyy-MM-dd hh:mm");
                scope.data.EndTime = scope.data.EndTime.toDateFormat("yyyy-MM-dd hh:mm");
                iniPageInfo();
                iniConfig();


            })
        }
        scope.getadvdetails();

        scope.selectOccupation = function (occupation) {
            occupation.selected = !occupation.selected;
            if (occupation.selected && occupation.name != "不限") {
                if (!scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetOccupation = true;
                }
                scope.occupations.where(function (o) {
                    return o.name == "不限";
                })[0].selected = false;
            }
            if (occupation.selected && occupation.name == "不限") {
                if (scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetOccupation = false;
                }
                scope.occupations.forEach(function (o) {
                    if (o.name != "不限") {
                        o.selected = false;
                    }
                })
            }
        }
        scope.selectIncome = function (income) {
            income.selected = !income.selected;
            if (income.selected && income.name != "不限") {
                if (!scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetIncome = true;
                }
                scope.incomes.where(function (c) {
                    return c.name == "不限";
                })[0].selected = false;
            }
            if (income.selected && income.name == "不限") {
                if (scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetIncome = false;
                }
                scope.incomes.forEach(function (c) {
                    if (c.name != "不限") {
                        c.selected = false;
                    }
                })
            }
        }
        scope.selectBirthday = function (birthday) {
            birthday.selected = !birthday.selected;
            if (birthday.selected && birthday.name != "不限") {
                if (!scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetBirthday = true;
                }
                scope.birthdays.where(function (b) {
                    return b.name == "不限";
                })[0].selected = false;
            }
            if (birthday.selected && birthday.name == "不限") {
                if (scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetBirthday = false;
                }
                scope.birthdays.forEach(function (b) {
                    if (b.name != "不限") {
                        b.selected = false;
                    }
                })
            }
        }
        scope.selectLike = function (like) {
            like.selected = !like.selected;
            if (like.selected && like.name != "不限") {
                if (!scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetLike = true;
                }
                scope.likes.where(function (l) {
                    return l.name == "不限";
                })[0].selected = false;
            }
            if (like.selected && like.name == "不限") {
                if (scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetLike = false;
                }
                scope.likes.forEach(function (l) {
                    if (l.name != "不限") {
                        l.selected = false;
                    }
                })
            }
        }
        scope.selectGender = function (gender) {
            if (!gender.selected) {
                gender.selected = !gender.selected;
                if (gender.name != "不限") {
                    if (!scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                    }
                }
                if (gender.name == "不限") {
                    if (scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                        scope.isSetGender = false;
                    }
                }
                scope.genders = scope.genders.forEach(function (g) {
                    if (g.value != gender.value) {
                        g.selected = false;
                    }
                });
            }
        }
        scope.$watch("data.PutProvince", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue == "选择省") {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetProvince = false;
                }
                else if (oldValue == "选择省") {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetProvince = true;
                }
            }
        })
        scope.$watch("data.IsLBS", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                }
                else {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                }
            }
        })

        scope.ReturnToMap = function () {
            if (scope.data.PutArea != "选择区") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity + scope.data.PutArea)
            }
            else if (scope.data.PutCity != "选择市") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity)
            }
            else if (scope.data.PutProvince != "选择省") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince)
            }
            else {
                window.open('/advertising/baidumap?key=杭州')
            }

        }
        window.setPosition = function (x, y) {
            //alert(x);
            scope.data.Lng = x;

            scope.data.Lat = y;
            scope.$apply();
        }

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            if (!scope.isFirstInit) {
                scope.data.PutCity = "选择市";
                scope.data.PutArea = "选择区";
            }
            getCity();

        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];
        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, { Code: "", Name: "选择省" });
                    scope.prochange();
                }


            });

        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, { Code: "", Name: "选择市" });
                        scope.citychange();
                    }

                });
            }
            else {
                scope.citys = [{ Code: "", Name: "选择市" }];
            }

        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, { Code: "", Name: "选择区" });
                    }

                });
            }
            else {
                scope.areas = [{ Code: "", Name: "选择区" }];
            }
            if (scope.isFirstInit) {
                scope.isFirstInit = false;
            }
        }

        // 初始化配置
        function iniConfig() {
            if (scope.data.Occupation != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetOccupation = true;
                scope.occupations.forEach(function (o) {
                    if (o.name == "不限") {
                        o.selected = false;
                    }
                });
                var selectOccupation = scope.data.Occupation.split(',');
                selectOccupation.forEach(function (so) {
                    scope.occupations.forEach(function (o) {
                        if (o.name == so) {
                            o.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Income != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetIncome = true;
                scope.incomes.forEach(function (i) {
                    if (i.name == "不限") {
                        i.selected = false;
                    }
                });
                var selectIncome = scope.data.Income.split(',');
                selectIncome.forEach(function (si) {
                    scope.incomes.forEach(function (i) {
                        if (i.value == si) {
                            i.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Birthday != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetBirthday = true;
                scope.birthdays.forEach(function (b) {
                    if (b.name == "不限") {
                        b.selected = false;
                    }
                });
                var selectBirthday = scope.data.Birthday.split(',');
                selectBirthday.forEach(function (sb) {
                    scope.birthdays.forEach(function (b) {
                        if (b.value == sb) {
                            b.selected = true;
                        }
                    });
                })
            }

            scope.genders.forEach(function (b) {
                if (b.value == scope.data.Gender) {
                    b.selected = true;
                    if (b.value != 0) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                        scope.genders.forEach(function (g) {
                            if (g.name == "不限") {
                                g.selected = false;
                            }
                        });
                    }
                }
            });

            if (scope.data.Likes != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetLike = true;
                scope.likes.forEach(function (l) {
                    if (l.name == "不限") {
                        l.selected = false;
                    }
                });
                var selectLikes = scope.data.Likes.split(',');
                selectLikes.forEach(function (sl) {
                    scope.likes.forEach(function (l) {
                        if (l.value == sl) {
                            l.selected = true;
                        }
                    });
                })
            }

        }
        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }

        scope.setTitlePicUrl = function (url) {
            scope.data.TitlePicUrl = url;
            scope.$apply();
        }
        // 设置微信二维码
        scope.setWechatQRCode = function (desc) {
            scope.data.KeyWords = desc;
            scope.$apply();
        }
        // 微信公众号描述
        //scope.setDescription = function (desc) {
        //    scope.data.Description = desc;
        //}
        scope.setDescription = function (desc) {
            if (desc) {
                scope.data.Description = desc;
            }
            else {
                return scope.data.Description;
            }
    }
        // 要求描述
        scope.setTaskRule = function (desc) {
            if(desc) {
                scope.data.TaskRule = desc;
        }
            else {
                return scope.data.TaskRule;
            }
        }

        scope.ReturnToView = function () {
            if (!scope.data.Point || scope.data.Point < scope.minPoint) {
                alert("请设置单价，最低 " + scope.minPoint + " 元");
                return;
            }
            http.post("/advertising/regpublish", { model: scope.data, isPublish: false })
            .success(function (data) {
                if (data.CodeStatus != "200") {
                    alert(data.ErrorMessage);
                }
                else {
                    scope.IsAdd = false;
                }

            });
        }
        scope.ReturnToAdd = function () {
            scope.IsAdd = true;
        }
        /**
         * 保存推广
         */
        scope.saveAdvert = function () {
            scope.data.Occupation = scope.occupations.where(function (o) { return o.selected; }).select(function (o) { return o.name; }).join(",");
            scope.data.Income = scope.incomes.where(function (i) { return i.selected; }).select(function (i) { return i.value; }).join(",");
            scope.data.Birthday = scope.birthdays.where(function (b) { return b.selected; }).select(function (b) { return b.value; }).join(",");
            scope.data.Gender = scope.genders.where(function (g) { return g.selected; }).select(function (g) { return g.value; }).join(",");
            scope.data.Likes = scope.likes.where(function (l) { return l.selected; }).select(function (l) { return l.name; }).join(",");
            var params = {
                model: scope.data,
                advid: scope.advid
            }
            http.post("/advertising/update", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("修改成功");
                    window.location.href = "/advertising";

                }
                else {
                    alert(data.ErrorMessage);
                }
            });
        }

    }])
    
     // 编辑分享朋友圈推广
    .controller("advertmomentedit", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.isFirstInit = true;
        scope.IsAdd = true;
        scope.isEdit = true;

        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;
        scope.calculateTypeIds = [{ Id: -1, Name: "选择计费方式" }, { Id: 1, Name: "按截图计费" }, { Id: 2, Name: "按点击计费" }, { Id: 3, Name: "自由分享" }]
        
        scope.advid = route.advid;
        scope.data = {};
        scope.minPoint = 0.5;        

        scope.isSetOccupation = false;
        scope.isSetIncome = false;
        scope.isSetBirthday = false;
        scope.isSetGender = false;
        scope.isSetLike = false;

        scope.data.Gender = 0;
        scope.data.IsLBS = false;
        scope.data.PutProvince = "选择省";
        scope.data.PutCity = "选择市";
        scope.data.PutArea = "选择区";

        scope.getadvdetails = function () {
            //scope.data.Gender = 0;
            http.post("/advertising/AdvDetailsCommon", { advertisingId: scope.advid })
            .success(function (data) {
                scope.data = data;
                //scope.data.DateRange = [data.StartTime, data.EndTime].join('~').trim('~');
                scope.data.StartTime = scope.data.StartTime.toDateFormat("yyyy-MM-dd hh:mm");
                scope.data.EndTime = scope.data.EndTime.toDateFormat("yyyy-MM-dd hh:mm");
                iniPageInfo();                
                iniConfig();
                

            })
        }
        scope.getadvdetails();

        scope.selectOccupation = function (occupation) {
            occupation.selected = !occupation.selected;
            if (occupation.selected && occupation.name != "不限") {
                if (!scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetOccupation = true;
                }
                scope.occupations.where(function (o) {
                    return o.name == "不限";
                })[0].selected = false;
            }
            if (occupation.selected && occupation.name == "不限") {
                if (scope.isSetOccupation) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetOccupation = false;
                }
                scope.occupations.forEach(function (o) {
                    if (o.name != "不限") {
                        o.selected = false;
                    }
                })
            }
        }
        scope.selectIncome = function (income) {
            income.selected = !income.selected;
            if (income.selected && income.name != "不限") {
                if (!scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetIncome = true;
                }
                scope.incomes.where(function (c) {
                    return c.name == "不限";
                })[0].selected = false;
            }
            if (income.selected && income.name == "不限") {
                if (scope.isSetIncome) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetIncome = false;
                }
                scope.incomes.forEach(function (c) {
                    if (c.name != "不限") {
                        c.selected = false;
                    }
                })
            }
        }
        scope.selectBirthday = function (birthday) {
            birthday.selected = !birthday.selected;
            if (birthday.selected && birthday.name != "不限") {
                if (!scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetBirthday = true;
                }
                scope.birthdays.where(function (b) {
                    return b.name == "不限";
                })[0].selected = false;
            }
            if (birthday.selected && birthday.name == "不限") {
                if (scope.isSetBirthday) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetBirthday = false;
                }
                scope.birthdays.forEach(function (b) {
                    if (b.name != "不限") {
                        b.selected = false;
                    }
                })
            }
        }
        scope.selectLike = function (like) {
            like.selected = !like.selected;
            if (like.selected && like.name != "不限") {
                if (!scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetLike = true;
                }
                scope.likes.where(function (l) {
                    return l.name == "不限";
                })[0].selected = false;
            }
            if (like.selected && like.name == "不限") {
                if (scope.isSetLike) {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetLike = false;
                }
                scope.likes.forEach(function (l) {
                    if (l.name != "不限") {
                        l.selected = false;
                    }
                })
            }
        }
        scope.selectGender = function (gender) {
            if (!gender.selected) {
                gender.selected = !gender.selected;
                if (gender.name != "不限") {
                    if (!scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                    }
                }
                if (gender.name == "不限") {
                    if (scope.isSetGender) {
                        scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                        scope.isSetGender = false;
                    }
                }
                scope.genders = scope.genders.forEach(function (g) {
                    if (g.value != gender.value) {
                        g.selected = false;
                    }
                });
            }
        }
        scope.$watch("data.PutProvince", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue == "选择省") {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                    scope.isSetProvince = false;
                }
                else if (oldValue == "选择省") {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                    scope.isSetProvince = true;
                }
            }
        })
        scope.$watch("data.IsLBS", function (newVlaue, oldValue) {
            if (!(newVlaue == oldValue)) {
                if (newVlaue) {
                    scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                }
                else {
                    scope.minPoint = Number((scope.minPoint - 0.3).toFixed(1));
                }
            }
        })

        scope.ReturnToMap = function () {
            if (scope.data.PutArea != "选择区") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity + scope.data.PutArea)
            }
            else if (scope.data.PutCity != "选择市") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince + scope.data.PutCity)
            }
            else if (scope.data.PutProvince != "选择省") {
                window.open('/advertising/baidumap?key=' + scope.data.PutProvince)
            }
            else {
                window.open('/advertising/baidumap?key=杭州')
            }

        }
        window.setPosition = function (x, y) {
            //alert(x);
            scope.data.Lng = x;

            scope.data.Lat = y;
            scope.$apply();
        }

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            if (!scope.isFirstInit) {
                scope.data.PutCity = "选择市";
                scope.data.PutArea = "选择区";
            }
            getCity();

        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];
        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, { Code: "", Name: "选择省" });
                    scope.prochange();
                }


            });

        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, { Code: "", Name: "选择市" });
                        scope.citychange();
                    }

                });
            }
            else {
                scope.citys = [{ Code: "", Name: "选择市" }];
            }

        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, { Code: "", Name: "选择区" });
                    }

                });
            }
            else {
                scope.areas = [{ Code: "", Name: "选择区" }];
            }
            if (scope.isFirstInit) {
                scope.isFirstInit = false;
            }
        }

        // 初始化配置
        function iniConfig() {
            if (scope.data.Occupation != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetOccupation = true;
                scope.occupations.forEach(function (o) {
                    if (o.name == "不限") {
                        o.selected = false;
                    }
                });
                var selectOccupation = scope.data.Occupation.split(',');
                selectOccupation.forEach(function (so) {
                    scope.occupations.forEach(function (o) {
                        if (o.name == so) {
                            o.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Income != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetIncome = true;
                scope.incomes.forEach(function (i) {
                    if (i.name == "不限") {
                        i.selected = false;
                    }
                });
                var selectIncome = scope.data.Income.split(',');
                selectIncome.forEach(function (si) {
                    scope.incomes.forEach(function (i) {
                        if (i.value == si) {
                            i.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Birthday != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetBirthday = true;
                scope.birthdays.forEach(function (b) {
                    if (b.name == "不限") {
                        b.selected = false;
                    }
                });
                var selectBirthday = scope.data.Birthday.split(',');
                selectBirthday.forEach(function (sb) {
                    scope.birthdays.forEach(function (b) {
                        if (b.value == sb) {
                            b.selected = true;
                        }
                    });
                })
            }

            scope.genders.forEach(function (b) {
                if (b.value == scope.data.Gender) {
                    b.selected = true;
                    if (b.value != 0) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                        scope.genders.forEach(function (g) {
                            if (g.name == "不限") {
                                g.selected = false;
                            }
                        });
                    }
                }
            });

            if (scope.data.Likes != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetLike = true;
                scope.likes.forEach(function (l) {
                    if (l.name == "不限") {
                        l.selected = false;
                    }
                });
                var selectLikes = scope.data.Likes.split(',');
                selectLikes.forEach(function (sl) {
                    scope.likes.forEach(function (l) {
                        if (l.value == sl) {
                            l.selected = true;
                        }
                    });
                })
            }
           
        }
        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }


        // 题目类型
        scope.shareTypes = [{ key: 1, value: "自定义内容" }, { key: 2, value: "URL链接" }];

        scope.setTitlePicUrl = function (url) {
            scope.data.TitlePicUrl = url;
            scope.$apply();
        }
        // 设置微信二维码
        scope.setWechatQRCode = function (desc) {
            scope.data.KeyWords = desc;
            scope.$apply();
        }
        // 分享自定义内容
        scope.setContent = function (desc) {
            scope.data.ShareDesc.ShareContent = desc;
        }
        scope.setTaskRule = function (desc) {
            scope.data.TaskRule = desc;
        }

        scope.ReturnToView = function () {
            if (!scope.data.Point || scope.data.Point < scope.minPoint) {
                alert("请设置单价，最低 " + scope.minPoint + " 元");
                return;
            }           
            http.post("/advertising/regpublish", { model: scope.data, isPublish: false })
            .success(function (data) {
                if (data.CodeStatus != "200") {
                    alert(data.ErrorMessage);
                }
                else {
                    scope.IsAdd = false;
                }

            });
        }
        scope.ReturnToAdd = function () {
            scope.IsAdd = true;
        }        
        /**
         * 保存推广
         */
        scope.saveAdvert = function () {
            scope.data.Occupation = scope.occupations.where(function (o) { return o.selected; }).select(function (o) { return o.name; }).join(",");
            scope.data.Income = scope.incomes.where(function (i) { return i.selected; }).select(function (i) { return i.value; }).join(",");
            scope.data.Birthday = scope.birthdays.where(function (b) { return b.selected; }).select(function (b) { return b.value; }).join(",");
            scope.data.Gender = scope.genders.where(function (g) { return g.selected; }).select(function (g) { return g.value; }).join(",");
            scope.data.Likes = scope.likes.where(function (l) { return l.selected; }).select(function (l) { return l.name; }).join(",");
            var params = {
                model: scope.data,
                advid: scope.advid
            }
            http.post("/advertising/update", params)
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("修改成功");
                    window.location.href = "/advertising";

                }
                else {
                    alert(data.ErrorMessage);
                }
            });
        }

    }])

     //答题推广查看
    .controller("advertquestionview", ["$scope", "$http", '$routeParams', function (scope, http, route) {
        scope.isFirstInit = true;
        scope.IsAdd = false;
        scope.isEdit = false;
        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;


        scope.advid = route.advid;
        scope.data = {};

        scope.data.Gender = 0;
        scope.data.IsLBS = false;
        scope.data.PutProvince = "选择省";
        scope.data.PutCity = "选择市";
        scope.data.PutArea = "选择区";

        var Questions = [];
        var quesOptions = [];
        scope.getadvdetails = function () {
            //scope.data.Gender = 0;
            http.post("/advertising/AdvDetailsCommon", { advertisingId: scope.advid })
            .success(function (data) {
                scope.data = data;
                var answer = data.Questions[0].Answer;
                var obj = data.Questions[0].Options;
                jQuery.each(obj, function (key, val) {
                    if (answer.indexOf(key) == 0) {
                        quesOptions.push(new optionModel(key, val, true))
                    }
                    else {
                        quesOptions.push(new optionModel(key, val, false))
                    }
                });

                Questions.push(new questionModel(data.Questions[0].OrderNumber, data.Questions[0].Content, data.Questions[0].Type, quesOptions, data.Questions[0].Answer, data.Questions[0].Point))
                scope.data.Questions = Questions;
                scope.data.StartTime = scope.data.StartTime.toDateFormat("yyyy-MM-dd hh:mm");
                scope.data.EndTime = scope.data.EndTime.toDateFormat("yyyy-MM-dd hh:mm");

                iniPageInfo();
                iniConfig();


            })
        }
        scope.getadvdetails();

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            if (!scope.isFirstInit) {
                scope.data.PutCity = "选择市";
                scope.data.PutArea = "选择区";
            }
            getCity();

        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];
        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, { Code: "", Name: "选择省" });
                    scope.prochange();
                }


            });

        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, { Code: "", Name: "选择市" });
                        scope.citychange();
                    }

                });
            }
            else {
                scope.citys = [{ Code: "", Name: "选择市" }];
            }

        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, { Code: "", Name: "选择区" });
                    }

                });
            }
            else {
                scope.areas = [{ Code: "", Name: "选择区" }];
            }
            if (scope.isFirstInit) {
                scope.isFirstInit = false;
            }
        }

        // 初始化配置
        function iniConfig() {
            if (scope.data.Occupation != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetOccupation = true;
                scope.occupations.forEach(function (o) {
                    if (o.name == "不限") {
                        o.selected = false;
                    }
                });
                var selectOccupation = scope.data.Occupation.split(',');
                selectOccupation.forEach(function (so) {
                    scope.occupations.forEach(function (o) {
                        if (o.name == so) {
                            o.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Income != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetIncome = true;
                scope.incomes.forEach(function (i) {
                    if (i.name == "不限") {
                        i.selected = false;
                    }
                });
                var selectIncome = scope.data.Income.split(',');
                selectIncome.forEach(function (si) {
                    scope.incomes.forEach(function (i) {
                        if (i.value == si) {
                            i.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Birthday != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetBirthday = true;
                scope.birthdays.forEach(function (b) {
                    if (b.name == "不限") {
                        b.selected = false;
                    }
                });
                var selectBirthday = scope.data.Birthday.split(',');
                selectBirthday.forEach(function (sb) {
                    scope.birthdays.forEach(function (b) {
                        if (b.value == sb) {
                            b.selected = true;
                        }
                    });
                })
            }

            scope.genders.forEach(function (b) {
                if (b.value == scope.data.Gender) {
                    b.selected = true;
                    if (b.value != 0) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                        scope.genders.forEach(function (g) {
                            if (g.name == "不限") {
                                g.selected = false;
                            }
                        });
                    }
                }
            });

            if (scope.data.Likes != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetLike = true;
                scope.likes.forEach(function (l) {
                    if (l.name == "不限") {
                        l.selected = false;
                    }
                });
                var selectLikes = scope.data.Likes.split(',');
                selectLikes.forEach(function (sl) {
                    scope.likes.forEach(function (l) {
                        if (l.value == sl) {
                            l.selected = true;
                        }
                    });
                })
            }

        }
        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }

        /**
         * 选项模型
         * @param key 选项号 A/B/C/D
         * @param value 选项内容
         */
        function optionModel(key, value, isanswer) {
            this.key = key;
            this.value = value;
            this.isanswer = isanswer;
        }

        /**
         * 问题模型
         * @param ordernumber
         * @param title
         * @param type
         * @param options
         * @param answer
         * @param point
         */
        function questionModel(ordernumber, title, type, options, answer, point) {

            this.OrderNumber = ordernumber;
            this.Title = title;
            this.Type = type;
            this.Options = {},
            this.quesOptions = options;
            this.Answer = answer;
            this.Point = point;
            /**
             * 添加选项
             */
            this.addOption = function () {
                this.quesOptions.push(new optionModel(String.fromCharCode(65 + this.quesOptions.length), ""));
            }
            /**
             * 移除选项
             * @param option
             */
            this.removeOption = function (option) {
                this.quesOptions.remove(option);
                for (var i = 0; i < this.quesOptions.length; i++) {
                    this.quesOptions[i].key = String.fromCharCode(65 + i)
                }
            }
            /**
             * 选择选项
             * @param option
             */
            this.clickOption = function (option) {
                if (this.Type == 1) {
                    // 单选
                    this.quesOptions.forEach(function (o) {
                        if (o == option) {
                            o.isanswer = true;
                        }
                        else {
                            o.isanswer = false;
                        }
                    })
                }
                else {
                    // 多选
                    option.isanswer = !option.isanswer;

                }
            }
        }

    }])
    //关注公众号推广查看
    .controller("advertwechantview", ["$scope", "$http", '$routeParams', function (scope, http, route) {
        scope.isFirstInit = true;
        scope.IsAdd = false;
        scope.isEdit = false;
        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;
        scope.calculateTypeIds = [{ Id: -1, Name: "选择计费方式" }, { Id: 1, Name: "按截图计费" }, { Id: 2, Name: "按点击计费" }, { Id: 3, Name: "自由分享" }]

        scope.advid = route.advid;
        scope.data = {};

        scope.data.Gender = 0;
        scope.data.IsLBS = false;
        scope.data.PutProvince = "选择省";
        scope.data.PutCity = "选择市";
        scope.data.PutArea = "选择区";
        scope.getadvdetails = function () {
            //scope.data.Gender = 0;
            http.post("/advertising/AdvDetailsCommon", { advertisingId: scope.advid })
            .success(function (data) {
                scope.data = data;
                scope.data.StartTime = scope.data.StartTime.toDateFormat("yyyy-MM-dd hh:mm");
                scope.data.EndTime = scope.data.EndTime.toDateFormat("yyyy-MM-dd hh:mm");

                iniPageInfo();
                iniConfig();


            })
        }
        scope.getadvdetails();

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            if (!scope.isFirstInit) {
                scope.data.PutCity = "选择市";
                scope.data.PutArea = "选择区";
            }
            getCity();

        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];
        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, { Code: "", Name: "选择省" });
                    scope.prochange();
                }


            });

        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, { Code: "", Name: "选择市" });
                        scope.citychange();
                    }

                });
            }
            else {
                scope.citys = [{ Code: "", Name: "选择市" }];
            }

        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, { Code: "", Name: "选择区" });
                    }

                });
            }
            else {
                scope.areas = [{ Code: "", Name: "选择区" }];
            }
            if (scope.isFirstInit) {
                scope.isFirstInit = false;
            }
        }

        // 初始化配置
        function iniConfig() {
            if (scope.data.Occupation != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetOccupation = true;
                scope.occupations.forEach(function (o) {
                    if (o.name == "不限") {
                        o.selected = false;
                    }
                });
                var selectOccupation = scope.data.Occupation.split(',');
                selectOccupation.forEach(function (so) {
                    scope.occupations.forEach(function (o) {
                        if (o.name == so) {
                            o.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Income != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetIncome = true;
                scope.incomes.forEach(function (i) {
                    if (i.name == "不限") {
                        i.selected = false;
                    }
                });
                var selectIncome = scope.data.Income.split(',');
                selectIncome.forEach(function (si) {
                    scope.incomes.forEach(function (i) {
                        if (i.value == si) {
                            i.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Birthday != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetBirthday = true;
                scope.birthdays.forEach(function (b) {
                    if (b.name == "不限") {
                        b.selected = false;
                    }
                });
                var selectBirthday = scope.data.Birthday.split(',');
                selectBirthday.forEach(function (sb) {
                    scope.birthdays.forEach(function (b) {
                        if (b.value == sb) {
                            b.selected = true;
                        }
                    });
                })
            }

            scope.genders.forEach(function (b) {
                if (b.value == scope.data.Gender) {
                    b.selected = true;
                    if (b.value != 0) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                        scope.genders.forEach(function (g) {
                            if (g.name == "不限") {
                                g.selected = false;
                            }
                        });
                    }
                }
            });

            if (scope.data.Likes != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetLike = true;
                scope.likes.forEach(function (l) {
                    if (l.name == "不限") {
                        l.selected = false;
                    }
                });
                var selectLikes = scope.data.Likes.split(',');
                selectLikes.forEach(function (sl) {
                    scope.likes.forEach(function (l) {
                        if (l.value == sl) {
                            l.selected = true;
                        }
                    });
                })
            }

        }
        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }

        scope.setTitlePicUrl = function (url) {
            scope.data.TitlePicUrl = url;
            scope.$apply();
        }
        // 设置微信二维码
        scope.setWechatQRCode = function (desc) {
            scope.data.KeyWords = desc;
            scope.$apply();
        }
       
        // 要求描述
        scope.setTaskRule = function (desc) {
            scope.data.TaskRule = desc;
        }

    }])
    //分享朋友圈推广查看
    .controller("advertmomentview", ["$scope", "$http", '$routeParams', function (scope, http, route) {
        scope.isFirstInit = true;
        scope.IsAdd = false;
        scope.isEdit = false;
        scope.occupations = Occupations;
        scope.incomes = Incomes;
        scope.birthdays = Birthdays;
        scope.genders = Genders;
        scope.likes = Likes;
        scope.calculateTypeIds = [{ Id: -1, Name: "选择计费方式" }, { Id: 1, Name: "按截图计费" }, { Id: 2, Name: "按点击计费" }, { Id: 3, Name: "自由分享" }]
        
        scope.advid = route.advid;
        scope.data = {};

        scope.data.Gender = 0;
        scope.data.IsLBS = false;
        scope.data.PutProvince = "选择省";
        scope.data.PutCity = "选择市";
        scope.data.PutArea = "选择区";
        scope.getadvdetails = function () {
            //scope.data.Gender = 0;
            http.post("/advertising/AdvDetailsCommon", { advertisingId: scope.advid })
            .success(function (data) {
                scope.data = data;
                scope.data.StartTime = scope.data.StartTime.toDateFormat("yyyy-MM-dd hh:mm");
                scope.data.EndTime = scope.data.EndTime.toDateFormat("yyyy-MM-dd hh:mm");

                iniPageInfo();
                iniConfig();


            })
        }
        scope.getadvdetails();       

        scope.provinces = [{ Code: "", Name: "选择省" }];
        scope.prochange = function () {
            if (!scope.isFirstInit) {
                scope.data.PutCity = "选择市";
                scope.data.PutArea = "选择区";
            }
            getCity();

        }
        scope.citys = [{ Code: "", Name: "选择市" }];
        scope.citychange = function () {
            getArea();
        }
        scope.areas = [{ Code: "", Name: "选择区" }];
        // 获取省
        function getProvince() {
            http.post("/advertising/getareas", { areacode: "" })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    scope.provinces = data.Data;
                    scope.provinces.insert(0, { Code: "", Name: "选择省" });
                    scope.prochange();
                }


            });

        }
        // 获取市
        function getCity() {
            var pros = scope.provinces.where(function (v) {
                return v.Name == scope.data.PutProvince;
            });
            if (pros.length > 0 && pros[0].Code != "") {
                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.citys = data.Data;
                        scope.citys.insert(0, { Code: "", Name: "选择市" });
                        scope.citychange();
                    }

                });
            }
            else {
                scope.citys = [{ Code: "", Name: "选择市" }];
            }

        }
        // 获取区
        function getArea() {
            var pros = scope.citys.where(function (v) {
                return v.Name == scope.data.PutCity;
            });
            if (pros.length > 0 && pros[0].Code != "") {

                http.post("/advertising/getareas", { areacode: pros[0].Code })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        scope.areas = data.Data;
                        scope.areas.insert(0, { Code: "", Name: "选择区" });
                    }

                });
            }
            else {
                scope.areas = [{ Code: "", Name: "选择区" }];
            }
            if (scope.isFirstInit) {
                scope.isFirstInit = false;
            }
        }

        // 初始化配置
        function iniConfig() {
            if (scope.data.Occupation != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetOccupation = true;
                scope.occupations.forEach(function (o) {
                    if (o.name == "不限") {
                        o.selected = false;
                    }
                });
                var selectOccupation = scope.data.Occupation.split(',');
                selectOccupation.forEach(function (so) {
                    scope.occupations.forEach(function (o) {
                        if (o.name == so) {
                            o.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Income != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetIncome = true;
                scope.incomes.forEach(function (i) {
                    if (i.name == "不限") {
                        i.selected = false;
                    }
                });
                var selectIncome = scope.data.Income.split(',');
                selectIncome.forEach(function (si) {
                    scope.incomes.forEach(function (i) {
                        if (i.value == si) {
                            i.selected = true;
                        }
                    });
                })
            }

            if (scope.data.Birthday != "0") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetBirthday = true;
                scope.birthdays.forEach(function (b) {
                    if (b.name == "不限") {
                        b.selected = false;
                    }
                });
                var selectBirthday = scope.data.Birthday.split(',');
                selectBirthday.forEach(function (sb) {
                    scope.birthdays.forEach(function (b) {
                        if (b.value == sb) {
                            b.selected = true;
                        }
                    });
                })
            }

            scope.genders.forEach(function (b) {
                if (b.value == scope.data.Gender) {
                    b.selected = true;
                    if (b.value != 0) {
                        scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                        scope.isSetGender = true;
                        scope.genders.forEach(function (g) {
                            if (g.name == "不限") {
                                g.selected = false;
                            }
                        });
                    }
                }
            });

            if (scope.data.Likes != "不限") {
                scope.minPoint = Number((scope.minPoint + 0.3).toFixed(1));
                scope.isSetLike = true;
                scope.likes.forEach(function (l) {
                    if (l.name == "不限") {
                        l.selected = false;
                    }
                });
                var selectLikes = scope.data.Likes.split(',');
                selectLikes.forEach(function (sl) {
                    scope.likes.forEach(function (l) {
                        if (l.value == sl) {
                            l.selected = true;
                        }
                    });
                })
            }

        }
        // 初始化页面数据
        function iniPageInfo() {
            getProvince();
        }


        // 题目类型
        scope.shareTypes = [{ key: 1, value: "自定义内容" }, { key: 2, value: "URL链接" }];

        scope.setTitlePicUrl = function (url) {
            scope.data.TitlePicUrl = url;
            scope.$apply();
        }
        // 设置微信二维码
        scope.setWechatQRCode = function (desc) {
            scope.data.KeyWords = desc;
            scope.$apply();
        }
        // 分享自定义内容
        scope.setContent = function (desc) {
            scope.data.ShareDesc.ShareContent = desc;
        }
        // 要求描述
        scope.setTaskRule = function (desc) {
            scope.data.TaskRule = desc;
        }
      
        
     }])

    .controller("advdescription", ["$scope", "$http", '$routeParams', function (scope, http, route) {
        scope.advertisingId = route.advertisingId;
        scope.advType = route.advType;
        scope.getdetails = function (advertisingId) {
            if (scope.advType == 1) {
                http.post("/advertising/SelectQuestionAdvById", { advid: scope.advertisingId })
                .success(function (data) {
                    scope.Description = data.Description;
                });
            }
            if (scope.advType == 5) {
                http.post("/advertising/SelectWechatAdvById", { advid: scope.advertisingId })
                .success(function (data) {
                    scope.Description = data.Description;
                });
            }

        }
        scope.getdetails(scope.AdvertisingId);

    }])

    // 推广列表
    .controller("advertlist", ["$scope", "$http", function (scope, http) {
        scope.DateRange = "";
        scope.BASE_CDN = BASE_CDN;
        scope.searchadvType = "-1";
        scope.searchadvStatus = "-1";
        scope.calculateTypeId = -1;
        scope.pageSize = 20;
        scope.list = [];
        scope.calculateTypeIds = [{ Id: -1, Name: "选择计费方式" }, { Id: 1, Name: "按截图计费" }, { Id: 2, Name: "按点击计费" }, { Id: 3, Name: "自由分享" }]
        scope.calculateType = function (id) {
            return scope.calculateTypeIds.where(function (v) { return v.Id == id })[0].Name;
        }


        var advTypesArr = {
            1: "答题推广",
            5: "关注公众号",
            8: "分享朋友圈"
        };
        scope.advTypes = advTypesArr;
        scope.advType = function (id) {
            /// <summary>
            /// 推广类型
            /// </summary>
            /// <param name="id"></param>
            return advTypesArr[id];
        }

        var advStatusArr = {
            0: "未审核",
            1: "未开始",
            2: "推广中",
            3: "已结束",
            4: "已暂停",
            5: "不通过"
        }
        scope.advStatuss = advStatusArr;
        scope.advStatus = function (id) {
            /// <summary>
            /// 推广状态
            /// </summary>
            /// <param name="id"></param>
            return advStatusArr[id];
        }

        scope.getlist = function (page) {
            http.post("/advertising/advlist", { dateRange: scope.DateRange, advType: scope.searchadvType, advStatus: scope.searchadvStatus,calculateTypeId:scope.calculateTypeId, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.pager.init(data.Data.TotalCount);
                scope.list = data.Data.Items;
            })
        }

        scope.pager = new Pager(function (page) {
            scope.getlist(page);
        }, scope.pageSize, 1);

        scope.search = function () {
            scope.pager = new Pager(function (page) {
                scope.getlist(page);
            }, scope.pageSize, 1);
        }

        scope.searchDateChange = function (addDaysCount) {
            if (addDaysCount == 0) {
                scope.DateRange = new Date().addDays(0);
            }
            else {
                scope.DateRange = new Date().addDays(addDaysCount) + "~" + new Date().addDays(0)
            }

            scope.search();
        }
        scope.searchAll = function () {
            scope.DateRange = "";
            scope.search();
        }

        scope.setAdvStatus = function (item) {
            var i = $.layer({
                shade: [0],
                area: ['auto', 'auto'],
                dialog: {
                    title: false,
                    msg: '是否确定操作？',
                    btns: 2,
                    type: 4,
                    btn: ['确定', '取消'],
                    yes: function () {
                        http.post("/advertising/setAdvStatus", { advid: item.AdvertisingId })
                        .success(function (data) {
                            if (data.CodeStatus == "200") {
                                //item.StatusId = 3;
                                scope.pager.refresh();
                                layer.msg("设置成功", 1, 1);

                            }
                            else {
                                layer.msg("异常，请刷新重试");
                            }

                            layer.close(i);
                        });

                    }, no: function () {
                        layer.close(i);

                    }
                }
            });

        }
        scope.isShow = false;
        scope.advertisingId = 0;
        scope.IncreaseNumber = "";
        scope.openIncreace = function (advertisingId) {
            scope.isShow = true;
            scope.advertisingId = advertisingId;
        }
        scope.Close = function () {
            scope.isShow = false;
            scope.advertisingId = 0;
        }
        scope.increaseBudget = function () {
            http.post("/advertising/increasebudget", { advertisingId: scope.advertisingId, increaseNumber: scope.IncreaseNumber })
            .success(function (data) {
                if (data.CodeStatus == "200") {
                    alert("增加预算成功");
                    scope.isShow = false;
                    scope.advertisingId = 0;
                }
                else {
                    alert(data.ErrorMessage);
                }
            })
        }
    }])
    //审核列表
    .controller("attentionList", ["$scope", "$http", '$routeParams', function (scope, http, route) {

        scope.DateRange = new Date().addDays(0);

        //查询项
        scope.AdvertisingId = route.avid;
        scope.StatusType = "-1";
        scope.LddUserName = "";
        scope.pageSize = 20;
        //审核时间
        scope.MerchantAuditMinutes = 30;
        //全选、单选
        scope.CheckAll = false;
        scope.IsChecked = false;//默认未选中
        // 弹出层
        scope.isShow = false;
        //scope.isView = false;
        scope.lddUserAttentionId = 0;
        scope.rejectReason = null;
        scope.rejectTime = "";
        scope.appeal = null;
        scope.appealTime = "";
        scope.remark = null;
        scope.passTime = "";



        scope.BASE_CDN = BASE_CDN;

        scope.TitlePicURL = "";
        scope.AdvertisingTitle = "";
        scope.KeyWords1 = "";
        scope.list = [];

        //任务状态
        var statuIds = {
            1: "已领取",
            2: "申诉中",
            3: "已上传",
            4: "已通过",
            5: "商户驳回",
            6: "审核不通过",
            7: "已过期"
        };
        scope.StatuIds = statuIds;
        scope.status = function (id) {
            return statuIds[id];
        }

        //审核状态
        var statuTypes = {
            1: "审核中",
            2: "已通过",
            3: "不合格",
            4: "申诉中"
        };
        scope.StatusTypes = statuTypes;


        //scope.pages = 0;
        //关注列表
        scope.getlist = function (scope, page) {
            http.post("/advertising/AttentionList", { DateRange: scope.DateRange, advId: scope.AdvertisingId, statustype: scope.StatusType, lddUserName: scope.LddUserName, currentPage: page, pageSize: scope.pageSize })
            .success(function (data) {
                scope.list = data.AttentionList;
                scope.TitlePicURL = data.TitlePicURL;
                scope.AdvertisingTitle = data.AdvertisingTitle;
                scope.KeyWords1 = data.KeyWords1;
                scope.MerchantAuditMinutes = data.MerchantAuditMinutes;

                scope.pager.init(data.TotalRecordCount);
                //scope.pages = scope.pager.pages;
            });
        }

        scope.pager = new Pager(function (page) {
            scope.getlist(scope, page);
        }, scope.pageSize, 1);

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

        //审核剩余时间
        scope.getRTime = function (UploadTime) {
            var EndTime = new Date(UploadTime);
            //EndTime.setDate(EndTime.getDate() + 30);
            EndTime.setMinutes(EndTime.getMinutes() + scope.MerchantAuditMinutes);
            var NowTime = new Date();
            var t = EndTime - NowTime.getTime();
            var d = Math.floor(t / 1000 / 60 / 60 / 24);
            var h = Math.floor(t / 1000 / 60 / 60 % 24);
            var m = Math.floor(t / 1000 / 60 % 60);
            var s = Math.floor(t / 1000 % 60);
            if (d < 0) {
                return "0 天 00 时 00分 00秒";
            }
            return d + " 天 " + h + " 时 " + m + " 分 " + s + " 秒";
        }
        scope.refresh = function () {
            angular.forEach(scope.list, function (data, index, array) {
                var time = scope.getRTime(data.UploadTime);
                scope.list[index].RestTime = time;
            })
            scope.$apply();
            // scope.$digest();
        };
        setInterval(scope.refresh, 1000);


        //全选、单选或者多选
        scope.checkluaids = "";
        scope.all = function (check) {//全选
            if (check == true) {
                scope.IsChecked = true;
                angular.forEach(scope.list, function (data, index, array) {
                    scope.checkluaids = scope.checkluaids + data["LddUserAttentionId"] + ",";
                });
            } else {
                scope.IsChecked = false;
                scope.checkluaids = "";
            }
        };
        scope.chk = function (item, ischecked) {//单选或者多选
            if (ischecked == true) {
                scope.checkluaids = scope.checkluaids + item["LddUserAttentionId"] + ',';
            } else {
                scope.checkluaids = scope.checkluaids.replace(item["LddUserAttentionId"] + ',', '');//取消选中
            }
        };

        //通过
        scope.Pass = function (lddUserAttentionIds) {
            if (confirm("确定通过？")) {
                http.post("/advertising/pass", { lddUserAttentionIds: lddUserAttentionIds })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        var ss = "," + lddUserAttentionIds + ",";
                        angular.forEach(scope.list, function (data, index, array) {
                            if (ss.indexOf("," + data.LddUserAttentionId + ",") != -1) {
                                data.StatusId = 4;
                            }
                        });
                        alert("审核成功");
                    }
                    else {
                        alert(data.ErrorMessage);
                    }
                    //scope.getlist(scope.AdvertisingId, scope.StatusType, scope.LddUserName);
                    scope.CheckAll = false;
                    scope.IsChecked = false;
                    scope.search();
                });
            }
            scope.checkluaids = "";
        }

        //获得各项说明
        scope.GetAttention = function (lddUserAttentionId) {
            http.post("/advertising/view", { lddUserAttentionId: lddUserAttentionId })
                        .success(function (data) {
                            //scope.lddUserAttentionId = lddUserAttentionId;
                            scope.lddUserTaskId = data.LddUserTaskId;
                            scope.rejectReason = data.RejectReason;
                            scope.rejectTime = data.RejectTime;
                            scope.appeal = data.Appeal;
                            scope.appealTime = data.AppealTime;
                            scope.remark = data.Remark;
                            scope.passTime = data.PassTime;
                        });
        }

        //不合格
        scope.OpenReject = function (lddUserAttentionId) {
            scope.isShow = true;
            scope.isView = false;
            scope.lddUserAttentionId = lddUserAttentionId;
            scope.GetAttention(lddUserAttentionId);

        }
        //View查看
        scope.ViewReject = function (lddUserAttentionId) {
            scope.isShow = true;
            scope.isView = true;
            scope.lddUserAttentionId = lddUserAttentionId;
            scope.GetAttention(lddUserAttentionId);
        }

        scope.CloseReject = function () {
            scope.lddUserAttentionId = 0;
            scope.isShow = false;
        }
        scope.Reject = function (lddUserAttentionId, remark) {
            if (confirm("确定不合格？")) {
                http.post("/advertising/Reject", { lddUserAttentionId: scope.lddUserAttentionId, remark: remark, lddUserTaskId: scope.lddUserTaskId })
                .success(function (data) {
                    if (data.CodeStatus == "200") {
                        angular.forEach(scope.list, function (data, index, array) {
                            if (data.LddUserAttentionId == lddUserAttentionId) {
                                data.StatusId = 5;
                            }
                        });
                        alert("审核成功");
                    }
                    else {
                        alert(data.ErrorMessage);
                    }
                    scope.isShow = false;
                    //scope.rejectReason = "";
                    // scope.getlist(scope.AdvertisingId, scope.StatusType, scope.LddUserName);
                    scope.search();
                });
            }
        }




    }])
    .controller("showlists", ["$scope", "$http", "$routeParams", function (scope, http, route) {
        scope.AdvertisingId = route.avid;
    }])
    //task表
   .controller("lddusertasklist", ["$scope", "$http", '$routeParams', function (scope, http, route) {
       scope.advertisingId = route.advertisingId
       scope.DateRange = new Date().addDays(-1);

       scope.currentPage = 1;
       scope.pageSize = 20;
       scope.list = [];
       var genders = {
           1: "男",
           2: "女",
           0: "不详"
       }
       scope.genders = genders;
       scope.gender = function (id) {
           return genders[id];
       }

       scope.getlist = function (page) {
           http.post("/advertising/LddUserTaskList", { dateRange: scope.DateRange, advertisingId: scope.advertisingId, currentPage: page, pageSize: scope.pageSize })
           .success(function (data) {
               scope.list = data.LddUseTaskList;
               scope.TodayCount = data.TodayCount;
               scope.YesterdayCount = data.YesterdayCount;
               scope.TotalCount = data.TotalCount;

               scope.pager.init(data.TotalRecordCount);
           })
       }

       scope.search = function () {
           scope.pager = new Pager(function (page) {
               scope.getlist(page);
           }, scope.pageSize, 1);
       }
       scope.search();

       scope.searchDateChange = function (addDaysCount) {
           if (addDaysCount == 0) {
               scope.DateRange = new Date().addDays(0);
           }
           else {
               scope.DateRange = new Date().addDays(addDaysCount) + "~" + new Date().addDays(0)
           }
           scope.search();
       }
       scope.$watch("DateRange", function (newVlaue, oldValue) {
           if (newVlaue != oldValue) {
               scope.search();
           }
       })

   }])

})();
