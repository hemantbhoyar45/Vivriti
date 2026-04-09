import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

const Chatbot: React.FC<{ data?: any }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I am your KARTA AI assistant. Ask me about risk score, fraud detection, financial reports, or loan decisions.',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newUserMessage: Message = {
      id: Date.now(),
      text: userText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');

    // Rule-based generic response delay simulated
    setTimeout(() => {
      setMessages((prev) => [...prev, generateBotResponse(userText)]);
    }, 600);
  };

  const generateBotResponse = (text: string): Message => {
    const lowerText = text.toLowerCase();
    let responseText = "Please ask about risk, fraud, or reports.";

    if (lowerText.includes('risk')) {
      responseText = "Risk scoring involves evaluating the probability of default and overall credit analysis to assess loan risk. " + 
        (data?.decision ? `Currently, the XGBoost default risk is ${data.decision.probability_of_default?.toFixed(1)}%.` : '');
    } else if (lowerText.includes('fraud')) {
      responseText = "Fraud detection relies on transaction monitoring, anomaly detection, and cross-checking multiple databases. " + 
        (data?.fraud ? `We detected ${data.fraud.total_signals_found} signals with a risk level of ${data.fraud.overall_fraud_risk}.` : '');
    } else if (lowerText.includes('report')) {
      responseText = "We summarize financial insights, extract loan summaries, and provide automated analysis from documents. " +
        (data?.decision ? `The recommended loan amount is ₹${(data.decision.recommended_loan_amount / 10000000).toFixed(1)} Cr at ${data.decision.recommended_interest_rate}% pa.` : '');
    }

    return {
      id: Date.now() + 1,
      text: responseText,
      sender: 'bot',
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen ? (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <Bot size={20} />
              <span>KARTA Assistant</span>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-message-row ${msg.sender}`}>
                <div className="chatbot-avatar">
                  {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`chatbot-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask about risk, fraud, or loans..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chatbot-send-btn" onClick={handleSend} disabled={!inputValue.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button className="chatbot-fab" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
