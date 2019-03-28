import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { HashRouter as Router, Route } from 'react-router-dom'

import HomePage from '../containers/HomePage'
import messages from '../locales'
import BoardPage from '../pages/Board'

import CreateBoardModal from './CreateBoardModal'

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
                <div className="app">
                    <Router>
                        <Route exact path={['/', '/home', '/home/boards', '/home/logs']} component={HomePage} />
                        <Route exact path="/board/:id" component={BoardPage} />
                    </Router>
                    <CreateBoardModal visible={this.props.createBoardModalVisible}
                        onCancel={this.handleCreateBoardModalCancel}
                        onOk={this.handleCreateBoardModalOk}
                    />
                </div>
            </IntlProvider>
        )
    }
}

export default App
