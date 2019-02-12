// 1. Get URL Parameters
// 2. Wait until DOMContentLoad
// 3. If "ea.tracking.id" present do step 4, otherwise do nothing
// 4. Detect if the tracking ID is One-time or Monthly and set to correct corresponding gift frequency
// 5. Detect on click of One-time or Monthly giving frequency buttons. On click transform tracking ID in the URL, force a page refresh

// Get URL Parameters
function getParameter(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    } else {
       return decodeURI(results[1]) || 0;
    }
}

// Update URL Parameters
function updateParameter(url, param, paramVal) {
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if (TheAnchor) {
            additionalURL = TheParams;
        }

        tempArray = additionalURL.split("&");

        for (var i=0; i<tempArray.length; i++) {
            if(tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    } else {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if (TheParams) {
            baseURL = TheParams;
        }
    }

    if (TheAnchor) {
        paramVal += "#" + TheAnchor;
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

document.addEventListener('DOMContentLoaded', function() {
    var eaTrackingID = getParameter('ea.tracking.id');

    if(eaTrackingID){
        

        var eaTrackingIDLastFour = eaTrackingID.substr(eaTrackingID.length-4);
        var genericEATrackingID = "GenericSourceID";

        console.log('Tracking ID is: ' + eaTrackingID);
        console.log('Tracking ID last four characters are: ' + eaTrackingIDLastFour);

        if (eaTrackingIDLastFour == 'HAXX') {
            // ONE TIME Tracking ID
            console.log('Tracking ID is ONE-TIME and ends with HAXX');            
            document.querySelector('.en__field--recurrpay input[value=N]').checked = true;
            console.log('Forced selection of ONE-TIME giving frequency');
            document.querySelector('#en__field_transaction_recurrday').value = '';
            document.querySelector('#en__field_transaction_recurrfreq').value = '';  
            console.log('Removed Recurring Day and Recurring Frequency hidden input field values');          
        } else if (eaTrackingIDLastFour == 'HAG2') {
            // MONTHLY Tracking ID
            console.log('Tracking ID is MONTHLY and ends with HAG2');
            document.querySelector('.en__field--recurrpay input[value=Y]').checked = true;
            console.log('Forced selection of MONTHLY giving frequency');    
        } else if (eaTrackingID !== genericEATrackingID){
            console.log('Tracking ID is present but does not end in G2 or XX')
            // Add a Generic Tracking ID, set gift frequency to monthly, and refresh the page.
            //var newURL = updateParameter(window.location.href,'ea.tracking.id', genericEATrackingID);
            //newURL = updateParameter(newURL,'transaction.recurrpay', 'Y');           
            //window.location = newURL;
        }
    } else if (eaTrackingID !== undefined){
        console.log('No Tracking ID is present')
        // Add a Generic Tracking ID, set gift frequency to monthly, and refresh the page.
        //var newURL = updateParameter(window.location.href,'ea.tracking.id', genericEATrackingID);
        //newURL = updateParameter(newURL,'transaction.recurrpay', 'Y');           
        //window.location = newURL;        
    }

    // Watch for a click on the MONTHLY giving frequency
    document.querySelector('.en__field--recurrpay input[value=Y]').onclick = function() {
        console.log('MONTHLY giving frequency has been clicked, if tracking ID is for ONE TIME then update URL and refresh page');        
        if (eaTrackingIDLastFour == 'HAXX') {
            console.log('Tracking ID has been updated from ONE TIME to MONTHLY')
            var newEATrackingID = eaTrackingID.slice(0, -2) + 'G2';
            var newURL = updateParameter(window.location.href,'ea.tracking.id', newEATrackingID);
            newURL = updateParameter(newURL,'transaction.recurrpay', 'Y');
            
            window.location = newURL;
        } else {
            console.log('Tracking ID was already MONTHLY and no update needed to happen')
        }
    }        

    // Watch for a click on the ONE TIME giving frequency
    document.querySelector('.en__field--recurrpay input[value=N]').onclick = function() {
        console.log('ONE TIME giving frequency has been clicked, if tracking ID is for MONTHLY then update URL and refresh page');
        if (eaTrackingIDLastFour == 'HAG2') {
            console.log('Tracking ID has been updated from MONTHLY to ONE TIME')
            var newEATrackingID = eaTrackingID.slice(0, -2) + 'XX';
            var newURL = updateParameter(window.location.href,'ea.tracking.id', newEATrackingID);
            newURL = updateParameter(newURL,'transaction.recurrpay', 'N');
            window.location = newURL;
        } else {
            console.log('Tracking ID was already ONE TIME and no update needed to happen')
        }       
    }          

});