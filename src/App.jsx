import { Container } from "@mui/material";
import "./App.css";
import BarcodesList from "./components/BarcodesList/BarcodesList";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <BarcodesList />
      </Container>
    </>
  );
};

export default App;
