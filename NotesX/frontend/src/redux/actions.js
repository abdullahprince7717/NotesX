const setUser = (user) => {
    return {
        type: "LOGIN",
        payload: { userInfo: user }
    }
};


export { setUser }