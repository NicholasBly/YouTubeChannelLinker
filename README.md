# YouTube Channel Link Fixer

Before - YouTube channel names across YouTube.com do not link directly to the channel and instead link to the video.

![brave_mqUxMaQOO1](https://github.com/user-attachments/assets/900b1864-9e6d-477e-be0e-4ff41deb229e)

After - YouTube channel names across YouTube.com are now highlighted blue and direct you to their channel. Clicking on the video/thumbnail or video title itself will still open the video as expected.

![brave_5ufEUqLM2E](https://github.com/user-attachments/assets/eb739c79-f9a4-428c-83d9-14f799398c15)



## Description
YouTube Channel Link Fixer is a Chrome/Brave extension that enhances the user experience on YouTube by modifying the behavior of channel name links in the recommended videos section as well as the homepage. By default, clicking on a channel name directs to the video. This extension changes that behavior, making channel names link directly to the channel page instead.

## Features
- Modifies channel name links in YouTube's recommended video section and homepage
- Redirects clicks on channel names to the channel's page instead of the video
- Adds a visual indicator (color change and underline on hover) to show the channel name is clickable
- Works with dynamically loaded content
- Maintains YouTube's original look and feel

## Installation
1. Clone this repository or download the source code
2. Open Chrome/Brave and navigate to `chrome://extensions/` / `Brave://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files

## How It Works
The extension uses a content script that:
1. Identifies channel name elements in the YouTube interface
2. Wraps these elements with a link to the channel's page
3. Adds event listeners for improved interactivity
4. Uses a MutationObserver to handle dynamically loaded content

## Customize Color
If you prefer the original color of the YouTube channel names or want to change the color, perform the following steps:
1. Replace the following line of code to keep the original color:

linkElement.style.color = '#3ea6ff';

Replace with:

wrapper.style.color = 'inherit';

2. Alternatively, change the "#3ea6ff" to whichever color you'd like to use.

## Compatibility
This extension is designed for use with Chrome and Brave browsers. It may work with other Chromium-based browsers but has not been tested on them.

## Contributions
Contributions, issues, and feature requests are welcome. Feel free to check [issues page](link-to-your-issues-page) if you want to contribute.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Disclaimer
This project is not affiliated with, endorsed by, or sponsored by YouTube or Google. It is an independent project created to enhance user experience on the YouTube platform.
