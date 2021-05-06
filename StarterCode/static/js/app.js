d3.json("data/samples.json").then(sampledata) => {
// console.log(sampledata)

// create variable 
    var otuData = sampledata;

// Sort the data array using the greekSearchResults value
     otuData.sort(function(a, b) {
    return parseFloat(b.samples.sample_values) - parseFloat(a.samples.sample_values);
  });

// Slice the first 10 objects for plotting
    otuData = otuData.slice(0, 10);

// Reverse the array due to Plotly's defaults
    otuData = otuData.reverse();

// create traces
    var trace1 = {
        x: otuData.map(row => row.otu_ids),
        y: otuData.map(row => row.sample_values),
        text: 
        type: "bar",
        name: "otu_labels",
        orientation: "h"
};
// Create the data array for the plot
    var chartData = [trace1];

 // Define the plot layout
var layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Organ" },
    yaxis: { title: "Square Root of Survival" }
  };

// Plot the chart to a div tag with id "plot"
Plotly.newPlot("bar", chartData, layout);
});

