const { createStore, combineReducers } = require("redux");
const { counterTypes, filterTypes } = require("./types");

const INITIAL_STATE = 0;
const filters = {
  ALL: "ALL",
  COMPLETED: "COMPLETED",
  INCOMPLETED: "INCOMPLETED"
};

const increment = () => ({ type: counterTypes.INCREMENT });
const decrement = () => ({ type: counterTypes.DECREMENT });

const setFilter = (payload) => ({ type: filterTypes.SET_FILTER, payload });
const addTodo = (payload) => ({ type: filterTypes.ADD_TODO, payload });
const completeTodo = (payload) => ({
  type: filterTypes.COMPLETE_TODO,
  payload
});

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

const filterReducer = (state = filters.ALL, action) => {
  switch (action.type) {
    case filterTypes.SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case filterTypes.ADD_TODO:
      return [action.payload].concat(state);
    case filterTypes.COMPLETE_TODO:
      return state.map((todo, index) =>
        i === action.payload
          ? {
              ...todo,
              completed: true
            }
          : todo
      );
    default:
      return state;
  }
};

const reducer = combineReducers({
  filter: filterReducer,
  todos: todosReducer
});

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch(setFilter(filters.COMPLETED));

store.dispatch(
  addTodo({
    text: "First Todo"
  })
);
