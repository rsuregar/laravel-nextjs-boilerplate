export function acronym(name: string) {
  const words = name?.trim().split(" ")
  if (words?.length < 2) {
    return words[0]?.charAt(0).toUpperCase() || ""
  }
  return `${words?.[0]?.[0].toUpperCase()}${words?.[1]?.[0].toUpperCase()}`
}
