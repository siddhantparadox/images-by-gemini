interface PromptSelectorProps {
  availablePrompts: string[];
  onSelectPrompt: (prompt: string) => void;
}

export const PromptSelector = ({
  availablePrompts,
  onSelectPrompt
}: PromptSelectorProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
        Quick Edit Presets:
      </label>
      <div className="relative">
        <select 
          onChange={(e) => {
            if (e.target.value) onSelectPrompt(e.target.value);
          }}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-white appearance-none"
          value=""
        >
          <option value="" disabled>Select a preset prompt</option>
          {availablePrompts.map((preset, index) => (
            <option key={index} value={preset}>
              {preset.length > 60 ? preset.substring(0, 57) + '...' : preset}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Select a preset or write your own detailed prompt below
      </p>
    </div>
  );
};
