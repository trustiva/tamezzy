import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ShareIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function BeforeAfterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const before = location.state?.before as string | undefined;
  const after = location.state?.after as string | undefined;

  const [transitionDone, setTransitionDone] = useState(false);

  useEffect(() => {
    if (!before) {
      navigate("/home");
      return;
    }

    const timer = setTimeout(() => setTransitionDone(true), 500);
    return () => clearTimeout(timer);
  }, [before, navigate]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "نتیجه تمیزکاری با تمیزی",
          text: "ببینید چطور اتاقم رو تمیز کردم! 😎",
          url: window.location.href,
        });
      } else {
        toast.success("لینک کپی شد!");
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      toast.error("خطا در اشتراک‌گذاری");
    }
  };

  const handleDownload = () => {
    if (!after) {
      toast.error("هنوز تصویر نهایی آماده نیست");
      return;
    }

    const link = document.createElement("a");
    link.href = after;
    link.download = "tamezzy-result.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("تصویر با موفقیت دانلود شد!");
  };

  const handleBack = () => {
    navigate("/results");
  };

  if (!before) return null;

  return (
    <div className="min-h-screen bg-white py-10 px-4 font-vazir text-right">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5 ml-2" />
            برگشت
          </button>
          <h1 className="text-2xl font-bold text-pink-600">قبل و بعد ✨</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700">
          <div
            className={`p-2 border rounded-lg shadow-md transform transition-all duration-700 ${
              transitionDone ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <h2 className="text-center mb-2 text-sm text-gray-500">قبل</h2>
            <img src={before} alt="Before" className="w-full rounded" />
          </div>
          <div
            className={`p-2 border rounded-lg shadow-md transform transition-all duration-700 ${
              transitionDone ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <h2 className="text-center mb-2 text-sm text-gray-500">بعد</h2>
            {after ? (
              <img src={after} alt="After" className="w-full rounded" />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                هنوز تصویری برای "بعد" آپلود نشده 😅
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
          >
            <ShareIcon className="w-5 h-5" />
            اشتراک‌گذاری
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            دانلود
          </button>
        </div>
      </div>
    </div>
  );
} 