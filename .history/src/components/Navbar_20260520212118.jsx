const navText = {
  id: {
    pages: {
      home: "Beranda",
      movies: "Film",
      api: "Data API",
    },
    languageButton: "EN",
  },
  en: {
    pages: {
      home: "Home",
      movies: "Movies",
      api: "API Data",
    },
    languageButton: "ID",
  },
}

function Navbar({ theme, language, activePage, onNavigate, onToggleTheme, onToggleLanguage }) {
  const text = navText[language]
  const isDark = theme === "dark"

  const navButtonClass = (page) =>
    `px-2.5 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm font-bold rounded-full transition whitespace-nowrap ${
      activePage === page
        ? "bg-red-500 text-white shadow-md shadow-red-500/25"
        : isDark
          ? "hover:bg-white/10 hover:text-yellow-300"
          : "hover:bg-white/80 hover:text-red-500"
    }`

  const actionButtonClass = `rounded-full border px-2.5 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm font-bold transition whitespace-nowrap flex items-center justify-center ${
    isDark
      ? "border-white/15 bg-white/10 hover:bg-white/20"
      : "border-slate-200 bg-white/75 hover:bg-white"
  }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-black/60 text-white"
          : "border-slate-900/10 bg-white/70 text-slate-950"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-2 py-2 md:px-5 md:py-3 gap-2 md:gap-0">
        
        <div className="w-full md:w-auto text-center md:text-left">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="text-2xl md:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent"
          >
            MovieVerse
          </button>
        </div>

        <div className="flex flex-row items-center justify-center w-full md:w-auto gap-1.5 md:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          
          <nav className="flex items-center gap-1 md:gap-2 shrink-0">
            {Object.entries(text.pages).map(([page, label]) => (
              <button key={page} type="button" onClick={() => onNavigate(page)} className={navButtonClass(page)}>
                {label}
              </button>
            ))}
          </nav>

          <div className={`shrink-0 w-[1px] h-4 mx-0.5 md:mx-1 ${isDark ? "bg-white/20" : "bg-slate-300"}`}></div>

          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <button type="button" onClick={onToggleLanguage} className={actionButtonClass}>
              {text.languageButton}
            </button>

            <button type="button" onClick={onToggleTheme} className={`h-[28px] w-[28px] md:h-[36px] md:w-[36px] ${actionButtonClass}`}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar