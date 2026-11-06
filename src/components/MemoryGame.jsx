import React, { useState, useEffect, useCallback } from 'react';

// Định nghĩa bộ thẻ 2D chữa lành với hình ảnh minh họa cắt từ Bộ Thẻ Bài Chữa Lành + Emoji đáng yêu
const CARD_DATA = [
  { id: 'sprout', emoji: '🌱', label: 'Mầm nhỏ', img: '/assets/cards/sprout.png?v=4' },
  { id: 'monstera', emoji: '🪴', label: 'Cây trong nhà', img: '/assets/cards/monstera.png?v=4' },
  { id: 'cactus', emoji: '🌵', label: 'Xương rồng', img: '/assets/cards/cactus.png?v=4' },
  { id: 'pine', emoji: '🌲', label: 'Thông xanh', img: '/assets/cards/pine.png?v=4' },
  { id: 'apple', emoji: '🍎', label: 'Táo đỏ', img: '/assets/cards/apple.png?v=4' },
  { id: 'strawberry', emoji: '🍓', label: 'Dâu tây', img: '/assets/cards/strawberry.png?v=4' },
  { id: 'watermelon', emoji: '🍉', label: 'Dưa hấu', img: '/assets/cards/watermelon.png?v=4' },
  { id: 'avocado', emoji: '🥑', label: 'Bơ béo', img: '/assets/cards/avocado.png?v=4' },
  { id: 'sunflower', emoji: '🌻', label: 'Hướng dương', img: '/assets/cards/sunflower.png?v=4' },
  { id: 'cherry_blossom', emoji: '🌸', label: 'Anh đào', img: '/assets/cards/cherry_blossom.png?v=4' },
  { id: 'rose', emoji: '🌹', label: 'Hồng thắm', img: '/assets/cards/rose.png?v=4' },
  { id: 'lotus', emoji: '🪷', label: 'Hoa sen', img: '/assets/cards/lotus.png?v=4' },
  { id: 'hamster', emoji: '🐹', label: 'Chuột béo', img: '/assets/cards/hamster.png?v=4' },
  { id: 'teddy', emoji: '🧸', label: 'Gấu bông', img: '/assets/cards/teddy.png?v=4' },
  { id: 'kitten', emoji: '🐱', label: 'Mèo con', img: '/assets/cards/kitten.png?v=4' },
  { id: 'bunny', emoji: '🐰', label: 'Thỏ bông', img: '/assets/cards/bunny.png?v=4' },
  { id: 'fox', emoji: '🦊', label: 'Cáo nhỏ', img: '/assets/cards/fox.png?v=4' },
  { id: 'panda', emoji: '🐼', label: 'Gấu trúc', img: '/assets/cards/panda.png?v=4' },
  { id: 'pine_cone', emoji: '🌲', label: 'Cây thông', img: '/assets/cards/pine_cone.png?v=4' },
  { id: 'puppy', emoji: '🐶', label: 'Cún nhỏ' },
  { id: 'koala', emoji: '🐨', label: 'Koala' },
  { id: 'chick', emoji: '🐥', label: 'Gà con' },
  { id: 'penguin', emoji: '🐧', label: 'Cánh cụt' },
  { id: 'hedgehog', emoji: '🦔', label: 'Nhím nhỏ' },
  { id: 'squirrel', emoji: '🐿️', label: 'Sóc nhỏ' },
  { id: 'deer', emoji: '🦌', label: 'Nai tơ' },
  { id: 'turtle', emoji: '🐢', label: 'Rùa con' },
  { id: 'butterfly', emoji: '🦋', label: 'Bướm hoa' },
  { id: 'citrus', emoji: '🍊', label: 'Cam ngọt' },
  { id: 'flower_pot', emoji: '🏵️', label: 'Cúc vạn thọ' }
];

const LEVEL_CONFIG = [
  { level: 1, pairs: 2, cols: 2 }, { level: 2, pairs: 3, cols: 3 }, { level: 3, pairs: 4, cols: 4 },
  { level: 4, pairs: 5, cols: 5 }, { level: 5, pairs: 6, cols: 4 }, { level: 6, pairs: 7, cols: 4 },
  { level: 7, pairs: 8, cols: 4 }, { level: 8, pairs: 9, cols: 6 }, { level: 9, pairs: 10, cols: 5 },
  { level: 10, pairs: 11, cols: 6 }, { level: 11, pairs: 12, cols: 6 }, { level: 12, pairs: 13, cols: 7 },
  { level: 13, pairs: 14, cols: 7 }, { level: 14, pairs: 15, cols: 6 }, { level: 15, pairs: 16, cols: 8 },
  { level: 16, pairs: 18, cols: 6 }, { level: 17, pairs: 20, cols: 8 }, { level: 18, pairs: 22, cols: 8 },
  { level: 19, pairs: 24, cols: 8 }, { level: 20, pairs: 26, cols: 10 }, { level: 21, pairs: 28, cols: 8 },
  { level: 22, pairs: 30, cols: 10 }
];

export default function MemoryGame({ onWinRewards, onClose }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    const savedLevel = localStorage.getItem('memoryGameLevel');
    if (savedLevel) setCurrentLevel(parseInt(savedLevel, 10));
  }, []);

  const playPingSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.log('Chưa bật âm thanh');
    }
  };

  const initGame = useCallback((levelIndex) => {
    const config = LEVEL_CONFIG[levelIndex - 1] || LEVEL_CONFIG[21];
    // Ưu tiên chọn nhóm thẻ có hình minh họa 2D trước, nếu level > 19 cặp thì lấy thêm thẻ emoji
    const illustratedCards = CARD_DATA.filter(c => c.img).sort(() => 0.5 - Math.random());
    const extraCards = CARD_DATA.filter(c => !c.img).sort(() => 0.5 - Math.random());
    const pool = [...illustratedCards, ...extraCards];
    const selectedPairs = pool.slice(0, config.pairs);

    const gameCards = [...selectedPairs, ...selectedPairs]
      .sort(() => 0.5 - Math.random())
      .map((item, index) => ({
        id: index,
        key: item.id,
        emoji: item.emoji,
        label: item.label,
        img: item.img || null,
        isFlipped: false,
        isMatched: false
      }));

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setShowPopup(false);
    setIsLocked(false);
  }, []);

  useEffect(() => {
    initGame(currentLevel);
  }, [currentLevel, initGame]);

  const handleCardClick = (index) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = cards.map(c => ({ ...c }));
    newCards[index].isFlipped = true;
    setCards(newCards);

    const nextFlipped = [...flippedCards, index];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = nextFlipped;

      if (newCards[firstIndex].key === newCards[secondIndex].key) {
        playPingSound();
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        const nextPairsCount = matchedPairs + 1;
        setMatchedPairs(nextPairsCount);
        setFlippedCards([]);
        setIsLocked(false);

        const config = LEVEL_CONFIG[currentLevel - 1] || LEVEL_CONFIG[21];
        if (nextPairsCount === config.pairs) {
          setTimeout(() => {
            handleWinLevel();
          }, 500);
        }
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map((c, idx) =>
              idx === firstIndex || idx === secondIndex ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const handleWinLevel = () => {
    let earned = { water: 0, soil: 0, scissors: 0, exp: 0 };
    if (currentLevel <= 7) earned = { water: 1, soil: 0, scissors: 0, exp: 10 };
    else if (currentLevel <= 14) earned = { water: 2, soil: 1, scissors: 0, exp: 25 };
    else earned = { water: 4, soil: 2, scissors: 2, exp: 60 };

    setRewards(earned);
    setShowPopup(true);
    if (onWinRewards) onWinRewards(earned);

    const nextLvl = Math.min(currentLevel + 1, 22);
    localStorage.setItem('memoryGameLevel', nextLvl);
  };

  const nextLevel = () => {
    if (currentLevel >= 22) {
      initGame(22);
    } else {
      setCurrentLevel((prev) => Math.min(prev + 1, 22));
    }
  };

  const currentConfig = LEVEL_CONFIG[currentLevel - 1] || LEVEL_CONFIG[21];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 sm:p-5 font-sans overflow-hidden">
      {/* CSS 3D chuẩn xác cho hiệu ứng Lật bài */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .card-inner { transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
      ` }} />

      {/* Container chính to lớn và cân đối */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-4 sm:p-7 shadow-2xl relative flex flex-col items-center">
        {/* Nút Đóng (Tắt game) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-red-50 text-gray-500 hover:text-red-500 w-10 h-10 rounded-full flex items-center justify-center shadow transition-colors cursor-pointer"
          >
            ✕
          </button>
        )}

        {/* Tiêu đề & Thông số Level */}
        <div className="mb-4 sm:mb-6 text-center select-none mt-2">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 tracking-wide flex items-center gap-2 justify-center">
            <span>🎮 Lật Thẻ Tìm Cặp Chữa Lành</span>
            <img src="/assets/mascot/mascot-happy.png" alt="Bé Chuột" className="w-8 h-8 object-contain inline-block drop-shadow-xs" />
          </h2>
          <div className="mt-1 flex items-center gap-3 justify-center">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full">
              Level {currentLevel} / 22
            </span>
            <span className="text-sm text-gray-500 font-medium">
              Tìm đủ {currentConfig.pairs} cặp
            </span>
          </div>
        </div>

        {/* Khung Bàn Chơi Game */}
        <div
          className="grid gap-2 sm:gap-3 mx-auto w-fit py-2 px-1"
          style={{ gridTemplateColumns: `repeat(${currentConfig.cols}, minmax(0, max-content))` }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="perspective-1000 w-[65px] h-[65px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] relative cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className={`w-full h-full transform-style-3d card-inner relative ${(card.isFlipped || card.isMatched) ? 'rotate-y-180' : ''}`}>
                {/* MẶT ĐẦU TIÊN (Trước khi lật) - Hình Bé Chuột AI Chibi */}
                <div className="absolute top-0 left-0 w-full h-full box-border rounded-2xl shadow-sm hover:shadow-md overflow-hidden flex flex-col items-center justify-center backface-hidden border-2 border-emerald-300 bg-gradient-to-b from-emerald-100 to-emerald-200 hover:brightness-105 active:scale-95 transition-all select-none p-1.5">
                  <img
                    src="/assets/mascot/mascot-happy.png"
                    alt="Bé Chuột AI"
                    draggable={false}
                    className="w-full h-full object-contain drop-shadow-sm pointer-events-none select-none"
                  />
                </div>

                {/* MẶT KHI LẬT LÊN - Chỉ hiển thị hình minh họa nguyên vẹn không bị lạm viền */}
                <div className={`absolute top-0 left-0 w-full h-full box-border bg-[#fbf4d9] rounded-2xl overflow-hidden flex items-center justify-center backface-hidden rotate-y-180 border-4 p-1.5 transition-all select-none ${card.isMatched ? 'border-yellow-400 shadow-md shadow-yellow-200' : 'border-emerald-200 shadow-sm'}`}>
                  {card.img ? (
                    <img
                      src={card.img}
                      alt={card.label}
                      draggable={false}
                      className="w-full h-full object-contain pointer-events-none select-none"
                    />
                  ) : (
                    <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-sm">{card.emoji}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Khi Thắng Lớn */}
        {showPopup && rewards && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative animate-scale-up">
              <div className="text-6xl sm:text-7xl mb-4 transform scale-100 animate-bounce">🐹</div>
              <h3 className="text-2xl font-black text-emerald-600 mb-2">Quá Đỉnh Luôn! 🎉</h3>
              <p className="text-gray-600 font-medium mb-5">Bạn đã xuất sắc vượt qua Level {currentLevel}</p>

              <div className="bg-emerald-50/80 rounded-2xl p-4 mb-6 text-sm text-left font-medium text-emerald-800 shadow-inner">
                <p className="text-center text-xs text-emerald-600 uppercase tracking-widest font-bold mb-3 border-b border-emerald-100 pb-2">Vật phẩm thu hoạch</p>
                <div className="flex gap-4 justify-center text-lg font-bold">
                  {rewards.water > 0 && <span className="flex items-center gap-1">💧 +{rewards.water}</span>}
                  {rewards.soil > 0 && <span className="flex items-center gap-1">🪴 +{rewards.soil}</span>}
                  {rewards.scissors > 0 && <span className="flex items-center gap-1">✂️ +{rewards.scissors}</span>}
                  <span className="text-amber-600 flex items-center gap-1">⭐ +{rewards.exp} EXP</span>
                </div>
              </div>

              <button
                onClick={nextLevel}
                className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                Tiến sang Level tiếp theo ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
