$(function () {

	$(".mainMenu").click(function() {
		var subMenu=$(this).find(".subMenu");
		if(subMenu.hasClass('slt')){
			return;
		}
		else{
			$(".subMenu").removeClass('slt');
			subMenu.addClass('slt');
		}

	});
	$(".subMenu li").click(function() {
		if($(this).hasClass('active')){
			return
		}
		else{
			$(".subMenu li").removeClass('active');
			$(this).addClass('active')
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
		$("body").removeAttr("style")
	});





})
