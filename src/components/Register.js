import React,{Component} from 'react'

class Register extends Component{
    render(){
        return(
            <div>
                <div className='col-sm-4 mx-auto card'>
                <div className='card-body'>
                    <div className= "card-title border-bottom border-secondary">
                        <h1>Register</h1>
                    </div>
                    <div className= "card-title">
                        <h4>Username</h4>
                    </div>
                    <form className="input-group">
                        <input type= "text" className= "form-control"></input>

                    </form>
                    <div className= "card-title">
                        <h4>Password</h4>
                    </div>
                    <form className="input-group">
                        <input type= "text" className= "form-control"></input>

                    </form>
                    </div>
                </div>
            </div>
        )
    }


}

export default Register