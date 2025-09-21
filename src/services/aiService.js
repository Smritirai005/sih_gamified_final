import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the AI service
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'demo-key');

export const aiService = {
  async generateQuizQuestions(topic, difficulty = 'medium', count = 5) {
    try {
      // For demo purposes, return mock questions if no API key
      if (!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'demo-key') {
        return this.getMockQuestions(topic, difficulty, count);
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Generate ${count} multiple choice quiz questions about ${topic} at ${difficulty} difficulty level. 
      Each question should have 4 options (A, B, C, D) with only one correct answer.
      Format the response as a JSON array with this structure:
      [
        {
          "question": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "Option B",
          "explanation": "Brief explanation of why this is correct"
        }
      ]
      
      Make sure the questions are educational and appropriate for environmental learning.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON from the response
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
      }
      
      // Fallback to mock questions if parsing fails
      return this.getMockQuestions(topic, difficulty, count);
      
    } catch (error) {
      console.error('AI service error:', error);
      return this.getMockQuestions(topic, difficulty, count);
    }
  },

  getMockQuestions(topic, difficulty, count) {
    const questionBank = {
      'Climate Change': [
        {
          question: "What is the primary cause of global warming?",
          options: ["Solar radiation", "Greenhouse gas emissions", "Ocean currents", "Volcanic activity"],
          correctAnswer: "Greenhouse gas emissions",
          explanation: "Greenhouse gases like CO2 trap heat in the atmosphere, causing global warming."
        },
        {
          question: "Which gas is the most significant contributor to the greenhouse effect?",
          options: ["Methane", "Carbon dioxide", "Nitrous oxide", "Water vapor"],
          correctAnswer: "Carbon dioxide",
          explanation: "CO2 is the most abundant greenhouse gas from human activities."
        },
        {
          question: "What is the main source of carbon dioxide emissions?",
          options: ["Deforestation", "Burning fossil fuels", "Agriculture", "Industrial processes"],
          correctAnswer: "Burning fossil fuels",
          explanation: "Fossil fuel combustion is the largest source of CO2 emissions globally."
        }
      ],
      'Renewable Energy': [
        {
          question: "Which renewable energy source is most widely used globally?",
          options: ["Solar power", "Wind power", "Hydroelectric power", "Geothermal energy"],
          correctAnswer: "Hydroelectric power",
          explanation: "Hydroelectric power is the most established and widely used renewable energy source."
        },
        {
          question: "What is the main advantage of solar energy?",
          options: ["Works at night", "No maintenance required", "Abundant and clean", "Works in all weather"],
          correctAnswer: "Abundant and clean",
          explanation: "Solar energy is renewable, abundant, and produces no emissions during operation."
        },
        {
          question: "Which factor most affects wind turbine efficiency?",
          options: ["Turbine color", "Wind speed", "Turbine height", "Blade material"],
          correctAnswer: "Wind speed",
          explanation: "Wind speed is the primary factor determining wind turbine power output."
        }
      ],
      'Ocean Conservation': [
        {
          question: "What percentage of Earth's surface is covered by oceans?",
          options: ["50%", "71%", "80%", "90%"],
          correctAnswer: "71%",
          explanation: "Oceans cover approximately 71% of Earth's surface area."
        },
        {
          question: "What is the main cause of ocean acidification?",
          options: ["Plastic pollution", "Oil spills", "CO2 absorption", "Overfishing"],
          correctAnswer: "CO2 absorption",
          explanation: "Oceans absorb CO2 from the atmosphere, making them more acidic."
        },
        {
          question: "Which marine ecosystem is most threatened by climate change?",
          options: ["Deep sea vents", "Coral reefs", "Kelp forests", "Mangrove swamps"],
          correctAnswer: "Coral reefs",
          explanation: "Coral reefs are highly sensitive to temperature changes and ocean acidification."
        }
      ],
      'Biodiversity': [
        {
          question: "What is biodiversity?",
          options: ["Number of species", "Variety of life on Earth", "Size of ecosystems", "Age of organisms"],
          correctAnswer: "Variety of life on Earth",
          explanation: "Biodiversity refers to the variety of all living organisms and ecosystems."
        },
        {
          question: "Which factor is the greatest threat to biodiversity?",
          options: ["Climate change", "Habitat destruction", "Pollution", "Invasive species"],
          correctAnswer: "Habitat destruction",
          explanation: "Habitat destruction is the leading cause of species extinction worldwide."
        },
        {
          question: "What percentage of species are estimated to be at risk of extinction?",
          options: ["10%", "25%", "50%", "75%"],
          correctAnswer: "25%",
          explanation: "Approximately 25% of assessed species are at risk of extinction."
        }
      ],
      'Water Conservation': [
        {
          question: "What percentage of Earth's water is freshwater?",
          options: ["1%", "3%", "10%", "25%"],
          correctAnswer: "3%",
          explanation: "Only about 3% of Earth's water is freshwater, most of which is frozen."
        },
        {
          question: "Which activity uses the most water in households?",
          options: ["Drinking", "Showering", "Toilet flushing", "Laundry"],
          correctAnswer: "Toilet flushing",
          explanation: "Toilet flushing typically uses the most water in residential settings."
        },
        {
          question: "What is the main cause of water pollution?",
          options: ["Industrial waste", "Agricultural runoff", "Urban runoff", "All of the above"],
          correctAnswer: "All of the above",
          explanation: "Water pollution comes from multiple sources including industrial, agricultural, and urban activities."
        }
      ],
      'Waste Management': [
        {
          question: "What is the most effective way to reduce waste?",
          options: ["Recycling", "Composting", "Reducing consumption", "Incineration"],
          correctAnswer: "Reducing consumption",
          explanation: "The most effective approach is to reduce waste generation at the source."
        },
        {
          question: "How long does it take for a plastic bottle to decompose?",
          options: ["10 years", "100 years", "450 years", "1000 years"],
          correctAnswer: "450 years",
          explanation: "Plastic bottles can take up to 450 years to decompose in the environment."
        },
        {
          question: "What percentage of waste can be recycled?",
          options: ["30%", "50%", "75%", "90%"],
          correctAnswer: "75%",
          explanation: "Approximately 75% of household waste can be recycled or composted."
        }
      ]
    };

    const topicQuestions = questionBank[topic] || questionBank['Climate Change'];
    const shuffled = [...topicQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, topicQuestions.length));
  },

  getAvailableTopics() {
    return [
      'Climate Change',
      'Renewable Energy', 
      'Ocean Conservation',
      'Biodiversity',
      'Water Conservation',
      'Waste Management'
    ];
  }
};

export default aiService;
