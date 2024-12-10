// Add animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const roles = document.querySelectorAll('.role');
    const terms = document.querySelectorAll('.term');
  
    // Animate roles on load
    roles.forEach((role, index) => {
      setTimeout(() => {
        role.style.transform = 'scale(1)';
        role.style.opacity = '1';
      }, index * 200);
    });
  
    // Handle repayment term selection
    terms.forEach((term) => {
      term.addEventListener('click', () => {
        terms.forEach((t) => t.classList.remove('active'));
        term.classList.add('active');
      });
    });
  });
  