import './App.css';
import Header from './Header';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import AddProductForm from './pages/AddProductForm';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
// Nạp Custom Hook
import { useInventory } from './hooks/useInventory';

function App() {
  // SỬA TẠI ĐÂY: Thêm dấu () để thực thi Hook
  const { products, loading, token, handleAdd, handleUpdateStock, handleLogin } = useInventory();

  return (
    <>
      {/* Chỉ hiển thị Header và Nav nếu người dùng đã có vé thông hành hợp lệ */}
      {token && <Header user="Nguyễn Văn A" role="Admin" />}
      {token && (
        <nav style={{ padding: '10px', background: '#f4f4f4', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/add">Add Products</Link>
        </nav>
      )}

      <div>
        {/* TẬN DỤNG LOADING: Nếu đang fetch dữ liệu, hiển thị thông báo chờ thay vì để màn hình trống */}
        {loading && token ? (
          <div style={{ padding: '40px', fontSize: '20px', fontWeight: 'bold' }}>⏳ Đang tải dữ liệu hệ thống...</div>
        ) : (
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home products={products} /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory handleUpdateStock={handleUpdateStock} products={products} /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddProductForm onAdd={handleAdd} /></ProtectedRoute>} />
            <Route path="/login" element={<Login onSubmit={handleLogin} />} />
            <Route path="*" element={<div><h1>404</h1><p>Hệ thống không tìm thấy trang này!</p></div>} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;