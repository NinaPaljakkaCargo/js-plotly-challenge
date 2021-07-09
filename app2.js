
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

    //console.log(y_vals);
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


    function optionChanged(otu_ids) {
        chartData(otu_ids);
    };


    //**************setting up the bubble chart******************//
    var trace2 = {
        x: x_vals,
        y: y_vals,
        text: hvrText,
        mode: 'markers',
        marker: {
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            size: otu_values,
            sizemode: 'area',
        }
    };

    var bubbleData = [trace2];

    var layout = {
        title: "THIS IS THE TITLE",
        xaxis: { title: "Sample Values"},
        yaxis: { title: "Sample IDs"},
        showlegend: false,
        height: 600,
        width: 1000
    };

    Plotly.newPlot('bubble', bubbleData, layout);



});