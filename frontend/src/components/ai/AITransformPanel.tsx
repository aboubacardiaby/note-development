import { useState } from 'react';
import { Template } from '../../../../shared/types/template';
import { useAITransformStreaming } from '../../hooks/useAITransform';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { exportService } from '../../services/exportService';
import { SendEmailModal } from '../email/SendEmailModal';

interface AITransformPanelProps {
  noteId: string;
  noteContent: string;
  templates: Template[];
  onClose: () => void;
}

export const AITransformPanel: React.FC<AITransformPanelProps> = ({
  noteId,
  noteContent,
  templates,
  onClose,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { streamedContent, isStreaming, error, documentId, startStreaming, reset } =
    useAITransformStreaming();

  const handleTransform = async () => {
    if (!selectedTemplateId) {
      alert('Please select a template');
      return;
    }

    reset();
    await startStreaming({
      noteId,
      templateId: selectedTemplateId,
    });
  };

  const handleExport = (format: 'pdf' | 'docx' | 'markdown' | 'html') => {
    if (documentId) {
      exportService.downloadDocument(documentId, format);
    }
  };

  // Debug logging
  console.log('AITransformPanel - documentId:', documentId);
  console.log('AITransformPanel - streamedContent exists:', !!streamedContent);

  return (
    <Modal isOpen={true} onClose={onClose} title="Transform Note with AI">
      <div className="space-y-6">
        {!isStreaming && !streamedContent && (
          <>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-3">
                Select Template
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full px-5 py-3 glass rounded-xl focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 border-none shadow-soft transition-all duration-200 cursor-pointer hover:shadow-md"
              >
                <option value="">Choose a template...</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name} - {template.category}
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={handleTransform} className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Transform Note
            </Button>
          </>
        )}

        {isStreaming && (
          <div className="text-center py-8 animate-fade-in">
            <div className="relative mx-auto mb-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-primary-600 animate-spin"></div>
            </div>
            <p className="text-dark-700 text-lg font-medium">AI is transforming your note...</p>
            <p className="text-dark-500 text-sm mt-2">This may take a few moments</p>
          </div>
        )}

        {error && (
          <div className="glass bg-red-50 bg-opacity-80 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-soft animate-fade-in">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {streamedContent && (
          <div className="animate-fade-in-up">
            <h3 className="font-semibold text-lg text-dark-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Transformed Document
            </h3>
            <div className="glass p-6 rounded-xl shadow-inner-soft border border-dark-100 max-h-96 overflow-y-auto">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: streamedContent }}
              />
            </div>

            {documentId && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-dark-700 mb-3">Export Document</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button onClick={() => handleExport('pdf')} size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    PDF
                  </Button>
                  <Button onClick={() => handleExport('docx')} size="sm" variant="secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    DOCX
                  </Button>
                  <Button onClick={() => handleExport('markdown')} size="sm" variant="secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    MD
                  </Button>
                  <Button onClick={() => handleExport('html')} size="sm" variant="secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    HTML
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-dark-100">
                  <p className="text-sm font-semibold text-dark-700 mb-3">Share Document</p>
                  <Button
                    onClick={() => setShowEmailModal(true)}
                    size="sm"
                    variant="primary"
                    className="w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send via Email
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showEmailModal && documentId && (
        <SendEmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          documentId={documentId}
          documentTitle="Transformed Document"
        />
      )}
    </Modal>
  );
};
