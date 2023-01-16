import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./Store.css";
import StoreProductSingle from "./StoreProductSingle";

const StoreProducts = () => {
  let params = useParams();
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/store/products/${params.category}`)
      .then((res) => {
        setProducts(res.data.products);
      });
  }, [params.category]);

  const onSearch = (e) => {
    const pName = e.target.value;

    if (pName === "") {
      axios
        .get(`http://localhost:8000/api/store/products/${params.category}`)
        .then((res) => {
          setProducts(res.data.products);
        });
    } else {
      const newProducts = products?.filter((p) =>
        p.name.toLowerCase().startsWith(pName)
      );

      setProducts(newProducts);
    }
  };

  return (
    <div className="store-container min-vh-100">
      <div className="latest-store-details-cover position-relative">
        <img src="https://th.bing.com/th/id/R.aa3dc2136431186b69b832f0cdf0eb8c?rik=2XL15E7zXWQ%2fpg&riu=http%3a%2f%2fweb.tradekorea.com%2fupload_file2%2fmyphoto%2f48%2fC0108348%2fcbe9caa5_966345b2_6e42_4737_a96c_520cd4f0bbb6.jpg&ehk=HQ05K1A5U6H5VxrOVLI9LvwRqQESJDrOK5n2aUZ0nn0%3d&risl=&pid=ImgRaw&r=0" alt="" />
        <div className="store-products-top text-secondary position-absolute top-50 start-50 translate-middle">
          <p>
           
            {params.category.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })}
          </p>
        </div>
      </div>

      <div className="store-search-bar45645461212 col-5 px-5">
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder="Search for a product"
          onChange={onSearch}
        />
      </div>

      <div className="products-list row p-5">
        {products &&
          products.map((prod) => (
            <div className="col mt-4">
              <StoreProductSingle
                key={prod._id}
                img={prod.image}
                title={prod.name}
                price={prod.price}
                id={prod._id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoreProducts;
