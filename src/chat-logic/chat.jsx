import React, { useState } from "react";
import { OpenAI } from "openai";
import TreeDiagram from "./diagram"; // Import the TreeDiagram component
import "./chat.css";

const ChatInterface = () => {
  // const [inputText, setInputText] = useState("");
  const [profession, setProfession] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null); // State to store the study plan
  const [prompt, setPrompt] = useState("");

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: "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", // Replace with your OpenAI API key
    dangerouslyAllowBrowser: true, 
  });

  // Function to send a message to OpenAI
  const sendMessage = async () => {
   //  if (!profession.trim() || !selectedProfession.trim() || !prompt.trim() || !selectedLevel.trim()) return;
   if (!prompt.trim()) return;

    setIsLoading(true);

    // Format the input text
//     const formattedInputText = `You are an AI career coach. A user wants to switch from ${profession} to ${selectedProfession}. 
// Their current situation is: ${prompt} (- this text should be secondary than other fields) (answer by json format), They assess their knowledge and skills in the new profession at the following level: ${selectedLevel}.

// Given this information and the skill tree of a {selectedProfession}, 
// 1. Identify the most critical gaps in their skills based on their current situation and level.
// 2. Suggest a step-by-step learning plan tailored to their background.
// 3. Provide one actionable first step they can take today.
// 4. This is a base example of plan (use this as an example) -
// [
//   {
//       "name": "Identify a problem worth solving",
//       "children": [
//           {
//               "name": "Get to know the user",
//               "children": [
//                   {"name": "Find gains and pains",
//                    "children": [
//                       {"name": "Find sources of info about users",
//                        "children": [
//                           {"name": "Find communities where the user talks", "children": []},
//                           {"name": "Find products that user users", "children": []},
//                           {"name": " Learn about tools to find potential users", "children": []},
//                        ]},
//                       {"name": "Do user interviews",
//                        "children": [
//                           {"name": "Prepare an interview plan",
//                            "children": [
//                               {"name": "Ask open- ended questions", "children": []},
//                               {"name": "Be comfortable with silence", "children": []},
//                               {"name": " Don't ask leading questions", "children": []},
//                            ]},
//                           {"name": "Give basic context",
//                            "children": [
//                               {"name": "Make user feel comfortable",
//                                 "children": [
//                                   {"name": "No right/wrong answers", "children": []},
//                                   {"name": "Keep it as informal as possible", "children": []},
//                                 ]},
//                               {"name": " Try to make the user talk about past experiences (vs hypothetical cases)", "children": []},
//                               {"name": " Prepare an overview of the findings", "children": []},
//                            ]},
//                        ]},
//                       {"name": "Do surveys to dig deeper into interview findings",
//                        "children": [
//                           {"name": "Write non- leading questions", "children": []}, 
//                        ]},  
//                     ]},
//                   {"name": "Evaluate how to  define profiles  & segments", "children": []},
//                   {"name": "Create personas", "children": []}
//               ]
//           },
//           {
//               "name": "Identify a user challenge",
//               "children": [
//                   {"name": "Diagnose a user challenge",
//                    "children": [
//                       {"name": "Identify users' "jobs"", "children": []},
//                       {"name": "Identify the pains and gains", "children": []},
//                       {"name": "Initial prioritizing of pains & gains",
//                        "children": [
//                           {"name": "Importance vs difficuly analysis", "children": []},
//                        ]},
//                    ]},
//                   {"name": "Evaluate existing solutions or alternatives to solve a challenge",
//                    "children": [
//                       {"name": "Research how users may be solving the challenge",
//                        "children": [
//                           {"name": "Revise previous survey & interviews, or carry out more", "children": []},
//                        ]},
                    
//                    ]},
//                   {"name": "Construct the user-journey to solve the challenge",
//                    "children": [
//                       {"name": "Determine the context in which the user operates", "children": []},
//                       {"name": "Formulate what a user defines as success", "children": []},
//                       {"name": "Research how to design journey- mapping", "children": []},
//                    ]},
//               ]
//           },
//       ]
//   },
//   {
//       "name": "Identify the right solution to the problem",
//       "children": [
//           {
//               "name": "Set a Mission and a Vision",
//               "children": [
//                   {"name": "Write down Mission & Vision", "children": []}
//               ]
//           },
//           {
//               "name": "Research & identify opportunities",
//               "children": [
//                   {"name": "Formulate solution to pains",
//                    "children": [
//                       {"name": "Write down hypothesis statement", "children": []},
//                    ]},
//                   {"name": "Determine how to measure success",
//                    "children": [
//                       {"name": " Identify North Star Metric", "children": []},
//                    ]}
//                   {"name": "Evaluate how solution fits into customers' lives",
//                    "children": [
//                       {"name": "Create an opportunity solution tree", "children": []},
//                       {"name": "Incorporate solutions & opportunities in journey- map", "children": []},
//                    ]},
//               ]
//           },
//           {
//               "name": "Research  the company landscape",
//               "children": [
//                   {"name": "Research company context",
//                    "children": [
//                       {"name": "Identify key internal & external stakeholders", "children": []},
//                    ]},
//                   {"name": "Evaluate how solution fits  into customers' lives",
//                    "children": [
//                       {"name": "Map stakeholders & business ares with solution", "children": []},
//                    ]},
//                   {"name": "Design business  model",
//                    "children": [
//                       {"name": " Create business canvas", "children": []},
//                    ]},
//                   {"name": "Determine what characteristics matter in the competitive landscape",
//                    "children": [
//                       {"name": "Identify product/business characteristics relevant to the customers", "children": []},
//                    ]},
//                   {"name": "Identify competitors & research them",
//                    "children": [
//                       {"name": "Find publicly available info", "children": []},
//                       {"name": "Fill competitive analysis template", "children": []},
//                    ]}
//               ]
//           },
//           {
//               "name": "Estimate the potential of the solution",
//               "children": [
//                   {"name": "Determine how to monetize the solution", "children": []},
//                   {"name": "Estimate expected results",
//                    "children": [
//                         {"name": "Calculate expected results",
//                          "children": [
//                             {"name": "Prioritize strategies", "children": []},
//                          ]},
//                    ]},
//               ]
//           }
//       ]
//   },
//   {
//       "name": "Build the solution right",
//       "children": [
//           {
//               "name": "Determine  feasibility of  the solution",
//               "children": [
//                   {"name": "Scope the solution",
//                    "children": [
//                       {"name": "Write initial PRD", "children": []},
//                       {"name": "Get design feedback/input", "children": []},
//                    ]},
//                   {"name": "Coordinate technical feasibility analysis",
//                    "children": [
//                       {"name": "Revise PRD with Tech lead", "children": []},
//                    ]}
//               ]
//           },
//           {
//               "name": "Plan the creation of the solution",
//               "children": [
//                   {"name": "Propose how to reduce the solution to an MVP",
//                    "children": [
//                       {"name": "Create an MVP proposition", "children": []},
//                       {"name": "Revise MVP with design & Tech lead", "children": []},
//                    ]},
//                   {"name": "Plan how to break-down the solution into small & meaningful steps",
//                    "children": [
//                       {"name": "Prepare high- level epics", "children": []},
//                    ]},
//                   {"name": "Identify steakholders",
//                    "children": [
//                       {"name": "Identify those involved in the solution-creation",
//                        "children": [
//                           {"name": "Get feedback from key stakeholders", "children": []},
//                        ]},
//                       {"name": "Identify those affected by the solution",
//                        "children": [
//                           {"name": "Diagnose the difference & users (if existing)", "children": []},
//                        ]},
//                    ]},
//                   {"name": "Dissect the work in meaningful individual steps",
//                    "children": [
//                       {"name": "Create a backlog",
//                        "children": [
//                           {"name": "Create user-stories", "children": []},
//                        ]},
//                    ]},
//                   {"name": "Prioritize the work", "children": []}
//               ]
//           },
//           {
//               "name": "Plan the creation of the solution",
//               "children": [
//                   {"name": "Determine how to test if the solution meets quality expectations",
//                    "children": [
//                       {"name": "Plan validation research", "children": []},
//                    ]},
//                   {"name": "Manage the execution of the solution",
//                    "children": [
//                       {"name": "Prepare wireframes", "children": []},
//                       {"name": "Plan prototypes (with designers)", "children": []},
//                       {"name": "Run research",
//                        "children": [
//                           {"name": "User- testing",
//                            "children": [
//                               {"name": "Prepare session guide", "children": []},
//                            ]},
//                        ]},
//                       {"name": "Analyze results of research",
//                        "children": [
//                           {"name": "Decide actions & iterate or advance",
//                            "children": [
//                               {"name": "Adjust backlog", "children": []},
//                            ]},
//                        ]},
//                    ]},
//               ]
//           }
//       ]
//   },
//   {
//       "name": "Bring the solution to the market",
//       "children": [
//           {
//               "name": "Determine  how to measure success",
//               "children": [
//                   {"name": "Propose how to keep track of objectives",
//                    "children": [
//                       {"name": "Define metrics framework",
//                        "children": [
//                           {"name": "Proposed metrics & objectives", "children": []},
//                        ]},
//                    ]},
//               ]
//           },
//           {
//               "name": "Define how to ship  the solution",
//               "children": [{"name": "Evaluate and choose the most appropriate channels to ship the solution",
//                "children": [
//                   {"name": "Identify existing & new channels",
//                    "children": [
//                       {"name": "Gather input from sales/marketing (if existing)", "children": []},
//                    ]},
//                ]},
//                   {"name": "Propose how to bring the solution to the hands of the user",
//                    "children": [
//                       {"name": "Draft GTM plan",
//                        "children": [
//                           {"name": "Write "Press release" doc", "children": []},
//                           ]},
//                    ]},
//               ]
//           }
//       ]
//   },
//   {
//       "name": "Expand the solution",
//       "children": [
//           {
//               "name": "Research and formulate  how to protect the solution",
//               "children": [
//                   {"name": "Define the 'Product Moat'", "children": []},
//                   {"name": "Iterative improvements",
//                    "children": [
//                       {"name": "Identify optimization opportunities",
//                        "children": [
//                           {"name": "Create funnels", "children": []},
//                        ]},
//                       {"name": "Plan A/B/MVT tests",
//                        "children": [
//                           {"name": "Learn statistical concepts for experimentation", "children": []},
//                        ]}, 
//                       ]},
//                    ]},
//                   {"name": "Define engagement strategies",
//                    "children": [
//                       {"name": "Propose gamification techniques", "children": []},
//                       {"name": "Propose heuristic-based improvements", "children": []},
//                    ]}
//               ]
//           },
//           {
//               "name": "Research expansion",
//               "children": [
//                   {"name": "Research how to enter adjacent markets", "children": []},
//                   {"name": "Research secondary user-problems",
//                    "children": [
//                       {"name": "Revise initial list of job statements", "children": []},
//                    ]},
//                   {"name": "Research how to enter adjacent user-segments",
//                    "children": [
//                       {"name": "Review secondary segments and personas", "children": []},
//                    ]},
//                   {"name": "Define growth strategies",
//                    "children": [
//                       {"name": "Identify Product-led-growth opportunities",
//                        "children": [
//                           {"name": "Generate network effects", "children": []},
//                           {"name": "Create viral loops", "children": []},
//                        ]},
//                       {"name": "Create referrals campaigns", "children": []},
//                    ]},
//                   {"name": "Plan how to pivot",
//                    "children": [
//                       {"name": "Determine how to recognize when we need to pivot", "children": []},
//                       {"name": "Recognize when & how to sunset a product", "children": []},
//                    ]}

//               ]
//           }
//       ]
//   }
// ]

// Ensure that the response is structured and easy to follow, making it as practical as possible.

// In answer should be only json (example of answer - {name: "", children: [{name: "", children: [{e.t.c}]}]}), don't use long words in answer, mimium depth 4.`;

   const formattedInputText = `${prompt}`
    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: formattedInputText },
    ]);

    try {
      // Send the message to OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use the GPT-3.5 Turbo model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...messages,
          { role: "user", content: formattedInputText },
        ],
      });

      // Add the assistant's response to the chat
      const responseText = completion.choices[0].message.content;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: responseText },
      ]);

      // Parse the response JSON and set the study plan
      const responseJson = JSON.parse(responseText);
      setStudyPlan(responseJson);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      // setInputText("");
    }
  };

  return (
    <>
    <div className="chat-interface">
      <h2 className="chat-title">Ready to Start?</h2>
      <h3 className="chat-subtitle">Answer a few questions and get your personalized skill tree and first challenge today.</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        {/* <div>
          <label style={{display: "flex", flexDirection: "column"}}>
            <span className="profession"><b>What is Your current profession?</b></span>
            <input
              type="text"
              value={profession}
              placeholder="Ex. Science Teacher"
              onChange={(e) => setProfession(e.target.value)}
              required
              className="profession-input"
            />
          </label>
        </div> */}
        <div>
          <label className="prompt-label">
            <span className="prompt"><b>Describe what change you need</b></span>
            <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
              placeholder="I'm a career changer, I want to become a..."
              className="prompt-input"
            />
          </label>
        </div>
        {/* <div>
          <label>
            <span className="future-profession"><b>What digital career do you want to pursue?</b></span>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              required
              className="future-profession-select"
            >
              <option value="Software Engineer">Software Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Designer">Designer</option>
            </select>
          </label>
        </div> */}
        {/* <div>
          <label>
            <span className="knowledge-level"><b>What is your experience level with digital roles?</b></span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              required
              className="knowledge-level-select"
            >
              <option value="No Experience">No experience in digital roles</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </label>
        </div> */}
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Creating..." : "Create My Skill Tree"}
        </button>
      </form>
     
    </div>
    {studyPlan && 
    <div style={{position: "absolute", top: "130%", width: "100%"}}>
     <div style={{width: "100%", height: "80px", backgroundColor: "yellow", display: "flex", justifyContent: "center", alignItems: "center"}}> <h2>Generated road map for YOU</h2></div>
    <TreeDiagram data={studyPlan} />
    </div>
    }
    </>
  );
};

export default ChatInterface;