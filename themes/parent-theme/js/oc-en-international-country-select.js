(function() {  
window.addEventListener('load', function() {

	// This function works when the user has added ".simple_country_select" as a class in page builder for the Country select

	// Helper function to insert HTML after a node
	function insertAfter(el, referenceNode) {
	    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
	}

	// Helper function to wrap a target in a new element
	function wrap(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	}

	// Show the Country select dropdown and hide international label. Called when inserted label is clicked.
	window.showCountrySelect = function() {
	    countryWrapper.classList.add("country-select-visible");
	    addressWrapper.classList.add("country-select-visible");
	    countrySelect.focus(); 

	    var countrySelectLabel = document.querySelector('#en_custom_simple_country_select');

		// Reinstate Country Select tab index
		countrySelect.removeAttribute("tabIndex"); 

	}

	var countrySelect = document.querySelector('#en__field_supporter_country');

	if (countrySelect) {
		var countrySelecLabel = countrySelect.options[countrySelect.selectedIndex].innerHTML;
		var countrySelecValue = countrySelect.options[countrySelect.selectedIndex].value;
	}
	
	if (countrySelecValue == "US"){
	 	countrySelecValue = " US";
	}

	if (countrySelecLabel == "United States"){
	 	countrySelecLabel = "the United States";
	}	
	
	var countryWrapper = document.querySelector('.simple_country_select');
	
	if(countryWrapper){

		// Remove Country Select tab index
		countrySelect.tabIndex = "-1";

		// Find the address label
		var addressWrapper = document.querySelector('.en__field--address1 label').parentElement.parentElement;
		var addressLabel = document.querySelector('.en__field--address1 label');

		// EN does not enforce a labels on fields so we have to check for it
		if(addressLabel){

			// Wrap the address label in a div to break out of the flexbox
			wrap(addressLabel, document.createElement('div'));

			// Add our link after the address label
			// Includes both long form and short form variants
			var newEl = document.createElement('span');
			newEl.innerHTML = ' <label id="en_custom_field_simple_country_select_long" class="en__field__label"><a onclick="window.showCountrySelect()">(Outside ' + countrySelecLabel + '?)</a></label><label id="en_custom_field_simple_country_select_short" class="en__field__label"><a onclick="window.showCountrySelect()">(Outside ' + countrySelecValue + '?)</a></label>';
			insertAfter(newEl, addressLabel);


		}
	}

});
})();