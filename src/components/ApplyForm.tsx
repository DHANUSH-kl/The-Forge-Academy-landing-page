'use client';

export default function ApplyForm() {
  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h2 className="text-3xl mb-8">Application</h2>
      <form className="space-y-6">
        <div>
          <label className="block mb-2 opacity-70">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none" 
          />
        </div>
        <div>
          <label className="block mb-2 opacity-70">Why You?</label>
          <textarea 
            className="w-full bg-transparent border-b border-white/20 py-2 h-32 focus:outline-none"
          />
        </div>
        <button 
          type="submit" 
          className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}