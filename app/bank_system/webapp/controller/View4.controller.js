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
              
        },
        _onRouteMatched: function (oEvent) {
          mail = oEvent.getParameter("arguments").email;
          debugger;

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

        }
    });
});