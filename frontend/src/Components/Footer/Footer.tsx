import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineContactPhone } from "react-icons/md";

interface Props {}

const Footer = (props: Props) => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 fixed bottom-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 text-center">
          <p>© 2024 ByteBook. All rights reserved.</p>
        </div>
        <div className="flex-1 flex justify-end">
          <Link to='contact' className="text-blueGray-500 text-medium uppercase font-bold no-underline flex items-center">
            <MdOutlineContactPhone className="mr-2" />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;