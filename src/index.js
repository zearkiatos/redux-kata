const { createStore } = require("redux");
const { counterTypes } = require("./types");

const INITIAL_STATE = 0;

const increment = () => ({ type: counterTypes.INCREMENT });
const decrement = () => ({ type: counterTypes.DECREMENT });

const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case counterTypes.INCREMENT:
      return state + 1;
    case counterTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch(increment());

store.dispatch(increment());

store.dispatch(increment());

store.dispatch(increment());

store.dispatch(increment());

store.dispatch(decrement());
