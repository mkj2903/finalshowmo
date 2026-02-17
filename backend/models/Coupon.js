const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
    default: 'percentage'
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderAmount: {
    type: Number,
    required: true,
    default: 0
  },
  maxDiscount: {
    type: Number,
    default: null
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalQuantity: {
    type: Number,
    required: true,
    min: 1
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  perUserLimit: {
    type: Number,
    default: 1,
    min: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableCategories: [{
    type: String,
    enum: ['T-Shirts', 'Mugs', 'Accessories', 'All']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true   // ✅ automatically manages createdAt & updatedAt
});

// ❌ REMOVED – conflicting pre('save') middleware (timestamps already handles it)

// Static method to validate coupon
couponSchema.statics.validateCoupon = async function(code, userId, orderAmount) {
  const coupon = await this.findOne({ 
    code: code.toUpperCase(),
    isActive: true 
  });

  if (!coupon) {
    return { 
      valid: false, 
      message: 'Invalid coupon code' 
    };
  }

  // Check dates
  const now = new Date();
  if (now < coupon.startDate) {
    return { 
      valid: false, 
      message: 'Coupon is not yet active' 
    };
  }

  if (now > coupon.endDate) {
    return { 
      valid: false, 
      message: 'Coupon has expired' 
    };
  }

  // Check quantity
  if (coupon.usedCount >= coupon.totalQuantity) {
    return { 
      valid: false, 
      message: 'Coupon usage limit reached' 
    };
  }

  // Check minimum order amount
  if (orderAmount < coupon.minOrderAmount) {
    return { 
      valid: false, 
      message: `Minimum order amount ₹${coupon.minOrderAmount} required` 
    };
  }

  // Calculate discount
  let discount = 0;
  
  if (coupon.discountType === 'percentage') {
    discount = (orderAmount * coupon.discountValue) / 100;
    
    // Apply max discount limit
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  // Ensure discount doesn't exceed order amount
  if (discount > orderAmount) {
    discount = orderAmount;
  }

  return {
    valid: true,
    coupon: {
      _id: coupon._id,
      code: coupon.code,
      name: coupon.name,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount: Math.round(discount),
      minOrderAmount: coupon.minOrderAmount,
      maxDiscount: coupon.maxDiscount
    }
  };
};

// Method to increment used count
couponSchema.methods.incrementUsage = async function() {
  this.usedCount += 1;
  await this.save();
};

module.exports = mongoose.model('Coupon', couponSchema);