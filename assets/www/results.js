var arr_pct= [45,30,15,8,2];


$( document ).ready(function() {

  var case_h = document.getElementById('vo1').offsetHeight;
  $('.gauge').css('height', case_h);
  $('.grow').css('height', case_h);
});

$(window).load(function() {
  animate_result(['value1','value2','value3','value4','value5'], arr_pct);
});

function animate_result(arr_ids, array_pcts) {
  for (i=0;i<arr_ids.length;i++) {
    $( "#"+arr_ids[i]).animate({width: array_pcts[i]+'%'}, 1000);
  }
}