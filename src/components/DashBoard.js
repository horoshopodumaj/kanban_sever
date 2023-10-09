import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { updateLocalStorageBoards } from "../utils/APIColumns";
import Column from "./Column";

function Dashboard() {
    const columns = useSelector((state) => state.boards);

    useEffect(() => {
        if (columns.length !== 0) {
            updateLocalStorageBoards(columns);
        }
    }, [columns]);

    return (
        <div className=" bg-[#f4f7fd]  scrollbar-hide h-screen flex overflow-x-scroll gap-6 justify-center">
            {columns.map((col, index) => (
                <Column key={col.id} colIndex={index} />
            ))}
        </div>
    );
}

export default Dashboard;
