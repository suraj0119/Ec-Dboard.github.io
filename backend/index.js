const express = require('express');
const cors = require('cors');
require("./db/config");
const User = require('./db/User');
const Product = require('./db/Product');

const jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

const { populate } = require('./db/User');

const app = express();

app.use(express.json());
app.use(cors());

//registration Rout
app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: 'Something went to wrong, please try after some time' })
        }
        res.send({ result, auth: token })

    })
})

//Login Rout
app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: 'Something went to wrong, please try after some time' })
                }
                res.send({ user, auth: token })

            })

        }
        else {
            res.send({ result: 'No user found' })
        }
    }
    else {
        res.send({ result: 'No user found' })
    }
});

//Product Rout

app.post("/add-Product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

//Product list Route

app.get("/products", async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ result: "No Products Found" })
    }
});

//Delete product route
app.delete("/product/:id", async (req, res) => {

    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
});

//Update product route

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "No Record Found" })
    }
})

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
});

app.get("/search/:key",verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { catagory: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    res.send(result)
});

//Middleware

function verifyToken(req, res, next){
    // const token = req.headers['authorization'];
    console.warn("Middleware called")
    next();
}

app.listen(5000);
