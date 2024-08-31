import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xl font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-4">Connect</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
