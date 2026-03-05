const axios = require('axios');

async function createTestUser() {
  try {
    // Create a regular user
    const userResponse = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    
    console.log('✅ Test user created:', userResponse.data);
    
    // Create an admin user
    const adminResponse = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('✅ Admin user created:', adminResponse.data);
    
    console.log('\n📝 Login Credentials:');
    console.log('Regular User: test@example.com / password123');
    console.log('Admin User: admin@example.com / admin123');
    
  } catch (error) {
    console.error('❌ Error creating users:', error.response?.data || error.message);
  }
}

createTestUser();
