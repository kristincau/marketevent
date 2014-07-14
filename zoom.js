function getCaseView(caseNum) {
	if (!main) {
		caseNum= caseNum--;
	} 

	var next; 
	if (caseNum==5) {next='1';}
	else {
		if (!main) {
			next= caseNum;
		}
		else {
			next= parseInt(caseNum)+1;
		}
	}
	replace(1, caseNum);
	replace(2,next);
}

function replace(case1, case2){
	$('#zoom_out'+case1).replaceWith("<img id='zoom_out"+case1+"' src='assets/zoomOut"+case2+".png'>");
	$('#zoom_view'+case1).replaceWith("<img id='zoom_view"+case1+"' src='assets/case"+case2+".png'>");
	$('#vbLarge'+case1).replaceWith("<img id='vbLarge"+case1+"' src='assets/vbLarge"+case2+".png'>");
}

function overlay(e) {
	caseNum = e.target.id.charAt(4);
	getCaseView(caseNum);
	if(clickCount === 0) {
		$('#vote_area').fadeTo(200, 0.1);
		$('#zoom_area').css({visibility : "visible"});
		$('#zoom_area').fadeTo(200, 1.0);

		for (var i=1; i<6; i++) {
			var target = document.getElementById('zoom'+i);
			target.removeEventListener("click", overlay );
		}
		clickCount++;
	}
}

function closeOverlay() {
	$('#vote_area').fadeTo(200, 1.0);
	$('#zoom_area').fadeTo(200, 0);
	$('#zoom_area').css({visibility : "hidden"});

	for (var i=1; i<6; i++) {
		var target = document.getElementById('zoom'+i);
		target.addEventListener("click", overlay );
	}
	
	clickCount = 0;

}

function swipe(dir) {
	if (dir=== 'r'){
		if (main) {
			$( "#da2" ).css('marginLeft', '-500px');
			if (parseInt(caseNum)+1 ==6 ) {
				replace(2,1);
			}
			else {
				replace(2, parseInt(caseNum)+1);
			}
		}
		else{
			$( "#da1" ).css('marginLeft', '-500px');
			if (parseInt(caseNum)+1 == 6) {
				replace(1, 1);
			}
			else {
				replace(1, parseInt(caseNum)+1);
			}
		}
		if (caseNum == 5) {caseNum = 1; }
		else{caseNum++;}
		$( "#da1" ).animate({marginLeft: '+=500px'}, 200 );
		$( "#da2" ).animate({marginLeft: '+=500px'}, 200 );

	}
	else {
		if (!main) {
			$( "#da1" ).css('marginLeft', '500px');
			if (parseInt(caseNum)-1 == 0) {
				replace(1, 5);
			}
			else {
				replace(1, parseInt(caseNum)-1);
			}
		}
		else{
			$( "#da2" ).css('marginLeft', '500px');
			if (parseInt(caseNum)-1 == 0) {
				replace(2,5);

			}
			else {
				replace(2, parseInt(caseNum)-1);
			}
		}

		if (caseNum == 1) {caseNum = 5; }
		else{caseNum--;}
		$( "#da1" ).animate({marginLeft: '-=500px'}, 200 );
		$( "#da2" ).animate({marginLeft: '-=500px'}, 200 );
	}
	main = !main;
}

var clickCount= 0; 
var caseNum= 0; 
var main= true; 

$(document).ready(function() {
	var parent = document.getElementById('vote_area');
	for (var i=1; i<6; i++) {
		parent.insertAdjacentHTML('beforeend', "<div class='vote_option'><div id='zoom"+i+"' class='case_crop'><img id= 'zoom"+i+"' class='button_zoom' src='assets/zoom"+i+".png'><img id='case"+i+"' class='case' style='margin-top: -150px' src='assets/case"+i+".png'></div><img class='carrot' src='assets/carrot"+i+".png'><img id='vb"+i+"' class='voteButton' src='assets/voteButton"+i+".png'></div>");
	}
	for (var i=1; i<6; i++) {
		var target = document.getElementById('zoom'+i);
		target.addEventListener("click", overlay );
	}


	var arwR = document.getElementById('arwR');
	var arwL = document.getElementById('arwL');

	arwR.addEventListener("click", function() {swipe('r')});
	arwL.addEventListener("click", function() {swipe('l')});
	var zoomOut1 = document.getElementById('zoom_out_button1');
	zoomOut1.addEventListener("click", closeOverlay);

	var zoomOut2 = document.getElementById('zoom_out_button2');
	zoomOut2.addEventListener("click", closeOverlay);
})