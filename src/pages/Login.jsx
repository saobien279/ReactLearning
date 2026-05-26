import { useState } from 'react';


function Login({ onSubmit }) {
    // 1. Quản lý dữ liệu người dùng nhập vào Form
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(credentials.username, credentials.password)
        console.log('Dữ liệu nhập vào:', credentials);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #3168d6ff 0%, #aa3bff 100%)', // Màu Gradient xanh - tím
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999
        }}>
            <form onSubmit={handleSubmit} style={{
                background: '#ffffff',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                width: '100%',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <h2 style={{ margin: '0 0 8px 0', color: '#08060d' }}>Đăng Nhập</h2>

                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e5e4e7' }}
                />

                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e5e4e7' }}
                />

                <button type="submit" style={{
                    padding: '12px',
                    background: '#3168d6ff',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    Vào Hệ Thống
                </button>
            </form>
        </div>
    );
}

export default Login;