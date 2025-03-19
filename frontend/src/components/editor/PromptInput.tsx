import { Textarea } from '../ui/textarea';

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PromptInput = ({ value, onChange }: PromptInputProps) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
        Edit instruction:
      </label>
      <Textarea 
        value={value}
        onChange={onChange}
        className="min-h-[160px]"
        placeholder="Be specific with your editing instructions for best results. Examples:

• Style transfer: 'Transform this into a watercolor painting with soft pastel colors'
• Object addition: 'Add a majestic mountain range in the background with snow-capped peaks'
• Object removal: 'Remove all people from this image and keep the background intact'
• Lighting changes: 'Make this image look like it was taken during golden hour sunset'
• Creative effects: 'Turn this into a cyberpunk scene with neon lights and rain'
• Scene expansion: 'Extend the background to show more of the landscape'
• Artistic filter: 'Apply a Van Gogh Starry Night style to this image'

For best results, include details about colors, lighting, and style."
        rows={6}
      />
    </div>
  );
};
