export const menuItmeKeys = {
  all: ["menuItme"] as const,
  lists: () => [...menuItmeKeys.all, "list"] as const,
  list: (filters: string) => [...menuItmeKeys.lists(), { filters }] as const,
  details: () => [...menuItmeKeys.all, "detail"] as const,
  detail: (id: string) => [...menuItmeKeys.details(), id] as const,
};