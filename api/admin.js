// api/admin.js
global.allowedDomains = global.allowedDomains || ['example.com', 'yourdomain.com'];
const ADMIN_PASSWORD = 'Raja@Admin2026';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { password, action, domain } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized credentials.' });
  }

  if (action === 'get') {
    return res.status(200).json({ domains: global.allowedDomains });
  }

  if (action === 'add' && domain) {
    if (!global.allowedDomains.includes(domain)) {
      global.allowedDomains.push(domain);
    }
    return res.status(200).json({ success: true, domains: global.allowedDomains });
  }

  if (action === 'remove' && domain) {
    global.allowedDomains = global.allowedDomains.filter(d => d !== domain);
    return res.status(200).json({ success: true, domains: global.allowedDomains });
  }

  return res.status(400).json({ error: 'Invalid action or missing parameters.' });
};
