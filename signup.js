// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDP4fbQoBEYQyRV8co-XIrvd5DLWrfqkIs",
    authDomain: "digital-risks.firebaseapp.com",
    projectId: "digital-risks",
    storageBucket: "digital-risks.appspot.com",
    messagingSenderId: "226951548553",
    appId: "1:226951548553:web:7f7695a7709ec3d87f8058",
    measurementId: "G-140XW1VER3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Set language to Arabic
auth.languageCode = 'ar';

// Show Loading Animation
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.innerHTML = `
        <div class="loader"></div>
        <p>جاري التحقق من البريد الإلكتروني...</p>
    `;
    document.body.appendChild(loadingDiv);
}

// Hide Loading Animation
function hideLoading() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Show Success Animation
function showSuccess() {
    const successDiv = document.createElement('div');
    successDiv.id = 'success';
    successDiv.innerHTML = `
        <div class="checkmark">✔️</div>
        <p>تم تسجيل الدخول بنجاح!</p>
    `;
    document.body.appendChild(successDiv);

    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Check Email Verification Status
function checkEmailVerification(user) {
    return user.reload().then(() => {
        if (user.emailVerified) {
            hideLoading();
            showSuccess();
        } else {
            // Continue checking every 5 seconds
            setTimeout(() => checkEmailVerification(user), 5000);
        }
    });
}

// Handle Sign-Up Form Submission
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (!email || !password) {
        alert('يرجى ملء جميع الحقول.');
        return;
    }
    showLoading();

    // Create User with Email and Password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user.sendEmailVerification();
        })
        .then(() => {
            alert('تم إرسال رابط التحقق إلى بريدك الإلكتروني. يرجى التحقق من بريدك الإلكتروني لإكمال التسجيل.');
            return checkEmailVerification(auth.currentUser); // Start checking email verification
        })
        .catch((error) => {
            console.error('خطأ في إنشاء الحساب:', error);
            document.getElementById('signupErrorMessage').textContent = error.message;
            hideLoading();
        });
});

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

// Check Dark Mode Preference on Load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

// Toggle Password Visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('signupPassword');
    const toggleButton = document.querySelector('.password-toggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'إخفاء';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'إظهار';
    }
}


// Toggle Menu Function
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
    console.log("Menu Toggled"); // Debugging line
}

// Close Menu When Clicking Outside
document.addEventListener("click", (event) => {
    const menu = document.getElementById("menu");
    const menuToggle = document.getElementById("menuToggle");

    // Check if the click is outside the menu and toggle button
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove("active");
    }
});

// Close Menu When a Link is Clicked
document.querySelectorAll("#menu li a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            const menu = document.getElementById("menu");
            menu.classList.remove("active");
        }
    });
});