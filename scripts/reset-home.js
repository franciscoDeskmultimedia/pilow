
const { getPayload } = require('payload');
const config = require('../../src/payload/payload.config').default;

require('dotenv').config({ path: '.env.local' });

async function resetHome() {
  const payload = await getPayload({ config });
  
  console.log('Finding corrupted homepage...');
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale: 'en',
  });
  
  if (pages.docs.length > 0) {
    console.log(`Deleting homepage with ID: ${pages.docs[0].id}`);
    await payload.delete({
      collection: 'pages',
      id: pages.docs[0].id,
    });
    console.log('Homepage deleted. Seeding will recreate it on next restart.');
  } else {
    console.log('No homepage found.');
  }
  
  process.exit(0);
}

resetHome();
