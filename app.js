// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.dataset.section;
        
        // Update active states
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        // Initialize section-specific content
        if (sectionId === 'dashboard') {
            initializeDashboard();
        } else if (sectionId === 'employees') {
            initializeEmployeeTable();
        } else if (sectionId === 'students') {
            initializeStudentTable();
        } else if (sectionId === 'reports') {
            initializeReports();
        }
    });
});

// Dashboard Charts
function initializeDashboard() {
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.attendance.labels,
            datasets: [
                {
                    label: 'Employee Attendance',
                    data: data.attendance.datasets.employees,
                    borderColor: '#3b82f6',
                    tension: 0.4
                },
                {
                    label: 'Student Attendance',
                    data: data.attendance.datasets.students,
                    borderColor: '#22c55e',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Employee Table
function initializeEmployeeTable() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';

    data.employees.forEach(employee => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="text-sm font-medium">${employee.name}</div>
                <div class="text-sm text-gray-500">ID: ${employee.id}</div>
            </td>
            <td>${employee.department}</td>
            <td>
                <span class="status-badge ${employee.status.toLowerCase()}">
                    ${employee.status}
                </span>
            </td>
            <td>
                <select class="attendance-select" data-id="${employee.id}">
                    <option value="present" ${employee.status === 'Present' ? 'selected' : ''}>Present</option>
                    <option value="absent" ${employee.status === 'Absent' ? 'selected' : ''}>Absent</option>
                    <option value="late" ${employee.status === 'Late' ? 'selected' : ''}>Late</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Add event listeners for attendance changes
    document.querySelectorAll('.attendance-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const employeeId = parseInt(e.target.dataset.id);
            const newStatus = e.target.value;
            updateAttendance('employee', employeeId, newStatus);
        });
    });
}

// Student Table
function initializeStudentTable() {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';

    data.students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="text-sm font-medium">${student.name}</div>
                <div class="text-sm text-gray-500">Roll No: ${student.id}</div>
            </td>
            <td>${student.class}</td>
            <td>
                <span class="status-badge ${student.status.toLowerCase()}">
                    ${student.status}
                </span>
            </td>
            <td>
                <select class="attendance-select" data-id="${student.id}">
                    <option value="present" ${student.status === 'Present' ? 'selected' : ''}>Present</option>
                    <option value="absent" ${student.status === 'Absent' ? 'selected' : ''}>Absent</option>
                    <option value="late" ${student.status === 'Late' ? 'selected' : ''}>Late</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Add event listeners for attendance changes
    document.querySelectorAll('.attendance-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const studentId = parseInt(e.target.dataset.id);
            const newStatus = e.target.value;
            updateAttendance('student', studentId, newStatus);
        });
    });
}

// Reports
function initializeReports() {
    const ctx = document.getElementById('reportChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.attendance.labels,
            datasets: [
                {
                    label: 'Present',
                    data: [85, 88, 82, 87, 84],
                    backgroundColor: '#22c55e'
                },
                {
                    label: 'Absent',
                    data: [10, 8, 12, 8, 11],
                    backgroundColor: '#ef4444'
                },
                {
                    label: 'Late',
                    data: [5, 4, 6, 5, 5],
                    backgroundColor: '#eab308'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    stacked: true
                },
                x: {
                    stacked: true
                }
            }
        }
    });
}

// Update attendance status
function updateAttendance(type, id, status) {
    const collection = type === 'employee' ? data.employees : data.students;
    const item = collection.find(x => x.id === id);
    if (item) {
        item.status = status.charAt(0).toUpperCase() + status.slice(1);
        // Re-render the table
        if (type === 'employee') {
            initializeEmployeeTable();
        } else {
            initializeStudentTable();
        }
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});