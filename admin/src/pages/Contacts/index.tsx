import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiPlus, HiPencil, HiTrash, HiSearch, HiPhone, HiMail } from 'react-icons/hi'
import { contactsApi } from '../../services/api'

interface Contact {
  id: string
  name: string
  type: string
  label: string
  value: string
  href: string
  icon?: string
  iconType?: string
  color?: string
  order: number
  isActive: boolean
  createdAt: string
}

const typeLabels: Record<string, string> = {
  phone: 'Điện thoại',
  messenger: 'Messenger',
  zalo: 'Zalo',
  email: 'Email',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  viber: 'Viber',
  skype: 'Skype',
  other: 'Khác',
}

export default function Contacts() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterActive, setFilterActive] = useState<string>('all')

  useEffect(() => {
    fetchContacts()
  }, [searchQuery, filterType, filterActive])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const params: any = {}
      
      if (filterActive !== 'all') {
        params.isActive = filterActive === 'true'
      }
      
      if (filterType !== 'all') {
        params.type = filterType
      }

      const response = await contactsApi.getAll(params)

      if (response.success) {
        let contactsData: Contact[] = []
        
        if (response.data && Array.isArray(response.data)) {
          contactsData = response.data
        } else if (response.data && typeof response.data === 'object') {
          const data = (response.data as any).data || response.data
          if (Array.isArray(data)) {
            contactsData = data
          }
        }

        contactsData = contactsData.map((contact: any) => ({
          ...contact,
          id: contact.id || contact._id?.toString() || contact._id,
        }))

        if (searchQuery.trim()) {
          contactsData = contactsData.filter(
            (contact) =>
              contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              contact.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              contact.value?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }

        setContacts(contactsData)
      } else {
        console.error('API Error:', response.message || response.error)
        setContacts([])
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) return

    try {
      const response = await contactsApi.delete(id)
      if (response.success) {
        alert('Xóa liên hệ thành công!')
        fetchContacts()
      } else {
        alert(response.message || response.error || 'Lỗi khi xóa liên hệ')
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
      alert('Lỗi khi xóa liên hệ')
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Liên hệ</h1>
        <Link
          to="/contacts/new"
          className="button-primary inline-flex items-center gap-2"
        >
          <HiPlus className="w-5 h-5" />
          Thêm liên hệ mới
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, nhãn, giá trị..."
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <select
          className="select select-bordered w-full md:w-auto"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tất cả loại</option>
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

        <select
          className="select select-bordered w-full md:w-auto"
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="true">Đang hoạt động</option>
          <option value="false">Đã tắt</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-48"></div>
          ))}
        </div>
      ) : contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {contact.name}
                    </h3>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {typeLabels[contact.type] || contact.type}
                    </span>
                  </div>
                  {!contact.isActive && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                      Đã tắt
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Nhãn:</span>
                    <span>{contact.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Giá trị:</span>
                    <span className="break-all">{contact.value}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Link:</span>
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all text-xs"
                    >
                      {contact.href.length > 30 ? `${contact.href.substring(0, 30)}...` : contact.href}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Thứ tự: {contact.order}</span>
                    <span>{formatDate(contact.createdAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/contacts/${contact.id}/edit`}
                    className="button-secondary button-sm flex-1 inline-flex items-center justify-center gap-1"
                  >
                    <HiPencil className="w-4 h-4" />
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="button-danger button-sm flex-1 inline-flex items-center justify-center gap-1"
                  >
                    <HiTrash className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Không có liên hệ nào được tìm thấy.
        </div>
      )}
    </div>
  )
}

