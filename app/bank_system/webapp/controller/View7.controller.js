sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";
    var mail;
    var data;

    return Controller.extend("banksystem.controller.View7", {
        onInit() {
             const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);

              this.getOwnerComponent().getRouter()
            .getRoute("RouteView7")
            .attachPatternMatched(this._onRouteMatched, this);
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
              data = aFiltered;
              debugger;
              
              var initial = data[0].First_name.charAt(0) + data[0].Last_name.charAt(0);
              this.getView().byId("_IDGenAvatar5").setInitials(initial);

            // If _IDGenTitle21 is a Text or Label control
            this.getView().byId("_IDGenText51").setText(mail);
            this.getView().byId("_IDGenTitle21").setText(data[0].name);
            this.getView().byId("_IDGenInput16").setValue(mail);
             this.getView().byId("_IDGenInput17").setValue(data[0].name);
            //setValue
             
         }.bind(this)).catch(function (oError) {
              console.error("Error loading data:", oError);
         });


         },

         addBank:function(){
            var bankAccNo = this.getView().byId("_IDGenInput18").getValue();
            var expDate = this.getView().byId("_IDGenInput19").getDateValue().toLocaleDateString('en-CA');
            var bankName = this.getView().byId("_IDGenInput20").getValue();


            const newEntry = {
                email : mail,
                bank_name : bankName,
                card_number : bankAccNo,
                expire_date : expDate,
                amount : 0
            };

            var oModel = this.getView().getModel();
            const oCreateBinding = oModel.bindList("/Bank");
                oCreateBinding.create(newEntry);
            sap.m.MessageToast.show("Entry created successfully");
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