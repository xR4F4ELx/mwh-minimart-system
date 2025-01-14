const {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} = require("firebase/firestore");
const { db } = require("../configs/firebase.js");

const usersCollection = collection(db, "users");

const userModel = {
  addUser: function (userData) {
    return addDoc(usersCollection, {
      ...userData,
      current_points: 0,
      total_points: 0,
    })
      .then((docRef) => {
        return docRef.id;
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        throw error;
      });
  },

  getUserById: function (userId) {
    const docRef = doc(usersCollection, userId);
    return getDoc(docRef)
      .then((docSnap) => {
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
      })
      .catch((error) => {
        console.error("Error getting user:", error);
        throw error;
      });
  },

  getAllUsers: function () {
    return getDocs(usersCollection)
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
      .catch((error) => {
        console.error("Error getting all users:", error);
        throw error;
      });
  },

  updateUser: function (userId, updatedData) {
    const docRef = doc(usersCollection, userId);
    return updateDoc(docRef, updatedData).catch((error) => {
      console.error("Error updating user:", error);
      throw error;
    });
  },

  findUsers: function (criteria) {
    const q = query(
      usersCollection,
      where(criteria.field, "==", criteria.value)
    );
    return getDocs(q)
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
      .catch((error) => {
        console.error("Error finding users:", error);
        throw error;
      });
  },
};

module.exports = userModel;
