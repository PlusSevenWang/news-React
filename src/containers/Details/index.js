import React from 'react';
import { Card } from 'antd';
import axios from 'axios';
import './style.css';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }

    render() {
        return (
            <>
                <div className="site-card-border-less-wrapper">
                    <Card title={this.state.title} bordered={false}>
                        <div dangerouslySetInnerHTML={{__html:this.state.content}} className='detail'></div>
                        {/* 使用dangerouslySetInnerHTML属性，取消内容的转义 */}
                    </Card>
                </div>
            </>
        )
    }

    componentDidMount() {
        // 根据id获取数据
        axios.get('http://www.dell-lee.com/react/api/detail.json/?id='+this.props.match.params.id)
        .then(data => {
            this.setState({
                title: data.data.data.title,
                content: data.data.data.content
            })
        })
    }
}

export default Details;