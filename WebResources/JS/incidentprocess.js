//Reference library
/// <reference path="../libs/MasterReferenceLib.js" />



function ProcessFlow() {

    //get the current active process
    var activeProcess = Xrm.Page.data.process.getActiveProcess();

    //get the current active stage
    if (activeProcess != null && activeProcess != undefined)
    {
        //get process Id
        var processId = activeProcess.getId();        

        //get process Name
        var processName = activeProcess.getName();

        //check if process rendered on the form
        var processIsRendered = activeProcess.isRendered();


        //get stages of the process
        var processStagesCollection = activeProcess.getStages();

        //get length of stages in the process
        var processStagesLength = processStagesCollection.getLength();

        //traverse through stages collection
        processStagesCollection.forEach(function (stage, n)
        {
            //stage index
            var stageIndex = n;

            //stage category number
            var stageCategory = stage.getCategory().getValue();

            //stage id
            var stageId = stage.getId();

            //stage entity name
            var stageEntityName = stage.getEntityName();

            //stage name
            var stageName = stage.getName();

            //stage status
            var stageStatus = stage.getStatus();

            //steps collections
            var stepsCollection = stage.getSteps();
            
            //Number of steps
            var stepsLength = stepsCollection.getLength();

            stepsCollection.forEach(function (step, i)
            {

                //step name
                var stepName = step.getName();

                //step attribute
                var stepAttribute = step.getAttribute();

                //step is required
                var stepIsRequired = step.isRequired();
            });
        });
    }
}



function ActiveProcesses()
{
    //get all active processes for an entity (OnPageLoad())
    Xrm.Page.data.process.getEnabledProcesses(function (processes) {
        for (var processId in processes)
        {
            //process id
            var processId = processId;

            //process name
            var processName = processes[processId];

            //check for process and set it active
            if (processId.toUpperCase() == "0FFBCDE4-61C1-4355-AA89-AA1D7B2B8792") 
            {
                //if the entity is has multiple active processes, the user can select which process to run
                Xrm.Page.data.process.setActiveProcess(processId, function (status)
                {
                    if (status == "success")
                    {
                        //insert your logic here...
                    }                
                });
            }
        }
    });
}


function ActiveStages()
{
    //get the active stage of the process
    var activeStage = Xrm.Page.data.process.getActiveStage();

    if (activeStage != null && activeStage != undefined)
    {
        //insert your logic here....
    }

    //set the active stage to one of the completed stages in the current entity
    Xrm.Page.data.process.setActiveStage("15322A8F-67B8-47FB-8763-13A28686C29D", function (reason)
    {
        //operation completed successfully
        if (reason == "success")
        {
            //insert your logic here...
        }        
    });
}

function StageNavigation()
{   
    //move forward
    Xrm.Page.data.process.moveNext(function ()
    {
        //add your logic here...
    });

    //move backward
    Xrm.Page.data.process.movePrevious(function (result)
    {
        if (result == "success")
        {
            //add your logic here...
        }
    });
}

function StageSelection()
{
    //adding an annomymous function on stage selection
    Xrm.Page.data.process.addOnStageSelected(function ()
    {
        //add your logic here...
    });

    //adding a named function on stage selection
    Xrm.Page.data.process.addOnStageSelected(OnStageSelection);

    ////if you need to remove the function you need to have a named function
    Xrm.Page.data.process.removeOnStageSelected(OnStageSelection);

}

function OnStageSelection()
{
    //add your logic here....
}



