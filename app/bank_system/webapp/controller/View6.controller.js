sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";
    var mail, rec_bank_name,exp_date,exp_date1,id,id1;
    var amount1,amount2

    return Controller.extend("banksystem.controller.View6", {
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);

              this.getOwnerComponent().getRouter()
            .getRoute("RouteView6")
            .attachPatternMatched(this._onRouteMatched, this);

            this.bankDetails();
        },
        _onRouteMatched: function (oEvent) {
            mail = oEvent.getParameter("arguments").email;
            this.getView().byId("_IDGenInput13").setValue(mail);
          
        },
        bankDetails:function(){
            var oModel = this.getView().getModel();
            var oBinding = oModel.bindList("/Bank");
            oBinding.requestContexts(0, 100).then(function (aContexts) {
               var aAllData = aContexts.map(function (oContext) {
                   return oContext.getObject();
               });

               var aFiltered = aAllData.filter(function (entry) {
                return entry.email === mail;
              });
            
              var oJSONModel = new JSONModel(aFiltered);
              this.getView().setModel(oJSONModel, "BankModel");
            }.bind(this)).catch(function (oError) {
                console.error("Error loading data:", oError);
           });
        },


        onTransfer:async function(){
          var oModel = this.getView().getModel();
          try{
            var bank_name = this.getView().byId("_IDGenComboBox2").getSelectedKey();
            var msg = this.getView().byId("_IDGenTextArea").getValue();
            var card_number = this.getView().byId("_IDGenInput24").getValue();
            var exp_date =  this.getView().byId("_IDGenInput25").getDateValue().toLocaleDateString('en-CA');
            var recipientBankNumber = this.getView().byId("_IDGenInput14").getValue();
             var recipientEmail =   this.getView().byId("_IDGenInput11").getValue();
            var amount = this.getView().byId("_IDGenInput15").getValue();
            var transaction =  this.byId("_IDGenComboBox4").getSelectedItem().getText();  


            var category ;
            var oComboBox = this.byId("_IDGenComboBox5");
            var oSelectedItem = oComboBox.getSelectedItem();
            if (oSelectedItem) {
              var category = oSelectedItem.getText();
          } else {
              var category = oComboBox.getValue(); // fallback for custom input
          }

            }catch(err){

            }

            if(mail && card_number && exp_date && amount && recipientEmail && recipientBankNumber){
                const {res1,res2} = await this.bankDetails1(mail,card_number, exp_date,amount,recipientEmail,recipientBankNumber);
               
                if (res1 == -1) {
                  console.log("less amont");
                }else if(res1 == -2){
                  console.log("wrong accont number");
                }else if(res2 == 0){
                  console.log("wrong recipant account");
                }else{


                   const oNewEntry =  {
                          email : mail,
                          bank_name : bank_name,
                          card_number : card_number,
                          transaction : transaction,
                          amount : amount,
                          status : "Success",
                          category : category,
                          message : msg,
                          recipant_bank_number : recipientBankNumber
                      };
                   const oNewEntry1 =  {
                          email : recipientEmail,
                          bank_name : rec_bank_name,
                          card_number : recipientBankNumber,
                          transaction : "Money Added",
                          amount : amount,
                          status : "Success",
                          category : "Money added",
                          message : "Amount " + amount + " added from" + bank_name + "to your account",
                          recipant_bank_number : recipientBankNumber
                      };

                     

                       const oCreateBinding = oModel.bindList("/Transaction");
                        oCreateBinding.create(oNewEntry);
                         oCreateBinding.create(oNewEntry1);
                        sap.m.MessageToast.show("Entry created successfully");
                        // this.clearFields();

                      debugger;


                const sId = encodeURIComponent(id);
                 const sId1 = encodeURIComponent(id1);
               
                const sPath = `/Bank(ID='${id}')`;
                const oContextBinding = oModel.bindContext(sPath);
                const oContext = oContextBinding.getBoundContext();

                 // Safety check
                if (!oContext) {
                  MessageToast.show("No context found for update.");
                  return;
                }

                oContext.setProperty("amount", amount1 - parseFloat(amount));
                

                const sPath1 = `/Bank(ID='${id1}')`;
                 const oContextBinding1 = oModel.bindContext(sPath1);
                const oContext1 = oContextBinding1.getBoundContext();
    
                 if (!oContext1) {
                  MessageToast.show("No context found for update.");
                  return;
                }
                
                // // Set updated values via context
                oContext1.setProperty("amount", amount2 + parseFloat(amount));
                 debugger;
                }
              }
        },

        bankDetails1: function(mail1,card_number, exp_date,amount,recipientEmail,recipientBankNumber) {
            return new Promise((resolve, reject) => {
              try{
              const oModel = this.getView().getModel();
              const oBinding = oModel.bindList("/Bank");
              oBinding.requestContexts(0, 100).then((aContexts) => {
                const aAllData = aContexts.map(oContext => oContext.getObject());
                let res1,res2;
                if(exp_date && amount){
                  const aFiltered = aAllData.filter(entry =>
                  entry.email === mail1 &&
                  entry.card_number === card_number
                   && entry.expire_date === exp_date
                );
                 if(aFiltered.length>0 && parseFloat(aFiltered[0].amount) > amount){
                    res1 = parseFloat(aFiltered[0].amount) > amount ? 1 : 2;
                    exp_date = aFiltered[0].expire_date;
                    id = aFiltered[0].ID;
                    amount1 = parseFloat(aFiltered[0].amount);
                 }
                 else{ res1= -2;}
                }
                if(recipientEmail && recipientBankNumber){
                   const aFiltered1 = aAllData.filter(entry =>
                    entry.email === recipientEmail &&
                    entry.card_number === recipientBankNumber 
                  );
                  if(aFiltered1.length>0){
                    res2=1;
                    rec_bank_name = aFiltered1[0].bank_name;
                    exp_date1 = aFiltered1[0].expire_date;
                    id1 = aFiltered1[0].ID;
                    amount2 = parseFloat(aFiltered1[0].amount);
                  }else{res2=0;}
                }
                resolve(res1,res2);
              }).catch((oError) => {
                console.error("Error loading data:", oError);
                reject(oError);
              });
            }catch(err){}

            }
          );
          },

        home:function(){
           this.getOwnerComponent().getRouter().navTo("RouteView3",{
                email : mail
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