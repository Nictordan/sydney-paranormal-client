const paranormalReducer = (state, action) => {
    switch (action.type) {
        case 'setPin':
            return {
                ...state,
                "currentPin": action.data
            }
        default: {
            return null
        }
    }
}

export default paranormalReducer