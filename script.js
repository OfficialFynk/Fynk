// Cookie functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Canvas mockups with punchier visuals
function drawMockup(canvasId, title, color1, color2) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Phone frame
    ctx.fillStyle = '#1e1e5f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(20, 40, canvas.width - 40, canvas.height - 80);

    // Header with gradient
    const gradient = ctx.createLinearGradient(20, 40, canvas.width - 20, 100);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, '#ff6f61');
    ctx.fillStyle = gradient;
    ctx.fillRect(20, 40, canvas.width - 40, 60);

    // Title
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 85);

    // Content blocks with flair
    ctx.fillStyle = color2;
    ctx.fillRect(40, 120, canvas.width - 80, 80);
    ctx.fillRect(40, 220, canvas.width - 80, 80);

    // Add some UI elements to make it look more app-like
    ctx.fillStyle = '#1e1e5f';
    ctx.fillRect(40, 320, canvas.width - 80, 40);
    
    // Add some circular elements to represent profile pics
    ctx.beginPath();
    ctx.arc(70, 160, 20, 0, 2 * Math.PI);
    ctx.arc(70, 260, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e1e5f';
    ctx.fill();
    
}

// Function to open modals that can be called from anywhere
function openPrivacyModal() {
    document.getElementById('privacy-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openTermsModal() {
    document.getElementById('terms-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Add to your existing document.addEventListener('DOMContentLoaded', function() {...});
// Make these functions global so they can be accessed from external links
window.openPrivacyModal = openPrivacyModal;
window.openTermsModal = openTermsModal;

// Draw mockups when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Draw mockups
    drawMockup('hero-canvas', 'Fynk Home', '#4a4ad6', '#e0e0ff');
    drawMockup('realtime-canvas', 'Nearby Now', '#ff6f61', '#ffe0dc');
    drawMockup('secure-canvas', 'Your Crew', '#1e1e5f', '#e0e0ff');
    drawMockup('simple-canvas', 'Clean Vibes', '#4a4ad6', '#e5e5ff');
    drawMockup('cta-canvas', 'Join Fynk', '#ff6f61', '#ffe0dc');

    // Add this to your document.addEventListener('DOMContentLoaded', function() {...});
    // Check URL parameters on page load to see if we should open a modal
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openModal') === 'privacy') {
        openPrivacyModal();
    } else if (urlParams.get('openModal') === 'terms') {
        openTermsModal();
    }

    // Modal functionality
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modals
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    });

    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            privacyModal.style.display = 'none';
            termsModal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            privacyModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            privacyModal.style.display = 'none';
            termsModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// MailerLite API Integration
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiY2IyMDU2YjJjNzRmODFhMGU1MTVmNjQwYTQ2ZTliY2Y3OWM5MDkxY2JhZGQ5OWVkMzdiYjE3ODI0MzdjMGRjNGZkNjU2NzZiMDI2YWNiNmIiLCJpYXQiOjE3NDA4ODcxNjguNzExMTk4LCJuYmYiOjE3NDA4ODcxNjguNzExMTk5LCJleHAiOjQ4OTY1NjA3NjguNzA3MDU3LCJzdWIiOiIxMzc0MTQ1Iiwic2NvcGVzIjpbXX0.O_twBo3NP-LMF9DfJhiSBzNisyqigbzsyRMkeUhHzFOAjgWwv5mi31t1Cv8lmMdlTFwBtbvy1AetRIQlj6dSj9tKsNlUzS3TSRuby-_lE-cVtoGXvclNdyth_15oTuOzzBHxB7PseEnR7XbDZCkxPkh5KEWjdGtG-I1TaNL0LOs24o5l3qBei9WitsJx-c9Yj7T37NkBCeRZmnGlBGkTleRrQrcVZtJ0BVn39fn1O0RHfe1cEvR1Ukmcat_1q2065aa7DSif1ZN07X5ZpeD4tgzj5AEkvKQAux3sEa8aS9u-G3Pl9b7pP1LRA2ErGRKQrodrqr-B9JlljiZeQ2SyVlDPT5JpZNAII5t40_P-AjPhO4PoufwAh8mnjuge5rfctkqP5KxhD_7ScJ98ENUjnLkA80atWfuqSaLTY-Z7ou7h9RtL1MYb37UlX-b_3LcTbG9g2CwR9tx59uSIskAzzlHuCybJxd2L1n4g4kljWHuIJR1_rEz6N-lPxMDUSd69C_ztA1E6R6Azasf4a27PsABtDkxru2xs8UqTFGUSTI6Y7Z-1hxijL_7qqt2ZUCNoMygUxMm4HvDXFPGUYvfRAHBQJd0rXEJBk4lVA7_re48K2oIVIfa0GckgQmNjediEeyAYlFyBLZut4vVomkua05ucWs9WqlkxSgz6L7NJEuw';
        const groupId = '147731390481303520';

        const subscriberData = {
            email: email,
            groups: [groupId]
        };

        try {
            const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(subscriberData)
            });

            if (response.ok) {
                alert("Dope! You're in the Fynk beta. Check your email.");
                form.reset();
                setCookie('fynkSignups', 'true', 30);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something's off!");
            }
        } catch (error) {
            alert(`Hold up: ${error.message}`);
        }
    });
}
