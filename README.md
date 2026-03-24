# Google AI Studio Starter Applets

This repository contains the source code for Google AI Studio's
[starter apps](https://aistudio.google.com/app/starter-apps) — a collection of
small apps that demonstrate how Gemini can be used to create interactive
experiences. These apps are built to run inside AI Studio, but the versions
included here can run standalone using the
[Gemini API](https://ai.google.dev/gemini-api/docs).

## Spatial Understanding

[Spatial Understanding](/spatial/)
([live demo](https://aistudio.google.com/app/starter-apps/spatial)) is a simple
demonstration of Gemini's 2D and 3D spatial understanding and reasoning
capabilities. It was built with React.

This example should give you an idea of how to get started with spatial analysis
using Gemini. Check out [Prompt.tsx](/spatial/src/Prompt.tsx) to see how
bounding box parsing is implemented. To dive deeper into Gemini's spatial
reasoning capabilities, check out this
[Colab notebook](https://github.com/google-gemini/cookbook/blob/main/gemini-2/spatial_understanding.ipynb).

To develop locally, insert your Gemini API key in the `.env` file.

## Video Analyzer

[Video Analyzer](/video/)
([live demo](https://aistudio.google.com/app/starter-apps/video)) is a simple
app that allows you to explore events within videos using Gemini. It was built
with React.

This example shows how to get started with video analysis using function
calling. Check out [functions.js](/video/src/functions.js) to see the function
definition for this applet!

To develop locally, insert your Gemini API key in the `.env` file.

## Map Explorer

[Map Explorer](/maps/)
([live demo](https://aistudio.google.com/app/starter-apps/map)) is a simple app
that allows you to explore a map using Gemini and the Google Maps API. It was
built using Lit, and the
[Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started).

This example will give you an idea of how to get started with function calling.
See [function-declarations.js](/maps/function-declarations.js) to find out more
about how function calling is used to call the Maps Embed API here!

To develop locally, insert your Gemini API key where you see `your_key_here` in
the `script.js` file.

## Job Matcher

[Job Matcher](/job-matcher/) is a self-contained HTML/JS applet that searches
job listings and scores them against a candidate CV profile using keyword
matching. No build step required — open `index.html` directly in a browser.

### How to run

```bash
# Option 1 – open directly
open job-matcher/index.html

# Option 2 – serve locally (avoids any browser CORS restrictions)
npx serve job-matcher
# then visit http://localhost:3000
```

### Demo mode (no API key needed)

Select **Demo / Mock Data** in the *Data Source* dropdown and click
**Search Jobs**. The applet ships with 10 realistic mock listings for the
NT/Darwin region so you can explore the interface straight away.

### Live mode – Adzuna API

1. Register for a free key at <https://developer.adzuna.com/>
2. Select **Adzuna API** in the *Data Source* dropdown
3. Enter your **App ID** and **App Key**
4. Adjust the *Search Query* and *Location* fields, then click **Search Jobs**

### How to update the CV keywords

**Via the UI:** Click the **Edit Keywords** button in the *CV Profile* panel,
edit the comma-separated list, and click **Save**. Changes take effect
immediately and re-score any displayed results.

**Via code:** Open `job-matcher/script.js` and edit the `keywords` array
inside the `CV_PROFILE` object at the top of the file:

```js
const CV_PROFILE = {
  keywords: [
    "ranger",
    "events manager",
    // add or remove keywords here …
  ],
  // …
};
```

The scoring engine counts how many keywords appear in each job's title,
company, location, and description. Title matches are counted twice for
higher weighting. Scores are displayed as a percentage badge on each card.

### Contributors

- [@bencobley](https://github.com/bencobley)
- [@dmotz](https://github.com/dmotz)
- [@grantcuster](https://github.com/grantcuster)
- [@hapticdata](https://github.com/hapticdata)
