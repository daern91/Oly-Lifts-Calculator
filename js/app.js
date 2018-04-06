//Run
$(document).ready(function() {

	//Back Squat Checks
	$('#bsquat-input').focusin(function(){
		$(this).val($(this).val().slice(0, -2));
	});
	$('#bsquat-input').keypress(function(e){
		if(e.which == 13){
			$('#bsquat-input').blur();
		}
	});
	$('#bsquat-input').blur(function(){
		if ($.isNumeric($(this).val())) {
			$('#bsquat-range-input').val($(this).val());
			$(this).val(parseFloat((Math.round($(this).val() * 4) / 4).toFixed(2))+"kg");
		} else {
			$('#bsquat-range-input').val("60");
			$(this).val("60kg");
		}
		calcLifts();
		calcYourLifts();
	});
	//range input
	$('.bsq').on('input', '#bsquat-range-input', function() {
		$('#bsquat-input').val($('#bsquat-range-input').val()+"kg");
		calcLifts();
		calcYourLifts();
	});

	//Compare check
	$compare = false;

	$priSpans = $('.pri div:first-of-type span:first-of-type');
	$secSpans = $('.pri div span:last-of-type');
	$liftInputs = $('.liftInput');
	$cols = $('.pri > span');

	//Trigger Change
	$('#compare-input').change(function(){
		if (  $('#compare-input').is(':checked')  ) {
			$compare = true;
			if ($('body').width() > 619) {
				$priSpans.css("text-align","left");
				$priSpans.css("padding-left","10px");
				$priSpans.css("padding-top","3px");
				$liftInputs.css("text-align","left");
				$liftInputs.css("padding-left","10px");
				$liftInputs.css("padding-top","7px");
			}
		} else {
			$compare = false;
			$priSpans.css("text-align","center");
			$priSpans.css("padding-left","0");
			$priSpans.css("padding-top","0");
			$liftInputs.css("text-align","center");
			$liftInputs.css("padding-left","0");
			$liftInputs.css("padding-top","0");
		}
		//run display options
		resetSpans();
		populateBase();
		calcLifts();
		compareInputs();
		calcYourLifts();
		$('#frSq').focus();
	});

	//Display Change
	function compareInputs() {
		if ($compare == true) {
			$secSpans.css('display', 'block');
			$liftInputs.css('display', 'block');
			$cols.css('display', 'block');
		} else if ($compare == false) {
			$secSpans.css('display', 'none');
			$liftInputs.css('display', 'none');
			$cols.css('display', 'none');
		}
	}

	//Run Populate
	function populateBase() {
		if ($compare == false) {
			$('.units > li').each(function(){
				$(this).children().each(function() {
					$ratio = $(this).find('label').attr('value');
					$mainLeftSpan = $(this).find('.pri div:first-of-type span:first-of-type');
					$mainLeftSpan.text($ratio + "%");
				});
			});
		} else if ($compare == true) {
			$('.units > li').each(function(){
				$(this).children().each(function() {
					$ratio = $(this).find('label').attr('value');
					$mainLeftSpan = $(this).find('.pri div:first-of-type span:last-of-type');
					$mainLeftSpan.text($ratio + "%");
				});
			});
		}
	}

	$allSpans = $('.pri div span');

	//Reset Spans
	function resetSpans() {
		$allSpans.text("");
	}

	//Run Calculations
	function calcLifts() {
		if ($compare == false) {
			$('.units > li').each(function(){
				$(this).children().each(function() {
					$ratio = $(this).find('label').attr('value');
					$mainRightSpan = $(this).find('.pri div:last-of-type span:first-of-type');
					$result = parseFloat((Math.round(($ratio / 100 ) * $('#bsquat-input').val().slice(0, -2)* 4) / 4).toFixed(2));
					$mainRightSpan.text($result + "kg");
				});
			});
		} else if ($compare == true) {
			$('.units > li').each(function(){
				$(this).children().each(function() {
					$ratio = $(this).find('label').attr('value');
					$secLeftSpan = $(this).find('.pri div:first-of-type span:first-of-type');
					$result = parseFloat((Math.round(($ratio / 100 ) * $('#bsquat-input').val().slice(0, -2)* 4) / 4).toFixed(2));
					$secLeftSpan.text($result + "kg");
				});
			});
		}
	}

	//Your Lift Inputs
	$('.liftInput').focusin(function(){
		$(this).val($(this).val().slice(0, -2));
	});
	$('.liftInput').keypress(function(e){
		if(e.which == 13){
$(this).blur();
 			$(this).focus();
		}
	});
	$('.liftInput').blur(function(){
		if ($.isNumeric($(this).val())) {
			$output = parseFloat((Math.round($(this).val() * 4) / 4).toFixed(2));
			$(this).val($output+"kg");
		} else {
			$(this).val("");
		}
		calcYourLifts();
	});

	//Calc Your Lifts
	function calcYourLifts() {
		$('.units > li').each(function(){
			$(this).children().each(function() {
				$mainSpan = $(this).find('.pri div:last-of-type span:last-of-type');
				$bSq = $('#bsquat-input').val().slice(0, -2);
				$thisInput = $(this).find('.pri .liftInput').val().slice(0, -2);
				$result = parseFloat((($thisInput / $bSq) * 100).toFixed(2));
				$expected = $(this).find('.pri div:first-of-type span:last-of-type').html().slice(0, -1);
				$mainSpan.removeClass();
				if ($result == 0) {
					$mainSpan.addClass("blue");
				} else if (($result + 7.5) < $expected) {
					$mainSpan.addClass("red");
				} else {
					$mainSpan.addClass("green");
				}
				$mainSpan.text($result + "%");
			});
		});
	}

	populateBase();
	calcLifts();

});




















