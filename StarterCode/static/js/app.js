// 1. Use the D3 library to read in samples.json.
// function createPlots(id) {
d3.json("samples.json").then(sampledata => {
 console.log(sampledata)
 var ids = sampledata.samples[0].otu_ids;
 console.log(ids)
 var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
 console.log(sampleValues)
 var otuLabels = sampledata.samples[0].otu_labels.slice(0,10);
 console.log(otuLabels)

// create variable 
// var otuData = sampledata;

// sampleValues.sort(function(a, b) {
//         return parseFloat(b.sampledata.samples.sample_values) - parseFloat(a.sampledata.samples.sample_values);
//     });

var topOTU = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
var idOTU = topOTU.map(d => "OTU" + d);
console.log(`OTU IDS: ${idOTU}`)
// first 10 objects for plotting
var otuLabels = sampledata.samples[0].otu_labels.slice(0,10);
console.log(`otuLabels: ${idOTU}`)


// create traces
    var trace1 = {
        x: sampleValues,
        y: idOTU,
        text: otuLabels,
        type: "bar",
        name: "otu_labels",
        orientation: "h",
    };
// Create the data array for the plot
    var chartData = [trace1];

 // Define the plot layout
    var layout = {
        title: "Top 10 Bacteria Cultures Found",
        yaxis: {
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

//3. Create a bubble chart that displays each sample.
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

