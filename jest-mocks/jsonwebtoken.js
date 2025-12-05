// Minimal jwt-like mock for tests
// Provides `sign`, `verify`, and `decode` with a simple format:
// token = base64(JSON(payload)) + '.' + base64(secret)
function base64Encode(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

function base64Decode(str) {
  return JSON.parse(Buffer.from(str, 'base64').toString());
}

function sign(payload, secretOrPrivateKey, options) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const p = { ...payload };
  const token = `${base64Encode(header)}.${base64Encode(p)}.${base64Encode(
    secretOrPrivateKey || '',
  )}`;
  void options;
  return token;
}

function decode(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 3) return null;
  try {
    return base64Decode(parts[1]);
  } catch (e) {
    return null;
  }
}

function verify(token, secretOrPublicKey) {
  if (!token) throw new Error('invalid token');
  const parts = token.split('.');
  if (parts.length < 3) throw new Error('invalid token');
  const secretPart = parts[2] || '';
  const provided = Buffer.from(secretPart, 'base64').toString();
  if (secretOrPublicKey != null && provided !== String(secretOrPublicKey)) {
    const err = new Error('invalid signature');
    err.name = 'JsonWebTokenError';
    throw err;
  }
  return decode(token);
}

module.exports = { sign, verify, decode };
