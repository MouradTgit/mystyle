import { useEffect } from "react";
import axios from "axios";
import { useStore } from "./store";

const styles = ["streetwear", "minimal", "vintage", "y2k", "formal"];

export default function App() {
  const {
    selectedStyle,
    setStyle,
    images,
    setImages,
    addFavorite,
    favorites,
    loading,
    error,
  } = useStore();

  const fetchImage = async (style) => {
    try {
      useStore.setState({ loading: true, error: null });

      const res = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: `${style} fashion outfit`,
            per_page: 8,
          },
          headers: {
            Authorization:
              "Client-ID RkFIOGlnF-KQH34uLyzgNd5Tyw-5qiub2OrA0Gdw4pM",
          },
        }
      );

      const imgs = res.data.results.map(
        (item) => item.urls.regular
      );

      setImages(imgs);
    } catch (err) {
      useStore.setState({
        error: "Failed to load images",
      });
    } finally {
      useStore.setState({ loading: false });
    }
  };

  useEffect(() => {
    fetchImage(selectedStyle);
  }, [selectedStyle]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-10">
      
      {/* NAVBAR */}
      <div className="max-w-7xl mx-auto flex justify-between items-center border border-zinc-800 rounded-full px-6 py-4 backdrop-blur-sm bg-white/5 mb-10 sticky top-4 z-50">
        <h1 className="text-2xl font-black tracking-[0.3em]">
          MYSTYLE
        </h1>

        <div className="flex gap-6 text-sm text-zinc-400">
          <p className="hover:text-white transition cursor-pointer">
            Explore
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Favorites
          </p>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.4em] text-zinc-500 text-sm mb-3">
          Digital Fashion Archive
        </p>

        <h1 className="text-6xl md:text-7xl font-black tracking-tight">
          Discover Your
          <span className="text-zinc-400"> Aesthetic</span>
        </h1>

        <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
          Browse curated outfit inspiration from different fashion aesthetics
          and save your favorite looks.
        </p>
      </div>

      {/* STYLE BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setStyle(style)}
            className={`px-6 py-3 rounded-full border text-sm uppercase tracking-wide transition-all duration-300 ${
              selectedStyle === style
                ? "bg-white text-black border-white shadow-lg shadow-white/20"
                : "border-zinc-700 text-zinc-300 hover:border-white hover:text-white hover:scale-105"
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {/* STATUS */}
      {loading && (
        <p className="text-zinc-400 text-center">
          Loading outfits...
        </p>
      )}

      {error && (
        <p className="text-red-400 text-center">
          {error}
        </p>
      )}

      {/* RESULT COUNT */}
      <p className="text-zinc-500 mb-8 text-center">
        {images.length} looks found for "{selectedStyle}"
      </p>

      {/* IMAGE FEED */}
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative group w-[300px] h-[420px] rounded-[2rem] overflow-hidden border border-zinc-800 bg-zinc-900 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
          >
            <img
              src={img}
              alt="fashion"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Save Button */}
            <button
              onClick={() => addFavorite(img)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-105"
            >
              Save Fit
            </button>
          </div>
        ))}
      </div>

      {/* FAVORITES */}
      <div className="mt-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Saved Fits
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {favorites.map((fav, i) => (
            <img
              key={i}
              src={fav}
              alt="favorite"
              className="w-32 h-44 object-cover rounded-2xl border border-zinc-700 hover:scale-105 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
}