const { createStore } = require("redux");
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

const INITIAL_TODO_STATE = {
  todos: [],
  filter: filters.ALL
};

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

const filterReducer = (state = INITIAL_TODO_STATE, action) => {
  switch (action.type) {
    case filterTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case filterTypes.ADD_TODO:
      return {
        ...state,
        todos: [action.payload].concat(state.todos)
      };
    case filterTypes.COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          i === action.payload
            ? {
                ...todo,
                completed: true
              }
            : todo
        )
      };
    default:
      return state;
  }
};

const store = createStore(filterReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch(setFilter(filters.COMPLETED));

store.dispatch(addTodo({
  text: 'First Todo'
}));
