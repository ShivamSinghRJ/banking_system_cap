sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("banksystem.controller.View2", {
        onInit() {
        },
        login:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        signUp:function(){
            debugger;
            var first_name = sap.ui.getCore().byId("_IDGenText10").getValue();
            var last_name = sap.ui.getCore().byId("_IDGenText11").getValue();
            var address = sap.ui.getCore().byId("_IDGenText12").getValue();
            var city= sap.ui.getCore().byId("_IDGenText13").getValue();
            var phoneNo= sap.ui.getCore().byId("_IDGenText14").getValue();
            var state= sap.ui.getCore().byId("_IDGenText15").getValue();
            var postalCode= sap.ui.getCore().byId("_IDGenText16").getValue();
            var dob= sap.ui.getCore().byId("_IDGenText17").getValue();
            var ssn= sap.ui.getCore().byId("_IDGenText18").getValue();
            var email= sap.ui.getCore().byId("_IDGenText6").getValue();
            var password= sap.ui.getCore().byId("_IDGenText7").getValue();


        }
    });
}); 