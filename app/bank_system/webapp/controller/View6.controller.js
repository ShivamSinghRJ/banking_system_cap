sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";
    var mail;

    return Controller.extend("banksystem.controller.View6", {
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);

              this.getOwnerComponent().getRouter()
            .getRoute("RouteView6")
            .attachPatternMatched(this._onRouteMatched, this);

            this.bankDetails();
        },
        _onRouteMatched: function (oEvent) {
            mail = oEvent.getParameter("arguments").email;
            this.getView().byId("_IDGenInput13").setValue(mail);
          
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

        onTransfer:function(){

            var bank_name = this.getView().byId("_IDGenComboBox2").getSelectedKey();
            var msg = this.getView().byId("_IDGenTextArea").getValue();
            var card_number = this.getView().byId("_IDGenInput24").getValue();
            var exp_date = this.getView().byId("_IDGenInput25").getValue();
            var recipientBankName = this.getView().byId("_IDGenInput14").getValue();
            var amount = this.getView().byId("_IDGenInput15").getValue();
            debugger;


           if(this.bankDetails1() ){

           }

        },


        bankDetails1:function(){

            var oModel = this.getView().getModel(); // OData V4 model
            var oBinding = oModel.bindList("/Bank");
            oBinding.requestContexts(0, 100).then(function (aContexts) {
               var aAllData = aContexts.map(function (oContext) {
                   return oContext.getObject();
               });

               var aFiltered = aAllData.filter(function (entry) {
                return entry.email === mail && entry.card_number === card_number && entry.expire_date === exp_date;
              });
              debugger;

              if(aFiltered.length > 0){
                return true;
              }
             

            }.bind(this)).catch(function (oError) {
                console.error("Error loading data:", oError);
           });
        },
        
    });
});