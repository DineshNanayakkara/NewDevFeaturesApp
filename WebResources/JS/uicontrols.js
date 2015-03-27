//Reference library
/// <reference path="../libs/MasterReferenceLib.js" />




FilterCustomerAccounts = function ()
{
    //Only show accounts fax has 123 in it
    var customerAccountFilter = "<filter type='and'><condition attribute='fax' operator='like' value='%123%' /></filter>";
    Xrm.Page.getControl("new_accountid").addCustomFilter(customerAccountFilter, "account");
}
//set 'SetParentAccountIdFilter' in the Event form onload event handler
SetParentAccountIdFilter = function ()
{
    Xrm.Page.getControl("new_accountid").addPreSearch(FilterCustomerAccounts);
}

function UIControls()
{

    //Hide the Account Number field in Quick view Control if it's empty
    var quickViewAccNo = Xrm.Page.getControl('customerquickview_customerquickview_account_accountnumber');

    if (quickViewAccNo != null && quickViewAccNo != undefined)
    {
        if (quickViewAccNo.getAttribute().getValue() == null)
        {
            quickViewAccNo.setVisible(false);
        }
    }

    //set notification on mobile phone
    Xrm.Page.getControl('mobilephone').setNotification('Mobile is not in correct format', 'mobileformat');

    //clear notification
    Xrm.Page.getControl('mobilephone').clearNotification('mobileformat');    

    //add custom view to the lookup

    
    //get default view


    //set default view







    
    
}