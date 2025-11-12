import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
}

export function LoginScreen({ onBack, onLogin, onRegisterClick, onForgotPasswordClick }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#F7F9FA] to-[#E8F4F8]">
      {/* Subtle map pattern background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #9B8FE6 1px, transparent 0)`,
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
          <Button 
            onClick={onBack}
            variant="ghost"
            className="mb-6 -ml-2 h-10 w-10 rounded-full p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to discover people nearby</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email or Username</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input 
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-full border-gray-200 pl-12 shadow-sm focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-full border-gray-200 pl-12 shadow-sm focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={onForgotPasswordClick}
              className="text-[#9B8FE6] transition-colors hover:text-[#E67FB9]"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-4">
            <Button 
              type="submit"
              className="h-12 w-full rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              Login
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={onRegisterClick}
              className="text-[#9B8FE6] transition-colors hover:text-[#E67FB9]"
            >
              Register
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
