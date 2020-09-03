import {initialData} from "./initialData";

const WAREHOUSE = 'warehouse';
const ADD_SUCCESS = 'messages.addSuccess';
const EDIT_SUCCESS = 'messages.editSuccess';
const REMOVE_SUCCESS = 'messages.removeSuccess';
const EAN_CONFLICT = 'messages.eanConflict'
const NOT_FOUND = 'messages.notFound'


const getAllEntries = () => JSON.parse(localStorage.getItem(WAREHOUSE)) || initialData;

const updateWarehouse = (warehouse) => {
    localStorage.setItem(WAREHOUSE, JSON.stringify(warehouse))
};

export const addEntry = (entry) => {
    const warehouse = getAllEntries();
    if (warehouse.some(e => e.ean === entry.ean)) {
        throw new Error(EAN_CONFLICT);
    }
    updateWarehouse(warehouse.concat(entry));
    return ADD_SUCCESS;
}

export const editEntry = (ean, entry) => {
    const warehouse = getAllEntries();
    if (ean !== entry.ean && warehouse.some(e => e.ean === entry.ean)) {
        throw new Error(EAN_CONFLICT);
    }
    const entryIndex = warehouse.findIndex(e => e.ean === ean);
    warehouse[entryIndex] = entry
    updateWarehouse(warehouse);
    return EDIT_SUCCESS;
}

export const removeEntry = (ean) => {
    const warehouse = getAllEntries();
    updateWarehouse(warehouse.filter(e => ean !== e.ean));
    return ({key: REMOVE_SUCCESS, options: {ean}});
}

export const getEntry = (ean) => {
    const warehouse = getAllEntries();
    const entry = warehouse.find(e => ean === e.ean);
    if (!entry) throw new Error(NOT_FOUND);
    return entry;
}

const compareEntries = (sortBy, direction) => (a, b) => {
    const dir = direction === 'desc' ? -1 : 1;
    if (a < b) {
        return dir;
    }
    if (a > b) {
        return -dir;
    }
    return 0;
}

export const getPage = (page, entriesPerPage, sortBy, sortDirection = 'asc') => {
    const warehouse = getAllEntries();
    if (sortBy) {
        warehouse.sort(compareEntries(sortBy, sortDirection))
    }
    const total = warehouse.length;
    const start = page * entriesPerPage;
    const end = start + entriesPerPage;
    const entries = total > start ? warehouse.slice(start, end) : warehouse.slice(0, entriesPerPage)
    return ({
        page,
        entriesPerPage,
        entries,
        total
    })

}

