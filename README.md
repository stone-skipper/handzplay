# Handzplay



https://github.com/stone-skipper/handzplay/assets/48980449/36c4f810-ff55-4fdd-95c4-cee613608a91



Handzplay is a playground for hand gesture interactions. 
You can create gesture interactions by adding rules and interfaces. 
<br/><br/>
Experiment by [Seungmee Lee](https://seungmee-lee.com)
Contact me via [Twitter](https://twitter.com/@smee_leee) or [Instagram](https://instagram.com/stone.skipper) for any questions 
<br/>
<br/>


## How it works

Your hands in a camera feed are recognized and visualized by TensorFlow Handpose.
You can try pre-built templates with a set of rules and interfaces, or you can create your own.

Currently, there're 3 ways of creating conditions.

#### Add a rule

It's an 'if-then' structure rule that you can define a type of gesture to trigger the interaction, and a type of reaction to be triggered.
<br/>
For trigger, 
- fingers : Choose two fingers and the distance between them. If they're within the range, the interaction is triggered. 
- pose : Choose which hand (left, right, or both) and the pose. 
- action : Choose which hand (left, right, or both) and the swiping direction in the air.

For reaction, 
- audio
- draw
- voice
- shape
- stamp

#### Add an interface

You can create a visual element that reacts to actions, like swiping, hover, and click, almost similar to how you'd interact with interfaces with a mouse.

#### Canvas mode (beta)

Canvas mode offers the easiest way to create an interface, but now it only supports hover interaction at this moment.

<br/>
<br/>

## References

Tensorflow Handpose [doc](https://google.github.io/mediapipe/solutions/hands.html#javascript-solution-api)
<br/>
Fingerpose [doc](https://github.com/andypotato/fingerpose)

