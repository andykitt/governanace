export const CREATE_ACCOUNT = "CREATE_ACCOUNT";

export const initialState = {
  account: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return {
        ...state,
        account
      };
    default:
      throw new Error("Reducer error");
  }
};

export default reducer;
