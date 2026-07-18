// Importaciones clave de Firebase
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useState, useEffect } from 'react';

const ProductosBD = () => {
    // Estado para guardar los productos que traigamos de la DB
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const prodDB = collection(db, "productos")
        getDocs(prodDB).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), idFirestore: doc.id }
                })
            );
        })
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez

    return (
<div className="lista-productos">

  {productos.map(prod => (

    <div
      key={prod.id}
      className="producto-card"
    >

      <img
        src={prod.imagen}
        alt={prod.nombre}
        width="150"
      />

      <h3>{prod.nombre}</h3>

      <p>Categoría: {prod.categoria}</p>

      <p>
        ${prod.precio?.toLocaleString("es-AR")}
      </p>

      <p>Stock: {prod.stock} unidades</p>

    </div>

  ))}

</div>
    );
};

export default ProductosBD;