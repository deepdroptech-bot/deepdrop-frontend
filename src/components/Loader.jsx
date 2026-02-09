import logo from '../assets/logo.png';

export default function Loader() {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-gradient-to-r from-red-600 via-blue-600 to-red-600
        bg-[length:300%_300%]
        animate-gradientMove
      "
    >
      <div className="flex flex-col items-center gap-6">

        {/* Logo wrapper */}
        <div className="relative">
          <img
            src={logo}
            alt="Logo"
            className="
              w-28 h-28
              animate-bounceSoft
              animate-glow
              animate-gradientMove
            "  
          />

          {/* rotating ring */}
          <div
            className="
              absolute inset-0
              rounded-full
              border-4 border-white/40
              animate-spinSlow
            "
          />
        </div>

        {/* Text */}
        <p className="text-white text-lg font-semibold tracking-widest uppercase">
          Loading your experience…
        </p>

      </div>
    </div>
  );
}
