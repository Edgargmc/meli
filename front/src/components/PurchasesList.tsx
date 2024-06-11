import UserService from "../services/UsersService";
import {useEffect, useReducer, useState} from "react";
import Purchase from "../models/Purchase.ts";
import { PurchasesItem } from "./PurchasesItem.tsx";
import { PurchaseDetail } from "./PurchaseDetail.tsx";
import {Alert, Box, Pagination, Paper} from "@mui/material";
import Progress from "./Progress.tsx";
import reducer from "../hooks/usePurchaseReducer.ts"; // Import the reducer

const ITEM_PER_PAGE = 4;

const initialState = {
    purchases: [],
    isLoading: true,
    openDetailsPurchase: false,
    purchase: null,
    page: 1,
    count: 1,
};

export const PurchasesList = ({ userId }: PurchasesList) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState(null); // State for error message

    useEffect(() => {
        dispatch({ type: "FETCH_PURCHASES" });
        const fetchData = async (page: number) => {
            try {
                const response = await new UserService().getPurchases(userId, page, ITEM_PER_PAGE);
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
        fetchData(state.page);
    }, [userId, state.page]);

    const handleDetailPurchase = (purchaseId?: string) => {
        dispatch({ type: "OPEN_PURCHASE_DETAIL", payload: { purchaseId } });
    };

    const handleClose = () => {
        dispatch({ type: "CLOSE_PURCHASE_DETAIL" });
    };

    const handleChangePagination = (_e: unknown, page: number) => {
        dispatch({ type: "CHANGE_PAGE", payload: { page } });
    };

    const renderDialog = () => {
        return state.purchase && (
            <PurchaseDetail onClose={handleClose} open={state.openDetailsPurchase} purchase={state.purchase} />
        );
    };

    return (
        <>
            { state.purchases &&
                <Box sx={{ m: 6, backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={state.count} size="large" page={state.page} variant="outlined" shape="rounded" onChange={handleChangePagination} />
                </Box>
            }
            {state.isLoading ? ( <Progress />) :
                error ? (<Alert severity="error">{error}</Alert>) :
                (<>
                    {state.purchases && state.purchases.length > 0 ? (
                        <>
                            {state.purchases.map((purchase: Purchase, index:number) => (
                                <Paper elevation={3} key={index}>
                                    <PurchasesItem
                                        key={index}
                                        purchase={purchase}
                                        detailPurchase={() => handleDetailPurchase(purchase.purchase_id)}
                                    />
                                </Paper>
                            ))}
                        </>
                    ) : (
                        <Alert severity="info">No purchases found.</Alert>
                    )}
                    {renderDialog()}
                </>
            )}
        </>
    );
};

interface PurchasesList {
    userId: number;
}
