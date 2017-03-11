/* Page One Script */

$('#new_person_btn').click(function(){
	$("#person_list").append('<div class="person"><br><input class="person_name" placeholder="Name"></input><span id="remove_btn" class="glyphicon glyphicon-remove-sign" style="color:red;" aria-hidden="true" role="button"></span><br><br><div>');
	$("#person_list :last-child input").focus();
});

$(document).on('click', '#remove_btn', function(){
	$(this).parent().remove();
});

$('#done_btn').click(function(){
	if(!$('#restaurant_name').val()){
		alert("You forgot to input Restaurant name!");
		$('#restaurant_name').focus();
	}else{
		$('.bodyBox').css('display','none');
		$('#addExpenseRecipt').css('display','block');
		$('#restaurant').html( $('#restaurant_name').val());

			//Alphabetize list
			var names = [];
			$("#person_list .person_name").each(function() {
				names.push($(this).val());
			})

			names.sort();

		
		}
	})


/* Page Two Script */


/******** Add Expense functions ********/
 	//add expense/cost/participants
 	$("#add_expense_btn").click(function(){
 		$("#myTable").append(
 			'<tr><td><input type="text" placeholder="Burger"></td>'
 			+	
 			'<td><input type="number" class="price" placeholder="1.99" min="0" step="any" onchange="calculateAll()"></td>'
 			+
 			'<td></td></tr>'
			);
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

$(document).on('dblclick', 'table tbody tr', function(){

	if ($(this).hasClass('selected')) {
		$(this).removeClass('selected');
	}
	else {
		$('#remove_expense_btn').prop("disabled", false);
		$('.selected').removeClass('selected');
		$(this).addClass("selected");
	}	

	if ($(".selected").length == 0) {
		$('#remove_expense_btn').prop("disabled", true);
	}
});

