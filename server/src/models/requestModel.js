const {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
} = require("firebase/firestore");
const { db } = require("../configs/firebase.js");

const requestsCollection = collection(db, "requests");
const changelogCollection = collection(db, "changelog");

const requestModel = {
  // Retrieve a request by ID
  getRequestById: async function (requestId) {
    const docRef = doc(requestsCollection, requestId);
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return null;
      }

      const requestData = { id: docSnap.id, ...docSnap.data() };

      // Retrieve user details if user_id exists
      if (requestData.user_id) {
        const userDocRef = doc(db, requestData.user_id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          requestData.user = { id: userDocSnap.id, ...userDocSnap.data() };
        } else {
          requestData.user = { name: "Unknown User" };
        }
      }

      // Retrieve product details if product_id exists
      if (requestData.product_id) {
        const productDocRef = doc(db, requestData.product_id);
        const productDocSnap = await getDoc(productDocRef);
        if (productDocSnap.exists()) {
          requestData.product = { id: productDocSnap.id, ...productDocSnap.data() };
        } else {
          requestData.product = { name: "Unknown Product" };
        }
      }

      return requestData;
    } catch (error) {
      console.error("Error getting request:", error);
      throw error;
    }
  },

  // Retrieve all requests
  getAllRequests: async function () {
    try {
      const querySnapshot = await getDocs(requestsCollection);
      const requests = [];

      for (const docSnap of querySnapshot.docs) {
        const requestData = { id: docSnap.id, ...docSnap.data() };

        // Retrieve user details if user_id exists
        if (requestData.user_id) {
          const userDocRef = doc(db, requestData.user_id);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            requestData.user = { id: userDocSnap.id, ...userDocSnap.data() };
          } else {
            requestData.user = { name: "Unknown User" };
          }
        }

        // Retrieve product details if product_id exists
        if (requestData.product_id) {
          const productDocRef = doc(db, requestData.product_id);
          const productDocSnap = await getDoc(productDocRef);
          if (productDocSnap.exists()) {
            requestData.product = { id: productDocSnap.id, ...productDocSnap.data() };
          } else {
            requestData.product = { name: "Unknown Product" };
          }
        }

        requests.push(requestData);
      }

      return requests;
    } catch (error) {
      console.error("Error getting all requests:", error);
      throw error;
    }
  },

  // Add a new request
  addRequest: async function (requestData) {
    try {
      const docRef = await addDoc(requestsCollection, {
        ...requestData,
      });

      // Retrieve product name
      const productName = await this.getProductNameByRef(requestData.product_id);

      // Log the add action
      await addDoc(changelogCollection, {
        type: "Request",
        action: "added",
        name: productName,
        status: requestData.status_id,
        timestamp: new Date(),
      });

      return { id: docRef.id, ...requestData };
    } catch (error) {
      console.error("Error adding request:", error);
      throw error;
    }
  },

  // Update a request document
  updateRequest: async function (requestId, updatedFields) {
    const docRef = doc(requestsCollection, requestId);
    try {
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null; // Request not found
      }

      await updateDoc(docRef, { ...updatedFields });

      // Retrieve product name using docRef
      const requestData = docSnap.data();
      let productName = "Unknown Product";
      if (requestData.product_id) {
        productName = await this.getProductNameByRef(requestData.product_id);
      }

      // Log the update action
      await addDoc(changelogCollection, {
        type: "Request",
        action: updatedFields.status_id === "approved" ? "approved" : "rejected",
        name: productName,
        status: updatedFields.status_id,
        timestamp: new Date(),
      });

      return { id: docSnap.id, ...updatedFields };
    } catch (error) {
      console.error("Error updating request:", error);
      throw error;
    }
  },

  // Retrieve product name by reference
  getProductNameByRef: async function (product_id) {
    try {
      const productDocRef = doc(db, product_id);
      const productDocSnap = await getDoc(productDocRef);
      if (!productDocSnap.exists()) {
        return null; // Product not found
      }

      const productData = productDocSnap.data();
      return productData.name || null; // Return product name if it exists
    } catch (error) {
      console.error("Error getting product name:", error);
      throw error;
    }
  },

  // Retrieve user name by reference
  getUserNameByRef: async function (user_id) {
    try {
      const userDocRef = doc(db, user_id);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        return null; // User not found
      }

      const userData = userDocSnap.data();
      return userData.name || null; // Return user name if it exists
    } catch (error) {
      console.error("Error getting user name:", error);
      throw error;
    }
  },
};

module.exports = requestModel;