const {json} = require('body-parser');
const { ObjectId } = require("mongodb");

// Import Product and Category Model
const Product = require('../model/Product');
const Category = require("../model/Category");


/* -----------------  Create Product and Add Category If Category Not Already Exist -------------------*/
exports.CreatProduct = (req,res,next)=>{

    const CategoryId = req.body.categoryId;
    const product = new Product(req.body)
    product.save().then(result=>{

    console.log(CategoryId)
    if (CategoryId !== undefined)
    {
        //Add Category Field If not Exist
        Category.count({categoryId:CategoryId}).then(count=>{

        if(count == 0)
        {
            let CategoryName = req.body.CategoryName
            const category = new Category({
                categoryId: CategoryId,
                CategoryName: CategoryName
            })

            category.save().then(categoryResult=>{
                res.status(200).json({Products:result,CategoryData:categoryResult})
            }).catch(err=>{
                res.status(500).json(err)
            })
        }
        else{
            res.status(200).json(result)
        }

    })
    }

    else{

        res.status(200).json(result)
    }

    }).catch(err=>{
        res.status(500).json(err)
    })
}


/*----------------- Retrieve All the Product With Category If Category Mapped With Product ------- */
exports.ReadAllProuct =(req,res,next)=>{

   Product.aggregate([
       {
       $lookup:{
       from: "categories",
       localField: "categoryId",
       foreignField: "categoryId",
       as: "Category_Of_Product"
        } 
     }
    ]).then(result=>{

       res.status(200).json(result);

   }).catch(err=>{

       res.status(500).json(err);

   })
   
}


/* --------------------------------- Get Product Details By Products Id With Category Details For that Product -------------------------------------------- */
exports.GetSpecificProduct = (req,res,next)=>{
    productId = ObjectId(req.body.ProductId)

    Product.aggregate([{
        $match:{
            ProductId:productId
        },

    }]).then(result=>{
          
        arrayLength = result.length
        if (arrayLength != 0 &&result[0].categoryId === undefined ){

            res.status(200).json(result);

        }
        else if(arrayLength !==0)
        {
            Category.findOne({categoryId:result[0].categoryId}).then(cat=>{

                result.push(cat)
                res.status(200).json(result);

            }).catch(err=>{

                res.status(404).json(err);
            })
        }
        else{
            res.status(404).json({
                message:"Product Not Found"
            })
        }
    })
}


/* --------------------------- Update Products Details ------------------------------------------ */
exports.updateProduct = (req,res,next)=>{

    productId = ObjectId(req.body.ProductId);
    NewValue = req.body.NewValue;
    FieldName = req.body.FieldName

    switch(FieldName){

        case "ProductName":
            UpdateFilter = {ProductName:NewValue}
            break;
        case "qtyPerUnit":
            UpdateFilter = {qtyPerUnit: NewValue}
            break;
        case "unitPrice":
            UpdateFilter = {unitPrice: NewValue}
            break;
        case "unitInStock":
            UpdateFilter = {unitInStock:NewValue}
            break;
        case "discontinued":
            UpdateFilter = {discontinued:NewValue}
            break;
        case "categoryId":
            UpdateFilter = {categoryId:NewValue}
            break;
        
    }

    Product.updateOne({ProductId:productId}, UpdateFilter).then(result=>{

        res.status(200).json(result);

    }).catch(err=>{

        res.status(500).json(err);

    })

};


/*-------------------------------------- Delete Specific Product ---------------------------------- */
exports.deleteProduct = (req,res,next)=>{

    productId = ObjectId(req.body.ProductId);

    Product.findOneAndDelete({ProductId:productId}).then(result=>{

        res.status(200).json(result);

    }).catch(err=>{

        res.status(500).json(err);
    })

}



// exports.CreateProduct =  (req,res,next)=>{

//     const CategoryId = req.body.categoryId;

//     if (CategoryId !== undefined)
//     {
//         const CatName = req.body.CategoryName

//         ContCategory.CreateCategory(CategoryId, CatName)


//     }

//     const product = new Product(req.body)
//     product.save().then(result=>{
        
//         //console.log(result)
//         res.json(result)
//     }).catch(err=>{
//         console.log(err)
//     })

// }

// exports.isProductExist = (Id)=>{

//     Product.count({ProductId:Id}).then(ProductCount=>{
//         if(count >0){
//             return true;
//         }
//         else{
//             return false;
//         }
//     })
// }

// exports.readAllProduct = (req,res,next)=>{

//     //Get All the Data

//    Product.aggregate([{$lookup:{
//        from: "categories",
//        localField: "categoryId",
//        foreignField: "categoryId",
//        as: "Category_Of_Product"
//    } 
//    }
// ]).then(result=>{
//        res.status(200).send(result)
//    }).catch(err=>{
//        console.log(err)
//    })
   
// }


// exports.GetProductById = (ProdId)=>{
    
//     if ( this.isProductExist(ProdId) ){
//         Product.findOne({ProductId:ProdId}).then(ProductDetail=>{
//             return ProductDetail;
//         }).catch(err=>{
//             errorMessage =
//              {
//                 message: "Getting Some Issue in Finding Product",
//                 error:err
//             }

//             return errorMessage;
//         })
//     }
//     else
//     {
//         errorMessage = 
//         {
//             messagae: "Product is Present In DataBase"
//         }
//         return errorMessage
//     }
// }

// exports.readSpecifiProduct = (req,res,next)=>{
//     productId = ObjectId(req.body.ProductId)

//     Product.aggregate([{
//         $match:{
//             ProductId:productId
//         },

//     }]).then(result=>{
          
//         arrayLength = result.length
//         if (arrayLength != 0 &&result[0].categoryId === undefined ){
//             res.status(200).json(result)
//         }
//         else if(arrayLength !==0)
//         {
//             ContCategory.FindCategoryById(result[0].categoryId)
//         }
//         else{
//             res.status(404).json({
//                 message:"Product Not Found"
//             })
//         }
//     })
// }

// exports.DeleteProduct = (req,res,next)=>{

//     productId = req.body.ProductId;
//     Product.findOneAndDelete({ProductId:productId}).then(result=>{
//         console.log(result)
//     }).catch(err=>{
//         console.log(err);
//     })

// }

// exports.UpdateProduct = (req,res,next)=>{
//     productId = ObjectId(req.body.ProductId);
//     NewProductFieldValue = req.body.NewProductFieldValue;
//     FieldName = req.body.FieldName

//     Product.updateOne({ProductId:productId}, {FieldName:NewProductFieldValue}).then(result=>{
//         res.status(200).json(result)
//     })

// }