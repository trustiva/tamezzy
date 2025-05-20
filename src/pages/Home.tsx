import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface HomeProps {
  onImageUpload: (imageUrl: string) => void
}

export default function Home({ onImageUpload }: HomeProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('لطفا یک فایل تصویر آپلود کنید')
      return
    }

    setIsLoading(true)
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        onImageUpload(imageUrl)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      toast.error('خطا در پردازش تصویر')
    } finally {
      setIsLoading(false)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  })

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">TAMEZZY</h1>
        <p className="text-2xl mb-1">تمیزی</p>
        <p className="text-gray-600 mt-4">
          عکس اتاقت رو بنداز اینجا. TAMEZZY بهت می‌گه از کجا شروع کنی 😎
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`card cursor-pointer transition-all duration-200
          ${isDragActive ? 'border-2 border-primary-from' : 'border-2 border-dashed border-gray-300'}
          hover:border-primary-from`}
      >
        <input {...getInputProps()} />
        <div className="py-12">
          <ArrowUpTrayIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">
            {isDragActive
              ? 'تصویر رو اینجا رها کن...'
              : 'تصویر رو اینجا رها کن یا کلیک کن تا انتخاب کنی'}
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-from mx-auto"></div>
          <p className="text-gray-600 mt-2">در حال پردازش تصویر...</p>
        </div>
      )}

      <button 
        className="btn-primary mt-6"
        onClick={() => toast.success('به زودی: تحلیل هوشمند تصویر')}
      >
        بزن بریم تمیزش کنیم!
      </button>
    </div>
  )
} 