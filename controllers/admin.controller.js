const productModel=require('../models/products.model')
const validationResult=require('express-validator').validationResult
const orderModel=require('../models/order.modal');

exports.getAdd=(req,res,next)=>{
    res.render('add-product',{
        validationErrors: req.flash('validationErrors'),
        isUser:true,
        isAdmin:true,
        pageTitle:'add-product'
    })
}

exports.postAdd=(req,res,next)=>{
    // console.log(req.file);
    if(validationResult(req).isEmpty()) {
    productModel.addProduct({
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        description:req.body.description,
        image:req.file.filename,
    }).then(()=>{
        res.redirect('/')
    }).catch(err=>next(err))
    } else {
        req.flash('validationErrors',validationResult(req).array());
        res.redirect('/admin/add');
    }
}


exports.getOrders = (req, res, next) => {
    let status = req.query.status;
    let validStatus = ['pending', 'in-progress', 'complete'];
    let promise;
  
    // if the email parameter is present, get all orders for the user with that email
    if (req.query.email) {
      promise = orderModel.getOrdersByUserEmail(req.query.email);
    } else if (status && status !== 'all' && validStatus.includes(status)) {
      promise = orderModel.getOrderByStatus(status);
    } else {
      promise = orderModel.getAllOfOrder();
    }
  
    promise.then(items => {
      res.render('manageOrder', {
        items: items,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationError: req.flash('validationErrors')[0],
        pageTitle: 'manage-order'
      });
    }).catch(err => {
      next(err);
      res.sendStatus(500);
    });
  };

  exports.changeOrderStatus=(req, res, next) => {
    orderModel.changeStatus(req.body.orderId).then(()=>{
      res.redirect('/admin/orders');
  }).catch(err => next(err))

  }
