const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Open sidebar from the right side
hamburger.addEventListener('click', function () {
  sidebar.style.right = '0';  // Slide in the sidebar from the right
  overlay.style.display = 'block';  // Show overlay
});

// Close sidebar when overlay is clicked
overlay.addEventListener('click', function () {
  sidebar.style.right = '-250px';  // Slide sidebar back to the right (hidden)
  overlay.style.display = 'none';  // Hide overlay
});