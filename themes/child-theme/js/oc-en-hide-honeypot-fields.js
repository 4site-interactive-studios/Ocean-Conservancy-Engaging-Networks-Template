(function() {  
window.addEventListener('load', function() {
  // fields to hide
  var honey_pot_fields = [
    '.en__field--NOT_TAGGED_80',
    '.en__field--NOT_TAGGED_81'
  ];

  // hide the fields, make them un-tabbable, turn off autocomplete
  honey_pot_fields.forEach(function(hp_class) {
    var hp_field = document.querySelector(hp_class);
    hp_field.style.display = 'none';
    hp_field.tabIndex = -1;
    hp_field.autocomplete = 'off';
  });
});
})();