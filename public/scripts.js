// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Thank you, ${name}. We will get back to you soon!`);
        this.reset();  // Reset form
    } else {
        alert('Please fill in all fields before submitting.');
    }
});
