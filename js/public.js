(function() {

	var index = 0;
	var oShow = document.querySelector(".show");
	var oBtnShow = document.querySelectorAll(".btnShow li");
	oShow.style.width = 2 * parseInt(getStyle(oShow, "width")) + "px";

	oShow.innerHTML += oShow.innerHTML;
	var oShowLi = oShow.querySelectorAll("li");
	var showWidth = parseInt(getStyle(oShow, "width")) / oShowLi.length;

	var startX, endX, moveX;
	var moveSpeed = 50;
	var objs = [oShow];
	var judgeFlag = true;
	var recordDis = 0;
	var timer = null;
	var autoTimer = null;
	var waitTimer = null;
	var touchFlag = false;
	objs.flag = true;
	for(var i = 0; i < oShowLi.length; i++) {
		oShowLi[i].style.width = Math.floor(showWidth) + "px";
	}

	for(var i = 0; i < oBtnShow.length; i++) {
		oBtnShow[i].index = i;
	}

	oShow.addEventListener("touchstart", function(ev) {
		startX = ev.changedTouches[0].clientX - oShow.offsetLeft;
		clearInterval(autoTimer);
		clearInterval(objs.timer);
		recordDis = 0;
		touchFlag = true;

	}, false);

	oShow.addEventListener("touchmove", function(ev) {
		if(!touchFlag){
			return;
		}
		clearInterval(autoTimer);
		clearInterval(objs.timer);
		endX = ev.changedTouches[0].clientX - oShow.offsetLeft;
		moveX = endX - startX;
		recordDis += moveX;
		setStyle(oShow, "left", moveX + oShow.offsetLeft);
		clearInterval(waitTimer);
		waitTimer = setInterval(function() {
			touchFlag = false;
			move();
			autoPlay();
			clearInterval(waitTimer);
		}, 3000);

	}, false);
	
	

	oShow.addEventListener("touchend", function() {
		if(!touchFlag){
			return;
		}
		clearInterval(waitTimer);
		if(recordDis > 0 && Math.abs(recordDis) >= oShowLi[0].offsetWidth / 3) {

			index = --index % (oBtnShow.length * 2);
			moveSpeed = 20;

		} else if(recordDis < 0 && Math.abs(recordDis) >= oShowLi[0].offsetWidth / 3) {

			if(judgeFlag) {
				index = ++index % (oBtnShow.length * 2);
			} else {
				judgeFlag = !judgeFlag;
			}

			moveSpeed = 20;
		}
		move();
		autoPlay();

	}, false);

	init();
	autoPlay();

	function autoPlay() {

		clearInterval(autoTimer);
		moveSpeed = 50;
		autoTimer = setInterval(function() {
			if(objs.flag) {
				judgeFlag = false;
				index = ++index % (oBtnShow.length * 2);
				move();
			}

		}, 2000);
	}

	function init() {
		index = oBtnShow.length;
		oShow.style.left = -index * oShowLi[index].offsetWidth + "px";
	}

	function move() {

		objs.flag = false;
		if(index == oBtnShow.length * 2 - 1) {
			var turnLeft = parseInt(oShow.offsetLeft + (index - 1) * oShowLi[index].offsetWidth);
			index = 1;
			oShow.style.left = -index * oShowLi[index].offsetWidth + turnLeft + "px";
			index++;

		} else if(index == 0) {
			var turnLeft = parseInt(oShow.offsetLeft + (index + 1) * oShowLi[index].offsetWidth);
			index = oBtnShow.length * 2 - 2;
			oShow.style.left = -index * oShowLi[index].offsetWidth + turnLeft + "px";
			index--;

		}

		changeBtnShow(index % 3);
		MultAttranimate(objs, "left", -index * oShowLi[0].offsetWidth, moveSpeed);
	}

	function changeBtnShow(index) {
		for(var i = 0; i < oBtnShow.length; i++) {
			oBtnShow[i].setAttribute("class", "init-color");
		}

		oBtnShow[index].setAttribute("class", "turn-color");
	}

})();