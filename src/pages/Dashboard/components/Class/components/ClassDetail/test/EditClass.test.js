// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { EditClass } from '@/pages/Dashboard/components/Class/components/ClassDetail/EditClass.jsx';
// import { classDetailController } from '@/core/services/ClassDetail/classDetailAPI.js';



// jest.mock('react-i18next', () => ({
//   useTranslation: () => ({ t: (key) => key }),
// }));

// jest.mock('@/core/services/ClassDetail/classDetailAPI.js', () => ({
//   classDetailController: {
//     editClass: jest.fn(),
//     getClassDetail: jest.fn(),
//   },
// }));

// describe('EditClass', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   const mockClassDetail = [{
//     id: '1',
//     className: 'Yoga Class',
//     classStatus: 'Planning',
//     classTime: '09:00 - 10:00',
//     location: ['FTown2', 'FTown1'],
//     trainer: ['Dinh Vu Quoc Trung', 'Ba Chu Heo', 'Hu Cheo Ba', 'Tap The Lop'],
//     admin: ['Admin1', 'Admin2'],
//     fsu: 'FSU1',
//   }];

//   it('renders correctly with the provided class detail', async () => {
//     const { getByLabelText } = render(
//       <EditClass
//         isOpen={true}
//         onClose={() => { }}
//         classDetail={mockClassDetail}
//         setClassDetail={() => { }}
//       />
//     );

//     expect(getByLabelText('class_name:')).toBeInTheDocument();
//     expect(getByLabelText('status:')).toBeInTheDocument();
//     expect(getByLabelText('class_time:')).toBeInTheDocument();
//     expect(getByLabelText('location:')).toBeInTheDocument();
//     expect(getByLabelText('trainer:')).toBeInTheDocument();
//     expect(getByLabelText('Admin:')).toBeInTheDocument();
//     expect(getByLabelText('FSU:')).toBeInTheDocument();
//   });

//   it('updates the class name correctly', async () => {
//     const { getByLabelText } = render(
//       <EditClass
//         isOpen={true}
//         onClose={() => { }}
//         classDetail={mockClassDetail}
//         setClassDetail={() => { }}
//       />
//     );

//     fireEvent.change(getByLabelText('class_name:'), { target: { value: 'New name' } });
//     expect(getByLabelText('class_name:')).toHaveValue('New name');

//     fireEvent.change(getByLabelText('class_time:'), { target: { value: '8:00 - 12:00' } });
//     expect(getByLabelText('class_time:')).toHaveValue('8:00 - 12:00');

//     fireEvent.change(getByLabelText('location:'), { target: { value: 'New location' } });
//     expect(getByLabelText('location:')).toHaveValue('New location');
//   });

//   test('submits the form', async () => {
//     const setClassDetailMock = jest.fn();
//     const onCloseMock = jest.fn();

//     const { getByText } = render(
//       <EditClass
//         isOpen={true}
//         onClose={onCloseMock}
//         classDetail={mockClassDetail}
//         setClassDetail={setClassDetailMock}
//       />
//     );

//     fireEvent.click(getByText('Save'));

//     // Wait for async operations to complete
//     await waitFor(() => {
      
//       expect(classDetailController.getClassDetail).toHaveBeenCalled();

//       expect(setClassDetailMock).toHaveBeenCalled();

//       expect(onCloseMock).toHaveBeenCalled();
//     });
//   });
// });
