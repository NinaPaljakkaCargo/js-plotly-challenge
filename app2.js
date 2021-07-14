
//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//OTU id on y axis, sample_values on x-axis, otu_labels as hovertext

d3.json("samples.json").then((importedData) => {
    //console.log(importedData);
    var data = importedData.samples;
        //get id data
    var ids = data.filter(x => x.id);
    var otu_ids = ids[0].otu_ids; //array with ids
    var otu_labels = ids[0].otu_labels; //array with labels by ids
    var otu_values = ids[0].sample_values; //array with values by ids
    var y_vals = (otu_ids.slice(0,10).map(x => "otu" + x)).reverse();
    var x_vals = (otu_values.slice(0,10)).reverse();
    var hvrText = (otu_labels.slice(0,10)).reverse();

    console.log(y_vals);
    //console.log(x_vals);
    //console.log(hvrText);


    //****************setting up the bar chart***********************//
    var trace1 = {
        x: x_vals,
        y: y_vals,
        text: hvrText,
        type: "bar",
        orientation: "h"
    };

    //console.log(trace1);

    var chartData = [trace1];

    var layout = {
        title: "Top 10 OTU's Found",
        xaxis: { title: "Sample Values"},
        yaxis: { title: "Sample IDs"},
        height: 600,
        width: 800
    };

    Plotly.newPlot("bar", chartData, layout);


    //**************setting up the bubble chart******************// 

    var trace2 = {
        x: otu_ids,
        y: otu_values,
        text: hvrText,
        mode: 'markers',
        marker: {
            color: otu_ids,
            colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']],
            size: otu_values,
            sizemode: 'area'
        }
    };

    var bubbleData = [trace2];

    var layout = {
        title: "Values for all Sample IDs",
        xaxis: { title: "Sample IDs"},
        yaxis: { title: "Sample Values"},
        showlegend: false,
        height: 600,
        width: 1000
    };

    Plotly.newPlot('bubble', bubbleData, layout);




    //***********setting up the ID menu*************************//


    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var otu_ID = dropdownMenu.property("value");

        //access the data
        var OTU_data = data[OTU_ID];
  
        // Initialize x and y arrays
        var xData = Object.keys(OTU_data.platforms);
        var yData =Object.values(OTU_data.platforms);
  
        //Plot
        var trace3 = {
            x: xData,
            y: yData,
            type: "bar"
        };

        var chartData2 = [trace3];

        return chartData2;
  
    }
    
    function updatePlot() {
        var chartData2 = plotData();
        Plotly.react("bar", chartData2);
    }
  
    d3.selectAll("#selDataset").on("change", updatePlotly);




    //**************setting up the demographic display*****************//
//id = sample-metadata

    

});