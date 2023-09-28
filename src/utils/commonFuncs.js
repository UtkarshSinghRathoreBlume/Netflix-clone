import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";
import { auth } from "../firebase";

export async function getDbData() {
    const db = getFirestore()
    const queryData = query(
      collection(db, "products"),
      where("active", "==", true)
    );
    const products = {};
     await getDocs(queryData).then((querySnap) => {
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
    return products;
  }


  export async function getSubsscription() {
    let subscription = {}
    const db = getFirestore();
    await getDocs(collection(db, "customers", auth.currentUser.uid, "subscriptions")).then(querySnap => {
        querySnap.forEach(async subs => {
            subscription = {
                role: subs.data().role,
                current_period_end: subs.data().current_period_end?.seconds,
                current_period_start: subs.data().current_period_start?.seconds,
            }
        })
    })
    return subscription

    }


    export const truncate = (string,n) => {
      return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }