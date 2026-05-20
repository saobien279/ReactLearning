import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './Header'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Settings from './pages/Settings'
import AddProductForm from './pages/AddProductForm'
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const [stock, setStock] = useState(12);

  const [products, setProducts] = useState(() => {
    const savedData = localStorage.getItem('my-inventory');
    if (savedData) {
      return JSON.parse(savedData)
    }
    else {
      return [
        { id: 1, name: "Laptop", stock: 5 },
        { id: 2, name: "Mouse", stock: 20 },
        { id: 3, name: "Keyboard", stock: 15 }
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem('my-inventory', JSON.stringify(products));
  }, [products]);


  const handleExport = () => {
    if (stock > 0) {
      setStock(stock - 1);
    } else {
      alert("Hết hàng rồi Khang ơi!");
    }
  };



  const handleUpdateStock = (id, amount) => {

    setProducts(products.map(item => {
      if (item.id === id) {
        // Kiểm tra để không cho xuất kho khi stock = 0
        const newStock = item.stock + amount;
        return { ...item, stock: newStock >= 0 ? newStock : 0 };
      }
      return item;
    }));
  }


  const handleAdd = (newProduct) => {
    const productWithId = {
      ...newProduct,       // Copy name và stock từ Form truyền lên
      id: Date.now()       // Tự tạo ID duy nhất bằng thời gian
    };

    // Cập nhật mảng products bằng cách thêm phần tử mới vào cuối
    setProducts([...products, productWithId]);
  };



  return (
    <>


      {/* <Header user="Nguyễn Văn A" role="Admin" />
      <h1>Hệ thống Invento-Flow đang khởi tạo...</h1>
      <p>chào mừng đến với thế giới React!</p>

      <p>Kho hàng có {stock} sản phẩm</p>
      <button onClick={() => setStock(stock + 1)}>
        Nhập thêm 1 sản phẩm
      </button>

      <button onClick={handleExport}>
        Xuất bớt 1 sản phẩm
      </button>*/}


      {/*Thanh điều hướng */}
      <Header user="Nguyễn Văn A" role="Admin" />
      <div>
        <nav style={{ padding: '10px', background: '#f4f4f4', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/add">Add Products</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/inventory" element={<Inventory handleUpdateStock={handleUpdateStock} products={products} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add" element={<AddProductForm onAdd={handleAdd} />} />

          <Route path="*" element={<div><h1>404</h1><p>Hệ thống không tìm thấy trang này!</p></div>} />
        </Routes>
      </div>
    </>
  )
}

export default App
