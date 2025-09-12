# React Solitaire

An exploration in creating a Solitaire game using React.

## Features

- This is an implementation of the Klondike Solitaire Turn 3 game.
- Works on touchscreen devices, such as smart phones.
- An elapsed time is displayed to gamify the experience.
- The last ten best times are tracked across play sessions.
- A light/dark mode toggle provided to add a level of accessibility.

## Technical Notes

- Uses React 19 without compiler enabled.
- Built using Vite and deployed as a Github Page.
- Uses Tailwind CSS for styling.
- Uses two contexts
  - A general purpose playing cards canvas that supports stacks of cards and dragging between the stacks.
  - A Solitaire specific context that provides the game logic. This context uses the general purpose one.
- Implements a custom drag-n-drop system, not using the `draggable` property. The custom system provides much better feedback to users.
- Uses touch events to support both mouse and touch interactions.
- Persistent state is stored in local storage. Games can be resumed after refreshing the page.

## Takeaways

While the state management provided by React allows for a good enough MVVM architecture and made implementing non-game data management (time, leaderboard, stacks) a breeze, in my opninon, managing DOM refreshes across the play session was much more cumbersome. It would be interesting to see if a VDOM-less framework, such as SolidJS, would be a better option assuming surgical DOM changes simplified some of that complexity.

## TODO

### Function

- Dark mode cards
- Show current elapsed time placement against best times
- Animations

### Tech debt

- Add granular context change event handling
- Use an absolute positioning strategy for rendering the card stacks instead of composition
