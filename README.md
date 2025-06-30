<div align="center">

# 🍽️ FoodieExpress

### Premium Food Delivery & Nutrition Platform for Bangladesh

*Discover delicious food, track your nutrition, and enjoy seamless delivery across Dhaka*

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-green.svg)](https://openai.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🛠️ Setup](#installation) • [🤝 Contributing](#contributing)

</div>

---

## 🌟 Overview

FoodieExpress is a cutting-edge food delivery platform specifically designed for Bangladesh, featuring AI-powered nutrition assistance, comprehensive restaurant management, and seamless user experience. Built with modern web technologies and enhanced with OpenAI integration for intelligent food recommendations.

### 🎯 Key Highlights

- **🇧🇩 Bangladesh-Focused**: Tailored for local cuisine, payment methods, and cultural preferences
- **🤖 AI-Powered Assistant**: Advanced nutrition advice and food recommendations using OpenAI
- **📱 Responsive Design**: Beautiful, mobile-first interface with premium aesthetics
- **🍽️ Comprehensive Platform**: Restaurant discovery, menu browsing, order tracking, and nutrition management
- **🔐 Secure Payments**: Multiple local payment methods including bKash, Nagad, Rocket
- **📊 Admin Dashboard**: Complete restaurant and order management system

---

## ✨ Features

### 🍕 Core Food Delivery

<table>
<tr>
<td width="50%">

#### Restaurant Discovery
- **Smart Filtering**: Cuisine type, price range, delivery time
- **Location-Based Search**: Find restaurants near you
- **Rating & Reviews**: Community-driven restaurant ratings
- **Real-Time Availability**: Live restaurant status and hours

</td>
<td width="50%">

#### Menu & Ordering
- **Detailed Menu Items**: Nutrition info, allergens, customizations
- **Smart Cart Management**: Quantity updates, special instructions
- **Multiple Payment Options**: bKash, Nagad, Rocket, Cards, Cash on Delivery
- **Order Tracking**: Real-time status updates with rider information

</td>
</tr>
</table>

### 🤖 AI-Powered Features

<table>
<tr>
<td width="50%">

#### Enhanced AI Assistant
- **OpenAI Integration**: GPT-3.5 powered food recommendations
- **Cultural Intelligence**: Deep understanding of Bengali cuisine
- **Voice Commands**: Natural language processing for orders
- **Personalized Advice**: Based on user profile and health goals

</td>
<td width="50%">

#### Nutrition Intelligence
- **Calorie Tracking**: BMR/TDEE calculations with meal planning
- **Macro Analysis**: Protein, carbs, fat breakdown
- **Health Goals**: Weight loss, muscle building, maintenance
- **Dietary Restrictions**: Vegetarian, vegan, halal, allergies

</td>
</tr>
</table>

### 📊 Advanced Management

<table>
<tr>
<td width="50%">

#### User Management
- **Profile System**: Health metrics, preferences, goals
- **Order History**: Track past orders and reorder favorites
- **Address Management**: Multiple delivery locations
- **Loyalty Program**: Points and rewards system

</td>
<td width="50%">

#### Admin Dashboard
- **Restaurant Management**: Approval, monitoring, analytics
- **Order Oversight**: Real-time order tracking and management
- **User Analytics**: Registration, activity, and engagement metrics
- **Revenue Tracking**: Financial insights and reporting

</td>
</tr>
</table>

### 🗺️ Location & Discovery

- **Interactive Maps**: Google Maps integration for restaurant locations
- **Delivery Zones**: Dhaka area coverage with zone-based pricing
- **Location Services**: GPS-based restaurant discovery
- **Delivery Tracking**: Real-time rider location updates

### 📚 Digital Cookbook

- **Recipe Database**: Comprehensive collection of Bengali and international recipes
- **Ingredient Guide**: Detailed nutritional information and cooking tips
- **Skill Levels**: Recipes categorized by cooking difficulty
- **Cultural Insights**: Traditional Bengali cooking methods and ingredients

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Vite 5.4.2** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library

### AI & APIs
- **OpenAI GPT-3.5** - Advanced AI assistant
- **Google Maps API** - Location services and mapping
- **Geolocation API** - User location detection

### State Management & Utilities
- **Custom Hooks** - Reusable state logic
- **Local Storage** - Persistent user data
- **Context API** - Global state management

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **OpenAI API Key** (for AI features)
- **Google Maps API Key** (for location features)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/foodie-express.git
   cd foodie-express
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure API Keys**
   ```env
   # OpenAI Configuration
   VITE_OPENAI_API_KEY=sk-your_openai_api_key_here
   
   # Google Maps Configuration  
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   
   # Optional AI Services
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   ```
   http://localhost:5173
   ```

### 🔑 API Key Setup

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to your `.env` file as `VITE_OPENAI_API_KEY`

#### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps JavaScript API
3. Create credentials and add to `.env` as `VITE_GOOGLE_MAPS_API_KEY`

---

## 📱 Usage

### For Customers

1. **Browse Restaurants**: Filter by cuisine, location, and ratings
2. **Order Food**: Add items to cart with customizations
3. **Track Orders**: Real-time updates from preparation to delivery
4. **AI Assistant**: Get personalized food and nutrition advice
5. **Manage Profile**: Set health goals and dietary preferences

### For Administrators

1. **Dashboard Access**: Login with admin credentials
2. **Restaurant Management**: Approve new restaurants and monitor performance
3. **Order Oversight**: Track all orders and resolve issues
4. **Analytics**: View revenue, user engagement, and growth metrics
5. **User Support**: Manage customer inquiries and feedback

### Demo Credentials

```
Admin User:
Email: admin@foodieexpress.com
Password: password123

Regular User:
Email: john@example.com
Password: password123
```

---

## 🏗️ Project Structure

```
foodie-express/
├── 📁 public/                 # Static assets
├── 📁 src/
│   ├── 📁 components/         # React components
│   │   ├── 📁 admin/         # Admin dashboard components
│   │   ├── 📁 ai/            # AI assistant components
│   │   ├── 📁 auth/          # Authentication components
│   │   ├── 📁 cart/          # Shopping cart components
│   │   ├── 📁 common/        # Shared components
│   │   ├── 📁 cookbook/      # Recipe and ingredient components
│   │   ├── 📁 filters/       # Search and filter components
│   │   ├── 📁 map/           # Map and location components
│   │   ├── 📁 menu/          # Menu item components
│   │   ├── 📁 nutrition/     # Nutrition tracking components
│   │   ├── 📁 payment/       # Payment processing components
│   │   ├── 📁 profile/       # User profile components
│   │   ├── 📁 restaurant/    # Restaurant components
│   │   └── 📁 tracking/      # Order tracking components
│   ├── 📁 config/            # Configuration files
│   ├── 📁 data/              # Mock data and databases
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 services/          # API services and utilities
│   ├── 📁 types/             # TypeScript type definitions
│   ├── 📁 utils/             # Utility functions
│   └── 📄 App.tsx            # Main application component
├── 📄 .env.example           # Environment variables template
├── 📄 package.json           # Dependencies and scripts
├── 📄 tailwind.config.js     # Tailwind CSS configuration
├── 📄 tsconfig.json          # TypeScript configuration
└── 📄 vite.config.ts         # Vite configuration
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#ea580c) - Warm, appetizing, energetic
- **Secondary**: Red (#dc2626) - Accent and highlights
- **Success**: Green (#16a34a) - Confirmations and positive actions
- **Warning**: Yellow (#eab308) - Alerts and notifications
- **Error**: Red (#dc2626) - Errors and critical actions
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable, 150% line height
- **UI Text**: Clean, consistent sizing

### Components
- **Cards**: Subtle shadows, rounded corners
- **Buttons**: Consistent padding, hover states
- **Forms**: Clear labels, validation states
- **Navigation**: Intuitive, accessible

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes |
| `VITE_ANTHROPIC_API_KEY` | Anthropic API key (optional) | No |
| `VITE_GEMINI_API_KEY` | Google Gemini API key (optional) | No |

### Build Configuration

```bash
# Development
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview

# Linting
npm run lint
```

---

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API and service testing
- **E2E Tests**: Full user journey testing

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the deployment prompts

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Code Style

- Use ESLint configuration
- Follow React hooks patterns
- Maintain component modularity
- Use meaningful variable names

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for providing advanced AI capabilities
- **Google Maps** for location services
- **Pexels** for high-quality food photography
- **Lucide** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **React Community** for excellent documentation and support

---

## 📞 Support

### Get Help

- 📧 **Email**: support@foodieexpress.com
- 💬 **Discord**: [Join our community](https://discord.gg/foodieexpress)
- 📖 **Documentation**: [Full docs](https://docs.foodieexpress.com)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/foodie-express/issues)

### FAQ

**Q: How do I get an OpenAI API key?**
A: Visit [OpenAI Platform](https://platform.openai.com/api-keys) and create an account.

**Q: Is this app free to use?**
A: Yes, the app is open source and free to use. API costs may apply for OpenAI usage.

**Q: Can I contribute to the project?**
A: Absolutely! Check our [Contributing Guidelines](#contributing) to get started.

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Made with ❤️ for the Bangladesh food community**

[⬆ Back to Top](#-foodieexpress)

</div>