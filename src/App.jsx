import { DAppProvider } from "@usedapp/core";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
  return (
    <DAppProvider
      config={{
        notifications: {
          expirationPeriod: 20000,
          checkInterval: 1000,
        },
      }}
    >
      <Header />
      <Main />
    </DAppProvider>
  );
}

export default App;
