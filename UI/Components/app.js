import React from 'react';
import { HashRouter ,Switch, Route, Link } from 'react-router-dom';
import { Button,Container, Row, Col }from 'react-bootstrap';
import MainPage from './MainPage/index';
import HomePage from './HomePage/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li style={{display:'none'}}><Link to="/">Home</Link></li>
                        <li style={{display:'none'}}><Link to="/main">Main</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/main" component={MainPage}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;