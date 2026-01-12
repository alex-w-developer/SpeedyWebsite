# SpeedyWebsite

SpeedyWebsite is a lightweight bookmarklet that reduces heavy animations and visual effects to improve perceived smoothness on modern websites.

## Features
- Gentle and Aggressive smoothing modes
- Per-site mode memory (saved per domain)
- Keyboard toggle: **Ctrl + Shift + M**
- On-page control UI
- One-click enable / disable
- No installation, no permissions, no tracking

## How It Works
SpeedyWebsite injects a small CSS override into the current page that:
- Shortens or disables animations and transitions
- Removes expensive visual effects such as filters and backdrop blurs
- Preserves essential loading indicators where possible

All settings are stored locally in your browser using `localStorage`.

## Installation (Bookmarklet)
1. Open `bookmarklet.txt`
2. Copy the entire line starting with `javascript:`
3. Create a new browser bookmark
4. Paste the code into the bookmark’s **URL** field
5. Click the bookmark on any website to toggle SpeedyWebsite

## Usage
- Click **Switch** in the floating UI to change modes
- Press **Ctrl + Shift + M** to toggle modes from the keyboard
- Mode preference is remembered per website
- Click **Off** to remove all injected styles and shortcuts

## Modes
- **Gentle**  
  Reduces animation duration while preserving essential UI behavior

- **Aggressive**  
  Disables nearly all animations and transitions for maximum smoothness

## Compatibility
- Chrome, Edge, Firefox
- Safari (may require manual bookmark editing)

## Notes
- SpeedyWebsite improves perceived responsiveness, not network speed
- Effects are limited to the current page and can be removed at any time

## License
MIT
