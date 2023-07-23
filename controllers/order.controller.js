const orderModel=require('../models/order.modal');
const validationResult=require('express-validator').validationResult

exports.displayOrderVerificationPage=(req,res,next)=>{
        const itemData = {
            cartId: req.body.cartId,
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            image: req.body.image,
            productId: req.body.productId,
            userId: req.session.userId
          };
        res.render('verifyOrder', {
            isUser:true,
            isAdmin:req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            itemData ,
            pageTitle:'Checkout',
        })
}

exports.displayVerifyPage = (req, res, next) => {
  orderModel.getAllOrders(req.session.userId)
    .then(itemData => {
      res.render('verifyOrder', {
        isUser: true,
        isAdmin: req.session.isAdmin,
        validationError: req.flash('validationErrors')[0],
        itemData,
        pageTitle: 'Checkout',
      });
    })
    .catch(err => next(err));
};




exports.getOrder = (req, res, next) => {
    orderModel.getAllOrders(req.session.userId).then((items)=>{
        // console.log("items",items);
        res.render('order', {
            items: items,
            isUser:true,
            isAdmin:req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle:'order',

        })
    }).catch(err=>next(err))
};

exports.postOrder = async (req, res, next) => {
    // Extract the order data from the request body
    const orderData = {
      orderAddress: req.body.orderAddress,
      // userId: req.session.userId,
      timestamp: Date.now()
    };
  
    const amount = parseInt(req.body.amount);
      const itemData = {
        cartId: req.body.cartId,
        name: req.body.name,
        price: req.body.price,
        amount: Number(amount),
        image: req.body.image,
        productId: req.body.productId,
        // userId: req.session.userId
      };
    //   console.log("data...",itemData);
      try {
        const order = await orderModel.createOrder(orderData, itemData,req.session.userId);
        res.redirect('/order');
      } catch (error) {
        console.log(error);
        res.render('error', { message: 'Error saving order' });
      }
  };

  exports.orderDelete=(req,res,next)=>{
    orderModel.deleteOrder(req.params.id).then(()=>{
      res.redirect('/order')
    }).catch(err=>next(err))
  }

  exports.orderDeleteAll=(req,res,next)=>{
    orderModel.deleteAllOrder(req.session.userId).then(()=>{
      res.redirect('/order')
    }).catch(err=>next(err))
  }