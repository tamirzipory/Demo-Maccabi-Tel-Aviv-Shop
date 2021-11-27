import React from 'react';
import { Route, BrowserRouter, Link} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import orderHistoryScreen from './screens/orderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  
  function signoutHandler(){
    dispatch(signout());
  };

  return (
  <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
    <Link className="brand" to ="/">Maccabi TLV</Link>
</div>
<div>
  <Link to="/cart">Cart
  {cartItems.length > 0 && (
    <span className="badge"> {cartItems.length} </span>
  )}
  </Link>

  { userInfo? (
     <div className="dropdown">
     <Link to="#">{userInfo.name} 
     <i className="fa fa-caret-down"></i>
     </Link>
     <ul className="dropdown-content">
       <li>
         <Link to="/profile">User Profile</Link>
       </li>
       <li>
         <Link to="/orderhistory">Order History</Link>
       </li>
       <Link to="#signout" onClick={signoutHandler}>
         Sign out
       </Link>
     </ul>
     </div>

   ):(
     <Link to="/signin">Sign in</Link>
   )}



</div>

</header>
<main>
  <Route path="/cart/:id?" component={CartScreen}></Route>
  <Route path="/product/:id" component={ProductScreen}></Route>
  <Route path="/signin" component={SigninScreen}></Route>
  <Route path="/register" component={RegisterScreen}></Route>
  <Route path="/shipping" component={ShippingAddressScreen}></Route>
  <Route path="/payment" component={PaymentMethodScreen}></Route>
  <Route path="/placeorder" component={PlaceOrderScreen}></Route>
  <Route path="/order/:id" component={OrderScreen}></Route>
  <Route path="/orderhistory" component={orderHistoryScreen}></Route>
  <PrivateRoute 
  path="/profile" 
  component={ProfileScreen}
  ></PrivateRoute>
  <Route path="/" component={HomeScreen} exact ></Route>
</main>
<footer className="row center">
  all right reserved
</footer>

</div>
</BrowserRouter>

  )
}

export default App;
