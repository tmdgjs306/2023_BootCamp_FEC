import React from 'react';
import { Chart, LineAdvance } from 'bizcharts';

const data = [
  {
    date: "2023.08.12",
    temperature: "24C",
  },
  {
    date: "2023.08.13",
    temperature: "22C",
  },
  {
    date: "2023.08.14",
    temperature: "23C",
  },
  {
    date: "2023.08.15",
    temperature: "23C",
  },
  {
    date: "2023.08.16",
    temperature: "21C",
  },


];
const ChartLine = () => {
  return (
    <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data} >

      <LineAdvance
        shape="smooth"
        point
        area
        position="date*temperature"
        color="city"
      />
    </Chart>

  )
}

export default ChartLine;