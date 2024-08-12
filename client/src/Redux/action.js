export const setUser = (user_id, user_name, like_total) => {
    return {
        type: 'SET_USER',
        payload: { user_id, user_name, like_total}
    };
};

export const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    }  
};

export const setLikeTotal = (likeTotal) => {
    return {
        type: 'SET_LIKE_TOTAL',
        payload: likeTotal
    };
};