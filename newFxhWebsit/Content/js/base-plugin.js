function Pager(call, size, page) {
    /// <summary>
    /// 分页插件模型
    /// </summary>
    /// <param name="call">function (index){}</param>
    /// <param name="total">总条数</param>
    /// <param name="size">每页条数</param>
    /// <param name="page">当前页</param>
    this.page = page ? page : 1;
    this.call = call;
    this.size = size;
    this.pages = 0;
    this.total = 0;
    this.list = [];

    var self = this;
    this.init = function(total){
        /// <summary>
        /// 初始化
        /// </summary>
        /// <param name="total">总条数</param>

        // 总页数
        self.total = total;
        self.pages = total % size > 0 ? parseInt(total / size) + 1 : parseInt(total / size);
        self.list = [];

        var isHaveFirstDot = false;
        var isHaveLastDot = false;
        for (var i = 0; i < self.pages; i++) {
            if( i >= self.page - 4 && i<= self.page + 2 )
            {
                if( i == self.page - 1)
                {
                    self.list.push(new model(i + 1, false,i+1));
                }
                else {
                    self.list.push(new model(i + 1, true,i+1));
                }                
            }
            else {
                if (i < self.page - 4 && !isHaveFirstDot)
                {
                    self.list.push(new model(i + 1, false, "."));
                    isHaveFirstDot = true;
                }
                else if (i > self.page + 2  && !isHaveLastDot)
                {
                    self.list.push(new model(i + 1, false, "."));
                    isHaveLastDot = true;
                }                
            }
            

        }
    }


    //init();

    function model(index, disabled,text) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="index"></param>
        /// <param name="disabled"></param>
        this.index = index;
        this.disabled = disabled;
        this.text = text;
    }

    function deal() {
        /// <summary>
        /// 处理回调
        /// </summary>
        call.call(self, self.page);
    }

    deal();

    this.pre = function () {
        /// <summary>
        /// 上一页
        /// </summary>
        /// <returns type=""></returns>
        if (self.page > 1) {
            self.page--;
            deal();
        }
    }
    this.go = function (page) {
        /// <summary>
        /// 跳转到指定页
        /// </summary>
        /// <param name="page"></param>
        /// <returns type=""></returns>
        if (page > 0 && page <= self.pages) {
            self.page = page;
            deal();

        }
    }
    this.next = function () {
        /// <summary>
        /// 下一页
        /// </summary>
        /// <returns type=""></returns>
        if (self.page < self.pages) {
            self.page++;
            deal();
        }
    }
    this.refresh = function () {
        deal();

    }
}
