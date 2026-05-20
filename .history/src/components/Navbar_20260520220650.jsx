import { useEffect, useState } from "react"

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

  // =========================
  // HIDE NAVBAR ON SCROLL
  // =========================
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // muncul lagi saat di atas
      if (currentScrollY <= 40) {
        setShowNavbar(true)
      }

      // scroll bawah -> hide
      else if (currentScrollY > lastScrollY) {
        setShowNavbar(false)
      }

      // scroll atas -> show
      else {
        setShowNavbar(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  const navButtonClass = (page) =>
    `
    rounded-full
    transition-all duration-300
    whitespace-nowrap

    px-3 py-2
    text-sm
    font-semibold

    md:px-4
    md:py-2.5
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
        fixed inset-x-0 top-0 z-50
        border-b
        backdrop-blur-xl
        transition-all duration-500

        ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }

        ${
          isDark
            ? "border-white/10 bg-black/40 text-white"
            : "border-slate-200 bg-white/70 text-slate-950"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5">

        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-between py-4">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="
              text-3xl
              font-extrabold
              tracking-wide
              bg-gradient-to-r
              from-red-500
              via-orange-400
              to-yellow-300
              bg-clip-text
              text-transparent
            "
          >
            MovieVerse
          </button>

          {/* MENU */}
          <div className="flex items-center gap-3">

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

            {/* LANGUAGE */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className={`
                flex h-11 w-11 items-center justify-center
                rounded-full border
                text-sm font-bold
                transition

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
                flex h-11 w-11 items-center justify-center
                rounded-full border
                text-sm
                transition

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

        {/* MOBILE */}
        <div className="md:hidden py-3">

          {/* TOP */}
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="
                text-[2rem]
                leading-none
                font-extrabold
                tracking-tight
                bg-gradient-to-r
                from-red-500
                via-orange-400
                to-yellow-300
                bg-clip-text
                text-transparent
              "
            >
              MovieVerse
            </button>

            {/* RIGHT TOGGLES */}
            <div className="flex items-center gap-2">

              {/* LANGUAGE */}
              <button
                type="button"
                onClick={onToggleLanguage}
                className={`
                  flex h-10 w-10 items-center justify-center
                  rounded-full border
                  text-sm font-bold
                  transition

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

          {/* MENU MOBILE */}
          <div className="mt-3 overflow-x-auto scrollbar-hide">

            <nav className="flex min-w-max items-center gap-2 text-sm font-semibold">

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

        </div>
      </div>
    </header>
  )
}

export default Navbar