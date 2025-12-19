import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config/env';
import { Template } from '../../../shared/types/template';

class AIService {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: config.anthropicApiKey,
    });
  }

  async transformNote(
    noteContent: string,
    template: Template,
    additionalContext?: Record<string, any>
  ): Promise<{ content: string; tokensUsed: number }> {
    const prompt = this.buildPrompt(noteContent, template, additionalContext);

    const message = await this.client.messages.create({
      model: config.aiModel,
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: prompt
      }],
      system: this.buildSystemPrompt(template)
    });

    const content = this.extractContent(message);
    const tokensUsed = message.usage.input_tokens + message.usage.output_tokens;

    return { content, tokensUsed };
  }

  async *transformNoteStreaming(
    noteContent: string,
    template: Template,
    additionalContext?: Record<string, any>
  ): AsyncGenerator<string, void, unknown> {
    const prompt = this.buildPrompt(noteContent, template, additionalContext);

    const stream = await this.client.messages.create({
      model: config.aiModel,
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: prompt
      }],
      system: this.buildSystemPrompt(template),
      stream: true
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  }

  private buildSystemPrompt(template: Template): string {
    return `You are an AI assistant specialized in transforming raw meeting notes into professional, well-formatted documents.

Your task is to transform the provided notes according to the template "${template.name}" (${template.category} category).

Guidelines:
- Maintain factual accuracy - only use information present in the notes
- Follow the template structure precisely
- Use clear, professional language
- Format output in ${template.outputFormat} format
- If information for a required field is missing, indicate it clearly

Template Description: ${template.description || 'N/A'}`;
  }

  private buildPrompt(
    noteContent: string,
    template: Template,
    additionalContext?: Record<string, any>
  ): string {
    let prompt = template.promptTemplate;

    // Replace common placeholders
    prompt = prompt.replace(/\{\{note_content\}\}/g, noteContent);
    prompt = prompt.replace(/\{\{date\}\}/g, new Date().toISOString());

    // Replace custom context variables
    if (additionalContext) {
      Object.entries(additionalContext).forEach(([key, value]) => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        prompt = prompt.replace(regex, String(value));
      });
    }

    return prompt;
  }

  private extractContent(message: Anthropic.Message): string {
    const textContent = message.content.find(
      (block): block is Anthropic.TextBlock => block.type === 'text'
    );
    return textContent?.text || '';
  }
}

export default new AIService();
