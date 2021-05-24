// create action for Count
import {DECREMENT, INCREMENT} from "../constant";

export const incrementAction = data => ({type: INCREMENT, data})

export const decrementAction = data => ({type: DECREMENT, data})

export const incrementAsyncAction = (data, time) =>
    dispatch =>
        setTimeout(() => dispatch(incrementAction(data))
            , time)
