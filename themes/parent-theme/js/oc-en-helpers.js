  var donation_amount_name = 'transaction.donationAmt';
  var donation_amount_other_name = 'transaction.donationAmt.other';
  var processing_fee_name = 'supporter.questions.180213';
  var payment_frequency_name = 'transaction.recurrpay';
  var payment_source_name = 'supporter.questions.180165';
  var payment_card_type = 'transaction.paymenttype';
  var field_wrapper_error_class = 'en__field__error-wrapper';
  var field_error_class = 'en__field__error';
  var submit_button_selector = '.en__submit button';

  window.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  window.isSplitField = function(field) {
    return (
      field.classList.contains('en__field__element--splittext') ||
      field.classList.contains('en__field__element--tripletext') ||
      field.classList.contains('en__field__element--splitselect') ||
      field.classList.contains('en__field__element--tripleselect')      
    );
  }

  window.isMultipleChoiceField = function(field) {
    return (
      field.classList.contains('en__field__element--radio') ||
      field.classList.contains('en__field__element--checkbox')
    );
  }

  window.getFieldWrapper = function(field) {
    if(window.isSplitField(field.parentNode.parentNode) || window.isMultipleChoiceField(field.parentNode.parentNode)) {
      return field.parentNode.parentNode.parentNode;
    } else {
      return field.parentNode.parentNode;
    }
  }

  window.clearAllErrors = function(element) {
    var existing_errors = element.querySelectorAll('.'+field_error_class);
    for(i = 0; i < existing_errors.length; i++) {      
      existing_errors[i].parentNode.classList.remove(field_wrapper_error_class);
      existing_errors[i].parentNode.removeChild(existing_errors[i]);
    }
  }

  window.clearError = function(field) {
    clearAllErrors(getFieldWrapper(field));
  }

  window.setError = function(field, message) {
    var field_wrapper = getFieldWrapper(field);

    var existing_errors = field_wrapper.getElementsByClassName(field_error_class);
    if(existing_errors.length) return;

    var errorNode = document.createElement('div');
    errorNode.className = field_error_class;
    errorNode.textContent = message;

    field_wrapper.appendChild(errorNode);
    field_wrapper.classList.add(field_wrapper_error_class);
  }

  window.isValidField = function(field) {
    return (field.value) ? true : false;
  }

  window.validateField = function(field, message) {
    if(!field) {
      return true;
    }
    if(!isValidField(field)) {
      if(!message) {
        var label = getFieldWrapper(field).getElementsByTagName('label')[0];
        message = label.textContent + ' must be provided';
      }
      setError(field, message);
      return false;
    } else {
      if(field.type !== 'hidden') {
        clearError(field);
      }
      return true;
    }    
  }

  window.validateFieldByName = function(field_name, message) {
    return validateField(document.querySelector('input[name="' + field_name + '"]'), message);
  }

  window.validateFieldById = function(field_id, message) {
    return validateField(document.getElementById(field_id), message);
  }

  window.attachAutomatedErrorWrappers = function(element) {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        for(var i = 0; i < mutation.addedNodes.length; i++) {
          if(mutation.addedNodes[i].className == field_error_class) {
            mutation.addedNodes[i].parentNode.classList.add(field_wrapper_error_class);
          }
        }
        for(var i = 0; i < mutation.removedNodes.length; i++) {
          if(mutation.removedNodes[i].className == field_error_class) {
            mutation.target.classList.remove(field_wrapper_error_class);
          }
        }
      });
    });
    observer.observe(element, { childList: true });
  }

  window.clearErrorOnInputHandler = function(element) {
    element.addEventListener('focus', function(e) {
      window.clearError(this);
      document.querySelector(submit_button_selector).disabled = false;      
    });
  }

  window.getDonationInput = function() {
    var donation_amount_buttons = document.querySelectorAll('input[name="' + donation_amount_name + '"]');
    for(i = 0; i < donation_amount_buttons.length; i++) {
      if(donation_amount_buttons[i].checked) {
        if(isNaN(donation_amount_buttons[i].value)) {
          return document.querySelector('input[name="' + donation_amount_other_name + '"]');
        } else {
          return donation_amount_buttons[i];
        }
      }
    }
    return undefined;
  }

  window.getDonationAmount = function() {
    var donation_input = window.getDonationInput();
    if(donation_input == undefined) return 0;
    return (donation_input.hasAttribute('data-original')) ? parseFloat(donation_input.getAttribute('data-original')) : parseFloat(donation_input.value);    
  }

  window.getDonationFrequency = function() {
    var donation_frequency_buttons = document.querySelectorAll('input[name="' + payment_frequency_name + '"]');
    for(i = 0; i < donation_frequency_buttons.length; i++) {
      if(donation_frequency_buttons[i].checked) {
        return (donation_frequency_buttons[i].value == "Y") ? " Monthly" : "";
      }
    }
    return undefined;
  }

  window.getItemFromStorage = function(item) {
    if(typeof(Storage) !== "undefined") {
      return window.sessionStorage.getItem(item);
    } else {
    }
  }

  window.putItemInStorage = function(item, value) {
    if(typeof(Storage) !== "undefined") {
      window.sessionStorage.setItem(item, value);
    } else {
    }
  }

  window.getProcessingFee = function() {
    if((typeof window.calculateProcessingFee === 'function')) {
      var processing_fee_checkbox = document.querySelector('input[name="' + processing_fee_name + '"]');
      if(processing_fee_checkbox) {
        return window.calculateProcessingFee();
      }
    }
    return 0;
  }


  window.getPaymentType = function() {
    var payment_type_buttons = document.querySelectorAll('input[name="' + payment_source_name + '"]');
    for(i = 0; i < payment_type_buttons.length; i++) {
      if(payment_type_buttons[i].checked) {
        if(payment_type_buttons[i].value == 'card') {
          return document.querySelector('select[name="' + payment_card_type + '"]').value;
        } else {
          return payment_type_buttons[i].value;
        }
      }
    }
  }


  // Helper function to remove an option from a select
  window.removeSelectValue = function(field, option_value) {
    var options = field.getElementsByTagName('option');
    for(i = 0; i < options.length; i++) {
      if(options[i].value == option_value) {
        field.remove(i);
        break;
      }
    }
  }


  // Helper function to add an option to a select & set it as the selected value (optional)
  window.addSelectValue = function(field, option_label, option_value, selected) {
      var option = document.createElement('option');
      option.value = option_value;
      option.label = option_label;
      field.appendChild(option);
      if(selected) field.value = option_value;
  }

  // Helper function to fetch the selected value of a set of radio buttons
  window.getSelectedRadioValue = function(radio_buttons_name) {
    var buttons = document.getElementsByName(radio_buttons_name);
    for(var i = 0; i < buttons.length; i++) {
      if(buttons[i].checked) return buttons[i].value;
    }
  }

  window.dispatchEvent(new Event('oc_en_helpers_loaded'));