
// Track start time for time_on_page calculation
const pageStartTime = Date.now();

const STATIC_ANSWER_TEXT = "This text will be shown to everyone that asks any question in the chat window";
const PDF_BASE_URL = "MT0_ErathJohannes_2_Pager.pdf";

const TASKS = {
    1: {
        topic: "Economic Benefits of Remote Work",
        description: "Identify the primary economic benefits and challenges of remote work as discussed in the provided document. How do these factors impact overall productivity?",
        phases: {
            1: {
                hint: "Ask the chatbot about the economic benefits based on the reference document.",
                options: {
                    accurate: "I believe the AI answer about benefits is accurate",
                    inaccurate: "I believe the AI answer about benefits is inaccurate"
                },
                aiAnswer: "The document highlights reduced overhead costs, such as office space and utilities, as a primary economic benefit. This cost-saving measure allows organizations to invest in other areas or improve profit margins."
            },
            2: {
                hint: "Now, ask the chatbot about the economic challenges mentioned in the document.",
                options: {
                    accurate: "I believe the AI answer about challenges is accurate",
                    inaccurate: "I believe the AI answer about challenges is inaccurate"
                },
                aiAnswer: "A significant economic challenge mentioned is the initial cost of setting up home offices, including providing employees with necessary equipment and secure internet connections. Furthermore, there might be hidden costs related to cybersecurity measures required for a decentralized workforce."
            }
        }
    },
    2: {
        topic: "Multi-Dimensional Analysis",
        description: "Explain the concept of 'Multi-Dimensional Analysis' in the context of remote work. What are the key dimensions the author focuses on?",
        phases: {
            1: {
                hint: "Ask the chatbot to explain 'Multi-Dimensional Analysis'.",
                options: {
                    accurate: "I believe the AI explanation of the concept is accurate",
                    inaccurate: "I believe the AI explanation of the concept is inaccurate"
                },
                aiAnswer: "In the context of remote work, 'Multi-Dimensional Analysis' refers to evaluating the shift not just from an economic standpoint, but also taking into account psychological, sociological, and environmental factors to get a holistic view of its impact."
            },
            2: {
                hint: "Ask the chatbot to list the key dimensions focused on by the author.",
                options: {
                    accurate: "I believe the AI list of dimensions is accurate",
                    inaccurate: "I believe the AI list of dimensions is inaccurate"
                },
                aiAnswer: "The author primarily focuses on three key dimensions: 1) Economic impact (cost savings vs. setup costs), 2) Psychological impact (employee well-being and burnout), and 3) Sociological impact (team cohesion and communication)."
            }
        }
    },
    3: {
        topic: "Mitigating Social Impacts",
        description: "Based on the document's findings, what are the recommended strategies for organizations to mitigate the negative social impacts of long-term remote work?",
        phases: {
            1: {
                hint: "Use the chat to ask about the negative social impacts.",
                options: {
                    accurate: "I believe the AI answer identifying the impacts is accurate",
                    inaccurate: "I believe the AI answer identifying the impacts is inaccurate"
                },
                aiAnswer: "The document notes that long-term remote work can lead to feelings of isolation among employees and a potential weakening of corporate culture due to the lack of spontaneous, informal interactions that typically occur in a physical office setting."
            },
            2: {
                hint: "Now ask about strategies to mitigate these negative impacts.",
                options: {
                    accurate: "I believe the AI's mitigation strategies are accurate",
                    inaccurate: "I believe the AI's mitigation strategies are inaccurate"
                },
                aiAnswer: "To mitigate these issues, the document recommends implementing structured virtual team-building activities, scheduling regular one-on-one video check-ins to monitor employee well-being, and, when feasible, organizing occasional in-person gatherings to strengthen team cohesion."
            }
        }
    }
};

// Phase tracking for two-phase task card flow
let currentPhase = 1;      // 1 or 2
let promptSentInPhase = false;
let optionSelectedInPhase = false;

// Detection for Interfaces
const isInterfaceA = window.location.pathname.toLowerCase().includes('interfacea.html');
const isInterfaceB = window.location.pathname.toLowerCase().includes('interfaceb.html');
const isInterfaceC = window.location.pathname.toLowerCase().includes('interfacec.html');

const pdfFrame = document.getElementById('pdf-frame');
const hasPdfFrame = !!pdfFrame;

// Determine interface type letter for tracking
const INTERFACE_TYPE = isInterfaceC ? "C" : (isInterfaceB ? "B" : "A");

// Interface-specific PDF settings
const INITIAL_PDF_URL = isInterfaceC
    ? `${PDF_BASE_URL}#page=1&zoom=100`
    : `${PDF_BASE_URL}#page=3&zoom=100`;

let sessionId = "";
let appGroup = sessionStorage.getItem('app_group') || "None";
let appStep = parseInt(sessionStorage.getItem('app_step')) || 0;

const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-button');
const emptyState = document.getElementById('empty-state');
const sessionDisplay = document.getElementById('session-display');

const SUPABASE_URL = 'https://rwmftrnegxtdxgprrxgo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bWZ0cm5lZ3h0ZHhncHJyeGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTk3MDAsImV4cCI6MjA4ODAzNTcwMH0.gXwofWxiU4GWSm6WOqk8C_jiWjIOT_Ym7y40fgTXEww';

// Initialize Supabase Client with explicit headers to prevent "missing apikey" errors
const supabaseClient = (window.supabase && typeof window.supabase.createClient === 'function')
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        }
    })
    : null;

if (!supabaseClient) {
    console.error("Supabase client failed to initialize. Check if the CDN script is loaded correctly.");
}

/**
 * UTILITY: TRACK EVENT
 */
async function trackEvent(eventType, elementId = null) {
    const timeOnPage = ((Date.now() - pageStartTime) / 1000);

    const event = {
        participant_id: sessionId,
        group_id: appGroup,
        task_number: appStep,
        interface_type: INTERFACE_TYPE,
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
        sid = 'user-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
        sessionStorage.setItem('app_session_id', sid);
    }
    sessionId = sid;
    if (sessionDisplay) {
        sessionDisplay.innerText = `Session: ${sessionId}`;
    }

    // 2. PDF Frame Setup (Interface B & C)
    if (hasPdfFrame && pdfFrame) {
        pdfFrame.src = INITIAL_PDF_URL;
    }

    // 3. Task Card Injection (Two-Phase Flow)
    if (appStep > 0) {
        renderTaskCard(currentPhase);
    }

    // 4. Disable the main "Next Task" button until phase 2 is complete
    const nextBtn = document.getElementById('next-task-button');
    if (nextBtn) {
        nextBtn.disabled = true;
    }

    // Track page load
    trackEvent('page_load', 'window');
}

/**
 * RENDER TASK CARD (Two-Phase)
 */
function renderTaskCard(phase) {
    const taskContainer = document.getElementById('task-description-container');
    if (!taskContainer) return;

    const task = TASKS[appStep];
    if (!task) return;

    const phaseData = task.phases[phase];
    if (!phaseData) return;

    taskContainer.innerHTML = `
        <div class="task-card">
            <span class="task-label">Task ${appStep} — Question ${phase}</span>
            <h2 class="task-card-heading">${task.topic}</h2>
            <p class="task-card-description">${task.description}</p>
            <p class="task-card-hint">${phaseData.hint}</p>

            <div class="option-group">
                <label class="option-box disabled">
                    <input type="radio" name="accuracy-${phase}" value="accurate" disabled>
                    <span class="option-label">${phaseData.options.accurate}</span>
                </label>
                <label class="option-box disabled">
                    <input type="radio" name="accuracy-${phase}" value="inaccurate" disabled>
                    <span class="option-label">${phaseData.options.inaccurate}</span>
                </label>
                <label class="option-box disabled">
                    <input type="radio" name="accuracy-${phase}" value="cannot_answer" disabled>
                    <span class="option-label">I can not answer this</span>
                </label>
            </div>

            <div id="why-textbox-container" style="display: none; margin-bottom: 1rem;">
                <label for="why-textarea" style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">Why? (Optional)</label>
                <textarea id="why-textarea" placeholder="Please elaborate..." style="width: 100%; padding: 0.5rem; border: 2px solid var(--border-color); border-radius: 0.5rem; margin-top: 0.25rem; resize: vertical; min-height: 60px; font-family: inherit; font-size: 0.85rem;"></textarea>
            </div>

            <button class="card-next-button" id="card-next-btn" disabled>
                ${phase === 1 ? 'Continue to Question 2' : 'Next Chatbot'}
            </button>
        </div>
    `;

    // Wire up option box listeners
    const radios = taskContainer.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            optionSelectedInPhase = true;

            const whyContainer = document.getElementById('why-textbox-container');
            if (whyContainer) {
                if (radio.value === 'cannot_answer') {
                    whyContainer.style.display = 'block';
                } else {
                    whyContainer.style.display = 'none';
                }
            }

            trackEvent('option_selected', radio.value);
            checkPhaseCompletion();
        });
    });

    // Wire up the card next button
    const cardNextBtn = document.getElementById('card-next-btn');
    if (cardNextBtn) {
        cardNextBtn.addEventListener('click', handleCardNext);
    }
}

/**
 * CHECK PHASE COMPLETION
 * Enables the card "Next" button if both conditions are met.
 */
function checkPhaseCompletion() {
    const cardNextBtn = document.getElementById('card-next-btn');
    if (cardNextBtn && promptSentInPhase && optionSelectedInPhase) {
        cardNextBtn.disabled = false;
    }
}

/**
 * HANDLE CARD NEXT BUTTON
 */
function handleCardNext() {
    // Check if the user filled out the optional "why" textbox
    const whyContainer = document.getElementById('why-textbox-container');
    const whyTextarea = document.getElementById('why-textarea');
    let whyReason = '';
    if (whyContainer && whyContainer.style.display !== 'none' && whyTextarea) {
        whyReason = whyTextarea.value.trim();
    }

    if (currentPhase === 1) {
        // Move to phase 2: reset state and re-render card
        currentPhase = 2;
        promptSentInPhase = false;
        optionSelectedInPhase = false;

        if (whyReason) {
            trackEvent('cannot_answer_reason', whyReason);
        }
        trackEvent('card_next_click', 'phase_1_complete');

        // Re-enable chat input for phase 2
        const input = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        if (input) {
            input.disabled = false;
            input.placeholder = 'Type your question...';
        }
        if (sendButton) sendButton.disabled = false;

        renderTaskCard(2);
    } else {
        if (whyReason) {
            trackEvent('cannot_answer_reason', whyReason);
        }
        trackEvent('card_next_click', 'phase_2_complete');

        // Disable the card button while navigating
        const cardNextBtn = document.getElementById('card-next-btn');
        if (cardNextBtn) {
            cardNextBtn.disabled = true;
            cardNextBtn.textContent = 'Navigating...';
        }

        // Use the same navigation logic as handleNextTask
        handleNextTask();
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
        if (isInterfaceB) {
            msgDiv.textContent = text;
        } else {
            msgDiv.innerHTML = `${text} <a href="${INITIAL_PDF_URL}" class="citation-link" target="_blank" rel="noopener noreferrer">[1]</a>`;
            const citation = msgDiv.querySelector('.citation-link');
            citation.addEventListener('click', (e) => {
                trackEvent('citation_click', 'citation-link', { pdfUrl: INITIAL_PDF_URL });
            });
        }
    } else {
        msgDiv.textContent = text;
    }

    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * STREAM MESSAGE (word-by-word like ChatGPT)
 */
function streamMessage(text, onComplete) {
    if (emptyState) emptyState.style.display = 'none';

    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ai-message';

    // Create a span for the streaming text
    const textSpan = document.createElement('span');
    msgDiv.appendChild(textSpan);

    chatWindow.appendChild(msgDiv);

    const words = text.split(' ');
    let wordIndex = 0;

    function typeNextWord() {
        if (wordIndex < words.length) {
            textSpan.textContent += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
            wordIndex++;
            chatWindow.scrollTop = chatWindow.scrollHeight;

            // Random delay between 30-80ms per word for natural feel
            const delay = 30 + Math.random() * 50;
            setTimeout(typeNextWord, delay);
        } else {
            // Streaming complete — add citation if not InterfaceB
            if (!isInterfaceB) {
                const citation = document.createElement('a');
                citation.href = INITIAL_PDF_URL;
                citation.className = 'citation-link';
                citation.target = '_blank';
                citation.rel = 'noopener noreferrer';
                citation.textContent = ' [1]';
                citation.addEventListener('click', () => {
                    trackEvent('citation_click', 'citation-link');
                });
                msgDiv.appendChild(citation);
            }

            // Call the completion callback
            if (onComplete) onComplete();
        }
    }

    typeNextWord();
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
    userInput.style.height = 'auto'; // Reset height after send

    // 2. Show the "Thinking" animation
    const indicator = showThinkingIndicator();

    // 2.5 Mark that a prompt was sent in this phase
    promptSentInPhase = true;

    // Disable further input for this phase (one prompt per phase)
    userInput.disabled = true;
    userInput.placeholder = 'Prompt sent — please evaluate the answer above.';
    if (sendBtn) sendBtn.disabled = true;

    // 3. Dynamic Delay based on input length
    // Base 2s + 35ms per character. Min 2.5s, Max 8,5s.
    const dynamicDelay = Math.min(8500, Math.max(2500, 2000 + (text.length * 35)));
    console.log(`Calculating delay for length ${text.length}: ${dynamicDelay}ms`);

    // 4. Wait for the dynamic duration
    setTimeout(() => {
        if (indicator) indicator.remove();

        // Retrieve the specific predefined AI answer for this task and phase
        const aiAnswer = (TASKS[appStep] && TASKS[appStep].phases[currentPhase])
            ? TASKS[appStep].phases[currentPhase].aiAnswer
            : "I am unable to provide an answer at this time.";

        // Post the AI answer word-by-word (streaming effect)
        streamMessage(aiAnswer, () => {
            // Enable option boxes after streaming completes
            const taskContainer = document.getElementById('task-description-container');
            if (taskContainer) {
                const radios = taskContainer.querySelectorAll('input[type="radio"]');
                radios.forEach(radio => radio.disabled = false);
                const labels = taskContainer.querySelectorAll('.option-box');
                labels.forEach(label => label.classList.remove('disabled'));
            }
            checkPhaseCompletion();
        });

        // 5. Interface C Specific: Update PDF iframe with highlighting
        if (isInterfaceC && pdfFrame) {
            const highlightUrl = PDF_BASE_URL + "#:~:text=To%20mitigate%20the%20issue,trust%20in%20the%20AI%20answers.";

            console.log("Updating Interface C PDF frame...");
            pdfFrame.src = "about:blank"; // Reset to ensure reload

            setTimeout(() => {
                pdfFrame.src = highlightUrl;
            }, 100);
        }
    }, dynamicDelay);
}

/**
 * NEXT TASK HANDLER
 */
function handleNextTask() {
    const sequences = {
        'G1': ['InterfaceA.html', 'interfaceB.html', 'interfaceC.html'],
        'G2': ['interfaceB.html', 'interfaceC.html', 'InterfaceA.html'],
        'G3': ['interfaceC.html', 'InterfaceA.html', 'interfaceB.html']
    };

    const currentSequence = sequences[appGroup];

    if (appStep < 3) {
        const nextStep = appStep + 1;
        const nextInterface = currentSequence[nextStep - 1];

        sessionStorage.setItem('app_step', nextStep.toString());
        trackEvent('next_task_click', 'next-task-button');

        // Short delay to ensure tracking event is sent
        setTimeout(() => {
            window.location.href = nextInterface;
        }, 500);
    } else {
        trackEvent('all_tasks_completed', 'next-task-button');
        setTimeout(() => {
            window.location.href = 'questionnaire.html';
        }, 500);
    }
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
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            trackEvent('enter_pressed', 'user-input');
            handleSend();
        }
    });

    // Auto-resize textarea as user types
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });
}

const nextTaskBtn = document.getElementById('next-task-button');
if (nextTaskBtn) {
    nextTaskBtn.addEventListener('click', () => {
        handleNextTask();
    });
}

// Start
document.addEventListener('DOMContentLoaded', init);
