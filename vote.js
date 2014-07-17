var vote= 0 ;

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