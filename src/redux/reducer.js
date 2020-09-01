import {CLEAR_MESSAGE, LOADING, SET_PAGE, SHOW_MESSAGE} from "./actionTypes";

const initialState = {
    loading: true,
    page: 1,
    entriesPerPage: 20,
    entries: [],
    total: 0,
    message: null,
    sortBy: null,
    direction: 'asc'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING: {
            return ({
                ...state,
                loading: true,
            });
        }
        case SHOW_MESSAGE: {
            return ({
                ...state,
                loading: false,
                message: action.message,
            });
        }
        case CLEAR_MESSAGE: {
            return ({
                ...state,
                loading: false,
                message: null,
            });
        }
        case SET_PAGE: {
            return ({
                ...state,
                ...action.payload,
                loading: false
            })
        }
        default:
            return state;
    }
}
