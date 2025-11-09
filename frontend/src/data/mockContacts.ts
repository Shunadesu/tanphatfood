export interface Contact {
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
}

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Hotline',
    type: 'phone',
    label: '0913224378',
    value: '0913224378',
    href: 'tel:+84913224378',
    color: 'bg-primary-500',
    order: 0,
    isActive: true,
  },
  {
    id: '2',
    name: 'Messenger',
    type: 'messenger',
    label: 'Messenger',
    value: 'tanphatfood',
    href: 'https://m.me/tanphatfood',
    icon: '/images/icons/mess.png',
    iconType: 'image',
    color: 'bg-blue-500',
    order: 1,
    isActive: true,
  },
  {
    id: '3',
    name: 'Zalo',
    type: 'zalo',
    label: 'Zalo Chat',
    value: '0913224378',
    href: 'https://zalo.me/0913224378',
    icon: '/images/icons/zalo.png',
    iconType: 'image',
    color: 'bg-blue-600',
    order: 2,
    isActive: true,
  },
]

export const getActiveContacts = (): Contact[] => {
  return mockContacts.filter((contact) => contact.isActive).sort((a, b) => a.order - b.order)
}

export const getContactById = (id: string): Contact | undefined => {
  return mockContacts.find((contact) => contact.id === id)
}

export const getContactsByType = (type: string): Contact[] => {
  return mockContacts.filter((contact) => contact.type === type && contact.isActive)
}

