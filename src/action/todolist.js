export const addTodo = (todo) => ({
    type: "ADD_DO",
    payload: {
        todo,
    },
});
export const searchProduct = (product) => ({
    type: "SERACH_PRODUCT",
    payload: {
        product,
    },
});

export const getCampaign = (campaign) => ({
    type: "GET_CAMPAIGN",
    payload: {
        campaign,
    },
});

export const getSingleProduct = (singleProduct) => ({
    type: "GET_SINGLE_PRODUCT",
    payload: {
        singleProduct,
    },
});

export const takeOrder = (order) => ({
    type: "TAKE_ORDER",
    payload: {
        order,
    },
});
export const getJWT = (jwt) => ({
    type: "GET_JWT",
    payload: {
        jwt,
    },
});
export const checkOut = () => ({
    type: "CHECKOUT",

});

