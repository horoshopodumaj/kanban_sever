import { createSlice } from "@reduxjs/toolkit";
import { fetchBoardList } from "../utils/APIColumns";
import { getTaskFromLC } from "../utils/getTaskFromLS";

async function fetchData() {
    await fetchBoardList();
}

fetchData();
const { items: data } = getTaskFromLC();

const boardSlice = createSlice({
    name: `boards`,
    initialState: data,
    reducers: {
        addTask: (state, action) => {
            const { id, title, status, description, subtasks, newColIndex } = action.payload;
            const task = { id, title, description, subtasks, status };
            const column = state.find((col, index) => index === newColIndex);
            column.tasks.push(task);
        },
        editTask: (state, action) => {
            const { id, title, status, description, subtasks, prevColIndex, newColIndex, taskIndex } = action.payload;
            const column = state.find((col, index) => index === prevColIndex);
            const task = column.tasks.find((task, index) => index === taskIndex);
            task.id = id;
            task.title = title;
            task.status = status;
            task.description = description;
            task.subtasks = subtasks;
            if (prevColIndex === newColIndex) return;
            column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
            const newCol = state.find((col, index) => index === newColIndex);
            newCol.tasks.push(task);
        },
        dragTask: (state, action) => {
            const { colIndex, prevColIndex, taskIndex } = action.payload;
            const prevCol = state.find((col, i) => i === prevColIndex);
            const task = prevCol.tasks.splice(taskIndex, 1)[0];
            const column = state.find((col, index) => index === colIndex);
            state.find((col, i) => i === colIndex).tasks.push({ ...task, status: column.name });
        },
        setSubtaskCompleted: (state, action) => {
            const payload = action.payload;
            const col = state.find((col, i) => i === payload.colIndex);
            const task = col.tasks.find((task, i) => i === payload.taskIndex);
            const subtask = task.subtasks.find((subtask, i) => i === payload.index);
            subtask.isCompleted = !subtask.isCompleted;
        },
        setTaskStatus: (state, action) => {
            const payload = action.payload;
            const col = state.find((col, i) => i === payload.colIndex);
            if (payload.colIndex === payload.newColIndex) return;
            const task = col.tasks.find((task, i) => i === payload.taskIndex);
            task.status = payload.status;
            col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
            const newCol = state.find((col, i) => i === payload.newColIndex);
            newCol.tasks.push(task);
        },
        deleteTask: (state, action) => {
            const payload = action.payload;
            const col = state.find((col, i) => i === payload.colIndex);
            col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
        },
    },
});

export default boardSlice;
