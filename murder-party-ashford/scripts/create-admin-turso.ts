import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function createAdmin() {
  try {
    // Import after dotenv config
    const { userRepository } = await import('../lib/db/user');

    console.log('🔄 Creating admin user...');

    const email = 'admin@ashford.com';
    const username = 'admin';
    const password = 'admin123';

    // Check if admin already exists
    const existing = await userRepository.findOne({ email });
    if (existing) {
      console.log('⚠️  Admin user already exists');
      return;
    }

    const admin = await userRepository.create({
      email,
      username,
      password,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Email:', email);
    console.log('👤 Username:', username);
    console.log('🔑 Password:', password);
    console.log('\n⚠️  Please change the password after first login!');
  } catch (error: any) {
    console.error('❌ Error creating admin:', error.message);
    throw error;
  }
}

createAdmin();
