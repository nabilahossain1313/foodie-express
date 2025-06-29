import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Wallet, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { PaymentMethod, User } from '../../types';
import { paymentService } from '../../services/paymentService';
import { bangladeshPaymentMethods } from '../../data/bangladeshData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  user: User;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  orderId,
  user,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('bkash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'details' | 'processing' | 'success' | 'error'>('select');
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: '',
    pin: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const selectedPaymentMethod = bangladeshPaymentMethods.find(method => method.id === selectedMethod);
  const paymentFee = paymentService.getPaymentMethodFee(
    { type: selectedMethod } as PaymentMethod,
    amount
  );
  const totalAmount = amount + paymentFee;

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setPaymentStep('details');
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      const paymentRequest = {
        amount: totalAmount,
        currency: 'BDT',
        method: {
          id: selectedMethod,
          type: selectedMethod,
          verified: true
        } as PaymentMethod,
        orderId,
        customerInfo: {
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      };

      const response = await paymentService.processPayment(paymentRequest);

      if (response.success && response.transactionId) {
        setTransactionId(response.transactionId);
        setPaymentStep('success');
        onPaymentSuccess(response.transactionId);
      } else {
        setErrorMessage(response.error || 'Payment failed');
        setPaymentStep('error');
        onPaymentError(response.error || 'Payment failed');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Payment processing failed';
      setErrorMessage(errorMsg);
      setPaymentStep('error');
      onPaymentError(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentMethodSelection = () => (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
      
      <div className="space-y-3">
        {bangladeshPaymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handlePaymentMethodSelect(method.id)}
            className={`w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
              selectedMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{method.processingTime}</p>
                {method.fees > 0 && (
                  <p className="text-xs text-orange-600">+{method.fees}% fee</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">৳{amount.toLocaleString('en-BD')}</span>
        </div>
        {paymentFee > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Payment Fee:</span>
            <span className="font-medium">৳{paymentFee.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
          <span>Total:</span>
          <span>৳{totalAmount.toLocaleString('en-BD')}</span>
        </div>
      </div>
    </div>
  );

  const renderPaymentDetails = () => {
    if (selectedMethod === 'cash') {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash on Delivery</h3>
          <div className="text-center py-8">
            <DollarSign className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              You will pay ৳{totalAmount.toLocaleString('en-BD')} in cash when your order arrives.
            </p>
            <button
              onClick={handlePaymentSubmit}
              disabled={isProcessing}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Confirm Cash on Delivery
            </button>
          </div>
        </div>
      );
    }

    if (['bkash', 'nagad', 'rocket', 'upay'].includes(selectedMethod)) {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pay with {selectedPaymentMethod?.name}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={paymentDetails.accountNumber}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                placeholder="01XXXXXXXXX"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PIN
              </label>
              <input
                type="password"
                value={paymentDetails.pin}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, pin: e.target.value }))}
                placeholder="Enter your PIN"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Instructions:</strong>
              </p>
              <ol className="text-sm text-blue-700 mt-2 space-y-1">
                <li>1. Enter your {selectedPaymentMethod?.name} mobile number</li>
                <li>2. Enter your PIN</li>
                <li>3. You'll receive an OTP to confirm the payment</li>
              </ol>
            </div>

            <button
              onClick={handlePaymentSubmit}
              disabled={isProcessing || !paymentDetails.accountNumber || !paymentDetails.pin}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ৳{totalAmount.toLocaleString('en-BD')}
            </button>
          </div>
        </div>
      );
    }

    if (selectedMethod === 'card') {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit/Debit Card</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={paymentDetails.cardholderName}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                placeholder="Enter cardholder name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="password"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <button
              onClick={handlePaymentSubmit}
              disabled={isProcessing || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ৳{totalAmount.toLocaleString('en-BD')}
            </button>
          </div>
        </div>
      );
    }

    if (selectedMethod === 'gpay') {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Google Pay</h3>
          <div className="text-center py-8">
            <Wallet className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              You'll be redirected to Google Pay to complete your payment of ৳{totalAmount.toLocaleString('en-BD')}.
            </p>
            <button
              onClick={handlePaymentSubmit}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue with Google Pay
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderProcessing = () => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
      <p className="text-gray-600">Please wait while we process your payment...</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-4">
        Your payment of ৳{totalAmount.toLocaleString('en-BD')} has been processed successfully.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600">Transaction ID:</p>
        <p className="font-mono text-sm font-semibold text-gray-900">{transactionId}</p>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        Continue
      </button>
    </div>
  );

  const renderError = () => (
    <div className="text-center py-8">
      <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Failed</h3>
      <p className="text-gray-600 mb-6">{errorMessage}</p>
      <div className="space-y-3">
        <button
          onClick={() => setPaymentStep('select')}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {paymentStep === 'select' && renderPaymentMethodSelection()}
          {paymentStep === 'details' && renderPaymentDetails()}
          {paymentStep === 'processing' && renderProcessing()}
          {paymentStep === 'success' && renderSuccess()}
          {paymentStep === 'error' && renderError()}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;