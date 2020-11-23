import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import MyContext from '../MyContext/MyContext'


const CLIENT_ID = '295800133741-b8b81vrq1k3bp38eb57arau0ki3bnnfi.apps.googleusercontent.com';


class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login = (response, context) => {
    if (response.accessToken) {
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
      console.log(response);
      context.set(response.wt.cu,response.wt.Ad,true);
    }
  }

  logout = (response, context) => {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
    context.set("","",false);
  }

  handleLoginFailure(response) {
    alert('Failed to log in')
  }

  handleLogoutFailure(response) {
    alert('Failed to log out')
  }

  render() {
    return (
      <MyContext.Consumer>{context => (
        <div>
          {this.state.isLogined ?
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText='Logout'
              onLogoutSuccess={(e) => this.logout(e,context)}
              onFailure={this.handleLogoutFailure}
            >
            </GoogleLogout>
            :
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText='Login'
              onSuccess={(e) => this.login(e,context)}
              onFailure={this.handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              responseType='code,token'
            />
          }
        </div>)}
      </MyContext.Consumer>
    )
  }
}

export default GoogleBtn;