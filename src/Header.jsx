function Header({ user, role }) {
    return (
        <header style={{ backgroundColor: '#3168d6ff', padding: '10px', color: 'white', textAlign: 'center' }}>
            <h1>InventFlow</h1>
            <p>Warehouse Management System</p>
            <p>Xin chào {user} | Vai trò : {role}</p>
        </header>
    );
}

export default Header;