// 1. Use the D3 library to read in samples.json.
function createPlots(id) {
d3.json("samples.json").then(sampledata => {
 console.log(sampledata)
 let ids = sampledata.samples[0].otu_ids;
 console.log(ids)
 let sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
 console.log(sampleValues)
 let otuLabels = sampledata.samples[0].otu_labels.slice(0,10);
 console.log(otuLabels)


let topOTU = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
let idOTU = topOTU.map(d => "OTU" + d);
console.log(`OTU IDS: ${idOTU}`)
// first 10 objects for plotting
let otuLabels = sampledata.samples[0].otu_labels.slice(0,10);
console.log(`otuLabels: ${idOTU}`)


// create traces
    let trace1 = {
        x: sampleValues,
        y: idOTU,
        text: otuLabels,
        type: "bar",
        name: "otu_labels",
        orientation: "h",
    };
// Create the data array for the plot
    let chartData = [trace1];

 // Define the plot layout
    let layout = {
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


//3. Create a bubble chart that displays each sample.
let trace2 = {
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
let layout2 = {
    xaxis:{title: "OTU ID"},
    height: 600,
    width: 1000
};

// creating data variable 
let chartData2 = [trace2];

// create the bubble plot
Plotly.newPlot("bubble", chartData2, layout2); 
});

// 4. Display the sample metadata, i.e., an individual's demographic information.
// function demoData(id) {
//     d3.json("samples.json").then(demographics => {
//         let metaData = demographics.metadata;
//         // console.log(metaData)
//         let search = metaData.filter(meta => meta.id.toString() === id)[0];
//         let demo = d3.select("#sample_metadata");

//         demo.html("");

//     }
// }

