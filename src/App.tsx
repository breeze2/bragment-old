import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import logo from './logo.svg'
import BoardPage from './pages/Board'
import BoardsPage from './pages/Boards'
import IndexPage from './pages/Index'

class App extends Component {
  public render() {
    return (
      <div className="app">
        <HashRouter>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/boards" component={BoardsPage} />
          <Route exact path="/board/:id" component={BoardPage} />
        </HashRouter>
      </div>
    )
  }
}

export default App
