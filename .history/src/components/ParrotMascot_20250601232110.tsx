import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { Send, X } from 'lucide-react';

import mascoteAnimadoVideo from '../public/videos/Cotton.mp4';

interface ParrotMascotProps {
  position?: 'left' | 'right';
  message?: string;
}

interface Message {
  text: string;
  type: 'user' | 'bot';
}

const ParrotMascot: React.FC<ParrotMascotProps> = ({ position = 'right' }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const playerRef = useRef<Player>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Olá! Eu sou o Algodinho, especialista em algodão e yield gap! Como posso ajudar?',
      type: 'bot',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });
    playerRef.current?.play();
  }, [controls]);

  const getResponse = async (question: string): Promise<string> => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsTyping(false);

    const normalized = question.toLowerCase();

    if (normalized.includes('yield gap')) {
      return 'O yield gap é a diferença entre a produtividade potencial que poderia ser alcançada e a produtividade real obtida nas fazendas. Trabalho para ajudar os produtores a reduzirem essa diferença!';
    }

    if (normalized.includes('algodão') && normalized.includes('produção')) {
      return 'O Brasil é um dos maiores produtores mundiais de algodão! Nossos principais estados produtores são Mato Grosso e Bahia. A produção sustentável e eficiente é fundamental para o setor.';
    }

    if (normalized.includes('pragas') || normalized.includes('doenças')) {
      return 'O manejo integrado de pragas (MIP) é essencial na cultura do algodão. As principais pragas incluem o bicudo-do-algodoeiro, lagartas e percevejos. É importante fazer monitoramento constante!';
    }

    if (normalized.includes('irrigação')) {
      return 'A irrigação adequada é fundamental para reduzir o yield gap. Recomendo o uso de sistemas eficientes como gotejamento ou pivô central, sempre monitorando a necessidade hídrica da cultura.';
    }

    if (normalized.includes('solo')) {
      return 'O manejo do solo é crucial! Recomendo análises regulares, correção adequada e práticas conservacionistas como plantio direto e rotação de culturas.';
    }

    if (normalized.includes('tecnologia') || normalized.includes('digital')) {
      return 'A agricultura digital tem um papel importante na redução do yield gap! Uso de drones, sensores, GPS e softwares de gestão podem ajudar muito na tomada de decisão.';
    }

    return 'Posso ajudar com informações sobre yield gap, produção de algodão, manejo de pragas e doenças, irrigação, solo e tecnologias! O que você gostaria de saber?';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, type: 'user' as const };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const response = await getResponse(input);
    const botResponse = { text: response, type: 'bot' as const };
    setMessages((prev) => [...prev, botResponse]);
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className={`fixed z-50 ${position === 'right' ? 'right-2 sm:right-4' : 'left-2 sm:left-4'} bottom-2 sm:bottom-4 flex items-end gap-2 sm:gap-4 ${
        position === 'left' ? 'flex-row-reverse' : ''
      }`}
    >
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-[calc(100vw-1rem)] sm:w-full max-w-sm sm:max-w-md overflow-hidden border border-primary-100"
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 sm:p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-50 p-1 flex items-center justify-center overflow-hidden">
                <video
                  src={mascoteAnimadoVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white font-medium text-xs sm:text-sm md:text-base">Algodinho</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-primary-100 transition-colors"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Chat body */}
          <div
            ref={chatRef}
            className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-primary-50/30 to-transparent"
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base ${
                    msg.type === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 rounded-full w-16 sm:w-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-600 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-600 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-600 rounded-full"
                />
              </motion.div>
            )}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-1 sm:gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta..."
                className="flex-1 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white p-2 sm:p-3 rounded-full hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
              >
                <Send size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg w-full max-w-[180px] sm:max-w-xs cursor-pointer flex items-center gap-2 sm:gap-3 border border-primary-100"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary-50 p-1 flex items-center justify-center overflow-hidden">
            <video
              src={mascoteAnimadoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-gray-800 font-medium text-xs sm:text-sm">Olá! Posso ajudar? 🌱</p>
          <div
            className={`absolute ${position === 'right' ? '-right-1 sm:-right-2' : '-left-1 sm:-left-2'} top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white transform rotate-45 border-r border-b border-primary-100`}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ParrotMascot;