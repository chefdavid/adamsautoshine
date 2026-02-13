interface FieldGroupProps {
  label: string;
  help?: string;
  children: React.ReactNode;
}

export function FieldGroup({ label, help, children }: FieldGroupProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      {children}
      {help && <p className="text-xs text-slate-400 mt-1">{help}</p>}
    </div>
  );
}

export function InputField({
  label,
  value,
  onChange,
  help,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  help?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <FieldGroup label={label} help={help}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
      />
    </FieldGroup>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  help,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  help?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <FieldGroup label={label} help={help}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white resize-y"
      />
    </FieldGroup>
  );
}
