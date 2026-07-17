// =========================================================
// data.js - نسخة مبسطة للاختبار (10 كلمات لكل مستوى)
// =========================================================

window.APP_DATA = {
  A1: {
    words: [
      { id: "w1", word: "Hello", translation: "مرحباً", example: "Hello, how are you?" },
      { id: "w2", word: "Goodbye", translation: "وداعاً", example: "Goodbye, see you later." },
      { id: "w3", word: "Thank you", translation: "شكراً لك", example: "Thank you for your help." },
      { id: "w4", word: "Please", translation: "من فضلك", example: "Please, sit down." },
      { id: "w5", word: "Yes", translation: "نعم", example: "Yes, I am here." },
      { id: "w6", word: "No", translation: "لا", example: "No, I don't like it." },
      { id: "w7", word: "I", translation: "أنا", example: "I am a student." },
      { id: "w8", word: "You", translation: "أنتَ / أنتِ", example: "You are my friend." },
      { id: "w9", word: "He", translation: "هو", example: "He is a doctor." },
      { id: "w10", word: "She", translation: "هي", example: "She is a teacher." }
    ],
    grammar: [
      { id: "g1", rule: "الفعل 'to be' في المضارع: I am, You are, He/She/It is" },
      { id: "g2", rule: "أدوات التعريف: a / an / the" }
    ],
    dialogues: [
      { id: "d1", dialogue: "A: Hello, how are you? B: I am fine, thank you." }
    ],
    stories: [
      { id: "s1", story: "My name is Ahmed. I am a student." }
    ],
    quizzes: [
      { id: "q1", question: "How do you say 'مرحباً' in English?", options: ["Hello", "Goodbye", "Thank you", "Please"], answer: "Hello" },
      { id: "q2", question: "What is the translation of 'كتاب'?", options: ["Book", "Pen", "House", "Water"], answer: "Book" }
    ]
  },
  A2: {
    words: [
      { id: "w1", word: "Apartment", translation: "شقة", example: "I live in a small apartment." },
      { id: "w2", word: "Beautiful", translation: "جميل", example: "This city is beautiful." },
      { id: "w3", word: "Breakfast", translation: "إفطار", example: "I eat breakfast at 8 AM." },
      { id: "w4", word: "Dinner", translation: "عشاء", example: "We have dinner at 7 PM." },
      { id: "w5", word: "Lunch", translation: "غداء", example: "I eat lunch at noon." },
      { id: "w6", word: "Delicious", translation: "لذيذ", example: "This food is delicious." },
      { id: "w7", word: "Difficult", translation: "صعب", example: "This exam is difficult." },
      { id: "w8", word: "Easy", translation: "سهل", example: "This lesson is easy." },
      { id: "w9", word: "Expensive", translation: "غالي", example: "This car is expensive." },
      { id: "w10", word: "Cheap", translation: "رخيص", example: "This phone is cheap." }
    ],
    grammar: [
      { id: "g1", rule: "الماضي البسيط: إضافة ed (walk → walked)" },
      { id: "g2", rule: "المضارع المستمر: am/is/are + verb-ing" }
    ],
    dialogues: [
      { id: "d1", dialogue: "A: Can I help you? B: Yes, I'm looking for a book." }
    ],
    stories: [
      { id: "s1", story: "Last weekend, I visited my grandmother." }
    ],
    quizzes: [
      { id: "q1", question: "What is the past tense of 'go'?", options: ["Go", "Went", "Gone", "Going"], answer: "Went" },
      { id: "q2", question: "Which sentence is correct?", options: ["I am reading a book now", "I read a book now", "I reading a book now", "I reads a book now"], answer: "I am reading a book now" }
    ]
  },
  B1: {
    words: [
      { id: "w1", word: "Achieve", translation: "يحقق", example: "He wants to achieve his goals." },
      { id: "w2", word: "Balance", translation: "توازن", example: "I try to keep a balance." },
      { id: "w3", word: "Benefit", translation: "فائدة", example: "Exercise has many benefits." },
      { id: "w4", word: "Challenge", translation: "تحدي", example: "This is a big challenge." },
      { id: "w5", word: "Confident", translation: "واثق", example: "I am confident." },
      { id: "w6", word: "Concentrate", translation: "يركز", example: "Concentrate on the task." },
      { id: "w7", word: "Conscious", translation: "واعي", example: "Be conscious of your health." },
      { id: "w8", word: "Demand", translation: "طلب", example: "There is a high demand." },
      { id: "w9", word: "Deserve", translation: "يستحق", example: "You deserve a reward." },
      { id: "w10", word: "Encourage", translation: "يشجع", example: "My parents encourage me." }
    ],
    grammar: [
      { id: "g1", rule: "المبني للمجهول: be + past participle" },
      { id: "g2", rule: "الجمل الشرطية من النوع الأول: If + present, will + infinitive" }
    ],
    dialogues: [
      { id: "d1", dialogue: "A: I'm worried about the exam. B: Don't worry, you've studied well." }
    ],
    stories: [
      { id: "s1", story: "Maria is a 25-year-old designer. She moved to London." }
    ],
    quizzes: [
      { id: "q1", question: "Choose the correct form: If I ___ you, I would study more.", options: ["was", "were", "am", "be"], answer: "were" },
      { id: "q2", question: "What is the passive form: 'They built this house.'", options: ["This house is built", "This house was built", "This house has built", "This house were built"], answer: "This house was built" }
    ]
  },
  B2: {
    words: [
      { id: "w1", word: "Ambiguous", translation: "غامض", example: "His statement was ambiguous." },
      { id: "w2", word: "Articulate", translation: "يفصح", example: "She articulates her ideas clearly." },
      { id: "w3", word: "Bias", translation: "تحيز", example: "The judge showed no bias." },
      { id: "w4", word: "Coherent", translation: "متماسك", example: "His argument was coherent." },
      { id: "w5", word: "Compensate", translation: "يعوض", example: "The company will compensate you." },
      { id: "w6", word: "Consequence", translation: "عاقبة", example: "Think about the consequences." },
      { id: "w7", word: "Contradict", translation: "يتناقض", example: "His actions contradict his words." },
      { id: "w8", word: "Critical", translation: "حاسم", example: "This is a critical moment." },
      { id: "w9", word: "Demonstrate", translation: "يبرهن", example: "He demonstrated his skills." },
      { id: "w10", word: "Distinguish", translation: "يميز", example: "Can you distinguish the difference?" }
    ],
    grammar: [
      { id: "g1", rule: "الجمل الشرطية المختلطة: If I had studied, I would be a doctor." },
      { id: "g2", rule: "المضارع التام المستمر: have/has + been + verb-ing" }
    ],
    dialogues: [
      { id: "d1", dialogue: "A: I'm concerned about the economic crisis. B: Yes, it's affecting many countries." }
    ],
    stories: [
      { id: "s1", story: "In 2050, the world faced a severe climate crisis." }
    ],
    quizzes: [
      { id: "q1", question: "Choose the correct form: If I had known, I ___ would have helped.", options: ["would", "would have", "will have", "had"], answer: "would have" },
      { id: "q2", question: "What is the translation of 'غامض'?", options: ["Ambiguous", "Articulate", "Coherent", "Critical"], answer: "Ambiguous" }
    ]
  }
};

window.APP_LEVELS = ["A1", "A2", "B1", "B2"];
window.APP_LEVEL_LABELS = {
  A1: "المستوى الأول - مبتدئ",
  A2: "المستوى الثاني - أساسي",
  B1: "المستوى الثالث - متوسط",
  B2: "المستوى الرابع - متوسط متقدم"
};