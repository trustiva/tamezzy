import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function HomePage() {
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast.error('لطفا یک فایل تصویر آپلود کنید');
        return;
      }
      setImage(file);
    }
  };

  const handleAnalyze = () => {
    if (image) {
      // Convert image to base64 and store in localStorage
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        localStorage.setItem('uploadedImage', imageUrl);
        navigate("/results");
      };
      reader.readAsDataURL(image);
    } else {
      toast.error('اول یه عکس از اتاقت بده 😅');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-right font-vazir">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            آماده‌ای اتاقت رو نجات بدی؟ 😎
          </h1>
          <p className="text-gray-700 text-sm mb-6">
            فقط یه عکس از اتاق بهم‌ریخته‌ت بده، بقیه‌ش با ماست.
          </p>
        </div>

        <div className="space-y-4">
          <label className="cursor-pointer block w-full">
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition text-center">
              آپلود عکس اتاق
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {image && (
            <div className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <button
                  onClick={() => setImage(null)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  حذف تصویر
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!image}
            className={`w-full py-3 rounded-lg shadow-lg transition-all duration-300 ${
              image 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            بزن بریم تمیزش کنیم!
          </button>
        </div>
      </div>
    </div>
  );
} 