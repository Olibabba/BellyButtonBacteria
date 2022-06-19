const bbData = d3.json("samples.json")
bbData.then(console.log(bbData));

function init() {
    var selector = d3.select("#selDataset");
  
    bbData.then((data) => {
      
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector.append("option").text(sample).property("value", sample);
      });
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
  })}
  
init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

function buildMetadata(sample) {
    bbData.then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = Object.entries(resultArray[0]);
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      result.forEach(([key, pair]) => PANEL.append("h6").text(key +": " +pair));
    });
  }

  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    bbData.then((data) => {
      // 3. Create a variable that holds the samples array. 
      var sampleArray = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = sampleArray.filter(sampleObj => sampleObj.id == sample);
      var result = Object.entries(resultArray[0]);
      //  5. Create a variable that holds the first sample in the array.
      var firstSample = sampleArray[0]
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      let otu_ids = []
      for (let i = 0; i < result[1][1].length; i++){
            // console.log(result[1][1][i])
            otu_ids.push(`OTU ${result[1][1][i]}`)
        };
      let otu_labels =  result[3][1];
      let sample_values =  result[2][1];
      // console.log("result: " + result[3][1])
      // console.log("ids: " + otu_ids)

      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 

      let yticks = sample_values.sort(function (a,b) {
        return b - a;
        }).slice(0,10).reverse();
      // console.log(yticks)
      // // 8. Create the trace for the bar chart. 
      var trace1 = {
        bgcolor: "lavender",
        x: yticks,     
        y: otu_ids,       
        type: 'bar',
        text: otu_labels,
        orientation: 'h',
        marker: {      
        color: '#3cf281',
        line: {color: "white"}
        }
      
      };
      var barData = [trace1];
        
      // // 9. Create the layout for the bar chart. 
      var layout = {
        plot_bgcolor: 'rgb(26, 9, 51)',
        paper_bgcolor: 'rgb(26, 9, 51)',
        title: 'Top Ten' + '<br>' + 'Bacteria Cultures Found',      
        font:{      
          family: 'Raleway, sans-serif',
          color: "white"     
        },     
        showlegend: false,      
        xaxis: {    
          showgrid: true,
          "gridcolor": "white",
          "gridwidth": 2,           
          tickangle: -45      
        },
      
        yaxis: {      
          zeroline: false,      
          gridwidth: 10, 
          showgrid: true,
        },      
        // bargap :0.05     
      };
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot('bar', barData, layout);

    });
      // Use d3.json to load and retrieve the samples.json file 
    bbData.then((data) => {
    
              // 3. Create a variable that holds the samples array. 
      var sampleArray = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = sampleArray.filter(sampleObj => sampleObj.id == sample);
      var result = Object.entries(resultArray[0]);
      //  5. Create a variable that holds the first sample in the array.
      var firstSample = sampleArray[0]
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      let otu_ids = result[1][1]
      // for (let i = 0; i < result[1][1].length; i++){
      //       console.log(result[1][1][i])
      //       otu_ids.push(`OTU ${result[1][1][i]}`)
      //   };
      let otu_labels =  result[3][1];
      let sample_values =  result[2][1];
      // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
      // Plotly.newPlot(); 

      // 1. Create the trace for the bubble chart.
      var trace2 = {
        x: otu_ids,      
        y: sample_values,     
        text: otu_labels,     
        mode: 'markers',     
        marker: {      
          color: otu_ids,      
          size: sample_values,
          colorscale: 'Jet',     
        }
      
      };

      var bubbleData = [trace2
      ];

      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        plot_bgcolor: 'rgb(26, 9, 51)',
        paper_bgcolor: 'rgb(26, 9, 51)',
        title: 'Bacteria Cultures Per Sample',
        font:{color: "white"},
        showlegend: false,
        hovermode: "closest",   
        xaxis: {    
          zeroline: false, 
          showgrid: true,
          "gridcolor": "white",
          "gridwidth": 1,           
          // tickangle: -45      
        },
      
        yaxis: {    
          zeroline: false,   
          "gridcolor": "white",
          "gridwidth": 1, 
          showgrid: true,
        },         
        // height: 600,      
        // width: 600
      };

      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
    });

    bbData.then((data) => {
  
      // Create a variable that holds the samples array. 
      var metadata = data.metadata;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = Object.entries(resultArray[0]);
      //  5. Create a variable that holds the first sample in the array.
      // var firstSample = sampleArray[0]
      let wash = result[6][1]
      console.log(result)
      console.log(wash)
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      // let otu_ids = result[1][1]
      // for (let i = 0; i < result[1][1].length; i++){
      //       console.log(result[1][1][i])
      //       otu_ids.push(`OTU ${result[1][1][i]}`)
      //   };
      // let otu_labels =  result[3][1];
      // let sample_values =  result[2][1];
      // Create a variable that filters the samples for the object with the desired sample number.
  
      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
  
      // Create a variable that holds the first sample in the array.
    
  
      // 2. Create a variable that holds the first sample in the metadata array.
      
  
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
  
  
      // 3. Create a variable that holds the washing frequency.
     
      // Create the yticks for the bar chart.
     
      
      // 4. Create the trace for the gauge chart.
      var gaugeData = [

        {
      
          domain: { x: [0, 1], y: [0, 1] },
      
          value: wash,
      
          title: { text: 'Belly Button Washing Frequency' + '<br>' +  '<span style="font-size: 12px;">scrubs per week</span>', font: {color: "white"}},
      
          type: "indicator",
      
          mode: "gauge+number",
      
          // delta: { reference: 380 },
      
          gauge: {
            bordercolor: "white",
            axis: { range: [null, 10] },
            bar: { color: "darkblue" },
            steps: [
      
              { range: [0, 2], color: "#e44c55" },
              { range: [2, 4], color: "#f1b633" },
              { range: [4, 6], color: "yellow" },
              { range: [6, 8], color: "#3cf281" },
              { range: [8, 10], color: "darkgreen" }
      
            ],
      
            // threshold: {
      
            //   line: { color: "red", width: 4 },
      
            //   thickness: 0.75,
      
            //   value: 490
      
            }
      
          }
      
        
      
      ];
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = {
        // width: 500,

        // height: 400,
      
        margin: { t: 25, r: 25, l: 25, b: 25 },
      
        paper_bgcolor: 'rgb(26, 9, 51)',
      
        font: { color: "white", family: "Arial" }
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    });
  }
  