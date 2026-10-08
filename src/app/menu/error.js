'use client'

export default function Error({ reset }) {
  return (
    <div>
      <p>Something went wrong with the menu.</p>
      <button onClick={reset} className="mt-2 rounded bg-yellow-400 px-4 py-2">
        Try again
      </button>
    </div>
  )
}
