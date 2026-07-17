# Gold & Silver Pawn Shop Management System (Backend)

A Node.js + Express + MongoDB backend for managing Gold and Silver Pawn Shop operations. The system helps pawn shops digitally manage customer records, pledged items, loan details, interest calculations, gold/silver prices, and dashboard analytics.

---

## Features

### Customer Management
- Create Customer
- Get All Customers
- Get Customer by ID
- Update Customer
- Delete Customer
- Upload customer images to Cloudinary

### Loan Management
- Active Loans
- Closed Loans
- Overdue Loans
- Principal Payment
- Interest Payment
- Automatic Interest Calculation

### Gold & Silver Support
- Gold Purity
  - 18K
  - 22K
  - 24K

- Silver Purity
  - 80%
  - 90%
  - 92.5%
  - 99.9%

### Gold & Silver Price
- Fetch Daily Gold Price
- Fetch Daily Silver Price
- Store prices in local JSON file
- Calculate Item Value
- Daily Cache System

### Dashboard
- Total Customers
- Total Gold Weight
- Total Silver Weight
- Active Customers
- Closed Customers
- Overdue Customers
- Total Loan Amount
- Outstanding Amount
- Total Interest Received
- Total Profit

### Analytics
- Month Wise Profit
- Day Wise Profit

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary
- Multer
- JWT
- Axios
- Dotenv
- CORS

---

# Folder Structure

```
backend
│
├── config
│   ├── cloudinary.js
│   └── db.js
│
├── controllers
│
├── middleware
│   └── upload.js
│
├── models
│
├── routes
│
├── utils
│   ├── calculateInterest.js
│   └── getGoldPrice.js
│
├── data
│   └── goldPrice.json
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move to backend

```bash
cd backend
```

Install packages

```bash
npm install
```

Run Server

```bash
npm start
```

or

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FREE_GOLD_API_KEY=
```

---

# Image Upload

Images are uploaded using

- Multer
- Cloudinary

Images Stored

- Proof Photo
- Customer Photo
- Customer Signature
- Jewellery Photo

---

# Customer Fields

## Personal Information

- Customer ID
- Customer Name
- Father Name
- Mother Name
- Mobile Number

## Address

- City
- Street
- District

## Proof Details

- Proof Type
- Card Number
- Proof Photo
- Customer Photo
- Customer Signature

## Jewellery Details

- Item
- Item Type
- Number of Items
- Item Weight
- Purity
- Description
- Jewellery Photo

## Loan Details

- Loan Amount
- Principal Amount
- Interest Rate
- Interest Amount
- Loan Date
- Current Gold Value
- Loan Status

---

# Interest Calculation

Monthly Interest

```
Interest = Months × (Principal Amount × Interest Rate / 100)
```

After 6 Months

- Principal += Interest
- Interest = 0
- Loan Date = Current Date
- Loan Status = Overdue

---

# Interest Payment

Stores

- From Date
- Paid Date
- Amount Paid

Resets

- Interest Amount = 0
- Loan Date = Current Date

---

# Principal Payment

Updates

- Principal Paid Date
- Loan Status = Closed

---

# Gold Price

The application fetches Gold and Silver prices from the API once per day.

Prices are stored in

```
data/goldPrice.json
```

The application reads prices from the JSON file for all calculations.

---

# Dashboard APIs

Returns

### Gold

- Total Customers
- Total Weight
- Active Customers
- Closed Customers
- Overdue Customers
- Active Loan Amount
- Outstanding Amount
- Total Interest Received
- Total Profit

### Silver

Same as Gold

### Overall

Combined Gold + Silver Statistics

---

# Profit Analytics

## Month Wise Profit

Returns

```json
[
  {
    "month": "2026-07",
    "gold": 25000,
    "silver": 8000,
    "total": 33000
  }
]
```

## Day Wise Profit

Returns

```json
[
  {
    "date": "2026-07-15",
    "gold": 1500,
    "silver": 600,
    "total": 2100
  }
]
```

---

# API Modules

Customer

- Create Customer
- Get Customers
- Update Customer
- Delete Customer

Loan

- Active Loans
- Closed Loans
- Overdue Loans

Payment

- Pay Interest
- Pay Principal

Dashboard

- Admin Dashboard
- Month Wise Profit
- Day Wise Profit

Price

- Get Gold Price
- Calculate Price

---

# Author

Developed by **Boopathi**

Gold & Silver Pawn Shop Management System Backend
