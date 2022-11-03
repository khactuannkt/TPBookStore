import React, { useState, useEffect } from "react";
import Toast from "../../base/LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProductAdmin, updateProductAdmin } from "./../../../Redux/Actions/productActions";
import { PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_RESET } from "../../../Redux/Constants/productConstants";
import { toast } from "react-toastify";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import { listCategoryAdmin } from "../../../Redux/Actions/categoryActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [priceSale, setPriceSale] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [supplier, setSupplier] = useState("");

  const dispatch = useDispatch();

  const productEditAdmin = useSelector((state) => state.productEditAdmin);
  const { loading, error, product } = productEditAdmin;
  const [category, setCategory] = useState(product.category);
  useEffect(() => {
    setCategory(product.category);
    return () => {
      setCategory(product.category);
    };
  }, [product._id, product.category]);

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  const categoryListAdmin = useSelector((state) => state.categoryListAdmin);
  const {
    // loading: loadingCategory,
    // error: errorCategory,
    category: categoryEditProduct
  } = categoryListAdmin;

  useEffect(() => {
    dispatch(listCategoryAdmin());
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Cập nhật sản phẩm thành công!", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProductAdmin(productId));
      } else {
        setName(product.name);
        // setCategory(category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
        setPriceSale(product.priceSale);
        setAuthor(product.author);
        setPublisher(product.publisher);
        setSupplier(product.supplier);
      }
    }
  }, [product, dispatch, productId, successUpdate, category]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (price >= 0 && countInStock >= 0) {
      dispatch(
        updateProductAdmin({
          _id: productId,
          name,
          price,
          priceSale,
          description,
          author,
          image,
          countInStock,
          category,
          publisher,
          supplier
        })
      );
    } else {
      dispatch({ type: PRODUCT_CREATE_FAIL });
      toast.error("Cập nhật sản phẩm không thành công!!!", ToastObjects);
    }
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/admin/products" className="btn btn-danger text-white btn-size">
              Quản lý sản phẩm
            </Link>
            <h2 className="content-title">Cập nhật thông tin sản phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary btn-size">
                Lưu
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tiêu đề
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_author" className="form-label">
                          Tác giả
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập Tác giả"
                          className="form-control"
                          id="product_author"
                          required
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </div>
                      {/* {errorCategory && <Message variant="alert-danger">{errorCategory}</Message>}
                          {loadingCategory && <Loading />} */}
                      <div className="mb-4">
                        <label htmlFor="category_title" className="form-label">
                          Danh mục
                        </label>
                        <select
                          id="category_title"
                          className="form-select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categoryEditProduct &&
                            categoryEditProduct.map((categoryItem, index) => (
                              <option key={index} value={categoryItem?._id}>
                                {categoryItem?.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_publisher" className="form-label">
                          Nhà xuất bản
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập Nhà xuất bản"
                          className="form-control"
                          id="product_publisher"
                          required
                          value={publisher}
                          onChange={(e) => setPublisher(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_supplier" className="form-label">
                          Nhà cung cấp
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập Nhà cung cấp"
                          className="form-control"
                          id="product_supplier"
                          required
                          value={supplier}
                          onChange={(e) => setSupplier(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá sản phẩm
                        </label>
                        <input
                          type="number"
                          placeholder="0 đ"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price_sale" className="form-label">
                          Giá bán
                        </label>
                        <input
                          type="number"
                          placeholder="0 đ"
                          className="form-control"
                          id="product_price_sale"
                          required
                          value={priceSale}
                          onChange={(e) => setPriceSale(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_count_in_stock" className="form-label">
                          Số lượng sản phẩm trong kho
                        </label>
                        <input
                          type="number"
                          placeholder="Số lượng"
                          className="form-control"
                          id="product_count_in_stock"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Mô tả</label>
                        <textarea
                          placeholder="Nhập mô tả sản phẩm"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Hình ảnh sản phẩm</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Nhập URL hình ảnh"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                        <input className="form-control mt-3" type="file" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;