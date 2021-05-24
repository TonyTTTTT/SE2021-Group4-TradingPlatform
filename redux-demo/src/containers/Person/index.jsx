import React, {Component} from 'react';
import {nanoid} from "nanoid";
import {connect} from "react-redux";
import {addPersonAction} from "../../redux/actions/person";

class Person extends Component {

    addPerson = () => {
        const name = this.nameNode.value
        const age = this.ageNode.value
        const personObj = {id: nanoid(), name, age}
        this.props.addPerson(personObj)
        this.nameNode.value = ''
        this.ageNode.value = ''
    }

    render() {
        return (
            <div>
                <h2>Person  Sum: {this.props.sum}</h2>
                <input ref={c => this.nameNode = c} type='text' placeholder='Name'/>
                <input ref={c => this.ageNode = c} type='text' placeholder='Age'/>
                <button onClick={this.addPerson}>Add</button>
                <ul>
                    {
                        this.props.persons.map(personObj =>
                            <li key={personObj.id}>{personObj.name}--{personObj.age}</li>)
                    }
                </ul>
            </div>
        );
    }
}

export default connect(state => ({persons: state.persons, sum: state.count}),
    {addPerson: addPersonAction})(Person)