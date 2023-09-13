import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../firebase";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { addDoc, collection, doc, getDocs, query, setDoc, where, onSnapShot, onSnapshot, getFirestore, getDoc } from "firebase/firestore";
const PlansScreen = () => {
  const [products, setProducts] = useState([]);

  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null)

  useEffect(()=> {
    getSubsscription();

  },[user.uid])

  useEffect(() => {
    getDbData();
  }, []);

  const loadCheckout = async (priceId, priceData) => {
    console.log(user.uid);
    const db = getFirestore();
    const collectionRef = collection(db, "customers", user.uid, "checkout_sessions")

    const docRef = await addDoc(collectionRef, {
        price:priceId,
        success_url:window.location.origin,
        cancel_url:window.location.origin 
    })

    // const docRef = doc(db, "customers", user.uid);
    // const colRef = collection(docRef, "checkout_sessions");
    // await addDoc(colRef, {
    //   price: priceId,
    //   success_url: window.location.origin,
    //   cancel_url: window.location.origin,
    // });

    // onSnapShot(collection(db, "customers", user.id), (snap)=> {

    // })

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

 async function getSubsscription() {
    const db = getFirestore();
    await getDocs(collection(db, "customers", user.uid, "subscriptions")).then(querySnap => {
        querySnap.forEach(async subs => {
            console.log(subs.data())
            setSubscription({
                role: subs.data().role,
                current_period_end: subs.data().current_period_end?.seconds,
                current_period_start: subs.data().current_period_start?.seconds,
            })
        })
    })

    }

  async function getDbData() {
    const db = getFirestore()
    const queryData = query(
      collection(db, "products"),
      where("active", "==", true)
    );
    const products = {};
    const querySnapshot = await getDocs(queryData).then((querySnap) => {
      querySnap.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const prices = query(collection(productDoc.ref, "prices"));
        const priceSnap = await getDocs(prices);
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
    });
    setProducts(products);

    console.log(subscription)
  }
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
