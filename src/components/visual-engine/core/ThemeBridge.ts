/**
 * ThemeBridge.ts
 * Reads live CSS design tokens from document root and dispatches updates on theme change.
 * Adheres strictly to Soft Architecture design language.
 */

export interface ThemeColors {
  accent: string;       // Instrument blue (--accent / --ie-blue)
  accentHover: string;
  signalWarm: string;   // Constraint rust (--signal-warm / --ie-rust)
  signalSoft: string;   // Soft constraint rust (--signal-emphasis / --ie-rust-soft)
  lavender: string;     // Secondary annotation (--signal-secondary / --ie-muted)
  surface: string;      // #FFFFFF (light) / #16162a (dark)
  surfaceCard: string;  // #FFFFFF / #1c1c36
  surfaceSubtle: string;// #F8F9FC / #121222
  text: string;         // #1A1A2E / #E2E8F0
  textMuted: string;    // #68768B / #94A3B8
  border: string;       // rgba(...)
  isDark: boolean;
}

export class ThemeBridge {
  private static listeners: Set<(colors: ThemeColors) => void> = new Set();
  private static observer: MutationObserver | null = null;
  private static mediaQuery: MediaQueryList | null = null;
  private static readonly mediaQueryListener = () => {
    const colors = this.getColors();
    this.listeners.forEach((cb) => cb(colors));
  };

  /** Get the current computed theme tokens */
  public static getColors(): ThemeColors {
    if (typeof window === 'undefined') {
      return {
        accent: '#2857D9',
        accentHover: '#1F46B7',
        signalWarm: '#A63D17',
        signalSoft: '#F8E9DF',
        lavender: '#5B6470',
        surface: '#FFFFFF',
        surfaceCard: '#FFFFFF',
        surfaceSubtle: '#F7F5EF',
        text: '#171A1F',
        textMuted: '#5B6470',
        border: '#D8D4CA',
        isDark: false,
      };
    }

    const doc = document.documentElement;
    const styles = getComputedStyle(doc);
    const isDark = doc.classList.contains('dark') || doc.getAttribute('data-theme') === 'dark';

    const token = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;

    return {
      accent: styles.getPropertyValue('--accent').trim() || '#2857D9',
      accentHover: styles.getPropertyValue('--accent-hover').trim() || (isDark ? '#B2C4FF' : '#1F46B7'),
      signalWarm: token('--signal-warm', token('--ie-rust', isDark ? '#FFB36B' : '#A63D17')),
      signalSoft: token('--signal-emphasis', token('--ie-rust-soft', isDark ? '#3A281E' : '#F8E9DF')),
      lavender: token('--signal-secondary', token('--ie-muted', isDark ? '#AEB6C2' : '#5B6470')),
      surface: styles.getPropertyValue('--surface').trim() || (isDark ? '#181C22' : '#FFFFFF'),
      surfaceCard: styles.getPropertyValue('--surface-card').trim() || (isDark ? '#181C22' : '#FFFFFF'),
      surfaceSubtle: styles.getPropertyValue('--surface-subtle').trim() || (isDark ? '#111318' : '#F7F5EF'),
      text: styles.getPropertyValue('--text').trim() || (isDark ? '#F3F4F6' : '#171A1F'),
      textMuted: styles.getPropertyValue('--text-muted').trim() || (isDark ? '#AEB6C2' : '#5B6470'),
      border: styles.getPropertyValue('--border-default').trim() || (isDark ? '#374151' : '#D8D4CA'),
      isDark,
    };
  }

  /** Subscribe to theme change events */
  public static subscribe(callback: (colors: ThemeColors) => void): () => void {
    this.listeners.add(callback);
    this.initObserver();

    // Return un-subscriber
    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0) {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        if (this.mediaQuery) {
          this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
          this.mediaQuery = null;
        }
      }
    };
  }

  private static initObserver(): void {
    if (typeof window === 'undefined' || this.observer) return;

    this.observer = new MutationObserver(() => {
      const colors = this.getColors();
      this.listeners.forEach((cb) => cb(colors));
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    if (window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    }
  }
}
