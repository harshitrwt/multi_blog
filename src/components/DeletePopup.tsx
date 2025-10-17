export default function DeletePopup({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Delete this post?</h3>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Yes</button>
          <button onClick={onCancel} className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg text-black dark:text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}
