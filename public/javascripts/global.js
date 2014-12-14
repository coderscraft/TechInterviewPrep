/**
 * New node file
 */
$(document).ready(function() {
	$( "#tabs" ).tabs();
});

$('#btnAddQuestion').on('click',addQuestion);

function addQuestion(event) {
	alert("I m clicked");
}
