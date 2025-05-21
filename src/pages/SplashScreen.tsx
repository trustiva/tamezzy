import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000); // 3 seconds display

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#ff5e62] text-white flex-col gap-4 transition-all duration-1000">
      <div className="flex items-center justify-center bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
        <img
          src="/logo.svg"
          alt="TAMEZZY Logo"
          className="w-32 h-32 object-contain"
        />
      </div>
      <h1 className="text-4xl font-bold font-vazir animate-bounce">تمیزی</h1>
      <p className="text-lg text-white/80 font-vazir">فقط یه عکس بده… بقیه‌ش با ما 😎</p>
    </div>
  );
} 