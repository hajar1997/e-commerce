import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import FAQ from "./pages/FAQ";
import Payment from "./pages/Payment";
import Basket from "./pages/Basket";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import MyFavs from "./pages/MyFavs";
import MyInfo from "./pages/MyInfo";
import MyAddress from "./pages/MyAddress";

function App() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route
            path="product-details/:category/:productBrand/:productModel/:id"
            element={<ProductDetails />}
          />
          <Route path="frequently-asked-questions" element={<FAQ />} />
          <Route path="payment" element={<Payment />} />
          <Route path="basket" element={<Basket />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="my-favs" element={<MyFavs />} />
          <Route path="my-info" element={<MyInfo />} />
          <Route path="my-address" element={<MyAddress />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;


// import React from "react";
// import {
//   UserOutlined,
//   HeartOutlined,
//   ShoppingCartOutlined,
//   EnvironmentOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import MyFavs from "../MyFavs/MyFavs";
// import MyOrders from "../MyOrders/MyOrders";

// const MyProfile = () => {

//   return (
//     <div className="my__profile">
//       <div className="container">
//         <div className="row mt-4">
//           <div className="col-lg-3">
//             <div className="profile__menus">
//               <h5
//                 style={{
//                   color: "#4F4F4F",
//                   fontWeight: "600",
//                   marginBottom: "30px",
//                 }}
//               >
//                 Profilim
//               </h5>
//               <div
//                 className="nav flex-column nav-pills me-3"
//                 id="v-pills-tab"
//                 role="tablist"
//                 aria-orientation="vertical"
//               >
//                 <button
//                   className="nav-link active"
//                   id="sifarislerim-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#sifarislerim"
//                   type="button"
//                   role="tab"
//                   aria-controls="sifarislerim"
//                   aria-selected="true"
//                 >
//                   <ShoppingCartOutlined style={{ fontSize: "20px" }} />
//                   Sifarişlərim
//                 </button>
//                 <button
//                   className="nav-link"
//                   id="favorilerim-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#favorilerim"
//                   type="button"
//                   role="tab"
//                   aria-controls="favorilerim"
//                   aria-selected="false"
//                 >
//                   <HeartOutlined style={{ fontSize: "20px" }} />
//                   Favorilərim
//                 </button>
//                 <button
//                   className="nav-link"
//                   id="melumatlarim-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#melumatlarim"
//                   type="button"
//                   role="tab"
//                   aria-controls="melumatlarim"
//                   aria-selected="false"
//                 >
//                   <UserOutlined style={{ fontSize: "20px" }} />
//                   Şəxsi məlumatlar
//                 </button>
//                 <button
//                   className="nav-link"
//                   id="unvan-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#unvan"
//                   type="button"
//                   role="tab"
//                   aria-controls="unvan"
//                   aria-selected="false"
//                 >
//                   <EnvironmentOutlined style={{ fontSize: "20px" }} />
//                   Çatdırılma ünvanı
//                 </button>
//                 <button
//                   className="nav-link"
//                   id="logOut-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#logOut"
//                   type="button"
//                   role="tab"
//                   aria-controls="logOut"
//                   aria-selected="false"
//                 >
//                   <LogoutOutlined style={{ fontSize: "20px" }} />
//                   Çıxış
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-9">
//             <div className="tab-content" id="v-pills-tabContent">
//               <div
//                 className="tab-pane fade show active"
//                 id="sifarislerim"
//                 role="tabpanel"
//                 aria-labelledby="sifarislerim-tab"
//                 tabIndex={0}
//               >
//                 <MyOrders />
//               </div>
//               <div
//                 className="tab-pane fade"
//                 id="favorilerim"
//                 role="tabpanel"
//                 aria-labelledby="favorilerim-tab"
//                 tabIndex={0}
//               >
//                 <MyFavs />
//               </div>
//               <div
//                 className="tab-pane fade"
//                 id="melumatlarim"
//                 role="tabpanel"
//                 aria-labelledby="melumatlarim-tab"
//                 tabIndex={0}
//               >
//                 ...
//               </div>
//               <div
//                 className="tab-pane fade"
//                 id="unvan"
//                 role="tabpanel"
//                 aria-labelledby="unvan-tab"
//                 tabIndex={0}
//               >
//                 ...
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;