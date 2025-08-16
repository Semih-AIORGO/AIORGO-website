# AIORGO Website

A modern, responsive website for AIORGO - a professional mobile app development and publishing company specializing in iOS and Android applications.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Multi-page Website**: Home, About, Services, Portfolio, Careers, and Contact pages
- **Interactive Elements**: Smooth scrolling, hover effects, and dynamic content
- **Theme Support**: Dark and bright theme options
- **Performance Optimized**: Fast loading times and optimized assets

## 📁 Project Structure

```
Aiorgo_Website/
├── index.html          # Homepage
├── about.html          # About Us page
├── services.html       # Services page
├── portfolio.html      # Portfolio page
├── career.html         # Careers page
├── contact.html        # Contact page
├── style.css           # Main stylesheet
├── script.js           # JavaScript functionality
├── assets/             # Images, videos, and other assets
│   ├── logo.png
│   ├── banner.mp4
│   ├── banner.png
│   ├── about-us.png
│   └── whip_logo.png
├── package.json        # Project configuration
├── wrangler.toml       # Cloudflare Pages configuration
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter font family)

## 🚀 Deployment

### Cloudflare Pages

This project is configured for deployment on Cloudflare Pages:

1. **Connect Repository**: Link your GitHub repository to Cloudflare Pages
2. **Build Settings**:
   - **Build command**: `echo 'Static site - no build required'`
   - **Build output directory**: `/` (root)
   - **Root directory**: `/` (root)
3. **Environment Variables**: None required
4. **Deploy**: Your site will be automatically deployed

### Local Development

```bash
# Clone the repository
git clone https://github.com/Semih-AIORGO/AIORGO-website.git

# Navigate to project directory
cd AIORGO-website

# Start local development server
python -m http.server 8000

# Or using npm
npm run dev
```

## 📱 Pages

### Homepage (`index.html`)
- Hero section with video background
- Featured apps showcase
- Call-to-action section

### About (`about.html`)
- Company story and mission
- Team information
- Company values

### Services (`services.html`)
- Service offerings
- Development process
- Technology stack

### Portfolio (`portfolio.html`)
- Project showcase
- App demos
- Success stories

### Careers (`career.html`)
- Job opportunities
- Company culture
- Application process

### Contact (`contact.html`)
- Contact information
- Contact form
- Office location

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization:

```css
:root {
  --primary-color: #000000;
  --secondary-color: #111111;
  --accent-color: #ffffff;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
}
```

### Themes
The website supports both dark and bright themes, automatically switching based on user preference.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **AIORGO Team** - Mobile app development and publishing specialists

## 🌐 Live Site

Visit the live website: [AIORGO Website](https://aiorgo.com)

---

Built with ❤️ by the AIORGO Team
