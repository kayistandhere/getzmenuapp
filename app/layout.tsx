import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "F&B Menu & Cart App",
  description: "Modern food ordering application with cart functionality",
  generator: "v0.app",
}

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#10b981", // emerald-500
      light: "#34d399", // emerald-400
      dark: "#059669", // emerald-600
    },
    secondary: {
      main: "#6b7280", // gray-500
    },
    background: {
      default: "#ffffff",
      paper: "#f9fafb",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
