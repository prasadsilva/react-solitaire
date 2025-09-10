import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Info } from 'lucide-react';

function SolitaireGameTitleBar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon_sm" className="w-9 h-9">
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>React Solitaire</DialogTitle>
          <DialogDescription>An exploration in creating a Solitaire game using React.</DialogDescription>
        </DialogHeader>
        <span>
          The code can be found{' '}
          <a href="https://github.com/prasadsilva/react-solitaire" target="_blank" className="underline">
            here.
          </a>
        </span>
        <span>
          Playing card SVGs provided by{' '}
          <a href="https://www.me.uk/cards/" target="_blank" className="underline">
            Adrian Kennard (RevK®)
          </a>
          .
        </span>
      </DialogContent>
    </Dialog>
  );
}

export default SolitaireGameTitleBar;
