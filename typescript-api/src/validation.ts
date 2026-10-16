export function requiredString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim()==='') throw new Error(`${field} is required`);
  return value.trim();
}
export function positiveInt(value: unknown, field: string): number {
  const n=Number(value); if(!Number.isInteger(n)||n<=0) throw new Error(`${field} must be a positive integer`); return n;
}
export function email(value: unknown): string {
  const s=requiredString(value,'email'); if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) throw new Error('invalid email'); return s;
}
