import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {
  const [theme, setTheme] = useState("dark")
  const [language, setLanguage] = useState("id")
  const [activePage, setActivePage] = useState("home")

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  }

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === "id" ? "en" : "id"))
  }

  return (
    <>
      <Navbar
        theme={theme}
        language={language}
        activePage={activePage}
        onNavigate={setActivePage}
        onToggleTheme={toggleTheme}
        onToggleLanguage={toggleLanguage}
      />
      <Home theme={theme} language={language} activePage={activePage} onNavigate={setActivePage} />
    </>
  )
}

export default App
