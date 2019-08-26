import React, {Component} from 'react'
import {
    Collapse,
    Button,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {Link,NavLink} from 'react-router-dom'

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

render() {
    return (
        <div>
          <Navbar color="light" light expand="md">
            <Link className="navbar-brand" to="/">Orchid Four</Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className ='nav-link' to="/">All Products</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className ='nav-link' to="/">Manage</NavLink>
                </NavItem>
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
}

}

export default Header