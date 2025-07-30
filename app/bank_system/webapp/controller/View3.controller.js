sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("banksystem.controller.View3", {
        onInit() {
        },
        Onbank:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView4");
        },
        history:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView5");
        },
        payment:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView6");
        },
        connectBank:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView7");
        }
    });
});










