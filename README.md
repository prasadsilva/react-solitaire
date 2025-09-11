# React Solitaire

An exploration in creating a Solitaire game using React.

## Features

- This is an implementation of the Klondike Solitaire Turn 3 game.
- Works on touchscreen devices, such as smart phones.
- An elapsed time is displayed to gamify the experience.
- The last ten best times are tracked across play sessions.
- A light/dark mode toggle provided to add a level of accessibility.

## Takeaways

While the state management provided by React allows for a good enough MVVM architecture and made implementing non-game data management (time, leaderboard, stacks) a breeze, in my opninon, managing DOM refreshes across the play session was much more cumbersome. It would be interesting to see if a VDOM-less framework, such as Vue/SolidJS, would be a better option assuming surgical DOM changes simplified some of that complexity.

## TODO

### Function

- Dark mode cards
- Show current elapsed time placement against best times
- Animations

### Tech debt

- Add granular context change event handling
- Use an absolute positioning strategy for rendering the card stacks instead of composition
