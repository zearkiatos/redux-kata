const { createStore } = require("redux");
const { counterTypes } = require("./types");

const counterReducer = (state = 0, action) => {
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

store.dispatch({
    type: counterTypes.INCREMENT
});

store.dispatch({
    type: counterTypes.INCREMENT
});

store.dispatch({
    type: counterTypes.INCREMENT
});

store.dispatch({
    type: counterTypes.INCREMENT
});

store.dispatch({
    type: counterTypes.INCREMENT
});