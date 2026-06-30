---
title: "Adding Python without the bloat"
description: "Where FastAPI fits in a mostly-static site."
pubDate: 2026-06-21
---

The static pages don't need Python. But the moment you want a contact
form, a search box, or live data, a small FastAPI service handles it
while the rest of the site stays fast and static.

The React island on the home page is calling exactly such an endpoint.
