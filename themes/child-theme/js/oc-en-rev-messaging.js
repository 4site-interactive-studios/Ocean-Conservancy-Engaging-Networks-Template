(function() { window.addEventListener('load', function() {

  var sms_message_opt_in_id = 'en__field_supporter_questions_178688';
  var rev_messaging_url = 'https://sync.revmsg.net/constituent/5454a5c3fb8e68f6786b1428993c0169ca0f51de';

  function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
      ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
      if(xhr.readyState > 3 && (xhr.status == 200 || xhr.status == 202)) {
        success(xhr.responseText); 
      }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
  }


  if(window.supporter_data) {
    var sms_message_opt_in = window.getItemFromStorage('oc_en_sms_message_opt_in');
    if(sms_message_opt_in && window.supporter_data.msisdn && sms_message_opt_in) {
      postAjax(rev_messaging_url, window.supporter_data, function(data) {
        var response = JSON.parse(data);
        if(response.error) console.log('error adding contact');
        else console.log(response.message);
      });
    }
  }

  var sms_message_opt_in_field = document.getElementById(sms_message_opt_in_id);
  if(sms_message_opt_in_field) {
    sms_message_opt_in_field.addEventListener('change', function(e) {
      updateSmsOptIn();
    });

    function updateSmsOptIn() {
      window.putItemInStorage('oc_en_sms_message_opt_in', sms_message_opt_in_field.checked);
    }
    updateSmsOptIn();
  }
}); })();