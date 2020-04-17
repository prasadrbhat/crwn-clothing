import React from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {auth} from './firebase/firebase.utils.js';

const HatsPage = () => (
  <div>
        <h1>Hats Page</h1>
  </div>
);

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }


  unsubsucribeFromAuth = null;
  componentDidMount(){
   this.unsubsucribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});

      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubsucribeFromAuth(); 
  }


  render(){
     return (
    <div>
    <Header currentUser={this.state.currentUser} />
      <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/shop' component={ShopPage}/>
            <Route exact path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
  }
 
}

export default App;
