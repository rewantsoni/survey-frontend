import MyContext from '../MyContext/MyContext';
import React, { Component } from 'react';


//custom Provider to pass values 
class MyProvider extends Component {
    state = { email: "", name: "", isSignedin: false }
    render() {
        return (
            <MyContext.Provider value={
                {
                    state: this.state,
                    set: (email, name, val) =>
                        this.setState({
                            email: email,
                            name: name,
                            isSignedin:val
                        })
                }}>
                {this.props.children}
            </MyContext.Provider>);
    }
}

export default MyProvider;
