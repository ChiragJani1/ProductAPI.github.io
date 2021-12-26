const {json} = require('body-parser');
const res = require('express/lib/response');


const Category = require('../model/Category');

//FindCategory Already Exist In Database(Collection)

 exports.isCategoryExist = async (CatId)=>{

    Category.count({categoryId:CatId}).then(CatCount=>{
        console.log("Cat Count", CatCount)
        if(CatCount > 0){
            return  true;
        }
        else{
            return  false;
        }
    })

}

exports.CreateCategory = (CatId, CatName)=>{

    Category.count({categoryId:CatId}).then(CatCount=>{
        console.log("Cat Count", CatCount)
        if(CatCount > 0){

            r

        }
        else{
            const category = new Category({
                categoryId: CatId,
                CategoryName: CatName
            })
        
            category.save().then(result=>{
                console.log(result)
            }).catch(err=>{
                console.log(err)
            })  


            
        }
    })
 
}


exports.FindCategoryById = (CatId)=>{
    
    if ( this.isCategoryExist(CatId)){
        Category.findOne({categoryId:CatId}).then(CatDetail=>{
            return CatDetail;
        }).catch(err=>{
            console.log(err)
        })
    }
    else{
        errorMessage = {
            message:"Category Id Not Exist!"
        }

        return errorMessage;
    }
}



