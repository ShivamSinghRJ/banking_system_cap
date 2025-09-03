sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";
    var mail;

    return Controller.extend("banksystem.controller.View5", {
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);

              this.getOwnerComponent().getRouter()
            .getRoute("RouteView5")
            .attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            mail = oEvent.getParameter("arguments").email;

            this.bankDetails();
            this.transactionDetails();
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

        onBankSelection: function (oEvent) {
            var oMultiComboBox = oEvent.getSource();
            var aSelectedKeys = oMultiComboBox.getSelectedKey();

            let oTable = this.getView().byId("_IDGenTable1");  //Calling the View and Table with ID
            let oBinding = oTable.getBinding("items"); //we are getting the table binding items

            if(aSelectedKeys){
                let oFilter = new sap.ui.model.Filter([
                    new sap.ui.model.Filter("bank_name", sap.ui.model.FilterOperator.Contains, aSelectedKeys)
                    ], false);   //FALSE refers to OR condition operator
                oBinding.filter([oFilter]);  //Apply the filter
                } else {
                    oBinding.filter([]); // Clear the filter when input is empty
                }

            debugger;
        },

         home:function(){
           this.getOwnerComponent().getRouter().navTo("RouteView3",{
                email : mail
            });
        },
        Onbank:function(){
           this.getOwnerComponent().getRouter().navTo("RouteView4",{
                email : mail
            });
        },
        paymentTranfer:function(){
          this.getOwnerComponent().getRouter().navTo("RouteView6",{
                email : mail
            });
        },
        connectBank:function(){
          this.getOwnerComponent().getRouter().navTo("RouteView7",{
                email : mail
            });
        },
        addMoney:function(){
          this.getOwnerComponent().getRouter().navTo("RouteView8",{
                email : mail
            });
        }
        
    });
});