'use client';

import { useState, FormEvent, ChangeEvent, FocusEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

type FormDataType = {
  name: string;
  age: string;
  email: string;
  phone: string;
  q1: string;
  q2: string;
  q2_invested: string;
  q2_missing: string;
  q3: string;
  q4: string;
  q5: string;
  q5_rating: string;
  q5_explanation: string;
};

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    age: '',
    email: '',
    phone: '',
    q1: '',
    q2: '',
    q2_invested: '',
    q2_missing: '',
    q3: '',
    q4: '',
    q5: '',
    q5_rating: '',
    q5_explanation: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormDataType>>(new Set());

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => new Set([...prev, name as keyof FormDataType]));
  };

  const handleFocus = (fieldName: keyof FormDataType) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (_: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField('');
  };

  const isFieldValid = (fieldName: keyof FormDataType, value: string): boolean => {
    if (!touchedFields.has(fieldName)) return true;

    switch (fieldName) {
      case 'name':
        return value.length >= 2;
      case 'age':
        return Number(value) >= 16 && Number(value) <= 100;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'q1':
      case 'q3':
      case 'q4':
        return value.length >= 10;
      case 'q2':
        return (
          formData.q2_invested !== '' &&
          (formData.q2_invested === 'no' || formData.q2_missing.length >= 10)
        );
      case 'q5':
        return formData.q5_rating !== '' && formData.q5_explanation.length >= 10;
      default:
        return true;
    }
  };

  const getFieldProgress = () => {
    const requiredFields: (keyof FormDataType)[] = [
      'name',
      'age',
      'email',
      'q1',
      'q2',
      'q3',
      'q4',
      'q5',
    ];

    const validFields = requiredFields.filter((field) => {
      if (field === 'q2') {
        return (
          formData.q2_invested !== '' &&
          (formData.q2_invested === 'no' || formData.q2_missing.length >= 10)
        );
      }

      if (field === 'q5') {
        return formData.q5_rating !== '' && formData.q5_explanation.length >= 10;
      }

      const value = formData[field];
      if (!value || value.trim() === '') return false;
      return isFieldValid(field, value);
    });

    return (validFields.length / requiredFields.length) * 100;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const q = query(
        collection(db, 'applications'),
        where('email', '==', formData.email)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setError('You are already in the waitlist.');
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'applications'), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setSubmitting(false);
      localStorage.setItem('hasAppliedToForge', 'true');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-light tracking-tight">Application Submitted</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Thank you for your interest in The Forge Academy. We&apos;ll review your application and contact you within 48 hours.
          </p>
          
          <button
            onClick={() => window.location.href = '/'}
            className="group relative px-8 py-4 bg-white text-black rounded-xl font-medium transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Return to Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-28 bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6 py-12">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-light tracking-tight mb-4">The Forge Academy</h1>
            <p className="text-gray-400 text-xl">Application Form</p>
            
            {/* Progress bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span>{Math.round(getFieldProgress())}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${getFieldProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07]">
              <h2 className="text-2xl font-light mb-6 flex items-center">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-sm font-medium">1</span>
                </div>
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Name Field */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                    className={`w-full bg-white/10 border-2 px-4 py-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 ${
                      focusedField === 'name' 
                        ? 'border-white/50 bg-white/15 scale-105' 
                        : isFieldValid('name', formData.name)
                        ? 'border-white/20 hover:border-white/30'
                        : 'border-red-500/50'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {!isFieldValid('name', formData.name) && touchedFields.has('name') && (
                    <p className="text-red-400 text-xs mt-1">Name must be at least 2 characters</p>
                  )}
                </div>

                {/* Age Field */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Age *
                  </label>
                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    onFocus={() => handleFocus('age')}
                    onBlur={handleBlur}
                    required
                    type="number"
                    min="16"
                    max="100"
                    className={`w-full bg-white/10 border-2 px-4 py-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      focusedField === 'age' 
                        ? 'border-white/50 bg-white/15 scale-105' 
                        : isFieldValid('age', formData.age)
                        ? 'border-white/20 hover:border-white/30'
                        : 'border-red-500/50'
                    }`}
                    placeholder="Your age"
                  />
                  {!isFieldValid('age', formData.age) && touchedFields.has('age') && (
                    <p className="text-red-400 text-xs mt-1">Age must be between 16 and 100</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    required
                    type="email"
                    className={`w-full bg-white/10 border-2 px-4 py-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-white/50 bg-white/15 scale-105' 
                        : isFieldValid('email', formData.email)
                        ? 'border-white/20 hover:border-white/30'
                        : 'border-red-500/50'
                    }`}
                    placeholder="your@email.com"
                  />
                  {!isFieldValid('email', formData.email) && touchedFields.has('email') && (
                    <p className="text-red-400 text-xs mt-1">Please enter a valid email address</p>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus('phone')}
                  onBlur={handleBlur}
                  className={`w-full md:w-1/2 bg-white/10 border-2 px-4 py-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 ${
                    focusedField === 'phone' 
                      ? 'border-white/50 bg-white/15 scale-105' 
                      : 'border-white/20 hover:border-white/30'
                  }`}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Application Questions Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07]">
              <h2 className="text-2xl font-light mb-6 flex items-center">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-sm font-medium">2</span>
                </div>
                Application Questions
              </h2>

              <div className="space-y-6">
                {/* Question 1 */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question 1 *
                  </label>
                  <p className="text-gray-400 text-sm mb-3">What is your current biggest challenge in starting or running a business?</p>
                  <textarea
                    name="q1"
                    value={formData.q1}
                    onChange={handleChange}
                    onFocus={() => handleFocus('q1')}
                    onBlur={handleBlur}
                    required
                    rows={4}
                    className={`w-full bg-white/10 border-2 p-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none ${
                      focusedField === 'q1' 
                        ? 'border-white/50 bg-white/15' 
                        : isFieldValid('q1', formData.q1)
                        ? 'border-white/20 hover:border-white/30'
                        : 'border-red-500/50'
                    }`}
                    placeholder="Share your thoughts here..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    {!isFieldValid('q1', formData.q1) && touchedFields.has('q1') && (
                      <p className="text-red-400 text-xs">Please provide at least 10 characters</p>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {formData.q1.length} characters
                    </span>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question 2 *
                  </label>
                  <p className="text-gray-400 text-sm mb-4">Have you ever invested in any online course or business program before?</p>
                  
                  {/* Radio buttons */}
                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, q2_invested: 'yes', q2_missing: '' });
                        setTouchedFields(prev => new Set([...prev, 'q2']));
                      }}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                        formData.q2_invested === 'yes'
                          ? 'bg-white text-black shadow-lg scale-105'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.q2_invested === 'yes' ? 'border-black' : 'border-white/50'
                      }`}>
                        {formData.q2_invested === 'yes' && (
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        )}
                      </div>
                      Yes
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, q2_invested: 'no', q2_missing: '' });
                        setTouchedFields(prev => new Set([...prev, 'q2']));
                      }}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                        formData.q2_invested === 'no'
                          ? 'bg-white text-black shadow-lg scale-105'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.q2_invested === 'no' ? 'border-black' : 'border-white/50'
                      }`}>
                        {formData.q2_invested === 'no' && (
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        )}
                      </div>
                      No
                    </button>
                  </div>

                  {/* Conditional input for "Yes" */}
                  {formData.q2_invested === 'yes' && (
                    <div className="mt-4">
                      <p className="text-gray-400 text-sm mb-3">If yes, what was missing?</p>
                      <textarea
                        name="q2_missing"
                        value={formData.q2_missing}
                        onChange={handleChange}
                        onFocus={() => handleFocus('q2_missing')}
                        onBlur={handleBlur}
                        required
                        rows={4}
                        className={`w-full bg-white/10 border-2 p-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none ${
                          focusedField === 'q2_missing' 
                            ? 'border-white/50 bg-white/15' 
                            : formData.q2_missing.length >= 10
                            ? 'border-white/20 hover:border-white/30'
                            : 'border-red-500/50'
                        }`}
                        placeholder="Tell us what was missing from your previous experience..."
                      />
                      <div className="flex justify-between items-center mt-2">
                        {formData.q2_missing.length > 0 && formData.q2_missing.length < 10 && (
                          <p className="text-red-400 text-xs">Please provide at least 10 characters</p>
                        )}
                        <span className="text-xs text-gray-500 ml-auto">
                          {formData.q2_missing.length} characters
                        </span>
                      </div>
                    </div>
                  )}

                  {!isFieldValid('q2', '') && touchedFields.has('q2') && (
                    <p className="text-red-400 text-xs mt-2">Please select an option{formData.q2_invested === 'yes' ? ' and provide details' : ''}</p>
                  )}
                </div>

                {/* Question 3 */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question 3 *
                  </label>
                  <p className="text-gray-400 text-sm mb-3">What skills or knowledge do you want to gain from The Forge Academy?</p>
                  <textarea
                    name="q3"
                    value={formData.q3}
                    onChange={handleChange}
                    onFocus={() => handleFocus('q3')}
                    onBlur={handleBlur}
                    required
                    rows={4}
                    className={`w-full bg-white/10 border-2 p-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none ${
                      focusedField === 'q3' 
                        ? 'border-white/50 bg-white/15' 
                        : isFieldValid('q3', formData.q3)
                        ? 'border-white/20 hover:border-white/30'
                        : 'border-red-500/50'
                    }`}
                    placeholder="Share your thoughts here..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    {!isFieldValid('q3', formData.q3) && touchedFields.has('q3') && (
                      <p className="text-red-400 text-xs">Please provide at least 10 characters</p>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {formData.q3.length} characters
                    </span>
                  </div>
                </div>

                {/* Question 4 */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question 4 *
                  </label>
                  <p className="text-gray-400 text-sm mb-3">Would you be interested in earning equity while learning real-time business strategies?</p>
                  <textarea
                    name="q4"
                    value={formData.q4}
                    onChange={handleChange}
                    onFocus={() => handleFocus('q4')}
                    onBlur={handleBlur}
                    required
                    rows={4}
                    className={`w-full bg-white/10 border-2 p-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none ${
                      focusedField === 'q4' 
                        ? 'border-white/50 bg-white/15' 
                        : isFieldValid('q4', formData.q4)
                        ? 'border-white/20 hover:border-white/30'
                        : 'border-red-500/50'
                    }`}
                    placeholder="Share your thoughts here..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    {!isFieldValid('q4', formData.q4) && touchedFields.has('q4') && (
                      <p className="text-red-400 text-xs">Please provide at least 10 characters</p>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {formData.q4.length} characters
                    </span>
                  </div>
                </div>

                {/* Question 5 */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question 5 *
                  </label>
                  <p className="text-gray-400 text-sm mb-4">How likely are you to invest in a hands-on business learning platform like ours?</p>
                  
                  {/* Rating buttons */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-3">Rate from 1 (Not likely) to 10 (Very likely)</p>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, q5_rating: rating.toString() });
                            setTouchedFields(prev => new Set([...prev, 'q5']));
                          }}
                          className={`w-12 h-12 rounded-xl transition-all duration-300 font-medium ${
                            formData.q5_rating === rating.toString()
                              ? 'bg-white text-black shadow-lg scale-110 transform'
                              : 'bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 hover:scale-105'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Explanation textarea */}
                  <div>
                    <p className="text-gray-400 text-sm mb-3">Please explain your rating</p>
                    <textarea
                      name="q5_explanation"
                      value={formData.q5_explanation}
                      onChange={handleChange}
                      onFocus={() => handleFocus('q5_explanation')}
                      onBlur={handleBlur}
                      required
                      rows={4}
                      className={`w-full bg-white/10 border-2 p-4 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none ${
                        focusedField === 'q5_explanation' 
                          ? 'border-white/50 bg-white/15' 
                          : formData.q5_explanation.length >= 10
                          ? 'border-white/20 hover:border-white/30'
                          : 'border-red-500/50'
                      }`}
                      placeholder="Explain why you chose this rating..."
                    />
                    <div className="flex justify-between items-center mt-2">
                      {formData.q5_explanation.length > 0 && formData.q5_explanation.length < 10 && (
                        <p className="text-red-400 text-xs">Please provide at least 10 characters</p>
                      )}
                      <span className="text-xs text-gray-500 ml-auto">
                        {formData.q5_explanation.length} characters
                      </span>
                    </div>
                  </div>

                  {!isFieldValid('q5', '') && touchedFields.has('q5') && (
                    <p className="text-red-400 text-xs mt-2">Please select a rating and provide an explanation</p>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <form onSubmit={handleSubmit}>
            <div className="text-center pt-4">
            
              <button
                type="submit"
                disabled={submitting || getFieldProgress() < 100}
                className={`group relative px-12 py-4 rounded-xl font-medium transition-all duration-300 transform ${
                  submitting || getFieldProgress() < 100
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-2xl'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Application...
                    </>
                  ) : getFieldProgress() < 100 ? (
                    'Complete All Fields to Submit'
                  ) : (
                    'Submit Application'
                  )}
                </span>
                {!submitting && getFieldProgress() >= 100 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
              
              <p className="text-gray-500 text-sm mt-4">
                By submitting this application, you agree to our terms and conditions.
              </p>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}