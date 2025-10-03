/**
 * Notification Test - Intentional Failure for Testing Email Notifications
 * 
 * This test is designed to fail and trigger email notifications.
 * Remove or fix this test after verifying notifications work.
 */

describe('Email Notification Testing', () => {
  
  test('🚨 INTENTIONAL FAILURE - Testing email notifications', () => {
    // This test will always fail to trigger email notifications
    console.log('🧪 This is an intentional test failure to test email notifications');
    console.log('📧 You should receive an email notification when this test fails');
    console.log('✅ After confirming notifications work, please remove this test');
    
    expect(true).toBe(false); // This will always fail
  });

  test('🔍 Another failing test - Multiple failure scenarios', () => {
    const testData = {
      status: 'failing',
      purpose: 'notification testing'
    };
    
    console.log('📋 Test data:', testData);
    console.log('🚫 This test should also trigger notifications');
    
    // Multiple assertion failures
    expect(1 + 1).toBe(3); // Math failure
    expect('hello').toBe('world'); // String mismatch
    expect([1, 2, 3]).toHaveLength(5); // Array length failure
  });

  test('⚠️ Async test failure - Testing async notification triggers', async () => {
    console.log('⏳ Testing async failure scenarios...');
    
    // Simulate async operation that fails
    const asyncOperation = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Simulated async failure for notification testing'));
        }, 100);
      });
    };
    
    // This should trigger async test failure
    await expect(asyncOperation()).resolves.toBe('success');
  });

  test('🎯 Conditional failure - Environment-based testing', () => {
    const isTestingNotifications = false; // Set to false to make test pass
    
    if (isTestingNotifications) {
      console.log('🔔 Notification testing mode - forcing failure');
      expect('notification').toBe('working');
    } else {
      console.log('✅ Normal test mode - test passes');
      expect(true).toBe(true);
    }
  });

});
