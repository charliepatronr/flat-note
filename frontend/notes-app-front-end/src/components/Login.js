import React from 'react';
import { connect } from 'react-redux'
import { loginSuccess } from '../actions/auth'


class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: null
  }

  handleInputChange = (e) => { 
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(this.state)
    }

    fetch(`http://localhost:3001/auth`, reqObj)
    .then(resp => resp.json())
    .then(data => {
        if (data.error) {
            this.setState({
                error: data.error
            })
        } else {
            localStorage.setItem('app_token', data.token)
            this.props.login(data)
            this.props.history.push('/notes')
        }  
        console.log(data)
    })
  }


  googleLogin = (e) => {
      e.preventDefault()
    //  this.props.history.push('/auth/google_oauth2/callback')
      window.location.href= "http://localhost:3001/auth/google_oauth2"

    //   console.log('LOGGIN IN WITH GOOGLE')
    //   const googleObj = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }, 
    //     body: ''
    //   }
    //   fetch(`http://localhost:3001/login/google`, googleObj)
    //   .then(resp => resp.json())
    //   .then(data => {0
    //       console.log(data)
    //   })

  }

  render(){
      console.log(this.props)
      const error = (
        <div className="ui icon warning message">
            <i className="lock icon"></i>
            <div className="content">
                <div className="header">
                Login failed!
                </div>
                <p>Invalid username or password</p>
            </div>
        </div>)

    return (
      <div>
        <div className="page-login">
            <div className="ui centered grid container">
                <div className="nine wide column">
                    {this.state.error && error}
                <div className="ui fluid card">
                    <div className="content">
                    <form className="ui form" onSubmit = {this.handleSubmit}>
                        <div className="field">
                            <label>Username</label>
                            <input name={'username'} onChange={this.handleInputChange} value={this.state.username}/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type ='password' name={'password'} onChange={this.handleInputChange} value={this.state.password} />
                        </div>
                        <button className="ui black labeled icon button">
                            <i className="unlock alternate icon"></i>
                            Login
                        </button>
                        <button className="ui google button" onClick = {(e) =>this.googleLogin(e)}>
                            <i className="google icon"></i>
                            Google
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth
//   }
// }


const mapDispatchToProps = dispatch => {
    return {
      login: user => dispatch(loginSuccess(user))
    };
  };

export default connect(null, mapDispatchToProps)(Login)


