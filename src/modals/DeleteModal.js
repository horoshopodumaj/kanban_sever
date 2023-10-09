import React from "react";

function DeleteModal({ onDeleteBtnClick, setIsDeleteModalOpen }) {
    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setIsDeleteModalOpen(false);
            }}
            className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown">
            <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white  text-black  font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl ">
                <h3 className=" font-bold text-red-500 text-xl  ">Удаление</h3>
                <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">Вы уверены, что хотите удалить эту задачу?</p>

                <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
                    <button onClick={onDeleteBtnClick} className="w-full items-center text-white hover:opacity-75 bg-red-500 py-2 rounded-full">
                        Удалить
                    </button>
                    <button
                        onClick={() => {
                            setIsDeleteModalOpen(false);
                        }}
                        className="w-full items-center text-[#635fc7]  hover:opacity-75 bg-[#635fc71a]  py-2 rounded-full">
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
