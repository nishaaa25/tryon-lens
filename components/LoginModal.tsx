"use client";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm">
      <div className="bg-surface rounded-3xl shadow-2xl max-w-5xl w-full mx-4 overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="relative w-full md:w-1/2 h-72 md:h-[520px] bg-gradient-to-br from-orange-400 via-red-400 to-pink-500">
          <img
            src="https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Model wearing dress"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 px-8 py-9 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <div className="mb-7 flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-gray-900 font-semibold text-lg">
              LOGOIPSUM
            </span>
          </div>

          <h2 className="text-[22px] leading-snug font-semibold text-gray-900 mb-2">
            Login/Signup to TRY ON LENS
          </h2>
          <p className="text-[13px] text-gray-500 mb-7">
            Sign up free with your email or another service to continue.
          </p>

          <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-gray-400"
            />
          </div>

          <button
            type="button"
            className="w-full bg-orange-500 text-white py-3 rounded-lg text-[14px] font-medium hover:bg-orange-600 transition-colors mb-4"
          >
            Continue with Email
          </button>

          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-xs uppercase tracking-wide text-gray-400">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-[13px] hover:bg-gray-50 transition-colors"
            >
              <span>🔍</span>
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-[13px] hover:bg-gray-50 transition-colors"
            >
              <span></span>
              <span>Apple ID</span>
            </button>
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            By continuing, you agree to our{" "}
            <button type="button" className="text-orange-500 underline">
              Terms of Service
            </button>{" "}
            and our{" "}
            <button type="button" className="text-orange-500 underline">
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
