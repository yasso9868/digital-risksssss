// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDP4fbQoBEYQyRV8co-XIrvd5DLWrfqkIs",
    authDomain: "digital-risks.firebaseapp.com",
    projectId: "digital-risks",
    storageBucket: "digital-risks.firebasestorage.app",
    messagingSenderId: "226951548553",
    appId: "1:226951548553:web:7f7695a7709ec3d87f8058",
    measurementId: "G-140XW1VER3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login Form Submission
if (document.getElementById('emailLoginForm')) {
    document.getElementById('emailLoginForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!email || !password) {
            alert('يرجى ملء جميع الحقول.');
            return;
        }

        // Firebase Email/Password Login
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert(`مرحبًا ${userCredential.user.email}! تم تسجيل الدخول بنجاح.`);
                window.location.href = 'index.html'; // Redirect to home page after login
            })
            .catch((error) => {
                console.error('خطأ في تسجيل الدخول:', error);
                alert('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
            });
    });
}   
// Google Sign-In
if (document.getElementById('googleLogin')) {
    document.getElementById('googleLogin').addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                alert(`مرحبًا ${result.user.displayName}! تم تسجيل الدخول بنجاح.`);
                localStorage.setItem('isLoggedIn', 'true'); // Store login state
                window.location.href = 'index.html'; // Redirect to home page after login
            })
            .catch((error) => {
                console.error('خطأ في تسجيل الدخول:', error);
                alert('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
            });
    });
}

// Dark Mode Toggle Function
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save user preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check user preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});


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