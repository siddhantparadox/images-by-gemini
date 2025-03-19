import { Button } from '../ui/button';

interface PromptSuggestionsProps {
  suggestions: string[];
  onSelect: (prompt: string) => void;
}

export const PromptSuggestions = ({ suggestions, onSelect }: PromptSuggestionsProps) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Prompt Suggestions</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 5).map((suggestion, index) => (
          <Button
            key={index}
            type="button"
            onClick={() => onSelect(suggestion)}
            variant="secondary"
            size="sm"
            className="rounded-full text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 
                     hover:bg-indigo-200 dark:hover:bg-indigo-800
                     whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
            title={suggestion}
          >
            {suggestion.length > 40 ? `${suggestion.substring(0, 40)}...` : suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};
