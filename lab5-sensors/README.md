# Sensor Fun

Explore the expo SDK: use sensors and other APIs in interesting ways. A few ideas follow

## The "Running" "Game"

This app makes you exercise. 
At each second, there is a 1% probability that it orders you to run. If it orders you to run, it:
- Picks a number of steps
- Picks an amount of time 
- Tells you (via text to speech): "you have X second to do Y steps. 3, 2, 1, go!"
- If, when the X seconds have elapsed, Y steps have not been counted, you lose. 
- If Y steps have been made, you win! 

If you lose, the app taunts you via text to speech. If you win:
- The probability increases.
- The number of steps increases.
- The number of seconds decreases.

Feel free to test the app in the corridor. 

## Contacts for real

Use the Contacts API and deep linking to make the Contacts app functional. It should:
- Take the actual contacts from your device
- Display relevant information for each of them (phone, email, picture if you have one)
- The Contact details should allow you to call, text, or email the contact.
- The Contact details should allow you to replace the picture with another picture taken on the spot.

## The "drawing" app

You're probably tired by now, and want to sit down. If you've played the running game enough, you probably don't want to do anything. With this app, you barely have to do anything!

This app renders SVG images. In particular, it renders a continuously increasing line (as if you would use a pen), with an SVG Path object. The user just watches the line slowly grow, which must be very relaxing. 

The user can also do something: when the phone rotates, the direction of the line changes. Imagine drawing a line on paper, but rotating the sheet underneath.

For very active users, some controls can be provided to change:
- the speed of the line
- the color of the line
- the thickness of the line

React Native Gesture Handler could be used for these controls.
