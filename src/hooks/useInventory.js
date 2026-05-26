import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useInventory() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    const [token, setToken] = useState(localStorage.getItem('user-token'))

    useEffect(() => {
        fetchProducts();
    }, [token]);


    const handleUpdateStock = async (id, amount) => {

        try {
            const token = localStorage.getItem('user-token')

            const targetProduct = product.find(item => item.id == id);
            if (!targetProduct) return;

            const newStock = targetProduct.stockQuantity + amount
            const safeStock = newStock >= 0 ? newStock : 0;

            // 1. Gửi request POST kèm body sang API Login công khai
            const response = await fetch('http://localhost:5105/api/Products/${id}', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Vé thông hành
                },
                body: JSON.stringify({
                    id: id,
                    name: targetProduct.name,
                    sku: targetProduct.sku,
                    price: targetProduct.price,
                    stockQuantity: safeStock
                })
            });

            // 2. Nếu Server trả về mã lỗi (400, 401...), chặn lại và báo lỗi
            if (!response.ok) {
                throw new Error('Không thể cập nhật số lượng trên Server!');
            }

            setProducts(product.map(item => {
                if (item.id === id) {
                    return { ...item, stockQuantity: safeStock };
                }
                return item;
            }))



        } catch (error) {
            console.error('Lỗi API:', error.message);
            alert(error.message);
        }
    }

    const handleAdd = (newProduct) => {
        const productWithId = {
            ...newProduct,       // Copy name và stock từ Form truyền lên
            id: Date.now()       // Tự tạo ID duy nhất bằng thời gian
        };

        // Cập nhật mảng products bằng cách thêm phần tử mới vào cuối
        setProducts([...products, productWithId]);
    };

    const handleLogin = async (username, password) => {
        try {
            // 1. Gửi request POST kèm body sang API Login công khai
            const response = await fetch('http://localhost:5105/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            // 2. Nếu Server trả về mã lỗi (400, 401...), chặn lại và báo lỗi
            if (!response.ok) {
                throw new Error('Đăng nhập thất bại! kiểm tra lại tài khoản mật khẩu');
            }

            //3.Mở gói dữ liệu JSON khi Server phản hồi thành công (Status 200)
            const data = await response.json();

            // 4. Lưu JWT Token vào localStorage để các API sau lấy ra dùng
            localStorage.setItem('user-token', data.token);
            setToken(data.token)

            alert('Đăng nhập thành công! Đã lưu Token vào hệ thống');

            navigate('/')


        } catch (error) {
            console.error('Lỗi API:', error.message);
            alert(error.message);
        }
    }

    const fetchProducts = async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true)

            //2 Goi Api
            const response = await fetch('http://localhost:5105/api/Products', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Đính kèm token làm vé thông hành
                }
            })

            // 3. Nếu sập quyền (401), báo lỗi ngay
            if (!response.ok) {
                throw new Error('Không thể lấy danh sách sản phẩm hoặc token hết hạn!');
            }

            // 4. Mở gói dữ liệu JSON từ Backend
            const data = await response.json();

            // Lưu ý: Dựa vào tài liệu Backend, data trả về có thể là Object chứa danh sách và tổng số lượng
            // Nếu data là object dạng { items: [...] }, hãy setProducts(data.items)
            setProducts(data.items || data);

        } catch (error) {
            console.error('Lỗi API:', error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        };
    }

    return { products, loading, handleUpdateStock, handleAdd, handleLogin }
}