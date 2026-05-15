import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../app.js';

test('GET /health returns service metadata', async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.status, 'ok');
  } finally {
    server.close();
  }
});

test('unknown routes return 404 json payload', async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/missing-route`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.success, false);
  } finally {
    server.close();
  }
});
