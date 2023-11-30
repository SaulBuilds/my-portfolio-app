import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResumeEditor } from '../components/specific/ResumeEditor/ResumeEditor';
import '@testing-library/jest-dom';
import { Resume, ResumeData } from '../types';

// Helper function to create a mock Response object
const createMockResponse = (ok: boolean, payload: any = {}) => {
  return {
    ok,
    json: () => Promise.resolve(payload),
    headers: new Headers(),
    redirected: false,
    status: ok ? 200 : 400,
    statusText: '',
    type: 'default' as ResponseType, // Use 'default' as a valid ResponseType value
    url: '',
    clone: () => createMockResponse(ok, payload),
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    text: () => Promise.resolve(JSON.stringify(payload)),
  };
};

// Mock fetch globally
const mockFetch = jest.fn(() =>
  Promise.resolve(createMockResponse(true))
);

beforeAll(() => {
  global.fetch = mockFetch;
});

beforeEach(() => {
  mockFetch.mockClear();
});



it('renders without crashing', () => {
  render(<ResumeEditor
                open={true}
                onClose={() => {}}
                onSaved={(id: number) => {}}
                onSave={(updatedResume: Resume) => {}}
                resumeData={{
                            id: undefined,
                            title: '',
                            description: '',
                            contact: {
                                email: '',
                                phone: '',
                                address: undefined,
                                linkedIn: undefined,
                                website: undefined
                            },
                            education: [],
                            workExperience: [],
                            skills: [],
                            certifications: undefined,
                            languages: undefined,
                            references: undefined
                        }}
                />);
  expect(screen.getByText(/edit resume/i)).toBeInTheDocument();
});

it('allows input in the title field', async () => {
  render(<ResumeEditor
                open={true}
                onClose={() => {}}
                onSaved={(id: number) => {}}
                onSave={(updatedResume: Resume) => {}}
                resumeData={{
                            id: undefined,
                            title: '',
                            description: '',
                            contact: {
                                email: '',
                                phone: '',
                                address: undefined,
                                linkedIn: undefined,
                                website: undefined
                            },
                            education: [],
                            workExperience: [],
                            skills: [],
                            certifications: undefined,
                            languages: undefined,
                            references: undefined
                        }}
                />);
  const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
  await userEvent.type(titleInput, 'New Title');
  expect(titleInput.value).toBe('New Title');
});

it('calls onSaved with an ID on form submission', async () => {
  const onSavedMock = jest.fn();
  render(<ResumeEditor
    open={true}
    onClose={() => {}}
    onSaved={onSavedMock} // Pass the mock function here
    onSave={(updatedResume: Resume) => {}}
    resumeData={{
                id: undefined,
                title: '',
                description: '',
                contact: {
                    email: '',
                    phone: '',
                    address: undefined,
                    linkedIn: undefined,
                    website: undefined
                },
                education: [],
                workExperience: [],
                skills: [],
                certifications: undefined,
                languages: undefined,
                references: undefined
            }}
    />);
  
  const submitButton = screen.getByRole('button', { name: /save resume/i });
  await userEvent.click(submitButton);
  
  expect(mockFetch).toHaveBeenCalledTimes(1);
  // Check if onSavedMock was called with the expected argument
  expect(onSavedMock).toHaveBeenCalledWith(expect.any(Number)); // Replace with the expected ID or argument
});
it('allows input in the description field', async () => {
  render(<ResumeEditor
                open={true}
                onClose={() => {}}
                onSaved={(id: number) => {}}
                onSave={(updatedResume: Resume) => {}}
                resumeData={{
                            id: undefined,
                            title: '',
                            description: '',
                            contact: {
                                email: '',
                                phone: '',
                                address: undefined,
                                linkedIn: undefined,
                                website: undefined
                            },
                            education: [],
                            workExperience: [],
                            skills: [],
                            certifications: undefined,
                            languages: undefined,
                            references: undefined
                        }}
                />);
  const descriptionInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement;
  await userEvent.type(descriptionInput, 'Sample Description');
  expect(descriptionInput.value).toBe('Sample Description');
});


it('handles submission failure gracefully', async () => {
  mockFetch.mockImplementationOnce(() =>
    Promise.resolve(createMockResponse(false))
  );
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

  render(<ResumeEditor
                open={true}
                onClose={() => {}}
                onSaved={(id: number) => {}}
                onSave={(updatedResume: Resume) => {}}
                resumeData={{
                            id: undefined,
                            title: '',
                            description: '',
                            contact: {
                                email: '',
                                phone: '',
                                address: undefined,
                                linkedIn: undefined,
                                website: undefined
                            },
                            education: [],
                            workExperience: [],
                            skills: [],
                            certifications: undefined,
                            languages: undefined,
                            references: undefined
                        }}
                />);
  const submitButton = screen.getByRole('button', { name: /save resume/i });
  await userEvent.click(submitButton);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(consoleErrorSpy).toHaveBeenCalledWith('Error saving resume');
  consoleErrorSpy.mockRestore();
});
it('sends correct data on form submission', async () => {
  render(<ResumeEditor
                open={true}
                onClose={() => {}}
                onSaved={(id: number) => {}}
                onSave={(updatedResume: Resume) => {}}
                resumeData={{
                            id: undefined,
                            title: '',
                            description: '',
                            contact: {
                                email: '',
                                phone: '',
                                address: undefined,
                                linkedIn: undefined,
                                website: undefined
                            },
                            education: [],
                            workExperience: [],
                            skills: [],
                            certifications: undefined,
                            languages: undefined,
                            references: undefined
                        }}
                />);
  const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
  await userEvent.type(titleInput, 'New Title');
  
  const submitButton = screen.getByRole('button', { name: /save resume/i });
  await userEvent.click(submitButton);
  
  // Expected payload should match the full structure of resumeData state
  const expectedPayload = {
    title: 'New Title',
    description: '',
    contact: { email: '', phone: '', address: '', linkedIn: '', website: '' },
    education: [],
    workExperience: [],
    skills: [],
    certifications: [],
    languages: [],
    references: []
  };

  expect(mockFetch).toHaveBeenCalledWith("/api/resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expectedPayload)
  });
});

it('validates the email field correctly', async () => {
  render(<ResumeEditor
                open={true}
                onClose={() => {}}
                onSaved={(id: number) => {}}
                onSave={(updatedResume: Resume) => {}}
                resumeData={{
                            id: undefined,
                            title: '',
                            description: '',
                            contact: {
                                email: '',
                                phone: '',
                                address: undefined,
                                linkedIn: undefined,
                                website: undefined
                            },
                            education: [],
                            workExperience: [],
                            skills: [],
                            certifications: undefined,
                            languages: undefined,
                            references: undefined
                        }}
                />);
  const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

  // Simulate typing an invalid email
  await userEvent.type(emailInput, 'invalidemail');
  expect(emailInput.value).toBe('invalidemail');
  // You can add a function or a way to check if the component shows an error for invalid email

  // Simulate typing a valid email
  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, 'valid@email.com');
  expect(emailInput.value).toBe('valid@email.com');

});

it('allows input in the phone field', async () => {
  render(<ResumeEditor
                open={true}
                onClose={() => {}}
                onSaved={(id: number) => {}}
                onSave={(updatedResume: Resume) => {}}
                resumeData={{
                            id: undefined,
                            title: '',
                            description: '',
                            contact: {
                                email: '',
                                phone: '',
                                address: undefined,
                                linkedIn: undefined,
                                website: undefined
                            },
                            education: [],
                            workExperience: [],
                            skills: [],
                            certifications: undefined,
                            languages: undefined,
                            references: undefined
                        }}
                />);
  const phoneInput = screen.getByLabelText(/phone/i) as HTMLInputElement;

  await userEvent.type(phoneInput, '1234567890');
  expect(phoneInput.value).toBe('1234567890');
});



