export default function Modal({ isVisible, onClose, children }: { isVisible: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur flex justify-center items-center transition-all">
      <div onClick={(e) => e.stopPropagation()} className="w-4/5">
        <div className="bg-white p-2 rounded-md shadow">
          {children}
        </div>
      </div>
    </div>
  )
}