sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("banksystem.controller.View1", {
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);

        },
        signup:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        login:function(){
            debugger;
            var email = this.getView().byId("_IDGenInput").getValue();
            var Password = this.getView().byId("_IDGenInput1").getValue();
           
           

            var oModel = this.getView().getModel(); // OData V4 model
            var oBinding = oModel.bindList("/People");

            oBinding.requestContexts(0, 100).then(function (aContexts) {
               var aAllData = aContexts.map(function (oContext) {
                   return oContext.getObject();
               });

               var aFiltered = aAllData.filter(function (entry) {
                return entry.email === email && entry.Password === Password;
              });

            debugger;


            if (aFiltered.length === 0) {
                var oStrip = new sap.m.MessageStrip({
                    text: "Invalid email or password",
                    type: "Error",
                    showIcon: true
                  });
                
                  this.getView().byId("_IDGenVBox2").addItem(oStrip);
                
                  setTimeout(function () {
                    oStrip.destroy();
                  }, 2000);
              }
              else{
                this.getOwnerComponent().getRouter().navTo("RouteView3",{
                    email : email
                });
              }


         }.bind(this)).catch(function (oError) {
              console.error("Error loading data:", oError);
         });


           
        }
    });
});