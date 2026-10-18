# GuruPlay-inspired Vercel landing page

Mobile-first HTML/CSS/JS page based on the screenshot provided in chat. The first four game graphics were cropped from that user-supplied screenshot. The last two cards have placeholder art because the screenshot cut them off. The counters/ticker are illustrative, **not live activity data**. No claimed hacks or winnings are validated.

## Publish to Vercel

1. Extract the ZIP into a folder.
2. In Vercel, choose Add New > Project and import the project folder via GitHub (recommended) or use the Vercel CLI: `npx vercel` in this folder.
3. Select **Other** as Framework Preset. Set Build command to `npm run build`, Output directory to `dist`, and Node.js to 22 or newer.
4. Add `LINK_PLAY` and `LINK_SIGNALS` in the hosting project environment settings (the local `.env` is ignored by Git). Redeploy after changing either value.
5. Replace the sample timer with a real deadline if there is one. Verify any bonus claims before advertising them, and include required disclosure/age requirements.

Commercial/affiliate projects require an appropriate Vercel plan and compliance with Vercel policy and applicable law.

Desktop layout is centered in a 690px-wide container; on small screens it fills the available width.

Desktop layout fine-tuned to a 510px centered column; mobile styles unchanged.

First Back displays the bonus dialog once (best effort with History API); second Back is not intercepted. The dialog also includes Leave site. In-app browsers may behave differently.

Pop-up timing: top bonus dialog opens after 10 seconds unless opened sooner. The bottom demo jackpot toast first appears after 3 seconds, stays visible 4 seconds, then returns after a random 20–25-second hidden interval with the next sample country. All jackpot examples are labeled simulated.

Back-button limitation: modern browsers may skip synthetic history entries made without user interaction. The first touch/click arms the one-time back offer even before the 10-second modal; a Back press before ANY interaction cannot reliably be intercepted. Test on HTTPS deployment, not file://.

## Card links

Create `.env` in the project root (or copy `.env.example`):

```dotenv
LINK_PLAY=https://example.com/play
LINK_SIGNALS=https://example.com/signals
```

Replace the example URLs with your actual links. `LINK_PLAY` is used by Tappy Bird,
Falling Pickaxe, Tower Rush, and Lucky Wheel. `LINK_SIGNALS` is used by Mines and
Aviator. Empty values leave the corresponding cards unconfigured.

Run `npm run build` with Node.js 22 or newer, then serve or publish **dist/**.
For a local preview: `python3 -m http.server 8000 --directory dist`.
Rebuild after editing `.env`. The build copies only site assets and the two public
link values; `.env` itself is not published. These URLs are visible to visitors.
