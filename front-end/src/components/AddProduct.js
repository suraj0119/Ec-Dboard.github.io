import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [catagory, setCatagory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error,setError]= React.useState(false)
    const addproduct = async () => {

      console.warn(!name);
      if(!name || !price || !catagory || !company)
      {
        setError(true);
        return false;
      }
      

        console.warn( name, price, catagory, company );
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.warn(userId);
        let result = await fetch("http://localhost:5000/add-Product",{
        method:'post',
        body: JSON.stringify({ name, price, catagory, company, userId }),
        headers:{
          "Content-Type" : "application/json"
        }
        

      });
      result = await result.json();
      console.warn(result);

    }
  return (
    <div className='product'>
        <h1>AddProduct</h1>
        <input type="text" placeholder='Enter Product Name' className="inputBox"
         onChange={(e) => setName(e.target.value)} value={name} />
        {error && !name && <span className='invalid-input'>Enter valid Name</span>}

        <input type="text" placeholder='Enter Product Price' className="inputBox"
        onChange={(e) => setPrice(e.target.value)} value={price} /> 
        {error && !price && <span className='invalid-input'>Enter valid Price</span>}

        
        <input type="text" placeholder='Enter Product Catagory' className="inputBox"
        onChange={(e) => setCatagory(e.target.value)} value={catagory} /> 
        {error && !catagory && <span className='invalid-input'>Enter valid Catagory</span>}
        
        
        <input type="text" placeholder='Enter Product Company' className="inputBox"
        onChange={(e) => setCompany(e.target.value)} value={company} /> 
        {error && !company && <span className='invalid-input'>Enter valid Company</span>}

        <button onClick={addproduct} className="appButton">Add Product</button>

    </div>

  )
}

export default AddProduct