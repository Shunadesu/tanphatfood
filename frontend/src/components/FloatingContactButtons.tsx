'use client'

import { useState } from 'react'

const FloatingContactButtons = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const contacts = [
    {
      name: 'Hotline',
      label: '0913224378',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.62 10.75C17.19 10.75 16.85 10.4 16.85 9.97998C16.85 9.60998 16.48 8.83998 15.86 8.16998C15.25 7.51998 14.58 7.13998 14.02 7.13998C13.59 7.13998 13.25 6.78998 13.25 6.36998C13.25 5.94998 13.6 5.59998 14.02 5.59998C15.02 5.59998 16.07 6.13998 16.99 7.10998C17.85 8.01998 18.4 9.14998 18.4 9.96998C18.4 10.4 18.05 10.75 17.62 10.75Z" fill="url(#paint0_linear_4812_364)"/>
        <path d="M21.23 10.75C20.8 10.75 20.46 10.4 20.46 9.98C20.46 6.43 17.57 3.55 14.03 3.55C13.6 3.55 13.26 3.2 13.26 2.78C13.26 2.36 13.6 2 14.02 2C18.42 2 22 5.58 22 9.98C22 10.4 21.65 10.75 21.23 10.75Z" fill="url(#paint1_linear_4812_364)"/>
        <path d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z" fill="url(#paint2_linear_4812_364)"/>
        <path d="M21.97 18.33C21.97 18.61 21.92 18.9 21.82 19.18C21.79 19.26 21.76 19.34 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C19.39 21.62 19.38 21.63 19.37 21.63C18.78 21.87 18.14 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C10.36 19 9.96998 18.71 9.59998 18.4L12.87 15.13C13.15 15.34 13.4 15.5 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" fill="url(#paint3_linear_4812_364)"/>
        <defs>
        <linearGradient id="paint0_linear_4812_364" x1="13.25" y1="8.17498" x2="18.4" y2="8.17498" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00652E"/>
        <stop offset="1" stop-color="#00CB5C"/>
        </linearGradient>
        <linearGradient id="paint1_linear_4812_364" x1="13.26" y1="6.375" x2="22" y2="6.375" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00652E"/>
        <stop offset="1" stop-color="#00CB5C"/>
        </linearGradient>
        <linearGradient id="paint2_linear_4812_364" x1="2" y1="9.54688" x2="11.345" y2="9.54688" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00652E"/>
        <stop offset="1" stop-color="#00CB5C"/>
        </linearGradient>
        <linearGradient id="paint3_linear_4812_364" x1="9.59998" y1="18.02" x2="21.97" y2="18.02" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00652E"/>
        <stop offset="1" stop-color="#00CB5C"/>
        </linearGradient>
        </defs>
        </svg>
      ),
      href: 'tel:+84913224378',
      color: 'bg-primary-500',
    },
    {
      name: 'Messenger',
      label: 'Messenger',
      icon: <img src="/images/icons/mess.png" alt="Messenger" className="w-6 h-6" />,
      href: 'https://m.me/tanphatfood',
      color: 'bg-blue-500',
    },
    {
      name: 'Zalo',
      label: 'Zalo Chat',
      icon: <img src="/images/icons/zalo.png" alt="Zalo" className="w-6 h-6" />,
      href: 'https://zalo.me/0913224378',
      color: 'bg-blue-600',
    },
  ]

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
      {/* Collapsible Sidebar */}
      <div className={`flex flex-col items-end transition-all duration-300 ${isExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Contact Buttons */}
        <div className="flex flex-col space-y-3 mr-2 md:mr-4 bg-white rounded-2xl p-2 shadow-lg">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="relative flex items-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Label - slides from right to left */}
              <div
                className={`absolute right-full mr-3 whitespace-nowrap bg-white text-primary-dark px-4 py-2.5 rounded-lg shadow-xl transition-all duration-300 ease-out ${
                  hoveredIndex === index
                    ? 'opacity-100 translate-x-0 visible'
                    : 'opacity-0 translate-x-4 invisible pointer-events-none'
                }`}
                style={{
                  transitionDelay: hoveredIndex === index ? '0ms' : '0ms'
                }}
              >
                <span className="text-sm font-semibold">{contact.label}</span>
                {/* Arrow pointer */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#008a3d]" />
              </div>
              
              {/* Button */}
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`border-2 border-[#00652E] text-white p-2 rounded-2xl hover:scale-110 transition-all duration-200 transform`}
                aria-label={contact.name}
              >
                {contact.icon}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FloatingContactButtons

