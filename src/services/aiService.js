import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the AI service
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'demo-key');

export const aiService = {
  // AI Orchestration for analyzing results and providing feedback with resources
  async analyzeResults(results, topic) {
    try {
      // For demo purposes, return mock analysis if no API key
      if (!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'demo-key') {
        return this.getMockAnalysis(results, topic);
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Calculate basic stats
      const totalQuestions = results.length;
      const correctAnswers = results.filter(r => r.isCorrect).length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      
      // Create a detailed prompt for the AI
      const prompt = `
        I need an educational analysis and personalized feedback for a student who completed a quiz on "${topic}".
        
        Quiz Results:
        - Score: ${score}% (${correctAnswers} correct out of ${totalQuestions})
        - Questions and responses:
        ${results.map(r => `
          Question: ${r.question}
          Student's answer: ${r.userAnswer}
          Correct answer: ${r.correctAnswer}
          Was correct: ${r.isCorrect ? 'Yes' : 'No'}
        `).join('\n')}
        
        Please provide:
        1. A brief analysis of their performance
        2. Specific feedback on areas they need to improve
        3. Three specific learning resources with URLs (documentation or YouTube videos) that would help them improve in their weak areas
        
        Format the response as a JSON object with this structure:
        {
          "analysis": "Brief analysis of performance",
          "feedback": "Specific actionable feedback",
          "strengths": ["Strength 1", "Strength 2"],
          "weaknesses": ["Weakness 1", "Weakness 2"],
          "resources": [
            {
              "title": "Resource title",
              "description": "Brief description of resource",
              "url": "URL to resource",
              "type": "documentation or video"
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON from the response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
      }
      
      // Fallback to mock analysis if parsing fails
      return this.getMockAnalysis(results, topic);
      
    } catch (error) {
      console.error('AI analysis error:', error);
      return this.getMockAnalysis(results, topic);
    }
  },
  
  getMockAnalysis(results, topic) {
    const totalQuestions = results.length;
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Generate appropriate feedback based on score
    let analysis, feedback, strengths, weaknesses;
    
    if (score >= 80) {
      analysis = "Excellent performance! You have a strong understanding of " + topic + ".";
      feedback = "While your overall performance is strong, there are still a few concepts you could review to achieve mastery.";
      strengths = ["Strong conceptual understanding", "Good application of knowledge"];
      weaknesses = ["A few minor misconceptions", "Could benefit from deeper exploration"];
    } else if (score >= 60) {
      analysis = "Good performance. You have a solid foundation in " + topic + " but there's room for improvement.";
      feedback = "Focus on the questions you missed and try to understand the underlying concepts better.";
      strengths = ["Good basic knowledge", "Understanding of core concepts"];
      weaknesses = ["Some gaps in knowledge", "Need to strengthen application skills"];
    } else {
      analysis = "You're making progress with " + topic + ", but there are significant areas that need improvement.";
      feedback = "Don't be discouraged! Focus on building your foundational knowledge and revisit the core concepts.";
      strengths = ["Willingness to learn", "Some correct answers show potential"];
      weaknesses = ["Fundamental knowledge gaps", "Need to review basic concepts"];
    }
    
    // Generate mock resources based on topic
    const resources = this.getMockResources(topic);
    
    return {
      analysis,
      feedback,
      strengths,
      weaknesses,
      resources
    };
  },
  
  getMockResources(topic) {
    const resourcesByTopic = {
      'Climate Change': [
        {
          title: "NASA Climate Change: Vital Signs of the Planet",
          description: "Official NASA resource with latest data and explanations about climate change",
          url: "https://climate.nasa.gov/",
          type: "documentation"
        },
        {
          title: "Climate Change Explained | National Geographic",
          description: "Comprehensive video explaining the science behind climate change",
          url: "https://www.youtube.com/watch?v=G4H1N_yXBiA",
          type: "video"
        },
        {
          title: "IPCC Reports - The Science of Climate Change",
          description: "Scientific reports from the Intergovernmental Panel on Climate Change",
          url: "https://www.ipcc.ch/reports/",
          type: "documentation"
        }
      ],
      'Renewable Energy': [
        {
          title: "Renewable Energy Explained | National Geographic",
          description: "Overview of different types of renewable energy sources",
          url: "https://www.youtube.com/watch?v=1kUE0BZtTRc",
          type: "video"
        },
        {
          title: "IRENA - International Renewable Energy Agency",
          description: "Global resource for renewable energy data and policy",
          url: "https://www.irena.org/",
          type: "documentation"
        },
        {
          title: "How Solar Panels Work | TED-Ed",
          description: "Animated explanation of solar panel technology",
          url: "https://www.youtube.com/watch?v=xKxrkht7CpY",
          type: "video"
        }
      ],
      'Ocean Conservation': [
        {
          title: "National Oceanic and Atmospheric Administration (NOAA)",
          description: "Comprehensive resource on ocean science and conservation",
          url: "https://oceanservice.noaa.gov/ocean/",
          type: "documentation"
        },
        {
          title: "How We Can Keep Plastics Out of Our Ocean | National Geographic",
          description: "Video on plastic pollution and solutions",
          url: "https://www.youtube.com/watch?v=HQTUWK7CM-Y",
          type: "video"
        },
        {
          title: "Ocean Conservancy",
          description: "Organization dedicated to ocean conservation with educational resources",
          url: "https://oceanconservancy.org/trash-free-seas/",
          type: "documentation"
        }
      ],
      'Biodiversity': [
        {
          title: "What is Biodiversity? | California Academy of Sciences",
          description: "Clear explanation of biodiversity and its importance",
          url: "https://www.youtube.com/watch?v=GK_vRtHJZu4",
          type: "video"
        },
        {
          title: "Convention on Biological Diversity",
          description: "International agreement for conservation and sustainable use of biodiversity",
          url: "https://www.cbd.int/",
          type: "documentation"
        },
        {
          title: "Biodiversity Hotspots | Conservation International",
          description: "Information about the world's most biodiverse and threatened regions",
          url: "https://www.conservation.org/priorities/biodiversity-hotspots",
          type: "documentation"
        }
      ],
      'Water Conservation': [
        {
          title: "Water Conservation Tips | EPA",
          description: "Practical ways to conserve water in daily life",
          url: "https://www.epa.gov/watersense/start-saving",
          type: "documentation"
        },
        {
          title: "The Global Water Crisis Explained | Our Changing Climate",
          description: "Video explaining water scarcity issues worldwide",
          url: "https://www.youtube.com/watch?v=OCkN_a80VQ8",
          type: "video"
        },
        {
          title: "UN Water - Water Scarcity",
          description: "United Nations resource on global water scarcity challenges",
          url: "https://www.unwater.org/water-facts/scarcity",
          type: "documentation"
        }
      ],
      'Waste Management': [
        {
          title: "How Does Recycling Work? | SciShow",
          description: "Video explaining the recycling process and its challenges",
          url: "https://www.youtube.com/watch?v=zO3jFKiqmHo",
          type: "video"
        },
        {
          title: "EPA - Reducing and Reusing Basics",
          description: "Guide to reducing waste generation and reusing materials",
          url: "https://www.epa.gov/recycle/reducing-and-reusing-basics",
          type: "documentation"
        },
        {
          title: "Composting 101 | National Geographic",
          description: "Guide to composting organic waste at home",
          url: "https://www.nationalgeographic.com/environment/article/how-to-compost",
          type: "documentation"
        }
      ]
    };
    
    // Default to climate change if topic not found
    return resourcesByTopic[topic] || resourcesByTopic['Climate Change'];
  },
  
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
