async function testRegisterAPI() {
  try {
    const res = await fetch('http://localhost:3005/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Manual',
        email: `manual${Date.now()}@example.com`,
        password: 'Password123!'
      })
    });
    console.log('STATUS:', res.status);
    console.log('RESPONSE:', await res.text());
  } catch (err) {
    console.error('FETCH ERROR:', err);
  }
}
testRegisterAPI();
