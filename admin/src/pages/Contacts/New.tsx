import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import { contactsApi, uploadApi } from '../../services/api'

export default function ContactNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadingIcon, setUploadingIcon] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'phone',
    label: '',
    value: '',
    href: '',
    icon: '',
    iconType: 'image',
    color: 'bg-blue-500',
    order: 0,
    isActive: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingIcon(true)
    try {
      const response = await uploadApi.uploadImage(file, 'contacts')
      if (response.success && response.data?.url) {
        setFormData((prev) => ({ ...prev, icon: response.data.url }))
      } else {
        alert(response.message || 'Lỗi khi upload ảnh')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Lỗi khi upload ảnh')
    } finally {
      setUploadingIcon(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.name.trim() || !formData.type || !formData.label.trim() || !formData.value.trim() || !formData.href.trim()) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc.')
      setLoading(false)
      return
    }

    const contactData: any = {
      name: formData.name.trim(),
      type: formData.type,
      label: formData.label.trim(),
      value: formData.value.trim(),
      href: formData.href.trim(),
      iconType: formData.iconType,
      color: formData.color,
      order: formData.order,
      isActive: formData.isActive,
    }

    if (formData.icon.trim()) {
      contactData.icon = formData.icon.trim()
    }

    try {
      const response = await contactsApi.create(contactData)
      if (response.success) {
        alert('Tạo liên hệ thành công!')
        navigate('/contacts')
        window.location.reload()
      } else {
        alert(response.message || response.error || 'Lỗi khi tạo liên hệ')
      }
    } catch (error) {
      console.error('Error creating contact:', error)
      alert('Lỗi khi tạo liên hệ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Thêm liên hệ mới</h1>
        <Link to="/contacts" className="button-secondary inline-flex items-center gap-2">
          <HiArrowLeft className="w-5 h-5" />
          Quay lại
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin cơ bản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="label">
                Tên liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="label">
                Loại liên hệ <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                required
              >
                <option value="phone">Điện thoại</option>
                <option value="messenger">Messenger</option>
                <option value="zalo">Zalo</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
                <option value="viber">Viber</option>
                <option value="skype">Skype</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label htmlFor="label" className="label">
                Nhãn hiển thị <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="label"
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Ví dụ: 0913224378"
                required
              />
            </div>
            <div>
              <label htmlFor="value" className="label">
                Giá trị liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="value"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Ví dụ: 0913224378"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="href" className="label">
                Link liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="href"
                name="href"
                value={formData.href}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Ví dụ: tel:+84913224378 hoặc https://m.me/tanphatfood"
                required
              />
            </div>
          </div>
        </div>

        {/* Icon and Appearance */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Icon và giao diện</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="iconType" className="label">
                Loại icon
              </label>
              <select
                id="iconType"
                name="iconType"
                value={formData.iconType}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="image">Ảnh</option>
                <option value="svg">SVG</option>
                <option value="icon">Icon</option>
              </select>
            </div>
            <div>
              <label htmlFor="color" className="label">
                Màu nền
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="bg-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="icon" className="label">
                Icon (URL hoặc đường dẫn)
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="input input-bordered w-full mb-2"
                placeholder="/images/icons/mess.png hoặc URL"
              />
              <input
                type="file"
                id="iconUpload"
                accept="image/*"
                onChange={handleIconUpload}
                className="file-input file-input-bordered w-full"
                disabled={uploadingIcon}
              />
              {uploadingIcon && <span className="loading loading-spinner loading-sm mt-2"></span>}
              {formData.icon && (
                <div className="mt-2">
                  <img src={formData.icon} alt="Icon preview" className="w-16 h-16 object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cài đặt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="order" className="label">
                Thứ tự hiển thị
              </label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="form-control">
                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">Đang hoạt động</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="button-primary w-full" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Tạo liên hệ'}
        </button>
      </form>
    </div>
  )
}

