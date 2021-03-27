import React from "react";
import logo from './logo.png';
import './style.css';
import { Menu } from 'antd';
import { UsergroupDeleteOutlined, IdcardOutlined, DingdingOutlined, GoogleOutlined, WechatOutlined, DribbbleOutlined} from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
  
    render() {
      return (
        <>
            <Link to='/'>
                <img src={logo} alt="logo" className="app-header-logo"/>
            </Link>
            <Menu mode="horizontal" className="app-header-menu">
                {this.getMenuItems()}
            </Menu>
        </>
      )
    }

    componentDidMount() {
        axios.get('http://www.dell-lee.com/react/api/header.json')
        .then(data => {
            const list = data.data.data;
            // 此处接口icon数据有误，使用自定义数据
            list[0].icon = <UsergroupDeleteOutlined />;
            list[1].icon = <IdcardOutlined />;
            list[2].icon = <DingdingOutlined />;
            list[3].icon = <GoogleOutlined />;
            list[4].icon = <WechatOutlined />;
            list[5].icon = <DribbbleOutlined />;
            this.setState({
                list: list
            })
        })
    }

    getMenuItems() {
        return (
            this.state.list.map(item => {
                return (
                    <Menu.Item key={item.id} icon={item.icon}>
                        <Link to={'/'+item.id}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            })
        )
    }
}

export default AppHeader;