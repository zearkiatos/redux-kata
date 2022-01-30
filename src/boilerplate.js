const makeType = (module) => (type) => `${module}_${type}`;

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

const createReducer =
  (initializationState, handlers) =>
  (state = initializationState, action) =>
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](type, action)
      : state;

const type = makeType("TODOS");

const FETCH_START = type("FETCH_START");
const FETCH_SUCCESS = type("FETCH_SUCCESS");
const FETCH_ERROR = type("FETCH_ERROR");

const initialState = {
  data: [],
  fetched: false,
  fetching: false
};

const fetchStartReducer = (state) => ({ ...state, fetching: true });
const fetchSuccessReducer = (state, action) => ({
  ...state,
  fetching: false,
  fetched: true,
  data: action.payload
});
const fetchErrorReducer = (state, action) => ({
  ...state,
  fetching: false,
  error: action.error
});

const reducer = createReducer(initialState, {
  [FETCH_START]: fetchStartReducer,
  [FETCH_SUCCESS]: fetchSuccessReducer,
  [FETCH_ERROR]: fetchErrorReducer
});

const startFetch = makeActionCreator(FETCH_START);

const successFetch = makeActionCreator(FETCH_SUCCESS, "payload");

const errorFetch = makeActionCreator(FETCH_ERROR, "error");

const fetch = () => {
  async (dispatch) => {
    dispatch(startFetch());
    try {
      const response = await fetch("/todos");
      const data = await response.json();
      dispatch(successFetch(data));
    } catch (ex) {
      dispatch(errorFetch(ex));
    }
  };
};
