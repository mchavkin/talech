import {initialData} from "./initialData";

const WAREHOUSE = 'warehouse';
const SUCCESS = 'success';


const getAllEntries = () => JSON.parse(localStorage.getItem(WAREHOUSE)) || initialData;

const updateWarehouse = (warehouse) => {
    localStorage.setItem(WAREHOUSE, JSON.stringify(warehouse))
};

export const addEntry = (entry) => {
    const warehouse = getAllEntries();
    if (warehouse.some(e => e.ean === entry.ean)) {
        throw new Error('ean conflict');
    }
    updateWarehouse(warehouse.concat(entry));
    return SUCCESS;
}

export const editEntry = (ean, entry) => {
    const warehouse = getAllEntries();
    if (ean !== entry.ean && warehouse.some(e => e.ean === entry.ean)) {
        throw new Error('ean conflict');
    }
    const entryIndex = warehouse.findIndex(e => e.ean === ean);
    warehouse[entryIndex] = entry
    updateWarehouse(warehouse);
    return SUCCESS;
}

export const removeEntry = (ean) => {
    const warehouse = getAllEntries();
    updateWarehouse(warehouse.filter(e => ean !== e.ean));
    return SUCCESS;
}

export const getEntry = (ean) => {
    const warehouse = getAllEntries();
    const entry = warehouse.find(e => ean === e.ean);
    if (!entry) throw new Error('notFound');
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
    const start = (page - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const entries = total > end ? warehouse.slice(start, end) : warehouse.slice(0, entriesPerPage)
    return ({
        page,
        entriesPerPage,
        entries,
        total
    })

}

