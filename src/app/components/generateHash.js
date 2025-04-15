const bcrypt = require('bcryptjs');

async function generateHash() {
  // Az admin jelszó amit használni szeretnél
  const password = 'tomi123';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('A jelszavad:', password);
    console.log('A bcrypt hash:', hashedPassword);
  } catch (error) {
    console.error('Hiba:', error);
  }
}

generateHash();