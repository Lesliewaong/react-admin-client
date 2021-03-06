import React from "react";
import {
  Axis,
  Chart,
  Tooltip,
  Interval,
  View,
  Line,
  Legend,
  getTheme
} from "bizcharts";

const theme = getTheme();


export default function LineDemo() {
  const data = [
    { name: '漫画', month: 'Jan.', monthAverageRain: 18.9 },
    { name: '漫画', month: 'Feb.', monthAverageRain: 28.8 },
    { name: '漫画', month: 'Mar.', monthAverageRain: 39.3 },
    { name: '漫画', month: 'Apr.', monthAverageRain: 81.4 },
    { name: '漫画', month: 'May', monthAverageRain: 47 },
    { name: '漫画', month: 'Jun.', monthAverageRain: 20.3 },
    { name: '漫画', month: 'Jul.', monthAverageRain: 24 },
    { name: '漫画', month: 'Aug.', monthAverageRain: 35.6 },
    { name: '手办', month: 'Jan.', monthAverageRain: 12.4 },
    { name: '手办', month: 'Feb.', monthAverageRain: 23.2 },
    { name: '手办', month: 'Mar.', monthAverageRain: 34.5 },
    { name: '手办', month: 'Apr.', monthAverageRain: 99.7 },
    { name: '手办', month: 'May', monthAverageRain: 52.6 },
    { name: '手办', month: 'Jun.', monthAverageRain: 35.5 },
    { name: '手办', month: 'Jul.', monthAverageRain: 37.4 },
    { name: '手办', month: 'Aug.', monthAverageRain: 42.4 },
  ];
  const average = data.reduce((pre, item) => {
    const { month, monthAverageRain } = item;
    if (!pre[month]) {
      pre[month] = 0
    }
    pre[month] += (monthAverageRain);
    return pre;
  }, {});

  const averageData = Object.keys(average).map(key => {
    return { month: key, averageRain: Number((average[key] / 2).toFixed(2)), name: 'avg' }
  })

  const scale = {
    month: {
      sync: true
    },
    averageRain: {
      min: 0,
      max: 100,
      alias: 'Average'
    },
    monthAverageRain: {
      min: 0,
      max: 100
    }
  }

  const colors = theme.colors10;
  /**
   * 图例开关状态
   */
  let legendMap = {}
  /**
   * 图表实例
   */
  let chartIns;
  return (
    <div className='line'>
      <Chart height={250}  scale={scale}
        data={data} autoFit
        onGetG2Instance={c => chartIns = c}>
        <Tooltip shared />
        <Interval
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0,
            },
          ]}
          color={["name", colors]}
          position="month*monthAverageRain"
        />
        <Axis name='monthAverageRain' position='left' />
        <View data={averageData} scale={scale} padding={0} >
          <Axis name='averageRain' position='right' />
          <Line
            position="month*averageRain"
            color={colors[2]}
          />
        </View>
        <Legend custom={true} items={[
          {
            name: "漫画", value: '漫画', marker: {
              symbol: 'square',
              style: { fill: colors[0] }
            }
          },
          {
            name: "手办", value: '手办', marker: {
              symbol: 'square',
              style: { fill: colors[1] }
            }
          },
          {
            name: "平均", value: 'avg', marker: {
              symbol: 'hyphen',
              style: { stroke: colors[2], lineWidth: 2 }
            },
          }]}
          onChange={(ev) => {
            const { item } = ev;
            const { value } = item;
            const checked = !item.unchecked;
            // 设置图例项状态
            legendMap[value] = checked;
            if (value === 'avg') {
              // 通过filter控制元素显示隐藏
              const view = chartIns.views[0];
              view.filter('name', (val) => {
                return legendMap[val]
              })
              // 重新渲染，触发filter
              view.render(true)
            } else {
              // 通过filter控制元素显示隐藏
              chartIns.filter('name', (val) => {
                return legendMap[val] !== false
              })
              // 重新渲染，触发filter
              chartIns.render(true)
            }
          }}
        />

      </Chart>
    </div>
  )
}