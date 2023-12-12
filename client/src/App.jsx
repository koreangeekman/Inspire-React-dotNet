import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import QuoteWidget from "./components/widgets/QuoteWidget.jsx"


export function App() {

  return (
    <div className="App" id="app">
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-dark text-light text-center p-3 ">
        <div className="d-flex justify-content-center mx-4 mx-md-5 p-0 pt-4">
          <QuoteWidget />
        </div>
      </footer>

    </div>
  )
}
