import Papa from 'papaparse';
import { SURVEY_QUESTIONS } from '../data/surveyQuestions';

/**
 * Xuất dữ liệu nghiên cứu định lượng ra file .CSV chuẩn SPSS
 * @param {Array} historyData - Danh sách câu trả lời của các đối tượng khảo sát
 * @param {Object} currentAnswers - Câu trả lời của phiên hiện tại (nếu chưa lưu vào history)
 * @param {Object} currentResults - Kết quả phân tích chỉ số & Persona
 */
export function exportToCSV(historyData = [], currentAnswers = {}, currentResults = null) {
  // Chuẩn bị hàng dữ liệu cho phiên khảo sát hiện tại
  const respondents = [...historyData];

  // Nếu có dữ liệu phiên hiện tại và chưa nằm trong history, thêm vào để export
  if (Object.keys(currentAnswers).length > 0 && currentResults) {
    const respondentRow = {
      Respondent_ID: `RESP_${Date.now().toString().slice(-6)}`,
      Timestamp: new Date().toISOString(),
    };

    // Ánh xạ từng câu hỏi theo mã SPSS
    SURVEY_QUESTIONS.forEach(q => {
      respondentRow[q.codeSPSS] = currentAnswers[q.id] || null;
    });

    // Thêm các biến tổng hợp và biến chuẩn hóa (Composite Variables)
    respondentRow['S_Total_Mean'] = currentResults.sStats?.mean || 0;
    respondentRow['O_FOMO_Mean'] = currentResults.fomoStats?.mean || 0;
    respondentRow['O_Pressure_Mean'] = currentResults.pressureStats?.mean || 0;
    respondentRow['R_Overthinking_Mean'] = currentResults.rStats?.mean || 0;
    
    respondentRow['S_Percentage'] = currentResults.sStats?.percentage || 0;
    respondentRow['O_FOMO_Percentage'] = currentResults.fomoStats?.percentage || 0;
    respondentRow['O_Pressure_Percentage'] = currentResults.pressureStats?.percentage || 0;
    respondentRow['R_Percentage'] = currentResults.rStats?.percentage || 0;
    
    respondentRow['Persona_Classified'] = currentResults.persona?.title || 'Unknown';

    respondents.push(respondentRow);
  }

  // Nếu không có dữ liệu nào, tạo ít nhất 1 dòng dữ liệu mẫu chuẩn SPSS
  if (respondents.length === 0) {
    const sampleRow = {
      Respondent_ID: 'RESP_SAMPLE01',
      Timestamp: new Date().toISOString(),
      S_flex_clip: 4,
      S_hustle_culture: 5,
      S_peer_flex: 3,
      S_Total_Mean: 4.0,
      O_fomo_income: 5,
      O_fomo_trend: 4,
      O_FOMO_Mean: 4.5,
      O_pressure_age25: 4,
      O_guilt_rest: 5,
      O_Pressure_Mean: 4.5,
      R_overthinking_night: 5,
      R_Overthinking_Mean: 5.0,
      S_Percentage: 75,
      O_FOMO_Percentage: 88,
      O_Pressure_Percentage: 88,
      R_Percentage: 100,
      Persona_Classified: 'Chúa tể Overthinking'
    };
    respondents.push(sampleRow);
  }

  // Chuyển đổi sang CSV bằng PapaParse
  const csvContent = Papa.unparse(respondents, {
    quotes: true,
    header: true,
    delimiter: ","
  });

  // Tạo blob và kích hoạt download
  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `du_lieu_nghien_cuu_sor_tiktok_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
