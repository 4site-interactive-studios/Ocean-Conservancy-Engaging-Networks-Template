(function() {
  window.addEventListener("load", function() {
    var sms_message_opt_in_id = "en__field_supporter_questions_178688";
    var target_url =
      "https://oceanconservancy.org/wp-admin/admin-ajax.php?action=upland_sms_signup";

    function getPageType() {
      if (
        window.hasOwnProperty("pageJson") &&
        window.pageJson.hasOwnProperty("pageType")
      ) {
        switch (window.pageJson.pageType) {
          case "e-card":
            return "ECARD";
            break;
          case "otherdatacapture":
            return "SURVEY";
            break;
          case "emailtotarget":
          case "advocacypetition":
            return "ADVOCACY";
            break;
          case "emailsubscribeform":
            return "SUBSCRIBEFORM";
            break;
          default:
            return "DONATION";
        }
      }
    }

    function postAjax(url, data, success) {
      var params =
        typeof data == "string"
          ? data
          : Object.keys(data)
              .map(function(k) {
                return (
                  encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
                );
              })
              .join("&");

      var xhr = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open("POST", url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState > 3 && (xhr.status == 200 || xhr.status == 202)) {
          success(xhr.responseText);
        }
      };
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(params);
      return xhr;
    }

    if (
      window.supporter_data &&
      window.supporter_data.hasOwnProperty("msisdn")
    ) {
      var sms_message_opt_in = window.getItemFromStorage(
        "oc_en_sms_message_opt_in"
      );
      if (
        sms_message_opt_in &&
        window.supporter_data.msisdn &&
        sms_message_opt_in
      ) {
        let data = {
          phone: window.supporter_data.msisdn.replace(/\D/g, ""),
          source: getPageType(),
          optin_path_key: "OP1AF618AA53A977C5E6EE7A033BA8BDDB",
        };
        postAjax(target_url, data, function(data) {
          var response = JSON.parse(data);
          if (response.error) console.log("error adding contact");
          else console.log(response.message);
        });
      }
    }

    var sms_message_opt_in_field = document.getElementById(
      sms_message_opt_in_id
    );
    if (sms_message_opt_in_field) {
      sms_message_opt_in_field.addEventListener("change", function(e) {
        updateSmsOptIn();
      });

      function updateSmsOptIn() {
        window.putItemInStorage(
          "oc_en_sms_message_opt_in",
          sms_message_opt_in_field.checked
        );
      }
      updateSmsOptIn();
    }
  });
})();
