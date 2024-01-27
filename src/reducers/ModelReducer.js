const initialState = {
  isOpen: false,
};

const modelReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODEL":
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};

export { initialState, modelReducer };
