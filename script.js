/**
 * CONFIGURABLE CONSTANTS
 */
const STATIC_ANSWER_TEXT = "This text will be shown to everyone that asks any question in the chat window";
const PDF_BASE_URL = "MT0_ErathJohannes_2_Pager.pdf";

// Detection for Interface B (contains a PDF frame)
const pdfFrame = document.getElementById('pdf-frame');
const isInterfaceB = !!pdfFrame;

// Interface-specific PDF settings
const INITIAL_PDF_URL = isInterfaceB
    ? `${PDF_BASE_URL}#page=1&zoom=100`
    : `${PDF_BASE_URL}#page=3&zoom=100`;

let sessionId = "";
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-button');
const emptyState = document.getElementById('empty-state');
const sessionDisplay = document.getElementById('session-display');

/**
 * UTILITY: TRACK EVENT
 */
function trackEvent(eventType, metadata = {}) {
    const event = {
        eventType,
        sessionId,
        timestamp: new Date().toISOString(),
        ...metadata,
    };
    console.log("Tracked event:", event);
}

/**
 * INITIALIZATION
 */
function init() {
    // 1. Session ID Logic
    let sid = sessionStorage.getItem('app_session_id');
    if (!sid) {
        sid = 'local-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
        sessionStorage.setItem('app_session_id', sid);
    }
    sessionId = sid;
    if (sessionDisplay) {
        sessionDisplay.innerText = `Session: ${sessionId}`;
    }

    // 2. Interface B Specific Setup
    if (isInterfaceB && pdfFrame) {
        pdfFrame.src = INITIAL_PDF_URL;
    }
}

/**
 * SHOW THINKING INDICATOR
 */
function showThinkingIndicator() {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'thinking-bubble';
    thinkingDiv.id = 'thinking-indicator';
    thinkingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatWindow.appendChild(thinkingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return thinkingDiv;
}

/**
 * APPEND MESSAGE
 */
function appendMessage(type, text) {
    if (emptyState) emptyState.style.display = 'none';

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type === 'user' ? 'user-message' : 'ai-message'}`;

    if (type === 'ai') {
        msgDiv.innerHTML = `${text} <a href="${INITIAL_PDF_URL}" class="citation-link" target="_blank" rel="noopener noreferrer">[1]</a>`;
        const citation = msgDiv.querySelector('.citation-link');
        citation.addEventListener('click', (e) => {
            // If Interface B, we might want to prevent default and just shift the iframe
            // But usually, citations in AI chat are links. 
            // For Interface A: standard behavior (opens in new tab)
            // For Interface B: we'll track the click, and handle iframe update in handleSend
            trackEvent('citation_click', { pdfUrl: INITIAL_PDF_URL });
        });
    } else {
        msgDiv.textContent = text;
    }

    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * ACTION HANDLER
 */
function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Post User Message
    appendMessage('user', text);
    userInput.value = '';

    // 2. Show the "Thinking" animation
    const indicator = showThinkingIndicator();

    // 3. Wait 4.5 seconds
    setTimeout(() => {
        if (indicator) indicator.remove();

        // Post the final answer
        appendMessage('ai', STATIC_ANSWER_TEXT);

        // 4. Interface B Specific: Update PDF iframe with highlighting
        if (isInterfaceB && pdfFrame) {
            const highlightUrl = PDF_BASE_URL + "#:~:text=To%20mitigate%20the%20issue,trust%20in%20the%20AI%20answers.";

            console.log("Updating Interface B PDF frame...");
            pdfFrame.src = "about:blank"; // Reset to ensure reload

            setTimeout(() => {
                pdfFrame.src = highlightUrl;
            }, 100);
        }
    }, 4500);
}

/**
 * EVENT LISTENERS
 */
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        trackEvent('ask_button_click');
        handleSend();
    });
}

if (userInput) {
    userInput.addEventListener('click', () => {
        trackEvent('input_click');
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            trackEvent('enter_pressed');
            handleSend();
        }
    });
}

// Start
document.addEventListener('DOMContentLoaded', init);
