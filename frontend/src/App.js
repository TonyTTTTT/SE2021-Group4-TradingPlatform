import React from 'react';
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import { Button,Container, Row, Col }from 'react-bootstrap';
import MainPage from './Components/MainPage';
import HomePage from './Components/HomePage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul style ={{margin:0}}>
                        <li style={{display:'none'}}><Link to="/">Home</Link></li>
                        <li style={{display:'none'}}><Link to="/main">Main</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/main" component={MainPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;