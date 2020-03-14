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
    });
}