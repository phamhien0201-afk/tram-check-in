import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryGame from './MemoryGame';
import AnimatedMoodIcon from './AnimatedMoodIcon';
import GardenPotSvg from './GardenPotSvg';
import { useSurveyStore } from '../store/useSurveyStore';

import { 
  Droplet, Shovel, Scissors, CheckCircle, ListTodo, Sprout, 
  LayoutGrid, CalendarDays, User, Copy, ArrowLeft, Sparkles 
} from 'lucide-react';

const TASK_POOL = [
  { text: "Ăn sáng no bụng 🍳", reward: "water" },
  { text: "Uống đủ 2 lít nước 💧", reward: "water" },
  { text: "Ngủ đủ 7 tiếng 🛌", reward: "soil" },
  { text: "Ghi nhận 1 điều tích cực 🌻", reward: "scissors" },
  { text: "Đi dạo 15 phút 🚶‍♀️", reward: "water" },
  { text: "Đọc 10 trang sách 📖", reward: "soil" },
  { text: "Không MXH 1 tiếng trước khi ngủ 📵", reward: "scissors" },
  { text: "Nghe nhạc thư giãn 🎵", reward: "water" },
  { text: "Dọn dẹp góc học tập 🧹", reward: "soil" },
  { text: "Tập thể dục 10 phút 🧘", reward: "scissors" },
  { text: "Nhắn tin cho bạn bè 💌", reward: "water" },
  { text: "Hít thở 4-7-8 🌬️", reward: "soil" }
];

const HARVEST_MESSAGES = [
  "Bạn đã chăm sóc cái cây này rất tốt, giống như cách bạn đang chăm sóc bản thân mình vậy 💖",
  "Sự kiên nhẫn của bạn đã đơm hoa kết trái. Hôm nay bạn vất vả rồi! 🌸",
  "Một chu kỳ mới lại bắt đầu. Cứ chậm rãi tiến bước nhé, không cần vội đâu 🌱",
  "Cây đã lớn, và bạn cũng đã mạnh mẽ hơn rất nhiều. Tự thưởng cho mình một nụ cười nhé! 🫂",
  "Tuyệt vời! Mỗi cái cây lớn lên là một minh chứng cho sự nỗ lực mỗi ngày của bạn 🌻"
];

const MOODS_V2 = [
  { id: 'joy', img: '/assets/joy.svg', icon: '🥰', label: 'Vui vẻ', bg: 'bg-pink-100', border: 'border-pink-300', hoverClass: 'transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:rotate-12' },
  { id: 'peace', img: '/assets/peace.svg', icon: '😌', label: 'Bình yên', bg: 'bg-orange-100', border: 'border-orange-300', hoverClass: 'transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:rotate-12' },
  { id: 'normal', img: '/assets/normal.svg', icon: '😐', label: 'Bình thường', bg: 'bg-yellow-100', border: 'border-yellow-300', hoverClass: 'transition-all duration-300 hover:scale-110 hover:-rotate-6' },
  { id: 'worry', img: '/assets/worry.svg', icon: '😟', label: 'Lo lắng', bg: 'bg-emerald-100', border: 'border-emerald-300', hoverClass: 'transition-all duration-200 hover:scale-125' },
  { id: 'sad', img: '/assets/sad.svg', icon: '🥺', label: 'Buồn bã', bg: 'bg-blue-100', border: 'border-blue-300', hoverClass: 'transition-all duration-300 hover:scale-125 hover:translate-y-1' },
  { id: 'tired', img: '/assets/tired.svg', icon: '😪', label: 'Mệt mỏi', bg: 'bg-indigo-100', border: 'border-indigo-300', hoverClass: 'transition-all duration-300 hover:scale-125 hover:translate-y-1' },
  { id: 'angry', img: '/assets/angry.svg', icon: '😤', label: 'Khó chịu', bg: 'bg-red-100', border: 'border-red-300', hoverClass: 'transition-all duration-150 hover:scale-125' },
  { id: 'other', img: '/assets/other.svg', icon: '❔', label: 'Khác', bg: 'bg-slate-100', border: 'border-slate-300', hoverClass: 'transition-all duration-300 hover:scale-110 hover:-rotate-6' }
];

const THONG_DIEP_CHUA_LANH = [
  "Bạn xứng đáng được lắng nghe, kể cả từ chính mình.",
  "Mọi cảm xúc đều có thể được đón nhận.",
  "Những điều nhỏ bé cũng có thể làm nên một ngày đẹp.",
  "Hãy cho bản thân điều mình thực sự cần.",
  "Nỗ lực nhỏ vẫn là nỗ lực đáng ghi nhận.",
  "Hôm nay bạn đã làm rất tốt rồi, hãy tự hào nhé.",
  "Nghỉ ngơi một chút không có nghĩa là bạn đang bỏ cuộc.",
  "Mỗi bông hoa đều có thời điểm nở rộ của riêng mình.",
  "Đừng quá khắt khe với bản thân, bạn cũng đang học cách lớn lên mà.",
  "Chậm lại một nhịp để thấy mình vẫn đang hít thở bình yên.",
  "Không sao cả nếu hôm nay bạn chỉ muốn nằm ườn ra đó.",
  "Mọi cơn mưa rồi cũng sẽ tạnh, mây mù rồi sẽ tan.",
  "Bạn đang tiến lên phía trước, dù chỉ là những bước rất nhỏ.",
  "Hãy dịu dàng với chính mình như cách bạn đối xử với người bạn thân.",
  "Cho phép bản thân được buồn, vì đó cũng là một cách chữa lành.",
  "Giá trị của bạn không nằm ở việc bạn làm được bao nhiêu việc hôm nay.",
  "Hãy tưới nước cho khu vườn tâm hồn mình mỗi ngày nhé.",
  "Bạn không cần phải hoàn hảo để được yêu thương.",
  "Thở hắt ra một cái, trút bỏ bớt gánh nặng trên vai đi nào.",
  "Cảm ơn bạn vì hôm nay đã kiên cường đến vậy."
];

const CHALLENGE_POOL = [
  { id: 1, icon: '💧', label: 'Uống 1 ly nước đầy', duration: 15, prompt: 'Bạn đã uống chưa? Nhập "Đã uống" để nhận quà:', reward: '1 💧' },
  { id: 2, icon: '🌿', label: 'Nhắm mắt hít thở sâu', duration: 60, prompt: 'Nhập 1 từ mô tả cảm giác của bạn lúc này:', reward: '20 EXP' },
  { id: 3, icon: '🧘', label: 'Vươn vai thư giãn', duration: 30, prompt: 'Cơ thể bạn thấy sao rồi? Gõ vài chữ nhé:', reward: '1 ✂️' },
  { id: 4, icon: '📝', label: 'Nghĩ về 1 điều biết ơn', duration: 20, prompt: 'Hãy gõ điều bạn vừa nghĩ đến vào đây:', reward: '1 🪴' },
  { id: 5, icon: '👀', label: 'Nhìn ra xa 20 mét', duration: 20, prompt: 'Mắt bạn đã đỡ mỏi chưa? Nhập "Rồi" nhé:', reward: '10 EXP, 1 💧' }
];

const AMBIENT_SOUNDS = [
  { id: 'rain', icon: '🌧️', label: 'Mưa rơi', desc: 'Tiếng mưa rả rích bên hiên', url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' },
  { id: 'waves', icon: '🌊', label: 'Sóng biển', desc: 'Sóng vỗ bờ cát dịu êm', url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg' },
  { id: 'fire', icon: '🔥', label: 'Lửa trại', desc: 'Tiếng củi khô nổ lách tách', url: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg' },
  { id: 'forest', icon: '🍃', label: 'Rừng đêm', desc: 'Tiếng dế kêu và gió đêm thanh vắng', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1b0c9f0d8a.mp3' }
];

const ACHIEVEMENTS = [
  { id: 'b1', icon: '🌱', name: 'Mầm Xanh Đầu Tiên', desc: 'Hoàn thành hoạt động đầu tiên.', group: 'Khởi Đầu', target: 1, type: 'action', reward: '10 EXP' },
  { id: 'b2', icon: '👣', name: 'Bước Chân Kiên Định', desc: 'Hoàn thành 15 nhiệm vụ.', group: 'Khởi Đầu', target: 15, type: 'task', reward: '50 EXP, 2 💧' },
  { id: 'b3', icon: '🍃', name: 'Chiếc Lá Cảm Xúc', desc: 'Ghi lại cảm xúc lần đầu tiên.', group: 'Khám Phá', target: 1, type: 'journal', reward: '1 ✂️' },
  { id: 'b4', icon: '🎧', name: 'Lắng Nghe Bản Thân', desc: 'Ghi nhận cảm xúc 14 lần (2 tuần).', group: 'Khám Phá', target: 14, type: 'journal', reward: '100 EXP, 1 Chậu Gốm' },
  { id: 'b5', icon: '🪴', name: 'Bàn Tay Xanh', desc: 'Chăm sóc cây 20 lần.', group: 'Khu Vườn', target: 20, type: 'care', reward: '5 🪴' },
  { id: 'b6', icon: '🌻', name: 'Khu Vườn Bốn Mùa', desc: 'Cây phát triển trưởng thành 4 lần.', group: 'Khu Vườn', target: 4, type: 'mature', reward: 'Khung Avatar Đặc Quyền' }
];

// Điều kiện mở khóa động cho từng avatar (dựa trên mốc reqExp cũ để phân tầng độ khó)
const getAvatarReq = (a) => {
  if (a.reqType) return { type: a.reqType, val: a.reqVal || 0, msg: a.lockMsg || '' };
  const r = a.reqExp || 0;
  if (r === 0) return { type: 'free', val: 0, msg: 'Miễn phí' };
  if (r <= 150) return { type: 'exp', val: r * 4, msg: `${r * 4} EXP` };
  if (r <= 250) return { type: 'journal', val: r <= 200 ? 7 : 10, msg: `Viết nhật ký ${r <= 200 ? 7 : 10} lần` };
  if (r <= 350) return { type: 'care', val: r <= 300 ? 20 : 30, msg: `Chăm cây ${r <= 300 ? 20 : 30} lần` };
  if (r <= 450) return { type: 'mature', val: r <= 400 ? 3 : 4, msg: `Trồng ${r <= 400 ? 3 : 4} cây trưởng thành` };
  return { type: 'exp', val: 3000, msg: '3000 EXP' };
};

const AVATARS = [
  // --- HÀNG 1: 4 MẪU KHỞI ĐẦU & DỄ MỞ ---
  { id: 'avt_1', legacyId: 'chibi-daisy-girl', name: 'Bé Hoa Cúc', icon: '🌼', img: '/assets/avatars/chibi-daisy-girl.png', reqType: 'free', reqVal: 0, lockMsg: 'Mặc định', desc: 'Cúc họa mi ngây thơ trong sáng', category: 'chibi' },
  { id: 'avt_2', legacyId: 'chibi-frog-boy', name: 'Bé Ếch Xanh', icon: '🐸', img: '/assets/avatars/chibi-frog-boy.png', reqType: 'free', reqVal: 0, lockMsg: 'Mặc định', desc: 'Mũ ếch tinh nghịch & vui tính', category: 'chibi' },
  { id: 'avt_3', legacyId: 'chibi-white-kitty', name: 'Mèo Tuyết Mầm', icon: '🐱', img: '/assets/avatars/chibi-white-kitty.png', reqType: 'free', reqVal: 0, lockMsg: 'Mặc định', desc: 'Mèo trắng đội mầm lá dễ thương', category: 'chibi' },
  { id: 'avt_4', legacyId: 'chibi-sprout-bear', name: 'Gấu Nâu Mầm', icon: '🐻', img: '/assets/avatars/chibi-sprout-bear.png', reqType: 'free', reqVal: 0, lockMsg: 'Mặc định', desc: 'Ấm áp, thích ôm và bảo vệ khu vườn', category: 'chibi' },

  // --- HÀNG 2: MỐC SƠ CẤP (100 - 300 EXP / Nhiệm vụ nhẹ) ---
  { id: 'avt_5', legacyId: 'chibi-headphone-girl', name: 'Bé Tai Nghe Chill', icon: '🎧', img: '/assets/avatars/chibi-headphone-girl.png', reqType: 'exp', reqVal: 100, lockMsg: 'Đạt 100 EXP', desc: 'Lắng nghe những giai điệu êm dịu', category: 'chibi' },
  { id: 'avt_6', legacyId: 'chibi-coffee-boy', name: 'Bé Cà Phê Sáng', icon: '☕', img: '/assets/avatars/chibi-coffee-boy.png', reqType: 'task', reqVal: 3, lockMsg: 'Xong 3 nhiệm vụ', desc: 'Trầm ấm & thích đọc sách yên tĩnh', category: 'chibi' },
  { id: 'avt_7', legacyId: 'chibi-bunny-heart', name: 'Bé Thỏ Yêu Thương', icon: '🐰', img: '/assets/avatars/chibi-bunny-heart.png', reqType: 'journal', reqVal: 2, lockMsg: 'Viết NK 2 ngày', desc: 'Trái tim ngọt ngào lan tỏa niềm vui', category: 'chibi' },
  { id: 'avt_8', legacyId: 'chibi-panda-bamboo', name: 'Gấu Trúc Thảnh Thơi', icon: '🐼', img: '/assets/avatars/chibi-panda-bamboo.png', reqType: 'exp', reqVal: 250, lockMsg: 'Đạt 250 EXP', desc: 'Ăn no ngủ say, không âu lo phiền muộn', category: 'chibi' },

  // --- HÀNG 3: MỐC TRUNG CẤP (400 - 800 EXP / Chăm chỉ) ---
  { id: 'avt_9', name: 'Cáo Nhỏ Mùa Thu', icon: '🦊', img: '/assets/avatars/chibi-calico-cat.png', reqType: 'care', reqVal: 8, lockMsg: 'Chăm cây 8 lần', desc: 'Dịu dàng sưởi ấm những ngày thu', category: 'chibi' },
  { id: 'avt_10', name: 'Cún Bông Tươi Tỉnh', icon: '🐶', img: '/assets/avatars/chibi-glasses-boy.png', reqType: 'exp', reqVal: 450, lockMsg: 'Đạt 450 EXP', desc: 'Năng lượng tích cực mỗi sớm mai', category: 'chibi' },
  { id: 'avt_11', name: 'Hamster Má Phính', icon: '🐹', img: '/assets/avatars/chibi-camera-girl.png', reqType: 'journal', reqVal: 5, lockMsg: 'Viết NK 5 ngày', desc: 'Lưu giữ mọi khoảnh khắc đáng yêu', category: 'chibi' },
  { id: 'avt_12', name: 'Bé Mây Mơ Màng', icon: '☁️', img: '/assets/avatars/chibi-cloud-boy.png', reqType: 'exp', reqVal: 700, lockMsg: 'Đạt 700 EXP', desc: 'Bồng bềnh trôi giữa bầu trời xanh', category: 'chibi' },

  // --- HÀNG 4: MỐC CAO CẤP / HIẾM (1000+ EXP & Thành tựu lớn) ---
  { id: 'avt_13', name: 'Sóc Nhỏ Nhặt Hạt', icon: '🐿️', img: '/assets/avatars/chibi-twintail-girl.png', reqType: 'task', reqVal: 12, lockMsg: 'Xong 12 nhiệm vụ', desc: 'Chăm chỉ tích lũy từng niềm vui nhỏ', category: 'chibi' },
  { id: 'avt_14', name: 'Thiên Thần Nắng Ấm', icon: '🌻', img: '/assets/avatars/chibi-strawhat-girl.png', reqType: 'exp', reqVal: 1000, lockMsg: 'Đạt 1000 EXP', desc: 'Rực rỡ tỏa nắng giữa vườn hoa cúc', category: 'chibi' },
  { id: 'avt_15', name: 'Tinh Linh Hoa Đào', icon: '🌸', img: '/assets/avatars/chibi-hoodie-boy.png', reqType: 'mature', reqVal: 2, lockMsg: 'Thu hoạch 2 cây', desc: 'Thanh thoát đón gió xuân dịu êm', category: 'chibi' },
  { id: 'avt_16', name: 'Thủ Lĩnh Khu Vườn', icon: '👑', img: '/assets/avatars/chibi-plant-lover.png', reqType: 'exp', reqVal: 1500, lockMsg: 'Đạt 1500 EXP', desc: 'Người bảo hộ tối cao của khu vườn chữa lành', category: 'chibi' }
];
const AVATARS_LIST = AVATARS;

// Template dữ liệu mặc định của một khu vườn
const PLANT_COLLECTION = [
  { 
    id: 'seed_1', 
    name: 'Cà Chua Đỏ Mọng', 
    icon: '🍅', 
    reqExp: 0, 
    harvestExp: 100,
    growthRate: 1.0,
    rarity: 'Khởi Đầu',
    desc: 'Khởi đầu bình yên, sai trĩu quả ngọt',
    sheet: '/assets/plants/tomato.jpg',
    layout: 'single-row',
    previewImg: '/assets/plants/stages/seed_1_h4.png'
  },
  { 
    id: 'cactus', 
    name: 'Xương Rồng Sa Mạc', 
    icon: '🌵', 
    reqExp: 150, 
    harvestExp: 130,
    growthRate: 0.9,
    rarity: 'Khởi Đầu',
    desc: 'Kiên cường vượt khó giữa nắng gió',
    sheet: '/assets/plants/cactus.jpg',
    layout: 'single-row',
    previewImg: '/assets/plants/stages/cactus_h4.png'
  },
  { 
    id: 'succulent', 
    name: 'Sen Đá Sương Mai', 
    icon: '🪴', 
    reqExp: 400, 
    harvestExp: 160,
    growthRate: 0.85,
    rarity: 'Bền Bỉ',
    desc: 'Tích tụ bình yên qua từng chiếc lá mọng nước',
    sheet: '/assets/plants/succulent.jpg',
    layout: 'single-row',
    previewImg: '/assets/plants/stages/succulent_h4.png'
  },
  { 
    id: 'sunflower', 
    name: 'Hướng Dương Rực Rỡ', 
    icon: '🌻', 
    reqExp: 800, 
    harvestExp: 200,
    growthRate: 0.75,
    rarity: 'Bền Bỉ',
    desc: 'Luôn rực rỡ hướng về phía ánh sáng',
    sheet: '/assets/plants/sunflower.jpg',
    layout: 'two-rows',
    previewImg: '/assets/plants/stages/sunflower_h4.png'
  },
  { 
    id: 'lavender', 
    name: 'Oải Hương Tím', 
    icon: '🪻', 
    reqExp: 1400, 
    harvestExp: 240,
    growthRate: 0.7,
    rarity: 'Quý Hiếm',
    desc: 'Hương thơm dịu nhẹ xoa dịu mọi âu lo',
    sheet: '/assets/plants/lavender.jpg',
    layout: 'single-row',
    previewImg: '/assets/plants/stages/lavender_h4.png'
  },
  { 
    id: 'sakura', 
    name: 'Anh Đào Mùa Xuân', 
    icon: '🌸', 
    reqExp: 2200, 
    harvestExp: 300,
    growthRate: 0.6,
    rarity: 'Quý Hiếm',
    desc: 'Dịu dàng nở rộ chữa lành tâm hồn',
    sheet: '/assets/plants/sakura.jpg',
    layout: 'two-rows',
    previewImg: '/assets/plants/stages/sakura_h4.png'
  },
  { 
    id: 'lotus', 
    name: 'Sen Hồng Tịnh Tâm', 
    icon: '🪷', 
    reqExp: 3500, 
    harvestExp: 400,
    growthRate: 0.5,
    rarity: 'Sử Thi',
    desc: 'Thanh khiết vươn lên, giữ tâm trí tĩnh lặng',
    sheet: '/assets/plants/lotus.jpg',
    layout: 'two-rows',
    previewImg: '/assets/plants/stages/lotus_h4.png'
  },
  { 
    id: 'wish_tree', 
    name: 'Cây Nguyện Ước Ngân Hà', 
    icon: '🌳', 
    reqExp: 5000, 
    harvestExp: 600,
    growthRate: 0.4,
    rarity: 'Huyền Thoại',
    desc: 'Cổ thụ phát sáng lưu giữ mọi điều ước tốt lành',
    sheet: '/assets/plants/wishtree.jpg',
    layout: 'two-rows',
    previewImg: '/assets/plants/stages/wish_tree_h4.png'
  }
];

const SPRITE_COORDS = {
  seed_1: {
    healthyX: [4.5, 10.5, 18.5, 28.0, 41.5],
    witheredX: [57.5, 67.5, 78.5, 91.5],
    widthScale: '850%'
  },
  cactus: {
    healthyX: [6.0, 14.5, 24.0, 34.5, 47.0],
    witheredX: [61.0, 71.0, 81.0, 91.5],
    widthScale: '850%'
  },
  succulent: {
    healthyX: [4.5, 13.5, 23.5, 34.5, 47.5],
    witheredX: [60.5, 70.5, 81.0, 92.5],
    widthScale: '860%'
  },
  sunflower: {
    healthyX: [8.0, 26.0, 45.0, 65.0, 86.0],
    witheredX: [12.0, 38.0, 62.0, 86.0],
    widthScale: '520%'
  },
  lavender: {
    healthyX: [4.5, 13.0, 23.0, 35.0, 49.0],
    witheredX: [62.0, 71.5, 81.5, 93.0],
    widthScale: '850%'
  },
  sakura: {
    healthyX: [8.5, 22.0, 37.5, 55.0, 81.0],
    witheredX: [11.0, 32.0, 58.0, 84.0],
    widthScale: '480%'
  },
  lotus: {
    healthyX: [8.5, 25.0, 43.5, 64.0, 86.5],
    witheredX: [12.0, 35.0, 60.0, 85.5],
    widthScale: '510%'
  },
  wish_tree: {
    healthyX: [8.0, 23.0, 40.0, 58.5, 82.5],
    witheredX: [11.0, 32.5, 57.5, 83.5],
    widthScale: '490%'
  }
};

// Hàm tính giai đoạn của cây dựa vào % Tiến độ sinh trưởng (growth từ 0 -> 100)
const getPlantStageInfo = (growth, isWithered, plantId = 'seed_1') => {
  let healthyIdx = 0;
  if (growth >= 100) healthyIdx = 4;
  else if (growth >= 70) healthyIdx = 3;
  else if (growth >= 40) healthyIdx = 2;
  else if (growth >= 20) healthyIdx = 1;
  else healthyIdx = 0;

  let witheredIdx = 0;
  if (healthyIdx === 0) witheredIdx = 0;
  else if (healthyIdx === 1) witheredIdx = 1;
  else if (healthyIdx === 2 || healthyIdx === 3) witheredIdx = 2;
  else witheredIdx = 3;

  const stageNames = [
    'Giai đoạn 1/5 • Hạt giống',
    'Giai đoạn 2/5 • Nảy mầm',
    'Giai đoạn 3/5 • Cây non',
    'Giai đoạn 4/5 • Đang phát triển',
    'Giai đoạn 5/5 • Đơm hoa kết trái'
  ];

  const validIds = ['seed_1', 'cactus', 'succulent', 'sunflower', 'lavender', 'sakura', 'lotus', 'wish_tree'];
  const validId = validIds.includes(plantId) ? plantId : 'seed_1';
  const stageImage = isWithered
    ? `/assets/plants/stages/${validId}_w${witheredIdx}.png`
    : `/assets/plants/stages/${validId}_h${healthyIdx}.png`;

  return { healthyIdx, witheredIdx, label: stageNames[healthyIdx], stageImage };
};

// 1. Danh sách 6 Lá Bài Vũ Trụ (Daily Tarot)
const TAROT_CARDS = [
  { id: 'card_1', num: 'I', name: 'Hạt Mầm Hy Vọng', icon: '🌱', rarity: 'Bình Yên', exp: 20, water: 1, itemKey: null, msg: 'Mọi khởi đầu vĩ đại đều bắt nguồn từ một bước chân nhỏ bé hôm nay.' },
  { id: 'card_2', num: 'IV', name: 'Khu Vườn Tĩnh Lặng', icon: '🍃', rarity: 'Bình Yên', exp: 25, water: 1, itemKey: null, msg: 'Hãy cho phép tâm trí bạn được nghỉ ngơi dưới bóng râm của sự dịu dàng.' },
  { id: 'card_3', num: 'VII', name: 'Cơn Mưa Chữa Lành', icon: '🌧️', rarity: 'May Mắn', exp: 35, water: 2, itemKey: 'fertilizer', msg: 'Sau cơn mưa, đất trời sẽ lại trong trẻo và mầm xanh sẽ vươn cao hơn.' },
  { id: 'card_4', num: 'IX', name: 'Ánh Nắng Ban Mai', icon: '☀️', rarity: 'May Mắn', exp: 40, water: 1, itemKey: 'fertilizer', msg: 'Năng lượng tích cực đang hướng về phía bạn, hãy mỉm cười đón nhận nhé.' },
  { id: 'card_5', num: 'XIV', name: 'Ngôi Sao Dẫn Đường', icon: '🌟', rarity: 'Phước Lành', exp: 50, water: 2, itemKey: 'scissors', msg: 'Bạn đang đi đúng hướng rồi, đừng nghi ngờ những nỗ lực của bản thân.' },
  { id: 'card_6', num: 'XVII', name: 'Cổ Thụ Ngân Hà', icon: '🌌', rarity: 'Phước Lành', exp: 60, water: 2, itemKey: 'seed', msg: 'Vũ trụ gửi tặng bạn một ngày tràn ngập may mắn và bình yên sâu thẳm.' }
];

// 2. Danh sách 3 Khu Vườn Hàng Xóm NPC Mặc Định (Luôn ghé thăm được ngay)
const DEFAULT_NEIGHBORS = [
  { uid: 'GZ-MEO999', name: 'Tiệm Mèo Lười', avatar: '🐱', plantId: 'lavender', growth: 85, unlockedCount: 5, bio: 'Thích nghe tiếng mưa và trồng Oải Hương tím 🪻' },
  { uid: 'GZ-GAU888', name: 'Gấu Nâu Ấm Áp', avatar: '🐻', plantId: 'sakura', growth: 92, unlockedCount: 6, bio: 'Mỗi ngày một tách trà ấm dưới tán hoa Anh Đào 🌸' },
  { uid: 'GZ-THO777', name: 'Thỏ Trắng Mơ Màng', avatar: '🐰', plantId: 'lotus', growth: 65, unlockedCount: 7, bio: 'Đang kiên trì chăm sóc Sen Hồng Tịnh Tâm 🪷' }
];

// 3. Danh sách Sticker Động Viên khi sang thăm vườn bạn bè
const ENCOURAGE_STICKERS = [
  { id: 'st_1', icon: '🌻', text: 'Chúc bạn một ngày rực rỡ như hoa hướng dương!' },
  { id: 'st_2', icon: '🌧️', text: 'Mệt thì nghỉ một chút nhé, mọi chuyện rồi sẽ ổn thôi.' },
  { id: 'st_3', icon: '🌱', text: 'Khu vườn của bạn đẹp lắm, cùng cố gắng mỗi ngày nha!' },
  { id: 'st_4', icon: '☕', text: 'Gửi bạn một tách trà ấm và thật nhiều bình yên.' }
];

// 4. Danh sách Chủ đề Bầu Trời (Garden Themes) & Đế Chậu (Pot Styles)
const GARDEN_THEMES = [
  { 
    id: 'morning', 
    name: 'Nắng Sớm Ban Mai', 
    icon: '🌤️', 
    reqExp: 0, 
    bgClass: 'bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 border-sky-200', 
    badge: 'Mặc định',
    isDark: false
  },
  { 
    id: 'sunset', 
    name: 'Hoàng Hôn Tím Hồng', 
    icon: '🌇', 
    reqExp: 300, 
    bgClass: 'bg-gradient-to-b from-indigo-400 via-rose-300 to-amber-200 border-rose-300', 
    badge: '300 EXP',
    isDark: false
  },
  { 
    id: 'rainy', 
    name: 'Mưa Phùn Chữa Lành', 
    icon: '🌧️', 
    reqExp: 600, 
    bgClass: 'bg-gradient-to-b from-slate-400 via-sky-200 to-teal-100 border-sky-300', 
    badge: '600 EXP',
    isDark: false
  },
  { 
    id: 'night', 
    name: 'Đêm Sao Lấp Lánh', 
    icon: '🌌', 
    reqExp: 1000, 
    bgClass: 'bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-900 border-indigo-400 text-white', 
    badge: '1000 EXP', 
    isDark: true 
  }
];

const POT_STYLES = [
  { id: 'natural', name: 'Mô Đất Tự Nhiên', icon: '🌱', reqExp: 0, badge: 'Mặc định' },
  { id: 'pot_dreamy', name: 'Chậu Trăng Sao Pastel', icon: '🌙', img: '/assets/pots/pot_dreamy.png', reqExp: 0, badge: 'Miễn phí' },
  { id: 'pot_knit_heart', name: 'Chậu Len Đan Trái Tim', icon: '🧶', img: '/assets/pots/pot_knit_heart.png', reqExp: 0, badge: 'Miễn phí' },
  { id: 'pot_mint_floral', name: 'Chậu Hoa Nhí Mùa Xuân', icon: '🌸', img: '/assets/pots/pot_mint_floral.png', reqExp: 100, badge: '100 EXP' },
  { id: 'pot_sun_clay', name: 'Chậu Gốm Mặt Trời', icon: '☀️', img: '/assets/pots/pot_sun_clay.png', reqExp: 200, badge: '200 EXP' },
  { id: 'pot_wood_bark', name: 'Chậu Vân Gỗ Mộc', icon: '🪵', img: '/assets/pots/pot_wood_bark.png', reqExp: 300, badge: '300 EXP' },
  { id: 'pot_star_cloud', name: 'Chậu Mây Ngàn Sao', icon: '☁️', img: '/assets/pots/pot_star_cloud.png', reqExp: 450, badge: '450 EXP' },
  { id: 'pot_constellation', name: 'Chậu Chòm Sao Đêm', icon: '🌌', img: '/assets/pots/pot_constellation.png', reqExp: 600, badge: '600 EXP' },
  { id: 'pot_woven_basket', name: 'Chậu Mây Đan Thủ Công', icon: '🧺', img: '/assets/pots/pot_woven_basket.png', reqExp: 750, badge: '750 EXP' },
  { id: 'pot_pearl_feather', name: 'Chậu Ngọc Trai Lông Vũ', icon: '🪶', img: '/assets/pots/pot_pearl_feather.png', reqExp: 900, badge: '900 EXP' },
  { id: 'pot_geo_cube', name: 'Chậu Khối Hình Học', icon: '💠', img: '/assets/pots/pot_geo_cube.png', reqExp: 1100, badge: '1100 EXP' },
  { id: 'pot_oak_forest', name: 'Chậu Rừng Sồi Cổ Thụ', icon: '🍃', img: '/assets/pots/pot_oak_forest.png', reqExp: 1350, badge: '1350 EXP' },
  { id: 'pot_amethyst_geode', name: 'Chậu Thạch Anh Tím', icon: '🔮', img: '/assets/pots/pot_amethyst_geode.png', reqExp: 1600, badge: '1600 EXP' },
  { id: 'terracotta', name: 'Chậu Đất Nung', icon: '🏺', reqExp: 200, badge: '200 EXP' },
  { id: 'ceramic', name: 'Chậu Sứ Chấm Bi', icon: '🍵', reqExp: 500, badge: '500 EXP' },
  { id: 'cat_pot', name: 'Chậu Mèo Lười', icon: '🐱', reqExp: 900, badge: '900 EXP' }
];

// Template dữ liệu mặc định của một khu vườn
const DEFAULT_DATA = {
  inventory: { water: 5, soil: 2, scissors: 1, exp: 0 },
  journeyHistory: [],
  userStats: { action: 0, task: 0, journal: 0, care: 0, mature: 0 },
  unlockedBadges: [],
  lastCheckInDate: null,
  growth: 0,
  isWithered: false,
  journeyDay: 1,
  // BỔ SUNG CÁC TRƯỜNG DỮ LIỆU MỚI ĐỂ KHÔNG BỊ MẤT KHI ĐĂNG NHẬP LẠI:
  futureLetters: [],                 // Lưu danh sách thư gửi tương lai
  unlockedPlants: ['seed_1'],        // Lưu danh sách ID các cây đã mở khóa trong Bộ sưu tập
  currentPlantId: 'seed_1',          // Giống cây đang trồng trên vườn
  collectedTreesCount: 1,            // Số lượng cây đã sưu tầm
  dailyTasksDate: null,              // Ngày thực hiện Checklist gần nhất
  completedTasksToday: [],           // Danh sách ID các task đã hoàn thành trong ngày hôm đó
  dailyChallengeCompletedDate: null, // Ngày hoàn thành Thử thách hằng ngày
  lastTarotDate: null,               // Ngày rút bài Tarot gần nhất
  todayTarotCard: null,              // Lá bài Tarot đã rút trong ngày
  neighborWaterDate: null,           // Ngày tưới nước hộ hàng xóm gần nhất
  wateredNeighborsToday: [],         // Danh sách UID hàng xóm đã tưới trong ngày
  inboxStickers: [],                 // Lời nhắn ấm áp nhận được từ bạn bè
  gardenTheme: 'morning',            // Chủ đề bầu trời khu vườn
  potStyle: 'natural',               // Kiểu chậu cây đang dùng
  profileName: 'Trạm Trưởng',
  profileAvatar: '/assets/avatars/chibi-daisy-girl.png',
  selectedAvatarId: 'chibi-daisy-girl'
};

// Tự động thử tải lại ảnh từ các thư mục dự phòng (/assets/plants/stages/, /stages/, /) nếu đường dẫn chính chưa có trên host
const tryFallbackStageImg = (e) => {
  const el = e?.currentTarget || e?.target;
  if (!el) return false;
  const src = el.getAttribute('src') || '';
  let cleanFile = src.split('/').pop()?.split('?')[0] || '';
  if (!cleanFile) return false;
  if (cleanFile === 'chibi-daisy-girl.svg') cleanFile = 'chibi-daisy-girl.png';
  const step = Number(el.dataset.triedStageFallback || '0');
  const candidates = [
    `/assets/plants/stages/${cleanFile}`,
    `/stages/${cleanFile}`,
    `/assets/avatars/${cleanFile}`,
    `/assets/mascot/${cleanFile}`,
    `/assets/tools/${cleanFile}`,
    `/assets/cards/${cleanFile}`,
    `/${cleanFile}`
  ].filter((c) => c !== src);
  if (step < candidates.length) {
    el.dataset.triedStageFallback = String(step + 1);
    el.src = candidates[step];
    return true;
  }
  return false;
};

export const Dashboard = () => {
  const { setStep, backToReceipt, results, isLoggedIn, sessionKey, currentUser, openAuth, setCurrentUser, logout } = useSurveyStore();
  const [activeTab, setActiveTab] = useState('care'); 

  // Đọc đồng bộ dữ liệu đã lưu từ localStorage ngay khi khởi tạo để F5 / HMR không bao giờ bị reset về 0
  const initialSave = (() => {
    try {
      const activeId = sessionKey || localStorage.getItem('tram_current_session') || 'guest';
      const raw = localStorage.getItem(`tram_chua_lanh_save_${activeId}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();
  const initialToday = new Date().toLocaleDateString('vi-VN');

  const [growth, setGrowth] = useState(() => initialSave?.growth ?? 0);
  const [daysNeglected, setDaysNeglected] = useState(0);
  const [isWithered, setIsWithered] = useState(() => initialSave?.isWithered ?? false);
  const [inventory, setInventory] = useState(() => initialSave?.inventory || { water: 5, soil: 2, scissors: 1, exp: 0 });
  const [currentPlantId, setCurrentPlantId] = useState(() => initialSave?.currentPlantId || initialSave?.equippedPlant || 'seed_1');
  const [unlockedPlants, setUnlockedPlants] = useState(() => initialSave?.unlockedPlants || ['seed_1']);
  const [completedTasksToday, setCompletedTasksToday] = useState(() => (initialSave?.dailyTasksDate === initialToday ? (initialSave?.completedTasksToday || []) : []));
  const [dailyTasksDate, setDailyTasksDate] = useState(() => initialSave?.dailyTasksDate || null);
  const [dailyChallengeCompletedDate, setDailyChallengeCompletedDate] = useState(() => initialSave?.dailyChallengeCompletedDate || null);
  const [playerUID, setPlayerUID] = useState(() => initialSave?.playerUID || ('GZ-' + Math.random().toString(36).substring(2, 8).toUpperCase()));

  // State cho Thẻ Bài Vũ Trụ (Tarot)
  const [showTarotModal, setShowTarotModal] = useState(false);
  const [lastTarotDate, setLastTarotDate] = useState(() => initialSave?.lastTarotDate || null);
  const [todayTarotCard, setTodayTarotCard] = useState(() => (initialSave?.lastTarotDate === initialToday ? (initialSave?.todayTarotCard || null) : null));
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  // State cho Ghé Thăm Hàng Xóm
  const [neighborSearchInput, setNeighborSearchInput] = useState('');
  const [visitingNeighbor, setVisitingNeighbor] = useState(null);
  const [neighborWaterDate, setNeighborWaterDate] = useState(() => initialSave?.neighborWaterDate || null);
  const [wateredNeighborsToday, setWateredNeighborsToday] = useState(() => (initialSave?.neighborWaterDate === initialToday ? (initialSave?.wateredNeighborsToday || []) : []));
  const [inboxStickers, setInboxStickers] = useState(() => initialSave?.inboxStickers || []);

  // State cho Trang Trí Khu Vườn
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [gardenTheme, setGardenTheme] = useState(() => initialSave?.gardenTheme || 'morning');
  const [potStyle, setPotStyle] = useState(() => initialSave?.potStyle || 'natural');

  const [selectedAvatarId, setSelectedAvatarId] = useState(() => initialSave?.selectedAvatarId || localStorage.getItem('tram_avatar_id') || 'chibi-daisy-girl');
  const [avatarFilter, setAvatarFilter] = useState('all');
  const [avatarNotification, setAvatarNotification] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const currentAvatar = AVATARS.find(a => a.id === selectedAvatarId || a.legacyId === selectedAvatarId) || AVATARS[0];

  // Đồng bộ ảnh avatar đang chọn vào User chung (Sidebar, F5...)
  useEffect(() => { setCurrentUser({ img: currentAvatar.img, icon: currentAvatar.icon }); }, [selectedAvatarId]);

  const [userStats, setUserStats] = useState(() => initialSave?.userStats || { action: 0, task: 0, journal: 0, care: 0, mature: 0 });
  const [unlockedBadges, setUnlockedBadges] = useState(() => initialSave?.unlockedBadges || []);
  const [showBadgePopup, setShowBadgePopup] = useState(null);


  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [challengeState, setChallengeState] = useState(() => (initialSave?.dailyChallengeCompletedDate === initialToday ? 'done' : 'idle')); // 'idle', 'running', 'verify', 'done'
  const [timeLeft, setTimeLeft] = useState(0);
  const [verifyText, setVerifyText] = useState('');

  const [appAlert, setAppAlert] = useState(null); // Quản lý thông báo giữa màn hình
  const [viewLog, setViewLog] = useState(null); // Quản lý xem lại nhật ký
  const [dailyMessages, setDailyMessages] = useState([]); // Chứa 1-2 thông điệp random

  // Helper hiển thị thông báo thay cho alert()
  const showAlert = (title, message, type = 'success') => {
    setAppAlert({ title, message, type });
  };

  // State quản lý Tháng/Năm đang xem trên Lịch Cảm Xúc
  const [calendarViewDate, setCalendarViewDate] = useState(new Date()); // Tháng/Năm đang mở trên lịch
  const [selectedPastEntry, setSelectedPastEntry] = useState(null); // Lưu nhật ký của ngày được bấm vào để xem lại

  // Chuyển sang tháng trước (-1) hoặc tháng sau (+1)
  const changeCalendarMonth = (offset) => {
    setCalendarViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  // Quay nhanh về tháng hiện tại
  const goToCurrentMonth = () => {
    setCalendarViewDate(new Date());
  };

  // Hàm tạo key chuẩn DD/MM/YYYY để không bị trùng ngày giữa các tháng khác nhau
  const formatDateKey = (year, month, day) => {
    const d = String(day).padStart(2, '0');
    const m = String(month + 1).padStart(2, '0');
    return `${d}/${m}/${year}`;
  };

  // Thông số lịch tháng hiện tại
  const todayDateObj = new Date();
  const currentMonth = todayDateObj.getMonth();
  const currentYear = todayDateObj.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthDays = Array.from({length: daysInMonth}, (_, i) => i + 1);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const emptyDays = firstDay === 0 ? 6 : firstDay - 1; // Tính ô trống đầu tháng (T2 -> CN)

  // Tự động random 1 thử thách khác biệt cho MỖI NGƯỜI DÙNG theo từng ngày
  useEffect(() => {
    const today = new Date().toLocaleDateString('vi-VN');

    // Dùng id tài khoản (sessionKey) nếu đã đăng nhập, ngược lại dùng playerUID mặc định
    const activeId = sessionKey || playerUID;

    const uniqueUserDateString = activeId + today;
    const userDailySeed = uniqueUserDateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // 1. Random Thử thách
    setDailyChallenge(CHALLENGE_POOL[userDailySeed % CHALLENGE_POOL.length]);

    // 2. Random 2 Thông điệp độc nhất cho User này trong ngày hôm nay
    const poolSize = THONG_DIEP_CHUA_LANH.length;
    const msgIndex1 = userDailySeed % poolSize;
    let msgIndex2 = (userDailySeed * 2 + 7) % poolSize;

    // Đảm bảo 2 câu bốc ra không bao giờ bị trùng nhau
    if (msgIndex1 === msgIndex2) {
      msgIndex2 = (msgIndex2 + 1) % poolSize;
    }

    setDailyMessages([THONG_DIEP_CHUA_LANH[msgIndex1], THONG_DIEP_CHUA_LANH[msgIndex2]]);
  }, [sessionKey, playerUID]);

  // State cho Bộ đếm Hít thở
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [breathStep, setBreathStep] = useState('ready'); // 'ready', 'inhale', 'hold', 'exhale', 'done'
  const [breathTimer, setBreathTimer] = useState(4);
  const [breathCyclesLeft, setBreathCyclesLeft] = useState(3);

  // Vòng lặp hít thở 4-7-8 khi Modal mở
  useEffect(() => {
    let interval;
    if (showBreathingModal && breathStep !== 'ready' && breathStep !== 'done') {
      interval = setInterval(() => {
        if (breathTimer > 1) {
          setBreathTimer(prev => prev - 1);
        } else {
          // Chuyển bước
          if (breathStep === 'inhale') {
            setBreathStep('hold');
            setBreathTimer(7);
          } else if (breathStep === 'hold') {
            setBreathStep('exhale');
            setBreathTimer(8);
          } else if (breathStep === 'exhale') {
            if (breathCyclesLeft > 1) {
              setBreathCyclesLeft(prev => prev - 1);
              setBreathStep('inhale');
              setBreathTimer(4);
            } else {
              setBreathStep('done');
              // Thưởng phần quà EXP / Nước khi hoàn thành
              setInventory(prev => ({ ...prev, water: prev.water + 1, exp: prev.exp + 10 }));
            }
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showBreathingModal, breathStep, breathTimer, breathCyclesLeft]);

  const startBreathingSession = () => {
    setBreathCyclesLeft(3);
    setBreathStep('inhale');
    setBreathTimer(4);
    setShowBreathingModal(true);
  };
  // State & Ref cho Âm thanh Chữa lành (HTML5 Audio)
  const [showSoundModal, setShowSoundModal] = useState(false);
  const [playingSounds, setPlayingSounds] = useState({}); // Lưu trạng thái bật/tắt của từng âm thanh
  const [soundVolume, setSoundVolume] = useState(0.5); // Âm lượng từ 0 đến 1
  const audioRefs = useRef({}); // Giữ các đối tượng Audio chạy ngầm

  // State cho Thư gửi tương lai
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [letterUnlockDays, setLetterUnlockDays] = useState(0);
  const [readingLetter, setReadingLetter] = useState(null);
  const [futureLetters, setFutureLetters] = useState(() => initialSave?.futureLetters || []);

  const synthRefs = useRef({});

  // Bộ tạo tiếng Rừng đêm (Dế kêu + Gió rì rào) to, rõ ràng và tự động mở khóa AudioContext
  const createForestSynth = (volume) => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(ctx.destination);

    // 1. Tiếng gió rừng rì rào (Pink Noise êm dịu)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + white * 0.029;
      b1 = 0.985 * b1 + white * 0.032;
      b2 = 0.950 * b2 + white * 0.048;
      output[i] = (b0 + b1 + b2) * 0.25;
    }
    const windSource = ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 500;

    const windGain = ctx.createGain();
    windGain.gain.value = 0.35; // Tăng âm lượng gió nghe rõ

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);
    windSource.start();

    // 2. Tiếng dế kêu rả rích (2 tần số đan xen tự nhiên, âm lượng rõ)
    const chirp = () => {
      if (ctx.state === 'closed') return;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(3800 + (i % 2) * 150, now + i * 0.055);
        
        g.gain.setValueAtTime(0.001, now + i * 0.055);
        g.gain.linearRampToValueAtTime(0.28, now + i * 0.055 + 0.02);
        g.gain.linearRampToValueAtTime(0.001, now + i * 0.055 + 0.045);
        
        osc.connect(g);
        g.connect(masterGain);
        osc.start(now + i * 0.055);
        osc.stop(now + i * 0.055 + 0.05);
      }
    };

    chirp();
    const intervalId = setInterval(chirp, 1300);

    return {
      setVolume: (v) => { masterGain.gain.value = v; },
      stop: () => {
        clearInterval(intervalId);
        try { windSource.stop(); } catch (e) {}
        if (ctx.state !== 'closed') ctx.close();
      }
    };
  };

  const toggleAmbientSound = (sound) => {
    const isPlaying = playingSounds[sound.id];
    
    if (isPlaying) {
      if (audioRefs.current[sound.id]) {
        audioRefs.current[sound.id].pause();
      }
      if (synthRefs.current[sound.id]) {
        synthRefs.current[sound.id].stop();
        delete synthRefs.current[sound.id];
      }
      setPlayingSounds(prev => ({ ...prev, [sound.id]: false }));
    } else {
      // Nếu là Rừng đêm -> Chạy trực tiếp bộ tạo tiếng dế & gió + phát kèm file âm thanh
      if (sound.id === 'forest') {
        synthRefs.current[sound.id] = createForestSynth(soundVolume);
      }

      if (!audioRefs.current[sound.id]) {
        const audio = new Audio(sound.url);
        audio.loop = true;
        audio.volume = soundVolume;
        audioRefs.current[sound.id] = audio;
      }
      audioRefs.current[sound.id].play().catch(() => {});
      setPlayingSounds(prev => ({ ...prev, [sound.id]: true }));
    }
  };

  const handleVolumeChange = (newVol) => {
    setSoundVolume(newVol);
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = newVol;
    });
    Object.values(synthRefs.current).forEach(synth => {
      if (synth) synth.setVolume(newVol);
    });
  };

  const stopAllSounds = () => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.pause();
    });
    Object.values(synthRefs.current).forEach(synth => {
      if (synth) synth.stop();
    });
    synthRefs.current = {};
    setPlayingSounds({});
  };

  const activeSoundCount = Object.values(playingSounds).filter(Boolean).length;

  // Dừng toàn bộ âm thanh khi rời Dashboard
  useEffect(() => () => {
    Object.values(audioRefs.current).forEach(audio => { if (audio) audio.pause(); });
    Object.values(synthRefs.current).forEach(synth => { if (synth) synth.stop(); });
  }, []);

  // Logic đếm ngược
  useEffect(() => {
    let interval;
    if (challengeState === 'running' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (challengeState === 'running' && timeLeft === 0) {
      setChallengeState('verify');
    }
    return () => clearInterval(interval);
  }, [challengeState, timeLeft]);

  const startChallenge = () => {
    const today = new Date().toLocaleDateString('vi-VN');
    if (dailyChallengeCompletedDate === today) {
      return showAlert("Đã hoàn thành hôm nay! 🎉", "Bạn đã hoàn thành thử thách của ngày hôm nay rồi. Hẹn gặp lại vào ngày mai nhé!", "success");
    }
    setTimeLeft(dailyChallenge.duration);
    setChallengeState('running');
  };

  const completeChallenge = () => {
    if (verifyText.trim().length < 2) return showAlert("Nhắc nhở", "Hãy nhập vài chữ phản hồi để xác nhận bạn đã hoàn thành nhé! 🥺", "error");
    const today = new Date().toLocaleDateString('vi-VN');
    setChallengeState('done');
    setDailyChallengeCompletedDate(today);
    setInventory(prev => ({
      ...prev,
      water: prev.water + (dailyChallenge.reward.includes('💧') ? 1 : 0),
      soil: prev.soil + (dailyChallenge.reward.includes('🪴') ? 1 : 0),
      scissors: prev.scissors + (dailyChallenge.reward.includes('✂️') ? 1 : 0),
      exp: prev.exp + (dailyChallenge.reward.includes('20 EXP') ? 20 : dailyChallenge.reward.includes('10 EXP') ? 10 : 15)
    }));
    showAlert("Hoàn thành!", `Xác nhận thành công! Bạn nhận được: ${dailyChallenge.reward}`, "success");
  };

  // Hàm kiểm tra và cấp huy hiệu
  const checkAchievements = (type, increment = 1) => {
    setUserStats(prevStats => {
      const newStats = { ...prevStats, [type]: prevStats[type] + increment, action: prevStats.action + 1 };
      setUnlockedBadges(prevBadges => {
        let newlyUnlocked = null;
        const nextBadges = [...prevBadges];
        ACHIEVEMENTS.forEach(badge => {
          const currentProgress = badge.type === 'action' ? newStats.action : newStats[badge.type];
          if (currentProgress >= badge.target && !nextBadges.includes(badge.id)) {
            nextBadges.push(badge.id);
            newlyUnlocked = badge;
          }
        });
        if (newlyUnlocked) {
          setShowBadgePopup(newlyUnlocked);
          setTimeout(() => setShowBadgePopup(null), 5000);
        }
        return nextBadges;
      });
      return newStats;
    });
  };

  // Điều kiện mở khóa avatar: free | exp | journal | care | task | mature
  const isAvatarUnlocked = (avatar) => {
    const { type, val } = getAvatarReq(avatar);
    if (type === 'free') return true;
    const progress = type === 'exp' ? inventory.exp : (userStats[type] || 0);
    return progress >= val;
  };

  const handleSelectAvatar = (avatar) => {
    if (!isAvatarUnlocked(avatar)) {
      showAlert("Avatar đang khóa", `"${avatar.name}" cần: ${getAvatarReq(avatar).msg}. Hãy chăm chỉ hơn nhé!`, "error");
      return;
    }
    setSelectedAvatarId(avatar.id);
    localStorage.setItem('tram_avatar_id', avatar.id);
    setCurrentUser({ img: avatar.img, icon: avatar.icon }); // đồng bộ User chung (Sidebar)
    setAvatarNotification(`Đã đổi diện mạo: ${avatar.name} ✨`);
    setTimeout(() => setAvatarNotification(''), 2500);
  };

  const PLANT_STAGES = {
    'seed_1': { icons: ['🌰', '🌱', '🌿', '🌳'], names: ['Hạt giống Mầm Xanh', 'Mầm non', 'Cây con', 'Cây Cổ Thụ'] },
    'cactus': { icons: ['🪨', '🌱', '🪴', '🌵'], names: ['Hạt Xương Rồng', 'Mầm non', 'Xương Rồng Con', 'Xương Rồng Khổng Lồ'] },
    'sunflower': { icons: ['🌰', '🌱', '🌿', '🌻'], names: ['Hạt Hướng Dương', 'Mầm non', 'Cây có nụ', 'Hoa Hướng Dương'] },
    'sakura': { icons: ['🌰', '🌱', '🪴', '🌸'], names: ['Hạt Anh Đào', 'Mầm non', 'Cây con', 'Anh Đào Nở Hoa'] }
  };

  const currentPlantData = PLANT_STAGES[currentPlantId] || PLANT_STAGES['seed_1'];
  const stageIndex = growth < 25 ? 0 : growth < 50 ? 1 : growth < 75 ? 2 : 3;
  const currentIcon = currentPlantData.icons[stageIndex];
  const currentName = currentPlantData.names[stageIndex];

  const [taskDate, setTaskDate] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [journeyDay, setJourneyDay] = useState(() => initialSave?.journeyDay || 1);
  const [journeyHistory, setJourneyHistory] = useState(() => initialSave?.journeyHistory || []);
  const [emotionInput, setEmotionInput] = useState(null);
  const [intensityInput, setIntensityInput] = useState(3);
  const [noteInput, setNoteInput] = useState('');
  const [lastCheckInDate, setLastCheckInDate] = useState(() => initialSave?.lastCheckInDate || null);

  // ===== LƯU TRỮ THEO TÀI KHOẢN & KHÔI PHỤC PHIÊN KHI F5 (Local Storage) =====
  const [hydratedKey, setHydratedKey] = useState(() => sessionKey || 'guest');

  const normalizePlantId = (id) => {
    const map = { '🌱': 'seed_1', '🌵': 'cactus', '🌻': 'sunflower', '🌸': 'sakura' };
    return map[id] || id;
  };

  const applyData = (parsed) => {
    const today = new Date().toLocaleDateString('vi-VN');
    if (parsed.playerUID) {
      setPlayerUID(parsed.playerUID);
    }
    const loadedInv = parsed.inventory || DEFAULT_DATA.inventory;
    const loadedExp = loadedInv.exp || 0;
    setInventory(loadedInv);
    setJourneyHistory(parsed.journeyHistory || DEFAULT_DATA.journeyHistory);
    setUserStats(parsed.userStats || DEFAULT_DATA.userStats);
    setUnlockedBadges(parsed.unlockedBadges || DEFAULT_DATA.unlockedBadges);
    setLastCheckInDate(parsed.lastCheckInDate || null);

    // Trạng thái cây
    setGrowth(parsed.growth !== undefined ? parsed.growth : 0);
    setIsWithered(parsed.isWithered || false);
    setJourneyDay(parsed.journeyDay || 1);

    // KHÔI PHỤC HỘP THƯ, BỘ SƯU TẬP CÂY & CHECKLIST TRONG NGÀY:
    setFutureLetters(parsed.futureLetters || []);
    const savedUnlocked = (parsed.unlockedPlants || ['seed_1']).map(normalizePlantId);
    const expUnlocked = PLANT_COLLECTION.filter(p => loadedExp >= p.reqExp).map(p => p.id);
    setUnlockedPlants([...new Set([...savedUnlocked, ...expUnlocked])]);

    const savedPlantId = normalizePlantId(parsed.currentPlantId || parsed.equippedPlant || 'seed_1');
    setCurrentPlantId(savedPlantId);

    setDailyTasksDate(parsed.dailyTasksDate || null);
    // Nếu vẫn trong ngày hôm nay thì giữ nguyên các task đã tick, nếu qua ngày mới thì reset mảng rỗng
    setCompletedTasksToday(parsed.dailyTasksDate === today ? (parsed.completedTasksToday || []) : []);

    // Khôi phục trạng thái Thử thách hằng ngày
    setDailyChallengeCompletedDate(parsed.dailyChallengeCompletedDate || null);
    setChallengeState(parsed.dailyChallengeCompletedDate === today ? 'done' : 'idle');

    // Khôi phục Tarot, Hàng Xóm & Trang Trí Vườn
    setLastTarotDate(parsed.lastTarotDate || null);
    setTodayTarotCard(parsed.lastTarotDate === today ? (parsed.todayTarotCard || null) : null);
    setNeighborWaterDate(parsed.neighborWaterDate || null);
    setWateredNeighborsToday(parsed.neighborWaterDate === today ? (parsed.wateredNeighborsToday || []) : []);
    setInboxStickers(parsed.inboxStickers || []);
    setGardenTheme(parsed.gardenTheme || 'morning');
    setPotStyle(parsed.potStyle || 'natural');

    // Khôi phục Tên & Avatar
    if (parsed.selectedAvatarId) {
      setSelectedAvatarId(parsed.selectedAvatarId);
    }
    if (parsed.profileName || parsed.profileAvatar) {
      setCurrentUser({
        ...(parsed.profileName && parsed.profileName !== 'Trạm Trưởng' ? { name: parsed.profileName } : {}),
        ...(parsed.profileAvatar ? { img: parsed.profileAvatar } : {})
      });
    }
  };

  // TỰ ĐỘNG KHÔI PHỤC PHIÊN (F5) & NẠP DỮ LIỆU KHI ĐĂNG NHẬP / ĐỔI TÀI KHOẢN
  useEffect(() => {
    const activeId = sessionKey || 'guest';
    let savedData = null;
    try {
      savedData = localStorage.getItem(`tram_chua_lanh_save_${activeId}`);
    } catch {
      savedData = null;
    }

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        applyData(parsed);
        if (sessionKey && sessionStorage.getItem('tram_welcome_back')) {
          sessionStorage.removeItem('tram_welcome_back');
          showAlert("Mừng bạn trở lại", `Đã tải lại toàn bộ khu vườn của ${sessionKey}.`, "success");
        }
      } catch {
        applyData(DEFAULT_DATA);
      }
    } else if (hydratedKey && hydratedKey !== activeId) {
      applyData(DEFAULT_DATA);
    }

    setDaysNeglected(0);
    setHydratedKey(activeId);
  }, [sessionKey]);

  // Tự động mở khóa cây ngay khi Điểm Chữa Lành (inventory.exp) đạt mốc
  useEffect(() => {
    const currentExp = inventory?.exp || 0;
    const newlyUnlocked = PLANT_COLLECTION
      .filter(p => currentExp >= p.reqExp && !unlockedPlants.includes(p.id))
      .map(p => p.id);

    if (newlyUnlocked.length > 0) {
      setUnlockedPlants(prev => [...new Set([...prev, ...newlyUnlocked])]);
      const latestPlant = PLANT_COLLECTION.find(p => p.id === newlyUnlocked[newlyUnlocked.length - 1]);
      if (latestPlant) {
        showAlert(
          "Mở khóa Giống Cây Mới! 🎉",
          `Điểm Chữa Lành của bạn đã đạt ${currentExp} EXP!\nBạn vừa mở khóa thành công cây "${latestPlant.name}" ${latestPlant.icon}.\n\nHãy vào Bộ Sưu Tập Cây để đem ra vườn trồng nhé!`,
          "success"
        );
      }
    }
  }, [inventory.exp]);

  // AUTO-SAVE MỌI THỨ VÀO LOCAL STORAGE
  useEffect(() => {
    const activeId = sessionKey || 'guest';
    if (hydratedKey === activeId) {
      const dataToSave = {
        playerUID,
        inventory,
        journeyHistory,
        userStats,
        unlockedBadges,
        lastCheckInDate,
        growth,
        isWithered,
        journeyDay,
        futureLetters,
        unlockedPlants,
        currentPlantId,
        collectedTreesCount: PLANT_COLLECTION.filter(p => inventory.exp >= p.reqExp || unlockedPlants.includes(p.id)).length,
        dailyTasksDate,
        completedTasksToday,
        dailyChallengeCompletedDate,
        lastTarotDate,
        todayTarotCard,
        neighborWaterDate,
        wateredNeighborsToday,
        inboxStickers,
        gardenTheme,
        potStyle,
        profileName: currentUser.name,
        profileAvatar: currentUser.img,
        selectedAvatarId
      };
      localStorage.setItem(`tram_chua_lanh_save_${activeId}`, JSON.stringify(dataToSave));
    }
  }, [
    inventory, journeyHistory, userStats, unlockedBadges, lastCheckInDate,
    growth, isWithered, journeyDay, futureLetters, unlockedPlants, currentPlantId,
    dailyTasksDate, completedTasksToday, dailyChallengeCompletedDate,
    lastTarotDate, todayTarotCard, neighborWaterDate, wateredNeighborsToday,
    inboxStickers, gardenTheme, potStyle,
    currentUser, selectedAvatarId, sessionKey, isLoggedIn, hydratedKey
  ]);

  // === PHẦN 1: BẢNG QUẢN LÝ ÂM THANH CHI TIẾT (AUDIO HUB - 3 THANH TRƯỢT ĐỘC LẬP) ===
  const [bgmVolume, setBgmVolume] = useState(0.2);     // Âm lượng Nhạc nền Lofi (0.0 -> 1.0)
  const [sfxVolume, setSfxVolume] = useState(0.5);     // Âm lượng Tiếng bấm nút (Tap/Click)
  const [plantVolume, setPlantVolume] = useState(0.5); // Âm lượng Tưới cây & Nhận thưởng
  const [showAudioSettings, setShowAudioSettings] = useState(false); // Bật/tắt bảng chỉnh âm thanh
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const bgmVolRef = useRef(0.2);
  const bgmIntervalRef = useRef(null);
  const bgmCtxRef = useRef(null);
  const isBgmPlaying = isAudioEnabled && bgmVolume > 0;

  // Cập nhật âm lượng Nhạc nền Lofi (HTML5 Audio + Fallback Web Audio Lofi)
  const updateBgmVolume = (val) => {
    const vol = Math.max(0, Math.min(1, parseFloat(val) || 0));
    setBgmVolume(vol);
    bgmVolRef.current = vol;
    const audioEl = document.getElementById('lofi-bgm-audio');
    if (audioEl) {
      audioEl.volume = vol;
      if (vol > 0) {
        setIsAudioEnabled(true);
        audioEl.play().catch(() => {});
      } else {
        setIsAudioEnabled(false);
        audioEl.pause();
      }
    } else {
      setIsAudioEnabled(vol > 0);
    }
  };

  const toggleBgmMusic = () => {
    const nextState = !(isAudioEnabled && bgmVolume > 0);
    const nextVol = nextState ? (bgmVolume > 0 ? bgmVolume : 0.25) : 0;
    updateBgmVolume(nextVol);
  };

  // Fallback Lofi Synth êm dịu hỗ trợ khi trình duyệt/mạng chặn stream MP3 ngoài
  useEffect(() => {
    if (bgmIntervalRef.current) {
      clearInterval(bgmIntervalRef.current);
      bgmIntervalRef.current = null;
    }

    if (isAudioEnabled && bgmVolume > 0) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!bgmCtxRef.current) {
          bgmCtxRef.current = new AudioCtx();
        }
        const ctx = bgmCtxRef.current;
        const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // C E G C A F
        let idx = 0;

        const playNote = () => {
          const currentVol = bgmVolRef.current;
          if (currentVol <= 0) return;
          const audioEl = document.getElementById('lofi-bgm-audio');
          // Nếu thẻ <audio> đang phát bình thường thì không cần phát đè synth
          if (audioEl && !audioEl.paused && audioEl.readyState >= 2) return;

          if (ctx.state === 'suspended') ctx.resume();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[idx % notes.length], ctx.currentTime);
          gain.gain.setValueAtTime(Math.max(0.002, currentVol * 0.08), ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.9);
          idx++;
        };

        playNote();
        bgmIntervalRef.current = setInterval(playNote, 2000);
      } catch (e) {}
    }

    return () => {
      if (bgmIntervalRef.current) {
        clearInterval(bgmIntervalRef.current);
        bgmIntervalRef.current = null;
      }
    };
  }, [isAudioEnabled, bgmVolume]);

  useEffect(() => () => {
    if (bgmIntervalRef.current) clearInterval(bgmIntervalRef.current);
    if (bgmCtxRef.current && bgmCtxRef.current.state !== 'closed') {
      try { bgmCtxRef.current.close(); } catch (e) {}
    }
  }, []);

  // Tách bạch hàm phát âm thanh theo từng thanh trượt (SFX & Tưới Cây / Nhận Thưởng)
  const playSoundEffect = (type, customVol = null) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click' || type === 'tick') {
        const effSfx = customVol !== null ? customVol : sfxVolume;
        if (effSfx <= 0) return; // Nếu kéo về 0 thì tắt tiếng bấm
        osc.type = 'sine';
        osc.frequency.setValueAtTime(type === 'tick' ? 800 : 450, now);
        if (type === 'click') {
          osc.frequency.exponentialRampToValueAtTime(650, now + 0.04);
        }
        gain.gain.setValueAtTime((type === 'tick' ? 0.04 : 0.07) * effSfx, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (type === 'tick' ? 0.03 : 0.05));
        osc.start(now);
        osc.stop(now + (type === 'tick' ? 0.04 : 0.06));
      } else if (type === 'water' || type === 'reward' || type === 'snip') {
        const effPlant = customVol !== null ? customVol : plantVolume;
        if (effPlant <= 0) return; // Nếu kéo về 0 thì tắt tiếng tưới/thưởng
        if (type === 'snip') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(1200, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);
          gain.gain.setValueAtTime(0.08 * effPlant, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          osc.start(now);
          osc.stop(now + 0.08);
        } else {
          osc.type = type === 'reward' ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(type === 'water' ? 380 : 523.25, now);
          if (type === 'water') {
            osc.frequency.exponentialRampToValueAtTime(860, now + 0.18);
          } else if (type === 'reward') {
            osc.frequency.setValueAtTime(659.25, now + 0.08);
            osc.frequency.setValueAtTime(783.99, now + 0.16);
          }
          gain.gain.setValueAtTime(0.12 * effPlant, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + (type === 'reward' ? 0.35 : 0.2));
          osc.start(now);
          osc.stop(now + (type === 'reward' ? 0.38 : 0.22));
        }
      }
    } catch (e) {}
  };

  const playUiSound = playSoundEffect;

  // Phát tiếng tick mỗi giây khi đang chạy thử thách đếm ngược
  useEffect(() => {
    if (challengeState === 'running' && timeLeft > 0) {
      playSoundEffect('tick');
    }
  }, [challengeState, timeLeft]);

  // === PHẦN 2: HIỆU ỨNG HOẠT HÌNH CÔNG CỤ (BÌNH TƯỚI, CUỐC VUN ĐẤT & KÉO TỈA CÀNH BAY TỪ NÚT BẤM VÀO CÂY) ===
  const [activeToolAnim, setActiveToolAnim] = useState(null); // 'water' | 'snip' | 'soil' | null
  const [toolAnimRunId, setToolAnimRunId] = useState(0);
  const [toolStartOffset, setToolStartOffset] = useState({ x: 260, y: 80 });
  const plantStageRef = useRef(null);
  const toolTimerRef = useRef(null);

  // Hàm kích hoạt hành động chăm sóc kèm âm thanh & hình ảnh công cụ di chuyển từ chỗ nút bấm sang tưới/chăm cây
  const triggerPlantCareAction = (actionType, e) => {
    if (growth >= 100) {
      return showAlert("Thành quả", "Cây đã trưởng thành tối đa! Hãy bấm nút Thu hoạch ngay bên dưới nhé 🧺", "success");
    }
    if (isWithered && actionType !== 'water') {
      return showAlert("Chú ý", "Cây đang héo! Cần Tưới Nước khẩn cấp trước khi dùng công cụ khác.", "error");
    }

    // Tính tọa độ xuất phát từ đúng nút chữ vừa bấm để công cụ bay từ nút đó sang cây
    if (e?.currentTarget && plantStageRef.current) {
      try {
        const btnRect = e.currentTarget.getBoundingClientRect();
        const plantRect = plantStageRef.current.getBoundingClientRect();
        const startX = Math.round((btnRect.left + btnRect.width * 0.3) - (plantRect.left + plantRect.width * 0.5));
        const startY = Math.round((btnRect.top + btnRect.height * 0.5) - (plantRect.top + plantRect.height * 0.45));
        setToolStartOffset({ x: startX, y: startY });
      } catch (err) {
        setToolStartOffset({ x: 260, y: 80 });
      }
    } else {
      setToolStartOffset({ x: 260, y: actionType === 'water' ? 40 : actionType === 'soil' ? 110 : 180 });
    }

    const activePlant = PLANT_COLLECTION.find(p => p.id === currentPlantId) || PLANT_COLLECTION[0];
    const rate = activePlant.growthRate || 1;

    if (actionType === 'water') {
      if (inventory.water <= 0) return showAlert("Hết nước 💧", "Hãy làm Checklist hoặc mở thẻ Tarot để nhận thêm giọt nước nhé!", "error");
      playSoundEffect('water');
      setActiveToolAnim('water');
      setToolAnimRunId(prev => prev + 1);
      const scaledBoost = Math.max(1, Math.round(10 * rate));
      setInventory(prev => ({ ...prev, water: prev.water - 1 }));
      setGrowth(prev => Math.min(100, prev + scaledBoost));
      setIsWithered(false);
      setDaysNeglected(0);
      checkAchievements('care'); triggerMascotExcited('Oa, cây được chăm sóc lớn nhanh kìa! Tuyệt vời quá đi mất 🎉');
    } else if (actionType === 'snip') {
      if (inventory.scissors <= 0) return showAlert("Hết kéo cắt ✂️", "Bạn đã dùng hết kéo tỉa cành rồi. Hãy tích lũy thêm EXP hoặc mở thẻ may mắn nhé!", "error");
      playSoundEffect('snip');
      setActiveToolAnim('snip');
      setToolAnimRunId(prev => prev + 1);
      const scaledBoost = Math.max(1, Math.round(20 * rate));
      setInventory(prev => ({ ...prev, scissors: prev.scissors - 1 }));
      setGrowth(prev => Math.min(100, prev + scaledBoost));
      setIsWithered(false);
      setDaysNeglected(0);
      checkAchievements('care'); triggerMascotExcited('Oa, cây được chăm sóc lớn nhanh kìa! Tuyệt vời quá đi mất 🎉');
    } else if (actionType === 'soil') {
      if (inventory.soil <= 0) return showAlert("Hết đất màu 🪴", "Bạn đã hết đất màu rồi, hãy hoàn thành nhiệm vụ hằng ngày để nhận thêm nhé!", "error");
      playSoundEffect('water');
      setActiveToolAnim('soil');
      setToolAnimRunId(prev => prev + 1);
      const scaledBoost = Math.max(1, Math.round(15 * rate));
      setInventory(prev => ({ ...prev, soil: prev.soil - 1 }));
      setGrowth(prev => Math.min(100, prev + scaledBoost));
      setIsWithered(false);
      setDaysNeglected(0);
      checkAchievements('care'); triggerMascotExcited('Oa, cây được chăm sóc lớn nhanh kìa! Tuyệt vời quá đi mất 🎉');
    }

    // Tắt hoạt hình công cụ sau khi hoàn tất chu trình bay & chăm sóc (2.1 giây)
    if (toolTimerRef.current) clearTimeout(toolTimerRef.current);
    toolTimerRef.current = setTimeout(() => {
      setActiveToolAnim(null);
    }, 2100);
  };

  // Bảng Xếp Hạng Nông Dân (Leaderboard Top 5 theo EXP)
  const getLeaderboardData = () => {
    const list = [];
    const seenNames = new Set();

    // Thêm tài khoản hiện tại
    const myName = currentUser.name || 'Nông dân mới';
    list.push({
      name: myName,
      exp: inventory.exp || 0,
      avatar: currentAvatar?.img || currentUser.img || '🌱',
      icon: currentAvatar?.icon || '🌱',
      isMe: true
    });
    seenNames.add(myName);

    // Quét các tài khoản khác trên máy
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('tram_chua_lanh_save_')) {
        try {
          const d = JSON.parse(localStorage.getItem(k));
          const accName = d.profileName || k.replace('tram_chua_lanh_save_', '');
          if (accName && !seenNames.has(accName)) {
            seenNames.add(accName);
            list.push({
              name: accName,
              exp: d.inventory?.exp || 0,
              avatar: d.profileAvatar || '🌱',
              icon: '👩‍🌾',
              isMe: false
            });
          }
        } catch (e) {}
      }
    }

    // Thêm các NPC hàng xóm mẫu nếu danh sách ít
    const npcDefaults = [
      { name: 'Tiệm Mèo Lười', exp: 950, avatar: '🐱', icon: '🐱', isMe: false },
      { name: 'Gấu Nâu Ấm Áp', exp: 720, avatar: '🐻', icon: '🐻', isMe: false },
      { name: 'Cáo Nhỏ Rừng Xanh', exp: 480, avatar: '🦊', icon: '🦊', isMe: false },
      { name: 'Thỏ Trắng Mơ Màng', exp: 260, avatar: '🐰', icon: '🐰', isMe: false }
    ];
    npcDefaults.forEach(npc => {
      if (!seenNames.has(npc.name)) {
        seenNames.add(npc.name);
        list.push(npc);
      }
    });

    return list.sort((a, b) => b.exp - a.exp).slice(0, 5); // Lấy Top 5
  };

  // === ĐỒNG BỘ THỜI TIẾT THEO GIỜ THỰC & CHẾ ĐỘ TỐI TOÀN ỨNG DỤNG (DARK MODE) ===
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoRealTimeWeather, setAutoRealTimeWeather] = useState(true); // Tự động đổi theo giờ thực

  useEffect(() => {
    if (!autoRealTimeWeather) return;
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    if (hour >= 6 && hour < 17) {
      setGardenTheme('morning');
      setIsDarkMode(false);
    } else if (hour >= 17 && hour < 18.5) {
      setGardenTheme('sunset');
      setIsDarkMode(false);
    } else {
      setGardenTheme('night');
      setIsDarkMode(true);
    }
  }, [autoRealTimeWeather]);

  // Đồng bộ biến isNightMode theo isDarkMode để toàn bộ các tab (Sổ tay, Checklist, Hồ sơ, Nền app) đều nhận Dark Mode
  const isNightMode = isDarkMode;

  // === BÉ TRỢ LÝ AI CHIBI KÉO THẢ (DRAGGABLE MASCOT & AI CHAT COMPANION) ===
  const [mascotPos, setMascotPos] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth - 120 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight - 150 : 0
  });
  const [mascotMood, setMascotMood] = useState('happy'); // 'happy' | 'thinking' | 'writing' | 'wink' | 'crying' | 'excited'
  const [mascotBubbleText, setMascotBubbleText] = useState('Hôm nay bạn thế nào? Cần tớ giúp gì không? 🌱');
  const [showMascotBubble, setShowMascotBubble] = useState(true);
  const [showAiChatModal, setShowAiChatModal] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'mascot', mood: 'happy', text: 'Tớ là mầm xanh đồng hành cùng cậu ở Trạm Chữa Lành đây! Cứ hỏi tớ bất cứ điều gì nhé ✨' }
  ]);
  const [questionCount, setQuestionCount] = useState(0); // Đếm số lần hỏi để đổi trạng thái khóc/mệt
  const mascotDraggedRef = useRef(false);
  const mascotMoodTimerRef = useRef(null);
  const chatEndRef = useRef(null);

  const MASCOT_SPRITES = {
    happy: '/assets/mascot/mascot-happy.png',
    excited: '/assets/mascot/mascot-excited.png',
    thinking: '/assets/mascot/mascot-thinking.png',
    writing: '/assets/mascot/mascot-writing.png',
    wink: '/assets/mascot/mascot-wink.png',
    crying: '/assets/mascot/mascot-crying.png'
  };

  // Hàm kích hoạt phản ứng Vui Mừng (excited) khi người dùng nhận thưởng / hoàn thành nhiệm vụ
  const triggerMascotExcited = (customText) => {
    setMascotMood('excited');
    setShowMascotBubble(true);
    setMascotBubbleText(customText || 'Oa, nhận quà kìa! Tuyệt vời quá đi mất 🎉');
    if (mascotMoodTimerRef.current) clearTimeout(mascotMoodTimerRef.current);
    mascotMoodTimerRef.current = setTimeout(() => {
      setMascotMood(prev => (questionCount > 5 ? 'crying' : 'happy'));
    }, 4500);
  };

  // Dỗ dành / cho bé chuột nghỉ ngơi khi bé khóc vì hỏi quá nhiều
  const handleComfortMascot = () => {
    playSoundEffect('reward');
    setQuestionCount(0);
    setMascotMood('excited');
    const msg = 'Chít chít! Cảm ơn cậu đã cho tớ nghỉ ngơi và ăn phô mai nha 🧀✨ Tớ hết đau đầu rồi, sẵn sàng nghe cậu tâm sự tiếp đây!';
    setMascotBubbleText('Cảm ơn cậu nha! Tớ khỏe lại rồi nè 🧀💛');
    setShowMascotBubble(true);
    setChatHistory(prev => [...prev, { sender: 'mascot', mood: 'excited', text: msg }]);
    if (mascotMoodTimerRef.current) clearTimeout(mascotMoodTimerRef.current);
    mascotMoodTimerRef.current = setTimeout(() => setMascotMood('happy'), 3500);
  };


  // === KHO CÂU HỎI TRỌNG TÂM + CÁ NHÂN HÓA DỮ LIỆU THẬT CỦA TỪNG NGƯỜI DÙNG ===
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);

  // Nhận thưởng từ trò chơi Lật Thẻ Tìm Cặp
  const handleMemoryGameRewards = (earned) => {
    playSoundEffect('reward');
    setInventory(prev => ({
      ...prev,
      water: (prev.water || 0) + earned.water,
      soil: (prev.soil || 0) + earned.soil,
      scissors: (prev.scissors || 0) + earned.scissors,
      exp: (prev.exp || 0) + earned.exp
    }));
    triggerMascotExcited(`Oa, thắng màn Lật Thẻ rồi! Nhận +${earned.exp} EXP 🎉`);
  };

  const QUICK_QUESTION_LABELS = {
    my_plant_status: '🌿 Cây của tớ thế nào rồi?',
    my_inventory: '🎒 Túi đồ của tớ có gì?',
    my_mood_advice: '💖 Tớ đang hơi buồn...',
    care_plant: '🚿 Cách chăm cây?',
    tarot_card: '🎴 Thẻ Tarot là gì?',
    neighbor_visit: '🏡 Ghé vườn hàng xóm?',
    weather_theme: '🌤️ Đổi thời tiết ở đâu?',
    wellness_audio: '🎵 Bật nhạc chill kiểu gì?'
  };

  const handleMascotAnswer = (questionKey) => {
    const userPromptLabel = QUICK_QUESTION_LABELS[questionKey] || 'Bé Chuột ơi!';
    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);

    // Nếu hỏi liên tục > 6 lần thì bé chuyển sang trạng thái mệt/khóc đáng yêu
    if (nextCount > 6) {
      const cryMsg = 'Huhu, tớ suy nghĩ nhiều quá đau đầu rồi, cho tớ nghỉ ngơi một xíu nha... 💧 (Bấm nút "🧀 Dỗ bé / Cho ăn Phô Mai" để tớ hồi sức nhé!)';
      playSoundEffect('tick');
      setShowMascotBubble(true);
      setMascotMood('crying');
      setMascotBubbleText('Huhu, tớ suy nghĩ nhiều quá đau đầu rồi, cho tớ nghỉ ngơi một xíu nha... 💧');
      setChatHistory(prev => [
        ...prev,
        { sender: 'user', text: userPromptLabel },
        { sender: 'mascot', mood: 'crying', text: cryMsg }
      ]);
      return;
    }

    playSoundEffect('click');
    setShowMascotBubble(true);
    setMascotMood('thinking');
    setMascotBubbleText('Tớ đang xem lại sổ sách xíu nhé... 🤔💭');
    setIsAiTyping(true);
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: userPromptLabel }
    ]);

    if (mascotMoodTimerRef.current) clearTimeout(mascotMoodTimerRef.current);

    mascotMoodTimerRef.current = setTimeout(() => {
      const plantName = PLANT_COLLECTION.find(p => p.id === currentPlantId)?.name || 'Cây của bạn';
      const currentExp = inventory.exp || 0;
      const currentWater = inventory.water || 0;
      const currentScissors = inventory.scissors || 0;
      const growthPct = growth || 0;
      const userName = currentUser.name || 'bạn';

      setMascotMood('happy');
      setIsAiTyping(false);

      const responses = {
        my_plant_status: [
          `🌱 Báo cáo sếp ${userName}! Cây ${plantName} của chúng ta đang ở mức ${growthPct}% rồi. Sắp được thu hoạch rồi đó!`,
          `✨ Cây ${plantName} đang lớn rất ngoan, đạt ${growthPct}% rồi nè. ${userName} nhớ tưới nước đều đặn nha!`,
          `🌿 Tớ vừa ra vườn kiểm tra, ${plantName} đang đạt ${growthPct}% độ trưởng thành. Nhìn cưng xỉu luôn á ${userName} ơi!`
        ],
        my_inventory: [
          `🎒 Hiện tại ${userName} đang có ${currentWater} 💧, ${currentScissors} ✂️ và ${currentExp} EXP nhé! Rất rủng rỉnh luôn.`,
          `💎 Tớ kiểm tra kho rồi! Cậu đang trữ ${currentExp} Điểm Chữa Lành, ${currentWater} giọt nước tưới. Quá tuyệt!`,
          `📦 Túi đồ của ${userName} đang có: ${currentWater} nước, ${currentScissors} kéo cắt cành. Cố gắng tích thêm EXP (${currentExp} hiện có) nha!`
        ],
        my_mood_advice: [
          `💖 ${userName} hôm nay có vẻ nhiều tâm sự nhỉ? Đừng lo, hít sâu thở đều theo bài tập 4-7-8 hoặc viết vài dòng vào sổ tay đi, tớ luôn ở đây ôm lấy cậu nè!`,
          `🤗 Ôm ${userName} một cái thật chặt nè! Những lúc mệt mỏi, cậu cứ bật chút nhạc Lofi rồi ngắm cây ${plantName} lớn lên từng ngày nhé.`,
          `🌸 Mọi chuyện rồi sẽ ổn thôi ${userName} ơi! Thả lỏng vai xuống, uống một ngụm nước ấm và để Trạm Chữa Lành vỗ về cậu nha.`
        ],
        care_plant: [
          `🚿 Để cây nhanh lớn, cậu hãy dùng nước tưới (+10%), vun đất (+15%) hoặc kéo cắt cành (+20%) khi cây cần. Nhớ ghé app mỗi ngày để cây không bị héo úa nhé!`,
          `🌱 Bí kíp chăm ${plantName} siêu tốc cho ${userName}: Hoàn thành Checklist hằng ngày để lấy Nước & Kéo, sau đó bấm bộ công cụ bên dưới chậu cây nha!`,
          `💧 Cây ${plantName} thích nhất là được ${userName} tưới nước và tỉa lá mỗi ngày đó! Đạt đủ 100% là thu hoạch được thật nhiều EXP luôn.`
        ],
        tarot_card: [
          `🎴 Mỗi sáng bốc một lá bài Tarot sẽ giúp cậu nhận thông điệp chữa lành vũ trụ và rinh thêm quà tặng (EXP, nước, phân bón) đấy!`,
          `✨ Nút "🎴 Rút Thẻ" ở ngay góc trên Khu Vườn đó ${userName}! Mỗi ngày vũ trụ đều gửi tặng cậu 1 lá bài may mắn kèm quà miễn phí nha.`,
          `🔮 Hôm nay ${userName} đã rút bài Tarot chưa? Vừa có lời khuyên chữa lành tinh thần, vừa bỏ túi thêm Nước và EXP cho cây ${plantName} nữa đó!`
        ],
        neighbor_visit: [
          `🏡 Cậu có thể sang tab Hồ Sơ Nông Dân ➔ Ghé Thăm Khu Vườn Hàng Xóm, nhập UID của bạn bè để ghé thăm vườn, tưới nước hộ và gửi những sticker động viên siêu cưng!`,
          `💌 Mã UID của ${userName} là ${playerUID}! Cậu nhớ gửi mã này cho bạn bè hoặc nhập UID hàng xóm để tưới hộ nhận +15 EXP mỗi lượt nhé!`,
          `🌻 Hàng xóm quanh Trạm Chữa Lành thân thiện lắm! ${userName} ghé thăm tưới nước giúp bạn bè (tối đa 3 người/ngày) là cả hai cùng có quà luôn.`
        ],
        weather_theme: [
          `🌤️ Muốn đổi bầu trời (nắng sớm, hoàng hôn...) hoặc chế độ Dark Mode? Cậu chạy ra Tab "Hồ Sơ Nông Dân" hoặc bấm "🎨 Trang Trí Vườn" chỉnh một phát là ăn ngay toàn app nhé!`,
          `🌙 Ở tab "Hồ Sơ Nông Dân" có mục Đồng Bộ Thời Gian Thực đó ${userName}! App sẽ tự động chuyển cảnh Bình Minh, Hoàng Hôn hay Đêm Sao theo đúng giờ ngoài đời luôn.`,
          `🎨 ${userName} thích ngắm mưa phùn hay đêm đầy sao? Bấm nút Trang Trí Vườn hoặc bật Dark Mode trong Hồ Sơ để đổi không khí cực chill nha!`
        ],
        wellness_audio: [
          `🎵 Ở góc trên bên phải có nút "Âm thanh", cậu có thể bật nhạc nền Lofi / thiên nhiên và kéo thanh trượt điều chỉnh âm lượng từ nhỏ đến to tuỳ ý!`,
          `🎧 ${userName} bấm vào nút "🎵 Âm thanh" phía trên bên phải nhé! Có đủ 3 thanh trượt Nhạc nền Lofi, Hiệu ứng và Tiếng cây cho cậu pha trộn cực êm tai.`,
          `🎹 Tiếng đàn Piano & Kalimba Lofi êm dịu đang chờ ${userName} bật lên ở góc phải màn hình đó, vừa nghe nhạc vừa chăm cây là hết nước chấm!`
        ]
      };

      // Lấy ngẫu nhiên 1 câu trả lời trong mảng để không bị lặp lại
      const list = responses[questionKey] || [`✨ Tớ luôn sẵn sàng đồng hành cùng ${userName}! Cậu cần gì cứ gọi tớ nha.`];
      const randomReply = list[Math.floor(Math.random() * list.length)];
      setMascotBubbleText(randomReply);
      setChatHistory(prev => [
        ...prev,
        { sender: 'mascot', mood: 'happy', text: randomReply }
      ]);
    }, 1500);
  };

  const generateSmartLocalMascotReply = (rawText) => {
    const lower = rawText.toLowerCase().trim();
    const plantName = PLANT_COLLECTION.find(p => p.id === currentPlantId)?.name || 'Cây của bạn';
    const userName = currentUser.name || 'bạn';
    const currentExp = inventory.exp || 0;
    const currentWater = inventory.water || 0;
    const currentSoil = inventory.soil || 0;
    const currentScissors = inventory.scissors || 0;
    const growthPct = growth || 0;

    // 1. Chào hỏi (helo, hi, xin chào, alo...)
    if (/^(helo+|hello+|hi+|hii+|hey|alo+|chào|xin chào|ê|ơi|bé chuột|chuột ơi)\b/i.test(lower) || lower === 'helo' || lower === 'hi' || lower === 'hello') {
      const greetings = [
        `🐹 Helo ${userName} nha! Hôm nay cậu thế nào? Cây ${plantName} của cậu đang đạt ${growthPct}% rồi đó, mình cùng chăm cây hay tâm sự chút nhé! ✨`,
        `🌱 Chào ${userName} dễ thương! Bé Chuột trực chiến ở Trạm Chữa Lành đây~ Hôm nay cậu muốn kiểm tra túi đồ (${currentExp} EXP) hay trò chuyện cùng tớ nào?`,
        `✨ Hú le ${userName} ơi! Gặp được cậu vui ghê á 🐹💛. Hôm nay tâm trạng của cậu nắng ấm hay mưa phùn nè?`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // 2. Hỏi thăm bé chuột (bạn là ai, tên gì, khỏe không, làm gì đó...)
    if (lower.includes('tên gì') || lower.includes('là ai') || lower.includes('khỏe không') || lower.includes('đang làm gì') || lower.includes('mấy tuổi')) {
      const selfReplies = [
        `🐹 Tớ là Bé Chuột Chibi — quản gia kiêm bạn đồng hành của ${userName} tại Trạm Chữa Lành nè! Tớ đang vừa ôm sổ tay vừa canh chừng cây ${plantName} (${growthPct}%) giúp cậu đó ✨`,
        `🧀 Tớ khoẻ re luôn ${userName} ơi! Chỉ cần được trò chuyện với cậu và ngắm khu vườn lớn lên mỗi ngày là tớ vui hết cỡ rồi~`
      ];
      return selfReplies[Math.floor(Math.random() * selfReplies.length)];
    }

    // 3. Cảm xúc buồn, mệt mỏi, áp lực, stress, cô đơn, khóc
    if (lower.includes('buồn') || lower.includes('mệt') || lower.includes('chán') || lower.includes('áp lực') || lower.includes('stress') || lower.includes('khóc') || lower.includes('cô đơn') || lower.includes('nản') || lower.includes('tệ')) {
      const comfortReplies = [
        `🤗 Lại đây tớ ôm ${userName} một cái thật chặt nè! Hôm nay cậu đã cố gắng nhiều rồi, thử bật chút nhạc Lofi ở góc phải trên và hít thở sâu 4-7-8 cùng tớ nhé 💖`,
        `🌸 Thương ${userName} quá đi... Những ngày mỏi mệt thế này, cậu đừng ép bản thân quá nhé. Viết vài dòng trút bầu tâm sự vào Sổ Tay Cảm Xúc đi, tớ và cây ${plantName} luôn ở bên cậu!`,
        `💛 Không sao đâu ${userName} ơi, mưa nào rồi cũng tạnh mà! Cậu uống một ngụm nước ấm, thả lỏng hai vai xuống nhé. Ở Trạm Chữa Lành này cậu luôn được yêu thương 🐹✨`
      ];
      return comfortReplies[Math.floor(Math.random() * comfortReplies.length)];
    }

    // 4. Cảm xúc vui, hạnh phúc, khoe thành tích
    if (lower.includes('vui') || lower.includes('hạnh phúc') || lower.includes('tuyệt') || lower.includes('haha') || lower.includes('hihi') || lower.includes('thích quá') || lower.includes('yêu')) {
      const happyReplies = [
        `🎉 Yayyy! Nghe ${userName} vui mà mắt tớ cũng lấp lánh theo luôn nè 🐹✨! Giữ mãi nguồn năng lượng tích cực này để cây ${plantName} nở hoa thật rực rỡ nha!`,
        `💖 Yêu xỉu luôn á ${userName} ơi! Niềm vui của cậu chính là ánh nắng ấm áp nhất cho khu vườn Trạm Chữa Lành đó 🌱☀️`
      ];
      return happyReplies[Math.floor(Math.random() * happyReplies.length)];
    }

    // 5. Hỏi về Học tập / Thi cử / Công việc / Deadline
    if (lower.includes('học') || lower.includes('thi') || lower.includes('deadline') || lower.includes('bài tập') || lower.includes('đi làm') || lower.includes('công việc')) {
      return `📚 Cố lên ${userName} ơi! Làm việc hay chạy deadline mệt thì cứ nghỉ giải lao 5 phút ngắm cây ${plantName} (${growthPct}%), nghe một bản Piano Lofi rồi làm tiếp cho đầu óc tỉnh táo nha 🐹💪!`;
    }

    // 6. Hỏi về Ăn uống / Ngủ nghỉ / Khuya
    if (lower.includes('đói') || lower.includes('ăn gì') || lower.includes('ăn chưa') || lower.includes('trà sữa') || lower.includes('phô mai')) {
      return `🧀 Nhắc tới đồ ăn là bụng tớ kêu rột rột liền! ${userName} nhớ ăn uống đầy đủ để nạp năng lượng nha, còn phần tớ thì xin 1 miếng phô mai thơm lừng là đủ ấm bụng rồi 😋✨`;
    }
    if (lower.includes('ngủ') || lower.includes('khuya') || lower.includes('buồn ngủ') || lower.includes('mất ngủ')) {
      return `🌙 Nếu khó ngủ, ${userName} bật chế độ Đêm Đầy Sao (Dark Mode) ở Hồ Sơ Nông Dân, mở nhỏ tiếng nhạc Lofi và tập bài thở 4-7-8 nhé. Chúc cậu ngủ thật ngon giấc nha 💤🐹`;
    }

    // 7. Hỏi về Cây trồng / Sinh trưởng / Thu hoạch
    if (lower.includes('cây') || lower.includes('lớn') || lower.includes('bao nhiêu') || lower.includes('trưởng thành') || lower.includes('thu hoạch') || lower.includes('héo')) {
      return `🌱 Báo cáo sếp ${userName}! Cây ${plantName} của cậu hiện đang đạt ${growthPct}% độ trưởng thành rồi nha. Trong kho đang có ${currentWater} 💧 nước, ${currentSoil} 🪴 đất và ${currentScissors} ✂️ kéo để cậu chăm cây tiếp đó!`;
    }

    // 8. Hỏi về Túi đồ / Kho / Nước / EXP / Kéo
    if (lower.includes('túi') || lower.includes('kho') || lower.includes('nước') || lower.includes('exp') || lower.includes('điểm') || lower.includes('kéo') || lower.includes('đất')) {
      return `🎒 Tớ vừa kiểm kê túi đồ của ${userName}: Hiện có ${currentWater} giọt nước 💧, ${currentSoil} túi đất 🪴, ${currentScissors} chiếc kéo ✂️ và tổng cộng ${currentExp} Điểm Chữa Lành (EXP) nha!`;
    }

    // 9. Hỏi về Cách chăm cây / Tưới nước / Làm nhiệm vụ
    if (lower.includes('chăm') || lower.includes('tưới') || lower.includes('tỉa') || lower.includes('vun') || lower.includes('nhiệm vụ') || lower.includes('checklist')) {
      return `🚿 Để cây ${plantName} nhanh lớn, ${userName} hoàn thành Checklist hằng ngày và Viết nhật ký để nhận Nước/Đất/Kéo, sau đó bấm 3 nút Tưới nước (+10%), Vun đất (+15%), Tỉa cành (+20%) ngay dưới chậu cây nhé!`;
    }

    // 10. Hỏi về Nhạc / Âm thanh / Lofi
    if (lower.includes('nhạc') || lower.includes('âm thanh') || lower.includes('lofi') || lower.includes('chill')) {
      return `🎵 ${userName} bấm vào nút "Âm thanh" ở góc trên bên phải màn hình nhé! Ở đó có nhạc nền Lofi Piano & Kalimba cực êm cùng 3 thanh trượt chỉnh âm lượng theo ý thích luôn 🎧`;
    }

    // 11. Hỏi về Thời tiết / Bầu trời / Dark mode
    if (lower.includes('thời tiết') || lower.includes('tối') || lower.includes('dark') || lower.includes('bầu trời') || lower.includes('giao diện')) {
      return `🌤️ ${userName} có thể bấm nút "🎨 Trang Trí Vườn" để đổi bầu trời/chậu cây, hoặc sang tab "Hồ Sơ Nông Dân" để bật Dark Mode & Đồng bộ thời tiết theo giờ thực nha!`;
    }

    // 12. Hỏi về Tarot / Rút thẻ
    if (lower.includes('tarot') || lower.includes('bài') || lower.includes('thẻ') || lower.includes('bói')) {
      return `🎴 Mỗi ngày ${userName} bấm nút "🎴 Rút Thẻ" ở Khu Vườn để đón nhận thông điệp chữa lành từ vũ trụ và nhận thêm EXP + nước tưới miễn phí nhé!`;
    }

    // 13. Hỏi về Hàng xóm / UID / Bạn bè
    if (lower.includes('hàng xóm') || lower.includes('bạn bè') || lower.includes('uid') || lower.includes('thăm')) {
      return `🏡 Mã UID của ${userName} là ${playerUID}! Cậu vào tab Hồ Sơ ➔ Ghé Thăm Khu Vườn Hàng Xóm để nhập UID bạn bè, tưới nước hộ nhận +15 EXP và dán sticker động viên nha!`;
    }

    // 14. Câu trả lời trò chuyện tự nhiên, ấm áp bám sát ngữ cảnh người dùng
    const smartFallbacks = [
      `Tớ nghe cậu kể "${rawText}" mà cuốn phết luôn á! Dù có chuyện gì thì tớ vẫn ngồi đây hóng biến và canh cây ${plantName} (${growthPct}%) cùng cậu nha 🐹✨`,
      `Chuẩn bài luôn cậu ơi! Bật mí nhẹ là túi đồ của cậu đang có ${currentExp} EXP với ${currentWater} giọt nước rồi đó, rảnh tay thì ra tưới cây với tớ cho chill nhé 🌱`,
      `Ghi sổ liền tay lời cậu vừa nhắn luôn! Đừng overthinking nha bạn yêu, cứ thở sâu một nhịp rồi tám chuyện tiếp với tớ nè 💛`
    ];
    return smartFallbacks[Math.floor(Math.random() * smartFallbacks.length)];
  };

  // Thực thi hành động thật trên ứng dụng khi người dùng ra lệnh cho Bé Chuột
  const tryExecuteMascotAction = (rawText) => {
    const lower = rawText.toLowerCase().trim();
    const plantName = PLANT_COLLECTION.find(p => p.id === currentPlantId)?.name || 'Cây của bạn';
    const userName = currentUser.name || 'bạn';

    // 1. Ra lệnh tưới cây ("tưới cây đi", "tưới nước giúp tớ", "tưới hộ")
    if ((lower.includes('tưới cây') || lower.includes('tưới nước') || lower.includes('tưới hộ') || lower.includes('tưới giúp')) && !lower.includes('cách') && !lower.includes('làm sao')) {
      if ((inventory.water || 0) > 0) {
        handlePlantCare('water');
        return {
          mood: 'excited',
          reply: `🚿 Tuân lệnh sếp ${userName}! Tớ vừa cầm bình ra tưới nước cho cây ${plantName} luôn rồi nè (+10% sinh trưởng)! 🌱✨`
        };
      }
      return {
        mood: 'wink',
        reply: `💧 Á, tớ định chạy đi tưới cây cho ${userName} mà bình nước trong kho đang hết (0 giọt) rồi! Cậu tích vào Checklist hằng ngày để lấy nước trước nha!`
      };
    }

    // 2. Ra lệnh vun đất ("vun đất đi", "xới đất giúp tớ")
    if ((lower.includes('vun đất') || lower.includes('xới đất') || lower.includes('bón phân')) && !lower.includes('cách') && !lower.includes('làm sao')) {
      if ((inventory.soil || 0) > 0) {
        handlePlantCare('soil');
        return {
          mood: 'excited',
          reply: `🪴 Xong ngay! Tớ vừa cầm xẻng ra vun đất màu mỡ cho cây ${plantName} của ${userName} rồi đó (+15% sinh trưởng)! 🎉`
        };
      }
      return {
        mood: 'wink',
        reply: `🪴 Kho của ${userName} đang hết túi đất rồi nè! Cậu hoàn thành nhiệm vụ ngủ đủ giấc hoặc đọc sách trong Checklist để nhận thêm đất nhé!`
      };
    }

    // 3. Ra lệnh tỉa cành ("tỉa cành đi", "cắt lá giúp tớ")
    if ((lower.includes('tỉa cành') || lower.includes('cắt cành') || lower.includes('tỉa lá')) && !lower.includes('cách') && !lower.includes('làm sao')) {
      if ((inventory.scissors || 0) > 0) {
        handlePlantCare('snip');
        return {
          mood: 'excited',
          reply: `✂️ Tách tách! Tớ vừa tỉa gọn các lá héo cho cây ${plantName} giúp ${userName} rồi nha (+20% sinh trưởng)! 🌿✨`
        };
      }
      return {
        mood: 'wink',
        reply: `✂️ Hết kéo tỉa cành trong kho mất rồi ${userName} ơi! Cậu viết nhật ký hoặc làm nhiệm vụ hằng ngày để nhận thêm kéo nha.`
      };
    }

    // 4. Ra lệnh bật / tắt nhạc Lofi ("bật nhạc", "mở nhạc", "tắt nhạc")
    if (lower.includes('bật nhạc') || lower.includes('mở nhạc') || lower.includes('phát nhạc')) {
      setBgmVolume(75);
      setIsPlayingMusic(true);
      const audioEl = document.getElementById('lofi-bgm-audio');
      if (audioEl) {
        audioEl.volume = 0.75;
        audioEl.play().catch(() => {});
      }
      return {
        mood: 'excited',
        reply: `🎵 Tớ vừa bật bản nhạc Lofi Piano & Kalimba êm dịu ở mức 75% cho ${userName} rồi đó! Cùng nghe nhạc chill nhé 🎧✨`
      };
    }
    if (lower.includes('tắt nhạc') || lower.includes('dừng nhạc')) {
      setBgmVolume(0);
      setIsPlayingMusic(false);
      const audioEl = document.getElementById('lofi-bgm-audio');
      if (audioEl) audioEl.pause();
      return {
        mood: 'happy',
        reply: `🔇 Tớ đã tắt nhạc nền giúp ${userName} rồi nha! Khi nào muốn nghe lại cậu cứ bảo "bật nhạc" nhé.`
      };
    }

    // 5. Ra lệnh bật / tắt Dark Mode ("bật chế độ tối", "tắt đèn", "bật dark mode", "chế độ sáng", "bật đèn")
    if (lower.includes('chế độ tối') || lower.includes('bật tối') || lower.includes('dark mode') || lower.includes('tắt đèn') || lower.includes('ban đêm')) {
      setAutoRealTimeWeather(false);
      setIsDarkMode(true);
      setGardenTheme('night');
      return {
        mood: 'wink',
        reply: `🌙 Tớ vừa chuyển toàn bộ ứng dụng sang Chế Độ Tối (Đêm Đầy Sao) cho mắt của ${userName} dịu hơn rồi nè! ✨`
      };
    }
    if (lower.includes('chế độ sáng') || lower.includes('bật sáng') || lower.includes('light mode') || lower.includes('bật đèn') || lower.includes('ban ngày')) {
      setAutoRealTimeWeather(false);
      setIsDarkMode(false);
      setGardenTheme('morning');
      return {
        mood: 'excited',
        reply: `☀️ Tớ vừa bật lại Chế Độ Sáng (Nắng Sớm Trong Lành) rực rỡ cho ${userName} rồi đây!`
      };
    }

    // 6. Ra lệnh mở Tarot ("mở tarot", "rút thẻ", "bốc bài")
    if (lower.includes('mở tarot') || lower.includes('rút thẻ') || lower.includes('bốc bài') || lower.includes('rút bài')) {
      setShowTarotModal(true);
      return {
        mood: 'excited',
        reply: `🎴 Tớ mở sẵn bàn bài Tarot Vũ Trụ lên màn hình cho ${userName} rồi nè! Cậu chọn 1 lá bài đi nha ✨`
      };
    }

    // 7. Ra lệnh chuyển tab ("mở nhật ký", "mở sổ tay", "mở hồ sơ")
    if (lower.includes('mở nhật ký') || lower.includes('mở sổ tay') || lower.includes('viết nhật ký')) {
      setActiveTab('journal');
      return {
        mood: 'writing',
        reply: `📖 Tớ đã mở trang Sổ Tay Cảm Xúc cho ${userName} rồi đây! Cậu hãy viết ra những điều trong lòng nhé.`
      };
    }
    if (lower.includes('mở hồ sơ') || lower.includes('xem hồ sơ')) {
      setActiveTab('profile');
      return {
        mood: 'happy',
        reply: `👩‍🌾 Tớ vừa đưa ${userName} sang trang Hồ Sơ Nông Dân rồi nè!`
      };
    }

    return null;
  };

  const handleSendAiChatMessage = async (questionText) => {
    if (!questionText || !questionText.trim()) return;
    const cleanQuestion = questionText.trim();

    playSoundEffect('click');
    setShowMascotBubble(true);
    setMascotMood('thinking');
    setMascotBubbleText('Chờ tớ xíu nhé... 🧠✨');
    setIsAiTyping(true);
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: cleanQuestion }
    ]);
    setUserQuestion('');

    // Kiểm tra xem người dùng có đang ra lệnh thực hành trực tiếp (tưới cây, bật nhạc, đổi dark mode, mở tarot...) không
    const actionResult = tryExecuteMascotAction(cleanQuestion);
    if (actionResult) {
      setTimeout(() => {
        setMascotMood(actionResult.mood || 'excited');
        setIsAiTyping(false);
        setMascotBubbleText(actionResult.reply);
        setChatHistory(prev => [...prev, { sender: 'mascot', mood: actionResult.mood || 'excited', text: actionResult.reply }]);
      }, 800);
      return;
    }

    const plantName = PLANT_COLLECTION.find(p => p.id === currentPlantId)?.name || 'Cây của bạn';
    const userName = currentUser.name || 'bạn';
    const systemPrompt = `Đóng vai: Bé Chuột Chibi đáng yêu của ứng dụng "Trạm Chữa Lành". Xưng "tớ", gọi người dùng là "${userName}". Dữ liệu: Cây ${plantName} (${growth}%), ${inventory.water} nước, ${inventory.exp} EXP. Trả lời tiếng Việt rất ngắn gọn (1-3 câu), đúng trọng tâm, ấm áp, dùng emoji.\n\nCâu hỏi của ${userName}: "${cleanQuestion}"`;

    let aiReply = '';

    // Cách 1: Gọi trực tiếp Backend API (https://tram-check-in.onrender.com/api/chat)
    try {
      const newHistory = [
        ...chatHistory.map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text
        })),
        { role: 'user', content: cleanQuestion }
      ];
      const res = await fetch('https://tram-check-in.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory })
      });
      if (res.ok) {
        const data = await res.json();
        aiReply = data.reply?.trim() || '';
      }
    } catch (_) {
      aiReply = '';
    }

    // Cách 2: Nếu key Google bị lỗi -> Gọi cổng AI miễn phí không cần API Key (Pollinations AI)
    if (!aiReply) {
      try {
        const freeRes = await fetch('https://text.pollinations.ai/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: `Bạn là Bé Chuột, đứa bạn thân chí cốt siêu lầy lội, hài hước của "${userName}" trong Trạm Chữa Lành (đang trồng ${plantName} ${growth}%, có ${inventory.water} giọt nước, ${inventory.exp} EXP). BẮT BUỘC trả lời cực kỳ ngắn gọn (tối đa 2-3 câu ngắn), xưng "tớ" - gọi "cậu" tự nhiên như bạn thân, dùng từ ngữ Gen Z (ổn áp, keo lỳ, mãi mận, chill phết, đỉnh nóc kịch trần, overthinking...) và thỉnh thoảng thêm 1-2 emoji.`
              },
              { role: 'user', content: cleanQuestion }
            ],
            model: 'openai'
          })
        });
        if (freeRes.ok) {
          const textData = await freeRes.text();
          if (textData && textData.trim().length > 0 && !textData.includes('<!DOCTYPE')) {
            aiReply = textData.trim();
          }
        }
      } catch (_) {
        aiReply = '';
      }
    }

    // Cách 3: Bộ não nội bộ Offline (đảm bảo 100% luôn trả lời thông minh kể cả khi rớt mạng)
    if (!aiReply) {
      aiReply = generateSmartLocalMascotReply(cleanQuestion);
    }

    setMascotMood('happy');
    setIsAiTyping(false);
    setMascotBubbleText(aiReply);
    setChatHistory(prev => [...prev, { sender: 'mascot', mood: 'happy', text: aiReply }]);
  };

  useEffect(() => {
    if (showAiChatModal && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, showAiChatModal]);
  const handlePickTarotCard = (cardIdx) => {
    const today = new Date().toLocaleDateString('vi-VN');
    if (lastTarotDate === today && todayTarotCard) return;

    playSoundEffect('reward');
    setSelectedCardIndex(cardIdx);
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    
    setTimeout(() => {
      setTodayTarotCard(randomCard); triggerMascotExcited('Oa, nhận quà Tarot kìa! Tuyệt vời quá đi mất 🎉');
      setLastTarotDate(today);
      const mappedKey = randomCard.itemKey === 'fertilizer' ? 'soil' : randomCard.itemKey;
      setInventory(prev => ({
        ...prev,
        exp: prev.exp + randomCard.exp,
        water: prev.water + randomCard.water,
        ...(mappedKey ? { [mappedKey]: (prev[mappedKey] || 0) + 1 } : {}),
        ...(randomCard.itemKey ? { [randomCard.itemKey]: (prev[randomCard.itemKey] || 0) + 1 } : {})
      }));
    }, 400);
  };

  // 2. Hàm tìm & ghé thăm vườn Hàng Xóm (Tìm UID thật trong localStorage hoặc NPC)
  const handleVisitNeighbor = (targetUid) => {
    playSoundEffect('click');
    const cleanUid = (targetUid || neighborSearchInput).trim().toUpperCase();
    if (!cleanUid) return showAlert("Nhắc nhở", "Vui lòng nhập Mã UID của bạn bè để ghé thăm nhé!", "error");
    if (cleanUid === playerUID) return showAlert("Đây là vườn của bạn! 🌱", "Bạn đang đứng ngay trong khu vườn của chính mình rồi!", "error");

    // Kiểm tra xem có trong danh sách NPC mẫu không
    const npc = DEFAULT_NEIGHBORS.find(n => n.uid === cleanUid);
    if (npc) {
      setVisitingNeighbor({ ...npc, isRealUser: false });
      return;
    }

    // Quét trong localStorage xem có tài khoản thật với UID này không
    let foundRealUser = null;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('tram_chua_lanh_save_')) {
        try {
          const data = JSON.parse(localStorage.getItem(k));
          const accId = k.replace('tram_chua_lanh_save_', '');
          if (data.playerUID === cleanUid || accId.toUpperCase() === cleanUid) {
            foundRealUser = {
              uid: cleanUid,
              storageKey: k,
              name: data.profileName || accId,
              avatar: '👩‍🌾',
              img: data.profileAvatar,
              plantId: data.currentPlantId || 'seed_1',
              growth: data.growth || 0,
              unlockedCount: (data.unlockedPlants || ['seed_1']).length,
              bio: `Nông dân chăm chỉ tại Trạm Chữa Lành (${data.inventory?.exp || 0} EXP)`,
              isRealUser: true,
              rawSave: data
            };
            break;
          }
        } catch (e) {}
      }
    }

    if (foundRealUser) {
      setVisitingNeighbor(foundRealUser);
    } else {
      showAlert("Không tìm thấy UID 🔍", `Không tìm thấy khu vườn nào có mã "${cleanUid}". Bạn có thể ghé thăm 3 khu vườn hàng xóm gợi ý bên dưới nhé!`, "error");
    }
  };

  // 3. Hàm Tưới nước hộ Hàng Xóm (Tối đa 3 người/ngày, thưởng +15 EXP)
  const handleWaterNeighbor = () => {
    if (!visitingNeighbor) return;
    const today = new Date().toLocaleDateString('vi-VN');
    const listToday = neighborWaterDate === today ? wateredNeighborsToday : [];

    if (listToday.includes(visitingNeighbor.uid)) {
      return showAlert("Đã tưới hôm nay! 💧", `Hôm nay bạn đã tưới giúp khu vườn của ${visitingNeighbor.name} rồi. Hãy quay lại vào ngày mai nhé!`, "error");
    }
    if (listToday.length >= 3) {
      return showAlert("Hết lượt tưới hộ! 🪣", "Mỗi ngày bạn chỉ có 3 lượt tưới nước giúp bạn bè thôi nhé!", "error");
    }

    playSoundEffect('water');
    const updatedList = [...listToday, visitingNeighbor.uid];
    setNeighborWaterDate(today);
    setWateredNeighborsToday(updatedList);
    setInventory(prev => ({ ...prev, exp: prev.exp + 15 }));

    // Nếu là tài khoản thật trên máy -> Cộng +5% sinh trưởng & +1 nước vào save của họ
    if (visitingNeighbor.isRealUser && visitingNeighbor.storageKey) {
      const updatedRaw = {
        ...visitingNeighbor.rawSave,
        growth: Math.min(100, (visitingNeighbor.rawSave.growth || 0) + 5),
        isWithered: false,
        inventory: {
          ...(visitingNeighbor.rawSave.inventory || {}),
          water: ((visitingNeighbor.rawSave.inventory?.water) || 0) + 1
        }
      };
      localStorage.setItem(visitingNeighbor.storageKey, JSON.stringify(updatedRaw));
    }

    setVisitingNeighbor(prev => ({ ...prev, growth: Math.min(100, prev.growth + 5) }));
    showAlert("Tưới nước giúp bạn bè! 💧✨", `Cây của ${visitingNeighbor.name} đã tươi tốt hơn (+5% sinh trưởng).\nBạn nhận được +15 EXP vì lòng tốt của mình!`, "success");
  };

  // 4. Hàm gửi Sticker động viên cho Hàng Xóm
  const handleSendStickerToNeighbor = (sticker) => {
    if (!visitingNeighbor) return;
    playSoundEffect('reward');
    const today = new Date().toLocaleDateString('vi-VN');

    if (visitingNeighbor.isRealUser && visitingNeighbor.storageKey) {
      const oldInbox = visitingNeighbor.rawSave.inboxStickers || [];
      const updatedRaw = {
        ...visitingNeighbor.rawSave,
        inboxStickers: [{ from: currentUser.name, icon: sticker.icon, text: sticker.text, date: today }, ...oldInbox.slice(0, 19)]
      };
      localStorage.setItem(visitingNeighbor.storageKey, JSON.stringify(updatedRaw));
    }
    setInventory(prev => ({ ...prev, exp: prev.exp + 5 }));
    showAlert("Đã gửi lời nhắn ấm áp! 💌", `Bạn đã dán sticker "${sticker.icon} ${sticker.text}" lên bảng gỗ nhà ${visitingNeighbor.name} (+5 EXP)!`, "success");
  };

  const todayString = new Date().toLocaleDateString('vi-VN');
  const canCheckIn = lastCheckInDate !== todayString;

  useEffect(() => { setIsWithered(daysNeglected >= 3); }, [daysNeglected]);

  // Tạo 4 nhiệm vụ cố định trong ngày cho từng người dùng
  useEffect(() => {
    const currentToday = new Date().toLocaleDateString('vi-VN');
    const activeId = sessionKey || playerUID;
    const seed = (activeId + currentToday).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const ordered = [...TASK_POOL].sort((a, b) => {
      const ha = (seed * 31 + a.text.charCodeAt(0)) % 97;
      const hb = (seed * 31 + b.text.charCodeAt(0)) % 97;
      return ha - hb;
    });
    const doneList = dailyTasksDate === currentToday ? completedTasksToday : [];
    const dailyTasks = ordered.slice(0, 4).map((t, index) => ({
      ...t,
      id: `task_${index + 1}`,
      checked: doneList.includes(`task_${index + 1}`) || doneList.includes(index + 1)
    }));
    setTasks(dailyTasks);
    setTaskDate(currentToday);
  }, [sessionKey, dailyTasksDate, completedTasksToday]);

  // Hoàn thành 1 nhiệm vụ trong Checklist Hằng Ngày (mỗi ngày chỉ làm 1 lần/task)
  const handleCompleteDailyTask = (taskId, rewardWater = 1, rewardExp = 25, taskObj = null) => {
    const today = new Date().toLocaleDateString('vi-VN');
    const currentCompleted = (dailyTasksDate === today) ? completedTasksToday : [];

    if (currentCompleted.includes(taskId)) {
      return showAlert("Đã hoàn thành hôm nay! ✅", "Mỗi thói quen trong Checklist chỉ được nhận thưởng 1 lần/ngày. Hãy quay lại vào ngày mai nhé!", "error");
    }

    playSoundEffect('reward');
    const updatedCompleted = [...currentCompleted, taskId];
    setDailyTasksDate(today);
    setCompletedTasksToday(updatedCompleted);
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, checked: true } : t));

    const extraKey = taskObj?.reward && taskObj.reward !== 'water' ? taskObj.reward : null;
    setInventory(prev => ({
      ...prev,
      water: prev.water + rewardWater,
      ...(extraKey ? { [extraKey]: (prev[extraKey] || 0) + 1 } : {}),
      exp: prev.exp + rewardExp
    }));

    checkAchievements('task'); triggerMascotExcited('Oa, hoàn thành Checklist nhận quà kìa! Tuyệt vời quá đi mất 🎉');
    showAlert("Tuyệt vời! 🌟", `Bạn đã hoàn thành thói quen hôm nay và nhận được +${rewardExp} EXP, +${rewardWater} 💧!`, "success");
  };

  const handleTaskComplete = (task) => handleCompleteDailyTask(task.id, 1, 25, task);

  const carePlant = (item, boost) => {
    if (item === 'water') return triggerPlantCareAction('water');
    if (item === 'scissors' || item === 'snip') return triggerPlantCareAction('snip');
    if (item === 'soil') return triggerPlantCareAction('soil');

    if (inventory[item] <= 0) return showAlert("Hết vật phẩm!", "Bạn đã hết vật phẩm này rồi, hãy làm nhiệm vụ để kiếm thêm nhé.", "error");
    if (isWithered && item !== 'water') return showAlert("Chú ý", "Cây đang héo! Cần Tưới Nước khẩn cấp.", "error");
    if (growth >= 100) return showAlert("Thành quả", "Cây đã trưởng thành tối đa! Hãy qua tab Chăm Cây để thu hoạch ngay 🧺", "success");
    playSoundEffect('click');
    const activePlant = PLANT_COLLECTION.find(p => p.id === currentPlantId) || PLANT_COLLECTION[0];
    const scaledBoost = Math.max(1, Math.round(boost * (activePlant.growthRate || 1)));
    setInventory(prev => ({ ...prev, [item]: prev[item] - 1 }));
    setGrowth(prev => Math.min(100, prev + scaledBoost));
    setIsWithered(false);
    setDaysNeglected(0);
    checkAchievements('care'); triggerMascotExcited('Oa, cây được chăm sóc lớn nhanh kìa! Tuyệt vời quá đi mất 🎉');
  };

  const harvestPlant = () => {
    if (growth < 100) return;

    playSoundEffect('reward');
    const activePlant = PLANT_COLLECTION.find(p => p.id === currentPlantId) || PLANT_COLLECTION[0];
    const expReward = activePlant.harvestExp || 100;

    setInventory(prev => ({ ...prev, exp: prev.exp + expReward }));
    setGrowth(0);
    setDaysNeglected(0);
    setIsWithered(false);
    const randomMsg = HARVEST_MESSAGES[Math.floor(Math.random() * HARVEST_MESSAGES.length)];

    // Gọi kiểm tra thành tựu
    checkAchievements('mature'); triggerMascotExcited('Oa, thu hoạch cây nhận đầy EXP kìa! Tuyệt vời quá đi mất 🎉');

    // Thay thế alert() bằng showAlert() trung tâm
    showAlert(
      "Thu hoạch thành công! 🌻",
      `Bạn nhận được +${expReward} EXP từ "${activePlant.name}".\n\n💌 Thông điệp từ Khu Vườn:\n"${randomMsg}"\n\nCây đã trở về dạng hạt giống 🌱`,
      "success"
    );
  };

  const submitJourney = () => {
    if (!canCheckIn) return showAlert("Khoan đã", "Hôm nay bạn đã viết nhật ký rồi! Hãy quay lại vào ngày mai nhé 💖", "error");
    
    playSoundEffect('reward');
    const now = new Date();
    const fullDateKey = formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
    setJourneyHistory([...journeyHistory, {
      fullDate: fullDateKey,
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      emotion: emotionInput,
      moodIcon: emotionInput?.icon || '🌿',
      moodLabel: emotionInput?.label || 'Đã check-in',
      note: noteInput,
      date: todayString
    }]);
    
    setLastCheckInDate(todayString);
    setInventory(prev => ({ ...prev, water: prev.water + 1, exp: prev.exp + 50 }));
    showAlert("Tuyệt vời!", "Lưu nhật ký thành công! Bạn nhận được +1 💧 và +50 EXP.", "success");
    setEmotionInput(null);
    setNoteInput('');
    checkAchievements('journal'); triggerMascotExcited('Oa, viết nhật ký nhận quà kìa! Tuyệt vời quá đi mất 🎉');
  };

  const leaderboardList = getLeaderboardData();
  const btnMotionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.92 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  };

  return (
    <div className={`relative min-h-screen font-sans flex flex-col md:flex-row select-none transition-colors duration-500 ${
      isDarkMode
        ? 'dark-mode-app bg-slate-950 text-slate-100'
        : 'bg-gradient-to-br from-emerald-50/60 via-amber-50/40 to-teal-50/50 text-slate-800'
    }`}>
      {/* Nguồn nhạc nền Lofi chuẩn định dạng streaming êm dịu */}
      <audio 
        id="lofi-bgm-audio"
        loop 
        src="/assets/audio/lofi-healing-garden.wav"
        ref={(el) => {
          if (el) el.volume = bgmVolume;
        }}
      />

      {/* === 4. WIDGET "CÀI ĐẶT ÂM THANH" NỔI Ở GÓC TRÊN PHẢI (3 THANH TRƯỢT CHI TIẾT) === */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-2">
        {/* Nút mở bảng chỉnh âm thanh */}
        <motion.button 
          {...btnMotionProps}
          onClick={() => {
            playSoundEffect('click');
            if (!showAudioSettings && bgmVolume > 0) { setIsAudioEnabled(true); document.getElementById('lofi-bgm-audio')?.play().catch(() => {}); } setShowAudioSettings(!showAudioSettings);
          }}
          className={`font-black text-xs px-3.5 py-2 rounded-2xl shadow-md border flex items-center gap-1.5 cursor-pointer transition-colors ${
            isDarkMode
              ? 'bg-slate-900/95 text-slate-100 border-slate-700 hover:bg-slate-800'
              : 'bg-white/95 hover:bg-white text-slate-700 border-emerald-100'
          }`}
        >
          <span>🎵 Âm thanh</span>
          <span>{bgmVolume > 0 || sfxVolume > 0 || plantVolume > 0 ? '🔊' : '🔇'}</span>
        </motion.button>

        {/* Popup Bảng chi tiết 3 thanh trượt âm lượng */}
        {showAudioSettings && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`absolute top-12 right-0 w-72 backdrop-blur-md p-4 rounded-3xl shadow-2xl border flex flex-col gap-3.5 z-50 ${
              isDarkMode
                ? 'bg-slate-900/95 border-slate-700 text-slate-100'
                : 'bg-white/95 border-emerald-100 text-slate-800'
            }`}
          >
            <div className={`flex justify-between items-center border-b pb-2 ${
              isDarkMode ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <span className="font-black text-xs flex items-center gap-1.5">
                🎛️ Điều Chỉnh Âm Lượng
              </span>
              <button
                onClick={() => {
                  playSoundEffect('click');
                  setShowAudioSettings(false);
                }}
                className="text-slate-400 hover:text-rose-500 font-bold text-xs px-1.5 py-0.5 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Thanh 1: Nhạc nền Lofi */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="flex items-center gap-1">
                  🎶 Nhạc Nền Lofi
                  <button
                    onClick={toggleBgmMusic}
                    className={`ml-1 px-2 py-0.5 rounded-full text-[9px] font-black cursor-pointer ${
                      isBgmPlaying
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isBgmPlaying ? 'Đang phát' : 'Bật nhạc'}
                  </button>
                </span>
                <span className="text-emerald-600 font-black">{Math.round(bgmVolume * 100)}%</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" value={bgmVolume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateBgmVolume(val); if (val > 0) document.getElementById('lofi-bgm-audio')?.play().catch(() => {}); else document.getElementById('lofi-bgm-audio')?.pause();
                }}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Thanh 2: Tiếng nhấn nút (Click/Tap) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span>🖱️ Tiếng Bấm Nút</span>
                <span className="text-purple-600 font-black">{Math.round(sfxVolume * 100)}%</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" value={sfxVolume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setSfxVolume(val);
                  playSoundEffect('click', val);
                }}
                className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Thanh 3: Tiếng Tưới Cây & Nhận Thưởng */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span>🌱 Tưới Cây & Nhận Quà</span>
                <span className="text-amber-600 font-black">{Math.round(plantVolume * 100)}%</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" value={plantVolume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setPlantVolume(val);
                  playSoundEffect('reward', val);
                }}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* SIDEBAR DỌC TRÊN DESKTOP (md:) */}
      <aside className={"hidden md:flex md:w-72 md:h-screen md:sticky md:top-0 backdrop-blur-md border-r flex-col justify-between p-6 z-40 shadow-xs transition-colors duration-500 " + (isDarkMode ? "bg-slate-900/95 border-slate-800 text-slate-100" : "bg-white/90 border-emerald-100 text-slate-800")}>
        <div className="space-y-4">
          {/* AUTH CARD - GÓC TRÊN TRÁI */}
          <div className="mb-4 relative z-20">
            {!isLoggedIn ? (
              // Trạng thái: CHƯA ĐĂNG NHẬP
              <div className="bg-gradient-to-br from-pink-100 to-rose-50 p-5 rounded-3xl border border-pink-200 shadow-sm flex flex-col items-center text-center gap-3 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/40 rounded-full blur-md"></div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-inner mb-1 border border-pink-100 z-10">🌱</div>
                <div className="z-10">
                  <h3 className="font-black text-pink-800 text-sm">Chào bạn mới!</h3>
                  <p className="text-[10px] text-pink-500 font-bold mt-1">Đăng nhập để lưu hành trình</p>
                </div>
                <motion.button {...btnMotionProps} onClick={() => { playSoundEffect('click'); openAuth(); }} className="w-full bg-pink-400 text-white font-black text-xs py-3 rounded-xl shadow-md shadow-pink-200 hover:bg-pink-500 transition-all z-10 cursor-pointer">
                  🔑 Bắt đầu ngay ➔
                </motion.button>
              </div>
            ) : (
              // Trạng thái: ĐÃ ĐĂNG NHẬP
              <div className={"p-5 rounded-3xl border shadow-sm flex flex-col items-center text-center gap-3 transition-colors " + (isDarkMode ? "bg-slate-800/90 border-slate-700" : "bg-white border-rose-100")}>
                <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center text-3xl shadow-inner border border-rose-100 overflow-hidden p-1">
                  <img
                    src={currentUser.img || currentUser.avatar}
                    alt="Avatar"
                    className="w-full h-full object-contain"
                    onError={(e) => { if (!tryFallbackStageImg(e)) { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; } }}
                  />
                  <span className="hidden">{currentUser.icon || '👩🌾'}</span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Khu vườn của</p>
                  <h3 className={"font-black text-base " + (isDarkMode ? "text-slate-100" : "text-slate-800")}>{currentUser.name}</h3>
                </div>
                <div className="flex gap-2 w-full mt-2">
                  <motion.button {...btnMotionProps} onClick={() => { playSoundEffect('click'); openAuth(); }} className="flex-1 bg-slate-50 text-slate-600 font-bold text-[10px] py-2 rounded-xl border border-slate-100 shadow-sm hover:bg-slate-100 transition-colors cursor-pointer">
                    Đổi TK
                  </motion.button>
                  <motion.button {...btnMotionProps} onClick={() => { playSoundEffect('click'); logout(); }} className="flex-1 bg-rose-50 text-rose-600 font-bold text-[10px] py-2 rounded-xl border border-rose-100 hover:bg-rose-100 transition-colors cursor-pointer">
                    Đăng xuất
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          {/* Badge EXP & Nút Mở Cài Đặt Âm Thanh */}
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 p-3 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <span className="text-xs font-bold text-slate-600">Điểm Chữa Lành</span>
              </div>
              <span className="text-sm font-black text-amber-600">{inventory.exp} EXP</span>
            </div>

            <motion.button
              {...btnMotionProps}
              onClick={() => { playSoundEffect('click'); if (!showAudioSettings && bgmVolume > 0) { setIsAudioEnabled(true); document.getElementById('lofi-bgm-audio')?.play().catch(() => {}); } setShowAudioSettings(prev => !prev); }}
              className={"w-full p-2.5 rounded-2xl border flex items-center justify-between text-xs font-black transition-all cursor-pointer " + (isBgmPlaying ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs" : isDarkMode ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-emerald-50/50")}
            >
              <span className="flex items-center gap-2">
                <span className={isBgmPlaying ? 'animate-spin' : ''}>🎛️</span>
                <span>Cài đặt Âm thanh</span>
              </span>
              <span className={"px-2 py-0.5 rounded-full text-[10px] " + (isBgmPlaying ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600")}>
                {isBgmPlaying ? `Lofi ${Math.round(bgmVolume * 100)}%` : 'Tùy chỉnh 🔊'}
              </span>
            </motion.button>
          </div>

          {/* Danh sách Menu */}
          <nav className="space-y-1.5">
            <motion.button
              {...btnMotionProps}
              onClick={() => { playUiSound('click'); setActiveTab('care'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition cursor-pointer ${
                activeTab === 'care'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-emerald-400'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <Sprout size={20} />
              <span>Vườn & Cây Xanh</span>
            </motion.button>

            <motion.button
              {...btnMotionProps}
              onClick={() => { playUiSound('click'); setActiveTab('tasks'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition cursor-pointer ${
                activeTab === 'tasks'
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-blue-400'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <ListTodo size={20} />
              <span>Checklist Thói Quen</span>
            </motion.button>

            <motion.button
              {...btnMotionProps}
              onClick={() => { playUiSound('click'); setActiveTab('journey'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition cursor-pointer ${
                activeTab === 'journey'
                  ? 'bg-rose-400 text-white shadow-md shadow-rose-200'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-rose-400'
                    : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700'
              }`}
            >
              <CalendarDays size={20} />
              <span>Hành Trình 7 Ngày</span>
            </motion.button>

            <motion.button
              {...btnMotionProps}
              onClick={() => { playUiSound('click'); setActiveTab('collection'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition cursor-pointer ${
                activeTab === 'collection'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-amber-400'
                    : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              <LayoutGrid size={20} />
              <span>Bộ Sưu Tập Cây</span>
            </motion.button>

            <motion.button
              {...btnMotionProps}
              onClick={() => { playUiSound('click'); setActiveTab('profile'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-200'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-purple-400'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <User size={20} />
              <span>Hồ Sơ Nông Dân</span>
            </motion.button>
          </nav>
        </div>

        {/* Chân Sidebar */}
        <div className={`pt-4 border-t space-y-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between px-1">
            <span>Mã UID</span>
            <span className={`font-mono font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{playerUID}</span>
          </div>
          <motion.button
            {...btnMotionProps}
            onClick={() => { playUiSound('click'); backToReceipt(); }}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer border ${
              isDarkMode
                ? 'text-slate-300 border-slate-700 hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <ArrowLeft size={16} /> Quay lại Phiếu Khám
          </motion.button>
        </div>
      </aside>

      {/* KHU VỰC NỘI DUNG CHÍNH (MAIN CONTENT) */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header trên Mobile */}
        <header className={`md:hidden p-4 pt-16 flex justify-between items-center shadow-xs rounded-b-3xl transition-colors ${
          isDarkMode
            ? 'bg-slate-900 border-b border-slate-800 text-slate-100'
            : 'bg-white text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-100 flex justify-center items-center p-0.5 bg-white shadow-xs">
              <img 
                src={currentAvatar.img} 
                alt={currentAvatar.name} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  if (!tryFallbackStageImg(e)) {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                  }
                }}
              />
              <span className="text-xl hidden">{currentAvatar.icon}</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Khu vườn của</p>
              <p className={`text-sm font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{currentUser.name}</p>
            </div>
          </div>
          <div className="bg-amber-100 text-amber-600 px-3 py-1.5 rounded-2xl text-xs font-black">⭐ {inventory.exp} EXP</div>
        </header>

        {/* Vùng nội dung cuộn */}
        <div className="flex-1 p-4 md:p-10 md:pt-14 max-w-6xl w-full mx-auto pb-32 md:pb-12 overflow-y-auto">
          {/* TAB 1: CHĂM CÂY */}
          {activeTab === 'care' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* KHUNG CÂY TRUNG TÂM */}
                {(() => {
                  const activePlant = PLANT_COLLECTION.find(p => p.id === currentPlantId) || PLANT_COLLECTION[0];
                  const coords = SPRITE_COORDS[activePlant.id] || SPRITE_COORDS.seed_1;
                  const { healthyIdx, witheredIdx, label, stageImage } = getPlantStageInfo(growth, isWithered, activePlant.id);
                  const activeTheme = GARDEN_THEMES.find(t => t.id === gardenTheme) || GARDEN_THEMES[0];

                  const posX = isWithered ? coords.witheredX[witheredIdx] : coords.healthyX[healthyIdx];
                  const isTwoRows = activePlant.layout === 'two-rows';
                  const posY = isTwoRows ? (isWithered ? '98%' : '6%') : '78%';
                  const bgSize = isTwoRows ? `${coords.widthScale} 205%` : `${coords.widthScale} auto`;
                  const todayStr = new Date().toLocaleDateString('vi-VN');
                  const hasDrawnTarotToday = lastTarotDate === todayStr && !!todayTarotCard;

                  return (
                    <div className={`md:col-span-7 relative z-20 rounded-[32px] p-6 border-2 transition-all duration-700 shadow-sm flex flex-col items-center w-full ${activeTheme.bgClass}`}>
                      
                      {/* === 1. LỚP CHUYỂN ĐỘNG BẦU TRỜI & THỜI TIẾT SỐNG ĐỘNG === */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[30px] z-0">
                        
                        {/* CHỦ ĐỀ 1: NẮNG SỚM BAN MAI (Tia nắng xoay tròn + Mây trôi ngang + Bướm bay) */}
                        {gardenTheme === 'morning' && (
                          <>
                            {/* Ông mặt trời + Vòng tia nắng xoay 360 độ */}
                            <div className="absolute top-16 right-8 w-20 h-20 flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-4 border-dashed border-amber-300/60 scale-125"
                              />
                              <motion.div 
                                animate={{ scale: [1, 1.08, 1] }} 
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-400 shadow-[0_0_40px_rgba(251,191,36,0.9)]"
                              />
                            </div>
                            {/* Mây trắng trôi bồng bềnh ngang qua bầu trời */}
                            <motion.div 
                              animate={{ x: [-40, 260, -40] }} 
                              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute top-14 left-4 text-4xl opacity-80 drop-shadow-sm"
                            >
                              ☁️
                            </motion.div>
                            <motion.div 
                              animate={{ x: [220, -60, 220] }} 
                              transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute top-28 left-12 text-3xl opacity-65"
                            >
                              ☁️
                            </motion.div>
                            {/* Cánh bướm nhỏ bay lượn quanh vườn */}
                            <motion.div
                              animate={{ x: [0, 40, -20, 0], y: [0, -25, -10, 0], rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute bottom-28 left-16 text-lg opacity-80"
                            >
                              🦋
                            </motion.div>
                            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-emerald-200/50 to-transparent" />
                          </>
                        )}

                        {/* CHỦ ĐỀ 2: HOÀNG HÔN TÍM HỒNG (Mặt trời lặn dần + Đàn chim bay lượn sóng) */}
                        {gardenTheme === 'sunset' && (
                          <>
                            <motion.div 
                              animate={{ y: [0, 12, 0], scale: [1, 1.04, 1] }} 
                              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute bottom-14 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-gradient-to-b from-amber-200 via-orange-400 to-rose-500 opacity-65 shadow-[0_0_70px_rgba(244,63,94,0.8)]"
                            />
                            {/* Đàn chim bay ngang qua bầu trời chiều */}
                            <motion.div 
                              animate={{ x: [-50, 320], y: [10, -15, 5, -20] }} 
                              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                              className="absolute top-20 left-0 flex gap-3 text-lg opacity-80"
                            >
                              <span>🕊️</span>
                              <span className="mt-2 text-sm">🕊️</span>
                            </motion.div>
                            <motion.div 
                              animate={{ x: [-30, 30, -30] }} 
                              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute top-14 right-16 text-3xl opacity-60"
                            >
                              ☁️
                            </motion.div>
                            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-purple-900/30 via-rose-400/20 to-transparent" />
                          </>
                        )}

                        {/* CHỦ ĐỀ 3: MƯA PHÙN CHỮA LÀNH (Mây trôi + Hạt mưa rơi + Giọt nước nảy dưới đất) */}
                        {gardenTheme === 'rainy' && (
                          <>
                            <motion.div animate={{ x: [-10, 15, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-14 left-8 text-5xl opacity-75">🌧️</motion.div>
                            <motion.div animate={{ x: [15, -10, 15] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-16 right-10 text-5xl opacity-75">🌧️</motion.div>
                            <div className="absolute inset-0 flex justify-around">
                              {Array.from({ length: 18 }).map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ y: -20, x: 10, opacity: 0 }}
                                  animate={{ y: 360, x: -20, opacity: [0, 0.65, 0] }}
                                  transition={{ duration: 0.9 + (i % 3) * 0.2, repeat: Infinity, delay: i * 0.12, ease: "linear" }}
                                  className="w-[1.5px] h-6 bg-sky-500/60 rounded-full rotate-[15deg]"
                                />
                              ))}
                            </div>
                          </>
                        )}

                        {/* CHỦ ĐỀ 4: ĐÊM SAO LẤP LÁNH (Trăng đung đưa + Sao băng + Đom đóm bay quanh cây) */}
                        {gardenTheme === 'night' && (
                          <>
                            <motion.div 
                              animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
                              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute top-14 right-10 text-4xl drop-shadow-[0_0_20px_rgba(253,224,71,0.9)]"
                            >
                              🌙
                            </motion.div>
                            {/* Sao lấp lánh */}
                            {Array.from({ length: 10 }).map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }}
                                transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.25 }}
                                style={{ top: `${15 + (i * 7) % 50}%`, left: `${8 + (i * 13) % 82}%` }}
                                className="absolute text-xs text-yellow-200"
                              >
                                ✨
                              </motion.div>
                            ))}
                            {/* Đom đóm phát sáng bay lượn dưới gốc cây */}
                            {Array.from({ length: 6 }).map((_, i) => (
                              <motion.div
                                key={`firefly-${i}`}
                                animate={{ 
                                  x: [0, (i % 2 === 0 ? 30 : -30), 0], 
                                  y: [0, -40, 0],
                                  opacity: [0.3, 1, 0.3] 
                                }}
                                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                                style={{ bottom: `${20 + (i * 8)}%`, left: `${25 + (i * 10)}%` }}
                                className="absolute w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#fde047]"
                              />
                            ))}
                          </>
                        )}
                      </div>

                      {/* === 2. HEADER TRẠNG THÁI & NÚT TRANG TRÍ / RÚT THẺ === */}
                      <div className="relative z-10 flex flex-wrap justify-between items-center w-full gap-2 mb-3">
                        <span className="bg-white/90 text-emerald-700 font-black text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                          {label}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <motion.button {...btnMotionProps} onClick={() => { playUiSound('click'); setShowTarotModal(true); }} className="relative bg-white/95 hover:bg-white text-purple-700 font-black text-xs px-3.5 py-1.5 rounded-full shadow-sm border border-purple-100 flex items-center gap-1.5 cursor-pointer">
                            🎴 Rút Thẻ
                            {!hasDrawnTarotToday && (
                              <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white absolute -top-0.5 -right-0.5" />
                            )}
                          </motion.button>
                          <motion.button {...btnMotionProps} onClick={() => { playUiSound('click'); setShowCustomizeModal(true); }} className="bg-white/95 hover:bg-white text-rose-600 font-black text-xs px-3.5 py-1.5 rounded-full shadow-sm border border-rose-100 flex items-center gap-1.5 cursor-pointer">
                            🎨 Trang Trí Vườn
                          </motion.button>
                        </div>
                      </div>

                      {/* Tên cây đang trồng */}
                      <h2 className={`relative z-10 font-black text-2xl mb-1 flex items-center gap-2 ${activeTheme.isDark ? 'text-white drop-shadow' : 'text-slate-800'}`}>
                        {activePlant.name} <span>{activePlant.icon}</span>
                      </h2>
                      <span className="relative z-10 text-[11px] font-bold text-amber-700 bg-amber-50/90 border border-amber-200 px-3 py-0.5 rounded-full mb-2">
                        ✨ Hạng {activePlant.rarity || 'Khởi Đầu'} • Thu hoạch +{activePlant.harvestExp || 100} EXP
                      </span>

                      {/* === 3. CÂY ĐUNG ĐƯA SỐNG ĐỘNG THEO GIÓ + HOẠT HÌNH CÔNG CỤ DI CHUYỂN TỪ NÚT BẤM SANG CHĂM CÂY === */}
                      <div ref={plantStageRef} className="relative z-30 flex flex-col items-center mt-1 mb-3">
                        
                        {/* 1. Hoạt hình Bình Tưới Nước Xanh: Bay từ nút "Tưới nước" sang nghiêng vòi tưới cho cây */}
                        {activeToolAnim === 'water' && (
                          <div key={`water-${toolAnimRunId}`} className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                            <motion.div
                              initial={{
                                opacity: 0,
                                x: toolStartOffset.x,
                                y: toolStartOffset.y,
                                scale: 0.42,
                                rotate: -10
                              }}
                              animate={{
                                opacity: [0, 1, 1, 1, 1, 0],
                                x: [toolStartOffset.x, -88, -82, -86, -80, -95],
                                y: [toolStartOffset.y, -48, -32, -36, -30, -45],
                                scale: [0.42, 1.02, 1, 1.03, 1, 0.75],
                                rotate: [-10, -6, 32, 37, 30, 5]
                              }}
                              transition={{
                                duration: 2.05,
                                times: [0, 0.28, 0.45, 0.68, 0.86, 1],
                                ease: "easeInOut"
                              }}
                              className="w-28 h-24 md:w-32 md:h-28 drop-shadow-[0_12px_16px_rgba(15,23,42,0.28)]"
                            >
                              <img
                                src="/assets/tools/watering-can.png"
                                alt="Bình tưới nước"
                                onError={tryFallbackStageImg}
                                className="w-full h-full object-contain select-none"
                              />
                            </motion.div>

                            {/* Tia nước & giọt nước phun ra từ vòi sen của bình tưới xuống tán cây */}
                            {[0, 1, 2, 3, 4, 5].map((dropIdx) => (
                              <motion.div
                                key={dropIdx}
                                initial={{ opacity: 0, x: -24, y: -26, scale: 0.4 }}
                                animate={{
                                  opacity: [0, 0, 1, 0.95, 0],
                                  x: [-24, -20, -4 + dropIdx * 8, 8 + dropIdx * 10, 14 + dropIdx * 11],
                                  y: [-26, -24, 4 + (dropIdx % 3) * 12, 38 + (dropIdx % 3) * 14, 64],
                                  scale: [0.4, 0.6, 1, 0.9, 0.5]
                                }}
                                transition={{
                                  duration: 1.5,
                                  delay: 0.48 + dropIdx * 0.08,
                                  ease: "easeOut"
                                }}
                                className="absolute text-lg md:text-xl drop-shadow-sm select-none"
                              >
                                {dropIdx % 2 === 0 ? '💧' : '💦'}
                              </motion.div>
                            ))}

                            {/* Nhãn +10% Sinh trưởng bay lên */}
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.7 }}
                              animate={{ opacity: [0, 1, 1, 0], y: [10, -35, -55, -70], scale: [0.7, 1.05, 1, 0.85] }}
                              transition={{ duration: 1.5, delay: 0.55 }}
                              className="absolute -top-6 bg-sky-500/95 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-white/80 whitespace-nowrap"
                            >
                              💧 Tưới mát +10%
                            </motion.div>
                          </div>
                        )}

                        {/* 2. Hoạt hình Cuốc Xới Đất: Bay từ nút "Vun đất" sang gốc chậu cây và xới đất */}
                        {activeToolAnim === 'soil' && (
                          <div key={`soil-${toolAnimRunId}`} className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                            <motion.div
                              initial={{
                                opacity: 0,
                                x: toolStartOffset.x,
                                y: toolStartOffset.y,
                                scale: 0.42,
                                rotate: 20
                              }}
                              animate={{
                                opacity: [0, 1, 1, 1, 1, 0],
                                x: [toolStartOffset.x, 48, 28, 44, 26, 42],
                                y: [toolStartOffset.y, 18, 44, 22, 46, 32],
                                scale: [0.42, 1, 1.05, 1, 1.05, 0.75],
                                rotate: [20, 22, -14, 18, -16, 6]
                              }}
                              transition={{
                                duration: 2.05,
                                times: [0, 0.28, 0.48, 0.66, 0.84, 1],
                                ease: "easeInOut"
                              }}
                              className="w-24 h-28 md:w-28 md:h-32 drop-shadow-[0_12px_16px_rgba(15,23,42,0.28)]"
                            >
                              <img
                                src="/assets/tools/soil-hoe.png?v=2"
                                alt="Cuốc vun đất"
                                onError={tryFallbackStageImg}
                                className="w-full h-full object-contain select-none"
                              />
                            </motion.div>

                            {/* Hạt đất màu mỡ & ánh sao dinh dưỡng bung lên ở miệng chậu */}
                            {[0, 1, 2, 3, 4].map((sIdx) => (
                              <motion.div
                                key={sIdx}
                                initial={{ opacity: 0, x: 0, y: 65, scale: 0.5 }}
                                animate={{
                                  opacity: [0, 0, 1, 0.9, 0],
                                  x: [0, 0, (sIdx - 2) * 18, (sIdx - 2) * 26, (sIdx - 2) * 32],
                                  y: [65, 65, 32 - (sIdx % 2) * 12, 42, 62],
                                  scale: [0.4, 0.6, 1.05, 0.9, 0.5]
                                }}
                                transition={{
                                  duration: 1.45,
                                  delay: 0.5 + sIdx * 0.09,
                                  ease: "easeOut"
                                }}
                                className="absolute text-base md:text-lg drop-shadow-sm select-none"
                              >
                                {sIdx % 2 === 0 ? '✨' : '🌱'}
                              </motion.div>
                            ))}

                            <motion.div
                              initial={{ opacity: 0, y: 20, scale: 0.7 }}
                              animate={{ opacity: [0, 1, 1, 0], y: [20, -25, -45, -60], scale: [0.7, 1.05, 1, 0.85] }}
                              transition={{ duration: 1.5, delay: 0.55 }}
                              className="absolute -top-6 bg-amber-500/95 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-white/80 whitespace-nowrap"
                            >
                              🪴 Vun đất màu +15%
                            </motion.div>
                          </div>
                        )}

                        {/* 3. Hoạt hình Kéo Đỏ Tỉa Cành: Bay từ nút "Tỉa cành" sang tán lá và nhấp cắt tỉa */}
                        {activeToolAnim === 'snip' && (
                          <div key={`snip-${toolAnimRunId}`} className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                            <motion.div
                              initial={{
                                opacity: 0,
                                x: toolStartOffset.x,
                                y: toolStartOffset.y,
                                scale: 0.42,
                                rotate: 0
                              }}
                              animate={{
                                opacity: [0, 1, 1, 1, 1, 0],
                                x: [toolStartOffset.x, 52, 34, 46, 30, 48],
                                y: [toolStartOffset.y, -18, -6, -22, -8, -15],
                                scale: [0.42, 1, 0.9, 1.05, 0.9, 0.75],
                                rotate: [0, -35, -58, -28, -60, -32]
                              }}
                              transition={{
                                duration: 2.05,
                                times: [0, 0.28, 0.46, 0.64, 0.82, 1],
                                ease: "easeInOut"
                              }}
                              className="w-16 h-24 md:w-20 md:h-28 drop-shadow-[0_12px_16px_rgba(15,23,42,0.28)]"
                            >
                              <img
                                src="/assets/tools/pruning-shears.png"
                                alt="Kéo tỉa cành"
                                onError={tryFallbackStageImg}
                                className="w-full h-full object-contain select-none"
                              />
                            </motion.div>

                            {/* Lá non & ánh sáng lấp lánh bay ra khi tỉa cành */}
                            {[0, 1, 2, 3, 4].map((lIdx) => (
                              <motion.div
                                key={lIdx}
                                initial={{ opacity: 0, x: 18, y: -12, scale: 0.5, rotate: 0 }}
                                animate={{
                                  opacity: [0, 0, 1, 0.9, 0],
                                  x: [18, 18, (lIdx - 2) * 20, (lIdx - 2) * 30, (lIdx - 2) * 36],
                                  y: [-12, -12, -28 + (lIdx % 2) * 14, 15 + lIdx * 6, 45],
                                  rotate: [0, 0, 25, -25, 45],
                                  scale: [0.4, 0.6, 1.05, 0.9, 0.6]
                                }}
                                transition={{
                                  duration: 1.45,
                                  delay: 0.48 + lIdx * 0.09,
                                  ease: "easeOut"
                                }}
                                className="absolute text-base md:text-lg drop-shadow-sm select-none"
                              >
                                {lIdx % 2 === 0 ? '🍃' : '✨'}
                              </motion.div>
                            ))}

                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.7 }}
                              animate={{ opacity: [0, 1, 1, 0], y: [10, -35, -55, -70], scale: [0.7, 1.05, 1, 0.85] }}
                              transition={{ duration: 1.5, delay: 0.55 }}
                              className="absolute -top-6 bg-rose-500/95 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-white/80 whitespace-nowrap"
                            >
                              ✂️ Tỉa cành +20%
                            </motion.div>
                          </div>
                        )}

                        {/* Hạt năng lượng / phấn hoa bay lên quanh cây khi cây tươi tốt */}
                        {!isWithered && (
                          <div className="absolute inset-0 pointer-events-none z-20">
                            {[0, 1, 2].map((p) => (
                              <motion.span
                                key={p}
                                animate={{ y: [20, -60], x: [0, p % 2 === 0 ? 15 : -15], opacity: [0, 0.85, 0], scale: [0.6, 1.1, 0.6] }}
                                transition={{ duration: 3.5 + p, repeat: Infinity, delay: p * 1.2, ease: "easeOut" }}
                                style={{ left: `${30 + p * 20}%`, bottom: '35%' }}
                                className="absolute text-xs select-none"
                              >
                                ✨
                              </motion.span>
                            ))}
                          </div>
                        )}

                        {/* Khung Cây với hiệu ứng Sway (Đung đưa theo gió & Nhịp thở tự nhiên từ gốc) */}
                        <motion.div 
                          key={`${activePlant.id}-${healthyIdx}-${isWithered}`}
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            opacity: 1,
                            rotate: isWithered ? [0, 0.5, 0] : activeToolAnim ? [-3.5, 3.5, -2.5, 2.5, 0] : [-1.5, 1.5, -1.5],
                            scaleY: isWithered ? 0.96 : activeToolAnim ? [1, 1.07, 0.98, 1.05, 1] : [1, 1.035, 1]
                          }}
                          transition={{ 
                            scale: { duration: 0.4 },
                            opacity: { duration: 0.4 },
                            rotate: { duration: activeToolAnim ? 1.2 : 4.2, repeat: Infinity, ease: "easeInOut" },
                            scaleY: { duration: activeToolAnim ? 1.0 : 3.2, repeat: Infinity, ease: "easeInOut" }
                          }}
                          style={{ transformOrigin: 'bottom center' }}
                          className="relative w-64 h-56 flex items-end justify-center overflow-visible"
                        >
                          <img 
                            src={stageImage}
                            alt={`${activePlant.name} - ${label}`}
                            className={`w-full h-full object-contain object-bottom translate-y-3 select-none pointer-events-none ${
                              activeTheme.isDark
                                ? 'drop-shadow-[0_0_24px_rgba(255,255,255,0.45)]'
                                : 'drop-shadow-[0_12px_16px_rgba(15,23,42,0.16)]'
                            }`}
                            onError={(e) => {
                              if (!tryFallbackStageImg(e)) {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                              }
                            }}
                          />
                          <div 
                            className="hidden w-full h-full bg-no-repeat mix-blend-multiply transition-all duration-500"
                            style={{
                              backgroundImage: `url(${activePlant.sheet})`,
                              backgroundSize: bgSize,
                              backgroundPosition: `${posX}% ${posY}`
                            }}
                          />
                        </motion.div>

                        {/* === 4. ĐẾ CHẬU CÂY SVG TỰ THIẾT KẾ (ĐỒNG BỘ PHONG CÁCH VECTOR 2D) === */}
                        {potStyle !== 'natural' && (
                          <motion.div
                            key={potStyle}
                            animate={{ y: [0, -1.5, 0] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                            className="-mt-5 relative z-20 drop-shadow-md pointer-events-none select-none flex justify-center"
                          >
                            <GardenPotSvg potId={potStyle} />
                          </motion.div>
                        )}
                      </div>

                      {/* Thanh 5 mốc giai đoạn trực quan */}
                      <div className="relative z-10 flex items-center justify-center gap-2 mb-4 mt-1">
                        {[0, 1, 2, 3, 4].map(idx => {
                          const isCurrent = healthyIdx === idx;
                          const isPassed = healthyIdx > idx;
                          return (
                            <div
                              key={idx}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                isCurrent
                                  ? 'w-8 bg-emerald-500 shadow-xs'
                                  : isPassed
                                    ? 'w-4 bg-emerald-300'
                                    : 'w-2.5 bg-white/70'
                              }`}
                              title={`Giai đoạn ${idx + 1}/5`}
                            />
                          );
                        })}
                      </div>

                      {/* Thanh Tiến Độ */}
                      <div className="relative z-10 w-full space-y-2">
                        <div className={`flex justify-between items-center text-xs md:text-sm font-extrabold ${activeTheme.isDark ? 'text-slate-100' : 'text-slate-700'}`}>
                          <span>Tiến độ sinh trưởng</span>
                          <span className={`font-black text-sm md:text-base ${activeTheme.isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{growth}%</span>
                        </div>
                        <div className="w-full h-4 md:h-5 bg-white/80 rounded-full overflow-hidden border border-white/90 p-0.5 shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 rounded-full transition-all duration-500 shadow-xs" 
                            style={{ width: `${growth}%` }} 
                          />
                        </div>
                      </div>

                      {/* BANNER CHƠI MINI-GAME LẬT THẺ CHỮA LÀNH NẰM GỌN TRONG KHỐI CHẬU CÂY */}
                      <div
                        onClick={() => { playSoundEffect('click'); setShowMemoryGame(true); }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { playSoundEffect('click'); setShowMemoryGame(true); } }}
                        className="relative z-10 w-full mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer flex items-center justify-between gap-3 border border-emerald-300/60 select-none group"
                      >
                        <div className="flex items-center gap-3.5 text-left min-w-0">
                          <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-xs border border-white/50 p-1 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                            <img
                              src={MASCOT_SPRITES.excited}
                              alt="Bé Chuột"
                              className="w-full h-full object-contain drop-shadow-sm"
                              onError={(e) => { if (!tryFallbackStageImg(e)) e.target.src = '/assets/mascot/mascot-happy.png'; }}
                            />
                          </div>
                          <h4 className="font-black text-sm sm:text-base md:text-lg leading-snug drop-shadow-xs">
                            Trạm Sạc Tài Nguyên: Lật Thẻ Chữa Lành!
                          </h4>
                        </div>
                      </div>

                      {/* Nút Thu Hoạch khi đạt 100% */}
                      {growth >= 100 && (
                        <motion.button 
                          {...btnMotionProps}
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          onClick={harvestPlant} 
                          className="relative z-10 mt-6 w-full py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white font-black text-base md:text-lg rounded-2xl shadow-xl shadow-orange-200 animate-bounce cursor-pointer flex items-center justify-center gap-2"
                        >
                          🧺 Thu Hoạch Cây Nhận {activePlant.harvestExp || 100} EXP!
                        </motion.button>
                      )}
                    </div>
                  );
                })()}

                {/* CỘT CÔNG CỤ CHĂM SÓC & BẢNG XẾP HẠNG NHANH */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-white p-6 md:p-8 rounded-[36px] shadow-sm border border-emerald-50">
                    <h4 className="font-extrabold text-slate-800 text-base md:text-lg mb-1 flex items-center gap-2">
                      <Sparkles className="text-amber-500" size={20} /> Bộ Công Cụ Chăm Sóc
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 mb-6">Bấm vào dụng cụ để di chuyển sang chăm sóc cây trực tiếp</p>

                    <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4">
                      {/* Nút Tưới Nước */}
                      <motion.button 
                        {...btnMotionProps}
                        onClick={(e) => triggerPlantCareAction('water', e)} 
                        className="bg-blue-50/70 hover:bg-blue-100 border border-blue-100 p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-4 transition cursor-pointer shadow-xs group"
                      >
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3.5 text-center md:text-left">
                          <div className="w-14 h-14 bg-white rounded-2xl border border-blue-100 p-1.5 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                            <img
                              src="/assets/tools/watering-can.png"
                              alt="Bình tưới nước"
                              onError={tryFallbackStageImg}
                              className={`w-full h-full object-contain transition-all duration-300 ${
                                activeToolAnim === 'water' ? 'opacity-20 scale-50' : 'opacity-100 scale-100'
                              }`}
                            />
                          </div>
                          <div>
                            <p className="text-xs md:text-base font-extrabold text-slate-800">Tưới nước</p>
                            <p className="hidden md:block text-xs text-blue-600 font-semibold">+10% sinh trưởng • Cứu cây héo</p>
                          </div>
                        </div>
                        <span className="text-xs md:text-sm text-blue-700 bg-white px-3 py-1 rounded-xl font-black border border-blue-200 shadow-xs">
                          x{inventory.water}
                        </span>
                      </motion.button>

                      {/* Nút Vun Đất */}
                      <motion.button 
                        {...btnMotionProps}
                        onClick={(e) => triggerPlantCareAction('soil', e)} 
                        className="bg-amber-50/70 hover:bg-amber-100 border border-amber-100 p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-4 transition cursor-pointer shadow-xs group"
                      >
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3.5 text-center md:text-left">
                          <div className="w-14 h-14 bg-white rounded-2xl border border-amber-100 p-1.5 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                            <img
                              src="/assets/tools/soil-hoe.png?v=2"
                              alt="Cuốc vun đất"
                              onError={tryFallbackStageImg}
                              className={`w-full h-full object-contain transition-all duration-300 ${
                                activeToolAnim === 'soil' ? 'opacity-20 scale-50' : 'opacity-100 scale-100'
                              }`}
                            />
                          </div>
                          <div>
                            <p className="text-xs md:text-base font-extrabold text-slate-800">Vun đất</p>
                            <p className="hidden md:block text-xs text-amber-700 font-semibold">+15% sinh trưởng màu mỡ</p>
                          </div>
                        </div>
                        <span className="text-xs md:text-sm text-amber-700 bg-white px-3 py-1 rounded-xl font-black border border-amber-200 shadow-xs">
                          x{inventory.soil}
                        </span>
                      </motion.button>

                      {/* Nút Tỉa Cành */}
                      <motion.button 
                        {...btnMotionProps}
                        onClick={(e) => triggerPlantCareAction('snip', e)} 
                        className="bg-rose-50/70 hover:bg-rose-100 border border-rose-100 p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-4 transition cursor-pointer shadow-xs group"
                      >
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3.5 text-center md:text-left">
                          <div className="w-14 h-14 bg-white rounded-2xl border border-rose-100 p-1.5 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                            <img
                              src="/assets/tools/pruning-shears.png"
                              alt="Kéo tỉa cành"
                              onError={tryFallbackStageImg}
                              className={`w-full h-full object-contain transition-all duration-300 ${
                                activeToolAnim === 'snip' ? 'opacity-20 scale-50' : 'opacity-100 scale-100'
                              }`}
                            />
                          </div>
                          <div>
                            <p className="text-xs md:text-base font-extrabold text-slate-800">Tỉa cành</p>
                            <p className="hidden md:block text-xs text-rose-600 font-semibold">+20% sinh trưởng nhanh gọn</p>
                          </div>
                        </div>
                        <span className="text-xs md:text-sm text-rose-700 bg-white px-3 py-1 rounded-xl font-black border border-rose-200 shadow-xs">
                          x{inventory.scissors}
                        </span>
                      </motion.button>
                    </div>
                  </div>

                  {/* KHUNG BẢNG XẾP HẠNG NÔNG DÂN (MINI LEADERBOARD NGOÀI DASHBOARD) */}
                  <div className="bg-white p-5 rounded-[32px] shadow-sm border border-amber-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-black text-slate-800 text-sm flex items-center gap-1.5">
                        🏆 Bảng Xếp Hạng Nông Dân
                      </h4>
                      <button
                        onClick={() => { playUiSound('click'); setActiveTab('profile'); }}
                        className="text-[11px] font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                      >
                        Xem Hồ sơ ➔
                      </button>
                    </div>
                    <div className="space-y-2">
                      {leaderboardList.slice(0, 3).map((farmer, idx) => {
                        const rankIcons = ['🥇', '🥈', '🥉'];
                        const isImgPath = typeof farmer.avatar === 'string' && (farmer.avatar.startsWith('/') || farmer.avatar.startsWith('http'));
                        return (
                          <div
                            key={`${farmer.name}-${idx}`}
                            className={`px-3 py-2 rounded-2xl border flex items-center justify-between ${
                              farmer.isMe
                                ? 'bg-amber-50/80 border-amber-300 shadow-2xs'
                                : 'bg-slate-50/70 border-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-base w-5 text-center">{rankIcons[idx]}</span>
                              <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 text-sm">
                                {isImgPath ? (
                                  <img src={farmer.avatar} onError={tryFallbackStageImg} alt={farmer.name} className="w-full h-full object-contain" />
                                ) : (
                                  <span>{farmer.avatar || '🌱'}</span>
                                )}
                              </div>
                              <span className="text-xs font-black text-slate-800 truncate">
                                {farmer.name}
                              </span>
                              {farmer.isMe && (
                                <span className="text-[9px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-black text-amber-600 whitespace-nowrap">
                              {farmer.exp} EXP
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nút Giả lập Cây Héo */}
                  <div className="text-center pt-1">
                    <button 
                      onClick={() => { playUiSound('click'); setDaysNeglected(3); }} 
                      className="text-xs text-slate-400 hover:text-rose-500 transition cursor-pointer underline underline-offset-4"
                    >
                      ⏳ Thử nghiệm: Giả lập 3 ngày quên tưới (Làm cây héo)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CHECKLIST THÓI QUEN (HỖ TRỢ DARK MODE KHI gardenTheme === 'night') */}
          {activeTab === 'tasks' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className={`p-6 md:p-10 rounded-[36px] shadow-sm border transition-colors duration-500 ${
                isNightMode
                  ? 'bg-slate-900 text-slate-100 border-slate-800 shadow-slate-950/50'
                  : 'bg-white text-slate-800 border-emerald-50'
              }`}>
                <div className={`flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 pb-4 border-b ${
                  isNightMode ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <div>
                    <h3 className={`font-extrabold text-lg md:text-2xl flex items-center gap-2 ${
                      isNightMode ? 'text-slate-100' : 'text-slate-800'
                    }`}>
                      ✅ Checklist Thói Quen Hôm Nay
                    </h3>
                    <p className={`text-xs md:text-sm font-medium mt-1 ${
                      isNightMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Mỗi nhiệm vụ hoàn thành đem lại +25 EXP và vật phẩm chăm sóc cây
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={() => {
                        playUiSound('click');
                        setAutoRealTimeWeather(false); setIsDarkMode(!isDarkMode); setGardenTheme(!isDarkMode ? 'night' : 'morning');
                      }}
                      className={`text-xs font-black px-3 py-1.5 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                        isNightMode
                          ? 'bg-indigo-950/90 text-amber-300 border-indigo-700 hover:bg-indigo-900'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Bật/tắt chế độ Đêm dịu mắt"
                    >
                      {isNightMode ? '🌙 Chế độ Đêm: Bật' : '🌤️ Chế độ Sáng'}
                    </button>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                      isNightMode
                        ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      Làm mới ngẫu nhiên mỗi ngày ⏳
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tasks.map(t => {
                    const isDoneToday = (dailyTasksDate === new Date().toLocaleDateString('vi-VN') && completedTasksToday.includes(t.id)) || t.checked;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        disabled={isDoneToday}
                        onClick={() => handleCompleteDailyTask(t.id, 1, 25, t)}
                        className={`p-4 md:p-5 rounded-2xl border flex items-center justify-between transition select-none text-left w-full ${
                          isDoneToday
                            ? isNightMode
                              ? 'bg-slate-800/50 border-slate-800 opacity-65 cursor-not-allowed'
                              : 'bg-emerald-50/60 border-slate-200 opacity-75 cursor-not-allowed'
                            : isNightMode
                              ? 'bg-slate-800/90 border-slate-700 hover:border-emerald-500/60 hover:bg-slate-800 cursor-pointer'
                              : 'bg-white border-emerald-100 hover:border-emerald-300 hover:shadow-md cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-7 h-7 rounded-full border-2 flex justify-center items-center transition ${
                            isDoneToday
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : isNightMode
                                ? 'border-slate-600'
                                : 'border-slate-300'
                          }`}>
                            {isDoneToday && <CheckCircle size={16} />}
                          </div>
                          <span className={`text-sm md:text-base font-bold ${
                            isDoneToday
                              ? 'text-slate-400 line-through'
                              : isNightMode
                                ? 'text-slate-100'
                                : 'text-slate-700'
                          }`}>
                            {t.text}
                          </span>
                        </div>
                        <div className={`text-xs font-black px-3 py-1.5 rounded-xl whitespace-nowrap ${
                          isDoneToday
                            ? isNightMode
                              ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-800'
                              : 'text-emerald-700 bg-emerald-100/80 border border-emerald-200'
                            : isNightMode
                              ? 'text-emerald-300 bg-emerald-950/90 border border-emerald-800/70'
                              : 'text-emerald-700 bg-emerald-100'
                        }`}>
                          {isDoneToday ? 'Đã xong hôm nay ✓' : '+25 EXP • +1 💧'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: HÀNH TRÌNH 7 NGÀY & BULLET JOURNAL (HỖ TRỢ DARK MODE KHI gardenTheme === 'night') */}
        {activeTab === 'journey' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[1200px] mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-6 px-2">
              <div className="flex items-center gap-3">
                <h2 className={`text-2xl font-black ${isNightMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  Nhật ký Cảm xúc 🌱
                </h2>
                {isNightMode && (
                  <span className="text-[11px] font-bold bg-indigo-950 text-amber-300 border border-indigo-800 px-3 py-1 rounded-full">
                    🌙 Chế độ Tối Dịu Mắt
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playUiSound('click');
                    setAutoRealTimeWeather(false); setIsDarkMode(!isDarkMode); setGardenTheme(!isDarkMode ? 'night' : 'morning');
                  }}
                  className={`text-[11px] font-black px-3 py-1.5 rounded-full border shadow-xs cursor-pointer transition ${
                    isNightMode
                      ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isNightMode ? '🌙 Đang bật Ban Đêm' : '🌤️ Đổi sang Ban Đêm'}
                </button>
                <button
                  onClick={() => { playUiSound('click'); setLastCheckInDate(null); }}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-full border shadow-sm cursor-pointer ${
                    isNightMode
                      ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-rose-400'
                      : 'bg-white text-slate-400 hover:text-rose-500'
                  }`}
                >
                  🛠 Khôi phục Ngày (Test)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* CẢM XÚC (SPAN 4) */}
              <div className={`lg:col-span-4 p-6 rounded-[32px] shadow-sm border transition-colors ${
                isNightMode
                  ? 'bg-slate-900 text-slate-100 border-slate-800'
                  : 'bg-white/80 text-slate-800 border-emerald-50'
              }`}>
                <h3 className={`font-black text-lg mb-1 ${isNightMode ? 'text-slate-100' : 'text-slate-800'}`}>Cảm xúc hôm nay</h3>
                <p className={`text-xs mb-4 font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>Bạn thấy thế nào hôm nay?</p>
                <div className="grid grid-cols-4 gap-3">
                  {MOODS_V2.map(m => {
                    const isSelected = emotionInput?.id === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => { playUiSound('click'); setEmotionInput(m); }}
                        className={`mood-item flex flex-col items-center gap-1 cursor-pointer ${isSelected ? 'scale-110' : 'opacity-90'}`}
                      >
                        <div className={`w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full flex items-center justify-center text-3xl border-[3px] shadow-sm p-0.5 cursor-pointer ${m.hoverClass || ''} ${
                          isSelected
                            ? `${m.bg} ${m.border} shadow-md`
                            : isNightMode
                              ? 'bg-slate-800 border-slate-700'
                              : 'bg-slate-50 border-transparent'
                        }`}>
                          <AnimatedMoodIcon moodId={m.id} />
                          <span className="hidden pointer-events-none">{m.icon}</span>
                        </div>
                        <span className={`text-[11px] font-extrabold mt-0.5 ${
                          isSelected
                            ? isNightMode ? 'text-emerald-300' : 'text-slate-800'
                            : 'text-slate-400'
                        }`}>{m.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>


              {/* THÔNG ĐIỆP TÍCH CỰC (SPAN 4) */}
              <div className={`lg:col-span-4 p-6 rounded-[32px] shadow-sm border flex flex-col relative overflow-hidden transition-colors ${
                isNightMode
                  ? 'bg-slate-900 text-slate-100 border-slate-800'
                  : 'bg-rose-50/50 border-rose-100'
              }`}>
                
                {/* Trang trí nền mờ nhẹ nhàng */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-200/20 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute bottom-10 -left-6 w-20 h-20 bg-pink-100/20 rounded-full blur-lg pointer-events-none"></div>
                
                <h3 className={`font-black text-lg mb-1 relative z-10 flex items-center gap-2 ${
                  isNightMode ? 'text-rose-300' : 'text-rose-800'
                }`}>
                  Thông điệp tích cực <span className="text-xl">💌</span>
                </h3>
                <p className={`text-xs mb-6 font-medium relative z-10 ${
                  isNightMode ? 'text-slate-400' : 'text-rose-500'
                }`}>Dành riêng cho bạn hôm nay</p>

                {/* Danh sách thông điệp */}
                <div className="flex flex-col gap-5 w-full mt-auto relative z-10">
                  
                  {/* THÔNG ĐIỆP 1: Giấy note trắng dán Washi Tape mờ */}
                  {dailyMessages[0] && (
                    <div className={`relative px-5 py-5 rounded-2xl shadow-sm border text-center flex items-center justify-center min-h-[80px] hover:-translate-y-0.5 transition-transform ${
                      isNightMode
                        ? 'bg-slate-800/90 border-slate-700 text-slate-200'
                        : 'bg-white/90 border-rose-50 text-slate-600'
                    }`}>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-rose-300/70 rotate-[-3deg] rounded-sm shadow-sm backdrop-blur-sm"></div>
                      <span className="font-bold text-[13px] leading-relaxed">"{dailyMessages[0]}"</span>
                    </div>
                  )}

                  {/* THÔNG ĐIỆP 2: Giấy note trắng đính sticker mầm cây */}
                  {dailyMessages[1] && (
                    <div className={`relative px-5 py-5 rounded-2xl shadow-sm border text-center flex items-center justify-center min-h-[80px] hover:-translate-y-0.5 transition-transform ${
                      isNightMode
                        ? 'bg-slate-800/90 border-slate-700 text-slate-200'
                        : 'bg-white/90 border-rose-50 text-slate-600'
                    }`}>
                      <div className="absolute -bottom-3 -right-2 text-2xl drop-shadow-sm rotate-12">🌱</div>
                      <span className="font-bold text-[13px] leading-relaxed">"{dailyMessages[1]}"</span>
                    </div>
                  )}

                </div>
              </div>

              {/* THỬ THÁCH HÔM NAY (SPAN 4) */}
              <div className={`lg:col-span-4 p-6 rounded-[32px] shadow-sm border flex flex-col relative overflow-hidden transition-colors ${
                isNightMode
                  ? 'bg-slate-900 text-slate-100 border-slate-800'
                  : 'bg-orange-50/50 border-orange-100'
              }`}>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-200/20 rounded-full blur-xl"></div>
                <h3 className={`font-black text-lg mb-1 relative z-10 ${isNightMode ? 'text-amber-300' : 'text-orange-800'}`}>Thử thách hôm nay</h3>
                <p className={`text-xs mb-4 font-medium relative z-10 ${isNightMode ? 'text-slate-400' : 'text-orange-500'}`}>Hành động ngay - Quà liền tay</p>
                {dailyChallenge && (
                  <div className={`flex-1 flex flex-col items-center justify-center rounded-[24px] p-5 border text-center shadow-sm relative z-10 ${
                    isNightMode
                      ? 'bg-slate-800/90 border-slate-700'
                      : 'bg-white/90 border-orange-50'
                  }`}>
                    {challengeState === 'idle' && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                        <div className="text-5xl mb-3 drop-shadow-sm">{dailyChallenge.icon}</div>
                        <h4 className={`font-black text-sm mb-1 ${isNightMode ? 'text-slate-100' : 'text-slate-700'}`}>{dailyChallenge.label}</h4>
                        <p className={`text-[10px] font-bold mb-4 px-3 py-1 rounded-full ${
                          isNightMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-400'
                        }`}>⏳ Yêu cầu: {dailyChallenge.duration} giây</p>
                        <button onClick={() => { playUiSound('click'); startChallenge(); }} className="bg-gradient-to-r from-orange-400 to-amber-400 text-white text-xs font-black px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-md shadow-orange-200/40 cursor-pointer">
                          🔥 Bắt đầu ngay
                        </button>
                      </motion.div>
                    )}
                    {challengeState === 'running' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full">
                        <div className="text-4xl mb-2 animate-bounce">{dailyChallenge.icon}</div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 mb-2">{timeLeft}s</div>
                        <p className="text-[10px] font-bold text-slate-400">Đang thực hiện... Đừng rời đi nhé!</p>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
                          <motion.div initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: dailyChallenge.duration, ease: "linear" }} className="h-full bg-orange-400 rounded-full" />
                        </div>
                      </motion.div>
                    )}
                    {challengeState === 'verify' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center">
                        <div className="text-3xl mb-2">✨</div>
                        <p className={`text-[11px] font-black mb-3 leading-relaxed ${isNightMode ? 'text-slate-200' : 'text-slate-700'}`}>{dailyChallenge.prompt}</p>
                        <input type="text" placeholder="Gõ vài chữ..." value={verifyText} onChange={e => setVerifyText(e.target.value)} className={`w-full text-xs font-medium p-3 border-2 rounded-xl mb-3 text-center outline-none transition-all ${
                          isNightMode
                            ? 'bg-slate-900 border-slate-700 text-slate-100 focus:border-amber-400'
                            : 'border-slate-100 bg-slate-50 text-slate-800 focus:border-orange-300 focus:bg-white'
                        }`} />
                        <button onClick={() => { playUiSound('reward'); completeChallenge(); }} className="w-full bg-emerald-400 text-white text-xs font-black px-4 py-3 rounded-xl hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer">
                          Xác nhận & Nhận Quà
                        </button>
                      </motion.div>
                    )}
                    {challengeState === 'done' && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                        <div className="text-5xl mb-2">🎉</div>
                        <h4 className="font-black text-emerald-500 text-sm mb-1">Đã hoàn thành!</h4>
                        <p className={`text-[10px] font-bold px-3 py-1 rounded-lg border ${
                          isNightMode ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' : 'text-slate-500 bg-emerald-50 border-emerald-100'
                        }`}>Quà nhận: {dailyChallenge.reward}</p>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* VIẾT NHẬT KÝ (SPAN 6) */}
              <div className={`lg:col-span-6 p-6 rounded-[32px] shadow-sm border relative flex flex-col transition-colors ${
                isNightMode
                  ? 'bg-slate-900 text-slate-100 border-slate-800'
                  : 'bg-white/80 text-slate-800 border-emerald-50'
              }`}>
                <h3 className={`font-black text-lg mb-4 ${isNightMode ? 'text-slate-100' : 'text-slate-800'}`}>Trút bầu tâm sự</h3>
                <div className={`flex-1 rounded-3xl p-5 border relative mb-4 transition-colors ${
                  isNightMode
                    ? 'bg-slate-800/90 border-slate-700'
                    : 'bg-yellow-50/50 border-yellow-100'
                }`}>
                  <div className="absolute -top-3 -left-4 w-12 h-6 bg-pink-200/60 rotate-[-15deg] rounded-sm backdrop-blur-sm shadow-sm"></div>
                  <textarea 
                    placeholder="Chạm vào đây để kể tớ nghe hôm nay của bạn thế nào nhé..." 
                    className={`w-full h-32 bg-transparent text-sm outline-none resize-none leading-relaxed font-medium ${
                      isNightMode
                        ? 'text-slate-100 placeholder-slate-500'
                        : 'text-slate-700 placeholder-slate-400'
                    }`}
                    value={noteInput} onChange={(e) => setNoteInput(e.target.value)} disabled={!canCheckIn}
                  />
                </div>
                <button onClick={submitJourney} disabled={!emotionInput || !canCheckIn} className="w-full py-4 bg-emerald-400 text-white font-black rounded-2xl shadow-lg shadow-emerald-200/40 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 cursor-pointer">
                  Lưu nhật ký
                </button>
              </div>

              {/* LỊCH CẢM XÚC CÓ THỂ XEM LẠI THÁNG TRƯỚC */}
              {(() => {
                const viewYear = calendarViewDate.getFullYear();
                const viewMonth = calendarViewDate.getMonth(); // 0 -> 11
                const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
                const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 (CN) -> 6 (T7)
                const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Đưa Thứ 2 lên đầu tuần

                const today = new Date();
                const isCurrentMonth = today.getFullYear() === viewYear && today.getMonth() === viewMonth;

                // Lọc số ngày đã check-in trong tháng đang xem
                const monthEntries = journeyHistory.filter(item => {
                  if (item.fullDate) {
                    const [d, m, y] = item.fullDate.split('/').map(Number);
                    return m === (viewMonth + 1) && y === viewYear;
                  }
                  if (item.month && item.year) {
                    return item.month === (viewMonth + 1) && item.year === viewYear;
                  }
                  if (item.date && typeof item.date === 'string' && item.date.includes('/')) {
                    const parts = item.date.split('/').map(Number);
                    if (parts.length === 3 && !isNaN(parts[1]) && !isNaN(parts[2])) {
                      return parts[1] === (viewMonth + 1) && parts[2] === viewYear;
                    }
                  }
                  // Dữ liệu cũ chưa có tháng/năm thì hiển thị ở tháng hiện tại
                  return isCurrentMonth;
                });

                return (
                  <div className={`lg:col-span-6 p-6 rounded-[32px] shadow-sm border flex flex-col transition-colors ${
                    isNightMode
                      ? 'bg-slate-900 text-slate-100 border-slate-800'
                      : 'bg-white/90 text-slate-800 border-rose-100'
                  }`}>
                    {/* Thanh tiêu đề & Điều hướng Tháng */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className={`font-black text-lg flex items-center gap-2 ${
                          isNightMode ? 'text-slate-100' : 'text-slate-800'
                        }`}>
                          🗓️ Nhật Ký Lịch Cảm Xúc
                        </h3>
                        <p className={`text-xs font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          Tháng {viewMonth + 1}/{viewYear} • Đã ghi nhận {monthEntries.length} ngày
                        </p>
                      </div>

                      <div className={`flex items-center gap-1.5 p-1 rounded-2xl border ${
                        isNightMode
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-rose-50/70 border-rose-100'
                      }`}>
                        <button 
                          onClick={() => { playUiSound('click'); changeCalendarMonth(-1); }}
                          className={`w-8 h-8 rounded-xl font-black text-xs shadow-sm transition-colors cursor-pointer ${
                            isNightMode
                              ? 'bg-slate-700 text-slate-200 hover:bg-rose-500 hover:text-white'
                              : 'bg-white text-slate-600 hover:bg-rose-100 hover:text-rose-600'
                          }`}
                          title="Xem tháng trước"
                        >
                          ◀
                        </button>
                        <span className={`px-3 font-black text-xs min-w-[95px] text-center ${
                          isNightMode ? 'text-rose-300' : 'text-rose-700'
                        }`}>
                          Tháng {viewMonth + 1}, {viewYear}
                        </span>
                        <button 
                          onClick={() => { playUiSound('click'); changeCalendarMonth(1); }}
                          className={`w-8 h-8 rounded-xl font-black text-xs shadow-sm transition-colors cursor-pointer ${
                            isNightMode
                              ? 'bg-slate-700 text-slate-200 hover:bg-rose-500 hover:text-white'
                              : 'bg-white text-slate-600 hover:bg-rose-100 hover:text-rose-600'
                          }`}
                          title="Xem tháng sau"
                        >
                          ▶
                        </button>
                        {!isCurrentMonth && (
                          <button 
                            onClick={() => { playUiSound('click'); goToCurrentMonth(); }}
                            className="px-2.5 py-1.5 rounded-xl bg-rose-400 text-white font-black text-[10px] hover:bg-rose-500 transition-colors ml-1 cursor-pointer"
                          >
                            Hiện tại
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Header Thứ trong tuần */}
                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                      {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                        <div key={d} className="text-[10px] font-black text-slate-400 uppercase py-1">{d}</div>
                      ))}
                    </div>

                    {/* Lưới các ngày trong tháng */}
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-12 rounded-2xl bg-transparent" />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, idx) => {
                        const dayNumber = idx + 1;
                        const dateKey = formatDateKey(viewYear, viewMonth, dayNumber);
                        const isToday = isCurrentMonth && today.getDate() === dayNumber;

                        // Tìm bản ghi cảm xúc của ngày này
                        const entry = monthEntries.find(item => 
                          item.fullDate === dateKey || item.day === dayNumber || item.date === dateKey
                        );

                        const entryIcon = entry ? (entry.moodIcon || entry.emotion?.icon || entry.icon || '🌿') : null;
                        const entryLabel = entry ? (entry.moodLabel || entry.emotion?.label || entry.mood || 'Đã check-in') : null;

                        return (
                          <div
                            key={dateKey}
                            onClick={() => {
                              if (entry) {
                                playUiSound('click');
                                setSelectedPastEntry(entry);
                                showAlert(
                                  `Ký ức ngày ${dateKey} ${entryIcon}`,
                                  `Cảm xúc: ${entryLabel}\n\n📝 Nhật ký:\n"${entry.note || entry.journal || 'Không có ghi chú chi tiết.'}"`,
                                  "success"
                                );
                              }
                            }}
                            className={`h-12 rounded-2xl border flex flex-col items-center justify-center relative transition-all ${
                              entry 
                                ? isNightMode
                                  ? 'bg-gradient-to-br from-rose-950/90 to-pink-900/70 border-rose-700 cursor-pointer hover:scale-105 shadow-sm'
                                  : 'bg-gradient-to-br from-pink-50 to-rose-100/80 border-rose-200 cursor-pointer hover:scale-105 shadow-sm' 
                                : isToday 
                                  ? isNightMode
                                    ? 'bg-amber-950/60 border-amber-500 border-dashed'
                                    : 'bg-amber-50 border-amber-300 border-dashed' 
                                  : isNightMode
                                    ? 'bg-slate-800/70 border-slate-700/80 text-slate-400'
                                    : 'bg-slate-50/60 border-slate-100 text-slate-400'
                            }`}
                          >
                            <span className={`text-[10px] font-bold ${
                              isToday
                                ? 'text-amber-500 font-black'
                                : isNightMode
                                  ? 'text-slate-300'
                                  : 'text-slate-500'
                            }`}>
                              {dayNumber}
                            </span>
                            {entry ? (
                              <span className="text-base leading-none mt-0.5">{entryIcon}</span>
                            ) : isToday ? (
                              <span className="text-[8px] font-black text-amber-500">Hôm nay</span>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}


              {/* GÓC THƯ GIÃN: ĐẦY ĐỦ 3 CỘT (HÍT THỞ - ÂM THANH - LÁ THƯ) */}
              <div className={`lg:col-span-12 p-6 rounded-[32px] shadow-sm border transition-colors ${
                isNightMode
                  ? 'bg-slate-900 text-slate-100 border-slate-800'
                  : 'bg-white/80 text-slate-800 border-emerald-50'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className={`font-black text-lg mb-0.5 ${isNightMode ? 'text-slate-100' : 'text-slate-800'}`}>Góc thư giãn 🌿</h3>
                    <p className={`text-xs font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>Chăm sóc tâm trí, lắng nghe thiên nhiên và lưu giữ tâm tư</p>
                  </div>
                  {activeSoundCount > 0 && (
                    <button onClick={() => { playUiSound('click'); stopAllSounds(); }} className="text-[11px] font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 animate-pulse hover:bg-amber-100 transition-colors cursor-pointer">
                      🔊 Đang phát ({activeSoundCount}) • Tắt nhanh
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* CỘT 1: Hít thở 4-7-8 */}
                  <div onClick={() => { playUiSound('click'); startBreathingSession(); }} className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all ${
                    isNightMode
                      ? 'bg-slate-800/90 border-slate-700'
                      : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100'
                  }`}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-emerald-400 text-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">🌬️</div>
                      <div>
                        <h4 className={`font-black text-sm ${isNightMode ? 'text-slate-100' : 'text-slate-800'}`}>Nhịp thở 4-7-8</h4>
                        <p className={`text-[11px] font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>Thả lỏng & giảm căng thẳng</p>
                      </div>
                    </div>
                    <span className={`text-xs font-black px-3 py-1.5 rounded-xl border shadow-sm ${
                      isNightMode ? 'bg-slate-900 text-emerald-400 border-slate-700' : 'text-emerald-600 bg-white border-emerald-100'
                    }`}>Mở ➔</span>
                  </div>

                  {/* CỘT 2: Âm thanh chữa lành */}
                  <div onClick={() => { playUiSound('click'); setShowSoundModal(true); }} className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all ${
                    isNightMode
                      ? 'bg-slate-800/90 border-slate-700'
                      : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100'
                  }`}>
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 bg-amber-400 text-white rounded-2xl flex items-center justify-center text-2xl shadow-sm ${activeSoundCount > 0 ? 'animate-bounce' : ''}`}>🎵</div>
                      <div>
                        <h4 className={`font-black text-sm ${isNightMode ? 'text-slate-100' : 'text-slate-800'}`}>Âm thanh thiên nhiên</h4>
                        <p className={`text-[11px] font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {activeSoundCount > 0 ? `Đang bật ${activeSoundCount} âm thanh` : 'Mưa rơi, sóng biển, lửa trại'}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-black px-3 py-1.5 rounded-xl border shadow-sm ${
                      isNightMode ? 'bg-slate-900 text-amber-400 border-slate-700' : 'text-amber-600 bg-white border-amber-100'
                    }`}>Nghe ➔</span>
                  </div>

                  {/* CỘT 3: Lá thư tương lai */}
                  <div onClick={() => { playUiSound('click'); setShowLetterModal(true); }} className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all ${
                    isNightMode
                      ? 'bg-slate-800/90 border-slate-700'
                      : 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100'
                  }`}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-pink-400 text-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">💌</div>
                      <div>
                        <h4 className={`font-black text-sm ${isNightMode ? 'text-slate-100' : 'text-slate-800'}`}>Thư gửi tương lai</h4>
                        <p className={`text-[11px] font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>Đang cất giữ: {futureLetters.length} bức thư</p>
                      </div>
                    </div>
                    <span className={`text-xs font-black px-3 py-1.5 rounded-xl border shadow-sm ${
                      isNightMode ? 'bg-slate-900 text-pink-400 border-slate-700' : 'text-pink-600 bg-white border-pink-100'
                    }`}>Viết ➔</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

          {/* TAB 4: BỘ SƯU TẬP CÂY */}
          {activeTab === 'collection' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-white/90 p-8 rounded-[32px] shadow-sm border border-amber-100">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <div>
                    <h2 className="font-black text-slate-800 text-xl flex items-center gap-2">
                      <span className="text-amber-500">⊞</span> Bộ Sưu Tập Cây Chữa Lành ({PLANT_COLLECTION.length} giống cây)
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Dùng tổng Điểm Chữa Lành (EXP) tích lũy của bạn để mở khóa và đổi giống cây trồng ngoài vườn
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl font-black text-xs text-amber-700 shadow-sm">
                    Đang có: {inventory.exp} EXP ⭐
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {PLANT_COLLECTION.map(plant => {
                    const isUnlocked = (inventory.exp >= plant.reqExp) || unlockedPlants.includes(plant.id);
                    const isPlanting = currentPlantId === plant.id;
                    const coords = SPRITE_COORDS[plant.id] || SPRITE_COORDS.seed_1;
                    const maturePosX = coords.healthyX[4];
                    const maturePosY = plant.layout === 'two-rows' ? 8 : 55;

                    return (
                      <div 
                        key={plant.id} 
                        className={`p-5 rounded-3xl border-2 flex flex-col items-center text-center transition-all relative ${
                          isPlanting 
                            ? 'bg-emerald-50/40 border-emerald-400 shadow-md' 
                            : isUnlocked 
                              ? 'bg-white border-amber-200 hover:shadow-md hover:-translate-y-1' 
                              : 'bg-slate-50/70 border-slate-100 opacity-75'
                        }`}
                      >
                        {/* Nhãn Độ Hiếm & Thu hoạch EXP */}
                        <div className="flex items-center justify-between w-full mb-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            {plant.rarity || 'Khởi Đầu'}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            +{plant.harvestExp || 100} EXP/vụ
                          </span>
                        </div>

                        {/* Khung hình thu nhỏ giai đoạn trưởng thành (healthyIdx = 4) */}
                        <div className={`relative w-32 h-32 rounded-3xl bg-gradient-to-b from-amber-50/70 to-emerald-50/50 border border-amber-100/80 flex items-center justify-center p-2 mb-3 transition-transform overflow-hidden ${isUnlocked ? 'scale-105 shadow-sm' : 'grayscale opacity-50'}`}>
                          <img 
                            src={plant.previewImg || `/assets/plants/stages/${plant.id}_h4.png`} 
                            alt={plant.name} 
                            className="w-full h-full object-contain drop-shadow-[0_10px_12px_rgba(15,23,42,0.15)]"
                            onError={(e) => {
                              if (!tryFallbackStageImg(e)) {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                              }
                            }}
                          />
                          <div
                            className="hidden w-full h-full bg-no-repeat mix-blend-multiply"
                            style={{
                              backgroundImage: `url(${plant.sheet})`,
                              backgroundSize: `${coords.widthScale} auto`,
                              backgroundPosition: `${maturePosX}% ${maturePosY}%`
                            }}
                          />
                          <span className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 border border-amber-200 shadow-xs flex items-center justify-center text-xs">
                            {plant.icon}
                          </span>
                        </div>
                        <h3 className="font-black text-slate-800 text-sm mb-1">{plant.name}</h3>
                        <p className="text-[11px] text-slate-400 font-medium mb-4 line-clamp-2 min-h-[32px]">{plant.desc}</p>

                        {isPlanting ? (
                          <button disabled className="w-full py-2.5 rounded-xl bg-emerald-500 text-white font-black text-xs shadow-sm">
                            ✓ Đang trồng
                          </button>
                        ) : isUnlocked ? (
                          <button 
                            onClick={() => {
                              playUiSound('click');
                              setCurrentPlantId(plant.id);
                              showAlert("Đã đổi cây trồng! 🪴", `Bạn đã mang "${plant.name}" ra khu vườn chính. Hãy ghé tab Vườn & Cây Xanh để chăm sóc nhé!`, "success");
                            }}
                            className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-black text-xs shadow-sm transition-colors cursor-pointer"
                          >
                            🌱 Chọn trồng
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              playUiSound('click');
                              showAlert("Chưa đủ Điểm Chữa Lành 🔒", `Cây "${plant.name}" cần ${plant.reqExp} EXP để mở khóa.\nHiện bạn đang có ${inventory.exp} EXP (còn thiếu ${plant.reqExp - inventory.exp} EXP nữa thôi)!`, "error");
                            }}
                            className="w-full py-2.5 rounded-xl bg-slate-200 text-slate-500 font-bold text-xs cursor-not-allowed"
                          >
                            🔒 Cần {plant.reqExp} EXP
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: HỒ SƠ NÔNG DÂN */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative">
              
              {/* Sticker trang trí xung quanh background */}
              <div className="hidden xl:block absolute -left-8 top-16 w-14 h-14 pointer-events-none opacity-90 transition-transform hover:scale-110">
                <img src="/assets/avatars/hamster.svg" onError={tryFallbackStageImg} alt="deco" className="w-full h-full drop-shadow-md" />
              </div>
              <div className="hidden xl:block absolute left-[48%] top-28 w-14 h-14 pointer-events-none opacity-90">
                <img src="/assets/avatars/shiba.svg" onError={tryFallbackStageImg} alt="deco" className="w-full h-full drop-shadow-md" />
              </div>
              <div className="hidden xl:block absolute -right-8 top-20 w-14 h-14 pointer-events-none opacity-90">
                <img src="/assets/avatars/bear-kid.svg" onError={tryFallbackStageImg} alt="deco" className="w-full h-full drop-shadow-md" />
              </div>
              <div className="hidden xl:block absolute -right-8 bottom-12 w-14 h-14 pointer-events-none opacity-90">
                <img src="/assets/avatars/orange-mascot.svg" onError={tryFallbackStageImg} alt="deco" className="w-full h-full drop-shadow-md" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* CỘT TRÁI: HỒ SƠ & KHO AVATAR (SPAN 6) */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* CARD 1: HỒ SƠ CỦA BẠN */}
                  <div className="bg-white p-6 sm:p-8 rounded-[36px] shadow-sm border border-slate-100 text-center relative overflow-hidden">
                    <h3 className="text-left font-black text-slate-800 text-base mb-4">Hồ sơ của bạn</h3>
                    
                    {/* Avatar hiện tại */}
                    <div className="relative inline-block mb-3">
                      <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden p-1 bg-gradient-to-b from-purple-50 to-purple-100 mx-auto">
                        <img 
                          src={currentAvatar.img} 
                          alt={currentAvatar.name} 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            if (!tryFallbackStageImg(e)) {
                              e.target.style.display = 'none';
                              if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                            }
                          }}
                        />
                        <span className="text-5xl hidden">{currentAvatar.icon}</span>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white shadow-xs"></span>
                    </div>

                    {/* Khu vực hiển thị hoặc chỉnh sửa tên */}
                    <div className="mb-4 relative z-10">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tên Khu Vườn</p>
                      {!isEditingName ? (
                        <div className="flex items-center justify-center gap-2">
                          <h2 className="font-black text-slate-800 text-2xl">Vườn của {currentUser.name}</h2>
                          <button onClick={() => { playUiSound('click'); setTempName(currentUser.name); setIsEditingName(true); }} className="text-sm text-purple-500 hover:text-purple-700 p-1 cursor-pointer" title="Đổi tên">
                            ✏️
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                          <input 
                            type="text" 
                            value={tempName} 
                            onChange={(e) => setTempName(e.target.value)}
                            className="text-center font-bold text-slate-800 bg-slate-50 border-2 border-purple-300 rounded-xl px-3 py-1.5 text-sm outline-none w-full"
                            placeholder="Nhập tên mới..."
                          />
                          <button onClick={() => {
                            if(tempName.trim()) {
                              playUiSound('reward');
                              setCurrentUser({ name: tempName.trim() });
                              setIsEditingName(false);
                              showAlert("Thành công ✨", "Đã cập nhật tên khu vườn của bạn!", "success");
                            }
                          }} className="bg-purple-500 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm hover:bg-purple-600 cursor-pointer">
                            Lưu
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-purple-600 font-bold mb-4 relative z-10">UID: {playerUID}</p>

                    <div>
                      <button 
                        onClick={() => {
                          playUiSound('click');
                          const gallery = document.getElementById('avatar-gallery');
                          if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 text-slate-600 text-xs font-bold rounded-2xl border border-slate-200 transition cursor-pointer"
                      >
                        ✏️ Đổi Avatar
                      </button>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100 text-left">
                      <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CÂY ĐÃ MỞ</span>
                        <p className="text-base sm:text-lg font-black text-slate-800">{PLANT_COLLECTION.filter(p => inventory.exp >= p.reqExp || unlockedPlants.includes(p.id)).length} / {PLANT_COLLECTION.length}</p>
                      </div>
                      <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">HÀNH TRÌNH</span>
                        <p className="text-base sm:text-lg font-black text-slate-800">Ngày {journeyDay}/7</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD MỚI: CÀI ĐẶT GIAO DIỆN & ĐỒNG BỘ THỜI GIAN THỰC */}
                  <div className={`p-6 sm:p-7 rounded-[36px] shadow-sm border transition-colors duration-500 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-100'
                      : 'bg-white border-emerald-100 text-slate-800'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className={`font-black text-base sm:text-lg flex items-center gap-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                          🌤️ Giao Diện & Đồng Bộ Thời Gian Thực
                        </h3>
                        <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          Tự động theo giờ ngoài đời & đổi chế độ Sáng/Tối toàn ứng dụng
                        </p>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                        autoRealTimeWeather
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-400/40'
                          : 'bg-amber-500/15 text-amber-500 border-amber-400/40'
                      }`}>
                        {autoRealTimeWeather ? '⏱️ Tự động theo giờ thực' : '🎨 Tùy chỉnh thủ công'}
                      </span>
                    </div>

                    {/* 1. Nút bật/tắt Tự động theo thời gian thực */}
                    <motion.button
                      {...btnMotionProps}
                      onClick={() => {
                        playUiSound('click');
                        setAutoRealTimeWeather(prev => !prev);
                      }}
                      className={`w-full mb-3.5 p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        autoRealTimeWeather
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                          : isDarkMode
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                            : 'bg-emerald-50/70 border-emerald-200 text-emerald-800 hover:bg-emerald-100/70'
                      }`}
                    >
                      <span className="flex items-center gap-2 text-left">
                        <span className="text-base">✨</span>
                        <span>Đồng bộ thời tiết theo giờ thực ngoài đời</span>
                      </span>
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black shrink-0 ${
                        autoRealTimeWeather
                          ? 'bg-white text-emerald-700'
                          : isDarkMode
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-white text-slate-600 border border-emerald-200'
                      }`}>
                        {autoRealTimeWeather ? 'ĐANG BẬT ✓' : 'BẬT NGAY'}
                      </span>
                    </motion.button>

                    {/* 2. Công tắc Đổi Chế độ Sáng / Tối toàn ứng dụng (Light Mode / Dark Mode) */}
                    <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                      isDarkMode
                        ? 'bg-indigo-950/60 border-indigo-800/80 text-slate-100'
                        : 'bg-slate-50 border-slate-200/80 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs ${
                          isDarkMode ? 'bg-indigo-900 text-amber-300' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {isDarkMode ? '🌙' : '☀️'}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-black">
                            Chế độ {isDarkMode ? 'Tối (Dark Mode)' : 'Sáng (Light Mode)'}
                          </p>
                          <p className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Đồng bộ màu nền toàn bộ Sổ tay, Checklist & Hồ sơ
                          </p>
                        </div>
                      </div>

                      <motion.button
                        {...btnMotionProps}
                        onClick={() => {
                          playUiSound('click');
                          setAutoRealTimeWeather(false);
                          const nextDark = !isDarkMode;
                          setIsDarkMode(nextDark);
                          if (nextDark && gardenTheme !== 'night') {
                            setGardenTheme('night');
                          } else if (!nextDark && gardenTheme === 'night') {
                            setGardenTheme('morning');
                          }
                        }}
                        className={`px-4 py-2 rounded-xl font-black text-xs cursor-pointer transition-all shrink-0 shadow-xs ${
                          isDarkMode
                            ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                            : 'bg-slate-800 text-white hover:bg-slate-700'
                        }`}
                      >
                        {isDarkMode ? '☀️ Chuyển Sáng' : '🌙 Bật Chế Độ Tối'}
                      </motion.button>
                    </div>
                  </div>
                  {/* CARD 2: KHO ẢNH ĐẠI DIỆN CHIBI */}
                  <div id="avatar-gallery" className="bg-white p-6 sm:p-8 rounded-[36px] shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <h3 className="font-black text-slate-800 text-base">Kho ảnh đại diện Chibi</h3>
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {AVATARS.length} mẫu
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 font-medium">Bấm vào avatar để thay đổi diện mạo của bạn trên toàn bộ trạm</p>

                    {/* Toast thông báo đổi avatar thành công */}
                    {avatarNotification && (
                      <div className="mb-4 py-2 px-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-between shadow-xs">
                        <span className="flex items-center gap-1.5">
                          <span>🎉</span> {avatarNotification}
                        </span>
                        <span className="text-[10px] text-emerald-600 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-100">
                          Đã lưu
                        </span>
                      </div>
                    )}

                    {/* Danh sách Avatar dạng lưới 4x4 cân đối */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {AVATARS.map(a => {
                        const isCurrent = a.id === selectedAvatarId || a.legacyId === selectedAvatarId || currentAvatar?.id === a.id;
                        const isUnlocked = isAvatarUnlocked(a);
                        const lockText = a.lockMsg || getAvatarReq(a).msg;

                        return (
                          <div 
                            key={a.id} 
                            onClick={() => { playUiSound('click'); handleSelectAvatar(a); }}
                            title={a.desc || a.name}
                            className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between transition-all cursor-pointer group relative ${
                              isCurrent 
                                ? 'bg-purple-50/70 border-purple-400 shadow-sm scale-[1.02] ring-2 ring-purple-200' 
                                : isUnlocked 
                                  ? 'bg-slate-50/50 border-slate-100 hover:border-purple-200 hover:bg-white hover:-translate-y-1 hover:shadow-xs' 
                                  : 'bg-slate-50/80 border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            {/* Dấu tích đang chọn góc trên */}
                            {isCurrent && (
                              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black shadow-xs z-10">
                                ✓
                              </span>
                            )}

                            {/* Vòng tròn Avatar + icon khóa nhỏ góc trên phải nếu chưa mở */}
                            <div className="relative">
                              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 overflow-hidden p-0.5 shadow-xs transition-transform group-hover:scale-105 ${
                                isCurrent 
                                  ? 'border-purple-400 ring-2 ring-purple-300 bg-white' 
                                  : isUnlocked 
                                    ? 'border-slate-200 bg-white' 
                                    : 'border-slate-200 bg-slate-100 opacity-60 grayscale-[30%]'
                              }`}>
                                <img 
                                  src={a.img} 
                                  alt={a.name} 
                                  className="w-full h-full object-contain rounded-full"
                                  onError={(e) => {
                                    if (!tryFallbackStageImg(e)) {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }
                                  }}
                                />
                                <span className="text-2xl hidden w-full h-full items-center justify-center">{a.icon}</span>
                              </div>
                              {!isUnlocked && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[10px]">
                                  🔒
                                </span>
                              )}
                            </div>

                            <p className="text-xs font-black text-slate-800 line-clamp-1 mt-2 mb-1.5 w-full text-center">
                              {a.name}
                            </p>

                            {/* Nút trạng thái bên dưới */}
                            {isCurrent ? (
                              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-xs">
                                Đang dùng
                              </span>
                            ) : isUnlocked ? (
                              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                                Chọn ngay
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-400 border border-slate-200/80 whitespace-nowrap">
                                🔒 {lockText}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* CỘT PHẢI: BẢNG XẾP HẠNG NÔNG DÂN + HUY HIỆU + HÀNG XÓM (SPAN 6) */}
                <div className="lg:col-span-6 space-y-6">

                  {/* BẢNG XẾP HẠNG NÔNG DÂN (TOP 5 LEADERBOARD) */}
                  <div className="bg-white p-6 sm:p-8 rounded-[36px] shadow-sm border border-amber-100 relative overflow-hidden">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-5">
                      <div>
                        <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                          👑 Bảng Xếp Hạng Nông Dân
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Top 5 nông dân có Điểm Chữa Lành (EXP) cao nhất tại trạm
                        </p>
                      </div>
                      <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black px-3 py-1 rounded-full">
                        Hạng #{leaderboardList.findIndex(x => x.isMe) + 1 || 1}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {leaderboardList.map((farmer, index) => {
                        const rankBadge = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
                        const isImgPath = typeof farmer.avatar === 'string' && (farmer.avatar.startsWith('/') || farmer.avatar.startsWith('http'));

                        return (
                          <div
                            key={`${farmer.name}-${index}`}
                            className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                              farmer.isMe
                                ? 'bg-gradient-to-r from-amber-50/90 to-emerald-50/60 border-amber-300 shadow-xs scale-[1.01]'
                                : 'bg-slate-50/70 border-slate-100 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                                index === 0
                                  ? 'bg-amber-400 text-white shadow-xs'
                                  : index === 1
                                    ? 'bg-slate-300 text-slate-800'
                                    : index === 2
                                      ? 'bg-amber-700/80 text-white'
                                      : 'bg-white border border-slate-200 text-slate-500 text-xs'
                              }`}>
                                {rankBadge}
                              </div>

                              <div className="w-11 h-11 rounded-full bg-white border-2 border-amber-100 shadow-2xs flex items-center justify-center overflow-hidden shrink-0 text-xl p-0.5">
                                {isImgPath ? (
                                  <img
                                    src={farmer.avatar}
                                    alt={farmer.name}
                                    className="w-full h-full object-contain rounded-full"
                                    onError={(e) => {
                                      if (!tryFallbackStageImg(e)) {
                                        e.target.style.display = 'none';
                                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                                      }
                                    }}
                                  />
                                ) : null}
                                <span className={isImgPath ? 'hidden' : ''}>{farmer.icon || farmer.avatar || '🌱'}</span>
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className="font-black text-slate-800 text-sm truncate">
                                    {farmer.name}
                                  </p>
                                  {farmer.isMe && (
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                                      Bạn
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium">
                                  {index === 0 ? '🌟 Nông Dân Chữa Lành Xuất Sắc' : '🌱 Nông Dân Chăm Chỉ'}
                                </p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-sm font-black text-amber-600 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
                                ⭐ {farmer.exp} EXP
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* BỘ SƯU TẬP HUY HIỆU */}
                  <div className="bg-white p-8 rounded-[32px] shadow-sm border border-amber-50">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-black text-slate-800 text-lg mb-1">Bộ Sưu Tập Huy Hiệu 🏆</h3>
                        <p className="text-xs text-slate-500 font-medium">Bạn đã sưu tập được {unlockedBadges.length}/{ACHIEVEMENTS.length} huy hiệu</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ACHIEVEMENTS.map(badge => {
                        const isUnlocked = unlockedBadges.includes(badge.id);
                        const currentVal = badge.type === 'action' ? userStats.action : userStats[badge.type];
                        const progress = Math.min(100, (currentVal / badge.target) * 100);
                        
                        return (
                          <div key={badge.id} className={`flex flex-col p-4 rounded-2xl border transition-all ${isUnlocked ? 'bg-amber-50/30 border-amber-200 hover:shadow-md hover:-translate-y-1' : 'bg-slate-50 border-slate-100 grayscale-[0.6] opacity-70'}`}>
                            <div className="flex gap-4 items-center mb-3">
                              <div className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-3xl border-4 shadow-sm relative overflow-hidden ${isUnlocked ? 'bg-white border-amber-300' : 'bg-slate-200 border-slate-300'}`}>
                                {isUnlocked ? badge.icon : '🔒'}
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{badge.group}</span>
                                <h4 className={`text-sm font-black leading-tight ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>{badge.name}</h4>
                                {isUnlocked ? (
                                  <span className="inline-block mt-1 text-[9px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">✨ Đã mở khóa</span>
                                ) : (
                                  <span className="text-[10px] font-bold text-slate-400 mt-1 block">{currentVal}/{badge.target} lần</span>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-[10px] font-medium text-slate-500 mb-2">{badge.desc}</p>
                            
                            {/* Thanh tiến độ */}
                            {!isUnlocked && (
                              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-400 rounded-full" style={{ width: `${progress}%` }}></div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* GHÉ THĂM KHU VƯỜN HÀNG XÓM */}
                  <div className="bg-white p-6 sm:p-8 rounded-[36px] shadow-sm border border-slate-100 space-y-5">
                    <div className="flex flex-wrap justify-between items-center gap-2 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🏡</span>
                        <div>
                          <h3 className="font-black text-slate-800 text-base">Ghé Thăm Khu Vườn Hàng Xóm</h3>
                          <p className="text-[11px] text-slate-400 font-medium">Tưới nước giúp bạn bè nhận +15 EXP/lượt (Tối đa 3 vườn/ngày)</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          playUiSound('click');
                          if (navigator.clipboard) navigator.clipboard.writeText(playerUID);
                          showAlert("Đã sao chép UID! 📋", `Mã UID khu vườn của bạn là: ${playerUID}\nHãy gửi mã này cho bạn bè để họ sang thăm nhé!`, "success");
                        }} 
                        className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-black py-2 px-3.5 rounded-xl border border-purple-200 flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Copy size={14} /> UID: {playerUID}
                      </button>
                    </div>

                    {/* Ô nhập mã UID bạn bè */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={neighborSearchInput}
                        onChange={(e) => setNeighborSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleVisitNeighbor()}
                        placeholder="Nhập mã UID bạn bè (VD: GZ-MEO999)..."
                        className="flex-1 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-2xl px-4 py-3 text-xs font-bold text-slate-700 outline-none transition-all uppercase placeholder:normal-case"
                      />
                      <button
                        onClick={() => handleVisitNeighbor()}
                        className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-md shadow-emerald-200/60 transition-transform hover:scale-[1.02] cursor-pointer whitespace-nowrap"
                      >
                        Ghé thăm ➔
                      </button>
                    </div>

                    {/* 3 Thẻ Hàng Xóm Gợi Ý (DEFAULT_NEIGHBORS) */}
                    <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                        🌟 Hàng xóm thân thiện quanh trạm
                      </p>
                      <div className="grid grid-cols-1 gap-2.5">
                        {DEFAULT_NEIGHBORS.map(nb => {
                          const nbPlant = PLANT_COLLECTION.find(p => p.id === nb.plantId) || PLANT_COLLECTION[0];
                          const today = new Date().toLocaleDateString('vi-VN');
                          const isWatered = neighborWaterDate === today && wateredNeighborsToday.includes(nb.uid);

                          return (
                            <div
                              key={nb.uid}
                              className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                                  {nb.avatar}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="font-black text-slate-800 text-xs truncate">{nb.name}</h4>
                                    <span className="text-[9px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                                      {nb.uid}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-emerald-700 font-bold truncate mt-0.5">
                                    Đang trồng: {nbPlant.icon} {nbPlant.name} ({nb.growth}%)
                                  </p>
                                  <p className="text-[10px] text-slate-400 truncate">{nb.bio}</p>
                                </div>
                              </div>

                              <button
                                onClick={() => handleVisitNeighbor(nb.uid)}
                                className={`px-3.5 py-2 rounded-xl font-black text-xs shrink-0 transition-all cursor-pointer ${
                                  isWatered
                                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                    : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-500 hover:text-white shadow-xs'
                                }`}
                              >
                                {isWatered ? '✓ Đã tưới' : '🏡 Sang thăm'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hộp thư Lời nhắn ấm áp nhận được từ bạn bè */}
                    {inboxStickers.length > 0 && (
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-[11px] font-black text-rose-600 uppercase tracking-wider mb-2.5">
                          💌 Lời nhắn ấm áp bạn nhận được ({inboxStickers.length})
                        </p>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {inboxStickers.map((msg, idx) => (
                            <div key={idx} className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start gap-2.5">
                              <span className="text-xl">{msg.icon || '🌻'}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-black text-slate-800">{msg.from}</span>
                                  <span className="text-[10px] font-bold text-slate-400">{msg.date}</span>
                                </div>
                                <p className="text-xs text-slate-600 font-medium mt-0.5">{msg.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* MENU CỐ ĐỊNH DƯỚI ĐÁY CHO MOBILE (ẨN TRÊN md:) */}
      <nav className={`md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-50 backdrop-blur-lg border p-2.5 flex justify-between items-center rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] ${
        isDarkMode
          ? 'bg-slate-900/95 border-slate-800'
          : 'bg-white/95 border-slate-100'
      }`}>
        <button onClick={() => { playUiSound('click'); backToReceipt(); }} className="flex flex-col items-center gap-1 w-12 text-slate-400 hover:text-slate-600 cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <button onClick={() => { playUiSound('click'); setActiveTab('care'); }} className={`flex flex-col items-center gap-1 w-12 transition cursor-pointer ${activeTab === 'care' ? 'text-emerald-500' : 'text-slate-400'}`}>
          <Sprout size={20} />
          <span className="text-[9px] font-bold">Chăm</span>
        </button>
        <button onClick={() => { playUiSound('click'); setActiveTab('tasks'); }} className={`flex flex-col items-center gap-1 w-12 transition cursor-pointer ${activeTab === 'tasks' ? 'text-blue-500' : 'text-slate-400'}`}>
          <ListTodo size={20} />
          <span className="text-[9px] font-bold">Nhiệm vụ</span>
        </button>
        <button onClick={() => { playUiSound('click'); setActiveTab('journey'); }} className={`flex flex-col items-center gap-1 w-12 transition cursor-pointer ${activeTab === 'journey' ? 'text-rose-400' : 'text-slate-400'}`}>
          <CalendarDays size={20} />
          <span className="text-[9px] font-bold">7 Ngày</span>
        </button>
        <button onClick={() => { playUiSound('click'); setActiveTab('collection'); }} className={`flex flex-col items-center gap-1 w-12 transition cursor-pointer ${activeTab === 'collection' ? 'text-amber-500' : 'text-slate-400'}`}>
          <LayoutGrid size={20} />
          <span className="text-[9px] font-bold">Sưu tập</span>
        </button>
        <button onClick={() => { playUiSound('click'); setActiveTab('profile'); }} className={`flex flex-col items-center gap-1 w-12 transition cursor-pointer ${activeTab === 'profile' ? 'text-purple-500' : 'text-slate-400'}`}>
          <User size={20} />
          <span className="text-[9px] font-bold">Hồ sơ</span>
        </button>
      </nav>

      {/* MODAL HUY HIỆU ĐƯỢC CĂN GIỮA MÀN HÌNH */}
      <AnimatePresence>
        {showBadgePopup && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} className="bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl border-4 border-white text-center flex flex-col items-center relative overflow-hidden">
              
              {/* Hiệu ứng ánh sáng quay sau lưng */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(251,191,36,0.2)_360deg)] animate-[spin_4s_linear_infinite] rounded-full scale-[1.5] pointer-events-none z-0"></div>
              
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-100 to-yellow-200 rounded-full flex items-center justify-center text-5xl mb-4 shadow-inner animate-bounce border-[3px] border-white relative z-10">
                {showBadgePopup.icon}
              </div>
              
              <h4 className="font-black text-slate-800 text-2xl mb-1 relative z-10">Tuyệt vời!</h4>
              <p className="text-sm font-bold text-slate-600 mb-4 relative z-10">Bạn vừa nhận được huy hiệu <br/><span className="text-amber-600 text-lg">"{showBadgePopup.name}"</span></p>
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 relative z-10 w-full">
                <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">{showBadgePopup.desc}</p>
                <p className="text-xs font-black text-emerald-500 bg-emerald-50 py-1.5 rounded-lg border border-emerald-100">
                  🎁 Phần thưởng: {showBadgePopup.reward}
                </p>
              </div>

              <button onClick={() => setShowBadgePopup(null)} className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white font-black py-3.5 rounded-xl shadow-lg shadow-orange-200 hover:scale-[1.02] transition-transform relative z-10">
                Cất vào Bộ sưu tập
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL THÔNG BÁO Ở GIỮA MÀN HÌNH */}
      <AnimatePresence>
        {appAlert && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-8 rounded-[32px] max-w-sm w-full text-center shadow-2xl border-4 border-white">
              <div className="text-6xl mb-4 animate-bounce">{appAlert.type === 'error' ? '🥺' : '🎉'}</div>
              <h3 className="font-black text-xl text-slate-800 mb-2">{appAlert.title}</h3>
              <p className="text-sm font-medium text-slate-600 mb-8 whitespace-pre-line">{appAlert.message}</p>
              <button onClick={() => setAppAlert(null)} className={`w-full py-4 text-white font-black rounded-2xl shadow-lg hover:scale-[1.02] transition-transform ${appAlert.type === 'error' ? 'bg-rose-400 shadow-rose-200' : 'bg-emerald-400 shadow-emerald-200'}`}>
                Đã hiểu
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL ĐỌC LẠI NHẬT KÝ KHI BẤM VÀO LỊCH */}
      <AnimatePresence>
        {viewLog && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4" onClick={() => setViewLog(null)}>
            <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`p-8 rounded-[32px] max-w-sm w-full text-center shadow-2xl border-4 border-white ${viewLog.emotion.bg}`} onClick={e => e.stopPropagation()}>
              <div className="text-7xl mb-4 drop-shadow-md">{viewLog.emotion.icon}</div>
              <h3 className="font-black text-2xl text-slate-800 mb-1">Ngày {viewLog.day}</h3>
              <p className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">Bạn cảm thấy: {viewLog.emotion.label}</p>
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-3xl text-sm text-slate-700 font-medium min-h-[100px] text-left shadow-inner border border-white">
                {viewLog.note || "Hôm nay bạn không viết gì cả, chỉ âm thầm lưu lại cảm xúc thôi..."}
              </div>
              <button onClick={() => setViewLog(null)} className="mt-8 w-full py-4 bg-white text-slate-700 font-black rounded-2xl shadow-sm hover:bg-slate-50 transition-colors">
                Khép lại nhật ký
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL ÂM THANH THIÊN NHIÊN (MIX & MATCH) */}
      <AnimatePresence>
        {showSoundModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#fcf9f2] p-7 rounded-[32px] w-full max-w-md shadow-2xl border-4 border-white relative flex flex-col">
              <button onClick={() => setShowSoundModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-amber-600 font-black p-2">✕</button>
              
              <h3 className="font-black text-xl text-amber-800 mb-1 flex items-center gap-2">🎧 Góc Âm Thanh Chữa Lành</h3>
              <p className="text-xs text-slate-500 mb-5">Bạn có thể chọn nhiều âm thanh cùng lúc để pha trộn không gian riêng (nhạc vẫn phát khi đóng bảng này).</p>

              {/* Danh sách các thẻ âm thanh */}
              <div className="grid grid-cols-1 gap-2.5 mb-6">
                {AMBIENT_SOUNDS.map(s => {
                  const isActive = playingSounds[s.id];
                  return (
                    <div 
                      key={s.id} 
                      onClick={() => toggleAmbientSound(s)}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${isActive ? 'bg-amber-100/80 border-amber-400 shadow-sm scale-[1.01]' : 'bg-white border-amber-50 hover:bg-amber-50/40'}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isActive ? 'bg-amber-400 text-white animate-pulse' : 'bg-slate-100'}`}>
                          {s.icon}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-800 text-xs">{s.label}</h4>
                          <p className="text-[10px] text-slate-500 font-medium">{s.desc}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${isActive ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {isActive ? 'Đang phát 🔊' : 'Bật'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Thanh chỉnh âm lượng & nút tắt */}
              <div className="bg-white p-4 rounded-2xl border border-amber-100 flex items-center gap-4 mb-4">
                <span className="text-xs font-black text-slate-600 whitespace-nowrap">🔉 Âm lượng:</span>
                <input 
                  type="range" 
                  min="0" max="1" step="0.05" 
                  value={soundVolume} 
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                {activeSoundCount > 0 && (
                  <button onClick={stopAllSounds} className="flex-1 bg-rose-50 text-rose-600 font-black py-3 rounded-2xl border border-rose-100 text-xs hover:bg-rose-100 transition-colors">
                    ⏹️ Tắt tất cả
                  </button>
                )}
                <button onClick={() => setShowSoundModal(false)} className="flex-1 bg-amber-400 text-white font-black py-3 rounded-2xl shadow-md shadow-amber-200 text-xs hover:bg-amber-500 transition-colors">
                  Nghe dưới nền & Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL HỘP THƯ TƯƠNG LAI (VIẾT & ĐỌC LẠI VĨNH VIỄN) */}
      <AnimatePresence>
        {showLetterModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-7 rounded-[32px] w-full max-w-md shadow-2xl border-4 border-white relative flex flex-col max-h-[85vh]">
              <button onClick={() => { setShowLetterModal(false); setReadingLetter(null); }} className="absolute top-4 right-4 text-slate-400 hover:text-pink-500 font-black p-2">✕</button>
              <h3 className="font-black text-xl text-pink-700 mb-1">💌 Hộp Thư Thời Gian</h3>
              <p className="text-xs text-slate-500 mb-4">Viết vài dòng cho chính bạn ở phía trước. Các bức thư được lưu giữ vĩnh viễn để bạn đọc lại bất cứ lúc nào.</p>

              {/* Form viết thư mới */}
              <textarea
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                rows={3}
                placeholder="Gửi bạn của ngày mai..."
                className="w-full bg-pink-50/50 border border-pink-100 rounded-2xl p-3.5 text-sm font-medium outline-none focus:border-pink-300 resize-none mb-3"
              />
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-slate-500">Hẹn ngày mở khóa:</span>
                <div className="flex gap-1.5">
                  {[
                    { d: 0, label: 'Mở ngay' },
                    { d: 1, label: '1 ngày' },
                    { d: 3, label: '3 ngày' },
                    { d: 7, label: '7 ngày' }
                  ].map(opt => (
                    <button
                      key={opt.d}
                      onClick={() => setLetterUnlockDays(opt.d)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                        letterUnlockDays === opt.d
                          ? 'bg-pink-400 text-white border-pink-400 shadow-xs'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-pink-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  if (!letterText.trim()) return;
                  const now = Date.now();
                  const unlockAt = now + letterUnlockDays * 86400000;
                  const newLetter = {
                    id: 'lt_' + now,
                    text: letterText.trim(),
                    date: new Date().toLocaleDateString('vi-VN'),
                    unlockDate: new Date(unlockAt).toLocaleDateString('vi-VN'),
                    unlockAt,
                    isOpened: false
                  };
                  setFutureLetters(prev => [newLetter, ...prev]);
                  setLetterText('');
                  showAlert("Đã cất thư 💌", "Bức thư của bạn đã được cất giữ cẩn thận vào Hộp Thư Thời Gian!", "success");
                }}
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-black py-3 rounded-2xl shadow-md shadow-pink-200 hover:scale-[1.01] transition-transform text-xs mb-4 cursor-pointer"
              >
                ✨ Niêm phong & Cất vào Hộp thư
              </button>

              {/* Danh sách thư đã cất giữ (không bao giờ xóa khi đọc) */}
              <div className="border-t border-slate-100 pt-3 flex-1 overflow-y-auto space-y-2 pr-1">
                <p className="text-[11px] font-black text-slate-600 uppercase tracking-wider mb-2">
                  Thư đang cất giữ ({futureLetters.length})
                </p>
                {futureLetters.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4 italic">Chưa có bức thư nào trong hộp.</p>
                ) : (
                  futureLetters.map((lt, idx) => {
                    const isUnlocked = !lt.unlockAt || Date.now() >= lt.unlockAt;
                    const isSelected = readingLetter && (readingLetter.id ? readingLetter.id === lt.id : readingLetter === lt);
                    return (
                      <div
                        key={lt.id || idx}
                        onClick={() => {
                          if (!isUnlocked) {
                            return showAlert("Chưa đến ngày mở 🔒", `Bức thư này được hẹn mở vào ngày ${lt.unlockDate}. Hãy kiên nhẫn chờ nhé!`, "error");
                          }
                          // Đánh dấu isOpened: true nhưng TUYỆT ĐỐI KHÔNG XÓA khỏi mảng futureLetters
                          setFutureLetters(prev => prev.map((item, i) => (item.id ? item.id === lt.id : i === idx) ? { ...item, isOpened: true } : item));
                          setReadingLetter({ ...lt, isOpened: true });
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-pink-50 border-pink-300 shadow-xs'
                            : isUnlocked
                              ? 'bg-white border-rose-100 hover:border-pink-200 hover:bg-pink-50/40'
                              : 'bg-slate-50 border-slate-200 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                            {!isUnlocked ? '🔒 Thư đang khóa' : lt.isOpened ? '📖 Thư đã mở' : '✉️ Thư đến hạn mở'}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">Gửi: {lt.date}</span>
                        </div>
                        {isSelected && isUnlocked && (
                          <div className="mt-2.5 p-3 bg-white rounded-xl border border-pink-100 text-xs text-slate-700 font-medium whitespace-pre-line leading-relaxed shadow-inner">
                            {lt.text}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL HÍT THỞ CHỮA LÀNH */}
      <AnimatePresence>
        {showBreathingModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-8 rounded-[32px] w-full max-w-sm text-center shadow-2xl border-4 border-white relative flex flex-col items-center">
              
              <button onClick={() => setShowBreathingModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold p-2">✕</button>
              
              <h3 className="font-black text-xl text-slate-800 mb-2">Nhịp Thở Bình Yên</h3>
              <p className="text-xs text-slate-500 mb-8">Còn lại {breathCyclesLeft} vòng</p>

              {/* Vòng tròn phóng to thu nhỏ */}
              <div className="relative w-44 h-44 flex items-center justify-center mb-8">
                <motion.div 
                  animate={{ 
                    scale: breathStep === 'inhale' ? 1.3 : breathStep === 'hold' ? 1.3 : 1 
                  }} 
                  transition={{ duration: breathStep === 'inhale' ? 4 : breathStep === 'exhale' ? 8 : 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-emerald-200 rounded-full opacity-60 shadow-inner"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-3xl font-black text-teal-800">
                    {breathStep === 'done' ? '🎉' : breathTimer}
                  </span>
                  <span className="text-xs font-bold text-teal-700 mt-1 uppercase tracking-wider">
                    {breathStep === 'inhale' && 'Hít vào sâu...'}
                    {breathStep === 'hold' && 'Giữ hơi...'}
                    {breathStep === 'exhale' && 'Thở ra từ từ...'}
                    {breathStep === 'done' && 'Hoàn thành!'}
                  </span>
                </div>
              </div>

              {breathStep === 'done' ? (
                <button onClick={() => setShowBreathingModal(false)} className="w-full bg-emerald-400 text-white font-black py-3.5 rounded-xl shadow-lg shadow-emerald-200">
                  Nhận +10 EXP & +1 💧
                </button>
              ) : (
                <p className="text-[11px] font-medium text-slate-400">Thả lỏng vai và tập trung vào hơi thở của bạn...</p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. MODAL BỐC THẺ BÀI VŨ TRỤ (DAILY TAROT) */}
      <AnimatePresence>
        {showTarotModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setShowTarotModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-purple-50 via-white to-pink-50 p-7 rounded-[36px] w-full max-w-md shadow-2xl border-4 border-white relative text-center"
            >
              <button onClick={() => setShowTarotModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-purple-600 font-black p-2 cursor-pointer">✕</button>
              <h3 className="font-black text-xl text-purple-900 mb-1">🎴 Thông Điệp Vũ Trụ Hôm Nay</h3>
              <p className="text-xs text-slate-500 mb-6">Mỗi ngày rút 1 lá bài Tarot chữa lành để nhận năng lượng & quà tặng may mắn</p>

              {(() => {
                const todayStr = new Date().toLocaleDateString('vi-VN');
                const hasPickedToday = lastTarotDate === todayStr && !!todayTarotCard;

                if (!hasPickedToday) {
                  return (
                    <div>
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        {[0, 1, 2].map(idx => (
                          <motion.div
                            key={idx}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 2.4, delay: idx * 0.25 }}
                            onClick={() => handlePickTarotCard(idx)}
                            className={`h-44 rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-400 p-1 shadow-lg cursor-pointer hover:scale-105 transition-transform ${
                              selectedCardIndex === idx ? 'ring-4 ring-amber-300 scale-105' : ''
                            }`}
                          >
                            <div className="w-full h-full rounded-[20px] border-2 border-white/40 flex flex-col items-center justify-center text-white p-2 bg-white/10 backdrop-blur-xs">
                              <span className="text-3xl mb-2">✨</span>
                              <span className="text-[11px] font-black uppercase tracking-wider opacity-90">Lá bài #{idx + 1}</span>
                              <span className="text-[9px] mt-1 bg-white/20 px-2 py-0.5 rounded-full font-bold">Chạm để mở</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-xs font-bold text-purple-600 animate-pulse">
                        ✨ Hãy lắng nghe trực giác và chạm vào 1 trong 3 lá bài phía trên...
                      </p>
                    </div>
                  );
                }

                return (
                  <motion.div
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.45 }}
                    className="bg-white p-6 rounded-3xl border-2 border-purple-200 shadow-inner flex flex-col items-center"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-100 text-purple-700 mb-2">
                      Lá số {todayTarotCard.num} • {todayTarotCard.rarity}
                    </span>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center text-5xl my-2 shadow-sm border-2 border-white">
                      {todayTarotCard.icon}
                    </div>
                    <h4 className="font-black text-lg text-slate-800 mb-2">{todayTarotCard.name}</h4>
                    <p className="text-xs text-slate-600 font-medium italic leading-relaxed mb-5 px-2">
                      "{todayTarotCard.msg}"
                    </p>
                    <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-4">
                      <p className="text-[10px] font-bold text-emerald-700 uppercase mb-1">🎁 Quà tặng Vũ Trụ đã cộng vào túi:</p>
                      <p className="text-sm font-black text-emerald-600">
                        +{todayTarotCard.exp} EXP • +{todayTarotCard.water} 💧 Nước
                        {todayTarotCard.itemKey === 'fertilizer' && ' • +1 🪴 Vun đất'}
                        {todayTarotCard.itemKey === 'scissors' && ' • +1 ✂️ Tỉa cành'}
                        {todayTarotCard.itemKey === 'seed' && ' • +1 🌱 Hạt giống'}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowTarotModal(false)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xs shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                      Đón nhận năng lượng ✨
                    </button>
                  </motion.div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. MODAL TRANG TRÍ KHU VƯỜN (GARDEN THEMES & POT STYLES) */}
      <AnimatePresence>
        {showCustomizeModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setShowCustomizeModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-7 rounded-[36px] w-full max-w-lg shadow-2xl border-4 border-white relative max-h-[88vh] overflow-y-auto"
            >
              <button onClick={() => setShowCustomizeModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-black p-2 cursor-pointer">✕</button>
              <h3 className="font-black text-xl text-slate-800 mb-1">🎨 Trang Trí Khu Vườn</h3>
              <p className="text-xs text-slate-500 mb-5">Đổi màu bầu trời & kiểu chậu cây theo tổng Điểm Chữa Lành ({inventory.exp} EXP)</p>

              {/* Phần 1: Chọn Bầu Trời */}
              <div className="mb-6">
                <h4 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-3">🌤️ Chủ đề Bầu Trời (Garden Themes)</h4>
                <div className="grid grid-cols-2 gap-3">
                  {GARDEN_THEMES.map(theme => {
                    const isUnlocked = inventory.exp >= theme.reqExp;
                    const isSelected = gardenTheme === theme.id;
                    return (
                      <div
                        key={theme.id}
                        onClick={() => {
                          if (!isUnlocked) {
                            return showAlert("Chưa mở khóa 🔒", `Chủ đề "${theme.name}" cần đạt ${theme.reqExp} EXP để mở khóa!`, "error");
                          }
                          setGardenTheme(theme.id);
                        }}
                        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                            : isUnlocked
                              ? 'border-slate-100 bg-slate-50/60 hover:border-emerald-200'
                              : 'border-slate-100 bg-slate-100/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{theme.icon}</span>
                          <div>
                            <p className="font-black text-xs text-slate-800">{theme.name}</p>
                            <span className={`text-[10px] font-bold ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {isSelected ? '✓ Đang dùng' : isUnlocked ? 'Đã mở khóa' : `🔒 Cần ${theme.reqExp} EXP`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Phần 2: Chọn Kiểu Chậu */}
              <div className="mb-6">
                <h4 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-3">🏺 Kiểu Đế Chậu (Pot Styles)</h4>
                <div className="grid grid-cols-2 gap-3">
                  {POT_STYLES.map(pot => {
                    const isUnlocked = inventory.exp >= pot.reqExp;
                    const isSelected = potStyle === pot.id;
                    return (
                      <div
                        key={pot.id}
                        onClick={() => {
                          if (!isUnlocked) {
                            return showAlert("Chưa mở khóa 🔒", `Kiểu chậu "${pot.name}" cần đạt ${pot.reqExp} EXP để mở khóa!`, "error");
                          }
                          setPotStyle(pot.id);
                        }}
                        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                            : isUnlocked
                              ? 'border-slate-100 bg-slate-50/60 hover:border-amber-200'
                              : 'border-slate-100 bg-slate-100/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {pot.id !== 'natural' ? (
                            <div className="w-12 h-8 flex items-center justify-center shrink-0 drop-shadow-xs">
                              <GardenPotSvg potId={pot.id} mini />
                            </div>
                          ) : (
                            <span className="text-2xl shrink-0">{pot.icon}</span>
                          )}
                          <div>
                            <p className="font-black text-xs text-slate-800">{pot.name}</p>
                            <span className={`text-[10px] font-bold ${isSelected ? 'text-amber-600' : 'text-slate-400'}`}>
                              {isSelected ? '✓ Đang dùng' : isUnlocked ? 'Đã mở khóa' : `🔒 Cần ${pot.reqExp} EXP`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setShowCustomizeModal(false)}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md transition-colors cursor-pointer"
              >
                Hoàn tất trang trí ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. MODAL XEM KHU VƯỜN HÀNG XÓM (VISITING NEIGHBOR) */}
      <AnimatePresence>
        {visitingNeighbor && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setVisitingNeighbor(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-emerald-50 via-white to-amber-50/60 p-7 rounded-[36px] w-full max-w-md shadow-2xl border-4 border-white relative text-center max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setVisitingNeighbor(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-black p-2 cursor-pointer">✕</button>

              {(() => {
                const nbPlant = PLANT_COLLECTION.find(p => p.id === visitingNeighbor.plantId) || PLANT_COLLECTION[0];
                const { healthyIdx, label, stageImage } = getPlantStageInfo(visitingNeighbor.growth || 0, false, nbPlant.id);
                const coords = SPRITE_COORDS[nbPlant.id] || SPRITE_COORDS.seed_1;
                const posX = coords.healthyX[healthyIdx];
                const posY = nbPlant.layout === 'two-rows' ? 8 : 55;
                const today = new Date().toLocaleDateString('vi-VN');
                const alreadyWatered = neighborWaterDate === today && wateredNeighborsToday.includes(visitingNeighbor.uid);

                return (
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs flex items-center justify-center text-3xl mb-2 overflow-hidden">
                      {visitingNeighbor.img ? (
                        <img src={visitingNeighbor.img} onError={tryFallbackStageImg} alt={visitingNeighbor.name} className="w-full h-full object-contain" />
                      ) : (
                        <span>{visitingNeighbor.avatar || '🏡'}</span>
                      )}
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
                      UID: {visitingNeighbor.uid}
                    </span>
                    <h3 className="font-black text-xl text-slate-800">Vườn của {visitingNeighbor.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3">{visitingNeighbor.bio}</p>

                    {/* Hình ảnh cây thực tế của Hàng Xóm */}
                    <div className="relative w-48 h-48 rounded-full bg-white/90 border-2 border-emerald-100 shadow-inner flex items-center justify-center p-3 my-2">
                      <img
                        src={stageImage}
                        alt={nbPlant.name}
                        className="w-full h-full object-contain drop-shadow-[0_12px_16px_rgba(15,23,42,0.16)]"
                        onError={(e) => {
                          if (!tryFallbackStageImg(e)) {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                          }
                        }}
                      />
                      <div
                        className="hidden w-full h-full bg-no-repeat mix-blend-multiply"
                        style={{
                          backgroundImage: `url(${nbPlant.sheet})`,
                          backgroundSize: `${coords.widthScale} auto`,
                          backgroundPosition: `${posX}% ${posY}%`
                        }}
                      />
                    </div>

                    <p className="font-black text-sm text-emerald-900 mt-1">
                      {nbPlant.icon} {nbPlant.name} • <span className="text-emerald-600">{visitingNeighbor.growth}%</span>
                    </p>
                    <p className="text-[11px] font-bold text-slate-400 mb-3">{label}</p>

                    {/* Thanh tiến độ cây của bạn bè */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5 mb-4">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${visitingNeighbor.growth}%` }}
                      />
                    </div>

                    {/* Nút Tưới nước hộ */}
                    <button
                      onClick={handleWaterNeighbor}
                      disabled={alreadyWatered}
                      className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-md transition-all mb-5 cursor-pointer ${
                        alreadyWatered
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          : 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white shadow-sky-200 hover:scale-[1.01]'
                      }`}
                    >
                      {alreadyWatered ? '✓ Hôm nay bạn đã tưới giúp khu vườn này rồi' : '💧 Tưới giúp 1 giọt nước (+15 EXP)'}
                    </button>

                    {/* 4 Nút Sticker động viên */}
                    <div className="w-full text-left border-t border-slate-100 pt-4">
                      <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 text-center">
                        💌 Dán Sticker động viên lên bảng gỗ (+5 EXP)
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {ENCOURAGE_STICKERS.map(st => (
                          <button
                            key={st.id}
                            onClick={() => handleSendStickerToNeighbor(st)}
                            className="w-full p-2.5 rounded-2xl bg-white hover:bg-amber-50 border border-slate-100 hover:border-amber-200 flex items-center gap-2.5 text-left transition-all cursor-pointer shadow-2xs"
                          >
                            <span className="text-xl shrink-0">{st.icon}</span>
                            <span className="text-xs font-bold text-slate-700 leading-snug">{st.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* === 5. WIDGET BÉ TRỢ LÝ AI CHIBI KÉO THẢ & CỬA SỔ CHAT NỔI (FIXED BOTTOM-6 RIGHT-6 Z-50) === */}
      {/* Cửa sổ Chat AI Nổi kiểu Messenger */}
      <AnimatePresence>
        {showAiChatModal && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            className={`fixed bottom-36 right-6 z-50 w-80 sm:w-96 rounded-[28px] shadow-2xl border-2 overflow-hidden flex flex-col ${
              isDarkMode
                ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-slate-950/80'
                : 'bg-white border-amber-200 text-slate-800 shadow-amber-900/15'
            }`}
          >
            {/* Header Cửa sổ Chat */}
            <div className={`px-4 py-3 flex items-center justify-between border-b ${
              mascotMood === 'crying'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white border-sky-400'
                : mascotMood === 'excited'
                  ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white border-amber-300'
                  : 'bg-gradient-to-r from-amber-400 to-emerald-500 text-white border-emerald-400'
            }`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-white/95 p-1 shadow-xs shrink-0 flex items-center justify-center">
                  <img
                    src={MASCOT_SPRITES[mascotMood] || MASCOT_SPRITES.happy}
                    alt="Bé Trợ Lý Chibi"
                    onError={tryFallbackStageImg}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-xs sm:text-sm truncate flex items-center gap-1">
                    🐹 Bé Chuột Trợ Lý AI
                  </h4>
                  <p className="text-[10px] font-bold text-white/90 truncate">
                    {mascotMood === 'crying'
                      ? '💧 Đang quá tải & mít ướt...'
                      : mascotMood === 'excited'
                        ? '🎉 Đang reo vui cùng bạn!'
                        : mascotMood === 'thinking'
                          ? '🤔 Đang tra sổ tay...'
                          : `🌱 Đang trực tuyến • Đã hỏi ${questionCount}/5 câu`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {questionCount > 0 && (
                  <button
                    onClick={handleComfortMascot}
                    title="Cho bé ăn phô mai để hồi sức"
                    className="bg-white/25 hover:bg-white/35 text-white text-[10px] font-black px-2 py-1 rounded-xl cursor-pointer transition"
                  >
                    🧀 Dỗ bé
                  </button>
                )}
                <button
                  onClick={() => {
                    playSoundEffect('click');
                    setShowAiChatModal(false);
                  }}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 text-white font-black text-xs flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Danh sách tin nhắn */}
            <div className={`p-3.5 space-y-3 max-h-64 overflow-y-auto ${
              isDarkMode ? 'bg-slate-950' : 'bg-amber-50/70'
            }`}>
              {chatHistory.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 p-0.5 shrink-0 shadow-2xs">
                        <img
                          src={MASCOT_SPRITES[msg.mood || mascotMood] || MASCOT_SPRITES.happy}
                          alt="Mascot"
                          onError={tryFallbackStageImg}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-2xs ${
                        isUser
                          ? 'bg-emerald-500 text-white rounded-br-none'
                          : msg.mood === 'crying'
                            ? isDarkMode
                              ? 'bg-sky-950/90 text-sky-200 border border-sky-800 rounded-bl-none'
                              : 'bg-sky-50 text-sky-900 border border-sky-200 rounded-bl-none'
                            : isDarkMode
                              ? 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none'
                              : 'bg-white text-slate-700 border border-amber-100 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {isAiTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 p-0.5 shrink-0 shadow-2xs">
                    <img src={MASCOT_SPRITES.thinking} alt="Thinking" onError={tryFallbackStageImg} className="w-full h-full object-contain" />
                  </div>
                  <div className="px-3.5 py-2 rounded-2xl rounded-bl-none text-xs font-bold italic animate-pulse border bg-white text-amber-700 border-amber-200">
                    🤔 Bé Chuột đang suy nghĩ câu trả lời...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Nút dỗ dành nổi bật khi bé đang khóc (questionCount > 5) */}
            {mascotMood === 'crying' && (
              <div className="px-3.5 py-2 bg-sky-500/15 border-t border-sky-300/40 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-300">
                  💧 Bé chuột đang mệt vì suy nghĩ nhiều...
                </span>
                <button
                  onClick={handleComfortMascot}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] px-3 py-1 rounded-xl shadow-xs cursor-pointer shrink-0"
                >
                  🧀 Cho ăn Phô Mai
                </button>
              </div>
            )}
            {/* Gợi ý câu hỏi nhanh (Quick Chips) - trả lời tức thì bằng dữ liệu thật của người dùng */}
            <div className={`px-3 py-2 border-t ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50/80 border-slate-100'
            }`}>
              <div className="flex flex-row flex-nowrap overflow-x-auto whitespace-nowrap gap-1.5 my-1 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button onClick={() => handleMascotAnswer('my_plant_status')} className="shrink-0 whitespace-nowrap text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200 hover:bg-emerald-100 cursor-pointer">🌿 Cây của tớ thế nào rồi?</button>
                <button onClick={() => handleMascotAnswer('my_inventory')} className="shrink-0 whitespace-nowrap text-[11px] bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-full border border-amber-200 hover:bg-amber-100 cursor-pointer">🎒 Túi đồ của tớ có gì?</button>
                <button onClick={() => handleMascotAnswer('care_plant')} className="shrink-0 whitespace-nowrap text-[11px] bg-sky-50 text-sky-700 font-bold px-2.5 py-1 rounded-full border border-sky-200 hover:bg-sky-100 cursor-pointer">🚿 Cách chăm cây?</button>
                <button onClick={() => handleMascotAnswer('weather_theme')} className="shrink-0 whitespace-nowrap text-[11px] bg-purple-50 text-purple-700 font-bold px-2.5 py-1 rounded-full border border-purple-200 hover:bg-purple-100 cursor-pointer">🌤️ Đổi thời tiết ở đâu?</button>
                <button onClick={() => handleMascotAnswer('wellness_audio')} className="shrink-0 whitespace-nowrap text-[11px] bg-rose-50 text-rose-700 font-bold px-2.5 py-1 rounded-full border border-rose-200 hover:bg-rose-100 cursor-pointer">🎵 Bật nhạc chill kiểu gì?</button>
                <button onClick={() => handleMascotAnswer('tarot_card')} className="shrink-0 whitespace-nowrap text-[11px] bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full border border-indigo-200 hover:bg-indigo-100 cursor-pointer">🎴 Thẻ Tarot là gì?</button>
                <button onClick={() => handleMascotAnswer('neighbor_visit')} className="shrink-0 whitespace-nowrap text-[11px] bg-teal-50 text-teal-700 font-bold px-2.5 py-1 rounded-full border border-teal-200 hover:bg-teal-100 cursor-pointer">🏡 Ghé vườn hàng xóm?</button>
                <button onClick={() => handleMascotAnswer('my_mood_advice')} className="shrink-0 whitespace-nowrap text-[11px] bg-pink-50 text-pink-700 font-bold px-2.5 py-1 rounded-full border border-pink-200 hover:bg-pink-100 cursor-pointer">💖 Tớ đang hơi buồn...</button>
              </div>
            </div>
            {/* Ô nhập câu hỏi */}
            <div className={`p-3 border-t flex items-center gap-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
            }`}>
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && userQuestion.trim()) { handleSendAiChatMessage(userQuestion); } }}
                placeholder="Nhập câu hỏi hoặc tâm sự với bé chuột..."
                className={`flex-1 text-xs font-bold px-3.5 py-2.5 rounded-2xl border outline-none transition ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-amber-400'
                    : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-amber-400 focus:bg-white'
                }`}
              />
              <motion.button
                {...btnMotionProps}
                onClick={() => { if (userQuestion.trim()) { handleSendAiChatMessage(userQuestion); } }}
                className="bg-gradient-to-r from-amber-400 to-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-2xl shadow-md cursor-pointer shrink-0"
              >
                Gửi ➔
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMemoryGame && (
        <MemoryGame onWinRewards={handleMemoryGameRewards} onClose={() => setShowMemoryGame(false)} />
      )}

      {/* Nhân vật Bé Chuột AI Chibi Kéo Thả Tự Do (Draggable Mascot) */}
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={() => {
          mascotDraggedRef.current = true;
          if (mascotMood !== 'crying') {
            setMascotMood('wink');
            setShowMascotBubble(true);
            setMascotBubbleText('Á á cậu bế tớ đi dạo khắp màn hình hả! Vui quá đi~ 🐹✨');
          }
        }}
        onDragEnd={(_, info) => {
          setMascotPos(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }));
          setTimeout(() => {
            mascotDraggedRef.current = false;
            if (mascotMood === 'wink' && questionCount <= 5) {
              setMascotMood('happy');
            }
          }, 250);
        }}
        className="fixed bottom-20 md:bottom-6 right-5 z-50 flex flex-col items-end select-none cursor-grab active:cursor-grabbing"
      >
        {/* Bong bóng thoại phản ứng cảm xúc phía trên đầu bé Chibi */}
        <AnimatePresence>
          {showMascotBubble && !showAiChatModal && (
            <motion.div
              key={mascotBubbleText}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              onClick={() => {
                if (!mascotDraggedRef.current) {
                  playSoundEffect('click');
                  setShowAiChatModal(prev => !prev);
                }
              }}
              className={`mb-2 mr-1 max-w-[235px] px-3.5 py-2.5 rounded-2xl shadow-xl border-2 text-xs font-extrabold leading-snug relative cursor-pointer ${
                mascotMood === 'crying'
                  ? 'bg-sky-50 border-sky-300 text-sky-900'
                  : mascotMood === 'excited'
                    ? 'bg-gradient-to-r from-amber-50 to-rose-50 border-amber-300 text-amber-900'
                    : isDarkMode
                      ? 'bg-slate-800 border-amber-400/70 text-slate-100'
                      : 'bg-white border-amber-300 text-slate-800'
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMascotBubble(false);
                }}
                className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-200 hover:bg-rose-400 hover:text-white text-slate-600 text-[10px] font-black flex items-center justify-center shadow-xs"
                title="Ẩn lời thoại"
              >
                ✕
              </button>
              <span>{mascotBubbleText}</span>
              {/* Mũi tên trỏ xuống đầu bé chuột */}
              <div className={`w-3 h-3 rotate-45 border-r-2 border-b-2 absolute -bottom-1.5 right-8 ${
                mascotMood === 'crying'
                  ? 'bg-sky-50 border-sky-300'
                  : mascotMood === 'excited'
                    ? 'bg-rose-50 border-amber-300'
                    : isDarkMode
                      ? 'bg-slate-800 border-amber-400/70'
                      : 'bg-white border-amber-300'
              }`} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hình nhân vật Bé Chuột Chibi với hiệu ứng nhún nhảy / khóc / mừng rỡ */}
        <motion.div
          animate={
            mascotMood === 'excited'
              ? { y: [0, -14, 0, -10, 0], rotate: [0, -6, 6, -4, 0], scale: [1, 1.08, 1] }
              : mascotMood === 'crying'
                ? { x: [-2, 2, -2, 2, 0], y: [0, 2, 0] }
                : { y: [0, -5, 0], rotate: [-1.5, 1.5, -1.5] }
          }
          transition={{
            duration: mascotMood === 'excited' ? 0.9 : mascotMood === 'crying' ? 0.6 : 2.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={() => {
            if (!mascotDraggedRef.current) {
              playSoundEffect('click');
              setShowMascotBubble(true);
              setShowAiChatModal(prev => !prev);
            }
          }}
          className="relative group"
        >
          {/* Hiệu ứng giọt nước mắt bắn ra khi bé khóc (crying) */}
          {mascotMood === 'crying' && (
            <>
              <motion.span
                animate={{ y: [0, 18], x: [-2, -10], opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute top-6 left-1 text-base pointer-events-none z-20"
              >
                💧
              </motion.span>
              <motion.span
                animate={{ y: [0, 18], x: [2, 10], opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                className="absolute top-6 right-1 text-base pointer-events-none z-20"
              >
                💧
              </motion.span>
            </>
          )}

          {/* Hiệu ứng pháo hoa / ngôi sao lấp lánh khi bé vui sướng nhận quà (excited) */}
          {mascotMood === 'excited' && (
            <>
              <motion.span
                animate={{ y: [-4, -22], scale: [0.8, 1.3, 0.8], opacity: [0, 1, 0] }}
                transition={{ duration: 1.0, repeat: Infinity }}
                className="absolute -top-3 left-0 text-lg pointer-events-none z-20"
              >
                🎉
              </motion.span>
              <motion.span
                animate={{ y: [-4, -22], scale: [0.8, 1.3, 0.8], opacity: [0, 1, 0] }}
                transition={{ duration: 1.0, repeat: Infinity, delay: 0.35 }}
                className="absolute -top-3 right-0 text-lg pointer-events-none z-20"
              >
                ✨
              </motion.span>
            </>
          )}

          {/* Khung ảnh Bé Chuột Chibi tách nền */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_10px_16px_rgba(15,23,42,0.28)] transition-transform group-hover:scale-105">
            <img
              src={MASCOT_SPRITES[mascotMood] || MASCOT_SPRITES.happy}
              alt="Bé Trợ Lý Chuột Chibi"
              onError={tryFallbackStageImg}
              draggable={false}
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>

          {/* Nhãn nhỏ bên dưới chân bé chuột */}
          <div className=" -mt-2 mx-auto bg-gradient-to-r from-amber-500 to-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md border border-white flex items-center justify-center gap-1 whitespace-nowrap">
            <span>{showAiChatModal ? '💬 Bé Chuột' : '🐹 Bé Chuột'}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};