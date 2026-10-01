import { useSelector } from "react-redux";
import Sidebar from "../Components/Sidebar/Sidebar";
import type { RootState } from "../store/store";
import "./App.css";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <main className="app-main" data-theme={theme}>
      <Sidebar />
      <div className="content-area"></div>
    </main>
  );
};

export default App;