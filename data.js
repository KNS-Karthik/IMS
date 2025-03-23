// Sample data for the application
const data = {
    employees: [
        { id: 1, name: 'John Doe', department: 'IT', status: 'Present' },
        { id: 2, name: 'Jane Smith', department: 'HR', status: 'Absent' },
        { id: 3, name: 'Mike Johnson', department: 'Finance', status: 'Late' },
        { id: 4, name: 'Sarah Williams', department: 'IT', status: 'Present' },
        { id: 5, name: 'Tom Brown', department: 'HR', status: 'Present' }
    ],
    students: [
        { id: 1, name: 'Alice Johnson', class: '10A', status: 'Present' },
        { id: 2, name: 'Bob Wilson', class: '10B', status: 'Absent' },
        { id: 3, name: 'Carol Smith', class: '10A', status: 'Late' },
        { id: 4, name: 'David Miller', class: '10C', status: 'Present' },
        { id: 5, name: 'Eve Davis', class: '10B', status: 'Present' }
    ],
    attendance: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: {
            employees: [92, 88, 95, 85, 90],
            students: [88, 85, 90, 87, 89]
        }
    }
};