import React from 'react';
import { Container ,Row,Col} from 'react-bootstrap';
import Header from "./Header/header"
import Menu from "./Menu/menu"
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Container style={{height:400,width:800}}>
                <Header></Header>
                <Menu></Menu>
            </Container>
        );
    }
}
export default HomePage;