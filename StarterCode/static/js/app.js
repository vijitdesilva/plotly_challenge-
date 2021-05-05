d3.json("data.samples.json").then(samples) => {
    console.log(sampledata)
    // create traces
    var trace1 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        type: "bar",
        name: "otu_labels",
    }
};
// Create the data array for the plot
var data = [trace1];

 // Define the plot layout
var layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Organ" },
    yaxis: { title: "Square Root of Survival" }
  };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot", data, layout);
});

