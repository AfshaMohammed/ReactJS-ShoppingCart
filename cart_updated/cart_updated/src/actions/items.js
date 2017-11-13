import fetch from 'isomorphic-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const ADD_ITEMS = 'ADD_ITEMS';
export const REMOVE_ITEMS = 'REMOVE_ITEMS';

//dispatching action(State is ready only)
export function fetchDetails(data) {
  return {
    type: REQUEST_ITEMS,
    data: data,
  };
}

export function addItem(data) {
  return {
    type: ADD_ITEMS,
    data: data,
  };
}

export function removeItem(data) {
  return {
    type: REMOVE_ITEMS,
    data: data,
  };  
}

export function fetchAllItems() {
  return async dispatch => {
    try {
      const url = `https://swapi.co/api/people`;
      const response = await (await fetch(url)).json();
      //create a store (Single source of truth)
      const response1 = {
        items: [
          {
            itemName: "Banana",
            imgSrc: "https://tinyurl.com/zcdrymz",
            price: 1.25,
            quantityRemaining: 10,
            qty: 1,
          },
          {
            itemName: "Apple",
            imgSrc: "https://tinyurl.com/lg5rj5z",
            price: 2.50,
            quantityRemaining: 5,
            qty: 1,
          },
          {
            itemName: "Raspberry",
            imgSrc: "https://tinyurl.com/mhoedwl",
            price: 4.00,
            quantityRemaining: 2,
            qty: 1,
          },
          {
            itemName: "Kiwi",
            imgSrc: "https://tinyurl.com/mdm9kho",
            price: 3.33,
            quantityRemaining: 15,
            qty: 1,
          },
           
          {
            itemName: "Pineapple",
            imgSrc: "https://tinyurl.com/k2oq2to",
            price: 4.75,
            quantityRemaining: 1,
            qty: 1,
          },

          {
            itemName: "Strawberries",
            imgSrc: "http://cdn1.medicalnewstoday.com/content/images/articles/271/271285/three-strawberries.jpg",
            price: 2.05,
            quantityRemaining: 3,
            qty: 1,
          },
         
        ]
      };
      dispatch(fetchDetails(response1));
      return response1;
    } catch (error) {
        console.log("Error");
    } finally {
      console.log("Error");
    }
  };
}
