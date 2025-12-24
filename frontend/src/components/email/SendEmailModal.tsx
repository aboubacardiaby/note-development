import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useSendEmail } from '../../hooks/useEmail';
import { DeliveryFormat } from '../../../../shared/types/email';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  documentTitle: string;
}

export const SendEmailModal: React.FC<SendEmailModalProps> = ({
  isOpen,
  onClose,
  documentId,
  documentTitle,
}) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [deliveryFormat, setDeliveryFormat] = useState<DeliveryFormat>('html-inline');
  const [senderName, setSenderName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sendEmailMutation = useSendEmail();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setSuccessMessage('');

    if (!validateEmail(recipientEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      const result = await sendEmailMutation.mutateAsync({
        documentId,
        recipientEmail,
        deliveryFormat,
        senderName: senderName || undefined,
      });

      if (result.success) {
        setSuccessMessage('Email sent successfully!');
        setTimeout(() => {
          onClose();
          // Reset form
          setRecipientEmail('');
          setDeliveryFormat('html-inline');
          setSenderName('');
          setSuccessMessage('');
        }, 2000);
      }
    } catch (error: any) {
      setEmailError(error.response?.data?.error || 'Failed to send email. Please try again.');
    }
  };

  const handleClose = () => {
    setRecipientEmail('');
    setDeliveryFormat('html-inline');
    setSenderName('');
    setEmailError('');
    setSuccessMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Send Document via Email">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-3">
            Recipient Email Address
          </label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="recipient@example.com"
            required
            className="w-full px-5 py-3 glass rounded-xl focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 border-none shadow-soft transition-all duration-200 hover:shadow-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-3">
            Delivery Format
          </label>
          <select
            value={deliveryFormat}
            onChange={(e) => setDeliveryFormat(e.target.value as DeliveryFormat)}
            className="w-full px-5 py-3 glass rounded-xl focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 border-none shadow-soft transition-all duration-200 cursor-pointer hover:shadow-md"
          >
            <option value="html-inline">HTML in Email Body</option>
            <option value="pdf-attachment">PDF Attachment</option>
            <option value="docx-attachment">DOCX Attachment</option>
            <option value="markdown-attachment">Markdown Attachment</option>
          </select>
          <p className="text-xs text-dark-500 mt-2">
            {deliveryFormat === 'html-inline'
              ? 'Formatted content will be displayed directly in the email'
              : `Document will be attached as ${deliveryFormat.split('-')[0].toUpperCase()} file`}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-3">
            Sender Name (Optional)
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-5 py-3 glass rounded-xl focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 border-none shadow-soft transition-all duration-200 hover:shadow-md"
          />
        </div>

        {emailError && (
          <div className="glass bg-red-50 bg-opacity-80 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-soft animate-fade-in">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{emailError}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="glass bg-green-50 bg-opacity-80 border border-green-300 text-green-700 px-6 py-4 rounded-xl shadow-soft animate-fade-in">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={handleClose}
            variant="secondary"
            className="flex-1"
            disabled={sendEmailMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={sendEmailMutation.isPending || !recipientEmail}
          >
            {sendEmailMutation.isPending ? (
              <>
                <div className="relative mx-auto w-4 h-4 inline-block mr-2">
                  <div className="absolute inset-0 rounded-full border-2 border-white border-opacity-30"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-t-white animate-spin"></div>
                </div>
                Sending...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-dark-500">
          <p>Sending: <span className="font-semibold text-dark-700">{documentTitle}</span></p>
        </div>
      </form>
    </Modal>
  );
};
