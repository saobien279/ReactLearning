import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('user-token');

  // Hàm decode dữ liệu tĩnh, không phụ thuộc vào Hook
  const isTokenExpired = (encodedToken) => {
    if (!encodedToken) return true;
    try {
      const base64Url = encodedToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      
      const payload = JSON.parse(jsonPayload);
      return Math.floor(Date.now() / 1000) > payload.exp;
    } catch {
      return true;
    }
  };

  // CHỐT CHẶN: Không có token HOẶC token hết hạn -> Xóa ổ cứng và đá về login
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('user-token');
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;