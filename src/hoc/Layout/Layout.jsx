import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.jsx'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.jsx'

class Layout extends Component {
    state = {
        showSideDrwaer : true
    }
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrwaer: false})
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {showSideDrwaer: !prevState.showSideDrwaer}
        })
    }

    render(){
        return ( 
            <Aux>
            <Toolbar drwerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer open={this.state.showSideDrwaer} closed={this.sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>
         );    
    }
}
 
export default Layout;