document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const searchInput = document.getElementById('search');
    const clearFormButton = document.getElementById('clearForm');
    const clearAllButton = document.getElementById('clearAll');

    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = generateID();
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const date = new Date().toLocaleString();

        const user = { id, date, nome, cpf, email, password };
        addUser(user);
        clearFormFields();
    });

    clearFormButton.addEventListener('click', function () {
        clearFormFields();
    });

    clearAllButton.addEventListener('click', function () {
        clearAllUsers();
    });

    searchInput.addEventListener('input', function () {
        searchUsers();
    });

    function generateID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function addUser(user) {
        const users = getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers(users);
    }

    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.date} - ${user.nome} - ${user.cpf} - ${user.email}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function () {
                deleteUser(user.id);
            });
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    }

    function deleteUser(id) {
        let users = getUsers();
        users = users.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers(users);
    }

    function clearAllUsers() {
        localStorage.removeItem('users');
        displayUsers([]);
    }

    function searchUsers() {
        const query = searchInput.value.toLowerCase();
        const users = getUsers();
        const filteredUsers = users.filter(user => 
            user.nome.toLowerCase().includes(query) || 
            user.email.toLowerCase().includes(query) ||
            user.cpf.includes(query)
        );
        displayUsers(filteredUsers);
    }

    function clearFormFields() {
        userForm.reset();
    }

    function init() {
        const users = getUsers();
        displayUsers(users);
    }

    init();
});
