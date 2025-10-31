import api from "./api";

const productService = {
  getAllProducts: async () => {
    const { data: res } = await api.get("/products");
    return res;
  },
  addReview: async (e) => {
    console.log(e);
    
    const { data } = await api.post(`/products/${e.id.id}/reviews`, e.inputBox);
    return data;
  },
  removeReview: async (e) => {
    const {_id,ProductId}=e
    
    const { data } = await api.delete(`/products/${ProductId}/reviews/${_id}`);
    return data;
  },
};

export default productService;
