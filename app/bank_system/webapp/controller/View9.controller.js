sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/viz/ui5/format/ChartFormatter'
], (Controller,ChartFormatter) => {
    "use strict";

    return Controller.extend("banksystem.controller.View9", {
        onInit() {

            sap.viz.ui5.api.env.Format.numericFormatter(ChartFormatter.getInstance());
            var oData = {
                    BankModel: [
                    { bank_name: "Axis Bank", amount: 120000 },
                    { bank_name: "HDFC Bank", amount: 95000 },
                    { bank_name: "ICICI Bank", amount: 78000 },
                    { bank_name: "SBI", amount: 110000 },
                    { bank_name: "Kotak Mahindra", amount: 67000 }
                    ]
                };
                // debugger;
                // Create JSON model and set to view
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(oModel);

           
                var oVizFrame = this.getView().byId("idVizFrame2");
    var oPopOver = this.getView().byId("idPopOver");
    oPopOver.connect(oVizFrame.getVizUid());



    oVizFrame.setVizProperties({
    legend: {
        visible: false
    }
});

var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(ChartFormatter.DefaultPattern.STANDARDFLOAT);


               

        },
       
    });
});