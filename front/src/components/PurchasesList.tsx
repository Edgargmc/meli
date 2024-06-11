import UserService from "../services/UsersService";
import {useEffect, useState} from "react";
import Purchase from "../models/Purchase.ts";
import {PurchasesItem} from "./PurchasesItem.tsx";
import {PurchaseDetail} from "./PurchaseDetail.tsx";
import {Box, Pagination, Paper} from "@mui/material";
import Progress from "./Progress.tsx";

const ITEM_PER_PAGE = 4;

export const PurchasesList = ({userId}: PurchasesList) => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [openDetailsPurchase, setOpenDetailsPurchase] = useState(false);
    const [purchase, setPurchase] = useState<Purchase>();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (page: number) => {
        setIsLoading(true);
        const getNumber = (total:number) => {
            return Math.ceil(total / ITEM_PER_PAGE);
        }
        try{
            const response = await new UserService().getPurchases(userId, page, ITEM_PER_PAGE)
            setPurchases(response.purchases);
            setCount(getNumber(response.paginationData.total));
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleDetailPurchase = (purchaseId?: string) => {
        const currentPurchases = purchases.find(p => { return p.purchase_id == purchaseId})
        setPurchase(currentPurchases!);
        setOpenDetailsPurchase(true);
    }

    const handleClose = () => {
        setOpenDetailsPurchase(false);
    };

    useEffect(() => {
        fetchData(page);
    }, [userId]);

    const renderDialog = () => {
        return (purchase &&
            <PurchaseDetail
                onClose={handleClose}
                open={openDetailsPurchase}
                purchase={purchase}/>
        );
    }

    const handleChangePagination = (_e: unknown, page: number) => {
        setPage(page);
        fetchData(page)
    }

    return (
        <>
            <Box sx={{ m: 6, backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChangePagination}
                />
            </Box>
            {isLoading ? (
                <Progress />
            ) : (
                <>
                    {purchases && purchases.length > 0 ? (
                        <>
                            {purchases.map((purchase: Purchase, index) => (
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
                        <div>No purchases found.</div>
                    )}
                    {renderDialog()}
                </>
            )}
        </>
    );
}

interface PurchasesList {
    userId: number;
}