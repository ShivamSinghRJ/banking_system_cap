sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";
    var mail;

    return Controller.extend("banksystem.controller.View4", {
        onInit() {

          const oModel = new sap.ui.model.odata.v4.ODataModel({
            serviceUrl: "/admin/"
          });
          this.getView().setModel(oModel);

          this.getOwnerComponent().getRouter()
        .getRoute("RouteView4")
        .attachPatternMatched(this._onRouteMatched, this);

          this.updateInf();
              
        },
        _onRouteMatched: function (oEvent) {
          mail = oEvent.getParameter("arguments").email;
          

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
            this.getView().setModel(oJSONModel, "BankDetails");
  
          }.bind(this)).catch(function (oError) {
              console.error("Error loading data:", oError);
         });

        },
        home:function(){
           this.getOwnerComponent().getRouter().navTo("RouteView3",{
                email : mail
            });
        },
        history:function(){
           this.getOwnerComponent().getRouter().navTo("RouteView5",{
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
        },
        updateInf:function(){
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
              this.getView().byId("_IDGenAvatar3").setInitials(initial);
              

            // If _IDGenTitle21 is a Text or Label control
            this.getView().byId("_IDGenText46").setText(mail);
            this.getView().byId("_IDGenTitle13").setText( aFiltered[0].name);
             
            
         }.bind(this)).catch(function (oError) {
              console.error("Error loading data:", oError);
         });
        }
    });
});