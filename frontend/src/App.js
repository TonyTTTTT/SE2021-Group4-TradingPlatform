import React from 'react';
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import MainPage from './Components/MainPage';
import HomePage from './Components/HomePage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <div style={{background:"#E9EBED"}}>
                    <ul style={{margin: 0}}>
                        <li style={{display: 'none'}}><Link to="/">Home</Link></li>
                        <li style={{display: 'none'}}><Link to="/main">Main</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/main/:algoId" component={MainPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;