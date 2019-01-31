(function() {  
window.addEventListener('DOMContentLoaded', function() {

	// Adds ".remove()" to add support for IE11
	// Create Element.remove() function if not exist
	// https://stackoverflow.com/questions/20428877/javascript-remove-doesnt-work-in-ie
	if (!('remove' in Element.prototype)) {
	    Element.prototype.remove = function() {
	        if (this.parentNode) {
	            this.parentNode.removeChild(this);
	        }
	    };
	}

	// .header-image has one image in it, get its URL and set .banner's background-image property to it
	var headerImage = document.querySelector('.banner-image img');

	if(headerImage){
		var headerImageSrc = headerImage.src;
		document.querySelector('.banner-image').remove();
		document.querySelector('.banner').style.backgroundImage = 'url(' + headerImageSrc + ')';
	}

});
})();