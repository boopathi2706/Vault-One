const express = require("express");
const router = express.Router();

const {createCustomer,getCustomerById, deleteCustomerById,getAllCustomer,paidedInterestAmount,principleAmountPaid,getLoanActiveCustomer,getLoanClosedCustomer,getLoanOverdueCustomer} = require("../controllers/customer_controller");
const upload = require("../middleware/multer"); 
const verifyToken = require("../middleware/auth");

router.post(
  "/create_customer",verifyToken,
  upload.fields([
    { name: "proofPhoto", maxCount: 1 },
    { name: "customerPhoto", maxCount: 1 },
    { name: "customerSignature", maxCount: 1 },
    { name: "jewelleryPhoto", maxCount: 1 },
  ]),
  createCustomer
);
router.get("/customers/:id",verifyToken, getCustomerById);
router.delete("/customers_delete/:id",verifyToken,deleteCustomerById);
router.get("/get_all_customers",verifyToken, getAllCustomer);
router.put("/pay_interest/:id",verifyToken, paidedInterestAmount);
router.put("/pay_principal/:id",verifyToken ,principleAmountPaid);
router.get("/loan/active",verifyToken, getLoanActiveCustomer);
router.get("/loan/closed",verifyToken, getLoanClosedCustomer);
router.get("/loan/overdue",verifyToken, getLoanOverdueCustomer);

module.exports = router;