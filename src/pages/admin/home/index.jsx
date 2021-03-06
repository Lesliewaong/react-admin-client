import React from 'react'
import {
    Card,
    Statistic,
    DatePicker,
    Timeline
} from 'antd'
import { ReloadOutlined, ArrowUpOutlined, QuestionCircleOutlined, ArrowDownOutlined } from '@ant-design/icons'
import moment from 'moment'

import LineDemo from './line'
import StockDemo from './stock'
import './index.less'

const dateFormat = 'YYYY/MM/DD'
const { RangePicker } = DatePicker

export default function Home() {
    return (
        <div className='home'>
            <Card
                className="home-card"
                title="商品总量"
                extra={<QuestionCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                headStyle={{ color: 'rgba(0,0,0,.45)' }}
            >
                <Statistic
                    value={1128163}
                    suffix="个"
                    style={{ fontWeight: 'bolder' }}
                />
                <Statistic
                    value={15}
                    valueStyle={{ fontSize: 15 }}
                    prefix={'周同比'}
                    suffix={<div>%<ArrowDownOutlined style={{ color: 'red', marginLeft: 10 }} /></div>}
                />
                <Statistic
                    value={10}
                    valueStyle={{ fontSize: 15 }}
                    prefix={'日同比'}
                    suffix={<div>%<ArrowUpOutlined style={{ color: '#3f8600', marginLeft: 10 }} /></div>}
                />
            </Card>

            <LineDemo/>

            <Card
                className="home-content"
                title={<div className="home-menu">
                </div>}
                extra={<RangePicker
                    defaultValue={[moment('2021/01/01', dateFormat), moment('2022/01/01', dateFormat)]}
                    format={dateFormat}
                />}
            >
                <Card
                    className="home-table-left"
                    title= '股票走势'
                    bodyStyle={{ padding: 0, height: 350 }}
                    extra={<ReloadOutlined />}
                >
                    <StockDemo />
                </Card>

                <Card title='任务' extra={<ReloadOutlined />} className="home-table-right">
                    <Timeline>
                        <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                        <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>联调接口</p>
                            <p>功能验收</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>登录功能设计</p>
                            <p>权限验证</p>
                            <p>页面排版</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </Card>
        </div>
    )
}
