# whereisAphrodite — writing from your Mac

Your blog still uses Hexo and the NexT Muse theme. Posts now live as editable
Markdown files in this repository; GitHub Actions builds the website for you.

## What was recovered

The old repository contained generated HTML from Hexo 6.2.0 / NexT 8.12.1,
not the original writing project. This rebuild recovers all eight published
posts, their text, timestamps, tags, nine photo references, and their exact URLs
(including the original spelling and capitalization). Git history retains the
old website. This is recovered Markdown, not the missing original source.

The custom domain remains `whereisaphrodite.com`, and Utterances still uses
`whereisAphrodite/blog_comments` with pathname matching. Existing photos keep
their original external URLs and sizing. The old LeanCloud visit counter is
omitted from this rebuild.

Dates display in `America/Los_Angeles` for writing from your Mac. The historical
timestamps retain their original instants; some dates display a day earlier
than they did in China. Their existing URLs remain fixed.

## First use

1. You already have Node.js on this Mac. On another Mac, install a supported
   Node.js version (24 LTS is used by CI) from [nodejs.org](https://nodejs.org).
2. Open this repository folder in Finder. Double-click `mac/Preview.command`.
   The first run installs dependencies, then opens the preview in your browser.
3. Keep the Terminal window open. After saving a post, refresh the browser to
   see your changes. Press **Control-C** in Terminal to stop the preview.

The preview runs at <http://127.0.0.1:4000> and includes local drafts. It is
accessible only on this Mac. You can also start it from Terminal:

```sh
npm ci                 # First use, or after package-lock.json changes
npm start
```

## Write a new post

Double-click `mac/New Post.command`, enter a title, and open the new `.md` file
in your preferred Markdown editor. The launcher opens the drafts folder for you.
Alternatively, from Terminal in this repository:

```sh
npm run new -- "A day in Pasadena"
```

This creates `source/_drafts/a-day-in-pasadena.md`. Write below the closing `---`:

```markdown
---
title: A day in Pasadena
tags: [life, photos]
---

Today I went for a walk.

![Describe the photo](/images/pasadena.jpg)
```

Put new photos in `source/images/`. Drafts are ignored by Git and excluded from
the live build: they stay on this Mac and are not backed up to GitHub.

When it is ready, use the filename without `.md`:

```sh
npm run ready -- "a-day-in-pasadena"
npm test
```

This moves the draft to `source/_posts/` and sets its publication date. Review
the file before pushing it: published post sources will be public on GitHub.

## Publish changes

Once the rebuild has been merged and Pages is configured:

1. Open the repo in [GitHub Desktop](https://desktop.github.com/) using
   **File → Add Local Repository** (or clone it on another Mac).
2. Work on `main`, review the changed files, enter a commit summary, and commit.
3. Click **Push origin**. GitHub Actions checks and publishes the site.

Or use Git in Terminal after `npm test`:

```sh
git add source _config.yml _config.next.yml
git commit -m "Update blog"
git push origin main
```

## Modify the site

| What you want to change | File |
| --- | --- |
| An existing post | `source/_posts/*.md` |
| Title, description, domain, timezone | `_config.yml` |
| Theme, menus, sidebar, comments | `_config.next.yml` |
| Fonts, spacing, colors, your own CSS | `source/_data/styles.styl` |
| New post template | `scaffolds/draft.md` and `scaffolds/post.md` |
| Images | `source/images/` |

Keep an existing post's `permalink` field when editing it. This preserves shared
links and comment threads even if you change its title. Restart the preview
after editing configuration. Do not edit `public/` or `node_modules/`.

## Activate this rebuild (one time)

This branch is a review copy; the live website has not been changed.

1. Before merging, open the repository's **Settings → Pages**, change **Source**
   to **GitHub Actions**, and retain the custom domain `whereisaphrodite.com`.
2. Merge the rebuild pull request into `main`.
3. Check the **Build and publish blog** run in the Actions tab. A successful
   deployment publishes the generated `public/` folder.

`npm test` checks that the eight recovered posts retain their text, URLs,
timestamps, photo references, tags, comments configuration, and domain. Pull
requests run the same build without deploying.

Sources: [Hexo publishing with GitHub Actions](https://hexo.io/docs/github-pages),
[Hexo writing and drafts](https://hexo.io/docs/writing),
[NexT configuration](https://theme-next.js.org/docs/getting-started/), and
[GitHub Desktop cloning](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop).
