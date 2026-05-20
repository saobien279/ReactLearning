import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProductForm({ onAdd }) {
    const navigate = useNavigate();
    const [Form, setForm] = useState({ name: "", stock: 0 });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Form.name.trim() === "" || Form.stock <= 0) {
            alert("Dữ liệu sai, vui lòng nhập đúng");
            return;
        }

        onAdd(Form);
        setForm({ name: "", stock: 0 });
        navigate('/inventory');
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ddd', margin: '10px' }}>
            <h3>Thêm sản phẩm</h3>
            <input
                type="text"
                placeholder="Tên sản phẩm"
                value={Form.name}
                onChange={(e) => setForm({ ...Form, name: e.target.value })}
            />

            <input
                type="number"
                value={Form.stock}
                onChange={(e) => setForm({ ...Form, stock: parseInt(e.target.value) || 0 })}
            />

            <button type="submit">Thêm Sản Phẩm</button>
        </form>
    );
}

export default AddProductForm;