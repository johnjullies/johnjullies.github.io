var menu = document.querySelector("#menu-mobile");
menu.addEventListener("click", function(e) {
	if (menu.className == "fa fa-bars") {
		document.querySelector(".menu-hidden").style.display = "block";
		document.querySelector(".logo").style.zIndex = 5;
		document.querySelector(".page-name").style.color = "rgb(38, 38, 38)";
		menu.className = "fa fa-times";
	}
	else {
		document.querySelector(".menu-hidden").style.display = "none";
		document.querySelector(".page-name").style.color = "rgb(191, 191, 191)";
		menu.className = "fa fa-bars";
	}
});