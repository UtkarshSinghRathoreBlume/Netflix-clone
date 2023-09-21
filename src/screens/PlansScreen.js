import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { addDoc, collection,  onSnapshot, getFirestore } from "firebase/firestore";
import { getDbData, getSubsscription } from "../utils/commonFuncs";
const PlansScreen = () => {
  const [products, setProducts] = useState([]);

  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null)

  useEffect(()=> {
    getSubsscription().then((data) => setSubscription(data));
  },[user.uid])

  useEffect(() => {
    getDbData().then(data => setProducts(data));
  }, []);

  const loadCheckout = async (priceId, priceData) => {
    const db = getFirestore();
    const collectionRef = collection(db, "customers", user.uid, "checkout_sessions")

    const docRef = await addDoc(collectionRef, {
        price:priceId,
        success_url:window.location.origin,
        cancel_url:window.location.origin 
    })

    onSnapshot(docRef,
       (snap) => {
        const { error, url } = snap.data();
        if (error) {
          alert(`An error occured: ${error.message}`);
        }

        if (url) {
          window.location.assign(url)
        }
      }
    );
  };

  return (
    <div className="plansScreen">
        {subscription && <p>Renewal date : {new Date(
            subscription?.current_period_end *1000).toLocaleDateString()} </p>}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)
        return (
          <div key={productId} className={`${isCurrentPackage && "planScreen__plan--disabled"} planScreen__plan`}>
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
            disabled={isCurrentPackage}
              onClick={() => {
                !isCurrentPackage && loadCheckout(
                  productData.prices.priceId,
                  productData.prices.priceData.unit_amount
                );
              }}
            >
              {isCurrentPackage ? 'Current Package' : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
