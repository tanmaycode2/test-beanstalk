import React, { Component } from "react";
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <nav className={`${styles.nav}`}>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo"><img className={`${styles.logo}`} src={logo} alt="logo"></img></a>
                    <ul className="right hide-on-med-and-down">
                        <li><button className={`waves-effect waves-light btn ${styles.button}`}>VIEW PDF</button></li>
                        <li><button className={`waves-effect waves-light btn ${styles.button}`}>BUILD REQUEST LIST</button></li>
                        <li>
                            <button className={`btn ${styles.dropdown}`}>
                                <span className="col s1"><MenuIcon htmlColor="black"/></span>
                                <span className="col s1"><AccountCircleIcon htmlColor="black" /></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;