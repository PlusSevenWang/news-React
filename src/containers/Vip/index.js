import React from 'react';
import './style.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';

class Vip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            fetchFinish: false
        }
    }

    render() {
        if(this.state.login) {
            if(!this.state.fetchFinish) {
                // 还未获取到登录状态
                return (
                    <>
                        <div className="vip">正在获取登录状态，请稍后...</div>
                    </>
                );
            }else {
                // 已登录，显示内容
                return (
                    <>
                        <div className="vip">您已登录，仅登录用户可看到此行文字</div>
                    </>
                );
            }  
        } else {
            // 若未登录，重定向到首页
            message.error('登录后才可查看VIP内容');
            return <Redirect to='/' />;
        }
    }

    componentDidMount() {
        // 获取登录状态
        axios.get('http://www.dell-lee.com/react/api/isLogin.json', {withCredentials: true})
        .then(data => {
            this.setState({
                login: data.data.data.login,
                fetchFinish: true
            })
        })
    }
}

export default Vip;