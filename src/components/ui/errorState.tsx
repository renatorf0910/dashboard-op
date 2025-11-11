import React from "react";

export function ErrorState({
  message,
  onRetry,
  details,
}: {
  message: string;
  onRetry: () => void;
  details?: unknown;
}) {
  return (
    <div className="p-6 text-center">
      <p className="text-red-600 font-semibold">{message}</p>
      <button
        onClick={onRetry}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Retry
      </button>
      {details && (
        <details className="mt-3 text-sm text-gray-500 cursor-pointer">
          <summary>Show details</summary>
          <pre className="text-xs text-gray-400 mt-2">
            {JSON.stringify(details, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
