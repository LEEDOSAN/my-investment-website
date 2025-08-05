// 어드민 대시보드 - 동적 필드 시스템
let currentSite = 'site1';
let applications = [];

// 폼 필드 정의 (메인 페이지와 동일하게 유지)
// 새로운 필드 추가 시 여기에도 추가하면 자동으로 어드민에 반영됨
const FORM_FIELDS = {
    name: { label: '이름', type: 'text' },
    contact: { label: '연락처', type: 'tel' },
    'investment-type': { label: '투자유형', type: 'select', options: ['단타', '스윙', '장기', '원금회복', '왕초보'] },
    'investment-amount': { label: '투자금액', type: 'select', options: ['3천이하', '3천~1억', '1억이상', '주식계좌없음'] },
    'inflow-path': { label: '유입경로', type: 'select', options: ['구글검색', '네이버검색', '카카오톡', '인스타그램', '페이스북', '유튜브', '지인추천', '온라인광고', '블로그', '커뮤니티', '기타'] }
};

// 로그인 상태 확인
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
}

// 로그아웃
function logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    window.location.href = 'login.html';
}

// 사이트 전환
function switchSite(site) {
    currentSite = site;
    
    // 탭 활성화 상태 변경
    document.querySelectorAll('.site-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 데이터 로드
    loadApplications();
}

// 신청 데이터 로드
function loadApplications() {
    const allData = JSON.parse(localStorage.getItem('applications') || '[]');
    applications = allData.filter(app => app.site === currentSite);
    displayApplications();
}

// 동적 테이블 헤더 생성
function createTableHeader() {
    const headerRow = document.createElement('div');
    headerRow.className = 'table-row';
    headerRow.style.fontWeight = 'bold';
    headerRow.style.background = '#f8f9fa';
    
    let headerHTML = '';
    
    // 폼 필드 헤더 추가
    Object.keys(FORM_FIELDS).forEach(fieldName => {
        headerHTML += `<div class="table-cell">${FORM_FIELDS[fieldName].label}</div>`;
    });
    
    // 추가 헤더 (시간, 상태, 상담현황)
    headerHTML += `
        <div class="table-cell">신청시간</div>
        <div class="table-cell">상태</div>
        <div class="table-cell">상담현황</div>
    `;
    
    headerRow.innerHTML = headerHTML;
    return headerRow;
}

// 신청자 목록 표시
function displayApplications() {
    const tableContent = document.getElementById('tableContent');
    
    if (applications.length === 0) {
        tableContent.innerHTML = '<div style="padding: 40px; text-align: center; color: #666;">신청자가 없습니다.</div>';
        return;
    }
    
    // 테이블 헤더 생성
    const headerRow = createTableHeader();
    tableContent.innerHTML = '';
    tableContent.appendChild(headerRow);
    
    // 데이터 행 생성
    applications.forEach((app, index) => {
        const date = new Date(app.timestamp).toLocaleString('ko-KR');
        const row = document.createElement('div');
        row.className = 'table-row';
        
        let rowHTML = '';
        
        // 폼 필드 데이터 추가
        Object.keys(FORM_FIELDS).forEach(fieldName => {
            const value = app[fieldName] || '';
            rowHTML += `<div class="table-cell">${value}</div>`;
        });
        
        // 추가 데이터 (시간, 상태, 상담현황)
        rowHTML += `
            <div class="table-cell">${date}</div>
            <div class="table-cell">
                <span class="status-badge status-${app.status === '대기중' ? 'waiting' : app.status === '상담완료' ? 'completed' : 'rejected'}">${app.status}</span>
            </div>
            <div class="table-cell">
                <button class="action-btn btn-complete" onclick="updateStatus(${index}, '상담완료')">완료</button>
                <button class="action-btn btn-incomplete" onclick="updateStatus(${index}, '미완료')">미완료</button>
                <button class="action-btn btn-delete" onclick="deleteApplication(${index})">삭제</button>
            </div>
        `;
        
        row.innerHTML = rowHTML;
        tableContent.appendChild(row);
    });
}

// 상태 업데이트
function updateStatus(index, status) {
    const allData = JSON.parse(localStorage.getItem('applications') || '[]');
    const siteData = allData.filter(app => app.site === currentSite);
    const globalIndex = allData.findIndex(app => app === siteData[index]);
    
    if (globalIndex !== -1) {
        allData[globalIndex].status = status;
        localStorage.setItem('applications', JSON.stringify(allData));
        loadApplications();
    }
}

// 신청 삭제
function deleteApplication(index) {
    if (confirm('정말 삭제하시겠습니까?')) {
        const allData = JSON.parse(localStorage.getItem('applications') || '[]');
        const siteData = allData.filter(app => app.site === currentSite);
        const globalIndex = allData.findIndex(app => app === siteData[index]);
        
        if (globalIndex !== -1) {
            allData.splice(globalIndex, 1);
            localStorage.setItem('applications', JSON.stringify(allData));
            loadApplications();
        }
    }
}

// 폼 필드 추가 함수 (새로운 필드가 추가될 때 사용)
function addFormField(fieldName, fieldConfig) {
    FORM_FIELDS[fieldName] = fieldConfig;
    // 어드민 페이지 새로고침하여 새로운 필드 반영
    loadApplications();
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadApplications();
});
