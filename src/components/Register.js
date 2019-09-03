
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' 

class Register extends Component {

    onRegisterClick = () => {
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value

        // cek apakah username sudah terpakai
        axios.get(
            'http://localhost:2019/users', 
            {
                params:{
                    username: username
                    
                }
                
            }
        ).then((res) => {
            if(res.data.length>0){
                alert('username is already being used')
            }else{
                //check if email is already used
                axios.get(
                    'http://localhost:2019/users', 
                    {
                        params:{
                            email: email
                            
                        }
                        
                    }
                ).then ((res) => {

                    //jika user ditemukan
                    if(res.data.length>0){
                        alert('email is already being used')
                    }else{
                        alert('Register success!')
                        axios.post(
                            'http://localhost:2019/users', 
                            {
                                username: username,
                                email: email,
                                password: password
                            }
                        )
                        
                    }
                })

            }
        })
        
        // POST data tersebut ke db.json

        
    }

    render() {
        if(!this.props.username){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-4 mx-auto mt-5 card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h1>Register</h1>
                                </div>
                            
                                <form>
                                    <div className="input-group"><input ref={(input)=>{this.username = input}} type="text" className="form-control mt-3" placeholder="Username"/></div>
                                    <div className="input-group"><input ref={(input)=>{this.email = input}} type="email" className="form-control mt-3" placeholder="Email"/></div>
                                    <div className="input-group"><input ref={(input)=>{this.password = input}} type="password" className="form-control mt-3" placeholder="Password"/></div>
                                </form>
    
                                <div className="text-center">
                                    <button className="btn btn-block btn-primary mt-4" onClick={this.onRegisterClick}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        } else {
            return (
                <Redirect to= '/'/>
            )
        }
        
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
  }
  export default connect(mapStateToProps)(Register)


