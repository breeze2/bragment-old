import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { HashRouter as Router, Route } from 'react-router-dom'
import messages from '../locales'

import HomePage from '../containers/HomePage'
import BoardPage from '../pages/Board'

import '../styles/App.less'

interface InterfaceAppProps {
    language: string
}

class App extends Component<InterfaceAppProps> {
    public constructor(props: any) {
        super(props)
    }
    public render() {
        return (
            <div className="app">
                <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
                    <Router>
                        <Route exact path={['/', '/home', '/home/boards', '/home/logs']} component={HomePage} />
                        <Route exact path="/board/:id" component={BoardPage} />
                    </Router>
                </IntlProvider>
            </div>
        )
    }
}

export default App
