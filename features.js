document.addEventListener('DOMContentLoaded', function() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach(box => {
        box.addEventListener('click', function() {
            this.classList.toggle('show-content');
        });
    });
});
