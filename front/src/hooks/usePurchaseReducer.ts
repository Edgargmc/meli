import {useEffect, useReducer, useState} from "react";
import UsersServices from "../services/UsersService.ts";
import Purchase from "../models/Purchase.ts";

const ITEM_PER_PAGE = 4;

const initialState = {
    purchases: [],
    isLoading: true,
    openDetailsPurchase: false,
    purchase: null,
    page: 1,
    count: 1,
};

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

export const usePurchases = (userId: number) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch({ type: "FETCH_PURCHASES" });
        const fetchData = async () => {
            try {
                const response = await new UsersServices().getPurchases(userId, state.page, ITEM_PER_PAGE);
                dispatch({
                    type: "FETCH_PURCHASES_SUCCESS",
                    payload: response,
                });
            } catch (error) {
                // eslint-disable-next-line
                // @ts-ignore
                setError(error.message);
                dispatch({ type: "FETCH_PURCHASES_ERROR" });
            }
        };
        fetchData();
    }, [userId, state.page]);

    const handleDetailPurchase = (purchaseId: string | undefined) => {
        dispatch({ type: "OPEN_PURCHASE_DETAIL", payload: { purchaseId } });
    };

    const handleClose = () => {
        dispatch({ type: "CLOSE_PURCHASE_DETAIL" });
    };

    const handleChangePagination = (_e: React.ChangeEvent<unknown>, page: number) => {
        dispatch({ type: "CHANGE_PAGE", payload: { page } });
    };

    return {
        state,
        error,
        handleDetailPurchase,
        handleClose,
        handleChangePagination,
    };
};
