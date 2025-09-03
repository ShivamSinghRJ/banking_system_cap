sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("banksystem.controller.View7", {
        onInit() {
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