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

    //Show the Account Number field in Quick view Control if it's not empty
    var quickViewAccNo = Xrm.Page.getControl('customerquickview_customerquickview_account_accountnumber');

    if (quickViewAccNo != null && quickViewAccNo != undefined)
    {
        if (quickViewAccNo.getAttribute().getValue() != null)
        {
            quickViewAccNo.setVisible(true);
        }
    }

    //set notification on mobile phone
    Xrm.Page.getControl('mobilephone').setNotification('Mobile is not in correct format', 'mobileformat');

    //clear notification
    Xrm.Page.getControl('mobilephone').clearNotification('mobileformat');   
    
}


function SubGridControls()
{
    //get the activity sub grid on the form
    var activityGrid = Xrm.Page.getControl('activities');

    

    if (activityGrid == undefined)
    {
        setTimeout(SubGridControls, 1000);
        return;
    }
    
    if (activityGrid != undefined)
    {
        activityGrid.refresh();
        alert('done');
    }
}

function CompositeControl()
{
    var compFirstName = Xrm.Page.getControl('fullname_compositionLinkControl_firstname');

    if (compFirstName != null)
    {
        //add your logic here

    }

    //crm for tablet.

    var firstName = Xrm.Page.getAttribute('firstname').getValue();
}

function PrimaryAttributeValue()
{
    var primaryAttribute = Xrm.Page.data.entity.getPrimaryAttributeValue();

    if(PrimaryAttributeValue != null)
    {
        alert(primaryAttribute);
    }

}

function CompositeControls()
{
    var clientType = Xrm.Page.context.client.getClient();

    if (clientType != "Mobile")
    {
        var compFirstName = Xrm.Page.getControl('fullname_compositionLinkControl_firstname');
    }

    else
    {
        var firstName = Xrm.Page.getAttribute('firstname').getValue();
    }
}