import React, { useState } from "react";
import { data } from "../data";
import Swal from "sweetalert2";

export const PackageList = ({
  total,
  setTotal,
}) => {
    const onAddPackage = (pack, cantidad) => {

    if (cantidad === 1) {
      setTotal((pack.single_price * cantidad*pack.porc_tax)+(pack.single_price*cantidad));
      pack.totalp=cantidad
    } else if (cantidad === 2) {
      setTotal((pack.pricefor2* cantidad*pack.porc_tax)+(pack.pricefor2*cantidad));
      pack.totalp=cantidad
    } else if (cantidad >= 3 && cantidad <= 4) {
      setTotal((pack.pricefor3o4* cantidad*pack.porc_tax)+(pack.pricefor3o4*cantidad));
      pack.totalp=cantidad
    } else if (cantidad >= 5) {
      setTotal((pack.priceformoreof5* cantidad*pack.porc_tax)+(pack.priceformoreof5*cantidad));
      pack.totalp=cantidad
    }

  };

  const confirmPack=()=>{
    Swal.fire({
        title:'Aviso',
        text: '¿Desea proceder con la compra?',
        icon:'info',
        showDenyButton: true,
        denyButtonText:'No',
        confirmButtonText:'Si'
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire('Se ha confirmado su compra')
            setTotal(0);   
        }
        else if (result.isDenied){
            Swal.fire('Se ha cancelado la compra')
        }
    })
}
  const handleChange = (e, pack) => {
    const cantidad = parseInt(e.target.value, 10);
    if (!isNaN(cantidad)) {
      onAddPackage(pack, cantidad);
    }
  };

  const [modal,setModal]=useState(false);
  const[modalcontent, setModalContent]=useState([]);

    const toggleModal=(pack)=>{
        setModalContent([pack]);
        setModal(!modal)
    }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="container-items">
        {data.map((pack) => (
          <div className="item" key={pack.id}>
            <figure>
              <img src={pack.urlImage} alt={pack.destination} />
            </figure>
            <div className="info-product">
              <h2>{pack.destination}</h2>
              <center>
                <h3>Costo de paquete por persona </h3>
              </center>
              <p className="price">-Precio individual: ${pack.single_price}</p>
              <p className="price">-Precio 2 personas: ${pack.pricefor2}</p>
              <p className="price">-Precio 3 a 4 personas: ${pack.pricefor3o4}</p>
              <p className="price">-Precio 5 a más personas: ${pack.priceformoreof5}</p>
              <p className="price">Impuesto por persona: ({pack.porc_tax} * #personas) </p>
              <input name="cantidad" type="number" min="1"max="50" onChange={(e) => handleChange(e, pack)} />
              <button type="submit" onClick={()=>toggleModal(pack)} >Comprar</button>
              {modal && (
                        <div className="modal">
                            {modalcontent.map((pack)=>{
                                return(
                                    <div onClick={()=>toggleModal(pack)} className="overlay">
                                       <div className="modal-content">
                                        <center><h1>Detalles de la compra:</h1></center>
                                          <h2>Nombre de destino: {pack.destination}</h2>
                                          <img className="imagen-compra" src={pack.urlImage}/>
                                          <h2>Cantidad de personas:{pack.totalp}</h2>
                                          <p>Total: $ {total}</p>
                                          <center><button onClick={()=>confirmPack()}>Confirmar Compra</button></center>
                                          <button className="close-modal" onClick={toggleModal}>X</button>
                                        </div>
                                   </div>
                                );
                            })}

                    </div>
                    )
                }

            </div>
          </div>
        ))}
      </div>
    </form>
  );
};