
/**
 * This utility file generates the embeddable script code that can be
 * added to any website to load the chat widget.
 */

// Generate a minimal loader script that dynamically loads the full widget
export const generateEmbedScript = (widgetId: string): string => {
  // This is the minimal script that will be embedded on a user's website
  return `
(function() {
  // Create widget container
  var container = document.createElement('div');
  container.id = 'conversa-ai-container';
  document.body.appendChild(container);
  
  // Load the widget script
  var script = document.createElement('script');
  script.src = 'https://your-domain.com/widget/${widgetId}.js';
  script.async = true;
  script.onload = function() {
    // Initialize widget when script loads
    if (typeof ConversaAI !== 'undefined') {
      ConversaAI.init({
        widgetId: '${widgetId}'
      });
    }
  };
  document.head.appendChild(script);
})();
`.trim();
};

// Generate HTML code to be displayed to the admin
export const getEmbedCodeSnippet = (widgetId: string): string => {
  return `<script>
${generateEmbedScript(widgetId)}
</script>`;
};

// This would be the full widget script that gets loaded by the embed script
export const generateFullWidgetScript = (config: any): string => {
  // In a real implementation, this would generate a more complete script
  // that includes the full functionality of the widget
  return `
window.ConversaAI = (function() {
  var config = ${JSON.stringify(config)};
  
  // Initialize widget
  function init(options) {
    options = options || {};
    var settings = Object.assign({}, config, options);
    
    // Create widget elements
    createWidgetElements(settings);
    
    // Set up event listeners
    setupEventListeners(settings);
    
    // Connect to backend for AI responses
    connectBackend(settings);
  }
  
  // Create the widget DOM elements
  function createWidgetElements(settings) {
    // Implementation would go here
    console.log('Creating widget elements with settings:', settings);
  }
  
  // Set up widget event listeners
  function setupEventListeners(settings) {
    // Implementation would go here
    console.log('Setting up event listeners');
  }
  
  // Connect to backend services
  function connectBackend(settings) {
    // Implementation would go here
    console.log('Connecting to backend with widget ID:', settings.widgetId);
  }
  
  // Public API
  return {
    init: init
  };
})();
`.trim();
};
