import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="font-sans">
      {/* Top Bar */}
      <div className="bg-black text-white flex justify-between px-12 py-2 text-lg items-center">
        <div className="left">English | हिंदी | বাংলা</div>
        <Link to="/register" className="bg-[#1e90ff] text-white px-5 py-2 no-underline">REGISTER</Link>
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center bg-[#2c2c2c] text-white px-32 py-2">
        <div className="flex items-center">
          <img src="/SATI_Vidisha.jpg" alt="logo" className="w-[60px] mr-2" />
          <div>
            <h3 className="text-2xl font-bold">SATI Library</h3>
          </div>
        </div>

        <nav>
          <ul className="list-none flex">
            <li className="mx-2 cursor-pointer text-sm hover:text-[#1e90ff]">HOME</li>
            <li className="mx-2 cursor-pointer text-sm hover:text-[#1e90ff]">ABOUT US</li>
            <li className="mx-2 cursor-pointer text-sm hover:text-[#1e90ff]">RESOURCES</li>
            <li className="mx-2 cursor-pointer text-sm hover:text-[#1e90ff]">REMOTE ACCESS</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src="/Grand library with wooden bookshelves.png" alt="library" className="w-full h-[400px] object-cover" />
      </section>

      {/* Content Section */}
      <section className="flex px-16 py-16 bg-[#dad9d9] text-center justify-center">
        <div className="w-[70%] pl-10">
          <h2 className="mb-5 text-6xl font-bold">About us</h2>
          <p className="mb-5 leading-relaxed text-xl text-black">
            The Samrat Ashok Technological Institute (SATI) Library is a central academic facility that supports the learning and research needs of students and faculty. It houses a vast collection of textbooks, reference materials, journals, and competitive exam books across various engineering and science disciplines. In addition to its physical resources, the library provides access to digital content such as e-books and online journals, enabling users to explore knowledge beyond traditional boundaries. The library also features a शांत and well-equipped reading hall that offers a comfortable environment for focused study. With facilities like computer access, internet connectivity, and an organized catalog system, users can easily search and utilize resources. Overall, the SATI Library plays a vital role in promoting academic excellence, encouraging research, and creating a productive learning atmosphere within the institute.
          </p>
          <p className="mb-5 leading-relaxed text-xl text-black">
            The origin of the National Library of India is traced to the former
            Calcutta Public Library.
          </p>
        </div>
      </section>

      <section className="px-[25%] py-20 bg-[#e9e6e6]">
        <h1 className="text-6xl mb-7 text-[#222] flex text-center justify-center font-bold">Our Facilities</h1>

        <div className="flex items-center justify-between gap-10">
          <div className="flex-1">
            <p className="text-[22px] leading-relaxed color-[#555] mb-12">
              The Samrat Ashok Technological Institute (SATI) Library provides a well-maintained and peaceful reading environment where students can focus on their studies without distractions. It houses a wide collection of textbooks, reference books, and journals across various disciplines.
            </p>

            <p className="text-[22px] leading-relaxed color-[#555] mb-12">
              In addition to physical resources, the library offers modern digital facilities such as computer systems with internet access, enabling students to explore e-books and online journals. The organized system ensures easy access to resources along with smooth book issue and return.
            </p>
          </div>
        </div>
      </section>

      {/* Top Logos Section */}
      <section className="bg-[#f4a300] p-5">
        <div className="flex justify-center gap-10">
          <img src="/Screenshot 2026-04-10 021117.png" className="h-12" />
          <img src="/Screenshot 2026-04-10 021124.png" className="h-12" />
          <img src="/Screenshot 2026-04-10 021129.png" className="h-12" />
          <img src="/Screenshot 2026-04-10 021138.png" className="h-12" />
          <img src="/download.png" className="h-12" />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#2c2c2c] text-white flex justify-between p-12">
        {/* Left Links */}
        <div className="footer-left">
          <ul className="list-none">
            <li className="mb-2 cursor-pointer hover:text-[#00bfff]">Home</li>
            <li className="mb-2 cursor-pointer hover:text-[#00bfff]">About Us</li>
            <li className="mb-2 cursor-pointer hover:text-[#00bfff]">Library Catalogue</li>
            <li className="mb-2 cursor-pointer hover:text-[#00bfff]">Digitized Books</li>
            <li className="mb-2 cursor-pointer hover:text-[#00bfff]">RTI</li>
            <li className="mb-2 cursor-pointer hover:text-[#00bfff]">Recruitment Rules & Vacancy Position</li>
            <li className="mb-2 cursor-pointer hover:text-[#00bfff]">Order/Circular</li>
            <li className="mb-2 cursor-pointer hover:text-[#00bfff]">Annual Report</li>
          </ul>
        </div>

        {/* Middle Links */}
        <div className="pl-10 border-l border-[#555]">
          <ul className="list-none">
            <li className="mb-2">Tenders</li>
            <li className="mb-2">For Publishers</li>
            <li className="mb-2">National Library Blog</li>
            <li className="mb-2">Contact Us</li>
            <li className="mb-2"><Link to="/login" className="no-underline text-white">Admin Login</Link></li>
          </ul>
          <img src="/SATI_Vidisha.jpg" className="mt-5 w-[100px]" />
        </div>

        {/* Feedback Form */}
        <div className="w-[30%]">
          <h2 className="mb-5 font-bold">FEEDBACK TO US</h2>
          <div className="flex gap-2 mb-2">
            <input type="text" placeholder="Name" className="w-1/2 p-2 border-none rounded-sm text-black" />
            <input type="email" placeholder="yourname@company.com" className="w-1/2 p-2 border-none rounded-sm text-black" />
          </div>
          <textarea placeholder="Message" className="w-full p-2 mb-2 border-none rounded-sm h-20 text-black"></textarea>
          <div className="flex gap-2 items-center mb-2">
            <div className="h-10 w-24 bg-gray-400"></div>
            <input type="text" placeholder="Image Code" className="w-full p-2 border-none rounded-sm text-black" />
          </div>
          <button className="bg-[#4db8ff] border-none px-5 py-2 text-white cursor-pointer hover:bg-[#0099cc]">Submit</button>
        </div>
      </footer>

      {/* Bottom Copyright */}
      <div className="bg-[#f05a3c] text-white text-center p-4 text-sm">
        <p>COPYRIGHT & DISCLAIMER: No part of this site can be copied or reproduced...</p>
      </div>
    </div>
  );
};

export default Home;
