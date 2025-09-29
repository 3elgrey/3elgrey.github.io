# Branch Protection Setup Guide

To ensure tests block merges when they fail, you need to configure branch protection rules in your GitHub repository.

## 🔒 Setup Instructions

### 1. Navigate to Repository Settings
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Click on **Branches** in the left sidebar

### 2. Add Branch Protection Rule for `main`

Click **Add rule** and configure:

**Branch name pattern:** `main`

**Protect matching branches:**
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: `1`
  - ✅ Dismiss stale reviews when new commits are pushed
  - ✅ Require review from code owners (optional)

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - **Required status checks:** Add these checks:
    - `Run Tests`
    - `Validate Project Structure` 
    - `Security Scan`
    - `All Tests Passed`

- ✅ **Require conversation resolution before merging**
- ✅ **Require signed commits** (optional, for security)
- ✅ **Include administrators** (recommended)

### 3. Add Branch Protection Rule for `develop`

Click **Add rule** and configure:

**Branch name pattern:** `develop`

**Protect matching branches:**
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - **Required status checks:** Add these checks:
    - `Run Tests`
    - `Validate Project Structure`
    - `Security Scan`
    - `All Tests Passed`

- ✅ **Include administrators**

## 🚫 What Gets Blocked

With these rules in place:

1. **Direct pushes to `main`** are blocked (must use PR)
2. **PRs cannot be merged** if any test fails
3. **PRs cannot be merged** if branch is not up to date
4. **Deployments are blocked** if tests fail

## ✅ Required Status Checks

The following checks must pass for merge to be allowed:

| Check Name | What it validates |
|------------|------------------|
| `Run Tests` | Unit tests, integration tests, coverage |
| `Validate Project Structure` | HTML/CSS/JS file validation |
| `Security Scan` | npm audit for vulnerabilities |
| `All Tests Passed` | Combined success of all checks |

## 🔧 Additional Options

### Automatically Delete Head Branches
- Go to **Settings** > **General**
- Scroll to **Pull Requests**
- ✅ Enable "Automatically delete head branches"

### Require Linear History (Optional)
- In branch protection rules
- ✅ Enable "Require linear history"
- This prevents merge commits and requires rebase/squash

## 🚀 Workflow Integration

Once configured, the workflow will:

1. **On every commit/PR:** Run all tests
2. **If tests pass:** Allow merge and trigger deployment
3. **If tests fail:** Block merge and show failed checks
4. **After merge:** Deploy to appropriate environment

## 📋 Testing the Setup

1. Create a branch with intentionally broken tests
2. Open a PR to `main`
3. Verify that merge is blocked with failed status checks
4. Fix the tests and verify merge becomes available

## 🆘 Troubleshooting

**Q: Status checks don't appear in required checks list**
A: The checks only appear after the workflow has run at least once. Push a commit to trigger the workflow first.

**Q: Can't find the workflow names**
A: The workflow must complete successfully once for the job names to be available in the dropdown.

**Q: Administrators can bypass rules**
A: Uncheck "Include administrators" if you want to bypass rules, but this is not recommended for production.
