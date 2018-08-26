import React, { Component } from "react";
import {connect} from 'react-redux';

class Header extends Component {
    renderContent(){
        console.log(this.props);
        if (this.props.auth) {
            if (this.props.auth.data == '') {
                // return "Logged out";
                return <li><a href="/auth/google/get">LOGIN</a></li>
            }else{
                return <li><a href="/api/logout">LOGOUT</a></li>;
            }
        } else {
                //return nothing
        }
    }
    

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                <a className="left brand-logo">See-Through</a>
                <ul className="right">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(Header);