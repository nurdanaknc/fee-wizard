import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { styletron } from "../app/styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StatefulInput } from "baseui/input";
import { useEffect } from "react";
import { store } from '../app/store/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {


  return (
    <Provider store={store}>
      <StyletronProvider value={styletron}>
        <BaseProvider theme={LightTheme}>
          <Provider store={store}>
            <div className="">
              <Component {...pageProps} />
            </div>
          </Provider>
        </BaseProvider>
      </StyletronProvider>
    </Provider>
  );
}
