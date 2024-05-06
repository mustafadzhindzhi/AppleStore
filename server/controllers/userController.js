const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware.js");
const userService = require("../services/userService");

// A utility function to handle errors consistently
const handleErrorResponse = (error, res) => {
  console.error("API error:", error);
  const statusCode = error.statusCode || 400;
  res.status(statusCode).json({ message: error.message || 'An error occurred' });
};

// Register user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, tel, image } = req.body;
    const result = await userService.register({ username, email, password, tel, image });
    res.json({ success: true, data: result });
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

router.get("/check-email", async (req, res) => {
  try {
    const { email } = req.query;
    const exists = await userService.checkEmailExists(email);
    res.json({ exists });  
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login({ email, password });
    res.json({ success: true, data: result });
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Logout user
router.get("/logout", auth, async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]; 
    await userService.logout(token);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

module.exports = router;