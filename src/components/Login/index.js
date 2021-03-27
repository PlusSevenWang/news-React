import React from 'react';
import { Button, Modal, Input, message } from 'antd';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            modal: false,
            user: '',
            password: ''
        }
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    render() {
        const login = this.state.login;
        return (
            <>
                {/* 判断是否登录，显示不同内容 */}
                {
                    login ?
                        <Link to="/">
                            <Button type="primary" className='btn' onClick={this.logOut}>退出</Button>
                        </Link>
                        :
                        <Button type="primary" className='btn' onClick={this.showModal}>登录</Button>
                }
                <Link to='/vip'>
                    <Button type="primary" className='btn'>VIP</Button>
                </Link>
                <span className="tip">由于部分浏览器版本(如Chrome80版本)升级后对跨域接口默认的安全策略改变(请求接口未携带cookie)，若想在登录后查看VIP中内容需要手动修改策略。谷歌浏览器:地址栏输入chrome://flags/，在页面中输入SameSite，将第一个改为disable，重启浏览器即可。</span>
                <Modal title="登录" visible={this.state.modal} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>( 用户名与密码均为 admin )</p>
                    <Input 
                        value={this.state.user} 
                        onChange={this.handleUserChange} 
                        placeholder='请输入用户名' 
                        style={{marginBottom: 10}}/>
                    <Input 
                        value={this.state.password} 
                        onChange={this.handlePassWordChange} 
                        placeholder='请输入密码' 
                        type='password' />
                </Modal>
            </>
        )
    }

    componentDidMount() {
        // 获取登录状态
        // 跨域携带cookie保存登录状态（chrome浏览器部分版本需要手动设置）
        axios.get('http://www.dell-lee.com/react/api/isLogin.json', {withCredentials: true})
        .then(data => {
            this.setState({
                login: data.data.data.login
            })
        })
    }

    // 设置对话框是否可见
    setIsModalVisible(state) {
        this.setState({
            modal: state
        })
    }

    // 确定键事件
    handleOk() {
        // 验证是否登录成功
        const { user, password } = this.state;
        const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
        axios.get(url, {withCredentials: true})
        .then(data => {
            const loginResult = data.data.data.login;
            if(loginResult) {
                message.success('登录成功');
                this.setState({
                    login: true
                })
                this.setIsModalVisible(false);
            } else {
                message.error('登录失败');
                this.setState({
                    login: false
                })
            }
        })
    };
    
    // 取消键事件
    handleCancel() {
        this.setIsModalVisible(false);
    };

    // 登录按钮事件
    showModal() {
        this.setIsModalVisible(true);
    }
    
    // 退出按钮事件
    logOut() {
        // 退出登录
        axios.get('http://www.dell-lee.com/react/api/logOut.json', {withCredentials: true})
        .then(data => {
            const logout = data.data.data.logout;
            if(logout)
            this.setState({
                login: false
            })
        })
    }

    // 用户名输入框内容
    handleUserChange(e) {
        this.setState({
            user: e.target.value
        })
    }

    // 密码输入框内容
    handlePassWordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
}

export default Login;