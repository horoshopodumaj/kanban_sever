export const getTaskFromLC = () => {
    const data = localStorage.getItem("board");
    const items = data ? JSON.parse(data) : [];
    return {
        items,
    };
};
