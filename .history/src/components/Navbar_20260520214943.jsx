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
    `
    rounded-full
    transition
    whitespace-nowrap
    px-3 py-2
    text-sm
    font-semibold
    md:px-4
    md:py-2
    md:text-base
    ${
      activePage === page
        ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
        : isDark
        ? "hover:bg-white/10 hover:text-yellow-300"
        : "hover:bg-white/80 hover:text-red-500"
    }
  `

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-40
        border-b
        backdrop-blur-xl
        transition-colors duration-300
        ${
          isDark
            ? "border-white/10 bg-black/30 text-white"
            : "border-slate-200 bg-white/60 text-slate-950"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5">
        
        <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          
          {/* LOGO */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="
              text-left
              text-2xl
              font-extrabold
              tracking-wide
              bg-gradient-to-r
              from-red-500
              via-orange-400
              to-yellow-300
              bg-clip-text
              text-transparent
              md:text-3xl
            "
          >
            MovieVerse
          </button>

          {/* NAVBAR */}
          <div className="overflow-x-auto scrollbar-hide">
            
            <div className="flex min-w-max items-center justify-between gap-3">
              
              {/* LEFT MENU */}
              <nav className="flex items-center gap-2 text-sm font-semibold">
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

              {/* RIGHT TOGGLES */}
              <div className="ml-auto flex items-center gap-2">

                {/* LANGUAGE */}
                <button
                  type="button"
                  onClick={onToggleLanguage}
                  className={`
                    flex h-10 w-10 items-center justify-center
                    rounded-full border
                    text-sm font-bold
                    transition
                    md:h-11 md:w-11
                    ${
                      isDark
                        ? "border-white/15 bg-white/10 hover:bg-white/20"
                        : "border-slate-200 bg-white/80 hover:bg-white"
                    }
                  `}
                >
                  {text.languageButton}
                </button>

                {/* THEME */}
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className={`
                    flex h-10 w-10 items-center justify-center
                    rounded-full border
                    text-sm
                    transition
                    md:h-11 md:w-11
                    ${
                      isDark
                        ? "border-white/15 bg-white/10 hover:bg-white/20"
                        : "border-slate-200 bg-white/80 hover:bg-white"
                    }
                  `}
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar