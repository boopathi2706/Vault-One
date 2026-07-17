// models/Customer.js

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },

    address: {
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
    },

    proof: {
      proofType: {
        type: String,
        enum: ["Aadhar Card", "PAN Card"],
        required: true,
      },

      cardNumber: {
        type: String,
        required: true,
      },

      proofPhoto: {
        public_id: {
            type:String
        },
        url: {
            type: String,
        }
      },

      customerPhoto: {
        public_id: {
            type:String
        },
        url: {
            type: String,
        }
      },

      customerSignature: {
        public_id: {
            type:String
        },
        url: {
            type: String,
        }
      },
    },
   item: {
  type: String,
  enum: ["Gold", "Silver"],
  required: true,
},
    itemType: {
      type: String,
      enum: [
        "Ring",
        "Chain",
        "Necklace",
        "Bangle",
        "Bracelet",
        "Earrings",
        "Coin",
        "Pendant",
        "Anklet",
        "Other",
      ],
      required: true,
    },

    numberOfItems: {
      type: Number,
      required: true,
      min: 1,
    },

    itemWeight: {
      type: Number,
      required: true,
    },

    purity: {
      type: String,
      enum: ["18K", "22K", "24K","80%", "90%", "92.5%", "99.9%"],
      required: true,
    },

    description: {
      type: String,
    },

    jewelleryPhoto: {
      public_id: {
            type:String
        },
        url: {
            type: String,
        }
    },

    loanAmount: {
      type: Number,
      required: true,
    },

    interestRate: {
      type: Number,
      required: true,
      min: 0.5,
      max: 10,
    },

    loanDate: {
      type: Date,
      default: Date.now,
    },

    currentValue: {
      type: Number,
    },

    loanStatus: {
      type: String,
      enum: ["Active", "Closed", "Overdue"],
      default: "Active",
    },

    interestAmount: {
      type: Number,
      default: 0,
    },

    principalAmount: {
      type: Number,
      default: 0,
    },

    principalPaidDate: {
      type: Date,
      default: null,
    },

    interestPaymentDetails: [
      {
        fromDate: {
          type: Date,
          required: true,
          default:Date.now,
        },

        paidDate: {
          type: Date,
          required: true,
        },

        amountPaid: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);