/**
 * Dad Jokes MCP — wraps icanhazdadjoke.com (free, no auth)
 *
 * Tools:
 * - random_joke: Get a random dad joke
 * - search_jokes: Search dad jokes by term
 * - get_joke: Get a specific dad joke by ID
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://icanhazdadjoke.com';

const HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'pipeworx-mcp',
};

type RawJoke = {
  id: string;
  joke: string;
  status: number;
};

type RawSearchResponse = {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: Array<{ id: string; joke: string }>;
  search_term: string;
  status: number;
  total_jokes: number;
  total_pages: number;
};

function formatJoke(j: { id: string; joke: string }) {
  return { id: j.id, joke: j.joke };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'random_joke',
    description: 'Get a random dad joke.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'search_jokes',
    description: 'Search dad jokes by a keyword or term.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Term to search for within dad jokes.',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of jokes to return. Defaults to 10.',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_joke',
    description: 'Get a specific dad joke by its ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The ID of the dad joke to retrieve.',
        },
      },
      required: ['id'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_joke':
      return randomJoke();
    case 'search_jokes':
      return searchJokes(args.query as string, (args.limit as number | undefined) ?? 10);
    case 'get_joke':
      return getJoke(args.id as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomJoke() {
  const res = await fetch(`${BASE_URL}/`, { headers: HEADERS });
  if (!res.ok) throw new Error(`icanhazdadjoke error: ${res.status}`);
  const data = (await res.json()) as RawJoke;
  return formatJoke(data);
}

async function searchJokes(query: string, limit: number) {
  const res = await fetch(
    `${BASE_URL}/search?term=${encodeURIComponent(query)}&limit=${limit}`,
    { headers: HEADERS },
  );
  if (!res.ok) throw new Error(`icanhazdadjoke error: ${res.status}`);
  const data = (await res.json()) as RawSearchResponse;
  return {
    total: data.total_jokes,
    query: data.search_term,
    jokes: data.results.map(formatJoke),
  };
}

async function getJoke(id: string) {
  const res = await fetch(`${BASE_URL}/j/${encodeURIComponent(id)}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`icanhazdadjoke error: ${res.status}`);
  const data = (await res.json()) as RawJoke;
  return formatJoke(data);
}

export default { tools, callTool } satisfies McpToolExport;
