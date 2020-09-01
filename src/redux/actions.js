import {CLEAR_MESSAGE, SHOW_MESSAGE, LOADING, SET_PAGE} from "./actionTypes";
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


export function getPage() {
    const {page, entriesPerPage, sortBy, direction} = store.getState();
    return async function (dispatch) {
        try {
            const payload = await api.getPage(page, entriesPerPage, sortBy, direction);
            dispatch({
                type: SET_PAGE,
                payload
            });
        } catch (error) {
            dispatch(showMessage({message: error.message, severity: 'error'}))
        }
    }
}

export function addEntry(entry) {
    return async function (dispatch) {
        dispatch(loading());
        try {
            const message = await api.addEntry(entry);
            dispatch(showMessage({message, severity: 'info'}));
        } catch (error) {
            dispatch(showMessage({message: error.message, severity: 'error'}))
        }
    }
}

export function editEntry(ean, entry) {
    return async function (dispatch) {
        dispatch(loading());
        try {
            const message = await api.editEntry(ean, entry);
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
