# Netlify Forms Setup & Troubleshooting Guide

## Current Setup

The contact form has been configured to work with Netlify Forms with the following implementation:

### 1. Form Detection
- **HTML Fallback**: `/public/__forms.html` contains a hidden HTML form that Netlify detects during build
- **Form Name**: "contact" - must match in both React component and HTML file
- **Required Attributes**: `data-netlify="true"` and hidden `form-name` input

### 2. React Implementation
- **AJAX Submission**: Form submits via fetch() to prevent page redirect
- **Success Message**: Shows confirmation message after successful submission
- **Error Handling**: Displays error message if submission fails
- **Form Reset**: Automatically clears form after successful submission

### 3. Configuration Files
- **netlify.toml**: Contains build settings and Next.js plugin configuration
- **__forms.html**: Static form for Netlify to detect (DO NOT DELETE)

## How to Access Form Submissions

1. **Netlify Dashboard**:
   - Go to your Netlify dashboard
   - Navigate to: Site Overview → Forms
   - You'll see all submissions under the "contact" form

2. **Email Notifications**:
   - In Netlify Dashboard → Site Settings → Forms → Form notifications
   - Add email addresses to receive notifications for new submissions
   - You can set up multiple notification types (email, Slack, webhooks)

## Troubleshooting Checklist

### If Forms Aren't Being Received:

1. **Check Build Process**:
   ```bash
   npm run build
   ```
   - Ensure no build errors
   - Verify __forms.html is in public folder

2. **Verify Form Detection**:
   - After deployment, go to Netlify Dashboard → Forms
   - You should see "contact" form listed
   - If not visible, Netlify didn't detect the form during build

3. **Check Browser Console**:
   - Open DevTools → Network tab
   - Submit form and check:
     - Request goes to "/" with POST method
     - Response status is 200
     - Form data is properly encoded

4. **Common Issues & Solutions**:

   **Issue**: Form not detected by Netlify
   - **Solution**: Ensure __forms.html exists and has matching field names

   **Issue**: Submissions not appearing in dashboard
   - **Solution**: Check that form-name value matches exactly ("contact")

   **Issue**: Getting 404 on form submission
   - **Solution**: Form might not be detected. Redeploy after checking __forms.html

   **Issue**: Form redirects to blank page
   - **Solution**: JavaScript might be disabled or erroring. Check console for errors

5. **Test Form Locally**:
   - Forms won't work in local development (npm run dev)
   - Deploy to Netlify to test actual submission
   - Use Netlify CLI for local testing:
     ```bash
     npm install -g netlify-cli
     netlify dev
     ```

## Setting Up Email Notifications

1. Go to Netlify Dashboard
2. Navigate to: Site Settings → Forms → Form notifications
3. Click "Add notification" → "Email notification"
4. Configure:
   - Form: Select "contact"
   - Email: Add recipient email addresses
   - Save

## Webhook Integration (Optional)

For advanced integrations (CRM, Slack, etc.):

1. Site Settings → Forms → Form notifications
2. Add notification → Outgoing webhook
3. Configure webhook URL and format
4. Test with a service like webhook.site first

## Important Notes

- Never delete `/public/__forms.html` - it's required for form detection
- Form name must be consistent across all files
- Forms only work on deployed Netlify sites, not local development
- Check spam folder if not receiving email notifications
- Netlify stores submissions for 3 months on free tier

## Contact Netlify Support

If issues persist after following this guide:
1. Visit: https://answers.netlify.com/
2. Or contact support with your site URL and form name