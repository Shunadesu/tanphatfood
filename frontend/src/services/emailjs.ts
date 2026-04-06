import emailjs from '@emailjs/browser'

const EMAILJS_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  templateReplyId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_REPLY_ID || '',
}

interface EmailData {
  name: string
  email: string
  phone?: string
  productName?: string
  productType?: string
  market?: string
}

export const sendEmailToAdmin = async (data: EmailData): Promise<boolean> => {
  try {
    if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
      console.warn('EmailJS chưa được cấu hình đầy đủ')
      return false
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || 'Không cung cấp',
      product_name: data.productName || 'Không cung cấp',
      product_type: data.productType || 'Không cung cấp',
      market: data.market || 'Không cung cấp',
      message: `Yêu cầu báo giá từ website\n\nTên: ${data.name}\nEmail: ${data.email}\nSố điện thoại: ${data.phone || 'Không cung cấp'}\nSản phẩm: ${data.productName || 'Không cung cấp'}\nLoại sản phẩm: ${data.productType || 'Không cung cấp'}\nThị trường: ${data.market || 'Không cung cấp'}`,
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('Email gửi đến admin thành công:', response.status)
    return true
  } catch (error) {
    console.error('Lỗi khi gửi email đến admin:', error)
    return false
  }
}

export const sendAutoReplyToCustomer = async (data: EmailData): Promise<boolean> => {
  try {
    if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateReplyId) {
      return false
    }

    // Không gửi nếu dùng chung template với admin: lần 2 chỉ có to_name/to_email/product_type
    // → template báo giá sẽ trống {{from_name}}, {{from_email}}, ...
    if (EMAILJS_CONFIG.templateReplyId === EMAILJS_CONFIG.templateId) {
      return false
    }

    const templateParams = {
      to_name: data.name,
      to_email: data.email,
      product_type: data.productType || 'nông sản',
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateReplyId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('Email phản hồi tự động gửi thành công:', response.status)
    return true
  } catch (error) {
    console.error('Lỗi khi gửi email phản hồi:', error)
    return false
  }
}

export const isEmailJSConfigured = (): boolean => {
  return !!(
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId
  )
}

/** Có template phản hồi khách hàng riêng (không trùng template báo giá cho admin). */
export const isAutoReplyConfigured = (): boolean => {
  const reply = EMAILJS_CONFIG.templateReplyId?.trim()
  return !!(
    reply &&
    reply !== EMAILJS_CONFIG.templateId
  )
}