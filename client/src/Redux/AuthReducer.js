const initialState = {
    user_id: null,
    user_name: null,
    isLoggedIn: false,
    likeTotal: 0,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            const newUser = {
                ...state,
                user_id: action.payload.user_id,
                user_name: action.payload.user_name,
                likeTotal: action.payload.like_total,
                isLoggedIn: true,
            };
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;

        case 'CLEAR_USER':
            localStorage.removeItem('user'); 
            return {
                ...state,
                user_id: null,
                user_name: null,
                isLoggedIn: false,
                likeTotal: 0
            };

        case 'SET_LIKE_TOTAL':
            const updatedUser = {
                ...state,
                likeTotal: action.payload,
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;

        default:
            return state;
    }
};

export default authReducer;