import React from "react";
import { Layout } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppHeader from './components/header/index.js';
import PageList from './containers/List/index.js';
import Details from './containers/Details/index.js';
import Login from './components/Login/index.js';
import Vip from './containers/Vip/index.js';

const { Header, Footer, Content } = Layout;

class App extends React.Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Layout style={{ minWidth: 1300, height: '100%' }}>
            <Header className="header">
              <AppHeader />
            </Header>
            <Content className="content">
              <Login />
              <Switch>
                {/* 使用Switch仅使用第一个匹配到的组件 */}
                <Route path="/detail/:id" component={Details} />
                <Route path="/vip" component={Vip} />
                {/* :id?表示可以不存在id，即可以匹配到根目录 */}
                <Route path="/:id?" component={PageList} />
              </Switch>
            </Content>
            <Footer className="footer">
              <a href="https://beian.miit.gov.cn/" target="blank" style={{ color: '#757575' }}>豫ICP备 2021006810号-1</a>
              &nbsp;&nbsp;非商业网站 仅作个人练习使用
          </Footer>
          </Layout>
        </BrowserRouter>
      </>
    )
  }

}

export default App;