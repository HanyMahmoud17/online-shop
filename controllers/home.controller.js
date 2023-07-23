// first i make import for model
const productModel=require('../models/products.model')


exports.getHome = (req, res, next) => {
    let category = req.query.category;
    // console.log("category..",category);
    let validCategory=['clothes', 'phones','laptops']
    let promise;
    if (category && category != 'all' && validCategory.includes(category)) {
      promise = productModel.getProductByCategory(category);
    } else {
      promise = productModel.getAllProducts();
    }
  
    promise.then(products => {
      res.render('index', {
        products: products,
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        validationError: req.flash('validationErrors')[0],
        pageTitle:'Home'
      });
    }).catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
  };
