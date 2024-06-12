import Purchase from "../models/Purchase.ts";
import { PurchasesItem } from "./PurchasesItem.tsx";
import { PurchaseDetail } from "./PurchaseDetail.tsx";
import {Alert, Box, Pagination, Paper} from "@mui/material";
import Progress from "./Progress.tsx";
import {usePurchases} from "../hooks/usePurchaseReducer.ts"; // Import the reducer


export const PurchasesList = ({ userId }: PurchasesList) => {
    const {
        state,
        error,
        handleDetailPurchase,
        handleClose,
        handleChangePagination,
    } = usePurchases(userId);


    const renderDialog = () => {
        return state.purchase && (
            <PurchaseDetail onClose={handleClose} open={state.openDetailsPurchase} purchase={state.purchase} />
        );
    };

    return (
        <>
            { state.purchases &&
                <Box sx={{ m: 6, backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={state.count}
                        size="large"
                        page={state.page}
                        variant="outlined"
                        shape="rounded"
                        onChange={(_e, page) => handleChangePagination(_e, page)} />
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
