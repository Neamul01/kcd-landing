import Image from "next/image";
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

function Navbar() {
  return (
    <nav className=" text-black w-full py-2 px-8 flex items-center justify-between fixed top-0 z-10">
      <div className="flex items-center gap-8">
        <Image
          height={84}
          width={120}
          src={"/KCDLogoB.png"}
          alt="Navbar Icon"
        />
        <Image
          height={70}
          width={144}
          src={"/CloudNativeLogoB.png"}
          alt="Navbar Icon"
        />
      </div>
      <ul className="flex space-x-4">
        {menus.map((menu, index) => (
          <li key={index}>
            <a href={menu.link} className="hover:text-gray-300">
              {menu.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-8">
        <Image
          height={84}
          width={120}
          src={"/KCDLogoB.png"}
          alt="Navbar Icon"
        />
        <Image
          height={70}
          width={144}
          src={"/CloudNativeLogoB.png"}
          alt="Navbar Icon"
        />
      </div>
    </nav>
  );
}

export default Navbar;
const menus = [
  { title: "Home", link: "#" },
  { title: "About", link: "#" },
  { title: "Contact", link: "#" },
];
