import ReactECharts from 'echarts-for-react';
import React from 'react';
import iCarData from './iCarData';

function CarCharts(props: { carlist: Array<iCarData> }) {


  const marqueProportion = () => {
    return (
      [...props
        .carlist
        .reduce(
          (acc, c) => acc.set(c.LIBMRQ, (acc.has(c.LIBMRQ) ? acc.get(c.LIBMRQ)! + 1 : 1)),
          new Map<string, number>()
        ).entries()]
        .sort((a, b) => b[1] - a[1])
        .map(x => ({ value: x[1], name: x[0] }))
        .slice(0, 10)
    );
  }

  const options1 = {
    title: {
      text: 'Repartition marques',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        data: marqueProportion(),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  const options2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: marqueProportion().map(x => x.name),
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: {
      type: 'value'
    },
    series: [{
      data: marqueProportion().map(x => x.value),
      type: 'bar'
    }]
  };

  return (
    <div>
      <ReactECharts option={options1} />
      <ReactECharts option={options2} />
    </div>

  )
}

export default CarCharts;