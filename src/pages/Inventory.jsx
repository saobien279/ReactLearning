import { useState, useEffect } from 'react'
function Inventory({ handleUpdateStock, products , handleDelete}) {



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

                        <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '20px', backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                            Xóa Sản Phẩm
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inventory;