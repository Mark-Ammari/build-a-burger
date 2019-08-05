export const updateObject = (state, action) => {
    return {
        ...state,
        ...action
    }
}