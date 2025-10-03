# Email Notification Setup Guide

This guide explains how to set up email notifications for GitHub Actions workflow failures and successes.

## 📧 **Notification Types**

Your workflows will now send email notifications for:

1. **🚨 Test Failures** - When CI tests fail
2. **🚫 Deployment Blocked** - When deployment is blocked due to test failures  
3. **✅ Deployment Success** - When deployment completes successfully
4. **💬 Slack Notifications** - Optional Slack integration

## 🔐 **Required GitHub Secrets**

You need to set up these secrets in your GitHub repository:

### **Navigate to Secrets:**
1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### **Required Secrets:**

#### **`EMAIL_USERNAME`**
- **Value:** Your Gmail address (e.g., `your.email@gmail.com`)
- **Purpose:** SMTP authentication username

#### **`EMAIL_PASSWORD`** 
- **Value:** Gmail App Password (NOT your regular password)
- **Purpose:** SMTP authentication password
- **⚠️ Important:** Use App Password, not regular password

#### **`NOTIFICATION_EMAIL`**
- **Value:** Email address to receive notifications (can be same as EMAIL_USERNAME)
- **Purpose:** Recipient email for all notifications

### **Optional Secrets:**

#### **`SLACK_WEBHOOK_URL`** (Optional)
- **Value:** Your Slack webhook URL
- **Purpose:** Send notifications to Slack channel

## 🔑 **Gmail App Password Setup**

Since Gmail requires App Passwords for SMTP authentication:

### **Step 1: Enable 2-Factor Authentication**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled

### **Step 2: Generate App Password**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **2-Step Verification**
3. Scroll down to **App passwords**
4. Click **Select app** → **Other (Custom name)**
5. Enter: `GitHub Actions Portfolio`
6. Click **Generate**
7. **Copy the 16-character password** (this is your `EMAIL_PASSWORD`)

### **Step 3: Add to GitHub Secrets**
1. Go to your repository → Settings → Secrets and variables → Actions
2. Add `EMAIL_PASSWORD` with the 16-character app password

## 📋 **Complete Setup Checklist**

- [ ] **Gmail App Password created**
- [ ] **`EMAIL_USERNAME`** secret added (your Gmail)
- [ ] **`EMAIL_PASSWORD`** secret added (16-char app password)
- [ ] **`NOTIFICATION_EMAIL`** secret added (recipient email)
- [ ] **Workflows pushed** to repository
- [ ] **Test the setup** (create failing test)

## 📧 **Email Templates**

### **Test Failure Email:**
```
Subject: 🚨 Portfolio CI/CD - Tests Failed on main

Content:
- Repository and branch info
- Commit details
- Test results breakdown
- Links to workflow run and commit
- Clear action items
```

### **Deployment Success Email:**
```
Subject: ✅ Portfolio Deployed Successfully to Production

Content:
- Deployment environment
- Commit details
- Links to live site
- Workflow run details
```

### **Deployment Blocked Email:**
```
Subject: 🚫 Portfolio Deployment Blocked - Tests Failed on main

Content:
- Failed test information
- Links to failed test run
- Clear next steps
```

## 🧪 **Testing Notifications**

### **Test Email Notifications:**

1. **Create a failing test:**
```javascript
// Add to any test file
test('intentional failure for testing notifications', () => {
  expect(true).toBe(false); // This will fail
});
```

2. **Push to repository:**
```bash
git add .
git commit -m "test: add failing test for notification testing"
git push
```

3. **Check your email** - You should receive a test failure notification

4. **Fix the test and push again** - You should receive success notifications

### **Test Deployment Notifications:**

1. **Push to main branch** (after tests pass)
2. **Check email** for deployment success notification

## 🔧 **Customization Options**

### **Change Email Provider:**
To use a different email provider, update the SMTP settings:

```yaml
server_address: smtp.outlook.com  # For Outlook
server_port: 587
# OR
server_address: smtp.yahoo.com    # For Yahoo
server_port: 587
```

### **Customize Email Content:**
Edit the `html_body` sections in the workflow files to customize:
- Subject lines
- Email content
- Styling
- Additional information

### **Add More Recipients:**
```yaml
to: ${{ secrets.NOTIFICATION_EMAIL }}, additional@email.com, team@company.com
```

### **Add CC/BCC:**
```yaml
cc: manager@company.com
bcc: archive@company.com
```

## 🚨 **Security Best Practices**

1. **✅ Use App Passwords** - Never use regular Gmail passwords
2. **✅ Limit Secret Access** - Only add necessary secrets
3. **✅ Regular Rotation** - Rotate app passwords periodically
4. **✅ Monitor Usage** - Check GitHub Actions logs for any issues
5. **❌ Never Commit Secrets** - Secrets should only be in GitHub repository settings

## 🛠️ **Troubleshooting**

### **Common Issues:**

**Q: Email not being sent**
A: Check that all three secrets are set correctly and app password is valid

**Q: Gmail authentication failed**
A: Ensure 2FA is enabled and you're using App Password, not regular password

**Q: Notifications not triggering**
A: Verify the workflow conditions (`if: failure()`) and job dependencies

**Q: Wrong recipient**
A: Check `NOTIFICATION_EMAIL` secret value

**Q: Emails going to spam**
A: Add GitHub Actions sender to your email whitelist

### **Debug Steps:**
1. Check GitHub Actions logs for email sending errors
2. Verify all secrets are set in repository settings
3. Test with a simple failing test
4. Check email spam/junk folders

## 📊 **Expected Behavior**

After setup, you'll receive emails for:

- ✅ **Every test failure** with detailed breakdown
- ✅ **Every deployment success** with live site link  
- ✅ **Every deployment block** with failure details
- ✅ **Rich HTML formatting** with clickable links
- ✅ **Immediate notifications** (within 1-2 minutes)

---

**Need Help?** Check the workflow logs in GitHub Actions for detailed error messages.
