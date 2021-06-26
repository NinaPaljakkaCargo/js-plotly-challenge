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
});


    function optionChanged(otu_ids) {
        bargraph(otu_ids);
    };



//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//OTU id on y axis, sample_values on x-axis, otu_labels as hovertext

function bargraph() {
    d3.json("samples.json").then((importedData) => {
        //console.log(importedData);
        var data = importedData.samples;
        //get id data
        var ids = data.filter(x => x.id == id_input);
        var otu_ids = ids[0].otu_ids; //array with ids
        var otu_labels = ids[0].otu_labels; //array with labels by ids
        var otu_values = ids[0].sample_values; //array with values by ids
        var hvrText = (otu_labels.slice(0,10)).reverse();
    

        var trace1 = {
            x: (otu_values.slice(0,10)).reverse(),
            y: (otu_ids.slice(0,10).map(x => "otu" + x)).reverse(),
            text: hvrText,
            type: "bar",
            orientation: "h"
        };

        var chartData = [trace1];
        
        var layout = {
            title: "Top 10 OTU's Found",
            xaxis: { title: "Sample Values"},
            yaxis: { title: "Sample IDs"}
        };

        Plotly.newPlot("bar", chartData, layout);
    });
    
};




//Create a bubble chart that displays each sample.
//function bubbleChart(id_input) {

//};









