function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      var firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildCharts(firstSample);
    });
}

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  };
init();

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      // Create Demographic Data Box
      PANEL.html("");
      PANEL.append("h6").text('ID: '+result.id);
      PANEL.append("h6").text('ETHNICITY: '+result.ethnicity);
      PANEL.append("h6").text('GENDER: '+result.gender);
      PANEL.append("h6").text('AGE: ' +result.age);
      PANEL.append("h6").text('LOCATION: ' + result.location);
      PANEL.append("h6").text('BBTYPE: '+result.bbtype);
      PANEL.append("h6").text('WFREQ: '+result.wfreq);
    });
}

function buildCharts(sample) {
    d3.json('samples.json').then((data) => {
      // Gather variable from data.samples
      var OTU = data.samples;
      var resultOTU = OTU.filter(sampleObj => sampleObj.id == sample);
      var finalOTU = resultOTU[0];
      var otu_ids = finalOTU.otu_ids;
      var sample_values = finalOTU.sample_values;
      var otu_labels = finalOTU.otu_labels;

      // Create Bar Chart
      var yticks = otu_ids.slice(0,10).map(otu_ids => `OTU ${otu_ids}`).reverse()
      var barTrace = {
        x: sample_values.slice(0,10).reverse(),
        y: yticks,
        text: otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
      };

      var barLayout = {
        title: 'Top 10 Bacteria Cultures Found',
        margin: {
          t: 30,
          l: 150,
        }
      };
      
      var barData = [barTrace];

      Plotly.newPlot('bar', barData, barLayout);

      // Create Bubble Chart
      var bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        text: otu_labels,
        marker: {
          color: otu_ids,
          size: sample_values,
          colorscale: 'Earth'
        }
      };

      var bubbleData = [bubbleTrace];

      var bubbleLayout = {
        xaxis: { title: 'OTU ID' },
        title: "Bacteria Cultures Per Sample",
        margin: {
          t: 0,
          t: 30
        },
        hovermode: 'closest',
      };

      Plotly.newPlot('bubble', bubbleData, bubbleLayout)

    });
}

function buildGauge(wfreq) {
    // Frequencey between 0 and 180
    var level = parseFloat(wfreq) * 20;
    // Calculations using MathPI
    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI)/180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    // Main Path
    var mainPath = "M -.0 -0.05 L .0 0.05 L";
    var paX = String(x);
    var space = " ";
    var paY = String(y);
    var pathEnd = "Z";
    var path = mainPath.concat(paX, space, paY, pathEnd);
  
    var gaugeData= [
        {
            type: "scatter",
            x: [0],
            y: [0],
            marker: {size:12, color: "80000"},
            showlegend: false,
            name: "Freq",
            text: level,
            hoverinfo: "text+name"
        },
        {
            values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
            rotation: 90, 
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: [
                    "rgba(0, 105, 11, .5)",
                    "rgba(10, 120, 22, .5)",
                    "rgba(15, 127, 0, .5)",
                    "rgba(110, 154, 22, .5)",
                    "rgba(170, 202, 42, .5)",
                    "rgba(205, 209, 95, .5)",
                    "rgba(210, 206, 145, .5)",
                    "rgba(230, 226, 202, .5)",
                    "rgba(240, 230, 215, .5)",
                    "rgba(255, 255, 255, 0)",
                ]
            },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false
        },
    ];
    
      var gaugeChart = document.getElementById("gauge");
      Plotly.newPlot(gaugeChart, gaugeData, gaugeLayout);
  }
  