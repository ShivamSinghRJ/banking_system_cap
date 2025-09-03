sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("banksystem.controller.View2", {
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);
        },
        login:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        signUp:function(){
            var first_name = this.getView().byId("_IDGenInput4").getValue();
            var last_name = this.getView().byId("_IDGenInput5").getValue();
            var address = this.getView().byId("_IDGenInput6").getValue();
            var city = this.getView().byId("_IDGenInput7").getValue();
            var phoneNo = this.getView().byId("_IDGenInput8").getValue();
            var state = this.getView().byId("_IDGenInput9").getValue();
            var postalCode = this.getView().byId("_IDGenInput10").getValue();
            var dob = this.getView().byId("_IDGenDatePicker").getDateValue();
            var ssn = this.getView().byId("_IDGenInput12").getValue();
            var email = this.getView().byId("_IDGenInput2").getValue();
            var password = this.getView().byId("_IDGenInput3").getValue();
            var gender = this.getView().byId("_IDGenSelectList1").getSelectedKey();
            
         debugger;
            if (!first_name) {
                var msg1 = this.getView().byId("_IDGenMessageStrip2").setVisible(true);
                setTimeout(function() {
                    msg1.setVisible(false);
                }, 2000);
            }
            if (!last_name) {
                var msg2 = this.getView().byId("_IDGenMessageStrip3").setVisible(true);
                setTimeout(function() {
                    msg2.setVisible(false);
                }, 2000);
            }
            if (!phoneNo) {
                var msg3 = this.getView().byId("_IDGenMessageStrip5").setVisible(true);
                setTimeout(function() {
                    msg3.setVisible(false);
                }, 2000);
            }
            if(!dob) {
                var msg4 = this.getView().byId("_IDGenMessageStrip6").setVisible(true);
                setTimeout(function() {
                    msg4.setVisible(false);
                }, 2000);
            }
            if (!postalCode) {
                var msg7 = this.getView().byId("_IDGenMessageStrip1").setVisible(true);
                setTimeout(function() {
                    msg7.setVisible(false);
                }, 2000);
            }
            if (!email) {
                var msg5 = this.getView().byId("_IDGenMessageStrip7").setVisible(true);
                setTimeout(function() {
                    msg5.setVisible(false);
                }, 2000);
            }
            if (!password) {
                var msg6 = this.getView().byId("_IDGenMessageStrip8").setVisible(true);
                setTimeout(function() {
                    msg6.setVisible(false);
                }, 2000);
            }
            
             if (gender == "gender") {
                var msg8 = this.getView().byId("_IDGenMessageStrip4").setVisible(true);
                setTimeout(function() {
                    msg8.setVisible(false);
                }, 2000);
            }

            debugger;
            if(first_name && last_name && phoneNo && dob && postalCode && email && password && gender)
            {
                
                const oModel = this.getView().getModel();

                    const oListBinding = oModel.bindList("/People");
                    oListBinding.requestContexts(0, 100).then((aContexts) => {
                    debugger;

                     const aFiltered = aContexts.map(ctx => ctx.getObject())
                                        .filter(entry => entry.email === email);


                    if (aFiltered.length > 0) {
                       	MessageBox.warning("A profile with this email already exists.");
                         var msg4 = this.getView().byId("_IDGenMessageStrip9").setVisible(true);
                            setTimeout(function() {
                                msg4.setVisible(false);
                            }, 2000);


                    } else {
                        const oNewEntry = {
                            email: email,
                            First_name: first_name,
                            Last_name: last_name,
                            gender: gender,
                            mobile: phoneNo,
                            Address: address,
                            City: city,
                            State: state,
                            Postal_code: postalCode,
                            Dob: dob.toLocaleDateString('en-CA'),
                            SSN: ssn,
                            Password: password
                        };

                        const oCreateBinding = oModel.bindList("/People");
                        oCreateBinding.create(oNewEntry);
                        sap.m.MessageToast.show("Entry created successfully");
                        this.clearFields();
                    }
                }).catch((oError) => {
                    
                    MessageBox.alert("Error checking existing profile: " + oError.message);
                });


            }

        },
        clearFields:function(){

             this.getView().byId("_IDGenInput4").setValue();
            this.getView().byId("_IDGenInput5").setValue();
            this.getView().byId("_IDGenInput6").setValue();
            this.getView().byId("_IDGenInput7").setValue();
             this.getView().byId("_IDGenInput8").setValue();
            this.getView().byId("_IDGenInput9").setValue();
             this.getView().byId("_IDGenInput10").setValue();
             this.getView().byId("_IDGenDatePicker").setValue();
            this.getView().byId("_IDGenInput12").setValue();
             this.getView().byId("_IDGenInput2").setValue();
            this.getView().byId("_IDGenInput3").setValue();
             this.getView().byId("_IDGenSelectList1").setValue();

        }
    });
}); 