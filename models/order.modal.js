const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  orderAddress: {
    type: String,
    // required: true
  },
  status: {
    type: String,
    enum: ['pending','in-progress','complete'],
    default:'pending'
  },
  cartItems: [{
    cartId: {
      type: String,
      // required: true
    },
    name: {
      type: String,
      // required: true
    },
    price: {
      type: Number,
      // required: true
    },
    amount: {
      type: Number,
      // required: true
    },
    image: {
      type: String,
      // required: true
    },
    productId: {
      type: String,
      // required: true
    }
  }],
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId:String,
  email:String
});

const Order = mongoose.model('order', orderSchema);
const UserModel = require('../models/auth.model');

// Create a new order with the given data
// exports.createOrder = async (orderData, itemData,userId) => {
//   // console.log(userId);
//   const order = new Order({
//     ...orderData,
//     cartItems: [itemData],
//     userId: userId
//   });
//   return order.save();
// }
exports.createOrder = async (orderData, itemData, userId) => {
  try {
    const user = await UserModel.getUserByEmail(userId)
    console.log("user...", user);
    const order = new Order({
      ...orderData,
      cartItems: [itemData],
      userId: userId,
      email: user.email
    });
    return order.save();
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create order');
  }
};

exports.getAllOrders = userId => {
  return new Promise((resolve, reject) => {
    Order.find({userId:userId},{}, { sort: { timestamp: 1 } })
      .then(orderItems => {
        resolve(orderItems);
      })
      .catch(err => reject(err));
  });
};

exports.deleteOrder=(id)=>{
  return new Promise((resolve, reject) => {
    Order.findByIdAndDelete(id)
      .then(product => {
        resolve();
      })
      .catch(err => reject(err));
  });
}

exports.deleteAllOrder=(id)=>{
  return new Promise((resolve, reject) => {
    Order.deleteMany({userId:id})
      .then(() => {
        resolve();
      })
      .catch(err => reject(err));
  });
}
exports.getOrderByStatus = status => {
  return new Promise((resolve, reject) => {
    Order.find({ status: status })
      .then(items => {
        resolve(items);
      })
      .catch(err => reject(err));
  });
};

exports.getOrdersByUserEmail = async (email) => {
  try {
    const orders = await Order.find({ 'email': email }).sort({ timestamp: -1 }).lean();
    return orders;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.changeStatus = async (id) => {
  try {
    const order = await Order.findById(id);
    let nextStatus;
    switch (order.status) {
      case 'pending':
        nextStatus = 'in-progress';
        break;
      case 'in-progress':
        nextStatus = 'complete';
        break;
      default:
        nextStatus = 'pending';
        break;
    }
    order.status = nextStatus;
    return order.save();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.getAllOfOrder = () => {
  return new Promise((resolve, reject) => {
    Order.find({},{}, { sort: { timestamp: 1 } })
      .then(orderItems => {
        resolve(orderItems);
      })
      .catch(err => reject(err));
  });
};

    // module.exports = Order;