import {
    CLEAR_MESSAGE,
    SHOW_MESSAGE,
    LOADING,
    SET_ENTRIES,
    SELECTED_ENTRY,
    SET_PAGE,
    SET_ENTRIES_PER_PAGE, SORT_BY, DIRECTION
} from "./actionTypes";
import api from "../api/api";
import store from "./store";

const ERROR_MESSAGE_DURATION = 3000;


export function clearMessage() {
    return ({type: CLEAR_MESSAGE});
}

export function loading() {
    return ({type: LOADING});
}

export function showMessage(message) {
    return function (dispatch) {
        dispatch({
            type: SHOW_MESSAGE,
            message,
        });
        setTimeout(() => dispatch(clearMessage()), ERROR_MESSAGE_DURATION);
    };
}


export function getEntries() {
    const {page, entriesPerPage, sortBy, direction} = store.getState();
    return async function (dispatch) {
        try {
            const payload = await api.getPage(page, entriesPerPage, sortBy, direction);
            dispatch({
                type: SET_ENTRIES,
                payload
            });
        } catch (error) {
            dispatch(showMessage({message: error.message, severity: 'error'}))
        }
    }
}

export function addEntry(history, entry) {
    return async function (dispatch) {
        dispatch(loading());
        try {
            const message = await api.addEntry(entry);
            dispatch(selectEntry(entry));
            history.push(`/${entry.ean}/edit`);
            dispatch(showMessage({message, severity: 'info'}));
        } catch (error) {
            dispatch(showMessage({message: error.message, severity: 'error'}))
        }
    }
}

export function saveEditedEntry(ean, entry, history) {
    return async function (dispatch) {
        dispatch(loading());
        try {
            const message = await api.editEntry(ean, entry);
            dispatch(selectEntry(entry));
            history && history.push(`/${entry.ean}/edit`);
            dispatch(showMessage({message, severity: 'info'}));
        } catch (error) {
            dispatch(showMessage({message: error.message, severity: 'error'}))
        }
    }
}

export function removeEntry(ean) {
    return async function (dispatch) {
        dispatch(loading());
        try {
            const message = await api.removeEntry(ean);
            dispatch(showMessage({message, severity: 'info'}));
        } catch (error) {
            dispatch(showMessage({message: error.message, severity: 'error'}))
        }
    }
}

export function selectEntry(entry) {
    return ({
        type: SELECTED_ENTRY,
        entry
    })
}

export function getEntry(ean) {
    return async function (dispatch) {
        try {
            const entry = await api.getEntry(ean);
            dispatch(selectEntry(entry));
            dispatch(clearMessage());
        } catch (error) {
            dispatch(showMessage({message: error.message, severity: 'error'}))
        }
    }
}

export function setPage(page) {
    return ({
        type: SET_PAGE,
        page
    })
}

export function setEntriesPerPage(entriesPerPage) {
    return ({
        type: SET_ENTRIES_PER_PAGE,
        entriesPerPage
    })
}

export function setSortBy(field) {
    return ({
        type: SORT_BY,
        sortBy: field
    })
}

export function changeSortingDirection() {
    return ({
        type: DIRECTION,
    })
}
