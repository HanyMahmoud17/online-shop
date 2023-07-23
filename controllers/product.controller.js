const productModel=require('../models/products.model')

exports.getProduct=(req,res,next)=>{
    productModel.getFirstProduct().then((product)=>{
        // console.log("product",product);
        res.render('productDetails', {
            product: product,
            isUser:req.session.isUser,
            isAdmin:req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle:'Product',
        })
    })

}

exports.getProductById=(req,res,next)=>{
    let id=req.params.id;
    // console.log("id..",id);
    productModel.getProductById(id).then((product)=>{
        // console.log("product",product);
        res.render('productDetails', {
            product: product,
            isUser:true,
            isAdmin:req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle:'Product Details',
        })
    })

}