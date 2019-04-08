(function() {  
window.addEventListener('load', function() {

  // Input names and IDs we reference
  var payment_method_wrapper_class_name = 'en__field--180165';
  var payment_method_name = 'supporter.questions.180165';
  var payment_by_card_block_class_name = 'give-by-card';
  var payment_by_paypal_block_class_name = 'give-by-paypal';
  var payment_by_check_block_class_name = 'give-by-check';
  var payment_type_select_id = 'en__field_transaction_paymenttype';
  var bank_account_type_name = 'supporter.bankAccountType';

  var cc_exp_name = 'transaction.ccexpire';
  var cc_cvv_name = 'transaction.ccvv';
  var cc_number_name = 'transaction.ccnumber';

  var check_bank_account_type_name = 'supporter.bankAccountType';
  var check_bank_account_number_name = 'supporter.bankAccountNumber';
  var check_routing_number_name = 'supporter.bankRoutingNumber';

  var donation_amount_name = 'transaction.donationAmt';
  var donation_amount_other_name = 'transaction.donationAmt.other';

  var submit_button_selector = '.en__submit button';
  /*
  var cc_cvv_id = 'en__field_transaction_ccvv';
  var cc_number_id = 'en__field_transaction_ccnumber';
  var check_bank_account_type_id = 'en__field_supporter_bankAccountType';
  var check_bank_number_id = 'en__field_supporter_bankAccountNumber';
  var check_routing_number_id = 'en__field_supporter_bankRoutingNumber';
  */


  // Avoid this if we're not in a Donation Form Page
  if(!document.querySelectorAll('input[name="' + donation_amount_name + '"]').length){
    return false;
  }


  // Update the payment type select depending on the payment method
  function setPaymentTypeSelect(payment_method) {
    
    var bank_account_type_element = document.getElementsByName(bank_account_type_name);

    if (payment_type_select_id){
      var payment_type_select = document.getElementById(payment_type_select_id);
    }

    if (bank_account_type_element.length){
      var bank_account_type = document.getElementsByName(bank_account_type_name)[0];
    }

    switch(payment_method) {
      case 'paypal':
        if (payment_type_select){
          window.addSelectValue(payment_type_select, 'PayPal', 'Paypal', true);
          window.removeSelectValue(payment_type_select, 'ACH');
        }

        if (typeof bank_account_type == 'object'){
          bank_account_type.value = '';
        }
        break;
      case 'card':
        if (payment_type_select){
          window.removeSelectValue(payment_type_select, 'Paypal');
          window.removeSelectValue(payment_type_select, 'ACH');
        }

        if (typeof bank_account_type == 'object'){
          bank_account_type.value = '';
        }
        break;
      case 'check':
        if (payment_type_select){
          window.addSelectValue(payment_type_select, 'Check', 'ACH', true);
          window.removeSelectValue(payment_type_select, 'Paypal');
        }

        if (typeof bank_account_type == 'object'){
          bank_account_type.value = 'Checking';
        }
        break;
    }

  }

  // Show or hide all blocks with a class name
  function setBlockVisibility(class_name, show) {
    var blocks = document.getElementsByClassName(class_name);
    for(var i = 0; i < blocks.length; i++) {
      if(show) {
        blocks[i].style.display = '';
      } else {
        blocks[i].style.display = 'none';
        window.clearAllErrors(blocks[i]);
      }
    }    
  }

  // Show the correct payment block
  function handlePaymentMethod(payment_method) {
    setPaymentTypeSelect(payment_method);

    switch(payment_method) {
      case 'paypal':
        setBlockVisibility(payment_by_paypal_block_class_name, true);
        setBlockVisibility(payment_by_card_block_class_name, false);
        setBlockVisibility(payment_by_check_block_class_name, false);
        break;
      case 'card':
        setBlockVisibility(payment_by_card_block_class_name, true);
        setBlockVisibility(payment_by_paypal_block_class_name, false);
        setBlockVisibility(payment_by_check_block_class_name, false);
        break;
      case 'check':
        setBlockVisibility(payment_by_check_block_class_name, true);
        setBlockVisibility(payment_by_card_block_class_name, false);
        setBlockVisibility(payment_by_paypal_block_class_name, false);
        break;
    }
  }

  // Validate each of the displayed payment fields
  function validatePaymentFields(payment_method) {
    var valid_form = true;

    switch(payment_method) {
      case 'card':
        var cc_exp = document.querySelectorAll('select[name="' + cc_exp_name + '"]');
        for(i = 0; i < cc_exp.length; i++) {
          if(!cc_exp[i].value) {
            window.setError(cc_exp[i], 'CC expiration date must be provided');
            valid_form = false;
            break;
          }
        }
        if(valid_form) clearError(cc_exp[0]);

        valid_form = (window.validateFieldByName(cc_cvv_name) && valid_form);
        valid_form = (window.validateFieldByName(cc_number_name) && valid_form);
        break;
      case 'paypal':
        break;
      case 'check':
        valid_form = (window.validateFieldByName(check_bank_account_type_name) && valid_form);
        valid_form = (window.validateFieldByName(check_bank_account_number_name) && valid_form);
        valid_form = (window.validateFieldByName(check_routing_number_name) && valid_form);
        break;
    }

    return valid_form;
  }

  // Add our payment button change handler
  var payment_button_wrapper = document.getElementsByClassName(payment_method_wrapper_class_name);
  if(payment_button_wrapper.length) {
    var payment_method_buttons = payment_button_wrapper[0].getElementsByTagName('input');
    for(i = 0; i < payment_method_buttons.length; i++) {
      payment_method_buttons[i].addEventListener('change', function() {
        handlePaymentMethod(this.value);
      });
    }
  }

  // Add our donation amount change handler
  var donation_amount_buttons = document.querySelectorAll('input[name="' + donation_amount_name + '"]');
  for(i = 0; i < donation_amount_buttons.length; i++) {
    donation_amount_buttons[i].onchange = function() {
      if(parseInt(window.getSelectedRadioValue(donation_amount_name))) {
        document.querySelector('input[name="' + donation_amount_other_name + '"]').parentNode.classList.remove('has-value');
      }
    }
  }

  // Add our form submit handler
  var form = document.querySelector('form.en__component');
  form.addEventListener('submit', function(e) {
    // add a class to the body to assist with EN's automatic scroll-to-first-error functionality
    // when we have moved the error display to below the field instead of the default top location
    document.querySelector('body').classList.add('error-jump-assist');
    var valid_form = validatePaymentFields(window.getSelectedRadioValue(payment_method_name));// && (typeof window.en_nb_valid_email === 'undefined' || window.en_nb_valid_email);

    if(window.getDonationAmount() <= 0) {
      var donation_fields = document.querySelector('input[name="transaction.donationAmt"]');
      window.setError(donation_fields, 'Please select an amount.');
      donation_fields.scrollIntoView(true);
      valid_form = false;      
    }

    if(!valid_form) {
      e.preventDefault();
      e.stopImmediatePropagation();      
      this.querySelector(submit_button_selector).disabled = false;
      return false;
    }
  });

  // Initialize the current payment method
  handlePaymentMethod(window.getSelectedRadioValue(payment_method_name));

  // Initialize error wrapper handling for the errors produced by Engaging Networks
  var form_inputs = form.getElementsByTagName('input');
  for(var i = 0; i < form_inputs.length; i++) {
    if(form_inputs[i].type == 'email')
      window.attachAutomatedErrorWrappers(window.getFieldWrapper(form_inputs[i]).parentNode);
    else
      window.attachAutomatedErrorWrappers(window.getFieldWrapper(form_inputs[i]));    
    window.clearErrorOnInputHandler(form_inputs[i]);
  }
  var form_selects = form.getElementsByTagName('select');
  for(var i = 0; i < form_selects.length; i++) {
    window.attachAutomatedErrorWrappers(window.getFieldWrapper(form_selects[i]));
    window.clearErrorOnInputHandler(form_selects[i]);
  }    
  var form_textareas = form.getElementsByTagName('textarea');
  for(var i = 0; i < form_textareas.length; i++) {
    window.attachAutomatedErrorWrappers(window.getFieldWrapper(form_textareas[i]));
    window.clearErrorOnInputHandler(form_textareas[i]);
  }

  // Class-toggling for the input[name="transaction.donationAmt.other"] field
  var field_donation_amount_other = document.querySelector('input[name="' + donation_amount_other_name + '"]');
  if(field_donation_amount_other) {
    var change_handler = function (e) {
      if(parseInt(this.value)) this.parentNode.classList.add('has-value');
      else this.parentNode.classList.remove('has-value');
    }

    field_donation_amount_other.addEventListener('input', change_handler);
    field_donation_amount_other.addEventListener('cut', change_handler);
    field_donation_amount_other.addEventListener('paste', change_handler);
    field_donation_amount_other.addEventListener('keydown', change_handler);
  }
  
});
})();
