// "use client";

// import { useEffect, useState } from "react";
// import { BASE_URL } from "@/constants";
// import Link from "next/link";
// import { Wishlist } from "@/db/models/wishlist";

// export default function WishlistPages() {
//   const [wishlistItems, setWishlistItems] = useState<Wishlist[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlist`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch wishlist.");
//         }

//         const data = await res.json();
//         setWishlistItems(data || []);
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//         setError("Failed to fetch wishlist.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   if (loading) {
//     return <p className="text-gray-600">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
//       <div className="flex flex-wrap -mx-4">
//         {wishlistItems.length > 0 ? (
//           wishlistItems.map((item) => (
//             console.log(item),
//             <div
//               key={'item._id'}
//               className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col justify-between mx-4 mb-4 flex-1 min-w-[300px] transition-transform transform hover:scale-105"
//             >
//               {item && (
//                 <img
//                   src={item.thumbnail}
//                   alt={item.name}
//                   className="w-full h-48 object-cover mb-4 rounded-lg"
//                 />
//               )}
//               <div className="flex flex-col flex-1">
//                 <h2 className="text-xl font-semibold mb-2">
//                   {item.name}
//                 </h2>
//                 <p className="text-gray-600 mb-2 flex-1">
//                   {item.description}
//                 </p>
//                 <p className="font-bold text-lg mb-4">
//                   ${item.price.toFixed(2)}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {item.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-blue-100 text-blue-800 text-sm px-2.5 py-0.5 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center mt-4">
//                   <Link
//                     href={`/products/${item._id}`}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No products in your wishlist.</p>
//         )}
//       </div>
//     </div>
//   );
// }
