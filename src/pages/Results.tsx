import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

interface MessyItem {
  name: string
  location: string
  priority: number
  tip: string
}

export default function Results() {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage')
    if (!storedImage) {
      navigate('/home')
      return
    }
    setImageUrl(storedImage)
  }, [navigate])

  const handleBack = () => {
    localStorage.removeItem('uploadedImage')
    navigate('/home')
  }

  // Mock data for demonstration
  const mockItems: MessyItem[] = [
    {
      name: 'لباس‌های روی زمین',
      location: 'کنار تخت',
      priority: 1,
      tip: 'یک سبد لباس‌چرک کنار تخت بذار تا اینطوری نشه'
    },
    {
      name: 'بطری‌های خالی آب',
      location: 'روی میز',
      priority: 2,
      tip: 'یک سطل زباله زیر میز بذار'
    },
    {
      name: 'کتاب‌های پراکنده',
      location: 'اطراف اتاق',
      priority: 3,
      tip: 'یک قفسه مخصوص کتاب‌ها در نظر بگیر'
    }
  ]

  if (!imageUrl) return null

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeftIcon className="w-5 h-5 ml-2" />
        برگشت به آپلود
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <img
            src={imageUrl}
            alt="تصویر اتاق"
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">لیست اولویت‌های تمیزکاری</h2>
          
          {mockItems.map((item) => (
            <div key={item.name} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.location}</p>
                </div>
                <span className="gradient-bg text-white px-3 py-1 rounded-full text-sm">
                  اولویت {item.priority}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{item.tip}</p>
            </div>
          ))}

          <div className="card bg-gray-50">
            <p className="text-gray-600 italic">
              TAMEZZY بهت ایمان داره. شاید.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 