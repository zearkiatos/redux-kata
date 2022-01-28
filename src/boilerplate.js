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

const FETCH_START = "TODOS_FETCH_START";
const FETCH_SUCCESS = "TODOS_FETCH_SUCCESS";
const FETCH_ERROR = "TODOS_FETCH_ERROR";

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

const startFetch = () => ({
  type: FETCH_START
});

const successFetch = (payload) => ({
  type: FETCH_ERROR
});

const errorFetch = (error) => ({
  type: FETCH_ERROR,
  error
});

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
