import { ApiMockResponse } from "../ApiMockData/data";

const LocalStorageKeyName = "board";

export class BoardAPI {
    async fetchBoardList() {
        const apiData = ApiMockResponse;
        let BoardList = [];

        if (localStorage.getItem(LocalStorageKeyName)) {
            const localStorageData = JSON.parse(localStorage.getItem(LocalStorageKeyName) ?? apiData);
            BoardList = [...localStorageData];
        } else {
            BoardList = [...apiData];
            updateLocalStorageBoards(BoardList);
        }

        return BoardList;
    }
}

export async function fetchBoardList() {
    const api = new BoardAPI();
    return await api.fetchBoardList();
}
export function updateLocalStorageBoards(boards) {
    return localStorage.setItem(LocalStorageKeyName, JSON.stringify(boards));
}
