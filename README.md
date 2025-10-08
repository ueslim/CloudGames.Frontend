# CloudGames Frontend

A modern Angular 18 frontend application for the CloudGames platform, designed for deployment on Azure Static Web Apps with Azure API Management integration.

## Features

- **Angular 18** with TypeScript
- **Bootstrap 5** for responsive UI
- **JWT Authentication** with Auth0
- **Azure API Management** integration
- **Production-ready** build configuration

## Prerequisites

- Node.js 18+ 
- npm 9+
- Azure CLI (for deployment)
- Azure Static Web Apps resource
- Azure API Management instance

## Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd CloudGames.Frontend
   npm install
   ```

2. **Configure environment:**
   - Update `src/environments/environment.ts` with your local API endpoints
   - Update `src/environments/environment.prod.ts` with your Azure APIM endpoints

3. **Start development server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200`

## Azure Deployment

### Option 1: Azure Static Web Apps (Recommended)

1. **Create Azure Static Web App:**
   ```bash
   az staticwebapp create \
     --name cloudgames-frontend \
     --resource-group your-resource-group \
     --source https://github.com/your-org/CloudGames.Frontend \
     --location "East US 2" \
     --branch main
   ```

2. **Configure environment variables:**
   - Go to Azure Portal → Static Web Apps → Configuration
   - Add application settings:
     - `USERS_API`: Your APIM endpoint for users service
     - `GAMES_API`: Your APIM endpoint for games service  
     - `PAYMENTS_API`: Your APIM endpoint for payments service
     - `APIM_SUBSCRIPTION_KEY`: Your APIM subscription key

3. **Deploy via GitHub Actions:**
   - Push to main branch triggers automatic deployment
   - The workflow is configured in `.github/workflows/azure-static-web-apps.yml`

### Option 2: Azure App Service

1. **Build the application:**
   ```bash
   npm run build:prod
   ```

2. **Deploy to Azure App Service:**
   ```bash
   az webapp deploy --resource-group your-resource-group --name your-app-name --src-path ./dist/cloudgames-frontend
   ```

## API Management Integration

The application is configured to work with Azure API Management:

- **Development**: Uses local proxy configuration (`proxy.conf.json`)
- **Production**: Uses Azure APIM endpoints with subscription keys

### Environment Variables

Set these in your Azure Static Web Apps configuration:

```bash
USERS_API=https://your-apim.azure-api.net/users
GAMES_API=https://your-apim.azure-api.net/games  
PAYMENTS_API=https://your-apim.azure-api.net/payments
APIM_SUBSCRIPTION_KEY=your-subscription-key
```

## Project Structure

```
src/
├── app/
│   ├── modules/          # Feature modules
│   │   ├── auth/         # Authentication module
│   │   ├── games/        # Games management
│   │   └── payments/     # Payment processing
│   ├── shared/           # Shared components and services
│   │   ├── guards/       # Route guards
│   │   ├── interceptors/ # HTTP interceptors
│   │   └── services/     # API services
│   └── app.module.ts     # Root module
├── environments/         # Environment configurations
├── assets/              # Static assets
└── styles/              # Global styles
```

## Build Commands

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run linting

## Security Considerations

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- CORS configured for Azure APIM endpoints
- Security headers configured in `staticwebapp.config.json`
- Route guards protect admin functionality

## Troubleshooting

### Common Issues

1. **Build fails with memory issues:**
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   npm run build:prod
   ```

2. **APIM authentication fails:**
   - Verify subscription key is correct
   - Check APIM endpoint URLs
   - Ensure CORS is configured in APIM

3. **Routing issues in production:**
   - Verify `staticwebapp.config.json` configuration
   - Check that `base href="/"` is set in `index.html`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

[Your License Here]
