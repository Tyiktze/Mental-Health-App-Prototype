export interface ResponsePattern {
  keywords: string[];
  responses: string[];
}

// Patterns for different moods / situations
export const responsePatterns: ResponsePattern[] = [
  // 😢 Sadness
  {
    keywords: ["sad", "unhappy", "down", "depressed", "lonely", "miserable"],
    responses: [
      "I hear that you are feeling sad. Can you tell me more about why?",
      "It's okay to feel this way. What usually helps you when you’re down?",
      "Feeling low is normal. What thoughts are on your mind right now?",
      "I understand. When did you start feeling like this?",
      "Sometimes just talking about it can help. Want to share more?"
    ],
  },
  // 😡 Anger
  {
    keywords: ["angry", "mad", "frustrated", "annoyed", "pissed"],
    responses: [
      "It seems you're feeling angry. What triggered that?",
      "Anger is valid. Can you describe what’s making you feel this way?",
      "Let's explore why this is frustrating you.",
      "Sometimes taking a deep breath helps. Want to try that?",
      "Anger can signal something important. What's bothering you most?"
    ],
  },
  // 😊 Happiness
  {
    keywords: ["happy", "good", "great", "joy", "excited", "love"],
    responses: [
      "That's wonderful to hear! What made you feel this way?",
      "Great! Can you share more about what’s going well?",
      "I love hearing that. What made today good?",
      "It's lovely to celebrate the good moments. Want to tell me more?",
      "Happiness is contagious. What part of your day brought you joy?"
    ],
  },
  // 🍩 Eating / comfort
  {
    keywords: ["donut", "food", "eat", "hungry", "snack", "craving"],
    responses: [
      "Eating can be comforting. How does it make you feel emotionally?",
      "Food is sometimes a coping mechanism. Do you feel better after eating?",
      "It’s normal to turn to food. What other ways help you cope?",
      "Comfort food can be soothing. What makes it helpful for you?",
      "Do you notice how eating affects your mood right now?"
    ],
  },
  // 😰 Anxiety / stress
  {
    keywords: ["anxious", "stress", "nervous", "worried", "overwhelmed", "panic"],
    responses: [
      "It sounds like you’re feeling anxious. Can you tell me more?",
      "Stress can be heavy. What's on your mind right now?",
      "Sometimes noticing your breathing helps when anxious. Want to try?",
      "It's normal to worry, but we can talk through it. What worries you most?",
      "Overthinking can be exhausting. What thought keeps repeating?"
    ],
  },
  // 💭 Self-doubt / negative thinking
  {
    keywords: ["stupid", "worthless", "fail", "can't", "impossible", "bad"],
    responses: [
      "It sounds like you’re doubting yourself. What makes you feel that way?",
      "Everyone feels like this sometimes. Can we look at the evidence?",
      "It’s okay to struggle. What small step could help you now?",
      "Self-criticism can be harsh. How would you speak to a friend feeling this way?",
      "You’re not alone in feeling this. What’s one thing you’ve done well recently?"
    ],
  },
  // 💌 Relationships
  {
    keywords: ["friend", "relationship", "partner", "family", "love", "alone"],
    responses: [
      "Relationships can be complex. Can you tell me more about this situation?",
      "It’s natural to feel strong emotions in relationships. What happened?",
      "Feeling connected or disconnected affects mood. How do you feel right now?",
      "Talking about relationships can help clarify things. Want to share?",
      "Love and support can be tricky. How have you been coping?"
    ],
  }
];

// Generic fallback responses
export const defaultResponses: string[] = [
  "Can you tell me more about that?",
  "How does that make you feel?",
  "That’s interesting. What do you think about it?",
  "Let’s explore that a bit more.",
  "Hmm, I want to understand this better. Can you elaborate?",
  "I see. How does that affect your day?",
  "That sounds significant. How did that make you feel?",
  "Let's pause and reflect on that for a moment. What stands out to you?"
];
