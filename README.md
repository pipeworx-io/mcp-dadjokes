# mcp-dadjokes

Dad Jokes MCP — wraps icanhazdadjoke.com (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `random_joke` | Get a random dad joke. Returns joke text and ID. |
| `search_jokes` | Search dad jokes by keyword or topic. Returns matching jokes with IDs and text. |
| `get_joke` | Retrieve a specific dad joke by ID. Returns the full joke text. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "dadjokes": {
      "url": "https://gateway.pipeworx.io/dadjokes/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Dadjokes data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
