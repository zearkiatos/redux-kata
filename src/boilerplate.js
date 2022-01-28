const makeType = (module) => (type) => `${module}/${type}`;

const type = makeType("LIST");

const makeActionCreator =
  (type, ...argumentsName) =>
  (...arguments) => {
    const action = { type };
    argumentsName.forEach((argument, index) => {
      action[argumentsName[index]] = arguments[index];
    });
    return action;
  };

const ADD_TODO = type("ADD_TODO");
const REMOVE_TODO = type("REMOVE_TODO");
const UPDATE_TODO = type("UPDATE_TODO");

const addTodo = makeActionCreator(ADD_TODO, "payload");
const removeTodo = makeActionCreator(REMOVE_TODO, "payload");
const updateTodo = makeActionCreator(UPDATE_TODO, "payload");

console.log(addTodo(1));
