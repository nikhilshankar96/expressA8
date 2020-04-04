const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const userController = require("../db/userController");

// a simple test url to check that all of our files are communicating correctly.
router.post("/create", userController.user_create);

router.get("/list", userController.user_list);
router.get("/:email", userController.user_details);
router.get("/:email/products", userController.product_details);
router.post("/:email/products", userController.product_add);
router.put("/:email/product/:productId", userController.updateProduct);
router.delete("/:email/product/:productId", userController.deleteProduct);
router.delete("/delete/:email", userController.deleteUser);

module.exports = router;
