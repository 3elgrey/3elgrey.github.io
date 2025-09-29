# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the portfolio website.
This is for testing workflow testing checks

## Workflows

### 1. Portfolio CI/CD Pipeline (`portfolio-ci-cd.yml`)
**Triggers:** Push to main/develop, Pull Requests, Manual dispatch

**Jobs:**
- **Validate**: Code quality checks (HTML, CSS, JS validation)
- **Security**: Security scanning with Trivy
- **Performance**: Lighthouse CI performance testing
- **Deploy**: Automatic deployment to GitHub Pages
- **Notify**: Status notifications

### 2. Dependency Updates (`dependency-update.yml`)
**Triggers:** Weekly schedule (Mondays 9 AM UTC), Manual dispatch

**Purpose:** Checks for dependency updates and security patches

### 3. Backup (`backup.yml`)
**Triggers:** Daily schedule (2 AM UTC), Manual dispatch

**Purpose:** Creates automated backups of the portfolio files

## Configuration Files

- `.htmlvalidate.json` - HTML validation rules
- `.stylelintrc.json` - CSS linting rules
- `.eslintrc.json` - JavaScript linting rules
- `package.json` - Node.js dependencies and scripts
- `_config.yml` - Jekyll/GitHub Pages configuration

## Usage

### Local Development
```bash
# Install dependencies
npm install

# Start local server
npm start

# Validate code
npm run validate

# Fix linting issues
npm run lint:css
npm run lint:js
```

### Manual Workflow Triggers
1. Go to Actions tab in GitHub
2. Select the workflow you want to run
3. Click "Run workflow"
4. Choose the branch and click "Run workflow"

## Workflow Status

- ✅ **Validate**: Ensures code quality and standards
- ✅ **Security**: Scans for vulnerabilities
- ✅ **Performance**: Tests site performance
- ✅ **Deploy**: Automatically deploys to GitHub Pages
- ✅ **Backup**: Creates regular backups

## Customization

To customize these workflows:

1. Edit the respective `.yml` files
2. Modify validation rules in config files
3. Update package.json scripts as needed
4. Adjust schedules in cron expressions

## Troubleshooting

### Common Issues

1. **Validation Failures**: Check the logs for specific error messages
2. **Deployment Issues**: Ensure GitHub Pages is enabled in repository settings
3. **Performance Issues**: Review Lighthouse CI results and optimize accordingly

### Getting Help

- Check the Actions tab for detailed logs
- Review the workflow files for configuration
- Consult GitHub Actions documentation for advanced features

