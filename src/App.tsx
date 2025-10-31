import { AppProvider } from "./context/AppContext"
import SupportAI from "./pages/SupportAI";

function App() {
  return (
    <AppProvider>
      <SupportAI />
    </AppProvider>
  );
}

export default App;
