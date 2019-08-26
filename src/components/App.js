import React, { Component } from 'react'
import {Route,BrowserRouter} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Header from './Header'
import ManageProducts from './ManageProducts'

class App extends Component{
    render(){
        return(
            <BrowserRouter>
            <Header/>
            <Route path='/' exact component={Home}/>
            <Route path='/header' exact component={Header}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/manageproducts' component={ManageProducts}/>
            </BrowserRouter>
    
        )
        }
}

export default App