import fs from 'fs'

import carbone from 'carbone'

// Data to inject
var data = {
  active: true,
  fairPrice: 956.05,
  countDays: 30,
  countDeals: 3501111,
  tradingVolume: 2.64,
  initialVolume: 326456889,
  date: "2019-05-21",
  marketData: [
    { countDeals: 62, tradingVolume: 257748521.2, weightedAverage: 94.546 },
    { countDeals: 58, tradingVolume: 322340098.22, weightedAverage: 94.7 },
    { countDeals: 200, tradingVolume: 620157678.06, weightedAverage: 94.738 },
    { countDeals: 127, tradingVolume: 531029279.92, weightedAverage: 94.837 },
    { countDeals: 68, tradingVolume: 167206236.94, weightedAverage: 94.931 },
    { countDeals: 182, tradingVolume: 58113084.26, weightedAverage: 94.883 },
    { countDeals: 1056, tradingVolume: 25648809.44, weightedAverage: 94.898 },
    { countDeals: 91, tradingVolume: 9971706.6, weightedAverage: 94.996 },
    { countDeals: 68, tradingVolume: 458760929.9, weightedAverage: 94.844 },
    { countDeals: 46, tradingVolume: 2071379.07, weightedAverage: 94.843 },
    { countDeals: 89, tradingVolume: 4623288.52, weightedAverage: 94.994 },
    { countDeals: 78, tradingVolume: 301932884.18, weightedAverage: 94.851 },
    { countDeals: 126, tradingVolume: 1186610720.6, weightedAverage: 94.81 },
    { countDeals: 125, tradingVolume: 671092941.71, weightedAverage: 94.597 },
  ],
};

let NewOptions = {
  data: data,
  type: 'ods',
  fileName: "result11.ods"
}

export default class GetRender {
    constructor(order, options) { 
      this.order = order; 
      this.options = options 
    }
// Generate a report using the sample template provided by carbone module
// This LibreOffice template contains "Hello {d.firstname} {d.lastname} !"
// Of course, you can create your own templates!
render() {
  let options = this.options
  let parametrs = {
    convertTo: this.options.type //can be docx, txt, ...
  }
  
  carbone.render(
  this.order,
  options.data,
  parametrs,
  
  function (err, result) {
    if (err) {
      return console.log(err);
    }
    // write the result
    fs.writeFileSync(options.fileName, result);
    process.exit();
  }
);
}
}

let docement = new GetRender("src/reports/usecases/order.ods", NewOptions);
docement.render()