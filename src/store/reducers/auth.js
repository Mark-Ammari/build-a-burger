import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../Utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.types) {
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true })
        case actionTypes.AUTH_FAIL:
            return updateObject(state, { error: action.error, loading: false })
        case actionTypes.AUTH_SUCCESS: {
            return authSuccess(state, action)
        }
        default: return state;
    }
};

export default reducer;