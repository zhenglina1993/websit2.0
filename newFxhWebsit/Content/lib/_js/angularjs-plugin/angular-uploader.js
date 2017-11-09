(function () {

    angular.module("uploader", [])
    .directive("uploader", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {

                var uploader = WebUploader.create({
                    // 选完文件后，是否自动上传。
                    auto: true,
                    // swf文件路径
                    swf: BASE_URL + '/Uploader.swf',
                    // 文件接收服务端。
                    server: '/file/upload',
                    // 只允许选择图片文件。
                    accept: {
                        title: '图片文件',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    }
                });

                uploader.addButton({
                    id: "#" + attrs.id,
                    innerHTML: "选择图片"
                });

                uploader.on("uploadSuccess", function (file, response) {
                    if (response.CodeStatus == "200") {
                        scope.$apply(attrs.uploader)(response.Data);
                    }
                    else {
                        ldd.ui.alert(response.ErrorMessage);
                    }
                });

                uploader.on("uploadError", function (file, reason) {

                });
            }
        };
    });
})();