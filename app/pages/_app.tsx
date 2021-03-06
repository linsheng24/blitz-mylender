import { Suspense } from "react"
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"

import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import React from "react"
import { purple } from "@material-ui/core/colors"
import { RecoilRoot } from "recoil"

const theme = createTheme({
  palette: {
    primary: {
      main: purple[200],
    },
    secondary: {
      main: purple[400],
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        <RecoilRoot>
          <Suspense fallback="Loading...">{getLayout(<Component {...pageProps} />)}</Suspense>
        </RecoilRoot>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
