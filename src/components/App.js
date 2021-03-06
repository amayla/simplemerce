import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, BrowserRouter} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Header from './Header'
import ManageProducts from './ManageProducts'
import ProductDetail from './ProductDetail'
import {connect} from 'react-redux'


// action creator
const keepLogin = (objUser) => {
    return {
        type:'LOGIN_SUCCESS',
        payload:{
            id:objUser.id,
            username:objUser.username
        }
    }
}

class App extends Component {
    //ketika app running, kita akan check local storage

    state = {
        check : false
    }

    componentDidMount(){
        //check local storage
       let userStorage = JSON.parse(localStorage.getItem(`userData`))

       if(userStorage){
           //kirim ke redux
           this.props.keepLogin(userStorage)
       }
       this.setState({check:true})
    }

    render() {
        if(this.state.check){

        return (
            <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/Home' exact component={Home}/>
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/manageproducts' component={ManageProducts} />
                <Route path='/productdetail/:id' component={ProductDetail}/>
            </BrowserRouter>
        )
    }else{
        return <div><h1 className='text-center'>Loading</h1></div>
    }
}


}

export default connect (null,{keepLogin}) (App)