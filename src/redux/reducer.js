import {
    CLEAR_MESSAGE,
    SELECTED_ENTRY,
    LOADING,
    SET_ENTRIES,
    SHOW_MESSAGE,
    SET_PAGE,
    SET_ENTRIES_PER_PAGE
} from "./actionTypes";

const initialState = {
    loading: true,
    page: 0,
    entriesPerPage: 5,
    entries: [],
    total: 0,
    message: null,
    sortBy: null,
    direction: 'asc',
    currentEntry: null
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
        case SET_ENTRIES: {
            return ({
                ...state,
                ...action.payload,
                currentEntry: null,
                loading: false
            })
        }
        case SELECTED_ENTRY : {
            return ({
                ...state,
                selectedEntry: action.entry
            })
        }
        case SET_PAGE: {
            return ({
                ...state,
                page: action.page
            })
        }
        case SET_ENTRIES_PER_PAGE: {
            return ({
                ...state,
                entriesPerPage: action.entriesPerPage
            })
        }
        default:
            return state;
    }
}
