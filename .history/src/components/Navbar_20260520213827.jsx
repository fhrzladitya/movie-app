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

function Navbar({
  theme,
  language,
  activePage,
  onNavigate,
  onToggleTheme,
  onToggleLanguage,
}) {
  const text = navText[language]
  const isDark = theme === "dark"

  const navButtonClass = (page) =>
    `px-4 py-2 rounded-full transition ${
      activePage === page
        ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
        : isDark
          ? "hover:bg-white/10 hover:text-yellow-300"
          : "hover:bg-white/80 hover:text-red-500"
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b shadow-2xl backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-black/30 text-white"
          : "border-slate-900/10 bg-white/45 text-slate-950"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-4">

        {/* TOP SECTION */}
        <div className="flex items-center justify-between gap-3">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="shrink-0 text-2xl font-extrabold tracking-wide bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent"
          >
            MovieVerse
          </button>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 shrink-0">

            {/* LANGUAGE BUTTON */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className={`rounded-full border px-4 py-2 font-bold transition ${
                isDark
                  ? "border-white/15 bg-white/10 hover:bg-white/20"
                  : "border-slate-200 bg-white/75 hover:bg-white"
              }`}
            >
              {text.languageButton}
            </button>

            {/* THEME TOGGLE */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`rounded-full border px-4 py-2 font-bold transition ${
                isDark
                  ? "border-white/15 bg-white/10 hover:bg-white/20"
                  : "border-slate-200 bg-white/75 hover:bg-white"
              }`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

          </div>
        </div>

        {/* NAVIGATION MENU */}
        <nav className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold md:mt-3">
          {Object.entries(text.pages).map(([page, label]) => (
            <button
              key={page}
              type="button"
              onClick={() => onNavigate(page)}
              className={navButtonClass(page)}
            >
              {label}
            </button>
          ))}
        </nav>

      </div>
    </header>
  )
}

export default Navbar