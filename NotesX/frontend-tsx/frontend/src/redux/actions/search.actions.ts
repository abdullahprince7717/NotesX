interface SetSearchTermAction {
    type: 'SET_SEARCH_TERM';
    payload: string;
}

interface ClearSearchTermAction {
    type: 'CLEAR_SEARCH_TERM';
}

interface FilterNotesAction {
    type: 'FILTER_NOTES';
    payload: {
        notes: any[];
        searchTerm: string;
    };
}

const setSearchTerm = (searchTerm: string): SetSearchTermAction => {
    return {
        type: 'SET_SEARCH_TERM',
        payload: searchTerm,
    };
}

const clearSearchTerm = (): ClearSearchTermAction => {
    return {
        type: 'CLEAR_SEARCH_TERM',
    };
}

const filterNotes = (notes: any[], searchTerm: string): FilterNotesAction => {
    return {
        type: 'FILTER_NOTES',
        payload: { notes, searchTerm },
    };
}

export { setSearchTerm, clearSearchTerm, filterNotes };