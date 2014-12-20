/**
 * New node file
 */
$(document).ready(function() {
	$( "#tabs" ).tabs();
});

$('#btnAddQuestion').on('click',addQuestion);

function addQuestion(event) {

	event.preventDefault();
	
	var newQuestion = {
            'questionId': $('#createQuestion fieldset input#questionId').val(),
            'postDate': $('#createQuestion fieldset input#postDate').val(),
            'category': $('#createQuestion fieldset select#category').val(),
            'level': $('#createQuestion fieldset select#level').val(),
            'textAreaQuestion': $('#createQuestion fieldset textarea#textAreaQuestion').val(),
            'textAreaAnswer': $('#createQuestion fieldset textarea#textAreaAnswer').val()
        }
	
	$.ajax({
        type: 'POST',
        data: newQuestion,
        url: '/question/addquestion',
        dataType: 'JSON'
    }).done(function( response ) {

    	alert("Question Added");
    	
    });
}
