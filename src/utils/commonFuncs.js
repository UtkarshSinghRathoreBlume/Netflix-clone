import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";
import { auth } from "../firebase";
import { API_KEY, options } from "../Request";
import openai from "./openai";




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

    export const fetchAllMovies = async (searchQuery) => {
      return await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&include_adult=false&language=en-US&page=1`, options).then(data => data.json())
    }

    

    export const gptResults = async (searchQuery) => {
      const gptQuery = "Act as a movie recommendation system and suggest some movies for the query " +searchQuery+ ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya"
      return await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
      
    }


    export const truncate = (string,n) => {
      return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }