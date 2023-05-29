export function validationObject(obj: Record<string, unknown>, schema: Record<string, unknown>) {
  for (let key in schema) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }

    const value = obj[key];
    const validation = schema[key];

    if (Array.isArray(validation)) {
      // Array-based value comparison
      if (!validation.includes(String(value))) return false;
    } else {
      // Single value comparison
      if (value !== validation) return false;
    }
  }

  return true;
}
