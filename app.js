//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//OTU id on y axis, sample_values on x-axis, otu_labels as hovertext

function bargraph(id_input) {
    d3.json("samples.json").then((importedData) => {
        //console.log(importedData);
        var data = importedData.samples;
        //get id data for dropdown
        var ids = data.filter(x => x.id == id_input);
        var otu_ids = ids[0].otu_ids;
        var otu_labels = ids[0].otu_labels;
        var otu_values = ids[0].sample_values;
        var y_vals = (otu_ids.slice(0,10).map(x => "OTU" + x)).reverse();
        var x_vals = (otu_values.slice(0,10)).reverse();
        var hvrText = (otu_labels.slice(0,10)).reverse();
    
        var trace = {
            x: x_vals,
            y: y_vals,
            text: hvrText,
            type: "bar",
            orientation: "h"
        };

        var layout = {
            title: "Top 10 OTU's Found",
            xaxis: { title: "Sample Values"},
            yaxis: { title: "Sample ID"}
        };
        Plotly.newPlot("bar-plot", data, layout);
    });

}











