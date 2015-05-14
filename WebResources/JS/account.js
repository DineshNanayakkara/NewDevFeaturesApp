function subGridManipulation() {

    try {
        var subgridCtrl = Xrm.Page.getControl("Contacts");
        if (subgridCtrl == null) throw "subgrid 'Contacts' is not found on the form";

        subgridCtrl.addOnLoad(gridManipulation(subgridCtrl));

    } catch (e) {
        if(typeof e == "string")
            alert("Error: subGridManipulation() -> " + e);
        else {
            alert("Error: subGridManipulation() -> " + e.message);
        }
    }
}

function gridManipulation(ctrl) {

    //get entity name
    var entityName = ctrl.getEntityName();

    //get relationship name
    var relationshipName = ctrl.getRelationshipName();


    //get current view
    var currentView = ctrl.getViewSelector().getCurrentView();

    var currentViewToBeSet = {
        currentViewId : currentView.id,
        currentViewName : currentView.name
    };

    if (currentView.entityType == "savedquery") {
        currentViewToBeSet.entityType = 1039;
    }
    else if (currentView.entityType == "userquery ") {
        currentViewToBeSet.entityType = 4230;
    }

    //set view as current view
    ctrl.getViewSelector().setCurrentView(currentViewToBeSet);

    //hide subgrid
    //ctrl.setVisible(false);
    

    //get the grid
    var grid = ctrl.getGrid();

    //total record count
    var totalRecordCount = grid.getTotalRecordCount();

    if (typeof totalRecordCount == "number" && totalRecordCount == 0) {
        setTimeout(AfterGridLoad, 1000,"Contacts");
    }
}

function AfterGridLoad(subgridName) {
    var grid = Xrm.Page.getControl(subgridName).getGrid();

    var totalCount = grid.getTotalRecordCount();
    if (typeof totalCount == "number" && totalCount == 0) {
        setTimeout(AfterGridLoad, 1000,subgridName);
        return;
    }
    else if (totalCount > 0) {


        //get rows
        grid.getRows().forEach(function(row, index) {
            var rowData = row.getData();
            if (rowData != null) {

                var rowDataRef = rowData.getEntity().getEntityReference();
                var id = rowDataRef.id;
                var name = rowDataRef.name;
                var entityType = rowDataRef.entityType; //contact


                //get entity
                var entity = rowData.getEntity();
                if (entity != null) {
                    //get primary attribute value
                    var entityPrimaryAttrValue = entity.getPrimaryAttributeValue();
                    //get subgrid record entity name
                    var entityName = entity.getEntityName();
                    //get entity Id
                    var entityId = entity.getId();
                    //get attributes displayed on subgrid row
                    var entityAttrbs = entity.getAttributes();
                    //get entity reference
                    var entityRef = entity.getEntityReference();
                }
            }
        });
    }
}

//this feature can be applied with a ribbon button where a user selects records in a subgrid and perform some operation. 
function onRibbonButtonClick(subgridName) {
    var grid = Xrm.Page.getControl(subgridName).getGrid();

    
    //get selected subgrid row
    var selectedRows = grid.getSelectedRows();

    selectedRows.forEach(function (selectedRow, i) {

        var data = selectedRow.getData().getEntity().getEntityReference();
        var id = data.id;
        var name = data.name;
        var entityType = data.entityType; //contact
    });

}

