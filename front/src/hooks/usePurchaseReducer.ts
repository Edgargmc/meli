import Purchase from "../models/Purchase.ts";

const ITEM_PER_PAGE = 4;

// eslint-disable-next-line
// @ts-ignore
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_PURCHASES":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_PURCHASES_SUCCESS":
            return {
                ...state,
                isLoading: false,
                purchases: action.payload.purchases,
                count: Math.ceil(action.payload.paginationData.total / ITEM_PER_PAGE),
            };
        case "FETCH_PURCHASES_ERROR":
            return {
                ...state,
                isLoading: false,
            };
        case "OPEN_PURCHASE_DETAIL":
            return {
                ...state,
                openDetailsPurchase: true,
                purchase: state.purchases.find((p: Purchase) => p.purchase_id === action.payload.purchaseId),
            };
        case "CLOSE_PURCHASE_DETAIL":
            return {
                ...state,
                openDetailsPurchase: false,
            };
        case "CHANGE_PAGE":
            return {
                ...state,
                page: action.payload.page,
            };
        default:
            return state;
    }
};

export default reducer;
