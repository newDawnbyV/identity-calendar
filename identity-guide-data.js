// Identity Guide Data with Research-Backed Recommendations

const identityGuides = {
    creator: {
        title: "The Creator",
        tagline: "I am someone who creates meaningful work",
        color: "creator",
        
        research: {
            title: "📊 What Research Shows",
            content: `
                <div class="research-note">
                    <strong>Peak Creative Hours:</strong> Studies from Harvard Business School show that creative professionals produce their highest-quality work during the first 2-4 hours after waking, when cortisol levels are optimal and prefrontal cortex activity is at its peak.
                </div>
                <div class="research-note">
                    <strong>Deep Work Duration:</strong> Cal Newport's research indicates that most people can sustain 3-4 hours of deep, focused creative work per day. Elite performers cluster this time in the morning (6 AM - 12 PM).
                </div>
                <div class="research-note">
                    <strong>Context Switching Cost:</strong> University of California study found that it takes an average of 23 minutes to regain focus after an interruption. Protect your creative blocks ruthlessly.
                </div>
            `
        },
        
        optimalTimes: {
            title: "⏰ Optimal Scheduling",
            times: [
                { label: "Peak Creative Window", value: "6-10 AM" },
                { label: "Secondary Window", value: "3-5 PM" },
                { label: "Avoid Meetings", value: "Before 11 AM" },
                { label: "Batch Communication", value: "12-2 PM" }
            ]
        },
        
        principles: {
            title: "🎯 Evidence-Based Principles",
            list: [
                "<strong>90-Minute Ultradian Rhythms:</strong> Work in 90-minute intervals aligned with your body's natural energy cycles, followed by 15-20 minute breaks.",
                "<strong>Morning Pages Effect:</strong> Studies show that 15-30 minutes of free writing in the morning increases creative output by up to 34% throughout the day.",
                "<strong>Environment Design:</strong> Research from Princeton found that physical clutter reduces your ability to focus by up to 50%. Clear workspace = clear mind.",
                "<strong>Sequential Processing:</strong> Tackle your most important creative work FIRST, before any reactive tasks (email, messages, meetings).",
                "<strong>Circadian Advantage:</strong> Your core body temperature rises throughout the morning, peaking around 11 AM - this correlates directly with analytical thinking ability."
            ]
        },
        
        suggestedBlocks: [
            {
                label: "Deep Creative Work",
                time: "6:00 AM - 9:00 AM",
                duration: 3,
                description: "Your peak creative window. No meetings, no distractions.",
                days: [1, 2, 3, 4, 5] // Monday-Friday
            },
            {
                label: "Creation Sprint",
                time: "6:00 AM - 8:00 AM",
                duration: 2,
                description: "Focused creative session for projects requiring deep thought.",
                days: [0, 1, 2, 3, 4] // Mon-Fri
            },
            {
                label: "Batch Content Creation",
                time: "9:00 AM - 12:00 PM",
                duration: 3,
                description: "Create multiple pieces of content in one focused session.",
                days: [1, 3] // Tue, Thu
            },
            {
                label: "Design & Refinement",
                time: "2:00 PM - 5:00 PM",
                duration: 3,
                description: "Polish and refine work created in morning sessions.",
                days: [0, 2, 4] // Mon, Wed, Fri
            },
            {
                label: "Creative Ritual",
                time: "6:00 AM - 7:00 AM",
                duration: 1,
                description: "Morning pages, meditation, or movement to prime creativity.",
                days: [0, 1, 2, 3, 4, 5, 6] // Daily
            }
        ]
    },
    
    leader: {
        title: "The Leader",
        tagline: "I am someone who empowers others",
        color: "leader",
        
        research: {
            title: "📊 What Research Shows",
            content: `
                <div class="research-note">
                    <strong>Decision Fatigue:</strong> Research from Columbia University shows that decision quality decreases by up to 65% later in the day. Schedule important strategic decisions for morning hours.
                </div>
                <div class="research-note">
                    <strong>Meeting Effectiveness:</strong> Studies show that meetings scheduled between 2-4 PM have 32% higher engagement than morning meetings, as people are more socially attuned post-lunch.
                </div>
                <div class="research-note">
                    <strong>One-on-One Impact:</strong> MIT research indicates that regular 15-30 minute one-on-ones increase team productivity by 23% and reduce turnover by 31%.
                </div>
            `
        },
        
        optimalTimes: {
            title: "⏰ Optimal Scheduling",
            times: [
                { label: "Strategic Thinking", value: "7-10 AM" },
                { label: "Team Meetings", value: "2-4 PM" },
                { label: "One-on-Ones", value: "10 AM-12 PM" },
                { label: "Difficult Conversations", value: "Tuesday 10 AM" }
            ]
        },
        
        principles: {
            title: "🎯 Evidence-Based Principles",
            list: [
                "<strong>Tuesday Peak:</strong> Data from millions of meetings shows Tuesday at 2:30 PM is statistically the most productive time for collaborative decision-making.",
                "<strong>The 2-Hour Rule:</strong> Keep recurring team meetings to 2 hours maximum. Beyond this, retention and engagement drop exponentially.",
                "<strong>Pre-Meeting Prep:</strong> Leaders who spend 15 minutes preparing for each meeting see 42% better outcomes (Harvard Business School).",
                "<strong>Standing 1:1s:</strong> Weekly 15-minute one-on-ones are more effective than monthly hour-long meetings - frequency matters more than duration.",
                "<strong>Delegation Timing:</strong> Delegate new responsibilities early in the week (Monday/Tuesday) when mental models are fresher and learning capacity is higher."
            ]
        },
        
        suggestedBlocks: [
            {
                label: "Strategic Planning",
                time: "7:00 AM - 9:00 AM",
                duration: 2,
                description: "High-level thinking before reactive tasks begin.",
                days: [0, 2] // Mon, Wed
            },
            {
                label: "Team Standup",
                time: "9:00 AM - 10:00 AM",
                duration: 1,
                description: "Daily sync to align team priorities.",
                days: [0, 1, 2, 3, 4] // Mon-Fri
            },
            {
                label: "One-on-Ones",
                time: "10:00 AM - 12:00 PM",
                duration: 2,
                description: "Individual coaching and connection time.",
                days: [1, 3] // Tue, Thu
            },
            {
                label: "Collaboration Block",
                time: "2:00 PM - 4:00 PM",
                duration: 2,
                description: "Team meetings when energy is optimal for discussion.",
                days: [0, 2, 4] // Mon, Wed, Fri
            },
            {
                label: "Leadership Learning",
                time: "7:00 AM - 8:00 AM",
                duration: 1,
                description: "Read leadership content, reflect on team dynamics.",
                days: [0, 3, 5] // Mon, Thu, Sat
            }
        ]
    },
    
    athlete: {
        title: "The Athlete",
        tagline: "I am someone who honors my body",
        color: "athlete",
        
        research: {
            title: "📊 What Research Shows",
            content: `
                <div class="research-note">
                    <strong>Morning Exercise Advantage:</strong> Journal of Physiology study found that exercising before breakfast increases fat burning by 20% and improves insulin sensitivity throughout the day.
                </div>
                <div class="research-note">
                    <strong>Cognitive Boost:</strong> University of British Columbia research shows that aerobic exercise increases hippocampus size (memory center) and boosts focus for 2-3 hours post-workout.
                </div>
                <div class="research-note">
                    <strong>Sleep-Exercise Connection:</strong> National Sleep Foundation data indicates that morning exercisers have 50% better sleep quality than evening exercisers.
                </div>
            `
        },
        
        optimalTimes: {
            title: "⏰ Optimal Scheduling",
            times: [
                { label: "Peak Strength", value: "3-6 PM" },
                { label: "Best for Fat Loss", value: "6-8 AM (fasted)" },
                { label: "Recovery Window", value: "30 min post-workout" },
                { label: "Sleep Optimization", value: "No exercise after 8 PM" }
            ]
        },
        
        principles: {
            title: "🎯 Evidence-Based Principles",
            list: [
                "<strong>Body Temperature Rhythm:</strong> Your body reaches peak temperature between 4-5 PM, correlating with maximum muscle strength and reaction time - ideal for high-intensity training.",
                "<strong>Protein Timing:</strong> Research shows consuming 20-30g protein within 30 minutes post-workout maximizes muscle protein synthesis.",
                "<strong>Active Recovery:</strong> Light movement (walking, yoga) on rest days increases overall fitness gains by 15-20% compared to complete rest.",
                "<strong>Sleep Priority:</strong> Athletes need 7-9 hours of sleep. Each hour below 7 increases injury risk by 11% (Stanford study).",
                "<strong>Consistency > Intensity:</strong> Working out 4-5x per week at moderate intensity beats 1-2x per week at high intensity for long-term results."
            ]
        },
        
        suggestedBlocks: [
            {
                label: "Morning Workout",
                time: "6:00 AM - 7:00 AM",
                duration: 1,
                description: "Fasted cardio or mobility for metabolic boost.",
                days: [0, 2, 4] // Mon, Wed, Fri
            },
            {
                label: "Strength Training",
                time: "4:00 PM - 5:30 PM",
                duration: 2,
                description: "Peak strength window for lifting.",
                days: [1, 3, 5] // Tue, Thu, Sat
            },
            {
                label: "Active Recovery",
                time: "7:00 AM - 8:00 AM",
                duration: 1,
                description: "Yoga, walking, or light movement.",
                days: [1, 3, 5, 6] // Tue, Thu, Sat, Sun
            },
            {
                label: "Meal Prep",
                time: "6:00 PM - 7:00 PM",
                duration: 1,
                description: "Prepare nutritious meals for the week.",
                days: [6] // Sunday
            },
            {
                label: "Mobility & Stretch",
                time: "8:00 PM - 8:30 PM",
                duration: 1,
                description: "Wind-down stretching to improve recovery.",
                days: [0, 1, 2, 3, 4] // Mon-Fri
            }
        ]
    },
    
    scholar: {
        title: "The Scholar",
        tagline: "I am someone who grows every day",
        color: "scholar",
        
        research: {
            title: "📊 What Research Shows",
            content: `
                <div class="research-note">
                    <strong>Optimal Learning Window:</strong> Research from UCLA shows that learning is most effective between 10 AM - 2 PM and 4 PM - 10 PM, when attention and memory consolidation are strongest.
                </div>
                <div class="research-note">
                    <strong>Spaced Repetition:</strong> Studies show that reviewing material after 1 day, 3 days, and 7 days increases long-term retention by 400% compared to cramming.
                </div>
                <div class="research-note">
                    <strong>Reading Comprehension:</strong> Stanford research found that reading before bed improves retention by 23% due to memory consolidation during sleep.
                </div>
            `
        },
        
        optimalTimes: {
            title: "⏰ Optimal Scheduling",
            times: [
                { label: "Peak Learning", value: "10 AM-2 PM" },
                { label: "Best Retention", value: "4-8 PM" },
                { label: "Reading Window", value: "8-10 PM" },
                { label: "Review Sessions", value: "Morning (30 min)" }
            ]
        },
        
        principles: {
            title: "🎯 Evidence-Based Principles",
            list: [
                "<strong>The Feynman Technique:</strong> Research shows that teaching material to someone else (or writing about it) increases retention by 90% compared to passive reading.",
                "<strong>Interleaving Effect:</strong> Mixing different subjects in one study session improves long-term retention by 43% vs. studying one subject at a time.",
                "<strong>20-Minute Rule:</strong> Maximum focus for learning new concepts is 20 minutes. Take 5-minute breaks between segments for optimal absorption.",
                "<strong>Morning Reflection:</strong> Journaling for 10 minutes each morning has been shown to increase self-awareness and goal achievement by 42%.",
                "<strong>Sleep-Learning Link:</strong> Your brain consolidates new information during sleep. Learning new material within 3 hours of bedtime enhances retention."
            ]
        },
        
        suggestedBlocks: [
            {
                label: "Learning Session",
                time: "10:00 AM - 12:00 PM",
                duration: 2,
                description: "Peak learning window for new concepts.",
                days: [0, 2, 4] // Mon, Wed, Fri
            },
            {
                label: "Reading Time",
                time: "8:00 PM - 9:00 PM",
                duration: 1,
                description: "Read books, articles, or research papers.",
                days: [0, 1, 2, 3, 4, 5, 6] // Daily
            },
            {
                label: "Morning Reflection",
                time: "6:00 AM - 6:30 AM",
                duration: 1,
                description: "Journaling and reviewing yesterday's learning.",
                days: [0, 1, 2, 3, 4] // Mon-Fri
            },
            {
                label: "Skill Practice",
                time: "4:00 PM - 6:00 PM",
                duration: 2,
                description: "Hands-on practice of new skills.",
                days: [1, 3] // Tue, Thu
            },
            {
                label: "Course Work",
                time: "7:00 PM - 9:00 PM",
                duration: 2,
                description: "Online courses, tutorials, or structured learning.",
                days: [0, 2, 4, 6] // Mon, Wed, Fri, Sun
            }
        ]
    }
};
