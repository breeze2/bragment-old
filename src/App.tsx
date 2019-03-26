import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import messages from './locales'
import store from './redux'

import BoardPage from './pages/Board'
import HomePage from './pages/Home'

interface InterfaceAppState {
  language: string
}

class App extends Component {
  public state: InterfaceAppState
  public constructor(props: any) {
    super(props)
    this.state = {
      language: store.getState().home.get('language'),
    }
  }
  public render() {
    return (
      <div className="app">
        <ReduxProvider store={store}>
          <IntlProvider locale={this.state.language} messages={messages[this.state.language]}>
            <Router>
              <Route path="/" component={HomePage} />
              <Route exact path="/board/:id" component={BoardPage} />
            </Router>
          </IntlProvider>
        </ReduxProvider>
      </div>
    )
  }
}

export default App
