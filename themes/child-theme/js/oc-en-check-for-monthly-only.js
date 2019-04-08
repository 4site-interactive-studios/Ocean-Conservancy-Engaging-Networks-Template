(function() {  
window.addEventListener('load', function() {

  var payment_by_check_block_class_name = 'give-by-check';
  var payment_by_check_input_id = 'en__field_supporter_questions_1801652';
  var payment_by_card_input_id = 'en__field_supporter_questions_1801650';

  function updateCheckPaymentDisplay() {
    // check if this is monthly or one-time ... if monthly, show check option if it exists on page, otherwise hide check option
    var frequency = getDonationFrequency();
    var check_payment_method = document.getElementById(payment_by_check_input_id);
    if(frequency.indexOf('onth') !== -1) { // checking for "month", which may be capitalized
      check_payment_method.parentElement.style.display = '';
    } else {
      if(getPaymentType() == 'check') {
        document.getElementById(payment_by_card_input_id).click();      
      }
      if(check_payment_method){
        check_payment_method.parentElement.style.display = 'none';
      }
    }
  }

  // Add our donation frequency change handler
  var donation_frequency_buttons = document.querySelectorAll('input[name="' + payment_frequency_name + '"]');
  for(i = 0; i < donation_frequency_buttons.length; i++) {
    donation_frequency_buttons[i].addEventListener('change', function() {
      updateCheckPaymentDisplay();
    });
  }

  if(null !== document.getElementById(payment_by_check_input_id)){
    updateCheckPaymentDisplay();
  }
  
});
})();
