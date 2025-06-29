import { PaymentMethod } from '../types';

interface PaymentRequest {
  amount: number;
  currency: string;
  method: PaymentMethod;
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}

class PaymentService {
  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      switch (request.method.type) {
        case 'bkash':
          return this.processBkashPayment(request);
        case 'nagad':
          return this.processNagadPayment(request);
        case 'rocket':
          return this.processRocketPayment(request);
        case 'upay':
          return this.processUpayPayment(request);
        case 'gpay':
          return this.processGooglePayPayment(request);
        case 'card':
          return this.processCardPayment(request);
        case 'cash':
          return this.processCashPayment(request);
        default:
          throw new Error('Unsupported payment method');
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed'
      };
    }
  }

  private async processBkashPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate bKash payment processing
    await this.delay(2000);
    
    // In real implementation, integrate with bKash API
    const success = Math.random() > 0.1; // 90% success rate for demo
    
    if (success) {
      return {
        success: true,
        transactionId: `BKS${Date.now()}${Math.floor(Math.random() * 1000)}`
      };
    } else {
      return {
        success: false,
        error: 'bKash payment failed. Please try again.'
      };
    }
  }

  private async processNagadPayment(request: PaymentRequest): Promise<PaymentResponse> {
    await this.delay(1800);
    
    const success = Math.random() > 0.1;
    
    if (success) {
      return {
        success: true,
        transactionId: `NGD${Date.now()}${Math.floor(Math.random() * 1000)}`
      };
    } else {
      return {
        success: false,
        error: 'Nagad payment failed. Please check your account balance.'
      };
    }
  }

  private async processRocketPayment(request: PaymentRequest): Promise<PaymentResponse> {
    await this.delay(2200);
    
    const success = Math.random() > 0.1;
    
    if (success) {
      return {
        success: true,
        transactionId: `RKT${Date.now()}${Math.floor(Math.random() * 1000)}`
      };
    } else {
      return {
        success: false,
        error: 'Rocket payment failed. Please verify your PIN.'
      };
    }
  }

  private async processUpayPayment(request: PaymentRequest): Promise<PaymentResponse> {
    await this.delay(1900);
    
    const success = Math.random() > 0.1;
    
    if (success) {
      return {
        success: true,
        transactionId: `UPY${Date.now()}${Math.floor(Math.random() * 1000)}`
      };
    } else {
      return {
        success: false,
        error: 'Upay payment failed. Please try again.'
      };
    }
  }

  private async processGooglePayPayment(request: PaymentRequest): Promise<PaymentResponse> {
    await this.delay(1500);
    
    const success = Math.random() > 0.05; // 95% success rate
    
    if (success) {
      return {
        success: true,
        transactionId: `GPY${Date.now()}${Math.floor(Math.random() * 1000)}`
      };
    } else {
      return {
        success: false,
        error: 'Google Pay payment failed. Please check your payment method.'
      };
    }
  }

  private async processCardPayment(request: PaymentRequest): Promise<PaymentResponse> {
    await this.delay(2500);
    
    const success = Math.random() > 0.08; // 92% success rate
    
    if (success) {
      return {
        success: true,
        transactionId: `CRD${Date.now()}${Math.floor(Math.random() * 1000)}`
      };
    } else {
      return {
        success: false,
        error: 'Card payment failed. Please check your card details.'
      };
    }
  }

  private async processCashPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Cash on delivery always succeeds
    return {
      success: true,
      transactionId: `COD${Date.now()}${Math.floor(Math.random() * 1000)}`
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getPaymentMethodFee(method: PaymentMethod, amount: number): number {
    switch (method.type) {
      case 'card':
        return amount * 0.025; // 2.5% for cards
      case 'bkash':
      case 'nagad':
      case 'rocket':
      case 'upay':
      case 'gpay':
      case 'cash':
      default:
        return 0;
    }
  }

  formatCurrency(amount: number, currency: string = 'BDT'): string {
    if (currency === 'BDT') {
      return `৳${amount.toLocaleString('en-BD')}`;
    }
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export const paymentService = new PaymentService();