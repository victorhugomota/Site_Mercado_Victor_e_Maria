import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANpFnEIkyN1XCT6qbtmVR9wx7sQHEsyrE",
  authDomain: "comprasmercado-23913.firebaseapp.com",
  projectId: "comprasmercado-23913",
  storageBucket: "comprasmercado-23913.firebasestorage.app",
  messagingSenderId: "317518149234",
  appId: "1:317518149234:web:94f38624d68a2b9a6634eb",
  measurementId: "G-2XP88EK37S"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const COMPRAS_COLLECTION = "compras";

/**
 * Escuta atualizações da coleção de compras em tempo real.
 * @param {Function} callback Callback executado com a lista atualizada de compras
 * @returns {Function} Função para cancelar o listener
 */
export function escutarCompras(callback) {
  const comprasRef = collection(db, COMPRAS_COLLECTION);
  const q = query(comprasRef, orderBy("dataEmissao", "desc"));

  return onSnapshot(q, (snapshot) => {
    const compras = [];
    snapshot.forEach((doc) => {
      compras.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(compras);
  }, (error) => {
    console.error("Erro ao escutar banco de dados Firestore:", error);
  });
}

/**
 * Adiciona uma nova compra no Firestore.
 * @param {Object} compra Objeto com os dados da compra
 */
export async function salvarCompra(compra) {
  try {
    const comprasRef = collection(db, COMPRAS_COLLECTION);
    const docRef = await addDoc(comprasRef, {
      ...compra,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar compra no Firestore:", error);
    throw error;
  }
}

/**
 * Exclui uma compra do Firestore pelo ID.
 * @param {string} id ID do documento
 */
export async function excluirCompra(id) {
  try {
    const docRef = doc(db, COMPRAS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erro ao excluir compra no Firestore:", error);
    throw error;
  }
}
