<?php
/**
 * The AI knowledge stream: how the nodes in nodes.php are presented as one
 * long-form article at /blog/ai/, a timeline at /blog/ai/timeline/ and a
 * retrieval interface at /blog/ai/ask/.
 *
 * Nodes do not carry their own position. The order of the article is the
 * order the ids appear in the parts below, so reordering the article is
 * moving an id, and a node can appear in any number of learning paths
 * without changing. See docs/knowledge-nodes.md.
 */
return [
    'path' => 'blog/ai',
    'title' => 'How modern language models work',
    'description' => 'From text to tokens, attention, sampling, retrieval and tools: how a large language model turns a prompt into an answer, and what it does not do along the way.',
    'published' => '2026-10-02',
    'updated' => '2026-10-02',
    'parts' => [
        [
            'title' => 'From text to vectors',
            'nodes' => ['text', 'tokenization', 'token-ids', 'embeddings', 'position'],
        ],
        [
            'title' => 'Inside the transformer',
            'nodes' => [
                'contextual-representations',
                'transformer-layers',
                'attention',
                'qkv',
                'dense-attention',
                'sparse-attention',
                'context-window',
                'kv-cache',
            ],
        ],
        [
            'title' => 'Choosing the next token',
            'nodes' => [
                'logits',
                'softmax',
                'sampling',
                'sampling-controls',
                'discarded-candidates',
                'search-and-verification',
            ],
        ],
        [
            'title' => 'Running a model yourself',
            'nodes' => ['quantization', 'local-inference'],
        ],
        [
            'title' => 'Bringing in outside information',
            'nodes' => [
                'rag',
                'retrieval-vs-attention',
                'external-memory',
                'tool-use',
                'mcp',
                'code-retrieval',
            ],
        ],
        [
            'title' => 'Learning, and what the words mean',
            'nodes' => ['training', 'hallucination', 'synthetic-data', 'self-improvement', 'agi'],
        ],
    ],
    // Learning paths: named routes through the same nodes. Validated (every id
    // must exist) but not rendered yet; they are the extension point for
    // guided lessons.
    'learning_paths' => [
        [
            'id' => 'llm-generation',
            'title' => 'How an LLM generates text',
            'nodes' => [
                'tokenization',
                'embeddings',
                'position',
                'attention',
                'kv-cache',
                'logits',
                'sampling',
            ],
        ],
        [
            'id' => 'coding-agents',
            'title' => 'How AI coding agents understand a repository',
            'nodes' => [
                'context-window',
                'retrieval-vs-attention',
                'rag',
                'external-memory',
                'tool-use',
                'mcp',
                'code-retrieval',
            ],
        ],
    ],
];
