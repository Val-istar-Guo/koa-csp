import csp from '../src/csp';

test('default csp() test', () => {
  const header = {};
  const ctx = {
    set(key, val) {
      header[key] = val;
    },
  };
  return csp()(ctx, async () => {}).then(() => {
    expect(header['Content-Security-Policy']).toBe("default-src 'self'");
  });
});

test('custom setting csp(opts) test', () => {
  const header = {};
  const ctx = {
    set(key, val) {
      header[key] = val;
    },
  };

  const policy = {
    'img-src': ['self', 'img.example.com', '*.img.example.com'],
    'script-src': ['script.example.com'],
  };

  const expectStr = "img-src 'self' img.example.com *.img.example.com;script-src script.example.com";

  return csp({ policy })(ctx, async () => {}).then(() => {
    expect(header['Content-Security-Policy']).toBe(expectStr);
  });
});

test('invalid custom setting csp(opts) test', () => {
  const header = {};
  const ctx = {
    set(key, val) {
      header[key] = val;
    },
  };

  const policy = {
    'image-src': ['self', 'img.example.com', '*.img.example.com'],
    'script-src': ['script.example.com'],
  };

  const expectStr = 'script-src script.example.com';

  return csp({ enableWarn: false, policy })(ctx, async () => {}).then(() => {
    expect(header['Content-Security-Policy']).toBe(expectStr);
  });
});
