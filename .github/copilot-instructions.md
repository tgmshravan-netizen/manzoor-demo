# Copilot Instructions for Manzoor Khan Makeup Artist Website

## Project Overview
This is a **multi-page HTML/CSS/JavaScript website** for Manzoor Khan, a Bollywood makeup artist and hair stylist. The site showcases services, portfolio, testimonials, and booking capabilities across 30+ HTML pages with responsive design.

**Tech Stack:**
- HTML5 + Bootstrap 5 (CSS framework)
- CSS3 (with custom properties/variables)
- jQuery + Vanilla JavaScript (via `THEMEMASCOT` namespace)
- Third-party libraries: Swiper, GSAP, Font Awesome, Splitting.js

## Architecture & Page Structure

### Homepage Variants
The codebase maintains **multiple index versions** for different layouts:
- `index.html` - Primary homepage (dark header design)
- `index-1.html`, `index-2.html`, `index-3.html`, etc. - Alternative layouts
- `index-[X]-dark.html` - Dark theme variants
- `index-[X]-rtl.html` - Right-to-left (Arabic/RTL languages) support
- `index-[X]-single.html` - Single-column mobile view

**Pattern:** When modifying homepage structure, update all variants consistently. RTL versions use `<html dir="rtl">` and require mirrored CSS adjustments.

### Service Pages
- `Bridal-Makeup.html`, `Celebrity-&-Party-Makeup.html`, `Hair-Styling.html` - Service detail pages
- `Makeup.html`, `Nails.html` - Additional service pages
- All follow identical header/sidebar/footer structure for consistency

### Supporting Pages
- Navigation: `page-about.html`, `page-services.html`, `page-contact.html`
- Information: `page-gallery.html`, `page-testimonial.html`, `page-pricing.html`, `page-faq.html`, `page-team.html`
- E-commerce: `shop-*.html` (product listings, cart, checkout)
- Blog: `news-grid.html`, `news-details.html`
- Error: `page-404.html`

## CSS Architecture

### CSS Organization
**Master stylesheet:** `css/style.css` (13,700+ lines)
**Modular imports:**
```css
@import url("_choose-section.css");
@import url("_service-carousel.css");
@import url("_pricing-responsive.css");
```

### CSS Variables (in `:root`)
```css
--theme-color1: #d9bb73;          /* Gold accent */
--theme-color2: #1c1a1d;          /* Dark text */
--theme-light-background: #f8f6f1;
--title-font: "Literata", serif;  /* Headings */
--text-font: "Mulish", serif;     /* Body text */
```

**Convention:** Use CSS variables for colors, not hex literals. This enables consistent theming and dark mode support.

### Responsive Breakpoints
Bootstrap 5 defaults used implicitly:
- `d-none d-xxl-inline-block` - Show only on extra-large screens
- `d-none d-lg-block` - Hide on mobile, show on desktop
- Grid uses `repeat(3, 1fr)` patterns (see `_pricing-responsive.css`)

## JavaScript Conventions

### THEMEMASCOT Namespace Pattern
All custom JavaScript is wrapped in `THEMEMASCOT = {}` object within an IIFE to prevent global pollution:

```javascript
var THEMEMASCOT = {};
(function ($) {
    "use strict";
    // All code here
})(jQuery);
```

### Key Modules (in `js/script.js`)

1. **RTL Detection:**
   ```javascript
   THEMEMASCOT.isRTL.check()  // Returns true if dir="rtl"
   THEMEMASCOT.isLTR.check()  // Returns true if LTR
   ```
   Used to conditionally apply CSS or swap image directions.

2. **Swiper Carousels:**
   ```javascript
   var sliderInit1 = new Swiper(".banner-two__slider", {
       loop: true,
       effect: "fade",
       autoplay: { delay: 7000 },
       navigation, pagination
   });
   ```
   - Banners use Swiper with fade effect
   - Product/portfolio sliders with different settings
   - Always check `data-animation` attributes on slides for animation support

3. **GSAP Animations:**
   ```javascript
   gsap.timeline({
       scrollTrigger: {
           trigger: ".gsap__parallax",
           scrub: 1,
           start: "top bottom",
           end: "bottom top"
       }
   })
   ```
   - Parallax effects via `.gsap__parallax` class
   - Zoom parallax via `.gsap__parallax-zoom`
   - ScrollTrigger enables scroll-based animations

4. **Mobile Menu (MeanMenu):**
   ```javascript
   $(".header-area nav").meanmenu();
   ```
   Transforms navigation to mobile hamburger menu automatically.

5. **Fixed Header:**
   Adds `menu-fixed` class when scrolled > 150px. Applies `animated fadeInDown` animation.

## Data Attributes & Animation Binding

### Animation Data Attributes
```html
<element 
    data-animation="fadeInUp"
    data-delay="0.2s"
    data-duration="0.8s">
```
JavaScript reads these to dynamically apply GSAP animations with custom timing.

### Preloader System
```html
<div id="preloader">
    <div class="animation-preloader">
        <div class="txt-loading">
            <span data-text-preloader="M" class="letters-loading"></span>
```
Preloader auto-hides on page load via `$("#preloader").addClass("loaded")`.

## File Organization Conventions

- **CSS:** Partial files with underscore prefix (`_*.css`) imported into `style.css`
- **Images:** Organized by component: `/images/banner/`, `/images/blog/`, `/images/product/`, etc.
- **JavaScript:** Single `script.js` entry point + utility libraries
- **Fonts:** WebFont files in `/webfonts/` (Literata, Mulish)
- **Icons:** FontAwesome via CSS classes, no icon font files directly referenced

## Form Handling

**Contact/booking form backend:** `includes/sendmail.php`
```php
{"message":"An <strong>unexpected error</strong> occured...","status":"false"}
```
Forms submit to PHP backend for email processing. Always validate client-side with `jquery.validate.min.js` before server submission.

## Common Patterns to Follow

1. **Always use Bootstrap utility classes** for layout (grid, spacing, display)
2. **Link hover states** use theme color (`#d9bb73`), not default blue
3. **Shadow effects** for cards: `box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08)`
4. **Transitions:** Always include `transition: all 0.3s ease` on interactive elements
5. **Image lazy loading:** Use `loading="lazy"` on images below the fold
6. **Accessibility:** Maintain semantic HTML; use `aria-label` for icon-only buttons

## Customization Hotspots

- **Colors:** Edit `:root` variables in `style.css` lines 46-79
- **Fonts:** Change `--title-font` and `--text-font` in CSS variables
- **Header styling:** `css/style.css` section "3.04 --> header"
- **Service carousel:** `css/_service-carousel.css` (3-column layout)
- **Pricing grid:** `css/_pricing-responsive.css` (3-column grid with hover effects)
- **Animation timings:** Adjust `data-delay` and `data-duration` attributes on elements

## Development Notes

- **jQuery 3.x** is required (`jquery.js` included)
- **No build process:** Changes to CSS/JS apply directly in browser
- **Testing:** Ensure all 6+ index variants load without errors
- **RTL Testing:** Check RTL pages display correctly (reversed layout, RTL text)
- **Mobile Testing:** Bootstrap 5 is mobile-first; test responsiveness on actual devices
- **Performance:** Minimize custom JavaScript; prefer CSS animations where possible

---

**Last Updated:** February 2026  
**Contact:** Manzoor Khan makeup artist portfolio website
