import { useReducer } from "react";
import UserService from "../services/UsersService.ts";
import User from "../models/User.ts";
import Restrictions from "../models/Restrictions.ts";

export const useUserProfile = () => {
    const initialState = {
        user: null,
        restrictions: [],
        isLoading: true,
    };

    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    ...state,
                    user: action.payload.user,
                    restrictions: action.payload.restrictions,
                    isLoading: false,
                };
            case 'FETCH_ERROR':
                console.error('Error fetching data:', action.payload.error);
                return { ...state, isLoading: false };
            case 'REMOVE_ALERT':
                return {
                    ...state,
                    restrictions: state.restrictions.filter((_, i) => i !== action.payload.index),
                };
            default:
                throw new Error();
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        try {
            const [user, restrictions] = await Promise.all([
                new UserService().getProfile(),
                new UserService().getRestrictions(1)
            ]);
            dispatch({ type: 'FETCH_SUCCESS', payload: { user: user.data, restrictions: restrictions.data } });
        } catch (error: unknown) {
            dispatch({ type: 'FETCH_ERROR', payload: { error } });
        }
    };

    const handleAlertClose = (index: number) => {
        dispatch({ type: 'REMOVE_ALERT', payload: { index } });
    };

    return { state, fetchData, handleAlertClose };
};

interface State {
    user: User | null;
    restrictions: Restrictions[];
    isLoading: boolean;
}

type Action =
    | { type: 'FETCH_SUCCESS'; payload: { user: User; restrictions: Restrictions[] } }
    | { type: 'FETCH_ERROR'; payload: { error: unknown } }
    | { type: 'REMOVE_ALERT'; payload: { index: number } };
