# Clip Trigger

Clip Trigger lets you issue commands without leaving your current application.

## How to use it

Let's say you're developing a website and need some [Bacon Ipsum](https://baconipsum.com/). From your text editor you would:

1. Copy the shortcode. In this case it's "bc".
2. Paste your clipboard contents.
3. See Bacon Ipsum!

Copy. Paste. Enjoy your bacon. That's all it takes to use Clip Trigger.

## How it works

Clip Trigger is a background application that monitors your clipboard. When your clipboard content changes (i.e. after you've copied something to it), it checks to see if there's a predefined trigger "shortcode" and if so, executes a process.

## Getting Started

1. [Download Clip Trigger](https://github.com/seanlerner/clip-trigger-distribution/blob/master/README.md)
1. Install and open Clip Trigger
1. Open the menu from the Clip Trigger icon (in your system tray)
1. Select `Triggers` to open the *Trigger Directory*
1. Click Install for any triggers you'd like to use
1. Check out the "More Info" links from within the Trigger Directory for details on how to use each particular trigger

## Creating Custom Triggers

You can create your own triggers using JavaScript.

Use the code from the [Hello, World trigger](https://github.com/seanlerner/hello-world-trigger) and the [Bacon Ipsum trigger](https://github.com/seanlerner/bacon-ipsum-trigger) to see how to structure a trigger.

Place your newly created trigger inside the folder:

```
~/Library/Application Support/ClipTrigger/triggers
```

Restart Clip Trigger and test out your new trigger.

If you'd like to share your trigger with the world, add it to the [Clip Trigger Directory repo](https://github.com/seanlerner/clip-trigger-directory).

