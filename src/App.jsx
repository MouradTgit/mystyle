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
          params: { query: `${style} outfit`, per_page: 8 },
          headers: {
            Authorization: "Client-ID RkFIOGlnF-KQH34uLyzgNd5Tyw-5qiub2OrA0Gdw4pM",
          },
        }
      );

      const imgs = res.data.results.map((item) => item.urls.regular);
setImages(imgs);

      
    } catch (err) {
      useStore.setState({ error: "Failed to load image" });
    } finally {
      useStore.setState({ loading: false });
    }
  };

  useEffect(() => {
    fetchImage(selectedStyle);
  }, [selectedStyle]);

  
return (
  <div className="max-w-7xl mx-auto flex justify-between items-center border border-zinc-800 rounded-full px-6 py-4 backdrop-blur-sm bg-white/5 mb-10 sticky top-4 z-50">
  <h1 className="text-2xl font-black tracking-[0.3em]">
    MyStyle
  </h1>

  <div className="flex gap-6 text-sm text-zinc-400">
    <p className="hover:text-white transition cursor-pointer">
      Explore
    </p>
    <p className="hover:text-white transition cursor-pointer">
      Favorites
    </p>
  </div>

    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {styles.map((style) => (
        <button
          key={style}
          onClick={() => setStyle(style)}
          className={`px-5 py-2 rounded-full border transition ${
            selectedStyle === style
              ? "bg-white text-black"
              : "border-white hover:bg-white hover:text-black"
          }`}
        >
          {style}
        </button>
      ))}
    </div>

    {loading && (
      <p className="text-gray-400">Loading outfit...</p>
    )}

    {error && (
      <p className="text-red-400">{error}</p>
    )}

    {/* IMAGE GRID */}
<div className="mt-6 w-full flex flex-col items-center gap-8">
  {images.map((img, i) => (
    <div
      key={i}
      className="relative w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-gray-700 bg-black transform transition duration-300 hover:scale-105 hover:-translate-y-2"
    >
      <img
        src={img}
        className="w-full h-full object-cover"
      />

      {/* soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Save button */}
      <button
        onClick={() => addFavorite(img)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 hover:scale-105 transition"
      >
        Save Fit
      </button>
    </div>
  ))}
</div>

    <div className="mt-12 w-full max-w-4xl">
      <h2 className="text-xl mb-4 text-gray-300">
        Favorites
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {favorites.map((fav, i) => (
          <img
            key={i}
            src={fav}
            className="w-24 h-32 object-cover rounded-lg border border-gray-700"
          />
        ))}
      </div>
    </div>
  </div>
);
}