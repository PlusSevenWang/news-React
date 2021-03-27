import React from 'react';
import { List } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <>
                <List
                    style={{backgroundColor: '#fff'}}
                    size="large"
                    bordered
                    dataSource={this.state.data}
                    renderItem={item => {
                        return (
                            <Link to={'/detail/'+item.id}>
                                <List.Item style={{color: '#1890ff'}}>{item.title}</List.Item>
                            </Link>
                        )
                    }}
                />
            </>
        )
    }

    componentDidMount() {
        // 在组件初次挂载时获取数据
        const id = this.props.match.params.id;
        let url = 'http://www.dell-lee.com/react/api/list.json';
        // 判断id是否存在以生成不同的url
        if(id) {
            url += `?id=${id}`;
        }
        axios.get(url)
        .then(data => {
            this.setState({
                data: data.data.data
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        // 使用此生命周期函数，每次点击不同的标签时，传入的id（props）变化，会触发此函数
        // 使用nextProps，获取点击后的新参数，若使用this.props则是点击前的数据
        const id = nextProps.match.params.id;
        axios.get('http://www.dell-lee.com/react/api/list.json?id=' + id)
        .then(data => {
            this.setState({
                data: data.data.data
            })
        })
    }
}

export default PageList;