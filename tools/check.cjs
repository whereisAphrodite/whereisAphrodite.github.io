const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { createHash } = require('node:crypto');
const { stripHTML, unescapeHTML } = require('hexo-util');
const posts = require('./legacy-posts.json');

for (const post of posts) {
  const html = readFileSync(`public${post.url}index.html`, 'utf8');
  const body = html.match(/<div class="post-body"[^>]*>([\s\S]*?)<\/div>/)?.[1];
  assert.ok(body, `Missing article body: ${post.url}`);
  const text = unescapeHTML(stripHTML(body)).replace(/\s/g, '');
  assert.equal(createHash('sha256').update(text).digest('hex'), post.text_sha256, `Changed text: ${post.url}`);
  assert.ok(html.includes(`<meta property="og:title" content="${post.title}">`), `Changed title: ${post.url}`);
  assert.ok(html.includes(post.published), `Changed timestamp: ${post.url}`);
  assert.ok(html.includes(`https://whereisaphrodite.com${post.url}`), `Changed URL: ${post.url}`);
  assert.ok(html.includes('whereisAphrodite/blog_comments'), `Missing comments: ${post.url}`);
  for (const image of post.images) {
    assert.ok(body.includes(image.src), `Missing photo: ${post.url}`);
    if (image.style) assert.ok(body.includes(image.style), `Changed photo size: ${post.url}`);
  }
  for (const url of post.tag_urls) {
    assert.ok(html.includes(url), `Changed tag URL: ${url}`);
    assert.ok(readFileSync(`public${url}index.html`, 'utf8').includes(post.url), `Missing tag page: ${url}`);
  }
  assert.ok(!html.includes('example.com'), `Placeholder domain: ${post.url}`);
}
assert.equal(readFileSync('public/CNAME', 'utf8').trim(), 'whereisaphrodite.com');
assert.ok(readFileSync('public/archives/index.html', 'utf8').includes('real acknowledgement'));
assert.ok(readFileSync('public/tags/index.html', 'utf8').includes('undergraduate'));
console.log(`Verified all ${posts.length} recovered posts, photo references, tags, comments, and domain.`);
