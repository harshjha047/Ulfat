
import ProductCard from "../Components/Products/ProductCard";
import { useProduct } from "../Context/ProductContext";

function Product() {
 const {productData, setProductData,filteredData}=useProduct()
 
  return (
    <div className="flex w-full flex-col">
      <div className="h-[12vh] w-full border-black"></div>
      <section className="w-[97%] mx-auto mt-[2vh] grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-black">
    {filteredData?.map((e,i)=>{
      return ( 
        <ProductCard data={e} key={i} />
      )
    })}
      </section>
    </div>
  );
}

export default Product;
