import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsAPI";

function Products() {
  const queryClent = useQueryClient();
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const deleteProductMotation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClent.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClent.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error : {error.message}</div>;

  return (
    <>
      <br />
      <table border='1px'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Price</td>
            <td>InStock</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th>{product.name}</th>
              <th>{product.description}</th>
              <th>{product.price}</th>             
              <th>
                {" "}
                <input
                  type="checkbox"
                  checked={product.inStock}
                  onChange={(e) => {
                    updateProductMutation.mutate({
                      ...product,
                      inStock: e.target.checked,
                    });
                  }}
                />
              </th>
              <th>
                {" "}
                <button
                  onClick={() => {
                    deleteProductMotation.mutate(product.id);
                  }}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
