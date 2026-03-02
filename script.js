
// Track start time for time_on_page calculation
const pageStartTime = Date.now();

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

const SUPABASE_URL = 'https://rwmftrnegxtdxgprrxgo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bWZ0cm5lZ3h0ZHhncHJyeGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTk3MDAsImV4cCI6MjA4ODAzNTcwMH0.gXwofWxiU4GWSm6WOqk8C_jiWjIOT_Ym7y40fgTXEww';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/**
 * UTILITY: TRACK EVENT
 */
async function trackEvent(eventType, elementId = null) {
    const timeOnPage = ((Date.now() - pageStartTime) / 1000); // Time in seconds

    const event = {
        participant_id: sessionId,
        interface_type: isInterfaceB ? "Interface B" : "Interface A",
        event_type: eventType,
        element_id: elementId,
        time_on_page: timeOnPage
    };

    console.log("Tracking event:", event);

    if (supabaseClient) {
        const { error } = await supabaseClient
            .from('interaction_logs')
            .insert([event]);

        if (error) {
            console.error("Supabase error:", error);
        }
    } else {
        console.warn("Supabase client not found. Event only logged to console.");
    }
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

    // Track page load
    trackEvent('page_load', 'window');
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
            trackEvent('citation_click', 'citation-link', { pdfUrl: INITIAL_PDF_URL });
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
        trackEvent('ask_button_click', 'send-button');
        handleSend();
    });
}

if (userInput) {
    userInput.addEventListener('click', () => {
        trackEvent('input_click', 'user-input');
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            trackEvent('enter_pressed', 'user-input');
            handleSend();
        }
    });
}

// Start
document.addEventListener('DOMContentLoaded', init);
