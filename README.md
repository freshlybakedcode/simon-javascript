# simon-javascript

My implementation of the Simon game, written in JavaScript.

### User stories:

- User Story: I am presented with a random series of button presses.
- User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
- User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
- User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
- User Story: I can see how many steps are in the current series of button presses.
- User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
- User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
- User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.


### How to use

1) Clone this repo
2) Run `npm-install`
3) Run `npm run dev`

#### Using in development
After you've installed the npm modules, you should run `npm run devw` to put webpack into watch mode.  Then you're free to modify the /src/ folder files and they will be automatically rebuilt into the /dist folder.

You'll need to load the index.html file from the /dist folder to see what's going on, the /src/ folder files need compilation to work.

#### Using in production
Once you've completed development, re-run webpack with `npm run prod`.  This will produce a production version of your code which is fully minified and compiled in ES5.
