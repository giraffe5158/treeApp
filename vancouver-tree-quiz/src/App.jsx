import React, { useState, useEffect } from 'react';
import { Trees, RefreshCw, CheckCircle, XCircle, Info, MapPin, Leaf } from 'lucide-react';

// Updated Vancouver Tree Species Question Bank
const questionBank = [
  {
    "image": "https://jfschmidt.com/wp-content/uploads/2023/02/prunus-akebono-web-01.jpg",
    "correctAnswer": "Akebono Flowering Cherry",
    "description": "A popular ornamental cherry with soft pink spring blossoms that fade to white.",
    "characteristics": "Akebono cherries are celebrated every spring in Vancouver's Cherry Blossom Festival.",
    "locations": "Downtown Vancouver streets and Queen Elizabeth Park",
    "scientificName": "Prunus x yedoensis 'Akebono'"
  },
  {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/American_Elm_Tree%2C_Old_South_Street%2C_Northampton%2C_MA_-_October_2019.jpg/2560px-American_Elm_Tree%2C_Old_South_Street%2C_Northampton%2C_MA_-_October_2019.jpg",
    "correctAnswer": "American Elm",
    "description": "A tall, vase-shaped shade tree known for its resilience and broad canopy.",
    "characteristics": "Once devastated by Dutch elm disease, resistant cultivars are now making a comeback.",
    "locations": "Mount Pleasant boulevards and older heritage neighbourhoods",
    "scientificName": "Ulmus americana"
  },
  {
    "image": "https://jfschmidt.com/wp-content/uploads/2023/03/acer-armstrong-web-01.jpg",
    "correctAnswer": "Armstrong Red Maple",
    "description": "A narrow, upright variety of red maple prized for fall color.",
    "characteristics": "Armstrong maples can grow up to 60 feet but only spread about 15 feet wide.",
    "locations": "Cambie Street medians",
    "scientificName": "Acer rubrum 'Armstrong'"
  },
  {
    "image": "https://jfschmidt.com/wp-content/uploads/2023/03/acer-bowhall-web-01.jpg",
    "correctAnswer": "Bowhall Red Maple",
    "description": "An upright red maple cultivar with brilliant scarlet foliage in autumn.",
    "characteristics": "Bowhall maples are a favourite choice for narrow boulevards due to their columnar form.",
    "locations": "Commercial Drive street plantings",
    "scientificName": "Acer rubrum 'Bowhall'"
  },
  {
    "image": "https://live.staticflickr.com/4149/4999153242_b63fc99dde_b.jpg",
    "correctAnswer": "Crimean Linden",
    "description": "A hybrid linden tree known for its fragrant flowers and heart-shaped leaves.",
    "characteristics": "Its blossoms attract bees and are often used for herbal teas.",
    "locations": "Stanley Park pathways",
    "scientificName": "Tilia × euchlora"
  },
  {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pseudotsuga_menziesii_7971.JPG/250px-Pseudotsuga_menziesii_7971.JPG",
    "correctAnswer": "Douglas Fir",
    "description": "A massive evergreen conifer and one of BC's most iconic trees.",
    "characteristics": "Despite its name, it is not a true fir but belongs to its own genus, Pseudotsuga.",
    "locations": "Pacific Spirit Regional Park and UBC Endowment Lands",
    "scientificName": "Pseudotsuga menziesii"
  },
  {
    "image": "https://www.thespruce.com/thmb/ajlURmnsChmnaWUy90KBLgr9Nqc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/european-beech-growing-profile-3269265-hero-891f1d8f46924f19ac0f507a4eb1d481.JPG",
    "correctAnswer": "European Beech",
    "description": "A stately deciduous tree with smooth gray bark and dense foliage.",
    "characteristics": "Beech trees can live for more than 300 years and develop enormous canopies.",
    "locations": "Shaughnessy neighbourhood estates",
    "scientificName": "Fagus sylvatica"
  },
  {
    "image": "https://jfschmidt.com/wp-content/uploads/2023/02/acer-hedge-web-01.jpg",
    "correctAnswer": "Hedge Maple",
    "description": "A small, rounded maple often used for hedging and landscaping.",
    "characteristics": "It's one of the toughest maples, thriving even in compacted urban soils.",
    "locations": "Residential boulevards in East Vancouver",
    "scientificName": "Acer campestre"
  },
  {
    "image": "https://cdn.mos.cms.futurecdn.net/sibuqiWSHLXtk7Rib6zmTE.jpg",
    "correctAnswer": "Horse Chestnut",
    "description": "A large shade tree with showy white spring flowers and spiny seed pods.",
    "characteristics": "Conkers, the tree's seeds, are traditionally used in a British children's game.",
    "locations": "West End neighbourhood avenues",
    "scientificName": "Aesculus hippocastanum"
  },
  {
    "image": "https://www.thegardenwebsite.com/uploads/8/4/5/5/84557242/published/cercidiphyllum-japonicum-stratford-oct-2019-4.jpg?1696046852",
    "correctAnswer": "Katsura Tree",
    "description": "A graceful tree with heart-shaped leaves that turn orange and pink in fall.",
    "characteristics": "In autumn, its fallen leaves release a sweet, candy-like fragrance.",
    "locations": "VanDusen Botanical Garden",
    "scientificName": "Cercidiphyllum japonicum"
  },
  {
    "image": "https://jurassicplants.co.uk/cdn/shop/products/image_2.jpg?v=1628685011",
    "correctAnswer": "Kobus Magnolia",
    "description": "A small magnolia tree with fragrant white blossoms in early spring.",
    "characteristics": "Kobus magnolia blooms before its leaves emerge, making flowers extra striking.",
    "locations": "Kitsilano front yards",
    "scientificName": "Magnolia kobus"
  },
  {
    "image": "https://gardenlady.com/wp-content/uploads/kwanzan_cherry_may.jpg",
    "correctAnswer": "Kwanzan Flowering Cherry",
    "description": "A striking ornamental cherry with double pink blossoms in clusters.",
    "characteristics": "Kwanzan cherries are sterile — they never produce fruit, only flowers.",
    "locations": "Graville Island and Kerrisdale streets",
    "scientificName": "Prunus serrulata 'Kwanzan'"
  },
  {
    "image": "https://i.etsystatic.com/12577562/r/il/d477b2/4716644649/il_1080xN.4716644649_j8l2.jpg",
    "correctAnswer": "Night Purple Leaf Plum",
    "description": "A small ornamental plum with deep purple foliage and pale pink blossoms.",
    "characteristics": "It provides year-round color with purple leaves even in summer.",
    "locations": "Residential front gardens in Mount Pleasant",
    "scientificName": "Prunus cerasifera 'Nigra'"
  },
  {
    "image": "https://trees.umn.edu/sites/trees.umn.edu/files/2020-12/Norway%20maple%20form_1.JPG",
    "correctAnswer": "Norway Maple",
    "description": "A widely planted shade tree with broad leaves and yellow fall color.",
    "characteristics": "Introduced to North America, it is considered invasive in some regions.",
    "locations": "Older boulevards throughout Vancouver",
    "scientificName": "Acer platanoides"
  },
  {
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Pin_oak_quercus_palustris.jpg",
    "correctAnswer": "Pin Oak",
    "description": "A pyramidal oak tree with deeply lobed leaves and reddish fall color.",
    "characteristics": "Its lower branches often droop toward the ground, a unique oak habit.",
    "locations": "Oakridge neighbourhood streets",
    "scientificName": "Quercus palustris"
  },
  {
    "image": "https://plants.glasshousenursery.ca/Content/Images/Photos/A094-16.jpg",
    "correctAnswer": "Pissard Plum",
    "description": "A flowering plum with purple foliage and pale pink spring blossoms.",
    "characteristics": "Also known as Purpleleaf Plum, it adds dramatic color contrast in landscapes.",
    "locations": "Kerrisdale and Kitsilano residential areas",
    "scientificName": "Prunus cerasifera 'Pissardii'"
  },
  {
    "image": "https://jfschmidt.com/wp-content/uploads/2023/03/carpinus-pyramidaleuropean-web-02.jpg",
    "correctAnswer": "Pyramidal European Hornbeam",
    "description": "A narrow, columnar tree with dense, bright green foliage.",
    "characteristics": "It's commonly used as a natural screen or hedge due to its tight shape.",
    "locations": "Downtown Vancouver plazas",
    "scientificName": "Carpinus betulus 'Fastigiata'"
  },
  {
    "image": "https://rockwoodforest.com/cdn/shop/products/J144-16_2_ee7a4853-516a-48a4-9bdd-70a2b09cc1af_grande.jpg?v=1642551295",
    "correctAnswer": "Red Maple",
    "description": "A fast-growing maple with brilliant red foliage in fall.",
    "characteristics": "Red maple is one of the most common and adaptable native trees in North America.",
    "locations": "East Vancouver streets and parks",
    "scientificName": "Acer rubrum"
  },
  {
    "image": "https://lh5.googleusercontent.com/proxy/WHA8SxifdSlLTWMW45SaotS4t23_nrcxlWTN2dVjE00s75TO9eOQGuLuMJoxSQTKkm0xIB7wxR3KuYNrXFWi4tjpUnkavdHGPGb_DJg3tdw4B97_sA",
    "correctAnswer": "Red Oak",
    "description": "A strong shade tree with distinctive pointed-lobed leaves and acorns.",
    "characteristics": "Red oak wood is highly valued for flooring and furniture.",
    "locations": "Kitsilano and West End streets",
    "scientificName": "Quercus rubra"
  },
  {
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Thuja_plicata_Vancouver.jpg",
    "correctAnswer": "Western Red Cedar",
    "description": "A culturally significant evergreen tree in the Pacific Northwest.",
    "characteristics": "Used by Coast Salish peoples for canoes, clothing, and totem poles.",
    "locations": "Stanley Park and Pacific Spirit Park",
    "scientificName": "Thuja plicata"
  }
];

const VancouverTreeQuizApp = () => {
  const [lives, setLives] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);

  // Generate random incorrect options for each question
  const generateOptions = (correctAnswer, allQuestions) => {
    const incorrectOptions = allQuestions
      .filter(q => q.correctAnswer !== correctAnswer)
      .map(q => q.correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctAnswer, ...incorrectOptions]
      .sort(() => Math.random() - 0.5);
    
    return allOptions;
  };

  // Initialize and shuffle questions on mount
  useEffect(() => {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    const questionsWithOptions = shuffled.map(question => ({
      ...question,
      options: generateOptions(question.correctAnswer, questionBank)
    }));
    setQuestions(questionsWithOptions);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      
      setTimeout(() => {
        if (currentQuestionIndex + 1 >= questions.length) {
          setGameState('won');
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        }
      }, 2000);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      
      setTimeout(() => {
        if (newLives <= 0) {
          setGameState('lost');
        } else {
          if (currentQuestionIndex + 1 >= questions.length) {
            setGameState('won');
          } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
          }
        }
      }, 2000);
    }
  };

  const restartGame = () => {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    const questionsWithOptions = shuffled.map(question => ({
      ...question,
      options: generateOptions(question.correctAnswer, questionBank)
    }));
    setQuestions(questionsWithOptions);
    setLives(3);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState('playing');
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getButtonClass = (option) => {
    if (!showFeedback) {
      return "w-full p-4 bg-white border-2 border-green-300 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all duration-200 font-medium text-gray-800 active:scale-95";
    }
    
    if (option === currentQuestion.correctAnswer) {
      return "w-full p-4 bg-green-100 border-2 border-green-500 rounded-lg font-medium text-green-800";
    }
    
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return "w-full p-4 bg-red-100 border-2 border-red-500 rounded-lg font-medium text-red-800";
    }
    
    return "w-full p-4 bg-gray-100 border-2 border-gray-300 rounded-lg font-medium text-gray-400";
  };

  if (questions.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Instructions Modal
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full max-h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Vancouver Tree Resources</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">City of Vancouver Tree Data:</h3>
              <p className="text-sm mb-2">Vancouver has 151,238+ documented public trees!</p>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Most Common:</strong> Kwanzan Cherry, Pissard Plum, Norway Maple</li>
                <li>• <strong>Open Data Portal:</strong> <a href="https://opendata.vancouver.ca/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">opendata.vancouver.ca</a></li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Tree Identification Resources:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>BC Tree Book:</strong> Free guide to 40+ native BC trees</li>
                <li>• <strong>Vancouver Trees App:</strong> UBC's catalog of 1,000 Metro Vancouver trees</li>
                <li>• <strong>iNaturalist:</strong> Community-driven species identification</li>
                <li>• <strong>E-Flora BC:</strong> UBC's electronic atlas of BC flora</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Featured Trees Include:</h3>
              <p className="text-sm">Native species like Douglas Fir and Western Red Cedar, plus popular ornamentals like flowering cherries, maples, and lindens found throughout Vancouver's streets and parks.</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (gameState !== 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {gameState === 'won' ? '🌳' : '🍂'}
          </div>
          <h2 className="text-3xl font-bold mb-2 text-green-800">
            {gameState === 'won' ? 'Tree Expert!' : 'Keep Learning!'}
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            You identified {score} out of {questions.length} trees correctly!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {score >= 18 ? "Outstanding! You really know Vancouver's trees!" :
             score >= 14 ? "Great job! You're well on your way to being a tree expert." :
             score >= 8 ? "Good start! Keep exploring Vancouver's urban forest." :
             "Trees take time to learn. Try again and improve your score!"}
          </p>
          <button
            onClick={restartGame}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trees className="text-green-600" size={24} />
              <span className="text-lg font-semibold text-gray-700">
                Vancouver Trees · {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            
            {/* Lives */}
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Leaf
                  key={i}
                  size={28}
                  className={i < lives ? 'text-green-500 fill-green-500' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>
          
          {/* Score and Location */}
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Score: {score}</span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              Vancouver, BC
            </span>
          </div>
        </div>

        {/* Main Quiz Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Image Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-full max-w-2xl mb-4 bg-gray-100 rounded-2xl overflow-hidden">
              <img 
                src={currentQuestion.image} 
                alt="Tree identification"
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x400/4ade80/ffffff?text=${currentQuestion.correctAnswer.replace(' ', '+')}`;
                }}
              />
            </div>
            <p className="text-gray-600 text-center italic mb-2">
              {currentQuestion.description}
            </p>
            {currentQuestion.scientificName && (
              <p className="text-sm text-gray-500 italic">
                {currentQuestion.scientificName}
              </p>
            )}
          </div>

          {/* Feedback Message */}
          {showFeedback && (
            <div className={`mb-4 p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correctAnswer 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-start gap-2">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                ) : (
                  <XCircle size={20} className="mt-1 flex-shrink-0" />
                )}
                <div>
                  <span className="font-medium">
                    {selectedAnswer === currentQuestion.correctAnswer 
                      ? "Correct! " 
                      : `Incorrect. The answer is ${currentQuestion.correctAnswer}. `}
                  </span>
                  <div className="text-sm mt-1">
                    <strong>Fun Fact:</strong> {currentQuestion.characteristics}
                  </div>
                  <div className="text-sm">
                    <strong>Where to find:</strong> {currentQuestion.locations}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className={getButtonClass(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setShowInstructions(true)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <Info size={16} />
            Tree Resources & Data Sources
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Identify Vancouver's urban forest
          </div>
        </div>
      </div>
    </div>
  );
};

export default VancouverTreeQuizApp;