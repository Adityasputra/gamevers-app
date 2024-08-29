import { ProductModel } from "@/db/models/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function CardGames({ product }: { product: ProductModel }) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow min-h-[400px] flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="rounded-xl mb-4 w-full object-cover h-52"
      />
      <h3 className="text-lg font-semibold text-white">{product.name}</h3>
      <div className="flex flex-wrap gap-2 mt-3">
        {product.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-700 text-white text-xs font-semibold py-1 px-3 rounded-full"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
      <p className="text-sm mt-4 text-gray-300 leading-relaxed">
        {product.excerpt}
      </p>

      {/* Bagian Harga dan Tombol */}
      <div className="mt-auto flex items-center justify-between space-x-4">
        <p className="text-xl font-bold text-orange-500">${product.price}</p>
        <div className="flex space-x-2">
          <button className="flex items-center justify-center bg-orange-600 py-2 px-4 rounded-full text-sm font-semibold text-white hover:bg-orange-700 transition-colors">
            Add to Cart
          </button>
          <button className="flex items-center justify-center bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
