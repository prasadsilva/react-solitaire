import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './hooks';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button variant="outline" size="icon_sm" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
      {theme == 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
