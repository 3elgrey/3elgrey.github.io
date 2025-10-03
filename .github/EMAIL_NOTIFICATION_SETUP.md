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

# Email Notification Troubleshooting Guide

If you're not receiving email notifications, follow this step-by-step troubleshooting guide.

## 🔍 **Step 1: Check GitHub Secrets**

First, verify that all required secrets are properly set:

### **Go to Repository Settings:**
1. Navigate to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Verify these secrets exist:

| Secret Name | Status | Description |
|-------------|--------|-------------|
| `EMAIL_USERNAME` | ❓ Required | Your Gmail address |
| `EMAIL_PASSWORD` | ❓ Required | Gmail App Password (16 chars) |
| `NOTIFICATION_EMAIL` | ❓ Required | Recipient email |
| `SLACK_WEBHOOK_URL` | ⚪ Optional | Slack webhook |

### **Common Secret Issues:**
- ❌ **Missing secrets** - Action will fail silently
- ❌ **Wrong Gmail password** - Use App Password, not regular password
- ❌ **Typos in email addresses** - Double-check spelling

## 🔍 **Step 2: Check Workflow Logs**

### **View GitHub Actions Logs:**
1. Go to your repository → **Actions** tab
2. Click on the failed workflow run
3. Look for the **"Notify Test Failure"** job
4. Check for error messages in the email sending step

### **Common Error Messages:**

**"Authentication failed"**
```
Error: Authentication failed
```
**Solution:** Check your Gmail App Password is correct

**"Invalid email address"**
```
Error: Invalid recipient email
```
**Solution:** Verify `NOTIFICATION_EMAIL` secret value

**"Connection timeout"**
```
Error: Connection timeout to smtp.gmail.com
```
**Solution:** Gmail SMTP might be blocked, try different settings

## 🔍 **Step 3: Gmail Configuration Check**

### **Verify Gmail Settings:**

1. **2-Factor Authentication Enabled?**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Ensure 2-Step Verification is ON

2. **App Password Generated?**
   - Go to Google Account → Security → 2-Step Verification
   - Scroll to "App passwords"
   - Should see "GitHub Actions Portfolio" or similar

3. **Less Secure Apps (if using regular password)**
   - ❌ **Don't use this** - Use App Password instead
   - Regular passwords don't work with SMTP

## 🔍 **Step 4: Test Email Configuration**

### **Create a Simple Test Workflow:**

Create `.github/workflows/email-test.yml`:

```yaml
name: Email Test

on:
  workflow_dispatch:  # Manual trigger

jobs:
  test-email:
    runs-on: ubuntu-latest
    
    steps:
    - name: Send test email
      uses: dawidd6/action-send-mail@v3
      with:
        server_address: smtp.gmail.com
        server_port: 587
        username: ${{ secrets.EMAIL_USERNAME }}
        password: ${{ secrets.EMAIL_PASSWORD }}
        subject: "Test Email from GitHub Actions"
        to: ${{ secrets.NOTIFICATION_EMAIL }}
        from: "GitHub Test <${{ secrets.EMAIL_USERNAME }}>"
        body: |
          This is a test email to verify the notification system is working.
          
          If you receive this email, your configuration is correct!
          
          Repository: ${{ github.repository }}
          Workflow: ${{ github.workflow }}
          Time: ${{ github.event.head_commit.timestamp }}
```

### **Run the Test:**
1. Push this file to your repository
2. Go to Actions → "Email Test" → "Run workflow"
3. Check your email within 2-3 minutes

## 🔍 **Step 5: Alternative Email Providers**

If Gmail isn't working, try these alternatives:

### **Outlook/Hotmail:**
```yaml
server_address: smtp-mail.outlook.com
server_port: 587
```

### **Yahoo:**
```yaml
server_address: smtp.mail.yahoo.com
server_port: 587
```

### **Custom SMTP:**
```yaml
server_address: your-smtp-server.com
server_port: 587
```

## 🔍 **Step 6: Check Email Delivery**

### **Common Places to Check:**

1. **📧 Inbox** - Primary location
2. **🗑️ Spam/Junk folder** - Very common
3. **📁 Promotions tab** (Gmail) - Sometimes filtered here
4. **🚫 Blocked senders** - Check if GitHub Actions is blocked

### **Email Filters:**
- Check if you have filters that might catch GitHub emails
- Look for filters on "GitHub Actions" or "notifications"

## 🔍 **Step 7: Debugging Steps**

### **Enable Debug Logging:**

Add this to your workflow for more detailed logs:

```yaml
- name: Debug email configuration
  run: |
    echo "Email Username: ${{ secrets.EMAIL_USERNAME }}"
    echo "Notification Email: ${{ secrets.NOTIFICATION_EMAIL }}"
    echo "Server: smtp.gmail.com:587"
    # Don't echo password for security
```

### **Test SMTP Connection:**

```yaml
- name: Test SMTP connection
  run: |
    # Test if we can reach Gmail SMTP
    nc -zv smtp.gmail.com 587 || echo "Cannot reach Gmail SMTP"
```

## 🔍 **Step 8: Common Solutions**

### **Solution 1: Recreate App Password**
1. Delete existing App Password in Google Account
2. Create new App Password
3. Update `EMAIL_PASSWORD` secret with new password

### **Solution 2: Use Different Email Action**
Replace `dawidd6/action-send-mail@v3` with:

```yaml
- name: Send email via SendGrid
  uses: peter-evans/sendgrid-action@v1
  with:
    api-key: ${{ secrets.SENDGRID_API_KEY }}
    to: ${{ secrets.NOTIFICATION_EMAIL }}
    from: notifications@yourdomain.com
    subject: Test Failed
    body: Your tests have failed.
```

### **Solution 3: Check Repository Permissions**
- Ensure Actions have permission to access secrets
- Go to Settings → Actions → General
- Check "Workflow permissions"

## 🆘 **Still Not Working?**

### **Quick Checklist:**
- [ ] All 3 required secrets are set
- [ ] Gmail 2FA is enabled
- [ ] App Password is generated and correct
- [ ] Email addresses are spelled correctly
- [ ] Checked spam/junk folders
- [ ] Workflow actually failed (check logs)
- [ ] Action has `if: failure()` condition

### **Get Help:**
1. **Check workflow logs** for specific error messages
2. **Test with manual email workflow** (Step 4)
3. **Try different email provider** (Step 5)
4. **Contact support** with specific error messages

---

**Most Common Issue:** Using regular Gmail password instead of App Password. Always use the 16-character App Password!

