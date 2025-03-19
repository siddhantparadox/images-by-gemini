interface ResponseMessageProps {
  text: string;
}

export const ResponseMessage = ({ text }: ResponseMessageProps) => {
  if (!text) return null;
  
  return (
    <div className="p-4 text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-200 dark:border-purple-900">
      <h3 className="font-semibold mb-2 flex items-center">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        AI Response:
      </h3>
      <p>{text}</p>
    </div>
  );
};
