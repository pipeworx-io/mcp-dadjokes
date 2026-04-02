# mcp-dadjokes

MCP server for random dad jokes via [icanhazdadjoke.com](https://icanhazdadjoke.com). No authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `random_joke` | Get a random dad joke |
| `search_jokes` | Search dad jokes by a keyword or term |
| `get_joke` | Get a specific dad joke by its ID |

## Quickstart via Pipeworx Gateway

Call any tool through the hosted gateway with zero setup:

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "dadjokes_random_joke",
      "arguments": {}
    }
  }'
```

## License

MIT
