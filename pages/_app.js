import Cursor from "../components/UI/cursor";
import { useCreateStore, Provider } from "../lib/store";

import "../style.css";

export default function App({ Component, pageProps }) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  return (
    <Provider createStore={createStore}>
      <Component {...pageProps} />
      <Cursor />
    </Provider>
  );
}
