/* Page One Script */

$('#new_person_btn').click(function(){
	$("#person_list").append('<div class="person"><br><input class="person_name" placeholder="Name" maxLength="10"></input><span id="remove_btn" class="glyphicon glyphicon-remove-sign" style="color:red;" aria-hidden="true" role="button"></span><br><br><div>');
	$("#person_list :last-child input").focus();
});

$(document).on('click', '#remove_btn', function(){
	$(this).parent().remove();
});


var names = [];

$('#done_btn').click(function(){
	if(!$('#restaurant_name').val()){
		alert("You forgot to input Restaurant name!");
		$('#restaurant_name').focus();
	}else{
		$('.bodyBox').css('display','none');
		$('#addExpenseRecipt').css('display','block');
		$('#restaurant').html( $('#restaurant_name').val());

			//Alphabetize list
			$("#person_list .person_name").each(	function() {
				names.push($(this).val());
			})			
			names.sort();
		}
	})


/* Page Two Script */


/******** Add Expense functions ********/
 	//add expense/cost
 	$(document).on('click', "#add_expense_btn", function(){


 		/* TESTING */
 		var select_div = document.createElement('div');
 		select_div.className = "select_btn";
 		select_div.innerHTML = "Select";
 		var select = document.createElement('div');
 		var list = document.createElement('ul');
 		list.className = "list";
 		for(i=0; i<names.length; i++){

 			var listItem = document.createElement('li');
 			var input = document.createElement('input');
 			input.type = "checkbox";
 			input.value = names[i];
 			listItem.appendChild(input);
 			listItem.innerHTML += names[i];
 			list.append(listItem);
 		}	
 		list.style.display = "none";
 		select.append(list);
 		$(select).after(select_div);

 		var select_text = select_div.outerHTML + select.outerHTML;

 		$("#myTable tbody").append(
 			'<tr><td><input type="text" placeholder="Burger"></td>'
 			+	
 			'<td><input type="number" class="price" placeholder="1.99" min="0" step="any" onchange="calculateAll()"></td>'
 			+
 			'<td class="listName">' 			
 			+
 			select_text
 			+
 			'</td></tr>'
 			);
 	});

$(document).on('click', ".select_btn", function(){
	
	$(this).next().children().toggleClass("displayList");

});


$(document).on('change', 'input[type=checkbox]', function() {
	if (this.checked) {
		if($(this).parent().parent().parent().prev().text() == "Select"){
			$(this).parent().parent().parent().prev().text("");
		}
		var selectedParticipant = '<span title="'+ $(this).val() + '">' + $(this).val() + ' '+ '</span>';
		$(this).parent().parent().parent().prev().append(selectedParticipant);	
	}
	else{
		$('span[title="'+$(this).val()).remove();
		if($(this).parent().parent().parent().prev().text()==""){
			$(this).parent().parent().parent().prev().text("Select");
		}

	}


});

//Calculates all four rows of tfoot
function calculateAll() {
	calculateSum();
	calculateTax();
	calculateTip();
	calculateGrandTotal();	
}

//Calculates the sum of tbody
function calculateSum() {
	var sum=0;

	$(".price").each(function() {
		var value = $(this).val();
		if (!isNaN(value) && value.length !=0) {
			sum += parseFloat(value);
		}
	})
	sum = sum.toFixed(2);

	$('#subtotal').text(sum);
}

//Takes the tax percent and multiplying it with total sum
function calculateTax() {
	var result = $('#subtotal').text();
	var tax = $('#taxPercent').val();

	var totalTax = result * (tax * 0.01);
	totalTax = totalTax.toFixed(2);

	$('#tax').text(totalTax);
}

//Takes the tip percent and multiplies it with the total sum
function calculateTip() {
	var result = $('#subtotal').text();
	var tip = $('#tipPercent').val();

	var totalTip = result * (tip * 0.01);
	totalTip = totalTip.toFixed(2);

	$('#tip').text(totalTip);
}

//Adds total sum, tax and tip to get grand total
function calculateGrandTotal() {
	var result = parseFloat($('#subtotal').text());
	var tax = parseFloat($('#tax').text());
	var tip = parseFloat($('#tip').text());

	var total = result + tax + tip;
	total = '$' + total.toFixed(2);

	$('#grandTotal').text(total);
}

function deleteRow() {
	$('.selected').remove();

	if ($(".selected").length == 0) {
		$('#remove_expense_btn').prop("disabled", true);

	}
	calculateAll();
}

/*  On doubleclick, selects tr, assigns it class selected and highlights row red
	If table row is selected, #remove_expense_btn is disabled. Otherwise, disabled
	*/

	$(document).on('click', 'table tbody tr', function(){
		var currentRow = $(this).index();
		$(this).parent().find("tr").each(function(){
			if($(this).index()!= currentRow){
				$(this).find("td").next().next().find("ul").removeClass("displayList");	
			}
			
		});
		//Already selected
		if ($(this).hasClass('selected')) {
			//$(this).removeClass('selected');
		}
		//first time being selected
		else {
			$('#remove_expense_btn').prop("disabled", false);
			$('.selected').removeClass('selected');
			$(this).addClass("selected");
		}	

		if ($(".selected").length == 0) {
			$('#remove_expense_btn').prop("disabled", true);
		}
	});

	$('#expense_done_btn').click(function(){

		$('.bodyBox').css('display','none');
		$('#individualRecipt').css('display','block');

		var select = document.createElement('select');
		select.id = "individualList";
		for(i=0; i<names.length; i++){
			
			var option = document.createElement('option');
			option.value = names[i];
			option.innerHTML = names[i];
			select.append(option);
		}
			var select_text = select.outerHTML;

			$("#individualRecipt").prepend(select_text);
			//$("#individualTable tbody").append('<tr></tr>');
	});

$(document).on('change', "#individualList", function(){
	
	var selected = $("#individualList :selected").text();

	$("#myTable tbody tr .listName").children().each(function(i, tr) {

		if ($(this).is(':first-child')) {
			$(this).children().each(function() {
				console.log($(this).html());
			})
		}

	});
});
