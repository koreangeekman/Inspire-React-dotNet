import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import QuoteWidget from "./components/widgets/QuoteWidget.jsx"


export function App() {

  return (
    <div className="App" id="app">
      <header className="z2 sticky-top">
        <Navbar />
      </header>

      <main className="z0">
        <Outlet />
      </main>

      <footer>
        <div className="d-flex justify-content-center mx-4 mx-md-5 p-0 pt-4">
          <QuoteWidget />
        </div>
      </footer>

    </div>
  )
}
