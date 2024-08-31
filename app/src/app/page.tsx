import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const EVENTS = [
  {
    img: "/Horizon/image1.jpeg",
    title: "Future of Web Development: Trends and Innovations",
    desc: "Discover the latest trends and innovations shaping the future of web development.",
    buttonLabel: "Register for Free",
    price: 20000
  },
  {
    img: "/Horizon/image2.jpeg",
    title: "WebDev Pro Code-a-Thon: Build a Responsive Website",
    desc: "Participants will have 48 hours to create a responsive website from scratch using HTML, CSS, and JavaScript.",
    buttonLabel: "Register for Free",
  },
  {
    img: "/Horizon/image3.jpeg",
    title: "Ask the Experts: Frontend Web Development",
    desc: "Join our live Q&A session with our experienced instructors. Get answers to your queries, insights into best practices.",
    buttonLabel: "Get Ticket",
  },
  {
    img: "/Horizon/image4.jpeg",
    title: "Web Accessibility: Building Inclusive Websites",
    desc: "Industry experts will discuss the importance of inclusive design and share strategies for creating websites.",
    buttonLabel: "Get Ticket",
  },
];

function Hero() {
  //   const CURRENT_YEAR = new Date().getFullYear();

  //   return (
  //     <>
  //       <Navbar />
  //       <div className="relative flex h-[55vh] w-full items-center px-10">
  //         <Image
  //           width={1000}
  //           height={1000}
  //           src="/images/home.jpeg"
  //           alt="bg-img"
  //           className="absolute inset-0 ml-auto w-[720px] h-[600px] rounded-bl-[80px] object-cover object-center shadow-2xl shadow-fuchsia-500"
  //         />
  //         <div className="relative container mx-auto mt-40 flex flex-col items-center lg:items-start text-center lg:text-left">
  //           <div className="w-full rounded-xl border border-white bg-white/90 py-10 px-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 lg:w-3/4">
  //             <h1 className="text-blue-gray-800 text-3xl lg:text-5xl font-bold lg:max-w-3xl">
  //               Unlock New Experiences by Playing New Games
  //             </h1>
  //             <p className="mt-6 mb-10">
  //               Are you ready to embark on an exciting journey into the world of
  //               gaming? No need to wait any longer! We are your trusted partner to
  //               enjoy a wide range of games.
  //             </p>
  //             <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:gap-6 lg:justify-start">
  //               <Link
  //                 href={"/products"}
  //                 className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
  //               >
  //                 View All Games
  //               </Link>
  //               <button className="border border-gray-800 text-gray-800 py-2 px-4 rounded hover:bg-gray-100">
  //                 See Pricing
  //               </button>
  //             </div>
  //             <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
  //               <Image
  //                 width={80}
  //                 height={80}
  //                 className="w-20 grayscale opacity-60"
  //                 src="/home/ps5.png"
  //                 alt="ps5"
  //               />
  //               <Image
  //                 width={80}
  //                 height={80}
  //                 className="w-20 grayscale opacity-60"
  //                 src="/home/ps4.png"
  //                 alt="ps4"
  //               />
  //               <Image
  //                 width={80}
  //                 height={80}
  //                 className="w-20 grayscale opacity-60"
  //                 src="/home/vr.png"
  //                 alt="vr"
  //               />
  //               <Image
  //                 width={80}
  //                 height={80}
  //                 className="w-20 grayscale opacity-60"
  //                 src="/home/pc.png"
  //                 alt="pc"
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <section className="pt-60 px-8 mt-20 mb-24">
  //         <div className="container mx-auto mb-12 text-center">
  //           <h2 className="text-3xl font-bold text-white mb-4">Get All Games</h2>
  //           <p className="text-gray-100 text-lg mx-auto w-full px-4 font-normal lg:w-6/12">
  //             Join us and experience a fun and thrilling gaming experience.
  //           </p>
  //         </div>
  //         <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
  //           {EVENTS.map((event, idx) => (
  //             <ProductCard key={idx} {...event} />
  //           ))}
  //         </div>
  //       </section>
  //       <div className="relative flex h-[40vh] w-full items-center justify-center bg-gray-900">
  //         <div className="relative w-[80%] h-[70%]">
  //           <Image
  //             src="/Horizon/thumbnail/image1.jpg"
  //             alt="Promo Banner"
  //             layout="fill"
  //             objectFit="cover"
  //             className="rounded-2xl shadow-2xl"
  //           />
  //         </div>
  //         <div className="absolute inset-0 flex items-center justify-center">
  //           <div className="bg-black/50 p-4 rounded-lg shadow-lg">
  //             <p className="text-white text-lg lg:text-2xl font-semibold">
  //               Special Promotion: 30% Off on All Games!
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //       <footer className="bg-gray-800 px-8 py-12 text-white">
  //         <div className="container mx-auto max-w-6xl">
  //           <div className="grid grid-cols-4 gap-12">
  //             <div className="flex flex-col space-y-6">
  //               <h6 className="text-xl font-semibold">Company</h6>
  //               <ul className="space-y-2">
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     About Us
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Careers
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Premium Tools
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Blog
  //                   </a>
  //                 </li>
  //               </ul>
  //             </div>

  //             <div className="flex flex-col space-y-6">
  //               <h6 className="text-xl font-semibold">Pages</h6>
  //               <ul className="space-y-2">
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Login
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Register
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Add List
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Contact
  //                   </a>
  //                 </li>
  //               </ul>
  //             </div>

  //             <div className="flex flex-col space-y-6">
  //               <h6 className="text-xl font-semibold">Legal</h6>
  //               <ul className="space-y-2">
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Terms
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Privacy
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     Team
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#" className="hover:text-gray-400 transition-colors">
  //                     About Us
  //                   </a>
  //                 </li>
  //               </ul>
  //             </div>

  //             <div className="flex flex-col space-y-6">
  //               <h6 className="text-xl font-semibold">Subscribe</h6>
  //               <p className="text-gray-300">
  //                 Get access to subscriber-exclusive deals and be the first to
  //                 know about new sales.
  //               </p>
  //               <label htmlFor="email" className="text-gray-300 font-medium">
  //                 Your Email
  //               </label>
  //               <div className="flex flex-col lg:flex-row gap-4 items-center">
  //                 <input
  //                   id="email"
  //                   type="email"
  //                   placeholder="Email"
  //                   className="w-full p-3 border border-gray-700 rounded-lg text-gray-900 placeholder-gray-500"
  //                 />
  //                 <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400">
  //                   Subscribe
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </footer>
  //     </>
  //   );

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
            <p className="text-xl font-bold">{EVENTS[0].title}</p>

            <p className="text-gray-500">{EVENTS[0].desc}</p>
            <div className="flex space-x-2">
              <span className="bg-gray-200 text-xs font-medium px-2 py-1 rounded">
                PS5
              </span>
              <span className="bg-gray-200 text-xs font-medium px-2 py-1 rounded">
                PS4
              </span>
            </div>

            <p className="text-base font-bold">Rp {EVENTS[0].price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
