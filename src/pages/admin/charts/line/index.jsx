import React, { useState } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default function Line() {
    const [sales, setSales] = useState([5, 20, 36, 10, 10, 20])// 销量的数组
    const [stores, setStores] = useState([6, 10, 25, 20, 15, 10])// 库存的数组
    const update = () => {
        setSales(sales.map(sale => sale + 1))
        setStores(stores.reduce((pre, store) => {
            pre.push(store - 1)
            return pre
        }, []))
    }
   
    //   返回折线图的配置对象   
    const getOption = (sales, stores) => {
        return {
            // title: {
            //     text: 'ECharts 入门示例'
            // },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: sales
            }, {
                name: '库存',
                type: 'line',
                data: stores
            }]
        }
    }
    return (
        <div>
            <Card>
                <Button type='primary' onClick={update}>更新</Button>
            </Card>

            <Card title='折线图一'>
                <ReactEcharts option={getOption(sales, stores)} />
            </Card>

        </div>
    )
}
