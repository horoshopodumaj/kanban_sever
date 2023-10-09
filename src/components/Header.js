import React, { useState } from "react";
import Logo from "../assets/img/logo-mobile.svg";
import AddEditTaskModal from "../modals/AddEditTaskModal";

function Header() {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    return (
        <div className=" p-4 fixed left-0 bg-white z-50 right-0 ">
            <header className=" flex justify-between items-center  ">
                <div className=" flex items-center space-x-2  md:space-x-4">
                    <img src={Logo} alt=" Logo " className=" h-6 w-6" />
                    <h3 className=" md:text-4xl  hidden md:inline-block font-bold  font-sans">kanban</h3>
                </div>
                <div className=" flex space-x-4 items-center md:space-x-6 ">
                    <button
                        className=" button hidden md:block "
                        onClick={() => {
                            setIsTaskModalOpen(true);
                        }}>
                        + Новая задача
                    </button>
                    <button
                        onClick={() => {
                            setIsTaskModalOpen(true);
                        }}
                        className=" button py-1 px-3 md:hidden ">
                        +
                    </button>
                </div>
            </header>
            {isTaskModalOpen && <AddEditTaskModal setIsAddTaskModalOpen={setIsTaskModalOpen} type="add" device="mobile" />}
        </div>
    );
}

export default Header;
