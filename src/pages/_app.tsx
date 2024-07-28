import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { styletron } from "../app/styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StatefulInput } from "baseui/input";
import { useEffect } from "react";
import { store } from '../app/store/store'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"
import Toaster from "@/app/components/toaster";

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps): JSX.Element  {


  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
            <Provider store={store}>
              <div className="">
                <Toaster/>
                <Component {...pageProps} />
              </div>
            </Provider>
          </BaseProvider>
        </StyletronProvider>
      </Provider>
    </SessionProvider>
  );
}
