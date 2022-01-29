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

const type = makeType('TODOS');

const FETCH_START = type('FETCH_START');
const FETCH_SUCCESS = type('FETCH_SUCCESS');
const FETCH_ERROR = type('FETCH_ERROR');

const initialState = {
  data: [],
  fetched: false,
  fetching: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    }
  }
};

const startFetch = makeActionCreator(FETCH_START);

const successFetch = makeActionCreator(FETCH_SUCCESS, 'payload');

const errorFetch = makeActionCreator(FETCH_ERROR, 'error');

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
