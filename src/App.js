import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout.jsx'

//routing
import {Route, Switch} from 'react-router-dom'
import Orders from './containers/Orders/Orders.jsx'

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
          <Layout>
            <Switch>
              <Route path='/checkout' component={Checkout} />
              <Route path='/orders' component={Orders} />
              <Route path='/' exact component={BurgerBuilder} />
            </Switch>
          </Layout>
      </div>
     );
  }
}
 
export default App;
