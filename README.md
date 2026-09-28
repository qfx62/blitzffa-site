# BlitzFFA website

A static HTML, CSS, and JavaScript landing page for BlitzFFA. No build step or hosting service is required beyond GitHub Pages.

## Publish with GitHub Pages

1. Create a public GitHub repository named `blitzffa-site`.
2. Upload `index.html`, `styles.css`, `script.js`, and the complete `assets` folder to the root of the repository. Commit the files to `main`.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then click **Save**.
5. Open `https://YOUR-USERNAME.github.io/blitzffa-site/` after GitHub finishes publishing.

Keep the `assets` directory next to `index.html`. All image and script paths are relative so the site also works in a GitHub project repository.

## Update the site

- Edit copy, cards, and Discord links in `index.html`.
- Edit the layout and colors in `styles.css`.
- Edit mobile menu behavior in `script.js`.
- Replace image files in `assets` while retaining their names, or update the paths in `index.html` and `styles.css`.

The Discord invite in the site is `https://discord.gg/blitzffa`. No Minecraft server address was supplied, so this page does not display one.
