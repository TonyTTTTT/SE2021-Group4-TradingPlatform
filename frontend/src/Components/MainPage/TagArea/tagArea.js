import React from 'react';
import { Container } from 'react-bootstrap';

class TagArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
		return(
			<Container>
				<input type="submit" value="SingleTest"/>
				<input type="submit" value="Save Parameter"/>
			</Container>
		);
	}
}export default TagArea;