// مقدارها انگلیسی هستند و برچسب فارسی فقط برای نمایش است.
export const PRIORITIES = [
  { value: "Low", label: "کم" },
  { value: "Medium", label: "متوسط" },
  { value: "High", label: "زیاد" },
];

export const STATUSES = [
  { value: "Todo", label: "انجام نشده" },
  { value: "In Progress", label: "در حال انجام" },
  { value: "Completed", label: "تکمیل شده" },
];

export const labelOf = (list, value) =>
  list.find((i) => i.value === value)?.label ?? value;

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
