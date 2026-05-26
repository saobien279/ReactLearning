function Home({ products }) {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>

            <p>Kho hàng có {products.length} sản phẩm</p>

            <h3>Sản phẩm hết hàng</h3>
            <ul>
                {products.filter((item) => item.stockQuantity === 0).map((item) => (
                    <li key={item.id}>
                        {item.name} - Tồn kho: {item.stockQuantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;