import { AppRouter } from "./providers/router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./widgets/Header";
import { StoreProvider } from "./providers/StoreProvider/StoreProvider";
import { Styles } from "./widgets/Styles";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Styles />
        <Header />
        <AppRouter />
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
