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

1. [Navigate to the Clip Trigger releases page](https://github.com/seanlerner/clip-trigger/releases/latest)
1. Click the `ClipTrigger-X.X.X.dmg` link to download it
1. To bypass the mac OS security block, use `Control`-`Right Click` to Open the downloaded `DMG` file
1. Drag `ClipTrigger` to your Applications folder
1. Open your Applications folder
1. Again, to bypass the mac OS security block, use `Control`-`Right Click` to open the `ClipTrigger` app that exists inside your application folder
1. Open the menu from the Clip Trigger icon (in your system tray)<br><img src=https://github.com/seanlerner/clip-trigger/raw/master/assets/img/system-tray-icon.png>
1. Select `Triggers` to open the *Trigger Directory*
1. Click Install for any triggers you'd like to use
1. Check out the "More Info" links from within the Trigger Directory for details on how to use each particular trigger

Note: Clip Trigger doesn't come with any pre-installed triggers, so you'll need to install some to begin using it.

## Creating Custom Triggers

You can create your own triggers using JavaScript.

Use the code from the [Hello, World trigger](https://github.com/seanlerner/hello-world-trigger) and the [Bacon Ipsum trigger](https://github.com/seanlerner/bacon-ipsum-trigger) to see how to structure a trigger.

Place your newly created trigger inside the folder:

```
~/Library/Application Support/ClipTrigger/triggers
```

Restart Clip Trigger and test out your new trigger.

If you'd like to share your trigger with the world, add it to the [Clip Trigger Directory repo](https://github.com/seanlerner/clip-trigger-directory).

## Caveats

- if your clipboard contains content, and you copy the exact same content to your clipboard, Clip Trigger won't pick up that you've copied something new to your clipboard. If you're having trouble, trying copying 'abc' to your clipboard, and then try copying your desired trigger again.
