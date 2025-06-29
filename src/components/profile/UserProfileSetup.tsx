import React, { useState } from 'react';
import { User, Scale, Activity, Target, Calendar } from 'lucide-react';
import { UserProfile } from '../../types';

interface UserProfileSetupProps {
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
  existingProfile?: UserProfile;
}

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ onSave, onClose, existingProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(existingProfile || {
    age: 25,
    gender: 'male',
    height: 170,
    weight: 70,
    activityLevel: 'moderately-active',
    goal: 'maintain-weight',
    medicalConditions: [],
    allergies: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <User className="h-6 w-6 text-orange-600" />
              <span>Set Up Your Profile</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Age
                </label>
                <input
                  type="number"
                  min="13"
                  max="120"
                  value={profile.age}
                  onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => updateProfile('gender', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  value={profile.height}
                  onChange={(e) => updateProfile('height', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Scale className="h-4 w-4 inline mr-1" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  value={profile.weight}
                  onChange={(e) => updateProfile('weight', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Activity className="h-4 w-4 inline mr-1" />
                Activity Level
              </label>
              <div className="space-y-2">
                {[
                  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
                  { value: 'lightly-active', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                  { value: 'moderately-active', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                  { value: 'very-active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
                  { value: 'extremely-active', label: 'Extremely Active', desc: 'Very hard exercise, physical job' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={option.value}
                      checked={profile.activityLevel === option.value}
                      onChange={(e) => updateProfile('activityLevel', e.target.value)}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Target className="h-4 w-4 inline mr-1" />
                Primary Goal
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'lose-weight', label: 'Lose Weight', desc: 'Create a calorie deficit' },
                  { value: 'maintain-weight', label: 'Maintain Weight', desc: 'Stay at current weight' },
                  { value: 'gain-weight', label: 'Gain Weight', desc: 'Healthy weight gain' },
                  { value: 'build-muscle', label: 'Build Muscle', desc: 'Increase muscle mass' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="goal"
                      value={option.value}
                      checked={profile.goal === option.value}
                      onChange={(e) => updateProfile('goal', e.target.value)}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Medical Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Conditions (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Diabetes', 'Hypertension', 'Heart Disease', 'High Cholesterol', 'Thyroid Issues', 'Other'].map((condition) => (
                  <label key={condition} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile.medicalConditions?.includes(condition) || false}
                      onChange={(e) => {
                        const conditions = profile.medicalConditions || [];
                        if (e.target.checked) {
                          updateProfile('medicalConditions', [...conditions, condition]);
                        } else {
                          updateProfile('medicalConditions', conditions.filter(c => c !== condition));
                        }
                      }}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Allergies (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Nuts', 'Dairy', 'Eggs', 'Shellfish', 'Soy', 'Gluten', 'Fish', 'Other'].map((allergy) => (
                  <label key={allergy} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile.allergies?.includes(allergy) || false}
                      onChange={(e) => {
                        const allergies = profile.allergies || [];
                        if (e.target.checked) {
                          updateProfile('allergies', [...allergies, allergy]);
                        } else {
                          updateProfile('allergies', allergies.filter(a => a !== allergy));
                        }
                      }}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{allergy}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Save Profile
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSetup;