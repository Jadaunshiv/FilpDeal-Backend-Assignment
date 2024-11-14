const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

//Server-side values
let tax = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//Endpoint 1

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = newItemPrice + cartTotal;
  res.send(totalCartValue.toString());
});

//Endpoint 2

function membershipDiscount(cartTotal, isMember) {
  if (isMember === 'true') {
    let discountedPrice = cartTotal - (cartTotal * discountPercentage) / 100;
    return discountedPrice.toString();
  } else {
    return cartTotal.toString();
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(membershipDiscount(cartTotal, isMember));
});

//Endpoint 3

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalTax = (cartTotal * tax) / 100;
  res.send(totalTax.toString());
});

//Endpoint 4

function estimateDelivery(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    let daysTaken = distance / 100;
    return daysTaken.toString();
  } else {
    let daysTaken = distance / 50;
    return daysTaken.toString();
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDelivery(shippingMethod, distance));
});

//Endpoint 5

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

//Endpoint 6

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoint = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoint.toString());
});
