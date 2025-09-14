export class Utils {

  static toNumber(value: string | number, defaultValue = 0, parseMode: 'int' | 'float' = 'float'): number {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    const num = parseMode === 'int' ? parseInt(value as string, 10) : parseFloat(value as string);
    return Number.isFinite(num) ? num : defaultValue;
  }

  static toString(value: unknown, defaultValue = ''): string {
    if (value === null || value === undefined) return defaultValue;
    return String(value);
  }


  static toBoolean(value: unknown, defaultValue = false): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const val = value.trim().toLowerCase();
      if (['true', '1', 'yes'].includes(val)) return true;
      if (['false', '0', 'no'].includes(val)) return false;
    }
    if (typeof value === 'number') return value === 1;
    return defaultValue;
  }


  static chunk<T>(arr: T[], size: number): T[][] {
    if (size <= 0) return [arr];
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  static unique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
  }

  static flatten<T>(arr: any[]): T[] {
    return arr.flat(Infinity);
  }

  static compact<T>(arr: T[]): T[] {
    return arr.filter(Boolean);
  }
  
 }