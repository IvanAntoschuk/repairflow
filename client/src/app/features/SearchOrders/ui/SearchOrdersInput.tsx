import { Search } from 'lucide-react'

interface SearchOrdersInputProps {
  placeholder?: string
}

export const SearchOrdersInput = ({
  placeholder = "Швидкий пошук замовлення, клієнта чи IMEI...",
}: SearchOrdersInputProps) => {
  return (
    <div className="relative w-full">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-outline">
        <Search size={20} />
      </span>
      <input
        type="search"
        aria-label={placeholder}
        placeholder={placeholder}
        className="w-full rounded-lg border border-outline-variant/50 bg-surface-container-low py-1.5 pr-space-md pl-10 font-body-default text-body-default text-on-surface placeholder:text-outline transition-all focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
      />
    </div>
  )
}
