import { Product } from "../../models/product/product.model";

const getProduct = async (req, res) => {
   
    const products = await Product.find();

    if(products){
      return res.status(201).json({
        message:"product fetch successfully",
        products:products
      })
    }
    return res.status(500).json({message:"there is an error to fetch products"});
    
  
  }
const setProduct = async (req, res) => {
   const {image,title,price,tags} = req.body;
    const product = await Product.create({
      image:image,
      title:title,
      price:price,
      tags:tags,
    })

    if(product){
      return res.status(201).json({message:"product is created successfully"});
    }
    return res.status(500).json({message:"There is an error while set a new product"});
    
    
  
  }
  export { getProduct,setProduct };
