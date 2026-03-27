export function formatMessage(text) {
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
    `<div class="code-block"><div class="code-lang">${lang || 'code'}</div><pre><code>${code.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre></div>`
  );
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  text = text.replace(/^\- (.+)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>\n?)+/g, s => `<ul>${s}</ul>`);
  text = text.replace(/^\d+\. (.+)$/gm, '<oli>$1</oli>');
  text = text.replace(/(<oli>.*<\/oli>\n?)+/g, s => `<ol>${s.replace(/<\/?oli>/g, m => m.replace('oli','li'))}</ol>`);
  text = text.replace(/\n(?!<\/?(div|ul|ol|li|h[123]|pre))/g, '<br/>');
  return text;
}
