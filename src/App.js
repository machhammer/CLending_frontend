import { DAppProvider } from "@usedapp/core"
import { Container } from "@material-ui/core"
import { Header } from "./components/Header"
import { Main } from "./components/Main"


function App() {
  return (
    <DAppProvider config={{
      notifications: {
        expirationPeriod: 5000,
        checkInterval: 1000
      }
    }}>
      <Header/>
      <Container maxWidth="md">
        <Main/>
      </Container>
    </DAppProvider>
  );
}

export default App;
