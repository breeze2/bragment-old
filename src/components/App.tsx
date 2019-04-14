import React, { PureComponent } from 'react'
import { IntlProvider } from 'react-intl'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import BoardPage from '../containers/BoardPage'
import FragmentPage from '../containers/FragmentPage'
import HomePage from '../containers/HomePage'
import messages from '../locales'

import AppHeader from '../containers/AppHeader'
import CreateBoardModal from '../containers/CreateBoardModal'

import IBoard from '../schemas/IBoard'

import '../styles/App.less'

interface IAppProps {
    currentBoard: IBoard | null
    createBoardModalVisible: boolean
    language: string
    asyncFetchBoardList: () => any
    setCreateBoardModalVisible: (visible: boolean) => any
}

class App extends PureComponent<IAppProps> {
    public constructor(props: any) {
        super(props)
    }
    public handleCreateBoardModalCancel = () => {
        return this.props.setCreateBoardModalVisible(false)
    }
    public handleCreateBoardModalOk = () => {
        return this.props.setCreateBoardModalVisible(false)
    }
    public componentDidMount() {
        this.props.asyncFetchBoardList()
    }
    public render() {
        return (
            <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
                <div className="app">
                    <Router>
                        <AppHeader />
                        <div className="app-content">
                            <Route exact path={['/', '/home', '/home/boards', '/home/logs']} component={HomePage} />
                            <Route exact path="/board/:id" component={BoardPage} />
                            <Route exact path="/fragment/:boardId/:columnTitle/:title" component={FragmentPage} />
                            <Route path="/" render={props => <CreateBoardModal visible={this.props.createBoardModalVisible}
                                onCancel={this.handleCreateBoardModalCancel}
                                onOk={this.handleCreateBoardModalOk} {...props}
                            />} />
                        </div>
                    </Router>
                </div>
            </IntlProvider>
        )
    }
}

export default App
