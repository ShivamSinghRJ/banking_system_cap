sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    'sap/m/MessageToast'
], (Controller,JSONModel,MessageBox,MessageToast) => {
    "use strict";
    var mail;
    var data,bankData;

    return Controller.extend("banksystem.controller.View8", {
        onInit() {
             const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);

              this.getOwnerComponent().getRouter()
            .getRoute("RouteView8")
            .attachPatternMatched(this._onRouteMatched, this);

            this.bankDetails();
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
            //   debugger;
              
              var initial = data[0].First_name.charAt(0) + data[0].Last_name.charAt(0);
              this.getView().byId("_IDGenAvatar6").setInitials(initial);

            // If _IDGenTitle21 is a Text or Label control
            this.getView().byId("_IDGenText53").setText(mail);
            this.getView().byId("_IDGenTitle24").setText(data[0].name);
            this.getView().byId("_IDGenInput21").setValue(mail);
            //  this.getView().byId("_IDGenInput17").setValue(data[0].name);
            //setValue
            // debugger;
             
         }.bind(this)).catch(function (oError) {
              console.error("Error loading data:", oError);
         });
        },

        bankDetails:function(){
            var oModel = this.getView().getModel();
            var oBinding = oModel.bindList("/Bank");
            oBinding.requestContexts(0, 100).then(function (aContexts) {
               var aAllData = aContexts.map(function (oContext) {
                   return oContext.getObject();
               });
               bankData = aAllData;

               var aFiltered = aAllData.filter(function (entry) {
                return entry.email === mail;
              });
            
              var oJSONModel = new JSONModel(aFiltered);
              this.getView().setModel(oJSONModel, "BankModel");
            }.bind(this)).catch(function (oError) {
                console.error("Error loading data:", oError);
           });
        },



        AddMonaeyToBank:function(){

                var bank =  this.byId("_IDGenComboBox3").getSelectedKey();
                var msg = this.getView().byId("_IDGenTextArea1").getValue();
                var accNumber =  this.byId("_IDGenComboBox6").getSelectedKey();
                var amount = this.getView().byId("_IDGenInput23").getValue();
                
                if(!bank || !accNumber || !amount){
                    debugger;
                    MessageBox.warning("Fill all data!!!");
                    return;
                }
         
          

            var FilteredData = bankData.filter(function (entry) {
                return entry.email === mail && entry.bank_name === bank && entry.card_number === accNumber;
              });
            
            if(FilteredData.length > 0){
                var oModel = this.getView().getModel();

                 const oNewEntry =  {
                          email : mail,
                          bank_name : bank,
                          card_number : accNumber,
                          transaction : "Money Added",
                          amount : parseFloat(amount),
                          status : "Success",
                          category : "Self",
                          message : msg,
                          recipant_bank_number : accNumber
                      };
                const oCreateBinding = oModel.bindList("/Transaction");
                        oCreateBinding.create(oNewEntry);
                        sap.m.MessageToast.show("Money Added successfully");

                const sId = encodeURIComponent(FilteredData[0].ID);
                 const sPath = `/Bank(ID='${sId}')`;
                const oContextBinding = oModel.bindContext(sPath);
                const oContext = oContextBinding.getBoundContext();

                 // Safety check
                if (!oContext) {
                  MessageToast.show("No context found for update.");
                  return;
                }
                debugger;
                oContext.setProperty("amount", parseFloat(FilteredData[0].amount) + parseFloat(amount));
                

            }else{
                	// MessageBox.warning("A profile with this email already exists.");
                         var msg4 = this.getView().byId("_IDGenMessageStrip10").setVisible(true);
                            setTimeout(function() {
                                msg4.setVisible(false);
                            }, 5000);
                    return;

            }

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