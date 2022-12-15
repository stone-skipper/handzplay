# Handzplay

Handzplay is a playground for hand gesture interactions. You can create gesture interactions by adding rules and interfaces. 
<br/>
Experiment by [Seungmee Lee](https://read.cv/seungmee_lee)
<br/>
<br/>


## How it works

Your hands in a camera feed are recognized and visualized by TensorFlow Handpose.
You can try from pre-built templates with set of rules and interfaces, or you can create your own.

Currently, there're 3 ways of creating conditions.

#### Add a rule

It's an 'if-then' structure rule that you can define a type of gesture to trigger the interaction, and a type of reaction to be triggered.
<br/>
For trigger, 
- fingers : Choose two fingers and the distance between them. If they're within the range, the interaction is triggered. 
- ![image](https://user-images.githubusercontent.com/48980449/207820111-c82cd5c3-2d54-47d4-ac36-fb1bbd5133f3.png)

<br/>
- pose : Choose which hand (left, right, or both) and the pose. 


<br/>
- action : Choose 

For reaction, 

#### Add an interface

You can create a visual element that reacts to actions, like swiping, hover, and click, almost similar to how you'd interact with interfaces with a mouse.

#### Canvas mode (beta)

Canvas mode offers the easiest way to create an interface, but now it only supports hover interaction at this moment.

<br/>
<br/>

## References

Tensorflow Handpose [doc](https://google.github.io/mediapipe/solutions/hands.html#javascript-solution-api)
Fingerpose [doc](https://github.com/andypotato/fingerpose)

