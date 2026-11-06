import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSurveyStore } from '../store/useSurveyStore';

// Quét danh sách tài khoản từng đăng nhập / lưu dữ liệu trên trình duyệt này
const getSavedAccountsList = () => {
  const list = [];
  const seen = new Set();
  try {
    let accMap = {};
    try {
      accMap = JSON.parse(localStorage.getItem('tram_accounts') || '{}') || {};
    } catch {
      accMap = {};
    }

    // 1. Quét toàn bộ bản lưu khu vườn tram_chua_lanh_save_*
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('tram_chua_lanh_save_')) {
        const id = k.replace('tram_chua_lanh_save_', '');
        if (!id || seen.has(id)) continue;
        try {
          const data = JSON.parse(localStorage.getItem(k) || 'null');
          if (!data) continue;
          const accInfo = accMap[id] || {};
          const exp = data.inventory?.exp || 0;
          const growth = data.growth || 0;
          const logs = (data.journeyHistory || []).length;
          // Nếu là 'guest' mà hoàn toàn trống rỗng và có tài khoản khác thì vẫn hiển thị nếu có tiến trình
          if (id === 'guest' && exp === 0 && growth === 0 && logs === 0) continue;

          seen.add(id);
          list.push({
            id,
            name: data.profileName && data.profileName !== 'Trạm Trưởng'
              ? data.profileName
              : (accInfo.name || data.profileName || id),
            img: data.profileAvatar || accInfo.img || '/assets/avatars/chibi-daisy-girl.svg',
            icon: accInfo.icon || '👩‍🌾',
            exp,
            growth,
            logs,
            uid: data.playerUID || ''
          });
        } catch {}
      }
    }

    // 2. Bổ sung các tài khoản có trong tram_accounts nhưng chưa có key save riêng
    Object.keys(accMap).forEach((id) => {
      if (!seen.has(id)) {
        seen.add(id);
        const accInfo = accMap[id];
        list.push({
          id,
          name: accInfo.name || id,
          img: accInfo.img || '/assets/avatars/chibi-daisy-girl.svg',
          icon: accInfo.icon || '👩‍🌾',
          exp: 0,
          growth: 0,
          logs: 0,
          uid: ''
        });
      }
    });
  } catch {}

  return list.sort((a, b) => b.exp - a.exp);
};

// Modal Đăng nhập / OTP dùng chung (Landing Page + Dashboard). State nằm trong useSurveyStore.
export const AuthModal = () => {
  const showAuthModal = useSurveyStore((s) => s.showAuthModal);
  const authType = useSurveyStore((s) => s.authType);
  const setAuthType = useSurveyStore((s) => s.setAuthType);
  const closeAuth = useSurveyStore((s) => s.closeAuth);
  const login = useSurveyStore((s) => s.login);
  const sessionKey = useSurveyStore((s) => s.sessionKey);

  const [authInput, setAuthInput] = useState('');
  const [otp, setOtp] = useState('');
  const [sentCode, setSentCode] = useState(null);
  const [error, setError] = useState('');
  const [savedAccounts, setSavedAccounts] = useState([]);

  // Reset form & quét lại danh sách người từng dùng mỗi lần mở modal
  useEffect(() => {
    setAuthInput('');
    setOtp('');
    setSentCode(null);
    setError('');
    if (showAuthModal) {
      setSavedAccounts(getSavedAccountsList());
    }
  }, [showAuthModal, authType]);

  const validateInput = () => {
    const v = authInput.trim();
    if (authType === 'phone') return /^0\d{9}$/.test(v.replace(/\s/g, ''));
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const handleSendCode = () => {
    if (!validateInput()) {
      setError(authType === 'phone' ? 'Số điện thoại chưa đúng (10 số, bắt đầu bằng 0).' : 'Email chưa đúng định dạng.');
      return;
    }
    // Demo: chưa có backend gửi OTP thật -> sinh mã giả lập hiển thị tại chỗ
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setSentCode(code);
    setError('');
  };

  const handleLogin = () => {
    if (!validateInput()) { setError('Vui lòng nhập thông tin hợp lệ.'); return; }
    if (!sentCode) { setError('Hãy bấm "Nhận mã" trước nhé.'); return; }
    if (otp.trim() !== sentCode) { setError('Mã OTP chưa đúng.'); return; }
    login(authInput.trim().replace(/\s/g, ''));
  };

  const handleQuickLogin = (accId) => {
    login(accId);
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-8 rounded-[32px] w-full max-w-sm shadow-2xl relative overflow-hidden border-4 border-white max-h-[90vh] overflow-y-auto">
            {/* Nút Đóng */}
            <button onClick={closeAuth} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 font-black transition-colors">✕</button>

            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner border-2 border-white">🏡</div>
            <h2 className="font-black text-2xl text-slate-800 mb-1">Ghé thăm Trạm</h2>
            <p className="text-xs font-medium text-slate-500 mb-5">Đăng nhập để đồng bộ khu vườn của bạn trên mọi thiết bị nhé.</p>

            {/* DANH SÁCH TÀI KHOẢN TỪNG DÙNG TRÊN MÁY NÀY (1-CLICK LOGIN) */}
            {savedAccounts.length > 0 && (
              <div className="mb-5 text-left">
                <p className="text-[10px] font-black text-pink-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <span>👤</span> Tài khoản từng dùng trên máy này ({savedAccounts.length})
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {savedAccounts.map((acc) => {
                    const isCurrent = sessionKey === acc.id;
                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => handleQuickLogin(acc.id)}
                        className={`w-full p-2.5 rounded-2xl border flex items-center justify-between gap-2.5 transition-all text-left cursor-pointer ${
                          isCurrent
                            ? 'bg-pink-50/90 border-pink-300 shadow-xs'
                            : 'bg-slate-50/80 hover:bg-pink-50/50 border-slate-200 hover:border-pink-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-white border border-pink-100 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                            <img
                              src={acc.img}
                              alt={acc.name}
                              className="w-full h-full object-contain"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-black text-slate-800 truncate">
                              {acc.name} {acc.id === 'guest' ? '(Khách)' : ''}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 truncate">
                              {acc.id !== 'guest' ? `${acc.id} • ` : ''}⭐ {acc.exp} EXP • 🌱 {acc.growth}%
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-pink-600 bg-white px-2.5 py-1 rounded-xl border border-pink-200 shrink-0">
                          {isCurrent ? 'Đang dùng' : 'Vào ngay ➔'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="relative flex py-2 items-center mt-3">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-2 text-[10px] font-bold text-slate-400 uppercase">Hoặc đăng nhập TK khác</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>
              </div>
            )}

            {/* Tabs Email / Phone */}
            <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
              <button onClick={() => setAuthType('phone')} className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${authType === 'phone' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>📱 Số ĐT</button>
              <button onClick={() => setAuthType('email')} className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${authType === 'email' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>✉️ Email</button>
            </div>

            <div className="space-y-4 mb-6 text-left">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">{authType === 'phone' ? 'Số điện thoại' : 'Địa chỉ Email'}</label>
                <input value={authInput} onChange={(e) => setAuthInput(e.target.value)} type={authType === 'phone' ? 'tel' : 'email'} placeholder={authType === 'phone' ? 'Nhập SĐT (VD: 09xx...)' : 'nhap@email.com'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:border-pink-300 focus:bg-white focus:shadow-sm transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Mã xác nhận (OTP)</label>
                <div className="flex gap-2">
                  <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} type="text" placeholder="XXXXXX" maxLength={6} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:border-pink-300 focus:bg-white focus:shadow-sm tracking-widest text-center" />
                  <button onClick={handleSendCode} className="bg-slate-800 text-white font-bold text-xs px-4 rounded-xl hover:bg-slate-700 hover:shadow-md transition-all whitespace-nowrap">Nhận mã</button>
                </div>
                {sentCode && <p className="text-[10px] font-bold text-emerald-600 mt-2">Mã demo của bạn: <span className="tracking-widest">{sentCode}</span></p>}
              </div>
              {error && <p className="text-[11px] font-bold text-rose-500 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">{error}</p>}
            </div>

            <button onClick={handleLogin} className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-black py-4 rounded-2xl shadow-lg shadow-pink-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              Vào khu vườn ngay <span className="text-lg">✨</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
