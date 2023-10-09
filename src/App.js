import Dashboard from "./components/DashBoard";
import Header from "./components/Header";

function App() {
    return (
        <div className=" overflow-hidden overflow-x-scroll">
            <>
                <Header />
                <Dashboard />
            </>
        </div>
    );
}

export default App;
