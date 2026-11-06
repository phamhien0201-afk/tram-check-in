import { create } from 'zustand';
import { SURVEY_QUESTIONS, evaluateSurvey } from '../data/surveyQuestions';
import { exportToCSV } from '../utils/exportCSV';

const readJSON = (key, fallback) => {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
};
const DEFAULT_USER = { name: 'Trạm Trưởng', avatar: '👩‍🌾' };
const initialSession = readJSON('tram_chua_lanh_session', null);
const initialAccounts = readJSON('tram_accounts', {});
const initialSave = readJSON(`tram_chua_lanh_save_${initialSession || 'guest'}`, null);
const initialAccount = initialSession
  ? (initialAccounts[initialSession] || (initialSave ? { name: initialSave.profileName || DEFAULT_USER.name, avatar: initialSave.profileAvatar || DEFAULT_USER.avatar } : null))
  : null;
const initialSurveyResult =
  (initialSession && readJSON(`tram_survey_${initialSession}`, null)) ||
  initialAccount?.results ||
  readJSON('tram_latest_survey_result', null);
const initialHistory = readJSON('tram_survey_history', []);
const savedStep = (() => {
  try { return sessionStorage.getItem('tram_current_step'); } catch { return null; }
})();
const hasAnyGardenData = !!(
  initialAccount ||
  (initialSave && ((initialSave.inventory?.exp || 0) > 0 || (initialSave.growth || 0) > 0 || (initialSave.journeyHistory?.length || 0) > 0))
);

export const useSurveyStore = create((set, get) => ({
  // Trạng thái màn hình: 'intro' | 'survey' | 'loading' | 'receipt' | 'dashboard'
  currentStep: savedStep || (hasAnyGardenData ? 'dashboard' : 'intro'),
  
  // Dữ liệu câu hỏi & tiến độ
  currentQuestionIndex: 0,
  answers: {},
  selectedOptionValue: null, // Lưu giá trị option vừa chọn để đổi màu viền sang tím #a18cd1
  isTransitioning: false,    // Cờ trạng thái trong 0.4s đợi swipe
  
  // Kết quả sau khi tính toán theo mô hình S-O-R (tự khôi phục từ localStorage nếu có)
  results: initialSurveyResult,

  // Lịch sử thu thập ẩn danh (cho nhà nghiên cứu) - lưu bền vững trong localStorage
  history: initialHistory,

  // Chuyển bước thủ công
  setStep: (step) => {
    try { sessionStorage.setItem('tram_current_step', step); } catch {}
    set({ currentStep: step });
  },

  // Bắt đầu khảo sát
  startSurvey: () => {
    try { sessionStorage.setItem('tram_current_step', 'survey'); } catch {}
    set({
      currentStep: 'survey',
      currentQuestionIndex: 0,
      answers: {},
      selectedOptionValue: null,
      isTransitioning: false,
      results: null
    });
  },

  // Người dùng chọn 1 đáp án:
  // (a) Ghi nhận giá trị vào State
  // (b) Đổi màu viền nút sang tím (#a18cd1)
  // (c) Đợi 0.4s rồi gạt thẻ (swipe) sang câu tiếp theo
  chooseAnswer: (questionId, value) => {
    const { isTransitioning, answers, currentQuestionIndex } = get();
    if (isTransitioning) return; // Tránh bấm nhiều lần liên tiếp

    const updatedAnswers = {
      ...answers,
      [questionId]: value
    };

    // (a) & (b): Cập nhật giá trị và kích hoạt viền tím
    set({
      selectedOptionValue: value,
      answers: updatedAnswers,
      isTransitioning: true
    });

    // (c): Đợi đúng 0.4 giây (400ms) rồi gạt thẻ sang trái
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < SURVEY_QUESTIONS.length) {
        set({
          currentQuestionIndex: nextIndex,
          selectedOptionValue: null,
          isTransitioning: false
        });
      } else {
        // Hoàn thành khảo sát -> Chuyển sang màn hình LoadingState (2.5s)
        const computedResults = evaluateSurvey(updatedAnswers);
        
        // Lưu kết quả khảo sát vào localStorage (chung & theo tài khoản đang đăng nhập)
        localStorage.setItem('tram_latest_survey_result', JSON.stringify(computedResults));
        const activeSession = get().sessionKey || readJSON('tram_chua_lanh_session', null);
        if (activeSession) {
          localStorage.setItem(`tram_survey_${activeSession}`, JSON.stringify(computedResults));
          const accounts = readJSON('tram_accounts', {});
          if (accounts[activeSession]) {
            accounts[activeSession] = { ...accounts[activeSession], results: computedResults };
            localStorage.setItem('tram_accounts', JSON.stringify(accounts));
          }
        }

        // Lưu một bản ghi vào danh sách nghiên cứu
        const respondentRecord = {
          Respondent_ID: `RESP_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          Timestamp: new Date().toISOString(),
          ...updatedAnswers,
          Persona_Classified: computedResults.persona.title,
          S_Mean: computedResults.sStats.mean,
          O_FOMO_Mean: computedResults.fomoStats.mean,
          O_Pressure_Mean: computedResults.pressureStats.mean,
          R_Mean: computedResults.rStats.mean
        };

        const updatedHistory = [...get().history, respondentRecord];
        localStorage.setItem('tram_survey_history', JSON.stringify(updatedHistory));
        try { sessionStorage.setItem('tram_current_step', 'loading'); } catch {}

        set({
          answers: updatedAnswers,
          results: computedResults,
          selectedOptionValue: null,
          isTransitioning: false,
          currentStep: 'loading',
          history: updatedHistory
        });
      }
    }, 400);
  },

  // ===== AUTH (dùng chung Landing Page + Dashboard) =====
  isLoggedIn: !!initialAccount,
  sessionKey: initialAccount ? initialSession : null, // id tài khoản đang đăng nhập (SĐT/email)
  currentUser: initialAccount
    ? {
        name: initialSave?.profileName || initialAccount.name || DEFAULT_USER.name,
        avatar: initialSave?.profileAvatar || initialAccount.avatar || DEFAULT_USER.avatar,
        img: initialSave?.profileAvatar || initialAccount.img || initialAccount.avatar
      }
    : initialSave?.profileName
      ? {
          name: initialSave.profileName,
          avatar: initialSave.profileAvatar || DEFAULT_USER.avatar,
          img: initialSave.profileAvatar
        }
      : DEFAULT_USER,
  showAuthModal: false,
  authType: 'phone', // 'phone' | 'email'

  setCurrentUser: (patch) => {
    // Đổi tên / avatar -> lưu luôn vào tài khoản (localStorage) để F5 / đăng nhập lại không mất
    const key = get().sessionKey;
    if (key && (patch.name !== undefined || patch.img !== undefined || patch.avatar !== undefined)) {
      const accounts = readJSON('tram_accounts', {});
      if (accounts[key]) {
        accounts[key] = {
          ...accounts[key],
          ...(patch.name !== undefined ? { name: patch.name } : {}),
          ...(patch.img !== undefined ? { avatar: patch.img, img: patch.img } : {}),
          ...(patch.avatar !== undefined ? { avatar: patch.avatar } : {})
        };
        localStorage.setItem('tram_accounts', JSON.stringify(accounts));
      }
    }
    set((s) => ({ currentUser: { ...s.currentUser, ...patch } }));
  },
  openAuth: () => set({ showAuthModal: true }),
  closeAuth: () => set({ showAuthModal: false }),
  setAuthType: (authType) => set({ authType }),

  // Đăng nhập: có tài khoản -> load localStorage & vào thẳng Dashboard.
  // Chưa có -> tạo tài khoản; nếu chưa làm khảo sát thì chuyển sang khảo sát.
  login: (identifier) => {
    const key = identifier.toLowerCase();
    const accounts = readJSON('tram_accounts', {});
    const savedGarden = readJSON(`tram_chua_lanh_save_${key}`, null);
    const existing = accounts[key] || (savedGarden ? {
      name: savedGarden.profileName || DEFAULT_USER.name,
      avatar: savedGarden.profileAvatar || DEFAULT_USER.avatar,
      img: savedGarden.profileAvatar
    } : null);
    localStorage.setItem('tram_chua_lanh_session', JSON.stringify(key));

    // Kiểm tra và đồng bộ kết quả khảo sát vào tài khoản của user
    let userSurvey = readJSON(`tram_survey_${key}`, null) || existing?.results || null;
    const latestSurvey = readJSON('tram_latest_survey_result', null);
    if (!userSurvey && latestSurvey) {
      userSurvey = latestSurvey;
      localStorage.setItem(`tram_survey_${key}`, JSON.stringify(userSurvey));
    } else if (userSurvey) {
      localStorage.setItem(`tram_survey_${key}`, JSON.stringify(userSurvey));
      localStorage.setItem('tram_latest_survey_result', JSON.stringify(userSurvey));
    }

    if (existing) {
      const mergedUser = {
        name: savedGarden?.profileName || existing.name || DEFAULT_USER.name,
        avatar: savedGarden?.profileAvatar || existing.avatar || DEFAULT_USER.avatar,
        img: savedGarden?.profileAvatar || existing.img || existing.avatar
      };
      accounts[key] = { ...existing, ...mergedUser, results: userSurvey || existing.results || null };
      localStorage.setItem('tram_accounts', JSON.stringify(accounts));
      sessionStorage.setItem('tram_welcome_back', '1');
      try { sessionStorage.setItem('tram_current_step', 'dashboard'); } catch {}
      set({
        isLoggedIn: true,
        sessionKey: key,
        currentUser: mergedUser,
        results: userSurvey ?? get().results,
        showAuthModal: false,
        currentStep: 'dashboard'
      });
      return;
    }

    const { results, currentStep } = get();
    const finalResults = userSurvey || results || null;
    if (finalResults) {
      localStorage.setItem(`tram_survey_${key}`, JSON.stringify(finalResults));
    }
    accounts[key] = { ...DEFAULT_USER, results: finalResults, createdAt: new Date().toISOString() };
    localStorage.setItem('tram_accounts', JSON.stringify(accounts));
    const nextStep = finalResults || currentStep === 'dashboard' ? 'dashboard' : 'survey';
    try { sessionStorage.setItem('tram_current_step', nextStep); } catch {}
    set({
      isLoggedIn: true,
      sessionKey: key,
      currentUser: DEFAULT_USER,
      results: finalResults,
      showAuthModal: false,
      currentStep: nextStep,
      ...(finalResults ? {} : { currentQuestionIndex: 0, answers: {}, selectedOptionValue: null, isTransitioning: false })
    });
  },

  logout: () => {
    localStorage.removeItem('tram_chua_lanh_session');
    const guestSave = readJSON('tram_chua_lanh_save_guest', null);
    set({
      isLoggedIn: false,
      sessionKey: null,
      currentUser: guestSave?.profileName
        ? { name: guestSave.profileName, avatar: guestSave.profileAvatar || DEFAULT_USER.avatar, img: guestSave.profileAvatar }
        : DEFAULT_USER
    });
  },

  // Xem lại Phiếu Khám khảo sát (nếu có kết quả lưu trong localStorage -> vào thẳng màn Receipt, ngược lại mở lại khảo sát)
  backToReceipt: () => {
    const { sessionKey, results } = get();
    const savedResult =
      (sessionKey && readJSON(`tram_survey_${sessionKey}`, null)) ||
      results ||
      readJSON('tram_latest_survey_result', null);
    if (savedResult) {
      try { sessionStorage.setItem('tram_current_step', 'receipt'); } catch {}
      set({ results: savedResult, currentStep: 'receipt' });
    } else {
      get().startSurvey();
    }
  },

  // Chuyển sang màn hình Hóa đơn (sau khi loading 2.5s kết thúc)
  showReceipt: () => {
    try { sessionStorage.setItem('tram_current_step', 'receipt'); } catch {}
    set({ currentStep: 'receipt' });
  },

  // Chuyển sang màn hình Dashboard thú cưng Capybara
  goToDashboard: () => {
    try { sessionStorage.setItem('tram_current_step', 'dashboard'); } catch {}
    set({ currentStep: 'dashboard' });
  },

  // Chạy lại khảo sát từ đầu
  resetAll: () => {
    try { sessionStorage.setItem('tram_current_step', 'intro'); } catch {}
    set({
      currentStep: 'intro',
      currentQuestionIndex: 0,
      answers: {},
      selectedOptionValue: null,
      isTransitioning: false,
      results: null
    });
  },

  // Xuất file CSV chuẩn SPSS cho nghiên cứu
  exportSPSS: () => {
    const { history, answers, results } = get();
    exportToCSV(history, answers, results);
  }
}));
