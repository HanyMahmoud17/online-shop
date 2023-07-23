const cartModel=require('../models/cart.model');
const validationResult=require('express-validator').validationResult


exports.getCart=(req,res,next)=>{
    cartModel.getItemsByUser(req.session.userId).then((items)=>{
        // console.log("product",product);
        res.render('cart', {
            items: items,
            isUser:true,
            isAdmin:req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle:'cart',

        })
    }).catch(err=>next(err))

}

exports.postCart=(req,res,next)=>{
    if(validationResult(req).isEmpty() ){
        cartModel.addNewItem({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            productId: req.body.productId,
            amount: req.body.amount,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then(()=>{
            res.redirect('/cart')
        }).catch(err => next(err));
    } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}


exports.postSave=(req,res,next)=>{
    if(validationResult(req).isEmpty() ){
        cartModel.editItem(req.body.cartId,{
            amount: req.body.amount,
            timestamp: Date.now()
        }).then(()=>{
            res.redirect('/cart')
        }).catch(err => next(err))
    } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect("/cart")
    }
}

exports.postDelete=(req,res,next)=>{
        cartModel.deleteItem(req.body.cartId).then(()=>{
            res.redirect('/cart')
        }).catch(err => next(err))
}

exports.postDeleteAll=(req,res,next)=>{
    // console.log(req.body.items);
    cartModel.deleteAllItems(req.session.userId).then(()=>{
        res.redirect('/cart')
    }).catch(err => next(err))
}