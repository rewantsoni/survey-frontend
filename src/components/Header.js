import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from './MyContext/MyContext'
import GoogleBtn from './googleLogin/googlelogin';

const Header = (data) => {
    return (
        <MyContext.Consumer>{(context =>
            <div className="ui secondary pointing menu ">
                <Link to="/" className="item">
                    Hi{context.state.isSignedin?" "+context.state.name:""},
                </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        <button type="button">Home</button>
                    </Link>
                <GoogleBtn />
                </div>
            </div>
        )}</MyContext.Consumer>

    );
};

export default Header;