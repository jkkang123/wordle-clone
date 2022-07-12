import Wordle from "./pages/wordle/wordle";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import { Provider } from 'react-redux'
import { persistor, store } from './redux';
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Wordle/>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
