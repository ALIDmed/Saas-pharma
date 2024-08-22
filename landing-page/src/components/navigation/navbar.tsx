import Link from "next/link";
import React from "react";
import Icons from "../global/icons";
import Image from "next/image";
import Logo from "../../../public/assets/Logo.png";
import { buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="px-4 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
        <div className="flex items-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="logo" className="w-8 h-8" />
            {/* <span className="text-md font-medium">All Pharma Trends</span> */}
          </Link>
        </div>

        <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center justify-center gap-8">
            <Link href="#home" className="hover:text-black/80 text-sm">
              Home
            </Link>
            <Link href="#benefits" className="hover:text-black/80 text-sm">
              Benefits
            </Link>
            <Link href="#features" className="hover:text-black/80 text-sm">
              Features
            </Link>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className={`font-semibold text-sm bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700/80 hidden md:flex`}
          >
            Access To Demo
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
