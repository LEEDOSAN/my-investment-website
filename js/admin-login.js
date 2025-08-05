// 어드민 로그인 처리
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 간단한 인증 (실제로는 서버에서 처리해야 함)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        window.location.href = 'dashboard.html';
    } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
});

// 로그인 상태 확인
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (isLoggedIn && loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
        
        // 24시간 후 자동 로그아웃
        if (hoursDiff > 24) {
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminLoginTime');
            return false;
        }
        return true;
    }
    return false;
}

// 페이지 로드 시 로그인 상태 확인
if (checkLoginStatus()) {
    window.location.href = 'dashboard.html';
}
