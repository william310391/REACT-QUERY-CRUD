import { useMutation,useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";

function ProductsForm() {

const queryClent = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: ()=>{
      console.log("Product added successfully")
      queryClent.invalidateQueries('products');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" id="name" name="name" />
      <br />
      <label htmlFor="description">Description: </label>
      <input type="text" id="description" name="description" />
      <br />
      <label htmlFor="price">Price: </label>
      <input type="number" id="price" name="price" />
      <br />
      <br />
      <button>Add Pruct</button>
    </form>
  );
}

export default ProductsForm;
