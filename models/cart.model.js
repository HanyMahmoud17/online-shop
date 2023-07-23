const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
});

const CartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    CartItem.findOne({ productId: data.productId }).then((existingItem) => {
      if (existingItem) {
        existingItem.amount = Number(data.amount) + existingItem.amount;
        existingItem.save().then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      } else {
        let item = new CartItem(data);
        item.save().then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.getItemsByUser = userId => {
  return new Promise((resolve, reject) => {
    // i get all items in array but i need to sort them by projection - {} = to get all items and - {sort:{timestamp: 1}} to sort from last to new
    CartItem.find({userId: userId}, {} ,{sort:{timestamp: 1}})
      .then(cartItems => {
        resolve(cartItems);
      })
      .catch(err => reject(err));
  });
};

exports.editItem = (id,newData) => {
  return new Promise((resolve, reject) => {
    CartItem.updateOne({_id: id}, newData)
      .then(product => {
        resolve(product);
      })
      .catch(err => reject(err));
  });
};

exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    CartItem.findByIdAndDelete(id)
      .then(product => {
        resolve();
      })
      .catch(err => reject(err));
  });
};

exports.deleteAllItems = (userId) => {
  return new Promise((resolve, reject) => {
    CartItem.deleteMany({ userId: userId })
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });
};