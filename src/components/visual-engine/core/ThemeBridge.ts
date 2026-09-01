/**
 * ThemeBridge.ts
 * Reads live CSS design tokens from document root and dispatches updates on theme change.
 * Adheres strictly to Soft Architecture design language.
 */

export interface ThemeColors {
  accent: string;       // #2676AA (--accent / --blue-500)
  accentHover: string;  // #1B5E8A
  signalWarm: string;   // #FFAFCC (--pink-400)
  signalSoft: string;   // #FFC8DD (--pink-300)
  lavender: string;     // #CDB4DB (--lavender-400)
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

  /** Get the current computed theme tokens */
  public static getColors(): ThemeColors {
    if (typeof window === 'undefined') {
      return {
        accent: '#2676AA',
        accentHover: '#1B5E8A',
        signalWarm: '#FFAFCC',
        signalSoft: '#FFC8DD',
        lavender: '#CDB4DB',
        surface: '#FFFFFF',
        surfaceCard: '#FFFFFF',
        surfaceSubtle: '#F8F9FC',
        text: '#1A1A2E',
        textMuted: '#68768B',
        border: '#E2E8F0',
        isDark: false,
      };
    }

    const doc = document.documentElement;
    const styles = getComputedStyle(doc);
    const isDark = doc.classList.contains('dark') || doc.getAttribute('data-theme') === 'dark';

    return {
      accent: styles.getPropertyValue('--accent').trim() || '#2676AA',
      accentHover: styles.getPropertyValue('--accent-hover').trim() || '#1B5E8A',
      signalWarm: styles.getPropertyValue('--pink-400').trim() || '#FFAFCC',
      signalSoft: styles.getPropertyValue('--pink-300').trim() || '#FFC8DD',
      lavender: styles.getPropertyValue('--lavender-400').trim() || '#CDB4DB',
      surface: styles.getPropertyValue('--surface').trim() || (isDark ? '#16162a' : '#FFFFFF'),
      surfaceCard: styles.getPropertyValue('--surface-card').trim() || (isDark ? '#1c1c36' : '#FFFFFF'),
      surfaceSubtle: styles.getPropertyValue('--surface-subtle').trim() || (isDark ? '#121222' : '#F8F9FC'),
      text: styles.getPropertyValue('--text').trim() || (isDark ? '#E2E8F0' : '#1A1A2E'),
      textMuted: styles.getPropertyValue('--text-muted').trim() || (isDark ? '#94A3B8' : '#68768B'),
      border: styles.getPropertyValue('--border-default').trim() || (isDark ? '#2D3748' : '#E2E8F0'),
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
      if (this.listeners.size === 0 && this.observer) {
        this.observer.disconnect();
        this.observer = null;
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
      this.mediaQuery.addEventListener('change', () => {
        const colors = this.getColors();
        this.listeners.forEach((cb) => cb(colors));
      });
    }
  }
}
