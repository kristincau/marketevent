//create overlay of zoom area when user clicks on any option
function overlay(e) {
	caseNum = e.target.id.charAt(4);
	img_w = document.getElementById('caseimg').offsetWidth;
	$( "#holder" ).css('marginLeft', 0-img_w*(caseNum-1)+'px');

	//overlay may only occur once
	if(clickCount === 0) {
		$('#vote_area').fadeTo(200, 0);
		$('#zoom_area').css({visibility : "visible"});
		$('#zoom_area').fadeTo(200, 1.0);

		for (var i=1; i<6; i++) {
			var target = document.getElementById('vo'+i);
			target.removeEventListener("click", overlay );
		}

		var voteButtons = document.getElementsByClassName('vbLarge');
		for (v=0;v<voteButtons.length;v++) {
			voteButtons[v].addEventListener("click", makeVote, false);
		}
		clickCount++;
	}
}

//closes the overlay when the zoom out button is pressed
function closeOverlay() {
	$('#vote_area').fadeTo(200, 1.0);
	$('#zoom_area').fadeTo(200, 0);
	$('#zoom_area').css({visibility : "hidden"});

	for (var i=1; i<6; i++) {
		var target = document.getElementById('vo'+i);
		target.addEventListener("click", overlay, false );
	}

	var voteButtons = document.getElementsByClassName('vbLarge');
	for (v=0;v<voteButtons.length;v++) {
			voteButtons[v].removeEventListener("click", makeVote, false);
	}
	clickCount = 0;

}

//stores user's vote and halts all swiping
//reveals vote feedback area
function makeVote(e) {
	vote = e.target.id[0];
	var target = e.target.id;
	zo_buttons = document.getElementsByClassName('zoom_out_button');
	for (z=0; z<zo_buttons.length; z++){
		zo_buttons[z].removeEventListener("click", closeOverlay, false);
	}
	document.getElementById('arwR').removeEventListener("click", swipeleftHandler);
	document.getElementById('arwL').removeEventListener("click", swiperightHandler);

	fadeInvisible(['current_b','arwR', 'arwL']);
	e.target.src = 'assets/exp_note.png';

	
	$('.exp_note').css({visibility : "visible"});
	$('.exp_note').delay(100).fadeTo(200, 1.0);

	$('#bump').animate({paddingTop: '+=200px'}, 200);

	$('#vote_feedback').delay(100).css({visibility:'visible'});
	$('#vote_feedback').fadeTo(300, 1.0);

}

//helper function to fade out an element
function fadeInvisible(id) {
	for (x=0; x<id.length; x++) {
		$('#'+id[x]).fadeTo(200, 0);
		$('#'+id[x]).delay("slow").css({visibility : "hidden"});
	}
}

//controls zoom area on swipe right
function swiperightHandler( event ){
	//swipe is only allowed when the user has not voted yet
	if (vote == '0') {
		//edge: return image gallery to last image after the first image is reached
		if( $('#holder').css('marginLeft') == 0+'px'){
			$( "#holder" ).css('marginLeft', 0-img_w*5+'px');
		}
		$( "#holder" ).stop().animate({marginLeft: '+='+img_w+'px'}, 200 );
	}
}
//controls zoom area on swipe left
function swipeleftHandler( event ){
	//swipe is only allowed when the user has not voted yet
	if (vote == '0') {
		//edge: return image gallery to first image after the last image is reached
		if( $('#holder').css('marginLeft') == 0-img_w*4+'px'){
			$( "#holder" ).css('marginLeft', img_w+'px');
		}
		$( "#holder" ).stop().animate({marginLeft: '-='+img_w+'px'}, 200 );
	}
}

var clickCount= 0; 
var caseNum= 0; 
var vote= 0 ;


$(document).ready(function() {
	var parent = document.getElementById('vote_area');

	//build each vote option element using DOM
	for (var i=1; i<6; i++) {
		parent.insertAdjacentHTML('beforeend', "<div id='vo"+ i+"' class='vote_option'><div id='zoom"+i+"' class='case_crop'><img id='case"+i+"' class='case' src='assets/case"+i+".png'></div><img class='carrot' src='assets/carrot"+i+".png'><img id='vote"+i+"' class='voteButton' src='assets/voteButton"+i+".png'></div>");
	}

	//put an event listener on each vote element to trigger overlay when clicked
	for (var i=1; i<6; i++) {
		var target = document.getElementById('vo'+i);
		target.addEventListener("click", overlay, false );
	}

	//add event listeners to right and left swipe buttons
	document.getElementById('arwR').addEventListener("click", swipeleftHandler, false);
	document.getElementById('arwL').addEventListener("click", swiperightHandler, false);

	//control sizing of zoom overlay
	var votewidth = parent.offsetWidth;
	$('.slide-image').css('width', .78*votewidth+'px');
	$('.vbLarge').css('width', .78*votewidth+'px');
	$('#caseinfo').css('width', .78*votewidth+'px');

	//add event listeners to each of the zoom out buttons to close overlay
	zo_buttons = document.getElementsByClassName('zoom_out_button');
	for (z=0; z<zo_buttons.length; z++){
		zo_buttons[z].addEventListener("click", closeOverlay, false);
	}

	//trigger swiping left and right functions for zoom overlay
	$(function(){
		img_w = document.getElementById('caseimg').offsetWidth;
		$( ".slide" ).stop().on( "swipeleft", swipeleftHandler );
		$( ".slide" ).stop().on( "swiperight", swiperightHandler );

	});



});
