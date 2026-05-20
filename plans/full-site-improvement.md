# Implementation Plan - Full Site Improvement

Analysis of `cc.html` revealed several areas for improvement to make it a more professional and functional corporate site.

## 1. Metadata & SEO Improvements
- Add `<link rel="canonical">`.
- Add Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Card meta tags.
- Add a favicon (using an emoji/base64 to stay single-file).

## 2. UI/UX Enhancements
- **Mobile Menu**: Add a hamburger menu for screens below 768px.
- **RTL Support**: Refactor RTL handling to use CSS logical properties (`margin-inline`, etc.) and `[dir="rtl"]` selectors instead of manual JS style overrides.
- **Dynamic Year**: Automatically update the copyright year in the footer.
- **WhatsApp Integration**: Add a direct link to WhatsApp for the phone number.
- **Scroll Improvements**: Add a "Back to Top" button.

## 3. Form & Accessibility
- **Form Labels**: Ensure labels are properly associated and accessible.
- **Validation**: Improve visual feedback for form errors.
- **Success State**: Make the success message more prominent.

## 4. Code Quality & Maintainability
- **i18n Refactoring**: Centralize language-specific logic and improve the `setLanguage` function.
- **CSS Cleanup**: Consolidate repetitive styles and ensure consistent use of variables.

## 5. Functionality Brainstorming (Optional/Future)
- **Email Service**: Integration with an API-based mailer (requires backend/external service).
- **Modal Requisites**: Show full company requisites in a modal instead of just a card.

## Implementation Steps

### Step 1: Scout & Backup
- Create a checkpoint before changes.
- Identify exact insertion points in `cc.html`.

### Step 2: Meta & Global Fixes
- Add meta tags to `<head>`.
- Add dynamic year script.
- Add favicon.

### Step 3: CSS Refactoring (RTL & Logical Properties)
- Update `:root` and global styles.
- Implement `[dir="rtl"]` specific overrides.

### Step 4: UI Components
- Implement Hamburger menu (HTML/CSS/JS).
- Implement Back to Top button.
- Add WhatsApp link.

### Step 5: Form & i18n
- Refactor `setLanguage` and form handler.
- Update translations for new components.

### Step 6: Verification
- Test all languages (especially RTL).
- Test mobile responsiveness.
- Check Console for errors.
