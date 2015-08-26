(function (window) {
	$("body").css("display", "none").css("opacity", "0");
	$(function () {
		$("#header").height($(window).height() - 240);
		$("#spacing-top").height($(window).height() * 0.3);
		window.setTimeout(function () {
			$("body").show();
			$("body").css("opacity", "1");
		}, 200);
	});

}(window));
