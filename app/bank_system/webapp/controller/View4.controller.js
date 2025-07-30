sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("banksystem.controller.View4", {
        onInit() {
            var oModel = new sap.ui.model.json.JSONModel({
                cards: [
                  {
                    bank: "Bank of India",
                    name: "ADRIAN HAJDIN",
                    expiry: "06/24",
                    number: "1234 1234 1234 1234",
                    spending: "$2,840.40"
                  },
                  {
                    bank: "Bank of India",
                    name: "ADRIAN HAJDIN",
                    expiry: "06/25",
                    number: "1234 1234 1234 1234",
                    spending: "&2,840.40"
                  },
                  {
                    bank: "Bank of India",
                    name: "ADRIAN HAJDIN",
                    expiry: "06/25",
                    number: "1234 1234 1234 1234",
                    spending: "&2,840.40"
                  },
                  {
                    bank: "Bank of India",
                    name: "ADRIAN HAJDIN",
                    expiry: "06/25",
                    number: "1234 1234 1234 1234",
                    spending: "&2,840.40"
                  }
                  // Add more cards here
                ]
              });
              this.getView().setModel(oModel);
              
        }
    });
});