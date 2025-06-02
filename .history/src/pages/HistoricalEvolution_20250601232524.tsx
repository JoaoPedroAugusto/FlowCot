import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../components/SectionHeader';
import YieldGapChart from '../components/YieldGapChart';

const HistoricalEvolution: React.FC = () => {
  useEffect(() => {
    document.title = "Evolução Histórica do Yield Gap | AlgodãoTech";
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineEvents = [
    {
      year: '2000-2005',
      title: 'Expansão do Algodão no Cerrado',
      description: 'O início da expansão da cultura do algodão no Cerrado brasileiro, com a adaptação de variedades e sistema de produção específicos para a região.',
      achievement: 'Redução inicial do yield gap com adaptação de cultivares para o Cerrado.',
      color: 'bg-primary-600',
    },
    // ... (mantenha os outros eventos da timeline)
  ];

  return (
    <div className="pt-16 sm:pt-24">
      {/* Seção de Introdução */}
      <section className="section bg-primary-50 px-4 sm:px-6">
        <div className="container-custom max-w-7xl mx-auto">
          <SectionHeader
            title="Evolução Histórica (2000-2025)"
            subtitle="Acompanhe a trajetória e as transformações do yield gap na cotonicultura brasileira ao longo das últimas décadas"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center mb-12 sm:mb-16">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-primary-800 text-center md:text-left">
                Uma Jornada de Transformação
              </h3>
              <p className="mb-3 sm:mb-4 text-gray-700 text-sm sm:text-base md:text-lg">
                Desde o ano 2000, a cotonicultura brasileira passou por profundas transformações tecnológicas, gerenciais e estruturais. Essas mudanças impactaram diretamente a produtividade das lavouras e, consequentemente, o yield gap do algodão no país.
              </p>
              <p className="mb-3 sm:mb-4 text-gray-700 text-sm sm:text-base md:text-lg">
                O Brasil saiu da posição de importador para se tornar um dos maiores exportadores mundiais de algodão, com avanços significativos em produtividade.
              </p>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                Nesta seção, exploramos os principais marcos dessa jornada, os fatores que influenciaram as mudanças na produtividade e as tendências para o futuro da cotonicultura brasileira.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.pexels.com/photos/3680313/pexels-photo-3680313.jpeg"
                alt="Evolução da agricultura do algodão"
                className="rounded-lg shadow-md w-full h-auto max-h-[300px] sm:max-h-[400px] object-cover"
              />
            </motion.div>
          </div>

          <div className="overflow-x-auto">
            <YieldGapChart />
          </div>
        </div>
      </section>

      {/* Seção da Linha do Tempo */}
      <section className="section bg-white px-4 sm:px-6">
        <div className="container-custom max-w-7xl mx-auto">
          <SectionHeader
            title="Linha do Tempo do Yield Gap no Algodão Brasileiro"
            subtitle="Principais marcos e avanços que contribuíram para a redução do yield gap no período de 2000 a 2025"
            centered
          />

          <div className="relative mt-8">
            {/* Linha vertical apenas em desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>

            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative mb-8 sm:mb-12"
              >
                {/* Versão Mobile */}
                <div className="md:hidden">
                  <div className="flex flex-col items-center mb-4">
                    <div className={`w-6 h-6 rounded-full ${event.color} border-4 border-white shadow`}></div>
                    <div className="text-sm font-medium mt-2 text-primary-700">{event.year}</div>
                  </div>
                  <div className="p-5 bg-white rounded-lg shadow-md border-l-4 border-primary-600">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary-800">{event.title}</h3>
                    <p className="text-gray-700 mb-3 text-sm sm:text-base">{event.description}</p>
                    <div className="mt-3 p-3 bg-primary-50 rounded-md">
                      <p className="text-primary-800 font-medium text-xs sm:text-sm">
                        <span className="font-bold">Conquista:</span> {event.achievement}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Versão Desktop */}
                <div className="hidden md:flex items-center justify-between gap-8">
                  {index % 2 === 0 ? (
                    <>
                      <div className="w-5/12"></div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-600 border-4 border-white shadow"></div>
                      <div className="w-5/12">
                        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-primary-600">
                          <div className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-3 ${event.color}">
                            {event.year}
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-primary-800">{event.title}</h3>
                          <p className="text-gray-700 mb-3">{event.description}</p>
                          <div className="mt-3 p-3 bg-primary-50 rounded-md">
                            <p className="text-primary-800 font-medium text-sm">
                              <span className="font-bold">Conquista:</span> {event.achievement}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-5/12">
                        <div className="p-6 bg-white rounded-lg shadow-md border-r-4 border-primary-600 text-right">
                          <div className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-3 ${event.color}">
                            {event.year}
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-primary-800">{event.title}</h3>
                          <p className="text-gray-700 mb-3">{event.description}</p>
                          <div className="mt-3 p-3 bg-primary-50 rounded-md">
                            <p className="text-primary-800 font-medium text-sm">
                              <span className="font-bold">Conquista:</span> {event.achievement}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-600 border-4 border-white shadow"></div>
                      <div className="w-5/12"></div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Fatores */}
      <section className="section bg-primary-50 px-4 sm:px-6">
        <div className="container-custom max-w-7xl mx-auto">
          <SectionHeader
            title="Fatores Que Influenciaram a Evolução"
            subtitle="Compreenda os principais elementos que impactaram a produtividade do algodão brasileiro e o yield gap ao longo do tempo"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              // ... (mantenha o array de fatores existente)
            ].map((factor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card p-4 sm:p-5 rounded-lg shadow-md bg-white h-full"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-primary-800">{factor.title}</h3>
                <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                  {factor.items.map((item, i) => (
                    <li key={i} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HistoricalEvolution;