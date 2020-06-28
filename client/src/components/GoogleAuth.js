import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  // read the documentation completely to understand the different methods --> https://developers.google.com/identity/sign-in/web/reference
  componentDidMount() {
    window.gapi.load("auth2", () => {
      // returns a promise
      window.gapi.auth2
        .init({
          clientId:
            "524523897258-35m53e5t2jmu3p6ln0bf5dogck1am9qe.apps.googleusercontent.com",
          scope: "email profile"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // First time get the value from google api if it is true or false and then update the redux store
          // Here you have called the onAuthChange and passing a value
          this.onAuthChange(this.auth.isSignedIn.get());
          // As per the google docs listen passes a boolen value automatically to the inner callback function
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // the listen passes an boolean arguement to the callback function  --> isUserSignedIn
  onAuthChange = isUserSignedIn => {
    if(isUserSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    }
    else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
      this.auth.signIn().then((success) => {
        this.props.signIn(this.auth.currentUser.get().getId());
      }).catch(() => {
        this.props.signOut();
      })
  }
  onSignOutClick = () => {
      this.auth.signOut().then((success) => {
        this.props.signOut();
      }).catch(() => {
        this.props.signIn();
      })
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
        return null;
    } else if (this.props.isSignedIn) {
        return (
            <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                Sign Out
            </button>
        )
    } else {
        return (
            <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon" />
                Sign In With Google
            </button>
        )
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, {
  signIn: signIn,
  signOut: signOut
})(GoogleAuth);
