import { useState, useEffect } from 'react'
function Inventory({ handleUpdateStock, products }) {

    // const [stock, setStock] = useState(10)

    // const handleExport = () => {
    //     if (stock > 0) {
    //         setStock(stock - 1);
    //     } else {
    //         alert("Hết hàng rồi Khang ơi!");
    //     }
    // };

    // useEffect(() => {
    //     console.log(`Nhật ký: Kho hàng vừa cập nhật. Số lượng mới là: ${stock}`)
    // }, [stock])

    return (
        <div>
            <h1>Inventory</h1>
            <p>Welcome to the inventory page!</p>

            <ul>
                {products.map((item) => (
                    <li key={item.id}>
                        MSP:{item.id} {item.name} - Tồn kho: {item.stock}
                        <button onClick={() => handleUpdateStock(item.id, +1)}>Nhập 1 sản phẩm</button>
                        <button onClick={() => handleUpdateStock(item.id, -1)}>Xuất 1 sản phẩm</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inventory;