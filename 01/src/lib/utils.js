export function cn(...inputs) {
  // Simple className merging utility
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
}
