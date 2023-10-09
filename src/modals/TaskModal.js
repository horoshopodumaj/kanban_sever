import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import elipsis from "../assets/img/icon-vertical-ellipsis.svg";
import SmallMenu from "../components/SmallMenu";
import Subtask from "../components/Subtask";
import boardsSlice from "../redux/boardSlice";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
    const dispatch = useDispatch();
    const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const columns = useSelector((state) => state.boards);
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtasks = task.subtasks;

    let completed = 0;
    subtasks.forEach((subtask) => {
        if (subtask.isCompleted) {
            completed++;
        }
    });

    const [status, setStatus] = useState(task.status);
    const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
    const onChange = (e) => {
        setStatus(e.target.value);
        setNewColIndex(e.target.selectedIndex);
    };

    const onClose = (e) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        dispatch(
            boardsSlice.actions.setTaskStatus({
                taskIndex,
                colIndex,
                newColIndex,
                status,
            })
        );
        setIsTaskModalOpen(false);
    };

    const onDeleteBtnClick = (e) => {
        if (e.target.textContent === "Удалить") {
            dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
            setIsTaskModalOpen(false);
            setIsDeleteModalOpen(false);
        } else {
            setIsDeleteModalOpen(false);
        }
    };

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    const setOpenEditModal = () => {
        setIsAddTaskModalOpen(true);
        setIsElipsisMenuOpen(false);
    };

    const setOpenDeleteModal = () => {
        setIsElipsisMenuOpen(false);
        setIsDeleteModalOpen(true);
    };

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setIsTaskModalOpen(false);
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div onClick={onClose} className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown ">
            <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white  text-black  font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
                <div className=" relative flex   justify-between w-full items-center">
                    <h1 className=" text-lg">{task.title}</h1>

                    <img
                        onClick={() => {
                            setIsElipsisMenuOpen((prevState) => !prevState);
                        }}
                        src={elipsis}
                        alt="elipsis"
                        className=" cursor-pointer h-6"
                    />
                    {isElipsisMenuOpen && <SmallMenu setOpenEditModal={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal} />}
                </div>
                {task?.description && <p className=" text-gray-500 font-[600] tracking-wide text-xs pt-6">{task.description}</p>}

                {subtasks?.length !== 0 && (
                    <p className=" pt-6 text-gray-500 tracking-widest text-sm">
                        Подзадачи ({completed} of {subtasks.length})
                    </p>
                )}
                {subtasks?.length !== 0 && (
                    <div className=" mt-3 space-y-2">
                        {subtasks.map((subtask, index) => {
                            return <Subtask index={index} taskIndex={taskIndex} colIndex={colIndex} key={subtask.id} />;
                        })}
                    </div>
                )}

                <div className="mt-8 flex flex-col space-y-3">
                    <label className="  text-sm  text-gray-500">Текущий статус</label>
                    <select
                        className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
                        value={status}
                        onChange={onChange}>
                        {columns.map((col, index) => (
                            <option className="status-options" key={col.id}>
                                {col.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {isDeleteModalOpen && <DeleteModal onDeleteBtnClick={onDeleteBtnClick} setIsDeleteModalOpen={setIsDeleteModalOpen} />}

            {isAddTaskModalOpen && <AddEditTaskModal setIsAddTaskModalOpen={setIsAddTaskModalOpen} setIsTaskModalOpen={setIsTaskModalOpen} type="edit" taskIndex={taskIndex} prevColIndex={colIndex} />}
        </div>
    );
}

export default TaskModal;
