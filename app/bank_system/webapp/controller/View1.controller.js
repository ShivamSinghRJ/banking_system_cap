sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("banksystem.controller.View1", {
        onInit() {
        },
        signup:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        login:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView3");
        }
    });
});