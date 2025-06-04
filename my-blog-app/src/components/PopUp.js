"use client";

export default function Popup({ message, isError, onClose }) {
  if (!message) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center`}
      style={{
        backdropFilter: "blur(5px)", // apply blur
        WebkitBackdropFilter: "blur(5px)", // for Safari support
        backgroundColor: "rgba(255, 255, 255, 0.2)", // subtle light overlay (optional)
      }}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`max-w-md w-full p-6 rounded shadow-lg text-white ${
          isError ? "bg-red-600" : "bg-green-600"
        }`}
      >
        <div className="flex justify-between items-center">
          <p>{message}</p>
          <button
            onClick={onClose}
            className="ml-4 font-bold text-xl leading-none"
            aria-label="Close popup"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
