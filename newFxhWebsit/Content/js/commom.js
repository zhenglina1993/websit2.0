$(function () {

	var Left=$("<div class='leftNav'>"+
                "<div class='left-side-inner'>"+
                "<ul class='nav nav-pills nav-stacked custom-nav'>"+
                    "<li class='menu-list'><a href=''><i class='fa fa-book'></i> <span>资讯管理</span></a>"+
                        "<ul class='sub-menu-list'>"+
                            "<li><a href='' >平台新闻管理</a></li>"+
                            "<li><a href='' >用户新闻管理</a></li>"+
                        "</ul>"+
                    "</li>"+
                    "<li  class='menu-list'><a href='' ><i class='fa fa-user'></i> <span>用户管理</span></a></li>"+

                    "<li class='menu-list'><a href=''><i class='fa fa-toggle-left'></i> <span>娱乐管理</span></a>"+
                        "<ul class='sub-menu-list'>"+
                            "<li><a href=''  >图片管理</a></li>"+
                            "<li><a href=''  >视频管理</a></li>"+
                        "</ul>"+
                    "</li>"+
                    
                    "<li class=' menu-list'><a href=''><i class='fa fa-group'></i> <span>合作商管理</span></a>"+
                        "<ul class='sub-menu-list'>"+
                            "<li><a href=''  >合作商管理</a></li>"+
                            "<li><a href='' >企业版管理</a></li>"+
                            "<li><a href=''  >分润商管理</a></li>"+
                        "</ul>"+
                    "</li>"+

                    "<li  class='menu-list'><a href='' ><i class='fa fa-code'></i><span >激活码管理</span></a></li>"+
                    "<li  class='menu-list'><a href='' ><i class='fa fa-share '></i><span >推广管理</span></a></li>"+

                    
                    "<li class=' menu-list'><a href='#'><i class='fa  fa-bullhorn '></i><span>系统消息</span></a>"+
                        "<ul class='sub-menu-list'>"+
                            "<li><a href=''  >推送管理</a></li>"+
                            "<li><a href=''  >消息中心</a></li>"+
                        "</ul>"+
                    "</li>"+
                    
                    "<li class=' menu-list'><a href='#'><i class='fa  fa-cog '></i><span >账户管理</span></a>"+
                        "<ul class='sub-menu-list'>"+
                            "<!-- <%--<li><a href='＃'  class='left_lista'>账户信息</a></li>--%> -->"+
                            "<li><a href=''  >修改密码</a></li>"+
                        "</ul>"+
                    "</li>"+
                    "<li class=' menu-list'><a href='#'><i class='fa  fa-cogs '></i><span >审核管理</span></a>"+
                        "<ul class='sub-menu-list'>"+
                            "<li><a href=''  >新闻审核</a></li>"+
                            "<li><a href=''  >合作商审核</a></li>"+
                            "<li><a href=''  >推广审核</a></li>"+
                            "<!-- <%--<li><a href=''  class='left_lista'>视频审核</a></li>--%> -->"+
                            "<!-- <%--<li><a href=''  class='left_lista'>美图审核</a></li>--%> -->"+
                        "</ul>"+
                    "</li>"+

                    "<li  class='menu-list'>"+
                        "<a href='' >"+
                            "<i class='fa fa-sitemap '></i>"+
                            "<span >企业互推</span>"+
                       " </a>"+
                    "</li>"+

                   " <li class=' menu-list'><a href='#'><i class='fa fa-edit '></i><span >平台管理</span></a>"+
                       " <ul class='sub-menu-list'>"+
                            "<li><a href=''  >修改用户归属</a></li>"+
                           " <!-- <%--<li><a href=''  class='left_lista'>咨询电话</a></li>--%> -->"+
                           " <!-- <li><a href='＃'  class='left_lista'>新闻抓取配置</a></li> -->"+
                           " <!-- <li><a href='＃'  class='left_lista'>角色权限</a></li> -->"+
                           " <!-- <li><a href='＃'  class='left_lista'>提现管理</a></li> -->"+
                           " <li><a href=''  >举报管理</a></li>"+
                           " <li><a href=''  >App版本控制</a></li>"+
							"<!-- <li><a href='＃'  class='left_lista'>抽成比例</a></li> -->"+
                            "<li><a href=''  >通用素材</a></li>"+
                            "<li><a href=''  >通用素材类别</a></li>"+
                            "<li><a href=''  >版块管理</a></li>"+
                            "<li><a href=''  >版块类别</a></li>"+
                        "</ul>"+
                    "</li>"+
                    "<li  class='menu-list'>"+
                        "<a href='' >"+
                               " <i class='fa fa-download '></i>"+
                                "<span >文件管理</span>"+
                        "</a>"+
                   " </li>"+
                   " <li class=' menu-list'><a href='#'><i class='fa fa-wrench '></i><span>平台工具</span></a>"+
                       " <ul class='sub-menu-list'>"+
                           " <li><a href='' >文章数据管理</a></li>"+
                      "  </ul>"+
                  "  </li>"+
                   " <li  class='menu-list active'><a href=' ' ><i class='fa fa-wrench '></i><span >帖子管理</span></a>"+
                       " <ul class='sub-menu-list'>"+
                           " <li><a href='../Post/post.html'>论坛发帖</a></li>"+
                           " <li ><a href='../vedio/vedio.html'  class='slt'>视频管理</a></li>"+
                       " </ul>"+
                   " </li>"+
                   " <li class=' menu-list'><a href='#'><i class='fa fa-wrench '></i><span >产品管理</span></a>"+
                        "<ul class='sub-menu-list'>"+
                           " <li><a href=''  >房屋管理</a></li>"+
                           " <li><a href='../car/car.html'  >汽车管理</a></li>"+

                       " </ul>"+
                   " </li><!-- "+
                   " <%--<li class=' mainMenu'>"+
                       " <a href='' >"+
                           " <div class='leftTxt clear_add'>"+
                               " <i class='fa fa-bar-chart-o fl'></i>"+
                               " <span class='fl'>曝光排行</span>"+
                            "</div>"+
                       " </a>"+
                   " </li>--%> -->"+
               " </ul>"+
           " </div>"+
        " </div>");

	$(".pgc-leftmenu").html(Left);







    $(".menu-list").mouseover(function () {
    	if($(this).hasClass("active")){
    	}
		else{
			$(this).find(".sub-menu-list").show();
		}
	});
	$(".menu-list").mouseout(function () {
		if($(this).hasClass("active")){
    	}
		else{
			$(this).find(".sub-menu-list").hide();
		}
	});
	$(".subMenu li").click(function() {
	    if($(this).hasClass('active')){
	        return
	    }
	    else{
	        $(".subMenu li").removeClass('active');
	        $(this).addClass('active');
		}
	});

	$(".deleat").click(function(event) {
		$(".zhezhao").show();
		$(".Mask").show();
		$("body").css("position","fixed");
	});
	$("#closeBtn").click(function(event) {
		$(".zhezhao").hide();
		$(".Mask").hide();
		$("body").removeAttr("style");
	});


	// 添加栏目
	$(".Addcolumn").click(function() {
		var AddcolumnMask=$("<div class='zhezhao'><div class='Mask'><div class='styleCurrentLocal'><b>新增栏目</b></div><div class='styleFillList'><dl class='fill_single'><dt>栏目名称：</dt><dd><input type='text' class='input_l'></dd></dl> <dl class='fill_dropMenu'> <dt>栏目类型：</dt><dd><select name='fenlei' class='drop-menu'><option value='地方栏目'>地方栏目</option><option value='推荐栏目'>推荐栏目</option></select></dd></dl>   <dl class='fill_dropMenu'> <dt>栏目限制：</dt><dd><select name='fenlei' class='drop-menu'><option value='用户可取消定制'>用户可取消定制</option><option value='用户不可取消定制'>用户不可取消定制</option></select></dd></dl>     </div><div class='styleButton'><input type='button' value='保存' class='btn_confirm'><input type='button' value='取消' class='btn_cancel' id='closeBtn'></div></div></div>");
		$("body").append(AddcolumnMask);
		AddcolumnMask.find("#closeBtn").click(function() {
			AddcolumnMask.remove();
		});
	});

	//新闻审核切换
	$(".switchCount table").hide().eq(0).show();
	$(".switchTab b").removeClass("Active").eq(0).addClass("Active")
	$(".switchTab b").click(function() {
		var i=$(this).index();
		$(".switchTab b").removeClass("Active").eq(i).addClass("Active")
		$(".switchCount table").hide().eq(i).show();
	});

	//新闻审核弹窗
	$(".Auditing").click(function() {
		var AddcolumnMask=$("<div class='zhezhao'><div class='Mask'><div class='styleCurrentLocal'><b>新闻审核</b></div><div class='styleFillList'><dl class='fill_single'><dt>       新闻名称：</dt><dd><div class='txt'>云南会泽县杀人案致19死 官方否认恐怖分子作案</div></dd></dl><dl class='fill_dropMenu'><dt>       审核结果：</dt><dd><select name='fenlei' class='drop-menu'><option value='通过'>通过</option><option value='不通过'>不通过</option></select></dd></dl><dl class='fill_textArea'><dt>备注说明：</dt><dd><textarea></textarea></dd></dl></div><div class='styleButton'><input type='button' value='保存' class='btn_confirm' /><input type='button' value='取消' class='btn_cancel' id='closeBtn' /></div></div></div>");
		$("body").append(AddcolumnMask);
		AddcolumnMask.find("#closeBtn").click(function() {
			AddcolumnMask.remove();
		});
	});


	//分页
	var Page="<div class='CountTotal'>"+
			"<div class='Paging'>"+
				"<a href='#'>首页</a>"+
				"<a href='#'>上一页</a>"+				
				"<a href='#'>1</a>"+
				"<a class='c_page' href='#'>2</a>"+
				"<a href='#'>3</a>"+
				"<a href='#'>4</a>"+
				"<a href='#'>5</a>"+
				"<a href='#'>6</a>"+
				"<a href='#'>下一页</a>"+
				"<a href='#'>末页</a>"+
			"</div>"+
		"</div>";
	$("#PageIndex").html(Page)


    





})























