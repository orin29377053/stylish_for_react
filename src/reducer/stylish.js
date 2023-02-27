const initState = {
    todoList: ["第一件事情", "第二件事情"],
    kkk: 12345676,
    product: null,
    campaign: null,
    singleProduct: null,
    order: [],
    jwt: null,
};

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_DO":
            return {
                ...state,
                todoList: [...state.todoList, action.payload.todo],
                // kkk: action.payload.todo,
            };
        case "SERACH_PRODUCT":
            return {
                ...state,
                product: action.payload.product,
                // kkk: action.payload.todo,
            };
        case "GET_CAMPAIGN":
            return {
                ...state,
                campaign: action.payload.campaign,
                // kkk: action.payload.todo,
            };
        case "GET_SINGLE_PRODUCT":
            return {
                ...state,
                singleProduct: action.payload.singleProduct,
                // kkk: action.payload.todo,
            };
        case "TAKE_ORDER":
            return {
                ...state,
                order: [...state.order, action.payload.order],
                // kkk: action.payload.todo,
            };
        case "CHECKOUT":
            return {
                ...state,
                order: [],
                // kkk: action.payload.todo,
            };
        case "GET_JWT":
            return {
                ...state,
                jwt: action.payload.jwt,
                // kkk: action.payload.todo,
            };
        
        default:
            return state;
    }
};

export default todoReducer;
