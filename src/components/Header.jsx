  import React, {Component} from 'react'
import {
    Collapse,
    Button,
    Navbar,
    NavbarToggler,
    Nav,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    NavItem
     } from 'reactstrap';
import {Link,NavLink} from 'react-router-dom'
import {} from 'react-redux'
import {connect} from 'react-redux';
import {onLogoutUser} from '../actions'


class Header extends Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
        
      }
      onButtonClick = () => {
        this.props.onLogoutUser()
      }

render() {
  if(!this.props.username){
    
  
    return (
      
        <div>
          <Navbar color="light" light expand="md">
            <Link className="navbar-brand" to="/">Orchid Four</Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                
                <NavItem>
                    <NavLink to='/register'>
                    <Button className="mx-3" color="primary">Register</Button>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/login'>
                    <Button color="success">Log In</Button> 
                    </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }else{

      return (
      
        <div>
         <Navbar color="light" light expand="md">
              <Link className="navbar-brand" to="/">Orchid Four</Link>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/manageproducts">All Products</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hello, {this.props.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem 
                    onClick={this.props.onLogoutUser}>
                      Log Out
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
        </div>
      );

    }
}

}

const mapStateToProps = state => {
  return {
    username : state.auth.username
  }
}


export default connect(mapStateToProps, {onLogoutUser})(Header)