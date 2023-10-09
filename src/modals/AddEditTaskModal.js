import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/img/icon-cross.svg";
import boardsSlice from "../redux/boardSlice";

function AddEditTaskModal({ type, device, setIsTaskModalOpen, setIsAddTaskModalOpen, taskIndex, prevColIndex = 0 }) {
    const dispatch = useDispatch();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const columns = useSelector((state) => state.boards);

    const col = columns.find((col, index) => index === prevColIndex);
    const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
    const [status, setStatus] = useState(columns[prevColIndex].name);
    const [newColIndex, setNewColIndex] = useState(prevColIndex);
    const [subtasks, setSubtasks] = useState([]);

    const onChangeSubtasks = (id, newValue) => {
        setSubtasks((prevState) => {
            const newState = [...prevState];
            const subtask = newState.find((subtask) => subtask.id === id);
            subtask.title = newValue;
            return newState;
        });
    };

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
        setNewColIndex(e.target.selectedIndex);
    };

    const validate = () => {
        setIsValid(false);
        if (!title.trim()) {
            return false;
        }
        for (let i = 0; i < subtasks.length; i++) {
            if (!subtasks[i].title.trim()) {
                return false;
            }
        }
        setIsValid(true);
        return true;
    };

    if (type === "edit" && isFirstLoad) {
        setSubtasks(
            task.subtasks.map((subtask) => {
                return { ...subtask, id: uuidv4() };
            })
        );
        setTitle(task.title);
        setDescription(task.description);
        setIsFirstLoad(false);
    }

    const onDelete = (id) => {
        setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
    };

    const onSubmit = (type) => {
        if (type === "add") {
            dispatch(
                boardsSlice.actions.addTask({
                    id: uuidv4(),
                    title,
                    description,
                    subtasks,
                    status,
                    newColIndex,
                })
            );
        } else {
            dispatch(
                boardsSlice.actions.editTask({
                    id: uuidv4(),
                    title,
                    description,
                    subtasks,
                    status,
                    taskIndex,
                    prevColIndex,
                    newColIndex,
                })
            );
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setIsAddTaskModalOpen(false);
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description, subtasks]);

    return (
        <div
            className={
                device === "mobile"
                    ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
                    : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
            }>
            <div
                className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white text-black  font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
                <div className=" flex justify-between items-center">
                    <h3 className=" text-lg ">{type === "edit" ? "Изменить" : "Добавить"} задачу</h3>
                    <img
                        src={crossIcon}
                        alt="crossIcon"
                        onClick={() => {
                            setIsAddTaskModalOpen(false);
                        }}
                        className="cursor-pointer "
                    />
                </div>

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="  text-sm  text-gray-500">Название задачи</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="task-name-input"
                        type="text"
                        className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
                        placeholder="Название задачи"
                    />
                </div>

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="  text-sm  text-gray-500">Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="task-description-input"
                        className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
                        placeholder="Описание"
                    />
                </div>

                <div className="mt-8 flex flex-col space-y-3">
                    <label className="  text-sm  text-gray-500">Подзадачи</label>

                    {subtasks.map((subtask) => (
                        <div key={subtask.id} className=" flex items-center w-full ">
                            <input
                                onChange={(e) => {
                                    onChangeSubtasks(subtask.id, e.target.value);
                                }}
                                type="text"
                                value={subtask.title}
                                className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                                placeholder="Подзадача"
                            />
                            <img
                                src={crossIcon}
                                alt="crossIcon"
                                onClick={() => {
                                    onDelete(subtask.id);
                                }}
                                className=" m-4 cursor-pointer "
                            />
                        </div>
                    ))}

                    <button
                        className=" w-full items-center  text-white bg-[#635fc7] py-2 rounded-full "
                        onClick={() => {
                            setSubtasks((state) => [...state, { title: "", isCompleted: false, id: uuidv4() }]);
                        }}>
                        + Новая подзадача
                    </button>
                </div>

                <div className="mt-8 flex flex-col space-y-3">
                    <label className="  text-sm  text-gray-500">Текущий статус</label>
                    <select
                        value={status}
                        onChange={onChangeStatus}
                        className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none">
                        {columns.map((column) => (
                            <option key={column.id}>{column.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            if (isValid) {
                                onSubmit(type);
                                setIsAddTaskModalOpen(false);
                                type === "edit" && setIsTaskModalOpen(false);
                            }
                        }}
                        className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!isValid}>
                        {type === "edit" ? "Сохранить" : "Создать"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddEditTaskModal;
