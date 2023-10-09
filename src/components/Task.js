import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex }) {
    const columns = useSelector((state) => state.boards);
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    let completed = 0;
    let subtasks = task.subtasks;
    subtasks.forEach((subtask) => {
        if (subtask.isCompleted) {
            completed++;
        }
    });

    const handleOnDrag = (e) => {
        e.dataTransfer.setData("text", JSON.stringify({ taskIndex, prevColIndex: colIndex }));
    };

    return (
        <div>
            <div
                onClick={() => {
                    setIsTaskModalOpen(true);
                }}
                draggable
                onDragStart={handleOnDrag}
                className=" w-[280px] first:my-5 rounded-lg  bg-white  shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] cursor-pointer ">
                <p className=" font-bold tracking-wide ">{task.title}</p>
                {subtasks?.length !== 0 && (
                    <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
                        {completed} из {subtasks.length} выполненных задач
                    </p>
                )}
            </div>
            {isTaskModalOpen && <TaskModal colIndex={colIndex} taskIndex={taskIndex} setIsTaskModalOpen={setIsTaskModalOpen} />}
        </div>
    );
}

export default Task;
