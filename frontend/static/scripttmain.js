// High Contrast Mode Toggle
document.getElementById("contrastToggle").addEventListener("click", function() {
    document.body.classList.toggle("high-contrast");
});

// Font Size Adjustments
function increaseFontSize() {
    document.body.style.fontSize = "larger";
}

function decreaseFontSize() {
    document.body.style.fontSize = "smaller";
}

// Navigation for Cards
function navigateTo(page) {
    window.location.href = page;
}
