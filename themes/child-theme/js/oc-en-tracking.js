(function() { window.addEventListener('load', function() {
  //console.log(pageJson);
  //console.log(window.receipt_amount_data);
  //console.log(window.receipt_recurring_frequency);
  //console.log(window.receipt_tx_id);

  //Enhanced eCommerce Code
  var initialAmount = window.receipt_amount_data;//pageJson.amount;//'{receipt_data~amount}';

  var lcPageName = pageJson.pageName.toLowerCase();
  if (lcPageName.indexOf('honor') >= 0 ){ var productBrand = 'Honor';}
  else if (lcPageName.indexOf('memorial') >= 0 ){ var productBrand = 'Memorial';}
  else if (lcPageName.indexOf('premium') >= 0 ){ var productBrand = 'Premium';}
  else if (lcPageName.indexOf('monthly') >= 0 ){ var productBrand = 'Monthly';}
  else { var productBrand = 'Standard Donation';} 

  //console.log(productBrand);

  var donationFrequency = window.receipt_recurring_frequency;//'{receipt_data~recurringFrequency}';
  //console.log('frequency ' + donationFrequency);
  var productVariant; 
  if (donationFrequency) {productVariant = donationFrequency;} else {productVariant = "OneTime";}

  var prettyAmount = initialAmount.replace(/\$/g, '');
  if(parseFloat(prettyAmount) > 0 && prettyAmount != '{receipt_data~amount}') {
    // Send transaction data with a pageview if available
    // when the page loads. Otherwise, use an event when the transaction
    // data becomes available.
    dataLayer.push({
      'event': 'BFREDtransaction',
      'ecommerce': {
          'purchase': {
              'actionField': {
                  'id': window.receipt_tx_id,//'{receipt_data~txId}',                                  // Transaction ID. Required for purchases and refunds.
                  'affiliation': 'Engaging Networks Donation Form',
                  'revenue': prettyAmount,                                      // Total transaction value (incl. tax and shipping)
                  'tax':'0.00',
                  'shipping': '0.00'
              },
              'products': [{                                                    // List of productFieldObjects.
                  'name': pageJson.pageName + " - " + pageJson.campaignPageId,  // Name or ID is required.
                  'brand': productBrand, // pulled from product name
                  'id': pageJson.campaignPageId + ' - ' + prettyAmount + ' - '+ productVariant,
                  'price': prettyAmount,
                  'variant': productVariant,
                  'quantity': 1
              }]
          }
      }
    });
  }
}); })();