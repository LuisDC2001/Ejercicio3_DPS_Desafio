import React, { useState } from "react";
import { data } from "../data";
import Swal from "sweetalert2";

export const PackageList = ({
  total,
  setTotal,
}) => {
    
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
              <input name="cantidad" type="number" min="1"max="50" />
              <button type="submit" >Comprar</button>

            </div>
          </div>
        ))}
      </div>
    </form>
  );
};