// BUBBLE CHART ---> THIS ALL WORKS
var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    mode: 'markers',
    marker: {
      size: [400, 600, 800, 1000],
      sizemode: 'area'
    }
  };
  
  var trace2 = {
    x: [1, 2, 3, 4],
    y: [14, 15, 16, 17],
    text: ['A</br>size: 40</br>sixeref: 0.2', 'B</br>size: 60</br>sixeref: 0.2', 'C</br>size: 80</br>sixeref: 0.2', 'D</br>size: 100</br>sixeref: 0.2'],
    mode: 'markers',
    marker: {
      size: [400, 600, 800, 1000],
      //setting 'sizeref' to lower than 1 decreases the rendered size
      sizeref: 2,
      sizemode: 'area'
    }
  };
  
  var trace3 = {
    x: [1, 2, 3, 4],
    y: [20, 21, 22, 23],
    text: ['A</br>size: 40</br>sixeref: 2', 'B</br>size: 60</br>sixeref: 2', 'C</br>size: 80</br>sixeref: 2', 'D</br>size: 100</br>sixeref: 2'],
    mode: 'markers',
    marker: {
      size: [400, 600, 800, 1000],
      //setting 'sizeref' to less than 1, increases the rendered marker sizes
      sizeref: 0.2,
      sizemode: 'area'
    }
  };
  
  // sizeref using above forumla
  var desired_maximum_marker_size = 40;
  var size = [400, 600, 800, 1000];
  var trace4 = {
    x: [1, 2, 3, 4],
    y: [26, 27, 28, 29],
    text: ['A</br>size: 40</br>sixeref: 1.25', 'B</br>size: 60</br>sixeref: 1.25', 'C</br>size: 80</br>sixeref: 1.25', 'D</br>size: 100</br>sixeref: 1.25'],
    mode: 'markers',
    marker: {
      size: size,
      //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
      sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
      sizemode: 'area'
    }
  };
  
  var data = [trace1, trace2, trace3, trace4];
  
  var layout = {
    title: 'Bubble Chart Size Scaling',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  //Plotly.newPlot('bubble', data, layout);





//MY CODE STARTS HERE


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


    function optionChanged(otu_ids) {
        bargraph(otu_ids);
    };



//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//OTU id on y axis, sample_values on x-axis, otu_labels as hovertext

    




//Create a bubble chart that displays each sample.
var trace2 = {
    x: ids[0].otu_ids,
    y: ids[0].sample_values,
    text: (otu_labels.slice(0,10)).reverse(),
    mode: 'markers',
    marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: ids[0].sample_values,
        sizemode: 'area',
    }
};

var bubbleData = [trace2];

var layout = {
    title: "THIS IS THE TITLE",
    showlegend: false,
    height: 600,
    width: 600
};

Plotly.newPlot('bubble', bubbleData, layout);










