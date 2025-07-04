        // Sample data for 20 students
        const students = [
            {name: "John Smith", regNo: "REG2023001", email: "john.smith@example.com", marks: 87.5},
            {name: "Emma Johnson", regNo: "REG2023002", email: "emma.j@example.com", marks: 92.3},
            {name: "Michael Brown", regNo: "REG2023003", email: "michael.b@example.com", marks: 78.9},
            {name: "Sophia Williams", regNo: "REG2023004", email: "sophia.w@example.com", marks: 85.2},
            {name: "James Davis", regNo: "REG2023005", email: "james.d@example.com", marks: 76.8},
            {name: "Olivia Miller", regNo: "REG2023006", email: "olivia.m@example.com", marks: 91.7},
            {name: "Robert Wilson", regNo: "REG2023007", email: "robert.w@example.com", marks: 82.4},
            {name: "Ava Moore", regNo: "REG2023008", email: "ava.m@example.com", marks: 88.9},
            {name: "William Taylor", regNo: "REG2023009", email: "william.t@example.com", marks: 79.5},
            {name: "Isabella Anderson", regNo: "REG2023010", email: "isabella.a@example.com", marks: 94.1},
            {name: "David Thomas", regNo: "REG2023011", email: "david.t@example.com", marks: 81.3},
            {name: "Mia Jackson", regNo: "REG2023012", email: "mia.j@example.com", marks: 86.7},
            {name: "Joseph White", regNo: "REG2023013", email: "joseph.w@example.com", marks: 77.8},
            {name: "Charlotte Harris", regNo: "REG2023014", email: "charlotte.h@example.com", marks: 90.2},
            {name: "Daniel Martin", regNo: "REG2023015", email: "daniel.m@example.com", marks: 83.6},
            {name: "Amelia Thompson", regNo: "REG2023016", email: "amelia.t@example.com", marks: 89.4},
            {name: "Matthew Garcia", regNo: "REG2023017", email: "matthew.g@example.com", marks: 80.1},
            {name: "Emily Martinez", regNo: "REG2023018", email: "emily.m@example.com", marks: 93.8},
            {name: "Andrew Robinson", regNo: "REG2023019", email: "andrew.r@example.com", marks: 75.9},
            {name: "Abigail Clark", regNo: "REG2023020", email: "abigail.c@example.com", marks: 84.7}
        ];

        const performanceData = [
            {id: "S001", gender: "M", age: 18, studyHours: 15, attendance: 92, previousGrade: 85, extracurricular: 5, finalGrade: 88},
            {id: "S002", gender: "F", age: 19, studyHours: 20, attendance: 98, previousGrade: 92, extracurricular: 3, finalGrade: 95},
            {id: "S003", gender: "M", age: 18, studyHours: 8, attendance: 75, previousGrade: 70, extracurricular: 10, finalGrade: 72},
            {id: "S004", gender: "F", age: 20, studyHours: 12, attendance: 85, previousGrade: 78, extracurricular: 6, finalGrade: 80},
            {id: "S005", gender: "M", age: 19, studyHours: 10, attendance: 80, previousGrade: 75, extracurricular: 8, finalGrade: 76},
            {id: "S006", gender: "F", age: 18, studyHours: 18, attendance: 95, previousGrade: 88, extracurricular: 4, finalGrade: 90},
            {id: "S007", gender: "M", age: 20, studyHours: 14, attendance: 88, previousGrade: 82, extracurricular: 7, finalGrade: 84},
            {id: "S008", gender: "F", age: 19, studyHours: 16, attendance: 90, previousGrade: 86, extracurricular: 5, finalGrade: 89},
            {id: "S009", gender: "M", age: 18, studyHours: 9, attendance: 78, previousGrade: 74, extracurricular: 12, finalGrade: 75},
            {id: "S010", gender: "F", age: 20, studyHours: 22, attendance: 96, previousGrade: 94, extracurricular: 2, finalGrade: 96},
            {id: "S011", gender: "M", age: 19, studyHours: 13, attendance: 84, previousGrade: 79, extracurricular: 6, finalGrade: 81},
            {id: "S012", gender: "F", age: 18, studyHours: 17, attendance: 92, previousGrade: 87, extracurricular: 4, finalGrade: 89},
            {id: "S013", gender: "M", age: 20, studyHours: 7, attendance: 70, previousGrade: 68, extracurricular: 15, finalGrade: 67},
            {id: "S014", gender: "F", age: 19, studyHours: 19, attendance: 94, previousGrade: 90, extracurricular: 3, finalGrade: 92},
            {id: "S015", gender: "M", age: 18, studyHours: 11, attendance: 82, previousGrade: 76, extracurricular: 8, finalGrade: 78}
        ];

        // Track login status
        let isLoggedIn = false;

        // Function to show selected section and hide others
        function showSection(sectionId) {
            // If trying to access protected sections without login, prevent access
            if ((sectionId === 'student-details' || sectionId === 'performance-prediction') && !isLoggedIn) {
                alert('Please login first to access this section.');
                return;
            }
            
            // Hide all sections
            document.getElementById('login').style.display = 'none';
            document.getElementById('student-details').style.display = 'none';
            document.getElementById('performance-prediction').style.display = 'none';
            
            // Show selected section
            document.getElementById(sectionId).style.display = 'block';
            
            // Update active nav link
            const navLinks = document.querySelectorAll('.navbar a');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('onclick').includes(sectionId)) {
                    link.classList.add('active');
                }
            });
            
            // If student details section is shown, populate the table
            if (sectionId === 'student-details') {
                populateTable(students);
            }
            
            // If performance prediction section is shown, populate the table and charts
            if (sectionId === 'performance-prediction') {
                populatePerformanceTable(performanceData);
                createCharts();
            }
        }

        // Function to populate the student table
        function populateTable(studentArray) {
            const tableBody = document.querySelector("#studentTable tbody");
            tableBody.innerHTML = "";
            
            studentArray.forEach((student, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.regNo}</td>
                    <td>${student.email}</td>
                    <td>${student.marks}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Function to populate the performance table
        function populatePerformanceTable(dataArray) {
            const tableBody = document.querySelector("#performanceTable tbody");
            tableBody.innerHTML = "";
            
            dataArray.forEach(data => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${data.id}</td>
                    <td>${data.gender}</td>
                    <td>${data.age}</td>
                    <td>${data.studyHours}</td>
                    <td>${data.attendance}</td>
                    <td>${data.previousGrade}</td>
                    <td>${data.extracurricular}</td>
                    <td>${data.finalGrade}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Function to create charts
        function createCharts() {
            // Factors chart
            const factorsCtx = document.getElementById('factorsChart').getContext('2d');
            new Chart(factorsCtx, {
                type: 'bar',
                data: {
                    labels: ['Study Hours', 'Attendance', 'Previous Grade', 'Extracurricular'],
                    datasets: [{
                        label: 'Average Values',
                        data: [
                            performanceData.reduce((sum, item) => sum + item.studyHours, 0) / performanceData.length,
                            performanceData.reduce((sum, item) => sum + item.attendance, 0) / performanceData.length,
                            performanceData.reduce((sum, item) => sum + item.previousGrade, 0) / performanceData.length,
                            performanceData.reduce((sum, item) => sum + item.extracurricular, 0) / performanceData.length
                        ],
                        backgroundColor: [
                            'rgba(74, 74, 138, 0.7)',
                            'rgba(74, 74, 138, 0.7)',
                            'rgba(74, 74, 138, 0.7)',
                            'rgba(74, 74, 138, 0.7)'
                        ],
                        borderColor: [
                            'rgba(74, 74, 138, 1)',
                            'rgba(74, 74, 138, 1)',
                            'rgba(74, 74, 138, 1)',
                            'rgba(74, 74, 138, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
            // Grades distribution chart
            const gradesCtx = document.getElementById('gradesChart').getContext('2d');
            
            // Count grades in different ranges
            const gradeRanges = {
                '90-100': 0,
                '80-89': 0,
                '70-79': 0,
                '60-69': 0,
                'Below 60': 0
            };
            
            performanceData.forEach(data => {
                if (data.finalGrade >= 90) gradeRanges['90-100']++;
                else if (data.finalGrade >= 80) gradeRanges['80-89']++;
                else if (data.finalGrade >= 70) gradeRanges['70-79']++;
                else if (data.finalGrade >= 60) gradeRanges['60-69']++;
                else gradeRanges['Below 60']++;
            });
            
            new Chart(gradesCtx, {
                type: 'pie',
                data: {
                    labels: Object.keys(gradeRanges),
                    datasets: [{
                        data: Object.values(gradeRanges),
                        backgroundColor: [
                            'rgba(74, 74, 138, 0.7)',
                            'rgba(58, 58, 106, 0.7)',
                            'rgba(42, 42, 74, 0.7)',
                            'rgba(26, 26, 42, 0.7)',
                            'rgba(10, 10, 10, 0.7)'
                        ],
                        borderColor: [
                            'rgba(74, 74, 138, 1)',
                            'rgba(58, 58, 106, 1)',
                            'rgba(42, 42, 74, 1)',
                            'rgba(26, 26, 42, 1)',
                            'rgba(10, 10, 10, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            });
        }

        // Function to search students
        function searchStudents() {
            const searchTerm = document.getElementById("searchInput").value.toLowerCase();
            const filteredStudents = students.filter(student => 
                student.name.toLowerCase().includes(searchTerm) || 
                student.regNo.toLowerCase().includes(searchTerm)
            );
            populateTable(filteredStudents);
        }

        // Function to predict student performance
        function predictPerformance(studyHours, attendance, previousGrade, extracurricular) {
            // Simple prediction model based on weighted factors
            // In a real application, this would use a trained ML model
            const studyWeight = 0.3;
            const attendanceWeight = 0.25;
            const previousGradeWeight = 0.35;
            const extracurricularWeight = 0.1;
            
            // Normalize inputs
            const normalizedStudy = Math.min(studyHours / 20, 1); // Assuming 20 hours is max
            const normalizedAttendance = attendance / 100;
            const normalizedPrevGrade = previousGrade / 100;
            const normalizedExtra = Math.min(extracurricular / 10, 1); // Assuming 10 hours is optimal
            
            // Calculate predicted score (0-100)
            const predictedScore = (
                normalizedStudy * studyWeight * 100 +
                normalizedAttendance * attendanceWeight * 100 +
                normalizedPrevGrade * previousGradeWeight * 100 +
                normalizedExtra * extracurricularWeight * 100
            );
            
            return Math.round(predictedScore);
        }

        // Function to handle successful login
        function handleLogin() {
            isLoggedIn = true;
            alert('Login successful!');
            
            // Show the navigation links
            document.getElementById('performance-prediction-link').classList.remove('hidden');
            document.getElementById('student-details-link').classList.remove('hidden');
            
            // Redirect to performance prediction page
            showSection('performance-prediction');
        }

        // Initialize the page
        window.onload = function() {
            // Show login section by default
            showSection('login');
            
            // Handle login form submission
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
            
            // Handle prediction form submission
            document.getElementById('predictionForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const studyHours = parseFloat(document.getElementById('studyHours').value);
                const attendance = parseFloat(document.getElementById('attendance').value);
                const previousGrade = parseFloat(document.getElementById('previousGrade').value);
                const extracurricular = parseFloat(document.getElementById('extracurricular').value);
                
                const predictedGrade = predictPerformance(studyHours, attendance, previousGrade, extracurricular);
                
                // Display the prediction result
                document.getElementById('predictionScore').textContent = predictedGrade + '%';
                document.getElementById('predictionResult').style.display = 'block';
            });
        };