(function() { window.addEventListener('load', function() {

  var in_memory_toggle = document.querySelector('input[name="transaction.inmem"]');
  var in_memory_fields = document.querySelectorAll('.give-in-memory');

  if(in_memory_toggle) {
    in_memory_toggle.addEventListener('change', function(e) {
      setFieldsVisibility(in_memory_fields, in_memory_toggle.checked);
    });
  }

  function setFieldsVisibility(fields, show) {
    for(var i = 0; i < fields.length; i++) {
      fields[i].style.display = (show) ? '' : 'none';
    }
  }

  if(in_memory_fields && in_memory_toggle){
    setFieldsVisibility(in_memory_fields, in_memory_toggle.checked);
  }

}); })();