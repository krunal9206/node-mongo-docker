const express = require("express");
const mongoDBConnection = require("./connection");
const Product = require("./product");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

mongoDBConnection
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const newProduct = await Product.create({ name, price, quantity });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true }
    );
    if (updatedProduct == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    req.json(deletedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
