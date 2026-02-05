// Main Application Logic

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/identity-calendar/service-worker.js')
            .then(registration => console.log('Service Worker registered:', registration))
            .catch(error => console.log('Service Worker registration failed:', error));
    });
}

// Identity Data
const identities = {
    creator: {
        tagline: 'I am someone who creates meaningful work',
        color: 'creator'
    },
    leader: {
        tagline: 'I am someone who empowers others',
        color: 'leader'
    },
    athlete: {
        tagline: 'I am someone who honors my body',
        color: 'athlete'
    },
    scholar: {
        tagline: 'I am someone who grows every day',
        color: 'scholar'
    }
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const energyZones = {
    peak: { hours: [8, 9, 10, 11], class: 'energy-peak' },
    high: { hours: [6, 7, 14, 15, 16], class: 'energy-high' },
    moderate: { hours: [12, 13, 17, 18, 19], class: 'energy-moderate' },
    low: { hours: [20, 21, 22, 23, 0, 1, 2, 3, 4, 5], class: 'energy-low' }
};

const defaultTimeBlocks = [
    { day: 0, startHour: 6, duration: 2, type: 'creator', label: 'Deep Work' },
    { day: 0, startHour: 12, duration: 1, type: 'leader', label: 'Team Sync' },
    { day: 0, startHour: 17, duration: 1, type: 'athlete', label: 'Workout' },
    { day: 1, startHour: 6, duration: 2, type: 'creator', label: 'Creative Work' },
    { day: 2, startHour: 8, duration: 3, type: 'creator', label: 'Client Projects' },
    { day: 3, startHour: 6, duration: 1, type: 'scholar', label: 'Learning' },
    { day: 4, startHour: 6, duration: 2, type: 'creator', label: 'Content Creation' },
    { day: 5, startHour: 9, duration: 3, type: 'leader', label: 'Strategy Planning' },
    { day: 6, startHour: 8, duration: 2, type: 'athlete', label: 'Recovery & Reflect' }
];

// Load data from localStorage or use defaults
let timeBlocks = JSON.parse(localStorage.getItem('timeBlocks')) || defaultTimeBlocks;
let currentIdentity = localStorage.getItem('currentIdentity') || 'creator';
let currentView = localStorage.getItem('currentView') || 'energy';
let editingBlockIndex = null;

// Modal elements
const guideModal = document.getElementById('guide-modal');
const guideTitle = document.getElementById('guide-title');
const guideContent = document.getElementById('guide-content');
const guideClose = document.getElementById('guide-close');

const blockModal = document.getElementById('block-modal');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');
const blockForm = document.getElementById('block-form');
const cancelBtn = document.getElementById('cancel-btn');
const deleteBtn = document.getElementById('delete-btn');

// Populate hour select
const blockHourSelect = document.getElementById('block-hour');
for (let hour = 6; hour <= 22; hour++) {
    const option = document.createElement('option');
    option.value = hour;
    option.textContent = formatHour(hour);
    blockHourSelect.appendChild(option);
}

// Identity Guide Functions
function showIdentityGuide(identityKey) {
    const guide = identityGuides[identityKey];
    if (!guide) return;
    
    guideTitle.textContent = guide.title;
    
    let content = `
        <p class="guide-tagline">${guide.tagline}</p>
        
        <div class="guide-section">
            <h4 class="guide-section-title">${guide.research.title}</h4>
            <div class="guide-content">${guide.research.content}</div>
        </div>
        
        <div class="guide-section">
            <h4 class="guide-section-title">${guide.optimalTimes.title}</h4>
            <div class="optimal-times">
    `;
    
    guide.optimalTimes.times.forEach(time => {
        content += `
            <div class="time-card">
                <div class="time-label">${time.label}</div>
                <div class="time-value">${time.value}</div>
            </div>
        `;
    });
    
    content += `
            </div>
        </div>
        
        <div class="guide-section">
            <h4 class="guide-section-title">${guide.principles.title}</h4>
            <ul class="principles-list">
    `;
    
    guide.principles.list.forEach(principle => {
        content += `<li>${principle}</li>`;
    });
    
    content += `
            </ul>
        </div>
        
        <div class="guide-section">
            <h4 class="guide-section-title">📋 Suggested Time Blocks</h4>
            <p class="guide-content">Click "Add" to quickly add these research-backed blocks to your calendar:</p>
            <div class="suggested-blocks">
    `;
    
    guide.suggestedBlocks.forEach((block, index) => {
        const [hour, period] = block.time.split(' ');
        content += `
            <div class="block-suggestion">
                <div class="block-info">
                    <div class="block-name">${block.label}</div>
                    <div class="block-details">${block.time} • ${block.duration}h • ${block.description}</div>
                </div>
                <button class="add-block-btn" onclick="quickAddBlock('${identityKey}', ${index})">
                    Add
                </button>
            </div>
        `;
    });
    
    content += `
            </div>
        </div>
    `;
    
    guideContent.innerHTML = content;
    guideModal.classList.add('show');
}

function closeGuideModal() {
    guideModal.classList.remove('show');
}

// Quick add block from suggestion
window.quickAddBlock = function(identityKey, blockIndex) {
    const guide = identityGuides[identityKey];
    const suggestion = guide.suggestedBlocks[blockIndex];
    
    // Parse the time string to get the hour
    const timeStr = suggestion.time.split(' - ')[0]; // Get "6:00 AM" from "6:00 AM - 9:00 AM"
    const [hourStr, period] = timeStr.split(' ');
    const [hour] = hourStr.split(':').map(Number);
    
    // Convert to 24-hour format
    let startHour = hour;
    if (period === 'PM' && hour !== 12) {
        startHour = hour + 12;
    } else if (period === 'AM' && hour === 12) {
        startHour = 0;
    }
    
    // Add block for each suggested day
    suggestion.days.forEach(day => {
        // Check if there's already a block at this time
        const exists = timeBlocks.some(b => 
            b.day === day && 
            b.startHour === startHour
        );
        
        if (!exists) {
            timeBlocks.push({
                day: day,
                startHour: startHour,
                duration: suggestion.duration,
                type: identityKey,
                label: suggestion.label
            });
        }
    });
    
    saveState();
    generateCalendar();
    updateStats();
    
    // Show confirmation
    alert(`Added "${suggestion.label}" to your calendar!`);
};

// Block Management Functions
function openBlockModal(day = null, hour = null, blockIndex = null) {
    editingBlockIndex = blockIndex;
    
    if (blockIndex !== null) {
        const block = timeBlocks[blockIndex];
        modalTitle.textContent = 'Edit Time Block';
        document.getElementById('block-day').value = block.day;
        document.getElementById('block-hour').value = block.startHour;
        document.getElementById('block-duration').value = block.duration;
        document.getElementById('block-label').value = block.label;
        document.getElementById('block-type').value = block.type;
        deleteBtn.style.display = 'block';
    } else {
        modalTitle.textContent = 'Add Time Block';
        blockForm.reset();
        if (day !== null) document.getElementById('block-day').value = day;
        if (hour !== null) document.getElementById('block-hour').value = hour;
        document.getElementById('block-type').value = currentIdentity;
        deleteBtn.style.display = 'none';
    }
    
    blockModal.classList.add('show');
}

function closeBlockModal() {
    blockModal.classList.remove('show');
    editingBlockIndex = null;
}

// State Management
function saveState() {
    localStorage.setItem('timeBlocks', JSON.stringify(timeBlocks));
    localStorage.setItem('currentIdentity', currentIdentity);
    localStorage.setItem('currentView', currentView);
}

function getEnergyZone(hour) {
    for (const [zone, data] of Object.entries(energyZones)) {
        if (data.hours.includes(hour)) return data.class;
    }
    return '';
}

function formatHour(hour) {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
}

function generateCalendar() {
    const table = document.getElementById('calendar-table');
    table.innerHTML = '';

    // Header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th class="time-header">Time</th>`;
    days.forEach((day, idx) => {
        const blockCount = timeBlocks.filter(b => b.day === idx).length;
        headerRow.innerHTML += `
            <th>
                <div class="day-header">
                    <span class="day-name">${day}</span>
                    <span class="day-count">${blockCount} blocks</span>
                </div>
            </th>
        `;
    });
    table.appendChild(headerRow);

    // Time rows (6 AM - 10 PM)
    for (let hour = 6; hour <= 22; hour++) {
        const row = document.createElement('tr');
        const energyClass = currentView === 'energy' ? getEnergyZone(hour) : '';
        
        row.innerHTML = `<td class="time-cell ${energyClass}">${formatHour(hour)}</td>`;
        
        days.forEach((day, dayIdx) => {
            const cell = document.createElement('td');
            cell.className = energyClass;
            cell.dataset.day = dayIdx;
            cell.dataset.hour = hour;
            
            const blockIndex = timeBlocks.findIndex(b => b.day === dayIdx && b.startHour === hour);
            const block = blockIndex >= 0 ? timeBlocks[blockIndex] : null;
            
            if (block) {
                cell.classList.add('has-block');
                const blockDiv = document.createElement('div');
                blockDiv.className = `time-block ${block.type}`;
                blockDiv.style.height = `${block.duration * 48 - 4}px`;
                blockDiv.innerHTML = `
                    <div class="block-label">${block.label}</div>
                    <div class="block-duration">${block.duration}h</div>
                `;
                blockDiv.addEventListener('click', () => openBlockModal(null, null, blockIndex));
                cell.appendChild(blockDiv);
            } else {
                const isOccupied = timeBlocks.some(b => 
                    b.day === dayIdx && hour >= b.startHour && hour < b.startHour + b.duration
                );
                
                if (!isOccupied) {
                    cell.addEventListener('click', () => openBlockModal(dayIdx, hour));
                }
            }
            
            row.appendChild(cell);
        });
        
        table.appendChild(row);
    }
}

function updateStats() {
    const totalScheduled = timeBlocks.reduce((acc, block) => acc + block.duration, 0);
    const available = 168 - totalScheduled;
    const percentage = Math.round((totalScheduled / 56) * 100);
    
    document.getElementById('scheduled-hours').textContent = totalScheduled;
    document.getElementById('available-hours').textContent = available;
    document.getElementById('progress-percentage').textContent = `${percentage}% of intentional time`;
    document.getElementById('progress-fill').style.width = `${percentage}%`;
}

function switchIdentity(identity) {
    currentIdentity = identity;
    
    document.querySelectorAll('.identity-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-identity="${identity}"]`).classList.add('active');
    
    document.getElementById('identity-tagline').textContent = `"${identities[identity].tagline}"`;
    document.getElementById('progress-fill').className = `progress-fill ${identity}`;
    
    saveState();
}

function switchView(view) {
    currentView = view;
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    document.getElementById('energy-legend').style.display = view === 'energy' ? 'flex' : 'none';
    
    generateCalendar();
    saveState();
}

// Event Listeners
document.querySelectorAll('.identity-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        const identity = e.currentTarget.dataset.identity;
        
        // If clicking the info badge or the card while inactive, show guide
        if (!e.currentTarget.classList.contains('active') || e.target.classList.contains('info-badge')) {
            showIdentityGuide(identity);
        } else {
            // If already active, just switch identity
            switchIdentity(identity);
        }
    });
});

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        switchView(view);
    });
});

guideClose.addEventListener('click', closeGuideModal);
guideModal.addEventListener('click', (e) => {
    if (e.target === guideModal) closeGuideModal();
});

modalClose.addEventListener('click', closeBlockModal);
cancelBtn.addEventListener('click', closeBlockModal);
blockModal.addEventListener('click', (e) => {
    if (e.target === blockModal) closeBlockModal();
});

blockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newBlock = {
        day: parseInt(document.getElementById('block-day').value),
        startHour: parseInt(document.getElementById('block-hour').value),
        duration: parseInt(document.getElementById('block-duration').value),
        label: document.getElementById('block-label').value,
        type: document.getElementById('block-type').value
    };

    if (editingBlockIndex !== null) {
        timeBlocks[editingBlockIndex] = newBlock;
    } else {
        timeBlocks.push(newBlock);
    }

    saveState();
    generateCalendar();
    updateStats();
    closeBlockModal();
});

deleteBtn.addEventListener('click', () => {
    if (editingBlockIndex !== null && confirm('Delete this time block?')) {
        timeBlocks.splice(editingBlockIndex, 1);
        saveState();
        generateCalendar();
        updateStats();
        closeBlockModal();
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset to sample week? This will delete your custom schedule.')) {
        timeBlocks = [...defaultTimeBlocks];
        saveState();
        generateCalendar();
        updateStats();
    }
});

// Initialize
switchIdentity(currentIdentity);
switchView(currentView);
generateCalendar();
updateStats();
