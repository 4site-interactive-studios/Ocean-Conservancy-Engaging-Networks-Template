window.addEventListener('load', function() {
  // On multipage forms, the country is not available on the first page, but some of the other fields are
  // This does not set the country field automatically--it merely provides a country value for the field overrides if the country select isn't present
  var default_country = 'US';

  var default_field_overrides = [
    { name: 'transaction.recurrday', autocomplete: 'none' },
    { name: 'transaction.recurrfreq', autocomplete: 'none' },
    { id: 'en__field_supporter_firstName', placeholder: 'First name', autocomplete: 'given-name' },
    { id: 'en__field_supporter_lastName', placeholder: 'Last name', autocomplete: 'family-name' },
    { id: 'en__field_supporter_emailAddress', placeholder: 'Email address', type: 'email', autocomplete: 'email' },
    { id: 'en__field_supporter_country', autocomplete: 'country-name' },
    { id: 'en__field_supporter_address1', placeholder: 'Street address', autocomplete: 'section-billing address-line1' },
    { id: 'en__field_supporter_address2', placeholder: 'Apt., ste., bldg.', autocomplete: 'section-billing address-line2' },
    { id: 'en__field_supporter_region', autocomplete: 'section-billing address-level1' },
    { id: 'en__field_supporter_city', autocomplete: 'section-billing address-level2' },
    { id: 'en__field_supporter_postcode', autocomplete: 'section-billing postal-code' },
    { id: 'en__field_supporter_phoneNumber', autocomplete: 'tel' },
    { id: 'en__field_transaction_ccnumber', placeholder: 'Card number', autocomplete: 'cc-number', type: 'tel' },
    { id: 'en__field_transaction_paymenttype', autocomplete: 'cc-type' },
    { id: 'en__field_transaction_ccvv', type: 'tel', autocomplete: 'cc-csc' },
    { name: 'transaction.donationAmt.other', placeholder: 'Other amount', type: 'tel' }
  ];

  var us_field_overrides = [
    { id: 'en__field_supporter_phoneNumber', placeholder: '000-000-0000', placeholderOptional: '000-000-0000 (optional)', type: 'tel' },
    { id: 'en__field_supporter_postcode', placeholder: 'ZIP Code', label: 'ZIP Code', type: 'tel' },
    { id: 'en__field_supporter_city', placeholder: 'City', label: 'City' },
    { id: 'en__field_supporter_region', label: 'State', label: 'State', type: 'select', options: [
      { value: '', label: 'Select a State' },
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'DC', label: 'District of Columbia' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' },
      { value: 'MT', label: 'Montana' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'NY', label: 'New York' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OH', label: 'Ohio' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'SD', label: 'South Dakota' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
      { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' },
      { value: 'WY', label: 'Wyoming' }
    ] }
  ];

  var canada_field_overrides = [
    { id: 'en__field_supporter_phoneNumber', placeholder: '000-000-0000', placeholderOptional: '000-000-0000 (optional)', type: 'tel' },
    { id: 'en__field_supporter_postcode', placeholder: 'ZIP Code', label: 'ZIP Code', type: 'text' },
    { id: 'en__field_supporter_city', placeholder: 'Municipality', label: 'Municipality' },
    { id: 'en__field_supporter_region', label: 'Province', type: 'select', options: [
      { value: '', label: 'Select a Province' },
      { value: 'AB', label: 'Alberta' },
      { value: 'BC', label: 'British Columbia' },
      { value: 'MB', label: 'Manitoba' },
      { value: 'NB', label: 'New Brunswick' },
      { value: 'NL', label: 'Newfoundland and Labrador' },
      { value: 'NT', label: 'Northwest Territories' },
      { value: 'NS', label: 'Nova Scotia' },
      { value: 'NU', label: 'Nunavut' },
      { value: 'ON', label: 'Ontario' },
      { value: 'PE', label: 'Prince Edward Island' },
      { value: 'QC', label: 'Quebec' },
      { value: 'SK', label: 'Saskatchewan' },
      { value: 'YT', label: 'Yukon' }
    ] }
  ];

  var other_field_overrides = [
    { id: 'en__field_supporter_city', placeholder: 'City / Town', label: 'City / Town' },
    { id: 'en__field_supporter_postcode', placeholder: 'Postal code', label: 'Postal code', type: 'text' },
    { id: 'en__field_supporter_region', placeholder: 'Province / State / County', label: 'Province / State / County', type: 'text' },
    { id: 'en__field_supporter_phoneNumber', placeholder: 'Required', placeholderOptional: 'Optional', type: 'tel' }
  ];

  function changeInputType(old_obj, obj_type) {
    var new_obj = null;

    if(obj_type == 'select') {
      new_obj = document.createElement('select');
    } else {
      new_obj = document.createElement('input');
      new_obj.type = obj_type;
    }

    if(old_obj.name) new_obj.name = old_obj.name;
    if(old_obj.id) new_obj.id = old_obj.id;
    if(old_obj.className) new_obj.className = old_obj.className;

    old_obj.parentNode.replaceChild(new_obj, old_obj);

    return new_obj;
  }

  function removeChildNodes(field) {
    while(field.firstChild) {
      field.removeChild(field.firstChild);
    }
  }

  function setFieldsFromArray(field_overrides) {
    for(i = 0; i < field_overrides.length; i++) {      
      var field = null;
      if(field_overrides[i].id) {
        field = document.getElementById(field_overrides[i].id);
      } else if(field_overrides[i].name) {
        // this is probably an input
        field = document.querySelector('input[name="' + field_overrides[i].name + '"]');
        // but if not, lets try for a select with that name
        if(!field) field = document.querySelector('select[name="' + field_overrides[i].name + '"]');
        // last chance...perhaps a textarea?
        if(!field) field = document.querySelector('textarea[name="' + field_overrides[i].name + '"]');
      }
      // no field to work with
      if(!field) continue;

      if(field_overrides[i].type) {
        var current_element_type = field.tagName.toLowerCase();
        if((field_overrides[i].type == 'select' || current_element_type == 'select') && current_element_type != field_overrides[i].type) {
          changeInputType(field, field_overrides[i].type);
          field = document.getElementById(field_overrides[i].id);
        } else {
          field.type = field_overrides[i].type;
        }
      }

      if(field_overrides[i].options) {
        removeChildNodes(field);
        for(j = 0; j < field_overrides[i].options.length; j++) {
          var option = document.createElement('option');
          option.value = field_overrides[i].options[j].value;
          option.text = field_overrides[i].options[j].label;
          field.appendChild(option);
        }
      }

      if(field_overrides[i].placeholder) {
        field.placeholder = field_overrides[i].placeholder;
        if(field_overrides[i].placeholderOptional) {
          if(!field.required && !field.parentElement.parentElement.classList.contains('en__mandatory')) {
            field.placeholder = field_overrides[i].placeholderOptional;
          }
        }
      }

      if(field_overrides[i].label) {
        var label = field.parentElement.parentElement.getElementsByTagName('label')[0];
        label.innerHTML = field_overrides[i].label;
      }

      if(field_overrides[i].pattern) {
        field.setAttribute('pattern', field_overrides[i].pattern);
      }

      if(field_overrides[i].autocomplete) {
        field.setAttribute('autocomplete', field_overrides[i].autocomplete);
      }
    }
  }

  function overrideFields(country) {
    setFieldsFromArray(default_field_overrides);

    switch(country) {
      case 'US':
      case 'USA':
        setFieldsFromArray(us_field_overrides);
        break;
      case 'CA':
      case 'CAN':
        setFieldsFromArray(canada_field_overrides);
        break;
      default:
        setFieldsFromArray(other_field_overrides);
        break;
    }
  }

  var country = document.getElementById('en__field_supporter_country');
  if(country) {
    country.onchange = function() {
      overrideFields(this.value);
    }
    overrideFields(country.value);
  } else {
    overrideFields(default_country);
  }
});