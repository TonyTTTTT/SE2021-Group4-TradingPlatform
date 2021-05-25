import {connect} from "react-redux";
import {
    decrementAction,
    incrementAction,
    incrementAsyncAction
} from "../../redux/actions/count";
import React, {Component} from "react";

// return value ==> props of UI
// const mapStateToProps = state => ({count: state})

// operate function
/*const mapDispatchToProps = dispatch => ({
    increment: data => dispatch(createIncrementAction(data)),
    decrement: data => dispatch(createDecrementAction(data)),
    incrementAsync: (data, time) => dispatch(createIncrementAsyncAction(data, time))
})*/

// container component
// export default connect(mapStateToProps, mapDispatchToProps)(CountUI);

class Count extends Component {

    increment = () => {
        const {value} = this.selectNum
        // store.dispatch(createIncrementAction(value * 1))
        this.props.increment(value * 1)
    }

    decrement = () => {
        const {value} = this.selectNum
        // store.dispatch(createDecrementAction(value * 1))
        this.props.decrement(value * 1)
    }

    incrementIfOdd = () => {
        const {value} = this.selectNum
        // const count = store.getState()
        // if (count % 2 !== 0) {
        //     store.dispatch(createIncrementAction(value * 1))
        // }
        if (this.props.count % 2 !== 0) {
            this.props.increment(value * 1)
        }
    }

    incrementAsync = () => {
        const {value} = this.selectNum
        // setTimeout(() => {
        //     store.dispatch(createIncrementAsyncAction(value * 1, 500))
        // }, 500)
        this.props.incrementAsync(value * 1, 500)
    }

    render() {
        return (
            <div>
                <h1>Sum: {this.props.count}  Total Person: {this.props.personCount}</h1>
                <select ref={c => this.selectNum = c}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementIfOdd}>Increase if odd</button>
                <button onClick={this.incrementAsync}>Async increase</button>
            </div>
        );
    }
}

export default connect(state => ({count: state.count, personCount: state.persons.length}),
    {
        increment: incrementAction,
        decrement: decrementAction,
        incrementAsync: incrementAsyncAction
    })(Count);