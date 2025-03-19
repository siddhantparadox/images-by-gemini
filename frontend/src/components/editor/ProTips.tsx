export const ProTips = () => {
  return (
    <div className="mt-8 p-5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900">
      <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Pro Tips
      </h3>
      <ul className="space-y-2 text-xs text-indigo-700 dark:text-indigo-300">
        <li className="flex">
          <span className="font-bold mr-1">•</span>
          <span><strong>Be Specific:</strong> Detailed prompts yield better results.</span>
        </li>
        <li className="flex">
          <span className="font-bold mr-1">•</span>
          <span><strong>Colors:</strong> Explicitly mention the colors you want.</span>
        </li>
        <li className="flex">
          <span className="font-bold mr-1">•</span>
          <span><strong>Style:</strong> Reference specific art styles like &quot;watercolor&quot; or &quot;oil painting&quot;.</span>
        </li>
        <li className="flex">
          <span className="font-bold mr-1">•</span>
          <span><strong>Lighting:</strong> Describe lighting with terms like &quot;golden hour&quot; or &quot;dramatic&quot;.</span>
        </li>
      </ul>
    </div>
  );
};
