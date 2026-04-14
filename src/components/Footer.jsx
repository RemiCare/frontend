// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10 py-6 px-4 text-center text-sm text-gray-500">
      <div className="mb-2">
        © 2025 복지 플랫폼. All rights reserved.
      </div>
      <div className="space-x-4">
        <a href="/policy" className="hover:underline">복지 정책</a>
        <a href="/news" className="hover:underline">활동 소식</a>
        <a href="/location" className="hover:underline">찾아오는 길</a>
      </div>
    </footer>
  );
};

export default Footer;
