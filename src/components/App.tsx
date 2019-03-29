import { Layout } from 'antd'
import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { HashRouter as Router, Route } from 'react-router-dom'

import HomePage from '../containers/HomePage'
import messages from '../locales'
import BoardPage from '../pages/Board'

import AppHeader from '../containers/AppHeader'
import CreateBoardModal from '../containers/CreateBoardModal'

import '../styles/App.less'

interface IAppProps {
    createBoardModalVisible: boolean,
    language: string,
    setCreateBoardModalVisible: (visible: boolean) => any
}

class App extends Component<IAppProps> {
    public constructor(props: any) {
        super(props)
    }
    public handleCreateBoardModalCancel = () => {
        return this.props.setCreateBoardModalVisible(false)
    }
    public handleCreateBoardModalOk = () => {
        return this.props.setCreateBoardModalVisible(false)
    }
    public render() {
        return (
            <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
                <Layout className="app">
                    <Router>
                        <AppHeader />
                        <Layout.Content className="app-content">
                            <Route exact path={['/', '/home', '/home/boards', '/home/logs']} component={HomePage} />
                            <Route exact path="/board/:id" component={BoardPage} />
                            <Route path="/" render={props => <CreateBoardModal visible={this.props.createBoardModalVisible}
                                onCancel={this.handleCreateBoardModalCancel}
                                onOk={this.handleCreateBoardModalOk} {...props}
                            />} />
                        </Layout.Content>
                    </Router>
                </Layout>
            </IntlProvider>
        )
    }
}

export default App
