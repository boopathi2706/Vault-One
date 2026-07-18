const Customer = require("../models/Customer_Models");
const{uploadImage}=require("../middleware/upload");
const {getRateByPurity, getPrice} =require("../utils/getgoldprice");
const calculateInterest=require("../services/calculateInterest");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../data/price.json");
// create customer

const createCustomer = async (req, res) => {
  try {
    const {
      customerName,
      fatherName,
      motherName,
      mobileNumber,
      city,
      street,
      district,
      proofType,
      cardNumber,
      item,
      itemType,
      numberOfItems,
      itemWeight,
      purity,
      description,
      loanAmount,
      interestRate,
      principalAmount,
    } = req.body;

    // Required field validation
    if (
      !customerName ||
      !fatherName ||
      !mobileNumber ||
      !city ||
      !street ||
      !district ||
      !proofType ||
      !cardNumber ||
      !item||
      !itemType ||
      !numberOfItems ||
      !itemWeight ||
      !purity ||
      !loanAmount ||
      !interestRate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Image validation
    if (
      !req.files.proofPhoto ||
      !req.files.customerPhoto ||
      !req.files.customerSignature||
      !req.files.jewelleryPhoto
    ) {
      return res.status(400).json({
        success: false,
        message: "All required images must be uploaded.",
      });
    }

    // Upload images
    console.log("Uploading proof...");
    const proof = await uploadImage(
      req.files.proofPhoto[0],
      "pawn-shop/proof"
    );

    console.log("Uploading customer...");
    const customer = await uploadImage(
      req.files.customerPhoto[0],
      "pawn-shop/customer"
    );
   console.log("Uploading sign...");
    const signature = await uploadImage(
      req.files.customerSignature[0],
      "pawn-shop/signature"
    );

    console.log("Uploading jewellery...");
    const jewellery = await uploadImage(
        req.files.jewelleryPhoto[0],
        "pawn-shop/jewellery"
      );
    const totalCustomers = await Customer.countDocuments();
console.log("Uploading purity value check...");
   const item_price=await getRateByPurity(item,purity);
   


    // Save to MongoDB
    const newCustomer = await Customer.create({
      customerId:`CUST${String(totalCustomers + 1).padStart(5, "0")}`,
      customerName,
      fatherName,
      motherName,
      mobileNumber,

      address: {
        city,
        street,
        district,
      },

      proof: {
        proofType,
        cardNumber,

        proofPhoto: {
            public_id: proof.publicId,
            url: proof.url,
        },

        customerPhoto: {
             public_id: customer.publicId,
                url: customer.url,
        },

        customerSignature: {
             public_id: signature.publicId,
            url: signature.url,
        },
        
      },
      item,
      itemType,
      numberOfItems,
      itemWeight,
      purity,
      description,

      jewelleryPhoto:{
        public_id: jewellery.publicId,
        url: jewellery.url,
      },

      loanAmount,
      interestRate,
      currentValue:item_price,
      principalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//get customer by id

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            data: customer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




const deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    console.log("delete func..");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const proofId = customer.proof.proofPhoto.public_id;
    const customerPhotoId = customer.proof.customerPhoto.public_id;
    const signatureId = customer.proof.customerSignature.public_id;
    const jewelleryId = customer.jewelleryPhoto.public_id;
    console.log(proofId);
    console.log(cloudinary);
console.log(cloudinary.uploader);

    await cloudinary.cloudinary.uploader.destroy(proofId);
    await cloudinary.cloudinary.uploader.destroy(customerPhotoId);
    await cloudinary.cloudinary.uploader.destroy(signatureId);
    await cloudinary.cloudinary.uploader.destroy(jewelleryId);
    console.log(proofId);
    await Customer.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Customer and all images deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 


const getAllCustomer = async (req, res) => {
  try {
     const today = new Date();

    if (today.getDate() === 1) {
      console.log("Calculating monthly interest...");
      await calculateInterest();
    }

    const customers = await Customer.find().sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const paidedInterestAmount = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Store payment history
    customer.interestPaymentDetails.push({
      fromDate: customer.loanDate,
      paidDate: new Date(),
      amountPaid: customer.interestAmount,
    });

    // Reset interest
    customer.interestAmount = 0;

    // Update loan date to current date
    customer.loanDate = new Date();

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Interest paid successfully.",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const principleAmountPaid = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    customer.principalPaidDate = new Date();
    customer.loanStatus = "Closed";

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Principal amount paid successfully. Loan closed.",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getLoanActiveCustomer = async (req, res) => {
  try {
    const customers = await Customer.find({
      loanStatus: "Active",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLoanClosedCustomer = async (req, res) => {
  try {
    const customers = await Customer.find({
      loanStatus: "Closed",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLoanOverdueCustomer = async (req, res) => {
  try {
    const customers = await Customer.find({
      loanStatus: "Overdue",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPaymentHistory = async (req, res) => {
  try {
    const customers = await Customer.find();

    const paymentHistory = [];

    for (const customer of customers) {

      // Interest Payment History
      if (
        customer.interestPaymentDetails &&
        customer.interestPaymentDetails.length > 0
      ) {
        customer.interestPaymentDetails.forEach((payment) => {
          paymentHistory.push({
            paymentType: "Interest",

            customer: {
              id: customer._id,
              customerId: customer.customerId,
              customerName: customer.customerName,
              mobileNumber: customer.mobileNumber,
              item: customer.item,
              itemType: customer.itemType,
              purity: customer.purity,
              itemWeight: customer.itemWeight,
            },

            fromDate: payment.fromDate,
            paidDate: payment.paidDate,
            amountPaid: payment.amountPaid,
          });
        });
      }

      // Principal Payment History (Closed Loan)
      if (
        customer.loanStatus === "Closed" &&
        customer.principalPaidDate
      ) {
        paymentHistory.push({
          paymentType: "Principal",

          customer: {
            id: customer._id,
            customerId: customer.customerId,
            customerName: customer.customerName,
            mobileNumber: customer.mobileNumber,
            item: customer.item,
            itemType: customer.itemType,
            purity: customer.purity,
            itemWeight: customer.itemWeight,
          },

          principalAmount: customer.principalAmount,
          paidDate: customer.principalPaidDate,
        });
      }
    }

    // Latest payment first
    paymentHistory.sort(
      (a, b) => new Date(b.paidDate) - new Date(a.paidDate)
    );

    res.status(200).json({
      success: true,
      count: paymentHistory.length,
      data: paymentHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getPrices = async (req, res) => {
  try {
    await getPrice();
    if (!fs.existsSync(FILE_PATH)) {
      return res.status(404).json({
        success: false,
        message: "Price file not found.",
      });
    }

    const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    console.log(data.gold);
    res.status(200).json({
      success: true,
      data: {
        date: data.date,
        goldRates: data.gold,
        silverRates: data.silver,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  createCustomer,
  getCustomerById,
  deleteCustomerById,
  getAllCustomer ,
  paidedInterestAmount,
  principleAmountPaid,
  getLoanActiveCustomer,
  getLoanClosedCustomer,
  getLoanOverdueCustomer,
  getPaymentHistory,
  getPrices
};

