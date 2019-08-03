import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Home from './components/Home'

const App = () => (
      <Router>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </Router>
)

export default hot(module)(App)
