import { render, screen } from '@testing-library/react';
import { SyllabusCreate } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/index.jsx';

describe('Outline Component', () => {
  test('renders the component', () => {
    render(<SyllabusCreate />);
    expect(screen.getByText('Add Day')).toBeTruthy();
  });

  // describe('SyllabusCreate', () => {
  //   test('renders SyllabusCreate component', () => {
  //     render(<SyllabusCreate />);
  //     // Kiểm tra xem SyllabusCreate component đã được render thành công hay chưa
  //     const syllabusCreateElement = screen.getByText('syllabus');
  //     expect(syllabusCreateElement).toBeInTheDocument();
  //   });

  //   test('handles syllabus name change', () => {
  //     render(<SyllabusCreate />);
  //     // Kiểm tra xem giá trị ban đầu của syllabusName có rỗng hay không
  //     const syllabusNameInput = screen.getByLabelText('syllabus_name');
  //     expect(syllabusNameInput.value).toBe('');

  //     // Mô phỏng sự kiện thay đổi giá trị của input
  //     fireEvent.change(syllabusNameInput, { target: { value: 'New Syllabus' } });

  //     // Kiểm tra xem giá trị của syllabusName đã được thay đổi hay chưa
  //     expect(syllabusNameInput.value).toBe('New Syllabus');
  //   });

  //   test('handles submit form', async () => {
  //     render(<SyllabusCreate />);
  //     // Mô phỏng việc nhấn nút "Next" để gửi form
  //     const nextButton = screen.getByText('next');
  //     fireEvent.click(nextButton);

  //     // Kiểm tra xem hàm handleSubmit đã được gọi hay chưa
  //     // Để kiểm tra thành công, bạn cần mock hàm createSyllabusAPI và xác định kết quả trả về từ nó
  //     // Ví dụ: jest.mock('./createSyllabusAPI', () => jest.fn(() => Promise.resolve({ success: true })));
  //     // Sau đó, bạn có thể kiểm tra xem kết quả đã được xử lý chính xác hay không
  //   });
});
