sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";
    var mail;

    return Controller.extend("banksystem.controller.View3", {
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);
            //   oModel.refresh(true);

              this.getOwnerComponent().getRouter()
            .getRoute("RouteView3")
            .attachPatternMatched(this._onRouteMatched, this);


            this.bankDetails();
            this.transactionDetails();




            var oVizFrame = this.getView().byId("idVizFrame2");
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());

            oVizFrame.setVizProperties({
                // legend: {
                //     visible: false
                // },
                title: {
                    visible: false
                }
            });
        },
        _onRouteMatched: function (oEvent) {
            mail = oEvent.getParameter("arguments").email;
          
            var oModel = this.getView().getModel(); // OData V4 model
            oModel.refresh(true);
            var oBinding = oModel.bindList("/People");
            oBinding.requestContexts(0, 100).then(function (aContexts) {
               var aAllData = aContexts.map(function (oContext) {
                   return oContext.getObject();
               });

               var aFiltered = aAllData.filter(function (entry) {
                return entry.email === mail;
              });

              var initial = aFiltered[0].First_name.charAt(0) + aFiltered[0].Last_name.charAt(0);
              this.getView().byId("_IDGenAvatar1").setInitials(initial);
              this.getView().byId("_IDGenAvatar").setInitials(initial);
             
             // Set filtered data to MasterModel
             var oJSONModel = new JSONModel(aFiltered);
             this.getView().setModel(oJSONModel, "MasterModel");
         }.bind(this)).catch(function (oError) {
              console.error("Error loading data:", oError);
         });

         
        },
        bankDetails:function(){

            var oModel = this.getView().getModel(); // OData V4 model
            var oBinding = oModel.bindList("/Bank");
            oBinding.requestContexts(0, 100).then(function (aContexts) {
               var aAllData = aContexts.map(function (oContext) {
                   return oContext.getObject();
               });

               var aFiltered = aAllData.filter(function (entry) {
                return entry.email === mail;
              });
              let tAmunt = 0.00;
              for(var i=0;i<aFiltered.length;i++){
                    tAmunt +=parseFloat(aFiltered[i].amount);
              }
             
              var str= aFiltered.length + " Banks Accounts";
              
              this.getView().byId("_IDGenText22").setText(str);
              this.getView().byId("_IDGenLabel").setText("$ "+tAmunt);

              debugger;
              var oJSONModel = new JSONModel(aFiltered);
              this.getView().setModel(oJSONModel, "BankModel");
           
            
           

            }.bind(this)).catch(function (oError) {
                console.error("Error loading data:", oError);
           });
        },
        transactionDetails:function(){
            var oModel = this.getView().getModel(); // OData V4 model
            var oBinding = oModel.bindList("/Transaction");
            oBinding.requestContexts(0, 100).then(function (aContexts) {
               var aAllData = aContexts.map(function (oContext) {
                   return oContext.getObject();
               });
               
               var aFiltered = aAllData.filter(function (entry) {
                return entry.email === mail;
              });

              var oJSONModel = new JSONModel(aFiltered);
              this.getView().setModel(oJSONModel, "TransctionModel");
    
            }.bind(this)).catch(function (oError) {
                console.error("Error loading data:", oError);
           });
        },
        Onbank:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView4",{
                email : mail
            });
        },
        history:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView5",{
                email : mail
            });
        },
        payment:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView6",{
                email : mail
            });
        },
        connectBank:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView7",{
                email : mail
            });
        },
        AddMoney:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView8",{
                email : mail
            });
        },

        test:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView9",{
                email : mail
            });
        },
        onBankChange:function(){
            debugger;

            var sQuery = this.getView().byId("_IDGenComboBox").getSelectedKey();

             let oTable = this.getView().byId("_IDGenTable");  //Calling the View and Table with ID
            let oBinding = oTable.getBinding("items"); //we are getting the table binding items

            if(sQuery){
                let oFilter = new sap.ui.model.Filter([
                    new sap.ui.model.Filter("bank_name", sap.ui.model.FilterOperator.Contains, sQuery)
                    ], false);   //FALSE refers to OR condition operator
                oBinding.filter([oFilter]);  //Apply the filter
                } else {
                    oBinding.filter([]); // Clear the filter when input is empty
                }
        }


    });
});










