import React,{Component} from 'react'
import {connect} from 'react-redux'
;
import {Redirect} from 'react-router-dom' 
import{onLoginUser} from '../actions/index'

// action creator
// setelah dimasukkan ke connect, akan dioanggil sebagai this.props.onLogInUser



class Login extends Component{
    onLoginClick = () => {
       //mengambil data dari textbox 
       let username = this.username.value
       let password = this.username.password
       // memanggil untuk kirim ke action creator 'onLoginUser'
       this.props.onLoginUser(username,password)
       
       //untuk mendapatkan value dari textbox
    }

    render(){
        if(!this.props.username){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-4 mx-auto mt-5 card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h1>
                                        Log In
                                    </h1>
                                </div>
                            
                                <form>
                                    <div className="input-group">
                                        <input ref={(input)=>{this.username = input}} 
                                        type="text" 
                                        className="form-control mt-3" 
                                        placeholder="Username"/>
                                    </div>
                                    
                                    <div className="input-group">
                                        <input ref={(input)=>{this.password = input}} 
                                        type="password" 
                                        className="form-control mt-3" 
                                        placeholder="Password"/>
                                    </div>
                                </form>
    
                                <div className="text-center">
                                    <button 
                                    className="btn btn-block btn-primary mt-4" 
                                    onClick={this.onLoginClick}>
                                    Log In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to= '/' />
        }
        
    }
    

}
//function yang akan mengambil data di redux state
const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
  }

export default connect(mapStateToProps,{onLoginUser})(Login)