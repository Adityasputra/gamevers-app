export default function CardGames() {
  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-gray-700 p-4 rounded-lg">
          <img src="/Horizon/image1.jpeg" className="rounded-lg mb-4 w-full" />
          <h3 className="text-lg font-semibold">Horizon</h3>
          <p className="text-gray-400">PS4</p>
          <p className="text-xl font-bold mt-2">$2000000</p>
          <button className="w-full bg-orange-500 mt-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
