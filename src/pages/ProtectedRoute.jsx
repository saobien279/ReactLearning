import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // 1. Kiểm tra sự tồn tại của Token trong bộ nhớ trình duyệt
  const token = localStorage.getItem('user-token');

  // 2. Nếu KHÔNG có token, đá văng người dùng về thẳng trang /login ngay lập tức
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Nếu CÓ token, cho phép render nội dung trang con (children) bên trong
  return children;
}

export default ProtectedRoute;