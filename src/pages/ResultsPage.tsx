import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const cleaningItems = [
  "جوراب‌های ریخته کنار تخت",
  "بطری‌های خالی روی میز",
  "لباس‌ها روی صندلی",
  "دستمال کاغذی زیر فرش",
  "خوراکی‌های نیمه‌خورده",
  "لیوان چایی خشک‌شده روی کتاب",
  "کوله‌پشتی باز کنار کمد",
  "نایلون‌های پاره روی زمین",
  "کاغذ یادداشت پراکنده",
  "پوشک بچه؟! (نه واقعاً 😳)"
];

export default function ResultsPage() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [completed, setCompleted] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (!storedImage) {
      navigate("/home");
      return;
    }
    setImageUrl(storedImage);
  }, [navigate]);

  const handleComplete = (item: string) => {
    setCompleted([...completed, item]);
    if (visibleCount < cleaningItems.length) {
      setVisibleCount(visibleCount + 1);
    }
  };

  const handleBack = () => {
    localStorage.removeItem("uploadedImage");
    navigate("/home");
  };

  if (!imageUrl) return null;

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-right font-vazir">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5 ml-2" />
          برگشت به آپلود
        </button>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="relative group">
            <img
              src={imageUrl}
              alt="تصویر اتاق"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-pink-600 mb-4">
              لیست تمیزکاری هوشمند تمیزی 🤖
            </h1>
            <p className="text-gray-600 text-sm">
              روی هر مورد کلیک کن تا تیک بخوره و مورد بعدی ظاهر بشه
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {cleaningItems.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                completed.includes(item)
                  ? "bg-green-100 text-green-700 line-through"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleComplete(item)}
            >
              <div className="flex items-center justify-between">
                <span>{item}</span>
                {completed.includes(item) && (
                  <span className="text-green-500">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {completed.length === cleaningItems.length && (
          <div className="mt-10 text-center text-gray-600 text-lg animate-fade-in">
            🎉 کارت تموم شد!
            <br />
            <span className="text-pink-500">
              ما درکت می‌کنیم… خوابگاهیه، هنوز به payday نرسیدی 😅
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 