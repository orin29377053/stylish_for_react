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
            };
        case "SERACH_PRODUCT":
            return {
                ...state,
                product: action.payload.product,
            };
        case "GET_CAMPAIGN":
            return {
                ...state,
                campaign: action.payload.campaign,
            };
        case "GET_SINGLE_PRODUCT":
            return {
                ...state,
                singleProduct: action.payload.singleProduct,
            };
        case "TAKE_ORDER":
            return {
                ...state,
                order: [...state.order, action.payload.order],
            };
        case "CHECKOUT":
            return {
                ...state,
                order: [],
            };
        case "GET_JWT":
            action.payload.jwt === ""
                ? localStorage.removeItem("JWT")
                : localStorage.setItem("JWT", action.payload.jwt);
            return {
                ...state,
                jwt: action.payload.jwt,
            };

        default:
            return state;
    }
};

export default todoReducer;
