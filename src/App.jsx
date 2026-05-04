import { useEffect } from "react";
import axios from "axios";
import { useStore } from "./store";

const styles = ["streetwear", "minimal", "vintage", "y2k", "formal"];

export default function App() {
  const {
    selectedStyle,
    setStyle,
    image,
    setImage,
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
          params: { query: `${style} outfit`, per_page: 1 },
          headers: {
            Authorization: "Client-ID RkFIOGlnF-KQH34uLyzgNd5Tyw-5qiub2OrA0Gdw4pM",
          },
        }
      );

      const img = res.data.results[0]?.urls?.regular;
      setImage(img || "");

      if (!img) {
        useStore.setState({ error: "No image found" });
      }
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
  <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-10">
    
    <div className="text-center mb-8">
      <h1 className="text-5xl font-extrabold tracking-widest">
        MyStyle
      </h1>
      <p className="text-gray-500 text-sm tracking-wide">
  Streetwear • Minimal • Vintage • Y2K
      </p>
      <p className="text-gray-400 mt-2">
        Discover your aesthetic
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

    {image && !loading && (
      <div className="flex flex-col items-center gap-5">
        <img
          src={image}
          alt="outfit"
          className="w-[320px] h-[420px] object-cover rounded-2xl shadow-2xl hover:scale-105 transition"
        />

        <button
          onClick={() => addFavorite(image)}
          className="bg-white text-black px-6 py-2 rounded-full hover:scale-105 transition"
        >
          Save to Favorites
        </button>
      </div>
    )}

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