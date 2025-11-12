import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, Lock, KeyRound, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

type Step = 'email' | 'otp' | 'reset' | 'success';

export function ForgotPasswordScreen({ onBack, onSuccess }: ForgotPasswordScreenProps) {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep('otp');
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep('reset');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep('success');
    
    // Auto-redirect after success
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setOtp('');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#F7F9FA] to-[#E8F4F8]">
      {/* Subtle map pattern background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #E67FB9 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <motion.div 
        className="relative z-10 flex min-h-screen flex-col px-6 py-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8">
          {currentStep !== 'success' && (
            <Button 
              onClick={currentStep === 'email' ? onBack : () => setCurrentStep('email')}
              variant="ghost"
              className="mb-6 -ml-2 h-10 w-10 rounded-full p-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <AnimatePresence mode="wait">
            {currentStep === 'email' && (
              <motion.div
                key="email-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="mb-2">Forgot Password?</h1>
                <p className="text-gray-600">Enter your email to receive a verification code</p>
              </motion.div>
            )}
            
            {currentStep === 'otp' && (
              <motion.div
                key="otp-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="mb-2">Verify Code</h1>
                <p className="text-gray-600">Enter the 6-digit code sent to {email}</p>
              </motion.div>
            )}
            
            {currentStep === 'reset' && (
              <motion.div
                key="reset-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="mb-2">Reset Password</h1>
                <p className="text-gray-600">Create a new password for your account</p>
              </motion.div>
            )}
            
            {currentStep === 'success' && (
              <motion.div
                key="success-header"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 className="mb-6 h-24 w-24 text-green-500" />
                </motion.div>
                <h1 className="mb-2 text-center">Password Reset!</h1>
                <p className="text-center text-gray-600">Your password has been successfully reset</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          {currentStep === 'email' && (
            <motion.form 
              key="email-form"
              onSubmit={handleSendOTP} 
              className="flex-1 space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-full border-gray-200 pl-12 shadow-sm focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Code'}
                </Button>
              </div>
            </motion.form>
          )}

          {currentStep === 'otp' && (
            <motion.form 
              key="otp-form"
              onSubmit={handleVerifyOTP} 
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-4">
                <Label htmlFor="otp" className="text-gray-700">Verification Code</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="h-14 w-12 rounded-xl border-2 text-lg" />
                      <InputOTPSlot index={1} className="h-14 w-12 rounded-xl border-2 text-lg" />
                      <InputOTPSlot index={2} className="h-14 w-12 rounded-xl border-2 text-lg" />
                      <InputOTPSlot index={3} className="h-14 w-12 rounded-xl border-2 text-lg" />
                      <InputOTPSlot index={4} className="h-14 w-12 rounded-xl border-2 text-lg" />
                      <InputOTPSlot index={5} className="h-14 w-12 rounded-xl border-2 text-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-[#9B8FE6] transition-colors hover:text-[#E67FB9] disabled:opacity-50"
                >
                  Didn't receive code? Resend
                </button>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="h-12 w-full rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </Button>
              </div>
            </motion.form>
          )}

          {currentStep === 'reset' && (
            <motion.form 
              key="reset-form"
              onSubmit={handleResetPassword} 
              className="flex-1 space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-700">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input 
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 rounded-full border-gray-200 pl-12 shadow-sm focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                    placeholder="Enter new password"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input 
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-full border-gray-200 pl-12 shadow-sm focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                    placeholder="Confirm new password"
                    required
                    minLength={8}
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}
              </div>

              <div className="pt-4">
                <Button 
                  type="submit"
                  disabled={isLoading || newPassword !== confirmPassword || !newPassword}
                  className="h-12 w-full rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer spacing */}
        {currentStep !== 'success' && <div className="h-4" />}
      </motion.div>
    </div>
  );
}
