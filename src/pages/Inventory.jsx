import { useState, useEffect } from 'react'
function Inventory({ handleUpdateStock, products }) {



    return (
        <div>
            <h1>Inventory</h1>
            <p>Welcome to the inventory page!</p>

            <ul>
                {products.map((item) => (
                    <li key={item.id}>
                        MSP:{item.id} {item.name} - Tồn kho: {item.stockQuantity}
                        <button onClick={() => handleUpdateStock(item.id, +1)}>Nhập 1 sản phẩm</button>
                        <button onClick={() => handleUpdateStock(item.id, -1)}>Xuất 1 sản phẩm</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inventory;