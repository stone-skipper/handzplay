# Handzplay

This is an experiment by [Seungmee Lee](https://read.cv/seungmee_lee), playing around with gesture interaction.
<br/>
Check out the [website](https://handzplay.vercel.app) to experience it.
<br/>
<br/>


## How it works

Your hands in a camera feed are recognized and visualized by TensorFlow Handpose.
You can try pre-built templates with set of rules and interfaces, or you can create your own.

Currently, there're 3 ways of creating conditions.

#### Add a rule

It's an 'if-then' structure rule that you can define a type of gesture to trigger the interaction, and a type of reaction.

#### Add an interface

You can create a visual element that reacts to actions, like swiping, hover, and click, almost similar to how you'd interact with interfaces with a mouse.

#### Canvas mode (beta)

Canvas mode offers the easiest way to create an interface, but now it only supports hover interaction at this moment.

<br/>
<br/>

## References

Tensorflow Handpose [doc](https://google.github.io/mediapipe/solutions/hands.html#javascript-solution-api)
Fingerpose [doc](https://github.com/andypotato/fingerpose)

