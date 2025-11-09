import Contact from '../models/Contact.js';

// @desc    Lấy tất cả contact
// @route   GET /api/contacts
// @access  Public
export const getAllContacts = async (req, res) => {
  try {
    const { isActive, type } = req.query;

    const query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (type) {
      query.type = type;
    }

    const contacts = await Contact.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    // Transform contacts to include id field
    const transformedContacts = contacts.map((contact) => {
      const contactObj = contact.toObject();
      return {
        ...contactObj,
        id: contactObj._id.toString(),
      };
    });

    res.status(200).json({
      success: true,
      count: transformedContacts.length,
      data: transformedContacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách liên hệ',
      error: error.message,
    });
  }
};

// @desc    Lấy contact theo ID
// @route   GET /api/contacts/:id
// @access  Public
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy liên hệ',
      });
    }

    // Transform contact to include id field
    const contactObj = contact.toObject();
    const transformedContact = {
      ...contactObj,
      id: contactObj._id.toString(),
    };

    res.status(200).json({
      success: true,
      data: transformedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin liên hệ',
      error: error.message,
    });
  }
};

// @desc    Lấy contacts active
// @route   GET /api/contacts/active
// @access  Public
export const getActiveContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    // Transform contacts to include id field
    const transformedContacts = contacts.map((contact) => {
      const contactObj = contact.toObject();
      return {
        ...contactObj,
        id: contactObj._id.toString(),
      };
    });

    res.status(200).json({
      success: true,
      count: transformedContacts.length,
      data: transformedContacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách liên hệ',
      error: error.message,
    });
  }
};

// @desc    Tạo contact mới
// @route   POST /api/contacts
// @access  Private
export const createContact = async (req, res) => {
  try {
    const {
      name,
      type,
      label,
      value,
      href,
      icon,
      iconType,
      color,
      order,
      isActive,
    } = req.body;

    // Validate required fields
    if (!name || !type || !label || !value || !href) {
      return res.status(400).json({
        success: false,
        message: 'Tên, loại, nhãn, giá trị và link liên hệ là bắt buộc',
      });
    }

    // Validate type value
    const validTypes = ['phone', 'messenger', 'zalo', 'email', 'whatsapp', 'telegram', 'viber', 'skype', 'other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Loại liên hệ không hợp lệ',
      });
    }

    const contactData = {
      name: name.trim(),
      type,
      label: label.trim(),
      value: value.trim(),
      href: href.trim(),
    };

    if (icon && icon.trim()) {
      contactData.icon = icon.trim();
    }

    if (iconType) {
      contactData.iconType = iconType;
    }

    if (color && color.trim()) {
      contactData.color = color.trim();
    }

    if (order !== undefined) {
      contactData.order = parseInt(order) || 0;
    }

    if (isActive !== undefined) {
      contactData.isActive = isActive;
    }

    const contact = await Contact.create(contactData);

    // Transform contact to include id field
    const contactObj = contact.toObject();
    const transformedContact = {
      ...contactObj,
      id: contactObj._id.toString(),
    };

    res.status(201).json({
      success: true,
      message: 'Tạo liên hệ thành công',
      data: transformedContact,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo liên hệ',
      error: error.message,
    });
  }
};

// @desc    Cập nhật contact
// @route   PUT /api/contacts/:id
// @access  Private
export const updateContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy liên hệ',
      });
    }

    const {
      name,
      type,
      label,
      value,
      href,
      icon,
      iconType,
      color,
      order,
      isActive,
    } = req.body;

    // Update fields
    if (name !== undefined && name !== null) {
      contact.name = name.trim();
    }

    if (type !== undefined && type !== null) {
      // Validate type value
      const validTypes = ['phone', 'messenger', 'zalo', 'email', 'whatsapp', 'telegram', 'viber', 'skype', 'other'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message: 'Loại liên hệ không hợp lệ',
        });
      }
      contact.type = type;
    }

    if (label !== undefined && label !== null) {
      contact.label = label.trim();
    }

    if (value !== undefined && value !== null) {
      contact.value = value.trim();
    }

    if (href !== undefined && href !== null) {
      contact.href = href.trim();
    }

    if (icon !== undefined) {
      contact.icon = icon && icon.trim() ? icon.trim() : '';
    }

    if (iconType !== undefined) {
      contact.iconType = iconType;
    }

    if (color !== undefined) {
      contact.color = color && color.trim() ? color.trim() : 'bg-blue-500';
    }

    if (order !== undefined) {
      contact.order = parseInt(order) || 0;
    }

    if (isActive !== undefined) {
      contact.isActive = isActive;
    }

    await contact.save();

    // Transform contact to include id field
    const contactObj = contact.toObject();
    const transformedContact = {
      ...contactObj,
      id: contactObj._id.toString(),
    };

    res.status(200).json({
      success: true,
      message: 'Cập nhật liên hệ thành công',
      data: transformedContact,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật liên hệ',
      error: error.message,
    });
  }
};

// @desc    Xóa contact
// @route   DELETE /api/contacts/:id
// @access  Private
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy liên hệ',
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Xóa liên hệ thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa liên hệ',
      error: error.message,
    });
  }
};

