import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PopupModal } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/PopupModal';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('PopupModal', () => {
  it('renders the import button', () => {
    render(
      <MemoryRouter>
        <ChakraProvider>
          <PopupModal isAccessible={true} />
        </ChakraProvider>
      </MemoryRouter>
    );

    const importButton = screen.getByLabelText('Import Button');
    expect(importButton).toBeInTheDocument();
  });

  it('opens the modal when import button is clicked', () => {
    render(
      <MemoryRouter>
        <ChakraProvider>
          <PopupModal isAccessible={true} />
        </ChakraProvider>
      </MemoryRouter>
    );

    const importButton = screen.getByLabelText('Import Button');
    fireEvent.click(importButton);

    const modalTitle = screen.getByText('Import Syllabus');
    expect(modalTitle).toBeInTheDocument();
  });

  it('selects a file when "Select" button is clicked', () => {
    render(
      <MemoryRouter>
        <ChakraProvider>
          <PopupModal isAccessible={true} />
        </ChakraProvider>
      </MemoryRouter>
    );

    const selectButton = screen.getByText('Select');
    fireEvent.click(selectButton);

    // Here you can simulate selecting a file using userEvent or fireEvent
  });

  it('submits the form when "Import" button is clicked', () => {
    render(
      <MemoryRouter>
        <ChakraProvider>
          <PopupModal isAccessible={true} />
        </ChakraProvider>
      </MemoryRouter>
    );

    const importButton = screen.getByText('Import');
    fireEvent.click(importButton);

    // Mock necessary functions and elements to test form submission
    // For example, you can mock handleFileChange, setSelectedFile, and syllabusController.importSyllabusFile
    // Then, simulate filling out the form and clicking the "Import" button to test its functionality
  });
});
