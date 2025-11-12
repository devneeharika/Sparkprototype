import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Music, Dumbbell, Plane, UtensilsCrossed, Palette, Cpu, Camera, Gamepad2, BookOpen, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ChevronDown } from 'lucide-react';

interface RegisterScreenProps {
  onBack: () => void;
  onRegister: () => void;
}

const INTEREST_CATEGORIES = {
  'Music': ['Hip Hop', 'Jazz', 'Rock', 'Pop', 'Classical', 'Electronic', 'R&B', 'Country', 'Indie', 'Metal'],
  'Fitness': ['Gym', 'Yoga', 'Running', 'Cycling', 'Swimming', 'CrossFit', 'Pilates', 'Hiking', 'Boxing', 'Dance'],
  'Travel': ['Beach', 'Mountains', 'Cities', 'Road Trips', 'Backpacking', 'Luxury', 'Adventure', 'Camping', 'Cruises', 'International'],
  'Food': ['Cooking', 'Baking', 'Italian', 'Japanese', 'Mexican', 'Vegan', 'BBQ', 'Fine Dining', 'Street Food', 'Desserts'],
  'Art': ['Painting', 'Drawing', 'Sculpture', 'Digital Art', 'Photography', 'Crafts', 'Street Art', 'Museums', 'Design', 'Animation'],
  'Tech': ['Coding', 'AI', 'Gadgets', 'Gaming Tech', 'Web Dev', 'Apps', 'Crypto', 'VR/AR', 'Robotics', 'Cybersecurity'],
  'Photography': ['Portrait', 'Landscape', 'Street', 'Wildlife', 'Fashion', 'Macro', 'Astrophotography', 'Film', 'Drone', 'Event'],
  'Gaming': ['PC Gaming', 'Console', 'Mobile', 'RPG', 'FPS', 'Strategy', 'Indie Games', 'Retro', 'MMO', 'E-Sports'],
  'Reading': ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Mystery', 'Romance', 'Biography', 'Self-Help', 'Poetry', 'Comics'],
  'Sports': ['Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball', 'Golf', 'Hockey', 'Cricket', 'Volleyball', 'Martial Arts']
};

const ETHNICITIES = [
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'Middle Eastern or North African',
  'Native American or Alaska Native',
  'Pacific Islander',
  'White or Caucasian',
  'Mixed or Multiracial',
  'Prefer not to say',
  'Other'
];

export function RegisterScreen({ onBack, onRegister }: RegisterScreenProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [bio, setBio] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(prev => prev === category ? null : category);
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      'Music': Music,
      'Fitness': Dumbbell,
      'Travel': Plane,
      'Food': UtensilsCrossed,
      'Art': Palette,
      'Tech': Cpu,
      'Photography': Camera,
      'Gaming': Gamepad2,
      'Reading': BookOpen,
      'Sports': Trophy
    };
    return icons[category] || Music;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Music': 'from-purple-400 to-pink-400',
      'Fitness': 'from-green-400 to-emerald-400',
      'Travel': 'from-blue-400 to-cyan-400',
      'Food': 'from-orange-400 to-red-400',
      'Art': 'from-yellow-400 to-amber-400',
      'Tech': 'from-indigo-400 to-blue-400',
      'Photography': 'from-pink-400 to-rose-400',
      'Gaming': 'from-violet-400 to-purple-400',
      'Reading': 'from-teal-400 to-green-400',
      'Sports': 'from-red-400 to-orange-400'
    };
    return colors[category] || 'from-gray-400 to-gray-500';
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1);
    } else {
      onRegister();
    }
  };

  const canProceed = () => {
    switch(step) {
      case 1: return name.trim().length > 0;
      case 2: return email.trim().length > 0;
      case 3: return password.length > 0;
      case 4: return confirmPassword.length > 0;
      case 5: return age.trim().length > 0;
      case 6: return true; // ethnicity is optional
      case 7: return true; // bio is optional
      case 8: return true; // interests are optional
      default: return false;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white">
      <motion.div 
        className="relative z-10 flex min-h-screen flex-col px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={handleBack}
            variant="ghost"
            className="mb-6 -ml-2 h-10 w-10 rounded-full p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* Step 1: Name */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="mb-2">What's your name?</h1>
                  <p className="text-gray-600">This is how you'll appear to others</p>
                </div>
                <Input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 border-gray-200 focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                  placeholder="Your full name"
                  autoFocus
                />
              </motion.div>
            )}

            {/* Step 2: Email */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="mb-2">What's your email?</h1>
                  <p className="text-gray-600">We'll use this for your account</p>
                </div>
                <Input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 border-gray-200 focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                  placeholder="your@email.com"
                  autoFocus
                />
              </motion.div>
            )}

            {/* Step 3: Password */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="mb-2">Create a password</h1>
                  <p className="text-gray-600">Must be at least 6 characters</p>
                </div>
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 border-gray-200 focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                  placeholder="Enter password"
                  autoFocus
                />
              </motion.div>
            )}

            {/* Step 4: Confirm Password */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="mb-2">Confirm your password</h1>
                  <p className="text-gray-600">Enter the same password again</p>
                </div>
                <Input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-14 border-gray-200 focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                  placeholder="Confirm password"
                  autoFocus
                />
              </motion.div>
            )}

            {/* Step 5: Age */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="mb-2">How old are you?</h1>
                  <p className="text-gray-600">You must be 18 or older</p>
                </div>
                <Input 
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="h-14 border-gray-200 focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                  placeholder="Your age"
                  min="18"
                  max="100"
                  autoFocus
                />
              </motion.div>
            )}

            {/* Step 6: Ethnicity */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="mb-2">What's your ethnicity?</h1>
                  <p className="text-gray-600">Optional - you can skip this</p>
                </div>
                <Select value={ethnicity} onValueChange={setEthnicity}>
                  <SelectTrigger className="h-14 border-gray-200 focus:border-[#E67FB9] focus:ring-[#E67FB9]">
                    <SelectValue placeholder="Select your ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    {ETHNICITIES.map((eth) => (
                      <SelectItem key={eth} value={eth}>
                        {eth}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Step 7: Bio */}
            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="mb-2">Tell us about yourself</h1>
                  <p className="text-gray-600">Optional - share a little bio</p>
                </div>
                <Textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[120px] border-gray-200 focus:border-[#E67FB9] focus:ring-[#E67FB9]"
                  placeholder="Tell others about yourself..."
                  maxLength={150}
                  autoFocus
                />
              </motion.div>
            )}

            {/* Step 8: Interests */}
            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="mb-2">What are you into?</h1>
                  <p className="text-gray-600">Tap on interests to select. Press and hold to see sub-categories.</p>
                </div>
                
                <AnimatePresence mode="wait">
                  {!expandedCategory ? (
                    // Main Categories - Organic Bubble Layout
                    <motion.div
                      key="categories"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative h-[450px] w-full"
                    >
                      {/* Row 1 */}
                      <div
                        onClick={() => toggleCategory('Music')}
                        className="absolute left-[10%] top-[5%] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-xs text-white px-2">Music</span>
                      </div>
                      <div
                        onClick={() => toggleCategory('Fitness')}
                        className="absolute left-[35%] top-[0%] flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-xs text-white px-2">Fitness</span>
                      </div>
                      <div
                        onClick={() => toggleCategory('Travel')}
                        className="absolute left-[65%] top-[8%] flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-sm text-white px-2">Travel</span>
                      </div>

                      {/* Row 2 */}
                      <div
                        onClick={() => toggleCategory('Food')}
                        className="absolute left-[0%] top-[28%] flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-sm text-white px-2">Food</span>
                      </div>
                      <div
                        onClick={() => toggleCategory('Art')}
                        className="absolute left-[40%] top-[25%] flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-sm text-white px-2">Art</span>
                      </div>
                      <div
                        onClick={() => toggleCategory('Tech')}
                        className="absolute left-[72%] top-[32%] flex h-18 w-18 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-xs text-white px-2">Tech</span>
                      </div>

                      {/* Row 3 */}
                      <div
                        onClick={() => toggleCategory('Photography')}
                        className="absolute left-[8%] top-[58%] flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-xs text-white px-2">Photo</span>
                      </div>
                      <div
                        onClick={() => toggleCategory('Gaming')}
                        className="absolute left-[35%] top-[54%] flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-sm text-white px-2">Gaming</span>
                      </div>
                      <div
                        onClick={() => toggleCategory('Reading')}
                        className="absolute left-[66%] top-[60%] flex h-22 w-22 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-xs text-white px-2">Reading</span>
                      </div>

                      {/* Row 4 */}
                      <div
                        onClick={() => toggleCategory('Sports')}
                        className="absolute left-[18%] top-[82%] flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg transition-all hover:scale-105"
                      >
                        <span className="text-center text-xs text-white px-2">Sports</span>
                      </div>
                    </motion.div>
                  ) : (
                    // Sub-interests - Organic Bubble Layout
                    <motion.div
                      key="subinterests"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <Button
                        onClick={() => setExpandedCategory(null)}
                        variant="ghost"
                        className="mb-2 text-gray-600"
                      >
                        ← Back
                      </Button>
                      <div className="relative h-[420px] w-full overflow-y-auto">
                        {INTEREST_CATEGORIES[expandedCategory as keyof typeof INTEREST_CATEGORIES].map(
                          (interest, index) => {
                            const isSelected = selectedInterests.includes(interest);
                            // Generate positions for organic layout
                            const positions = [
                              { top: '2%', left: '8%', size: 'h-16 w-16 text-xs' },
                              { top: '0%', left: '38%', size: 'h-20 w-20 text-xs' },
                              { top: '6%', left: '68%', size: 'h-18 w-18 text-xs' },
                              { top: '24%', left: '0%', size: 'h-24 w-24 text-sm' },
                              { top: '22%', left: '42%', size: 'h-22 w-22 text-xs' },
                              { top: '28%', left: '72%', size: 'h-20 w-20 text-xs' },
                              { top: '50%', left: '12%', size: 'h-20 w-20 text-xs' },
                              { top: '48%', left: '45%', size: 'h-18 w-18 text-xs' },
                              { top: '54%', left: '72%', size: 'h-22 w-22 text-xs' },
                              { top: '74%', left: '22%', size: 'h-24 w-24 text-sm' }
                            ];
                            const pos = positions[index] || positions[0];
                            
                            return (
                              <div
                                key={interest}
                                onClick={() => toggleInterest(interest)}
                                className={`absolute flex cursor-pointer items-center justify-center rounded-full transition-all ${pos.size} ${
                                  isSelected
                                    ? 'bg-gradient-to-br from-[#E67FB9] to-[#d96fa8] shadow-lg'
                                    : 'border-2 border-gray-300 bg-white hover:border-[#E67FB9]'
                                }`}
                                style={{ top: pos.top, left: pos.left }}
                              >
                                <span
                                  className={`text-center px-2 ${pos.size.includes('text-sm') ? 'text-sm' : 'text-xs'} ${
                                    isSelected ? 'text-white' : 'text-gray-700'
                                  }`}
                                >
                                  {interest}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Button */}
        <div className="pt-8">
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="h-14 w-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] transition-all hover:opacity-90 disabled:opacity-50"
          >
            {step === 8 ? 'Complete Registration' : 'Continue'}
          </Button>
        </div>

        {/* Footer spacing */}
        <div className="h-4" />
      </motion.div>
    </div>
  );
}