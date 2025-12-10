# Sneaca Pitch Deck - Web Application

A beautiful, interactive web-based presentation for the Sneaca UBC Venture Founder Interview.

## Features

### 🎨 Beautiful Design
- Modern gradient backgrounds
- Smooth slide transitions
- Responsive design (desktop, tablet, mobile)
- Professional typography with Inter and Playfair Display fonts
- Color-coded sections for easy visual navigation

### ⌨️ Keyboard Shortcuts
- `→` or `Space` - Next slide
- `←` - Previous slide
- `Home` - Jump to first slide
- `End` - Jump to last slide
- `1-9` - Jump directly to slide number
- `T` - Toggle timer pause/resume
- `F` - Toggle fullscreen mode
- `?` - Show/hide keyboard shortcuts help
- `A` - Toggle auto-advance mode (30s per slide)

### 📱 Touch Support
- Swipe left for next slide
- Swipe right for previous slide
- Fully responsive on mobile devices

### ⏱️ Presentation Timer
- Automatic timer starts when presentation loads
- Shows elapsed time in minutes:seconds format
- Color-coded warnings:
  - White: Under 6 minutes
  - Yellow: 6-7 minutes (approaching time limit)
  - Red: Over 7 minutes

### 📊 Progress Tracking
- Visual progress bar at top of screen
- Slide counter (e.g., "3 / 12")
- Analytics tracking for presentation insights

### ♿ Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- Reduced motion support for users with motion sensitivity
- High contrast text for readability

## Installation

### Option 1: Open Locally
1. Download all files (`index.html`, `styles.css`, `script.js`)
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
3. Press `F` for fullscreen mode

### Option 2: Deploy to GitHub Pages
1. Push files to a GitHub repository
2. Go to repository Settings → Pages
3. Select branch (usually `main`) and `/pitch-deck` folder
4. Your presentation will be available at: `https://[username].github.io/[repo-name]/`

### Option 3: Local Web Server
```bash
# Using Python 3
cd pitch-deck
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

### Presenting
1. Open the presentation in fullscreen mode (press `F`)
2. Use arrow keys or spacebar to navigate
3. Keep an eye on the timer (target: 7 minutes)
4. The progress bar shows your position in the presentation

### Practicing
1. Use the timer to track your pacing
2. Press `T` to pause/resume timer if needed
3. Jump to specific slides using number keys (1-9)
4. Auto-advance mode (`A`) helps simulate timed practice

### Mobile Presenting
- Full touch support with swipe gestures
- All features work on tablets and phones
- Optimized layouts for smaller screens

## File Structure

```
pitch-deck/
│
├── index.html          # Main HTML structure with all 12 slides
├── styles.css          # Complete styling and animations
├── script.js           # Interactive features and navigation
└── README.md           # This file
```

## Slide Structure

1. **Title Slide** - Sneaca branding and tagline
2. **Team** - Founder background and unfair advantage
3. **60-Second Intro** - Elevator pitch narrative
4. **Problem** - Current custom footwear gap
5. **Customer** - Three target segments
6. **Current Solutions** - Competitive alternatives and their failures
7. **Solution** - How Sneaca works (3-step process)
8. **Why Now** - Three converging forces (FIFA 2026, manufacturing, market)
9. **Market Size** - TAM, SAM, SOM breakdown
10. **Competitive Landscape** - Direct/indirect competition and moat
11. **Business Model** - Pricing, unit economics, path to $100K
12. **The Ask** - $50K funding request and use of funds

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #1a1a2e;
    --secondary: #16213e;
    --accent: #0f3460;
    --highlight: #e94560;
    --success: #00d9ff;
    --warning: #ffd700;
}
```

### Adding Content
Each slide is a `<section class="slide">` in `index.html`. Add new slides following the same structure:

```html
<section class="slide" data-slide="13">
    <div class="slide-content">
        <h2 class="slide-title">Your Title</h2>
        <!-- Your content here -->
    </div>
</section>
```

Don't forget to update `totalSlides` in `script.js`:
```javascript
this.totalSlides = 13; // Update this number
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight: ~100KB total (HTML + CSS + JS)
- No external dependencies (except Google Fonts)
- Optimized animations using CSS transforms
- Smooth 60fps transitions

## Tips for Best Presentation

1. **Practice with the timer** - Aim for 6:30 to stay under 7 minutes
2. **Use fullscreen mode** - Press `F` for professional presentation
3. **Know your shortcuts** - Familiarize yourself with keyboard navigation
4. **Test beforehand** - Open the presentation on the actual computer you'll use
5. **Have backup** - Download as PDF or have USB drive ready

## Hidden Features

- **Konami Code**: Try entering ↑↑↓↓←→←→BA on your keyboard for a surprise!
- **Console Logging**: Open browser console (F12) to see detailed analytics
- **Presenter Notes**: Press `N` (coming soon feature)

## Troubleshooting

### Slides won't advance
- Ensure JavaScript is enabled in your browser
- Check console (F12) for errors
- Try refreshing the page

### Fonts not loading
- Ensure internet connection (fonts load from Google Fonts)
- Or add fallback fonts in CSS

### Timer not working
- Check if JavaScript is blocked
- Try pressing `T` to toggle timer

### Fullscreen not working
- Some browsers require user gesture (press `F` instead of auto-fullscreen)
- Check browser permissions

## Credits

**Design & Development**: Sneaca Team
**Framework**: Vanilla JavaScript (no dependencies!)
**Fonts**: Google Fonts (Inter, Playfair Display)
**Version**: 1.0.0

## License

© 2025 Sneaca. All rights reserved.

---

## Quick Start Checklist

- [ ] Download all 3 files (HTML, CSS, JS)
- [ ] Open `index.html` in browser
- [ ] Press `F` for fullscreen
- [ ] Practice presentation with timer
- [ ] Familiarize yourself with keyboard shortcuts
- [ ] Test on actual presentation device
- [ ] Have backup plan (PDF export or USB drive)

**Ready to present?** Press `Space` to begin! 🚀

---

*Built with ❤️ for the UBC Innovation Venture Founder Interview*
