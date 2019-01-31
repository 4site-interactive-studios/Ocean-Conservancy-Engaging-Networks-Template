(function() { window.addEventListener('load', function() {

  var donation_amount_name = 'transaction.donationAmt';
  var donation_amount_other_name = 'transaction.donationAmt.other';
  var processing_fee_present = (typeof window.calculateProcessingFee === 'function');
  var processing_fee_name = 'supporter.questions.180213';
  var payment_frequency_name = 'transaction.recurrpay';


  function updateLabel() {
    var button = document.querySelector('.smart-gift-amount-submit-label button');
    if(button) {
      button.innerHTML = getLabel();
    }
  }

  function updateAmountLabels() {
    var frequency = window.getItemFromStorage('oc_en_frequency');
    var label_wrappers = document.querySelectorAll('.en__field--donationAmt');
    if(typeof frequency === 'string' && frequency.trim() == 'Monthly') {
      [].forEach.call(label_wrappers, function(label_wrapper) {
        label_wrapper.classList.add('monthly-giving');
      });
    } else {
      [].forEach.call(label_wrappers, function(label_wrapper) {
        label_wrapper.classList.remove('monthly-giving');
      });
    }
  }

  function updateStorage() {
    var amount = window.getDonationAmount();
    if(amount !== undefined) window.putItemInStorage('oc_en_amount', amount);

    var fee = window.getProcessingFee();
    if(fee !== undefined) window.putItemInStorage('oc_en_fee', fee);

    var frequency = window.getDonationFrequency();
    if(frequency !== undefined) window.putItemInStorage('oc_en_frequency', frequency);
  }

  function getLabel() {
    var amount = parseFloat(window.getItemFromStorage('oc_en_amount'));
    var fee = parseFloat(window.getItemFromStorage('oc_en_fee'));
    if(isNaN(fee)) fee = 0;
    var frequency = window.getItemFromStorage('oc_en_frequency');
    var total_amount = parseFloat(amount) + parseFloat(fee);
    var total_amount_string = total_amount.toFixed(2).replace('.00', '');
    var label = (total_amount > 0) ? "Donate $" + total_amount_string + frequency : "Donate Now";
    return label;
  }


  // Add our donation frequency change handler
  var donation_frequency_buttons = document.querySelectorAll('input[name="' + payment_frequency_name + '"]');
  for(i = 0; i < donation_frequency_buttons.length; i++) {
    donation_frequency_buttons[i].addEventListener('change', function() {
      updateStorage();
      updateLabel();
      updateAmountLabels();
    });
  }

  // Add our donation amount change handler
  var donation_amount_buttons = document.querySelectorAll('input[name="' + donation_amount_name + '"]');
  for(i = 0; i < donation_amount_buttons.length; i++) {
    donation_amount_buttons[i].addEventListener('change', function() {
      updateStorage();
      updateLabel();
    });
  }

  // Add our donation "other" change handler
  var donation_amount_other_input = document.querySelector('input[name="' + donation_amount_other_name + '"]');
  if(donation_amount_other_input) {
    var donation_amount_other_change_handler = function (e) {
      updateStorage();
      updateLabel();
    }
    donation_amount_other_input.addEventListener('input', donation_amount_other_change_handler);
    donation_amount_other_input.addEventListener('cut', donation_amount_other_change_handler);
    donation_amount_other_input.addEventListener('paste', donation_amount_other_change_handler);
    donation_amount_other_input.addEventListener('keydown', donation_amount_other_change_handler);
  }


  // Add our donation fee charge change handler
  window.addEventListener('proccessingFeeCalculated', function() {
    updateStorage();
    updateLabel();
  });

  updateStorage();
  updateLabel();
  updateAmountLabels();

}); })();