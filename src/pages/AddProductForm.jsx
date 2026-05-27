import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProductForm({ handleAdd }) {
    const navigate = useNavigate();
    const [Form, setForm] = useState({ name: "", sku: "", price: 0, stock: 0, categoryId: 0, supplierId: 0 });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Form.name.trim() === "" || Form.stock <= 0) {
            alert("Dữ liệu sai, vui lòng nhập đúng");
            return;
        }

        const isSuccess = await handleAdd(Form);

        if (isSuccess) {
            setForm({ name: "", sku: "", price: 0, stock: 0, categoryId: 0, supplierId: 0 });
            navigate('/inventory');
        }
    };

    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        width: '100%'
    };

    const labelStyle = {
        flex: '1',
        fontSize: '14px',
        color: '#4b5563',
        fontWeight: '600'
    };

    const inputStyle = {
        flex: '2',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        outline: 'none',
        fontSize: '14px'
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh', // Căn giữa theo chiều dọc màn hình
            width: '100%',
            backgroundColor: '#f9fafb'
        }}>
            <form onSubmit={handleSubmit} style={{
                width: '420px', // Chiều rộng
                minHeight: 'auto', // Chiều cao
                padding: '30px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h3 style={{ marginBottom: '25px', color: '#111827', fontSize: '22px' }}>Thêm Sản Phẩm Mới</h3>

                {/* Tên sản phẩm */}
                <div style={rowStyle}>
                    <label style={labelStyle}>Tên sản phẩm</label>
                    <input
                        type="text"
                        placeholder="VD: Laptop Dell"
                        value={Form.name}
                        onChange={(e) => setForm({ ...Form, name: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                {/* SKU */}
                <div style={rowStyle}>
                    <label style={labelStyle}>Mã SKU</label>
                    <input
                        type="text"
                        placeholder="VD: DELL-001"
                        value={Form.sku}
                        onChange={(e) => setForm({ ...Form, sku: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                {/* Giá */}
                <div style={rowStyle}>
                    <label style={labelStyle}>Giá bán ($)</label>
                    <input
                        type="number"
                        value={Form.price}
                        onChange={(e) => setForm({ ...Form, price: parseFloat(e.target.value) || 0 })}
                        style={inputStyle}
                    />
                </div>

                {/* Tồn kho */}
                <div style={rowStyle}>
                    <label style={labelStyle}>Tồn kho ban đầu</label>
                    <input
                        type="number"
                        value={Form.stock}
                        onChange={(e) => setForm({ ...Form, stock: parseInt(e.target.value) || 0 })}
                        style={inputStyle}
                    />
                </div>

                {/* Danh mục */}
                <div style={rowStyle}>
                    <label style={labelStyle}>ID Danh mục</label>
                    <input
                        type="number"
                        value={Form.categoryId}
                        onChange={(e) => setForm({ ...Form, categoryId: parseInt(e.target.value) || 0 })}
                        style={inputStyle}
                    />
                </div>

                {/* Nhà cung cấp */}
                <div style={rowStyle}>
                    <label style={labelStyle}>ID Nhà cung cấp</label>
                    <input
                        type="number"
                        value={Form.supplierId}
                        onChange={(e) => setForm({ ...Form, supplierId: parseInt(e.target.value) || 0 })}
                        style={inputStyle}
                    />
                </div>

                {/* Nút Submit */}
                <button type="submit" style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '10px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'background 0.3s'
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                    Xác Nhận Thêm
                </button>
            </form>
        </div>
    );
}

export default AddProductForm;