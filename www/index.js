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

	document.getElementById('vbLarge'+case1).addEventListener("click", makeVote);

}

function overlay(e) {
	caseNum = e.target.id.charAt(4);
	getCaseView(caseNum);
	if(clickCount === 0) {
		$('#vote_area').fadeTo(200, 0.1);
		$('#zoom_area').css({visibility : "visible"});
		$('#zoom_area').fadeTo(200, 1.0);

		for (var i=1; i<6; i++) {
			var target = document.getElementById('vo'+i);
			target.removeEventListener("click", overlay );
			target.style.cursor = 'auto';
		}
		clickCount++;
	}
	document.getElementById('vbLarge1').addEventListener("click", makeVote);
}

function closeOverlay() {
	$('#vote_area').fadeTo(200, 1.0);
	$('#zoom_area').fadeTo(200, 0);
	$('#zoom_area').css({visibility : "hidden"});

	for (var i=1; i<6; i++) {
		var target = document.getElementById('vo'+i);
		target.addEventListener("click", overlay, false );
		target.style.cursor = 'pointer';

	}
	
	clickCount = 0;

}

function swipe(e) {
	var dir = e.target.id[3];
	console.log(dir);
	if (dir=== 'R'){
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
		setTimeout(animate('+'));
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
		setTimeout(animate('-'));
	}
	main = !main;
}

function animate(go) {
	$( "#da1" ).stop().animate({marginLeft: go+'=500px'}, 200 );
	$( "#da2" ).stop().animate({marginLeft: go+'=500px'}, 200 );
}

function makeVote(e) {
	vote = e.target.src[70];
	var target = e.target.id;
	document.getElementById('zoom_out_button1').removeEventListener("click", closeOverlay);
	document.getElementById('zoom_out_button2').removeEventListener("click", closeOverlay);
	document.getElementById('arwR').removeEventListener("click", swipe);
	document.getElementById('arwL').removeEventListener("click", swipe);

	fadeInvisible([target, 'current_b', 'zoom_out_button1', 'zoom_out_button2','arwR', 'arwL']);
	
	$('.exp_note').css({visibility : "visible"});
	$('.exp_note').delay(100).fadeTo(200, 1.0);

	$('#bump').animate({paddingTop: '+=250px'}, 200);

	$('#vote_feedback').delay(100).css({visibility:'visible'});
	$('#vote_feedback').fadeTo(300, 1.0);

}

function fadeInvisible(id) {
	for (x=0; x<id.length; x++) {
		$('#'+id[x]).fadeTo(200, 0);
		$('#'+id[x]).delay("slow").css({visibility : "hidden"});
	}
}

var clickCount= 0; 
var caseNum= 0; 
var main= true; 
var vote= 0 ;


$(document).ready(function() {
	var parent = document.getElementById('vote_area');
	for (var i=1; i<6; i++) {
		parent.insertAdjacentHTML('beforeend', "<div id='vo"+ i+"' class='vote_option'><div id='zoom"+i+"' class='case_crop'><img id='case"+i+"' class='case' src='assets/case"+i+".png'></div><img class='carrot' src='assets/carrot"+i+".png'><img id='vote"+i+"' class='voteButton' src='assets/voteButton"+i+".png'></div>");
	}
	for (var i=1; i<6; i++) {
		var target = document.getElementById('vo'+i);
		target.addEventListener("click", overlay, false );
	}
	document.getElementById('arwR').addEventListener("click", swipe, false);
	document.getElementById('arwL').addEventListener("click", swipe, false);
	document.getElementById('zoom_out_button1').addEventListener("click", closeOverlay, false);
	document.getElementById('zoom_out_button2').addEventListener("click", closeOverlay, false);
});
