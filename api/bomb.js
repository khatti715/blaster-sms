// api/bomb.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const referer = req.headers.referer || req.headers.origin || '';
  let clientDomain = '';
  
  try {
    if (referer) {
      const urlObj = new URL(referer);
      clientDomain = urlObj.hostname;
    }
  } catch (err) {
    clientDomain = '';
  }

  const allowedEnv = process.env.ALLOWED_DOMAINS || '';
  const allowedDomains = allowedEnv ? allowedEnv.split(',').map(d => d.trim()) : [];

  const isAllowed = allowedDomains.includes('*') || allowedDomains.some(domain => clientDomain.endsWith(domain));

  if (!isAllowed) {
    return res.status(403).json({
      error: 'Access denied. Domain not authorized.',
      message: 'Buy From Owner 923123168814',
      developer: 'Developed by RAJA',
      group: 'https://chat.whatsapp.com/IG0GPBBXk7wFk7GMgWiZje'
    });
  }

  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ 
      error: 'Phone number parameter is required.',
      message: 'Buy From Owner 923123168814',
      developer: 'Developed by RAJA',
      group: 'https://chat.whatsapp.com/IG0GPBBXk7wFk7GMgWiZje'
    });
  }

  try {
    const targetUrl = `https://boomber.sychio.workers.dev/?number=${encodeURIComponent(number)}`;
    const response = await fetch(targetUrl);
    const data = await response.text();

    return res.status(200).json({
      status: 'success',
      developer: 'Developed by RAJA',
      group: 'https://chat.whatsapp.com/IG0GPBBXk7wFk7GMgWiZje',
      target_response: data
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to communicate with upstream service.',
      details: error.message,
      developer: 'Developed by RAJA',
      group: 'https://chat.whatsapp.com/IG0GPBBXk7wFk7GMgWiZje'
    });
  }
};
