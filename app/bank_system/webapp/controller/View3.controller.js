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

              this.getOwnerComponent().getRouter()
            .getRoute("RouteView3")
            .attachPatternMatched(this._onRouteMatched, this);


            this.bankDetails();
            this.transactionDetails();
        },
        _onRouteMatched: function (oEvent) {
            mail = oEvent.getParameter("arguments").email;
          
            var oModel = this.getView().getModel(); // OData V4 model
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
             
              var oJSONModel = new JSONModel(aFiltered);
              this.getView().setModel(oJSONModel, "BankModel");
            this.getView().getModel("BankModel").setProperty("/bankCount", aFiltered.length);
            this.getView().getModel("BankModel").setProperty("/totalMoney", tAmunt);
            
           

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
        }


    });
});










