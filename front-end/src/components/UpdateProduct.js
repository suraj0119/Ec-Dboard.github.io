import React,{ useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [catagory, setCatagory] = React.useState('');
    const [company, setCompany] = React.useState('');
    
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        
        getProductDetails();
    
    },[]) 
    
    const getProductDetails = async () =>{

        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await  result.json()
        setName(result.name)
        setPrice(result.price)
        setCatagory(result.catagory)
        setCompany(result.company)
    }

    const updateProduct = async () => {
        console.warn(name, price, catagory, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({name, price, catagory, company}),
            headers:{
                'Content-Type':"application/json"
            }
        });
    
        result = await result.json()
        console.warn(result)
        navigate('/')
    }

    
  return (
    <div className='product'>
        <h1>Update Product</h1>
        <input type="text" placeholder='Update Product Name' className="inputBox"
         onChange={(e) => setName(e.target.value)} value={name} />

        <input type="text" placeholder='Update Product Price' className="inputBox"
        onChange={(e) => setPrice(e.target.value)} value={price} /> 

        
        <input type="text" placeholder='Update Product Catagory' className="inputBox"
        onChange={(e) => setCatagory(e.target.value)} value={catagory} /> 
        
        
        <input type="text" placeholder='Update Product Company' className="inputBox"
        onChange={(e) => setCompany(e.target.value)} value={company} /> 


        <button onClick={updateProduct} className="appButton">Update Product</button>

    </div>

  )
}

export default UpdateProduct