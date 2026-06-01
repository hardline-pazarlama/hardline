# hardline

## Firecrawl CLI

This repo installs the [Firecrawl CLI](https://www.npmjs.com/package/firecrawl-cli)
automatically in Claude Code on the web sessions via a `SessionStart` hook
(`.claude/hooks/session-start.sh`).

### Manual / local setup

```bash
npm install -g firecrawl-cli
export FIRECRAWL_API_KEY=fc-your-key-here
```

### Claude Code on the web

The session-start hook runs `npm install -g firecrawl-cli`
automatically. The API key is **not** stored in the repo — set
`FIRECRAWL_API_KEY` as a secret/environment variable in your environment
settings and the hook will expose it to the session.
