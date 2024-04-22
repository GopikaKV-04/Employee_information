document.addEventListener("DOMContentLoaded", function() {
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const addEmployeeModal = document.getElementById('addEmployeeModal');
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    const employeeList = document.querySelector('.employees__names--list');
    let employeeInfo = document.querySelector('.employees__single--info');
    const viewAllEmployeesBtn = document.getElementById('viewAllEmployeesBtn');
    let employees = [];

    // Function to render employee list
    function renderEmployees() {
        employeeList.innerHTML = '';
        employees.forEach(employee => {
            const employeeItem = document.createElement('div');
            employeeItem.classList.add('employee-item');
            employeeItem.innerHTML = `${employee.firstName} ${employee.lastName}`;
            employeeItem.addEventListener('click', () => viewEmployee(employee.id));
            employeeList.appendChild(employeeItem);
        });
    }

    // Function to render single employee information
    function viewEmployee(id) {
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            const infoHTML = `
                <h2>${employee.firstName} ${employee.lastName}</h2>
                <p>Email: ${employee.email}</p>
                <p>Contact Number: ${employee.contactNumber}</p>
            `;
            employeeInfo.innerHTML = infoHTML;
        }
    }

    // Function to add new employee
    function addEmployee(formData) {
        const newEmployee = {
            id: new Date().getTime(), // Simple ID generation using timestamp
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            imageUrl: formData.get('imageUrl') || '', // Optional image URL
            email: formData.get('email'),
            contactNumber: formData.get('contactNumber'),
            address: formData.get('address'),
            dob: formData.get('dob'),
            salary: formData.get('salary')
        };
        employees.push(newEmployee);
        renderEmployees();
    }

    // Function to view all employees' details
    function viewAllEmployees() {
        let allEmployeesHTML = '<h2>All Employees</h2>';
        employees.forEach(employee => {
            allEmployeesHTML += `
                <div class="employee-details">
                    <h3>${employee.firstName} ${employee.lastName}</h3>
                    <p>Email: ${employee.email}</p>
                    <p>Contact Number: ${employee.contactNumber}</p>
                </div>
            `;
        });
        employeeInfo.innerHTML = allEmployeesHTML;
    }

    // Event listener for Add Employee button click
    addEmployeeBtn.addEventListener('click', () => {
        addEmployeeModal.style.display = 'block';
    });

    // Event listener for closing Add Employee modal
    addEmployeeModal.addEventListener('click', (e) => {
        if (e.target === addEmployeeModal) {
            addEmployeeModal.style.display = 'none';
        }
    });

    // Event listener for Add Employee form submission
    addEmployeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        addEmployee(formData);
        addEmployeeForm.reset();
        addEmployeeModal.style.display = 'none';
    });

    // Event listener for View All Employees button click
    viewAllEmployeesBtn.addEventListener('click', viewAllEmployees);

    // Initial rendering of employees
    renderEmployees();
});
