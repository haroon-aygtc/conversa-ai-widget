
/**
 * This file contains the logic for the embeddable widget script
 * In a production environment, this would be compiled into a separate JS file
 * that can be hosted and loaded via a script tag.
 */

export const generateEmbedScript = (widgetId: string) => {
  // This is the code that would be used in the embeddable script
  const scriptCode = `
  (function() {
    // Create widget container
    const container = document.createElement('div');
    container.id = 'conversa-ai-widget-container';
    document.body.appendChild(container);
    
    // Load widget styles
    const style = document.createElement('style');
    style.textContent = \`
      #conversa-ai-widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
      }
      
      .conversa-widget-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #7c3aed;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
      }
      
      .conversa-widget-button:hover {
        transform: scale(1.05);
      }
      
      .conversa-chat-window {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform-origin: bottom right;
        transition: all 0.3s;
      }
      
      .conversa-chat-header {
        background-color: #7c3aed;
        color: white;
        padding: 15px;
        font-weight: 500;
      }
      
      .conversa-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        background-color: #f9fafb;
      }
      
      .conversa-chat-input {
        padding: 15px;
        border-top: 1px solid #e5e7eb;
        display: flex;
      }
      
      .conversa-chat-input input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        margin-right: 8px;
      }
      
      .conversa-chat-input button {
        background-color: #7c3aed;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 12px;
        cursor: pointer;
      }
      
      .conversa-hidden {
        display: none;
      }
      
      .conversa-fade-in {
        animation: conversaFadeIn 0.3s forwards;
      }
      
      @keyframes conversaFadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    \`;
    document.head.appendChild(style);
    
    // Create button
    const button = document.createElement('div');
    button.className = 'conversa-widget-button';
    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    container.appendChild(button);
    
    // Create chat window (initially hidden)
    const chatWindow = document.createElement('div');
    chatWindow.className = 'conversa-chat-window conversa-hidden';
    chatWindow.innerHTML = \`
      <div class="conversa-chat-header">Conversa AI Assistant</div>
      <div class="conversa-chat-messages">
        <div class="conversa-message conversa-ai-message">
          Hello! How can I help you today?
        </div>
      </div>
      <div class="conversa-chat-input">
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    \`;
    container.appendChild(chatWindow);
    
    // Add event listeners
    button.addEventListener('click', function() {
      if (chatWindow.classList.contains('conversa-hidden')) {
        chatWindow.classList.remove('conversa-hidden');
        chatWindow.classList.add('conversa-fade-in');
        // Change button to close icon
        button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      } else {
        chatWindow.classList.add('conversa-hidden');
        // Change button back to chat icon
        button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
      }
    });
    
    // Load the actual widget from the main application
    const script = document.createElement('script');
    script.src = 'https://your-domain.com/api/widget-loader.js?id=${widgetId}';
    script.async = true;
    document.head.appendChild(script);
  })();
  `;
  
  return scriptCode;
};

export const getWidgetEmbedCode = (widgetId: string) => {
  return `<script src="https://your-domain.com/widget.js" data-widget-id="${widgetId}"></script>`;
};
