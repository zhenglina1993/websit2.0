(function () {
    angular.module("kindeditor", [])
    //app.directive('relinkEvent', function($rootScope) {
    //    return {
    //        transclude: 'element',
    //        restrict: 'A',
    //        link: function(scope, element, attr, ctrl, transclude) {
    //            var previousContent = null;

    //            var triggerRelink = function() {
    //                if (previousContent) {
    //                    previousContent.remove();
    //                    previousContent = null;
    //                }

    //                transclude(function (clone) {
    //                    element.parent().append(clone);
    //                    previousContent = clone;
    //                });

    //            };

    //            triggerRelink();                
    //            $rootScope.$on(attr.relinkEvent, triggerRelink);

    //        }
    //    };

    //})
    .directive("kindeditor", ["$rootScope", function (rootScope) {
        return {
            restrict: "A",
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                // 将数据写入model
                function read() {
                    var html = editor.html();
                    ngModel.$setViewValue(html);
                }

                var editor;
                element.attr("id", attrs.id);
                editor = KindEditor.create("#" + attrs.id, {
                    uploadJson: '/file/keupload',
                    width: "60%",
                    height: "180px",
                    resizeType: 1,
                    allowPreviewEmoticons: false,
                    allowImageUpload: true,
                    items: [
                        'source', '|', 'quickformat',
                        'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                        'removeformat', 'clearhtml', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                        'insertunorderedlist', '|', 'image', 'link', '|', 'fullscreen'],
                    afterChange: function () {
                        // 监听change事件来开启绑定
                        if (editor) {
                            read();
                            //scope.$apply(read);
                        }
                    }
                });

                // 指定UI的更新方式
                ngModel.$render = function () {
                    editor.html(ngModel.$viewValue || '');
                };

                //setTimeout(function () {
                //    read();
                //},300);
                //read(); // 初始化


                //console.info(ngModel)

                //var setDesc = scope.$apply(attrs.kindeditor);

                //if (setDesc) {
                //    setTimeout(function () {
                //        if (editor.html() != setDesc()) {
                //            editor.html(setDesc());
                //        }

                //    }, 500);
                //}

                //scope.$watch(attrs.kindeditor, function (n, o) {
                //    console.info(n);
                //});
            }
        };
    }]);
})();