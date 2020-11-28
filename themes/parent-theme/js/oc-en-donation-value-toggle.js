(function() {
  window.addEventListener("oc_en_helpers_loaded", function() {
    var select_other_if_amount_not_found = true;

    var donate_amount_name = "transaction.donationAmt";
    var donate_amount_other_name = "transaction.donationAmt.other";
    var payment_frequency_name = "transaction.recurrpay";

    var monthly_prefills = window.oc_monthly_prefills
      ? window.oc_monthly_prefills
      : [22, 45, 105, 175, 250, 500];
    var single_prefills = window.oc_single_prefills
      ? window.oc_single_prefills
      : [50, 75, 150, 250, 500, 750];
    var pre_selected_value_single = window.oc_selected_prefill_single
      ? parseInt(window.oc_selected_prefill_single)
      : 0;
    var pre_selected_value_monthly = window.oc_selected_prefill_monthly
      ? parseInt(window.oc_selected_prefill_monthly)
      : 0;
    var pre_selected_value_override = window.getUrlParameter(
      "transaction.donationAmt"
    );
    if (pre_selected_value_override) {
      pre_selected_value_single = parseInt(pre_selected_value_override);
      pre_selected_value_monthly = parseInt(pre_selected_value_override);
    }

    var current_donation_frequency = "";
    var current_donation_amount = window.getDonationAmount();

    function selectDonationValue(index) {
      var donate_inputs = document.querySelectorAll(
        'input[name="' + donate_amount_name + '"]'
      );
      var donate_other_input = document.querySelector(
        'input[name="' + donate_amount_other_name + '"]'
      );

      // Exit if we cant find any donation fields
      if (null == donate_other_input || !donate_inputs.length) {
        return false;
      }
      for (var i = 0; i < donate_inputs.length; i++) {
        if (i == index) {
          donate_inputs[i].checked = true;
        } else {
          donate_inputs[i].checked = false;
        }
      }

      if (
        index == -1 &&
        select_other_if_amount_not_found &&
        current_donation_amount
      ) {
        donate_inputs[donate_inputs.length - 1].checked = true;
        donate_other_input.value = parseInt(current_donation_amount);
        donate_other_input.parentNode.classList.add("has-value");
      } else {
        donate_other_input.parentNode.classList.remove("has-value");
        donate_other_input.value = "";
      }
    }

    function replaceDonationValues(update_prefills, prefill_value) {
      prefill_value = prefill_value || 0;
      var donate_inputs = document.querySelectorAll(
        'input[name="' + donate_amount_name + '"]'
      );
      // Loop through all donate_inputs EXCEPT the last one (Other)
      for (var i = 0; i < donate_inputs.length - 1; i++) {
        // If there's no value for this field, hide it
        if (update_prefills[i] === undefined) {
          donate_inputs[i].parentNode.classList.add("en__hidden");
          donate_inputs[i].value = 0;
          donate_inputs[i].setAttribute("data-original", 0);
        } else {
          // Do everything else
          donate_inputs[i].value = update_prefills[i];
          donate_inputs[i].parentNode.querySelector("label").textContent =
            "$" + donate_inputs[i].value;
          donate_inputs[i].setAttribute("data-original", update_prefills[i]);
          donate_inputs[i].parentNode.classList.remove("en__hidden");
        }
      }

      if (prefill_value) current_donation_amount = prefill_value;

      var select_index = update_prefills.indexOf(
        parseInt(current_donation_amount)
      );
      selectDonationValue(select_index);
      /*
    if(select_index == -1 && select_other_if_amount_not_found && current_donation_amount) {
      var donate_other_input = document.querySelector('input[name="' + donate_amount_other_name + '"]');
      donate_other_input.checked = true;
      donate_other_input.value = parseInt(current_donation_amount);
      donate_other_input.parentNode.classList.add('has-value');
    }
    */
    }

    function processDonationValues(
      prefill_value_single,
      prefill_value_monthly
    ) {
      var current_donation_frequency = window.getDonationFrequency();
      prefill_value_single = prefill_value_single || 0;
      prefill_value_monthly = prefill_value_monthly || prefill_value_single;
      if (current_donation_frequency == " Monthly") {
        replaceDonationValues(monthly_prefills, prefill_value_monthly);
      } else {
        replaceDonationValues(single_prefills, prefill_value_single);
      }
    }

    var donation_frequency_buttons = document.querySelectorAll(
      'input[name="' + payment_frequency_name + '"]'
    );
    for (i = 0; i < donation_frequency_buttons.length; i++) {
      donation_frequency_buttons[i].addEventListener("change", function(e) {
        var current_donation_frequency = window.getDonationFrequency();
        var current_donation_amount = window.getDonationAmount();
        if (current_donation_frequency == " Monthly") {
          pre_selected_value_single = current_donation_amount; // Store the current single value
        } else {
          pre_selected_value_monthly = current_donation_amount; // Store the current monthly value
        }
        processDonationValues(
          pre_selected_value_single,
          pre_selected_value_monthly
        );
      });
    }

    var donation_amount_buttons = document.querySelectorAll(
      'input[name="' + donate_amount_name + '"]'
    );
    for (i = 0; i < donation_amount_buttons.length; i++) {
      donation_amount_buttons[i].addEventListener("change", function(e) {
        current_donation_amount = window.getDonationAmount();
      });
    }

    var donation_amount_other_input = document.querySelector(
      'input[name="' + donate_amount_other_name + '"]'
    );
    if (donation_amount_other_input) {
      donation_amount_other_input.addEventListener("change", function(e) {
        current_donation_amount = window.getDonationAmount();
      });
    }

    processDonationValues(
      pre_selected_value_single,
      pre_selected_value_monthly
    );
  });
})();
