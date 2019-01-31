(function() {  
window.addEventListener('load', function() {

	// This function works when the user has added ".clicl-to-expand" as a class in page builder to a field. Not meant to have multiples of these on a single page

	window.expandDiv = function() {
		clickToExpandWrapper.classList.add("expanded");
	}

	// Add the click to expand CTA
	var clickToExpandWrapper = document.querySelector('.click-to-expand');
	
	if (clickToExpandWrapper) {
		var existing_html = clickToExpandWrapper.innerHTML;
		var wrapper_html = '<div class="click-to-expand-cta" onclick="window.expandDiv()"></div><div class="click-to-expand-text-wrapper" onclick="window.expandDiv()">' + existing_html + '</div>';	
		clickToExpandWrapper.innerHTML = wrapper_html;
		clickToExpandWrapper.style.opacity = '1';
	}

});
})();