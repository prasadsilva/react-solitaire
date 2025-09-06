import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useTheme } from './hooks';

export function ThemeToggle({ className }: ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();
  return (
    <Button variant="outline" size="icon_sm" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')} className={className}>
      {theme == 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
