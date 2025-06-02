import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { Send, X } from 'lucide-react';
import mascoteAnimadoVideo from '../public/videos/Cotton.mp4';

interface ParrotMascotProps {
  position?: 'left' | 'right';
  message?: string;
  isMobile?: boolean;
}

interface Message {
  text: string;
  type: 'user' | 'bot';
}

const ParrotMascot: React.FC<ParrotMascotProps> = ({ position = 'right', isMobile = false }) => {
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

  const chatWidth = isMobile ? 'w-[calc(100vw-32px)]' : 'w-full max-w-md';
  const chatHeight = isMobile ? 'max-h-[65vh]' : 'max-h-[60vh]';
  const inputTextSize = isMobile ? 'text-sm' : 'text-base';

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
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const normalized = question.toLowerCase();

    if (normalized.includes('yield gap') || normalized.includes('lacuna de produtividade')) {
      setIsTyping(false);
      return 'O yield gap (lacuna de produtividade) é a diferença entre a produtividade potencial que poderia ser alcançada em condições ideais e a produtividade real obtida nas fazendas. Na cultura do algodão, fatores como manejo, clima, solo e tecnologia aplicada influenciam diretamente essa diferença.';
    }
    
    if (normalized.includes('algodão') || normalized.includes('algodao')) {
      setIsTyping(false);
      return 'O algodão é uma das culturas mais importantes do agronegócio brasileiro. O Brasil é um dos maiores produtores e exportadores mundiais. A cultura exige cuidados específicos com irrigação, controle de pragas e manejo adequado para atingir altos rendimentos.';
    }
    
    if (normalized.includes('tecnologia') || normalized.includes('agricultura 4.0')) {
      setIsTyping(false);
      return 'Na cotonicultura, tecnologias como sensores IoT, imagens de satélite, drones e IA ajudam a monitorar a lavoura, otimizar irrigação, detectar pragas precocemente e prever produtividade. Isso reduz o yield gap e aumenta a eficiência.';
    }
    
    if (normalized.includes('produtividade') || normalized.includes('rendimento')) {
      setIsTyping(false);
      return 'Para aumentar a produtividade do algodão, é essencial: 1) Melhoramento genético, 2) Manejo integrado de pragas, 3) Irrigação eficiente, 4) Adubação balanceada, 5) Colheita no momento certo. A tecnologia pode ajudar em cada uma dessas etapas!';
    }
    
    if (normalized.includes('praga') || normalized.includes('doença')) {
      setIsTyping(false);
      return 'As principais pragas do algodão são o bicudo-do-algodoeiro, pulgões e lagartas. Doenças como ramulária e mofo-branco também causam perdas. O MIP (Manejo Integrado de Pragas) combinado com monitoramento tecnológico é a melhor estratégia de controle.';
    }
    
    if (normalized.includes('solo') || normalized.includes('fertilidade')) {
      setIsTyping(false);
      return 'O algodão se desenvolve melhor em solos profundos, bem drenados e com boa fertilidade. Análises de solo regulares e agricultura de precisão ajudam a aplicar fertilizantes de forma otimizada, reduzindo custos e aumentando produtividade.';
    }

    setIsTyping(false);
    return 'Como especialista em algodão, posso te ajudar com informações sobre: yield gap, tecnologias agrícolas, manejo do algodão, aumento de produtividade e controle de pragas. Sobre o que você gostaria de saber? 🌱';
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
      className={`fixed z-50 ${position === 'right' ? 'right-2 xs:right-4' : 'left-2 xs:left-4'} bottom-2 xs:bottom-4 flex items-end gap-2 xs:gap-3 ${
        position === 'left' ? 'flex-row-reverse' : ''
      }`}
    >
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={`bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg xs:shadow-xl sm:shadow-2xl ${chatWidth} overflow-hidden border border-primary-100`}
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 xs:p-3 sm:p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-primary-50 p-1 flex items-center justify-center overflow-hidden">
                <video
                  src={mascoteAnimadoVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white font-medium text-xs xs:text-sm sm:text-base">Algodinho</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-primary-100 transition-colors"
              aria-label="Fechar chat"
            >
              <X size={isMobile ? 16 : 20} />
            </button>
          </div>

          {/* Chat body */}
          <div
            ref={chatRef}
            className={`${chatHeight} overflow-y-auto p-2 xs:p-3 sm:p-4 space-y-2 xs:space-y-3 sm:space-y-4 bg-gradient-to-b from-primary-50/30 to-transparent`}
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
                  className={`max-w-[90%] xs:max-w-[85%] sm:max-w-[80%] p-2 xs:p-3 rounded-lg xs:rounded-xl text-xs xs:text-sm sm:text-base ${
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
                className="flex gap-1 xs:gap-2 px-2 xs:px-3 py-1 xs:py-2 bg-gray-100 rounded-full w-14 xs:w-16 sm:w-20"
              >
                {[0, 0.2, 0.4].map((delay) => (
                  <motion.div
                    key={delay}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay }}
                    className="w-2 h-2 xs:w-2.5 xs:h-2.5 bg-primary-600 rounded-full"
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-2 xs:p-3 sm:p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-1 xs:gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta..."
                className={`flex-1 px-3 xs:px-4 py-1 xs:py-2 ${inputTextSize} border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent`}
              />
              <button
                type="submit"
                className="bg-primary-600 text-white p-2 xs:p-3 rounded-full hover:bg-primary-700 transition-colors shadow hover:shadow-md active:scale-95"
                aria-label="Enviar mensagem"
              >
                <Send size={isMobile ? 16 : 20} />
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white p-2 xs:p-3 rounded-lg xs:rounded-xl shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 xs:gap-3 border border-primary-100"
          onClick={() => setIsOpen(true)}
          role="button"
          aria-label="Abrir chat com Algodinho"
        >
          <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-primary-50 p-1 flex items-center justify-center overflow-hidden">
            <video
              src={mascoteAnimadoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-gray-800 font-medium text-xs xs:text-sm">Olá! Posso ajudar? 🌱</p>
          <div
            className={`absolute ${position === 'right' ? '-right-1.5 xs:-right-2' : '-left-1.5 xs:-left-2'} top-1/2 -translate-y-1/2 w-3 h-3 xs:w-3.5 xs:h-3.5 bg-white transform rotate-45 border-r border-b border-primary-100`}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ParrotMascot;