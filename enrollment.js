document.addEventListener('DOMContentLoaded', () => {
    const enrollButtons = document.querySelectorAll('.enroll-btn');

    enrollButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert('Please log in to enroll in courses.');
                window.location.href = 'login_register.html';
                return;
            }

            const courseId = button.getAttribute('data-course-id');

            const response = await fetch('http://localhost:5000/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, courseId }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Successfully enrolled in the course!');
            } else {
                alert(data.error);
            }
        });
    });
});