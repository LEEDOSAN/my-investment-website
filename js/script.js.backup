// 폼 제출 처리
const signupForm = document.querySelector('.signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('무료체험이 성공적으로 신청되었습니다!');
        this.reset();
    });
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들
document.querySelectorAll('.problem-item, .review-card, .application-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// rising-item들에 대한 지연 애니메이션
document.querySelectorAll('.rising-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.style.transitionDelay = `${(index + 1) * 0.1}s`;
    observer.observe(el);
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', function() {
    // 메인 디자인 페이드인 효과
    const mainDesign = document.querySelector('.main-design');
    if (mainDesign) {
        mainDesign.style.opacity = '0';
        mainDesign.style.transform = 'translateY(30px)';
        mainDesign.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            mainDesign.style.opacity = '1';
            mainDesign.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // 신청 섹션 페이드인 효과
    const applicationSection = document.querySelector('.application-section');
    if (applicationSection) {
        applicationSection.style.opacity = '0';
        applicationSection.style.transform = 'translateY(30px)';
        applicationSection.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            applicationSection.style.opacity = '1';
            applicationSection.style.transform = 'translateY(0)';
        }, 600);
    }
});

// 실시간 신청현황 애니메이션
const applicationsList = document.getElementById('applicationsList');
const surnames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '전', '고', '문', '양', '손', '배', '조', '백', '허', '유', '남', '심', '노', '정', '하', '곽', '성', '차', '주', '우', '구', '신', '임', '나', '전', '민', '유', '진', '지', '엄', '채', '원', '천', '방', '공', '강', '현', '함', '변', '염', '양', '여', '추', '노', '도', '소', '신', '석', '선', '설', '마', '길', '주', '연', '방', '위', '표', '명', '기', '동', '라', '반', '왕', '금', '옥', '육', '인', '맹', '제', '모', '장', '탁', '국', '영', '도', '식', '가', '비', '어', '용', '성', '경', '충', '의', '순', '영', '종', '경', '광', '제', '구', '군', '훈', '민', '정', '영', '수', '동', '식', '상', '호', '수', '용', '성', '경', '충', '의', '순', '영', '종', '경', '광', '제', '구', '군', '훈', '민', '정', '영', '수', '동', '식', '상', '호', '수', '용'];

const stockItems = ['엔케이', 'KR모터스', '동양철관', '삼성전자', '인디에프', '대한조선', '풀무원', '아이에이', '코데즈컴바인', '세림B&G', '제이에스티나', '인텔', '이베이', '테슬라', 'AMD', '엔비디아'];

let animationInterval;

function addNewApplication() {
    if (!applicationsList) return;
    
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    const randomStock = stockItems[Math.floor(Math.random() * stockItems.length)];
    const isCompleted = Math.random() > 0.5; // 50% 확률로 상담완료
    
    const newApplication = document.createElement('div');
    newApplication.className = 'application-item new-application';
    newApplication.innerHTML = `
        <span class="applicant">${randomSurname}**ㅣ상담종목 : ${randomStock}ㅣ상담내용 : <span class="lock-icon" onclick="alert('비공개 글 입니다')" title="클릭하여 상세보기">🔒</span></span>
        <span class="status ${isCompleted ? 'completed' : ''}">${isCompleted ? '상담완료' : '대기중'}</span>
    `;
    
    // 리스트 맨 위에 추가
    applicationsList.insertBefore(newApplication, applicationsList.firstChild);
    
    // 최대 10개까지만 유지
    const items = applicationsList.querySelectorAll('.application-item');
    if (items.length > 10) {
        applicationsList.removeChild(items[items.length - 1]);
    }
    
    // 애니메이션 완료 후 클래스 제거
    setTimeout(() => {
        if (newApplication && newApplication.classList) {
            newApplication.classList.remove('new-application');
            newApplication.classList.add('animation-complete');
        }
    }, 2000);
}

function startAnimation() {
    // 기존 인터벌 정리
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    
    // 3-8초마다 새로운 신청자 추가
    animationInterval = setInterval(addNewApplication, Math.random() * 5000 + 3000);
    
    // 페이지 로드 시 첫 번째 신청자 추가
    setTimeout(addNewApplication, 2000);
}

// 잠금 아이콘 클릭 이벤트
function handleLockIconClick(e) {
    if (e.target.classList.contains('lock-icon')) {
        alert('비공개 글 입니다');
    }
}

// 이벤트 리스너 등록
document.addEventListener('click', handleLockIconClick);

// 동적으로 생성된 요소들에도 이벤트 적용
document.addEventListener('click', handleLockIconClick, true);

// 페이지 로드 시 애니메이션 시작
if (applicationsList) {
    startAnimation();
} 