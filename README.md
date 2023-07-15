# Handzplay




https://github.com/stone-skipper/handzplay/assets/48980449/9f8815c5-846f-4707-9d69-a512b7b9b0bf


Handzplay is a playground for hand gesture interactions. 
You can create gesture interactions by adding rules and interfaces. 
<br/><br/>
Experiment by [Seungmee Lee](https://seungmee-lee.com)
Contact via [Twitter](https://twitter.com/@smee_leee) or [Instagram](https://instagram.com/stone.skipper) for any questions. 
<br/>
<br/>


## How it works

Your hands in a camera feed are recognized and visualized by TensorFlow Handpose.
You can try pre-built templates with a set of rules and interfaces, or you can create your own.

Currently, there're 3 ways of creating conditions.

#### Add a rule


https://github.com/stone-skipper/handzplay/assets/48980449/eb1036ba-0eda-495a-9dd5-5076f9ce2ee3


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


https://github.com/stone-skipper/handzplay/assets/48980449/188c5b0c-dfe4-49a0-8204-8c4256223cf8


You can create a visual element that reacts to actions, like swiping, hover, and click, almost similar to how you'd interact with interfaces with a mouse.

#### Canvas mode (beta)


https://github.com/stone-skipper/handzplay/assets/48980449/2471b2cb-32e9-437b-8946-ea2ebc1c2506


Canvas mode offers the easiest way to create an interface, but now it only supports hover interaction at this moment.

<br/>
<br/>

## References

Tensorflow Handpose [doc](https://google.github.io/mediapipe/solutions/hands.html#javascript-solution-api)
<br/>
Fingerpose [doc](https://github.com/andypotato/fingerpose)

