import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-more";
import "highcharts/modules/solid-gauge";

const SimpleGauge: React.FC<{ value: number }> = ({ value }) => {
 const options = {
    chart: {
      type: "solidgauge",
      backgroundColor: "transparent",
      width: "60px",
      height: "30px",  
      margin: [0, 0, 0, 0], // remove all margins
      spacing: [0, 0, 0, 0], // remove spacing
    },
    title: null,
    
    tooltip: { enabled: false },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
      labels: { enabled: false },
    },
    plotOptions: {
      solidgauge: {
        rounded: true,
        dataLabels: {
          enabled: true,
          borderWidth: 0,
          useHTML: true,
          y: -60, // move text upward
          format:
            '<div style="text-align:center"><span style="font-size:28px;font-weight:600">{y}%</span></div>',
        },
      },
    },
    series: [
      {
        name: "Progress",
        data: [value],
        innerRadius: "60%",
        radius: "100%",
        color:
          value < 30 ? "#d9534f" : value < 70 ? "#f0ad4e" : "#5cb85c", // red → yellow → green
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SimpleGauge;
