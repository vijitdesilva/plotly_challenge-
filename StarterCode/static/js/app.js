function createPlots(id) {
    //1.Use the D3 library to read in samples.json.
        d3.json("samples.json").then (sampledata =>{
            //console.log(sampledata) -> Variable checked in console 
            // var ids = sampledata.samples[0].otu_ids;
            //console.log(ids) -> Variable checked in console 
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            //console.log(sampleValues) -> Variable checked in console 
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            //console.log (labels) -> Variable checked in console 

    // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        // filter top 10 otu ids for the plot OTU and reversing it. 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // otu id's to the desired form for the plot
            var OTU_id = OTU_top.map(d => "OTU " + d);
            //console.log(`OTU IDS: ${OTU_id}`) -> Variable checked in console 
         // top 10 labels for the plot
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'grayblue'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var data = [trace];
    
            // create layout variable for br chart 
            var layout = {
                title: "Top 10 Bacterial Cultures Found",
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
    
            // create the bar plot
        Plotly.newPlot("bar", data, layout);

// 2. Create a bubble chart that displays each sample.
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
                title: "Bacteria Cultures Per Sample",
                height: 600,
                width: 1000
            };
    
            // creating data variable 
            var data2 = [trace2];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data2, layout2); 
        
        });
    }  
// 4. Display the sample metadata, i.e., an individual's demographic information.


// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
    function getDemo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demoInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
           demoInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    //  change event
    function optionChanged(id) {
        createPlots(id);
        getDemo(id);
    }
    
    //  initial data rendering
    function init() {
        // dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            createPlots(data.names[0]);
            getDemo(data.names[0]);
        });
    }
    
    init();