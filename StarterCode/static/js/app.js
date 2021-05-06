// 1. Use the D3 library to read in samples.json.

d3.json("data/samples.json").then(sampledata) => {
// console.log(sampledata)

// create variable 
    var otuData = sampledata;

// Sort the data array using the greekSearchResults value
     otuData.sort(function(a, b) {
        return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });

// Slice the first 10 objects for plotting
    otuData = otuData.slice(0, 10);

// Reverse the array due to Plotly's defaults
    otuData = otuData.reverse();

// create traces
    var trace1 = {
        x: otuData.map(row => row.otu_ids),
        y: otuData.map(row => row.sample_values),
        type: "bar",
        name: "otu_labels",
        orientation: "h"
    };
// Create the data array for the plot
    var chartData = [trace1];

 // Define the plot layout
    var layout = {
        title: "Top 10 Bacteria Cultures Found",
        yaxis:{
        tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };

// Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", chartData, layout);
});

// 3. Create a bubble chart that displays each sample.
var trace2 = {
    x: sampledata.samples[0].otu_ids,
    y: sampledata.samples[0].sample_values,
    mode: "markers",
    marker: {
        size: sampledata.samples[0].sample_values,
        color: sampledata.samples[0].otu_ids
    },
    text:  sampledata.samples[0].otu_labels

};

// set the layout for the bubble plot
var layout2 = {
    xaxis:{title: "OTU ID"},
    height: 600,
    width: 1000
};

// creating data variable 
var data2 = [trace2];

// create the bubble plot
Plotly.newPlot("bubble", data2, layout2); 

