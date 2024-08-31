export default function CardWishlist() {
  return (
    <>
      <div className="mx-auto p-24">
        <div className="flex gap-3 bg-white rounded-xl overflow-hidden items-center justify-start">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
              loading="lazy"
              src="/Horizon/image1.jpeg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold"></p>

            <p className="text-gray-500"></p>
            <div className="flex space-x-2">
              <span className="bg-gray-200 text-xs font-medium px-2 py-1 rounded">
                PS5
              </span>
              <span className="bg-gray-200 text-xs font-medium px-2 py-1 rounded">
                PS4
              </span>
            </div>

            <p className="text-base font-bold"></p>
          </div>
        </div>
      </div>
    </>
  );
}
