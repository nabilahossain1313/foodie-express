import React from 'react';
import { Check, Clock, ChefHat, Truck, MapPin } from 'lucide-react';
import { Order } from '../../types';

interface OrderTrackingProps {
  order: Order;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  const steps = [
    { key: 'placed', label: 'Order Placed', icon: Check, time: order.trackingInfo.orderPlaced },
    { key: 'confirmed', label: 'Confirmed', icon: Check, time: order.trackingInfo.confirmed },
    { key: 'preparing', label: 'Preparing', icon: ChefHat, time: order.trackingInfo.preparing },
    { key: 'ready', label: 'Ready for Pickup', icon: Clock, time: order.trackingInfo.ready },
    { key: 'picked-up', label: 'Picked Up', icon: Truck, time: order.trackingInfo.pickedUp },
    { key: 'delivered', label: 'Delivered', icon: MapPin, time: order.trackingInfo.delivered }
  ];

  const getStepStatus = (stepKey: string) => {
    const statusOrder = ['placed', 'confirmed', 'preparing', 'ready', 'picked-up', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(stepKey);
    
    if (stepIndex <= currentIndex) return 'completed';
    if (stepIndex === currentIndex + 1) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Tracking</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Order #{order.id}</p>
          <p className="text-sm text-gray-500">ETA: {order.estimatedDeliveryTime}</p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.key);
          const Icon = step.icon;
          
          return (
            <div key={step.key} className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    status === 'completed'
                      ? 'bg-green-500 text-white'
                      : status === 'current'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mt-2 ${
                      status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p
                    className={`font-medium ${
                      status === 'completed' || status === 'current'
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.time && (
                    <p className="text-sm text-gray-500">{step.time}</p>
                  )}
                </div>
                {status === 'current' && (
                  <p className="text-sm text-orange-600 mt-1">In progress...</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Delivery Details</h3>
        <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Total: ${order.totalAmount.toFixed(2)}</span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
            order.status === 'picked-up' ? 'bg-blue-100 text-blue-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;