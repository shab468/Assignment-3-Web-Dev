/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import Navigation from './components/Navigation'; 
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  //get credits and debits from API when component mounts
  async componentDidMount() {
    const creditRes = await fetch("https://johnnylaicode.github.io/api/credits.json");
    const creditData = await creditRes.json();

    const debitRes = await fetch("https://johnnylaicode.github.io/api/debits.json");
    const debitData = await debitRes.json();

    const totalCredits = creditData.reduce((sum, item) => sum + item.amount, 0);
    const totalDebits = debitData.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalCredits - totalDebits;

    this.setState({
      creditList: creditData,
      debitList: debitData,
      accountBalance: balance
    });
  }

  // Add new credit and update balance
  addCredit = (newCredit) => {
    const updatedCredits = [...this.state.creditList, newCredit];
    const totalCredits = updatedCredits.reduce((sum, item) => sum + item.amount, 0);
    const totalDebits = this.state.debitList.reduce((sum, item) => sum + item.amount, 0);
    const newBalance = totalCredits - totalDebits;

    this.setState({
      creditList: updatedCredits,
      accountBalance: newBalance
    });
  }

  // Add new debit and update balance
  addDebit = (newDebit) => {
    const updatedDebits = [...this.state.debitList, newDebit];
    const totalCredits = this.state.creditList.reduce((sum, item) => sum + item.amount, 0);
    const totalDebits = updatedDebits.reduce((sum, item) => sum + item.amount, 0);
    const newBalance = totalCredits - totalDebits;

    this.setState({
      debitList: updatedDebits,
      accountBalance: newBalance
    });
  }

  // Update current user on login
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    )
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    )

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div style={{ backgroundColor: '#FFFACD', minHeight: '100vh' }}>
          <Navigation />
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;