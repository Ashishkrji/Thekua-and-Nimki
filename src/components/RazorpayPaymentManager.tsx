import React, { useState, useEffect } from 'react';
import { 
  X, CreditCard, QrCode, Landmark, ShieldCheck, 
  Clock, AlertTriangle, Loader2, CheckCircle2, Lock, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RazorpayPaymentManagerProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currencySymbol?: string;
  onSuccess: (transactionId: string) => void;
  onFailure: (errorMessage: string) => void;
}

export default function RazorpayPaymentManager({
  isOpen,
  onClose,
  amount,
  currencySymbol = '₹',
  onSuccess,
  onFailure
}: RazorpayPaymentManagerProps) {
  const [rzpTab, setRzpTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [rzpStatus, setRzpStatus] = useState<'idle' | 'processing' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [qrCountdown, setQrCountdown] = useState(300); // 5 minutes standard count

  // Manual payment state values
  const [upiId, setUpiId] = useState('maati@okhdfcbank');
  const [cardNo, setCardNo] = useState('4111 1111 1111 1111');
  const [cardExp, setCardExp] = useState('12/30');
  const [cardCvv, setCardCvv] = useState('123');
  const [selectedBank, setSelectedBank] = useState('SBI');

  // Trigger countdown when open
  useEffect(() => {
    if (!isOpen || qrCountdown <= 0) return;
    const interval = setInterval(() => {
      setQrCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, qrCountdown]);

  // Handle failure simulation triggers
  const triggerSimulationFailure = (reason: string) => {
    setRzpStatus('processing');
    setTimeout(() => {
      setRzpStatus('error');
      setErrorMessage(reason);
      onFailure(reason);
    }, 1200);
  };

  // Handle success simulation triggers
  const triggerSimulationSuccess = (methodType: 'upi' | 'card' | 'net') => {
    setRzpStatus('processing');
    const paymentId = `pay_rzp_${methodType}_${Math.floor(100000000 + Math.random() * 900000000)}`;
    
    setTimeout(() => {
      setRzpStatus('success');
      setTimeout(() => {
        onSuccess(paymentId);
        onClose();
      }, 1000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.35, damping: 20 }}
        className="bg-[#111624] text-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-800 overflow-hidden font-sans text-left"
      >
        {/* Ribbon Header decoration */}
        <div className="bg-[#1a2138] px-4 py-3.5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="bg-blue-600 p-1.5 rounded-lg">
              <CreditCard className="w-4 h-4 text-white" />
            </span>
            <div>
              <h3 className="text-xs font-black uppercase text-slate-200 tracking-wider">Razorpay Secure Sandbox</h3>
              <p className="text-[10px] text-slate-450 font-mono leading-none mt-0.5">Integration: Maati Traditional Stores</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount bar */}
        <div className="bg-[#1a2442] py-4 px-5 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Amount to Pay</p>
            <p className="text-2xl font-black text-white font-mono">{currencySymbol}{amount}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="bg-amber-500/10 text-amber-500 text-[9px] font-extrabold px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/20 uppercase tracking-widest font-mono">
              Demo Sandbox
            </span>
            <span className="text-[9px] text-slate-450 mt-1">Real callbacks active</span>
          </div>
        </div>

        {/* Body Container */}
        <div className="p-5">
          {rzpStatus === 'idle' && (
            <div className="space-y-4">
              {/* Payment Tabs Selection */}
              <div className="flex border-b border-slate-800 pb-1.5 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => setRzpTab('upi')}
                  className={`flex-1 pb-1.5 font-bold transition-all border-b-2 flex justify-center items-center gap-1.5 cursor-pointer ${
                    rzpTab === 'upi' ? 'text-blue-500 border-blue-500 font-extrabold' : 'border-transparent hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI Payment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRzpTab('card')}
                  className={`flex-1 pb-1.5 font-bold transition-all border-b-2 flex justify-center items-center gap-1.5 cursor-pointer ${
                    rzpTab === 'card' ? 'text-blue-500 border-blue-500 font-extrabold' : 'border-transparent hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Debit/Credit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRzpTab('netbanking')}
                  className={`flex-1 pb-1.5 font-bold transition-all border-b-2 flex justify-center items-center gap-1.5 cursor-pointer ${
                    rzpTab === 'netbanking' ? 'text-blue-500 border-blue-500 font-extrabold' : 'border-transparent hover:text-white'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>Netbanking</span>
                </button>
              </div>

              {/* UPI Tab View */}
              {rzpTab === 'upi' && (
                <div className="space-y-4">
                  <div className="bg-[#182137] p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-extrabold text-slate-100 uppercase tracking-wider">Dynamic UPI QR Code</p>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Open Google Pay, PhonePe, Bhim UPI, or Paytm App to scan code.
                      </p>
                    </div>
                    {/* Retro Mock QR */}
                    <div className="bg-white p-1 rounded-lg border border-slate-350 shrink-0">
                      <div className="w-12 h-12 bg-slate-100 flex flex-wrap items-center justify-center p-0.5 relative text-[4px] leading-[4px] text-black overflow-hidden font-mono select-none">
                        ▞▚▚▞▚▞▚▞<br/>
                        ▚▞▚▞▚▞▚▞▚<br/>
                        ▞▚▚▞▚▞▚▞<br/>
                        ▚▞▚▞▚▞▚▞▚<br/>
                        ▞▚▚▞▚▞▚▞<br/>
                        <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* QR Valid Countdown */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      QR Code valid for:
                    </span>
                    <strong className="text-slate-100">
                      {Math.floor(qrCountdown / 60)}:{(qrCountdown % 60).toString().padStart(2, '0')}
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-450 uppercase block">Virtual Payment Address (VPA)</label>
                    <input 
                      type="text" 
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full text-xs p-2 bg-[#172036] border border-slate-800 rounded font-mono text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Simulator buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => triggerSimulationFailure('Payment timeout via UPI gateway node')}
                      className="py-2 px-3 bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer"
                    >
                      Simulate Failure
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerSimulationSuccess('upi')}
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer"
                    >
                      Accept payment
                    </button>
                  </div>
                </div>
              )}

              {/* Card Tab View */}
              {rzpTab === 'card' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block">Debit/Credit Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={cardNo}
                        onChange={e => setCardNo(e.target.value)}
                        placeholder="4111 1111 1111 1111"
                        className="w-full text-xs p-2 pl-8 bg-[#172036] border border-slate-800 rounded font-mono text-white focus:outline-none focus:border-blue-500"
                      />
                      <span className="absolute left-2.5 top-2.5">
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase block">Expiry Date</label>
                      <input 
                        type="text" 
                        value={cardExp}
                        onChange={e => setCardExp(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full text-xs p-2 bg-[#172036] border border-slate-800 rounded font-mono text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase block">CVV</label>
                      <input 
                        type="password" 
                        maxLength={3}
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full text-xs p-2 bg-[#172036] border border-slate-800 rounded font-mono text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Simulators */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => triggerSimulationFailure('Bank card authentication declined (OTP Wrong)')}
                      className="py-1.5 bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer"
                    >
                      Decline card
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerSimulationSuccess('card')}
                      className="py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3 h-3 text-blue-200" />
                      <span>Process Card</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Netbanking Tab View */}
              {rzpTab === 'netbanking' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-400">Select any bank from sandbox partner registry:</p>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    {['SBI', 'HDFC', 'ICICI', 'Axis'].map(bank => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2 rounded-lg border text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          selectedBank === bank 
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-extrabold' 
                            : 'border-slate-800 hover:border-slate-700 bg-[#16213a]'
                        }`}
                      >
                        <Landmark className="w-3.5 h-3.5 text-slate-450" />
                        <span>{bank}</span>
                      </button>
                    ))}
                  </div>

                  {/* Simulators */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => triggerSimulationFailure(`Insufficient funds in ${selectedBank} bank account`)}
                      className="py-1.5 bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer"
                    >
                      Fail txn
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerSimulationSuccess('net')}
                      className="py-1.5 bg-[#4c1d95] hover:bg-[#5d27b0] text-purple-200 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer"
                    >
                      Approve Netbank
                    </button>
                  </div>
                </div>
              )}

              {/* Security Badge bar */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[9px] text-slate-500 uppercase tracking-widest font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Payments certified by Razorpay
              </div>
            </div>
          )}

          {/* Secure Handshaking / Processing State */}
          {rzpStatus === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-200">Securing payment connection...</p>
                <p className="text-[9px] text-slate-450 leading-relaxed font-mono">
                  Translating OAuth handshake protocol on server sandbox. Do not click refresh or escape.
                </p>
              </div>
            </div>
          )}

          {/* Error Failure Callback Simulation */}
          {rzpStatus === 'error' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-black text-rose-400 uppercase tracking-widest">Payment Handshake Interrupted</p>
                <p className="text-[10px] text-slate-300 max-w-xs mx-auto leading-normal">
                  Error Code: <strong>SYS_ERR_GATEWAY_DENIED</strong><br />
                  Detail: {errorMessage}
                </p>
              </div>

              <div className="pt-2.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setRzpStatus('idle')}
                  className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold uppercase rounded-lg cursor-pointer text-center"
                >
                  Change Option
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRzpStatus('processing');
                    setTimeout(() => {
                      setRzpStatus('idle');
                    }, 500);
                  }}
                  className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase rounded-lg cursor-pointer text-center"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Successful Callback simulation transition */}
          {rzpStatus === 'success' && (
            <div className="py-10 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6 fill-current text-[#111624]" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black text-emerald-400 uppercase tracking-wider">Payment Authorized Successfully</p>
                <p className="text-[9px] text-slate-400 font-mono">Redirecting back to shop checkout parameters...</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
