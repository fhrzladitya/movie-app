import { useEffect, useMemo, useState } from "react"
import axios from "axios"

const movieData = [
  {
    id: 1,
    name: "Avengers",
    badge: "Trending",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
      original: "https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    },
    rating: { average: 8.7 },
    genres: ["Action", "Adventure"],
    summary:
      "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.",
  },
  {
    id: 2,
    name: "Interstellar",
    badge: "Top Rated",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      original: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    rating: { average: 9.0 },
    genres: ["Sci-Fi", "Drama"],
    summary:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 3,
    name: "Inception",
    badge: "Mind Bender",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
      original: "https://image.tmdb.org/t/p/original/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    },
    rating: { average: 8.8 },
    genres: ["Action", "Sci-Fi"],
    summary:
      "A skilled thief enters people's dreams to steal secrets but faces his toughest mission yet.",
  },
  {
    id: 4,
    name: "Joker",
    badge: "Critic Pick",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
      original: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    },
    rating: { average: 8.5 },
    genres: ["Crime", "Drama"],
    summary:
      "A failed comedian slowly descends into madness and becomes Gotham City's infamous Joker.",
  },
  {
    id: 5,
    name: "The Batman",
    badge: "New",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      original: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    rating: { average: 8.3 },
    genres: ["Action", "Crime"],
    summary:
      "Batman uncovers corruption in Gotham City while pursuing the Riddler, a serial killer targeting elites.",
  },
]

const trailers = {
  Avengers: "https://www.youtube.com/embed/eOrNdBpGMv8",
  Interstellar: "https://www.youtube.com/embed/zSWdZVtXT7E",
  Inception: "https://www.youtube.com/embed/YoHD9XEInc0",
  Joker: "https://www.youtube.com/embed/zAGVQLHvwOY",
  "The Batman": "https://www.youtube.com/embed/mqqft2x_Aa4",
}

const fallbackPosts = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Movie API sample item ${index + 1}`,
  body: "Fallback data appears only when the public API cannot be reached during local development.",
}))

const translations = {
  id: {
    featured: "Film Pilihan",
    rating: "Rating",
    watchTrailer: "Tonton Trailer",
    heroDescription:
      "Temukan film-film yang sedang tren, jelajahi trailer resminya, dan nikmati pengalaman sinematik modern.",
    openMovies: "Lihat Katalog Film",
    openApi: "Lihat Data API",
    totalMovies: "Film Populer",
    officialTrailer: "Trailer Resmi",
    freeAccess: "Akses Gratis",
    freeShort: "Gratis",
    explore: "Jelajahi Film",
    popularThisWeek: "Populer Minggu Ini",
    movieFound: "film ditemukan",
    searchPlaceholder: "Cari film favoritmu...",
    highRated: "Hanya rating 8.7 ke atas",
    genreFilter: "Filter genre",
    notFound: "Film Tidak Ditemukan",
    notFoundHelp: "Coba cari nama film atau genre lain.",
    watchDetail: "Lihat Detail",
    movieSummary: "Ringkasan Film",
    apiEyebrow: "Integrasi Axios",
    apiTitle: "Data dari Public API",
    apiDescription:
      "Halaman ini mengambil 10 item dari JSONPlaceholder menggunakan Axios dan menampilkannya sebagai daftar data eksternal.",
    apiSource: "Sumber API",
    apiLoading: "Mengambil 10 data dari Public API...",
    apiError: "API sedang tidak tersedia, menampilkan data cadangan agar tampilan tetap bisa diuji.",
    apiItems: "item API tampil",
    footerTech: "Dibuat menggunakan React JS, Tailwind CSS, Axios, dan Public API.",
    footerRights: "(c) 2026 MovieVerse. Semua hak dilindungi.",
    genreAll: "Semua",
    genres: {
      Action: "Aksi",
      Adventure: "Petualangan",
      "Sci-Fi": "Fiksi Ilmiah",
      Drama: "Drama",
      Crime: "Kriminal",
    },
    badges: {
      Trending: "Trending",
      "Top Rated": "Rating Tertinggi",
      "Mind Bender": "Penuh Misteri",
      "Critic Pick": "Pilihan Kritikus",
      New: "Baru",
    },
    summaries: {
      Avengers:
        "Para pahlawan terkuat bumi harus bersatu untuk menghentikan Loki dan pasukan aliennya dari memperbudak umat manusia.",
      Interstellar:
        "Sekelompok penjelajah melakukan perjalanan melalui lubang cacing di luar angkasa demi memastikan kelangsungan hidup manusia.",
      Inception:
        "Seorang pencuri ahli memasuki mimpi orang lain untuk mencuri rahasia, tetapi menghadapi misi tersulit dalam hidupnya.",
      Joker:
        "Seorang komedian gagal perlahan tenggelam dalam kegilaan dan berubah menjadi Joker yang terkenal di Gotham City.",
      "The Batman":
        "Batman mengungkap korupsi di Gotham City saat memburu Riddler, pembunuh berantai yang menargetkan kaum elite.",
    },
  },
  en: {
    featured: "Featured Movie",
    rating: "Rating",
    watchTrailer: "Watch Trailer",
    heroDescription:
      "Discover trending movies, explore official trailers, and enjoy a modern cinematic experience.",
    openMovies: "Explore Movies",
    openApi: "View API Data",
    totalMovies: "Popular Movies",
    officialTrailer: "Official Trailer",
    freeAccess: "Free Access",
    freeShort: "Free",
    explore: "Explore Movies",
    popularThisWeek: "Popular This Week",
    movieFound: "movie found",
    searchPlaceholder: "Search your favorite movie...",
    highRated: "Only rating 8.7 and above",
    genreFilter: "Genre filter",
    notFound: "Movie Not Found",
    notFoundHelp: "Try searching another movie name or genre.",
    watchDetail: "Watch Detail",
    movieSummary: "Movie Summary",
    apiEyebrow: "Axios Integration",
    apiTitle: "Public API Data",
    apiDescription:
      "This page fetches 10 items from JSONPlaceholder using Axios and displays them as external data.",
    apiSource: "API Source",
    apiLoading: "Fetching 10 items from Public API...",
    apiError: "The API is unavailable, showing fallback data so the interface can still be tested.",
    apiItems: "API items shown",
    footerTech: "Built with React JS, Tailwind CSS, Axios, and Public API.",
    footerRights: "(c) 2026 MovieVerse. All rights reserved.",
    genreAll: "All",
    genres: {
      Action: "Action",
      Adventure: "Adventure",
      "Sci-Fi": "Sci-Fi",
      Drama: "Drama",
      Crime: "Crime",
    },
    badges: {
      Trending: "Trending",
      "Top Rated": "Top Rated",
      "Mind Bender": "Mind Bender",
      "Critic Pick": "Critic Pick",
      New: "New",
    },
    summaries: {
      Avengers:
        "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.",
      Interstellar:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      Inception:
        "A skilled thief enters people's dreams to steal secrets but faces his toughest mission yet.",
      Joker:
        "A failed comedian slowly descends into madness and becomes Gotham City's infamous Joker.",
      "The Batman":
        "Batman uncovers corruption in Gotham City while pursuing the Riddler, a serial killer targeting elites.",
    },
  },
}

function Home({ theme, language, activePage, onNavigate }) {
  const isDark = theme === "dark"
  const text = translations[language]
  const getGenreLabel = (genre) => text.genres[genre] || genre

  const [apiItems, setApiItems] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState(false)
  const [search, setSearch] = useState("")
  const [activeGenre, setActiveGenre] = useState("All")
  const [onlyHighRated, setOnlyHighRated] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => {
        setApiItems(response.data.slice(0, 10))
        setApiError(false)
      })
      .catch(() => {
        setApiItems(fallbackPosts)
        setApiError(true)
      })
      .finally(() => {
        setApiLoading(false)
      })
  }, [])

  const genres = useMemo(
    () => ["All", ...new Set(movieData.flatMap((movie) => movie.genres))],
    []
  )

  const featuredMovie = movieData[0]

  const filteredMovies = movieData.filter((movie) => {
    const matchesSearch = movie.name.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = activeGenre === "All" || movie.genres.includes(activeGenre)
    const matchesRating = !onlyHighRated || movie.rating.average >= 8.7

    return matchesSearch && matchesGenre && matchesRating
  })

  const pageBackground = isDark
    ? "bg-gradient-to-br from-black via-gray-950 to-black text-white"
    : "bg-gradient-to-br from-slate-100 via-white to-orange-50 text-slate-950"
  const cardClass = isDark
    ? "border-white/10 bg-white/10"
    : "border-slate-200 bg-white/90"
  const mutedText = isDark ? "text-gray-300" : "text-slate-600"
  const subtleText = isDark ? "text-gray-400" : "text-slate-500"

  return (
    <main className={`min-h-screen overflow-hidden transition-colors duration-500 ${pageBackground}`}>
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-[360px] h-[360px] bg-red-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-yellow-500/20 blur-3xl rounded-full"></div>
      </div>

      {activePage === "home" && (
        <section className="max-w-7xl mx-auto px-5 pt-0 pb-14">
          <div className="relative min-h-[620px] overflow-hidden rounded-b-[2rem] border border-white/10 bg-black shadow-2xl">
            <img
              src={featuredMovie.image.original}
              alt={featuredMovie.name}
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="relative z-10 flex min-h-[620px] max-w-3xl flex-col justify-end px-6 py-10 text-white md:px-12 md:py-16">
              <span className="mb-5 w-fit rounded-full border border-yellow-400/40 bg-yellow-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-200">
                {text.featured}
              </span>

              <h1 className="mb-5 text-5xl font-extrabold leading-tight md:text-7xl">
                {featuredMovie.name}
              </h1>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-extrabold text-black">
                  {text.rating} {featuredMovie.rating.average}
                </span>

                {featuredMovie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                  >
                    {getGenreLabel(genre)}
                  </span>
                ))}
              </div>

              <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
                {text.summaries[featuredMovie.name]}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMovie(featuredMovie)}
                  className="rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-7 py-4 text-sm font-extrabold text-white shadow-2xl shadow-red-500/20 transition hover:scale-105"
                >
                  {text.watchTrailer}
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate("movies")}
                  className="rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {text.openMovies}
                </button>
              </div>
            </div>
          </div>

          <div className="py-14 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl">
              MovieVerse
            </h2>

            <p className={`mx-auto max-w-3xl text-lg leading-relaxed md:text-xl ${mutedText}`}>
              {text.heroDescription}
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <InfoCard value="5+" label={text.totalMovies} color="text-yellow-400" className={cardClass} />
            <InfoCard value="HD" label={text.officialTrailer} color="text-red-400" className={cardClass} />
            <InfoCard value="10" label={text.apiItems} color="text-green-400" className={cardClass} />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate("api")}
              className="rounded-full bg-red-500 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-red-500/20 transition hover:scale-105 hover:bg-red-600"
            >
              {text.openApi}
            </button>
          </div>
        </section>
      )}

      {activePage === "movies" && (
        <section className="max-w-7xl mx-auto px-5 pt-28 pb-14">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`mb-2 text-sm font-bold uppercase tracking-[0.25em] ${isDark ? "text-red-300" : "text-red-500"}`}>
                {text.explore}
              </p>
              <h1 className="text-4xl font-extrabold md:text-6xl">{text.popularThisWeek}</h1>
            </div>

            <p className={`text-sm font-semibold ${subtleText}`}>
              {filteredMovies.length} {text.movieFound}
            </p>
          </div>

          <form className={`mb-10 rounded-3xl border p-5 shadow-2xl backdrop-blur-xl ${cardClass}`}>
            <div className="grid gap-4 md:grid-cols-[1fr_240px]">
              <input
                type="text"
                placeholder={text.searchPlaceholder}
                className={`w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-red-500 ${
                  isDark
                    ? "border-white/10 bg-black/25 text-white placeholder:text-gray-400"
                    : "border-slate-200 bg-white text-slate-950 placeholder:text-slate-500"
                }`}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 font-semibold ${
                  isDark ? "border-white/10 bg-black/20" : "border-slate-200 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={onlyHighRated}
                  onChange={(event) => setOnlyHighRated(event.target.checked)}
                  className="h-5 w-5 accent-red-500"
                />
                {text.highRated}
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className={`mb-3 text-sm font-bold ${subtleText}`}>{text.genreFilter}</legend>
              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => (
                  <label
                    key={genre}
                    className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-bold transition ${
                      activeGenre === genre
                        ? "border-red-400 bg-red-500 text-white shadow-lg shadow-red-500/25"
                        : isDark
                          ? "border-white/10 bg-white/10 text-gray-300 hover:border-yellow-400/60 hover:text-yellow-200"
                          : "border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:text-red-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="genre"
                      value={genre}
                      checked={activeGenre === genre}
                      onChange={() => setActiveGenre(genre)}
                      className="sr-only"
                    />
                    {genre === "All" ? text.genreAll : getGenreLabel(genre)}
                  </label>
                ))}
              </div>
            </fieldset>
          </form>

          {filteredMovies.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="mb-4 text-4xl font-bold text-red-400">{text.notFound}</h2>
              <p className={subtleText}>{text.notFoundHelp}</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  text={text}
                  isDark={isDark}
                  getGenreLabel={getGenreLabel}
                  onSelect={setSelectedMovie}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {activePage === "api" && (
        <section className="max-w-7xl mx-auto px-5 pt-28 pb-14">
          <div className="mb-8">
            <p className={`mb-2 text-sm font-bold uppercase tracking-[0.25em] ${isDark ? "text-red-300" : "text-red-500"}`}>
              {text.apiEyebrow}
            </p>
            <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">{text.apiTitle}</h1>
            <p className={`max-w-3xl text-lg leading-relaxed ${mutedText}`}>{text.apiDescription}</p>
          </div>

          <div className={`mb-8 rounded-3xl border p-6 shadow-2xl backdrop-blur-xl ${cardClass}`}>
            <p className={`text-sm font-bold uppercase tracking-[0.2em] ${subtleText}`}>{text.apiSource}</p>
            <p className="mt-2 font-mono text-sm">https://jsonplaceholder.typicode.com/posts?_limit=10</p>
          </div>

          {apiLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className={`rounded-3xl border p-6 shadow-xl ${cardClass}`}>
                  <div className={`mb-4 h-5 w-24 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                  <div className={`mb-3 h-6 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                  <div className={`h-4 w-4/5 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                </div>
              ))}
              <p className={`md:col-span-2 text-center font-semibold ${subtleText}`}>{text.apiLoading}</p>
            </div>
          ) : (
            <>
              {apiError && (
                <div className="mb-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm font-semibold text-yellow-500">
                  {text.apiError}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {apiItems.map((item) => (
                  <article key={item.id} className={`rounded-3xl border p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-red-500/20 ${cardClass}`}>
                    <span className="mb-4 inline-flex rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                      ID #{item.id}
                    </span>
                    <h2 className="mb-3 text-xl font-extrabold capitalize">{item.title}</h2>
                    <p className={`leading-relaxed ${mutedText}`}>{item.body}</p>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          text={text}
          isDark={isDark}
          getGenreLabel={getGenreLabel}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <footer className={`mt-16 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-5 py-10 text-center">
          <h2 className="mb-3 bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-3xl font-bold text-transparent">
            MovieVerse
          </h2>

          <p className={`mb-4 ${mutedText}`}>{text.footerTech}</p>

          <p className={`text-sm ${subtleText}`}>{text.footerRights}</p>
        </div>
      </footer>
    </main>
  )
}

function InfoCard({ value, label, color, className }) {
  return (
    <article className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition hover:scale-105 ${className}`}>
      <h3 className={`mb-2 text-4xl font-bold ${color}`}>{value}</h3>
      <p>{label}</p>
    </article>
  )
}

function MovieCard({ movie, text, isDark, getGenreLabel, onSelect }) {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-3 hover:shadow-red-500/20 ${
        isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white/90"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.image.medium}
          alt={movie.name}
          className="h-[380px] w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

        <div className="absolute left-4 top-4 rounded-full bg-red-500 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg">
          {text.badges[movie.badge]}
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-lg">
          {text.rating} {movie.rating.average}
        </div>
      </div>

      <div className="p-5">
        <h2 className="mb-4 line-clamp-1 text-2xl font-bold">{movie.name}</h2>

        <div className="mb-4 flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className={`rounded-full px-3 py-1 text-xs ${
                isDark ? "bg-red-500/20 text-red-300" : "bg-red-50 text-red-600"
              }`}
            >
              {getGenreLabel(genre)}
            </span>
          ))}
        </div>

        <p className={`mb-6 line-clamp-3 text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
          {text.summaries[movie.name]}
        </p>

        <button
          type="button"
          onClick={() => onSelect(movie)}
          className="w-full rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-3 font-bold text-white transition hover:scale-105"
        >
          {text.watchDetail}
        </button>
      </div>
    </article>
  )
}

function MovieModal({ movie, text, isDark, getGenreLabel, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
    >
      <article
        onClick={(event) => event.stopPropagation()}
        className={`relative my-10 w-full max-w-5xl overflow-hidden rounded-3xl border shadow-2xl ${
          isDark ? "border-white/10 bg-gray-900" : "border-slate-200 bg-white text-slate-950"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 h-11 w-11 rounded-full bg-red-500 font-bold text-white shadow-lg transition hover:bg-red-600"
        >
          X
        </button>

        <div className="relative w-full">
          <img
            src={movie.image.original}
            alt={movie.name}
            className="max-h-[70vh] w-full object-cover md:max-h-[80vh]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">{movie.name}</h2>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-yellow-500 px-4 py-1 font-bold text-black">
                {text.rating} {movie.rating.average}
              </span>

              {movie.genres.map((genre) => (
                <span key={genre} className="rounded-full bg-red-500/80 px-4 py-1 text-sm">
                  {getGenreLabel(genre)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <h3 className="mb-5 text-2xl font-bold">{text.movieSummary}</h3>

          <p className={`mb-10 leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
            {text.summaries[movie.name]}
          </p>

          <h3 className="mb-5 text-2xl font-bold">{text.officialTrailer}</h3>

          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <iframe
              className="h-[220px] w-full sm:h-[320px] md:h-[450px] lg:h-[550px]"
              src={trailers[movie.name]}
              title={`${movie.name} Trailer`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Home
