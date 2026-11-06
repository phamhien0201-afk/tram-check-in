export const SURVEY_QUESTIONS = [
  // ==========================================
  // BIẾN S: TIÊU THỤ NỘI DUNG (Câu 6 -> 11)
  // ==========================================
  {
    id: "S1",
    dimension: "S",
    dimensionLabel: "TIÊU THỤ NỘI DUNG",
    codeSPSS: "S_Q6",
    question: "Lướt TopTop là lại thấy clip khoe nhà, khoe xe, chủ tịch flex sổ đỏ đập vào mặt 🚘",
    options: [
      { text: "1. Hoàn toàn không (Chê, lướt qua luôn 🙅‍♀️)", value: 1 },
      { text: "2. Không đồng ý (Ít lắm, FYP tui toàn hài 🤡)", value: 2 },
      { text: "3. Phân vân (50/50, hên xui 🤷)", value: 3 },
      { text: "4. Đồng ý (Dính hoài, lướt xíu là thấy 🥲)", value: 4 },
      { text: "5. Hoàn toàn đồng ý (Ám ảnh thực sự 💀)", value: 5 }
    ]
  },
  {
    id: "S2",
    dimension: "S",
    dimensionLabel: "TIÊU THỤ NỘI DUNG",
    codeSPSS: "S_Q7",
    question: "Cứ rảnh là tui lại ngồi coi mấy clip người ta khoe thành tựu tới quên cả lối về 🕰️",
    options: [
      { text: "1. Không hề (Đi coi Capybara sướng hơn 🦦)", value: 1 },
      { text: "2. Hiếm khi (Coi vài giây rồi lướt 🍃)", value: 2 },
      { text: "3. Phân vân (Tùy hứng hôm đó 🤔)", value: 3 },
      { text: "4. Đồng ý (Cũng hay ngồi coi cuốn phết 🤓)", value: 4 },
      { text: "5. Hoàn toàn đồng ý (Tốn bao nhiêu thanh xuân 📈)", value: 5 }
    ]
  },
  {
    id: "S3",
    dimension: "S",
    dimensionLabel: "TIÊU THỤ NỘI DUNG",
    codeSPSS: "S_Q8",
    question: "Việc coi video flex thành tựu giờ như thói quen khó bỏ khi xài mạng xã hội 📱",
    options: [
      { text: "1. Sai bét (Không rảnh 🛑)", value: 1 },
      { text: "2. Không đến mức đó 🙄", value: 2 },
      { text: "3. Phân vân 🫣", value: 3 },
      { text: "4. Đồng ý (Thành thói quen thật 😬)", value: 4 },
      { text: "5. Hoàn toàn đồng ý 😵‍💫", value: 5 }
    ]
  },
  {
    id: "S4",
    dimension: "S",
    dimensionLabel: "TIÊU THỤ NỘI DUNG",
    codeSPSS: "S_Q9",
    question: "Tui hay 'chủ động' gõ tìm mấy clip dạy làm giàu nhanh, bí kíp mua nhà tuổi 20 💸",
    options: [
      { text: "1. Hoàn toàn không 🙅‍♂️", value: 1 },
      { text: "2. Ít khi 🥱", value: 2 },
      { text: "3. Phân vân 🤫", value: 3 },
      { text: "4. Đồng ý ✍️", value: 4 },
      { text: "5. Hoàn toàn đồng ý 📂", value: 5 }
    ]
  },
  {
    id: "S5",
    dimension: "S",
    dimensionLabel: "TIÊU THỤ NỘI DUNG",
    codeSPSS: "S_Q10",
    question: "Lỡ coi 1 clip flex là thuật toán dắt tui coi liên tù tì cả chục clip nữa 🤖",
    options: [
      { text: "1. Không ⏩", value: 1 },
      { text: "2. Ít bị 🚫", value: 2 },
      { text: "3. Phân vân 🏃", value: 3 },
      { text: "4. Đồng ý 🌀", value: 4 },
      { text: "5. Hoàn toàn đồng ý 🤯", value: 5 }
    ]
  },
  {
    id: "S6",
    dimension: "S",
    dimensionLabel: "TIÊU THỤ NỘI DUNG",
    codeSPSS: "S_Q11",
    question: "Dành cả thanh xuân trên mạng chỉ để hóng hớt xem người ta thành đạt tới đâu rồi 🔭",
    options: [
      { text: "1. Không hề 🧘", value: 1 },
      { text: "2. Không rảnh 👂", value: 2 },
      { text: "3. Phân vân 🫣", value: 3 },
      { text: "4. Đồng ý 🕵️", value: 4 },
      { text: "5. Hoàn toàn đồng ý 📉", value: 5 }
    ]
  },

  // ==========================================
  // BIẾN O: FOMO (Câu 12 -> 17)
  // ==========================================
  {
    id: "O_FOMO_1",
    dimension: "O_FOMO",
    dimensionLabel: "HỘI CHỨNG FOMO",
    codeSPSS: "FOMO_Q12",
    question: "Tự nhiên thấy rén ngang vì sợ người ngoài kia đang trải nghiệm sung sướng hơn mình 😰",
    options: [
      { text: "1. Bình tâm như nước 🍵", value: 1 },
      { text: "2. Hơi chạnh lòng 🥺", value: 2 },
      { text: "3. Cảm xúc lẫn lộn 🙃", value: 3 },
      { text: "4. Sợ mình bị tụt hậu 😨", value: 4 },
      { text: "5. Áp lực vô dụng 😭", value: 5 }
    ]
  },
  {
    id: "O_FOMO_2",
    dimension: "O_FOMO",
    dimensionLabel: "HỘI CHỨNG FOMO",
    codeSPSS: "FOMO_Q13",
    question: "Thấy bạn bè đồng trang lứa flex thành tựu là tui bắt đầu hoảng, sợ bị bỏ lại 🏃‍♂️",
    options: [
      { text: "1. Chúc mừng chân thành 🥳", value: 1 },
      { text: "2. Hơi nhói 🤏", value: 2 },
      { text: "3. Nửa mừng nửa lo ⚖️", value: 3 },
      { text: "4. Hoảng thật sự 🌪️", value: 4 },
      { text: "5. Mất ngủ tủi thân 🌧️", value: 5 }
    ]
  },
  {
    id: "O_FOMO_3",
    dimension: "O_FOMO",
    dimensionLabel: "HỘI CHỨNG FOMO",
    codeSPSS: "FOMO_Q14",
    question: "Đôi lúc bồn chồn khi không biết tụi bạn đang làm gì, có lén thành công hơn mình không 🧐",
    options: [
      { text: "1. Không quan tâm 🕊️", value: 1 },
      { text: "2. Chả để ý 🙈", value: 2 },
      { text: "3. Lâu lâu nghĩ tới 🤔", value: 3 },
      { text: "4. Thường xuyên tò mò 🫣", value: 4 },
      { text: "5. Hay stalk bạn bè 🕵️‍♀️", value: 5 }
    ]
  },
  {
    id: "O_FOMO_4",
    dimension: "O_FOMO",
    dimensionLabel: "HỘI CHỨNG FOMO",
    codeSPSS: "FOMO_Q15",
    question: "Sợ tối cổ! Thấy ai bàn trend phát triển bản thân là tui cũng muốn đu theo 🏄",
    options: [
      { text: "1. Không hề 🛣️", value: 1 },
      { text: "2. Hiếm khi 🐢", value: 2 },
      { text: "3. Tùy trend 🤷", value: 3 },
      { text: "4. Rất sợ lỡ cơ hội 😥", value: 4 },
      { text: "5. Nhào vô bất chấp 🌪️", value: 5 }
    ]
  },
  {
    id: "O_FOMO_5",
    dimension: "O_FOMO",
    dimensionLabel: "HỘI CHỨNG FOMO",
    codeSPSS: "FOMO_Q16",
    question: "Có những đêm tự hỏi: 'Mình dành quá nhiều thời gian xem người ta thành công để làm gì?' 🌌",
    options: [
      { text: "1. Chưa từng ❌", value: 1 },
      { text: "2. Ít khi 🥱", value: 2 },
      { text: "3. Đôi khi 😲", value: 3 },
      { text: "4. Thường xuyên ⏳", value: 4 },
      { text: "5. Dằn vặt mỗi ngày 🥀", value: 5 }
    ]
  },
  {
    id: "O_FOMO_6",
    dimension: "O_FOMO",
    dimensionLabel: "HỘI CHỨNG FOMO",
    codeSPSS: "FOMO_Q17",
    question: "Miệng nói nghỉ ngơi chứ tay vẫn vô thức cầm điện thoại lướt hóng idol mạng 📱",
    options: [
      { text: "1. Ngủ là dẹp đt 🛌", value: 1 },
      { text: "2. Lâu lâu lướt 🥱", value: 2 },
      { text: "3. Phân vân 🤷", value: 3 },
      { text: "4. Khá đúng 📱", value: 4 },
      { text: "5. Lướt rớt đt vô mặt 🤕", value: 5 }
    ]
  },

  // ==========================================
  // BIẾN O: ÁP LỰC THÀNH ĐẠT (Câu 18 -> 23)
  // ==========================================
  {
    id: "O_PRESS_1",
    dimension: "O_PRESSURE",
    dimensionLabel: "ÁP LỰC THÀNH ĐẠT",
    codeSPSS: "PRESS_Q18",
    question: "Ám ảnh với deadline, thi cử, kiểm tra. Cứ nghĩ tới là tiền đình 😵",
    options: [
      { text: "1. Tới đâu hay tới đó 🐢", value: 1 },
      { text: "2. Hơi căng nhẹ 😅", value: 2 },
      { text: "3. Cũng tùy 🤔", value: 3 },
      { text: "4. Lo lắng stress 😥", value: 4 },
      { text: "5. Ám ảnh muốn nổ tung 💣", value: 5 }
    ]
  },
  {
    id: "O_PRESS_2",
    dimension: "O_PRESSURE",
    dimensionLabel: "ÁP LỰC THÀNH ĐẠT",
    codeSPSS: "PRESS_Q19",
    question: "Áp lực vô hình: Ra trường phát là phải có lương cao, mua nhà báo hiếu ba mẹ ngay 💼",
    options: [
      { text: "1. Chill đi 🍃", value: 1 },
      { text: "2. Không ép bản thân 😌", value: 2 },
      { text: "3. Nửa lo nửa không 🤔", value: 3 },
      { text: "4. Cũng căng thẳng 😥", value: 4 },
      { text: "5. Mất ngủ vì sợ 🧨", value: 5 }
    ]
  },
  {
    id: "O_PRESS_3",
    dimension: "O_PRESSURE",
    dimensionLabel: "ÁP LỰC THÀNH ĐẠT",
    codeSPSS: "PRESS_Q20",
    question: "Cảm giác gia đình xã hội toàn nhìn vô điểm số, lương lậu để đánh giá mình ⚖️",
    options: [
      { text: "1. Không hề ❤️", value: 1 },
      { text: "2. Chắc họ quan tâm 🙄", value: 2 },
      { text: "3. Đôi lúc 🤷", value: 3 },
      { text: "4. Cảm thấy bị đánh giá 😞", value: 4 },
      { text: "5. Nghẹt thở vì định kiến ⛓️", value: 5 }
    ]
  },
  {
    id: "O_PRESS_4",
    dimension: "O_PRESSURE",
    dimensionLabel: "ÁP LỰC THÀNH ĐẠT",
    codeSPSS: "PRESS_Q21",
    question: "Gia đình đặt kỳ vọng ngút ngàn, muốn mình phải xuất sắc là 'con nhà người ta' 🏆",
    options: [
      { text: "1. Ba mẹ thoải mái 🕊️", value: 1 },
      { text: "2. Vừa phải thôi 👌", value: 2 },
      { text: "3. Lúc này lúc kia ⚖️", value: 3 },
      { text: "4. Áp lực vì ba mẹ 😰", value: 4 },
      { text: "5. Kỳ vọng đè bẹp mình 🏔️", value: 5 }
    ]
  },
  {
    id: "O_PRESS_5",
    dimension: "O_PRESSURE",
    dimensionLabel: "ÁP LỰC THÀNH ĐẠT",
    codeSPSS: "PRESS_Q22",
    question: "Tự mình làm khó mình, đặt KPI 'tuổi trẻ thành công' cao chót vót 🧗",
    options: [
      { text: "1. Sống chill 🧘", value: 1 },
      { text: "2. Có mục tiêu linh hoạt 🎯", value: 2 },
      { text: "3. Tùy giai đoạn 🔄", value: 3 },
      { text: "4. Hay tự ép bản thân 🏋️", value: 4 },
      { text: "5. Bạo hành tinh thần bằng KPI 🪓", value: 5 }
    ]
  },
  {
    id: "O_PRESS_6",
    dimension: "O_PRESSURE",
    dimensionLabel: "ÁP LỰC THÀNH ĐẠT",
    codeSPSS: "PRESS_Q23",
    question: "Cực kỳ sợ làm sai, sợ người ta chê cười hoặc coi mình là 'đứa thất bại' 🤡",
    options: [
      { text: "1. Sai thì sửa 😎", value: 1 },
      { text: "2. Hơi ngại tí 😚", value: 2 },
      { text: "3. Tùy người 🤐", value: 3 },
      { text: "4. Rất sợ ánh nhìn 🫣", value: 4 },
      { text: "5. Ám ảnh sự hoàn hảo 😱", value: 5 }
    ]
  }
];

export function evaluateSurvey(answers) {
  const getDimensionStats = (dimPrefix) => {
    const questions = SURVEY_QUESTIONS.filter(q => q.dimension.startsWith(dimPrefix));
    let totalScore = 0;
    questions.forEach(q => {
      totalScore += (answers[q.id] || 1);
    });
    const maxPossible = questions.length * 5;
    const minPossible = questions.length * 1;
    const percentage = Math.round(((totalScore - minPossible) / (maxPossible - minPossible)) * 100);
    return {
      totalScore,
      percentage: Math.max(0, Math.min(100, percentage)),
      mean: Number((totalScore / questions.length).toFixed(2))
    };
  };

  const sStats = getDimensionStats("S");
  const fomoStats = getDimensionStats("O_FOMO");
  const pressureStats = getDimensionStats("O_PRESSURE");
  const rStats = {
    percentage: Math.round((fomoStats.percentage + pressureStats.percentage) / 2),
    mean: 3.5
  };

  let persona = {
    title: "Chuyên gia Healing",
    tagline: "Trà sữa, ngủ đủ giấc",
    description: "Lối sống cân bằng và biết đủ là kim chỉ nam của bạn."
  };

  if (fomoStats.percentage > 70) {
    persona = {
      title: "Chúa tể Overthinking",
      tagline: "Chuyên gia vẽ kịch bản",
      description: "Bạn liên tục so sánh bản thân và sợ bị bỏ lại phía sau."
    };
  } else if (sStats.percentage >= 70 && pressureStats.percentage < 45) {
    persona = {
      title: "Chiến thần Vô tri",
      tagline: "Lướt flex để cười",
      description: "Bạn đạt tới cảnh giới miễn nhiễm so sánh xã hội."
    };
  } else if (pressureStats.percentage >= 65) {
    persona = {
      title: "Nô lệ Cột sống",
      tagline: "Deadline đuổi sau lưng",
      description: "Áp lực thành đạt đang đè nặng lên bạn."
    };
  }

  return { sStats, fomoStats, pressureStats, rStats, persona };
}
