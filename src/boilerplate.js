const makeType = (module) => (type) => `${module}/${type}`;

const type = makeType('LIST');

const ADD_TODO = type('ADD_TODO');
const REMOVE_TODO = type('REMOVE_TODO');
const UPDATE_TODO = type('UPDATE_TODO');

const ADD_TODO = "FORM/ADD_TODO";
